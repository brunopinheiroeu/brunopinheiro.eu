// === File: components/Projects.tsx ===
"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import FadeHeader from "@/components/FadeHeader";
import MarkdownContent from "@/components/MarkdownContent";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import type { Product } from "@/lib/contentful";

const fallbackProductImages = [
  { src: "/images/photo6.png", alt: "Project cover 1" },
  { src: "/images/photo2.png", alt: "Project cover 2" },
  { src: "/images/photo1.png", alt: "Project cover 3" },
  { src: "/images/photo3.png", alt: "Project cover 4" },
];

interface ProductsProps {
  products: Product[];
}

type Slide = {
  key: string;
  slug: string;
  projectName: string;
  headline?: string;
  description: string;
  category?: string;
  role?: string;
  status?: string;
  evidence?: string;
  before?: string;
  after?: string;
  productUrl?: string;
  image: { src: string; alt: string };
};

export default function Products({ products: strapiProducts }: ProductsProps) {
  const slides = useMemo<Slide[]>(() => {
    return strapiProducts
      .filter((product) => product?.frontPage)
      .slice(0, 4)
      .map((product, index) => {
        const fallbackImage =
          fallbackProductImages[index % fallbackProductImages.length];
        const image = product.home.image ?? product.coverImage;

        return {
          key: product.id,
          slug: product.slug,
          projectName: product.home.projectName || product.title,
          headline: product.home.headline,
          description: product.frontPageText,
          category: product.home.category,
          role: product.home.role,
          status: product.home.status,
          evidence: product.home.evidence,
          before: product.home.before,
          after: product.home.after,
          productUrl: product.productUrl,
          image: {
            src: image?.url ?? fallbackImage.src,
            alt: image?.alt || fallbackImage.alt || product.title,
          },
        };
      });
  }, [strapiProducts]);

  const [activeIndex, setActiveIndex] = useState(0);
  const total = slides.length;
  const safeIndex = total > 0 ? ((activeIndex % total) + total) % total : 0;
  const active = slides[safeIndex];

  const goTo = (index: number) => {
    if (total === 0) return;
    setActiveIndex(((index % total) + total) % total);
  };
  const goPrev = () => goTo(safeIndex - 1);
  const goNext = () => goTo(safeIndex + 1);

  return (
    <section id="products" className="bg-primary/5 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeHeader
          title="Featured Products"
          subtitle="Real problems. Thoughtful design. Working products."
        />

        {active ? (
          <>
            <div className="overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-slate-800">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-1 md:grid-cols-[40fr_60fr]"
                >
                  {/* Content side */}
                  <div className="flex flex-col justify-center p-6 md:p-8">
                    {(active.role || active.status) && (
                      <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-accent">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {[active.role, active.status].filter(Boolean).join(" · ")}
                      </div>
                    )}

                    <span className="mb-1 text-lg font-semibold text-primary md:text-xl">
                      {active.projectName}
                    </span>

                    {active.headline && (
                      <h3 className="mb-3 text-4xl font-bold leading-[1.1] text-surface-foreground md:text-5xl">
                        {active.headline}
                      </h3>
                    )}

                    {active.description && (
                      <div className="mb-4 line-clamp-3 text-sm text-slate-600 dark:text-slate-400 md:text-base">
                        <MarkdownContent
                          content={active.description}
                          inline
                          className="text-muted"
                        />
                      </div>
                    )}

                    {active.before && active.after && (
                      <div className="mb-4 grid grid-cols-2 gap-2">
                        <div className="rounded-lg border border-border bg-slate-50 px-2.5 py-2 dark:bg-slate-900/40">
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                            Before
                          </p>
                          <p className="text-xs font-medium leading-snug text-surface-foreground">
                            {active.before}
                          </p>
                        </div>
                        <div className="rounded-lg border border-accent/20 bg-accent/5 px-2.5 py-2">
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-accent">
                            Now
                          </p>
                          <p className="text-xs font-medium leading-snug text-surface-foreground">
                            {active.after}
                          </p>
                        </div>
                      </div>
                    )}

                    {active.evidence && (
                      <div className="mb-4 flex items-center gap-3 text-sm text-surface-foreground">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                          <Check className="h-4 w-4" strokeWidth={3} />
                        </span>
                        {active.evidence}
                      </div>
                    )}

                    <div className="mt-auto flex flex-wrap items-center gap-4">
                      <a
                        href={`/products/${active.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        View case study <ArrowRight className="h-4 w-4" />
                      </a>
                      {active.productUrl && (
                        <a
                          href={active.productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-secondary"
                        >
                          Open product <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Media side */}
                  <div className="relative min-h-[260px] overflow-hidden bg-white dark:bg-slate-800 md:min-h-full">
                    <Image
                      src={active.image.src}
                      alt={active.image.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 60vw"
                      priority
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {total > 1 && (
                <div className="flex items-center justify-center gap-4 border-t border-border/70 px-4 py-2.5">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous product"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-surface-foreground transition hover:border-primary hover:text-primary"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <span className="text-sm font-medium text-muted">
                    {String(safeIndex + 1).padStart(2, "0")} /{" "}
                    {String(total).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next product"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-surface-foreground transition hover:border-primary hover:text-primary"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {total > 1 && (
              <div className="mt-8">
                <div className="mb-3 flex items-center justify-end">
                  <a
                    href="/projects"
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-secondary"
                  >
                    All projects <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {slides.map((slide, index) => {
                    const isActive = index === safeIndex;
                    return (
                      <button
                        key={slide.key}
                        type="button"
                        onClick={() => goTo(index)}
                        className="group text-left"
                      >
                        <div
                          className={[
                            "relative aspect-[4/3] w-full overflow-hidden rounded-xl transition",
                            isActive
                              ? "ring-2 ring-primary ring-offset-2 ring-offset-primary/5"
                              : "ring-1 ring-border group-hover:ring-primary/40",
                          ].join(" ")}
                        >
                          <Image
                            src={slide.image.src}
                            alt={slide.image.alt}
                            fill
                            className="object-cover"
                            sizes="200px"
                          />
                        </div>
                        <div className="mt-2">
                          <p className="truncate text-sm font-semibold text-surface-foreground">
                            {slide.projectName}
                          </p>
                          {slide.category && (
                            <p className="truncate text-xs text-muted">
                              {slide.category}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-primary/20 bg-white/60 p-10 text-center shadow-inner">
            <p className="text-lg font-semibold text-surface-foreground">
              Featured products coming soon
            </p>
            <p className="mt-3 text-sm text-muted">
              Assim que liberarmos novos estudos no Contentful, eles aparecerão
              automaticamente aqui.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
