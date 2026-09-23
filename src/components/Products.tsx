// === File: components/Projects.tsx ===
"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import FadeHeader from "@/components/FadeHeader";
import MarkdownContent from "@/components/MarkdownContent";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import type { Product } from "@/lib/contentful";
import MiniProductCard from "@/components/MiniProductCard";

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

// The two halves of one slide (text + image), reused both for the visible
// slide and for the invisible measurement pass that decides the shared
// fixed height below.
function SlideBody({ slide, priority }: { slide: Slide; priority?: boolean }) {
  return (
    <div className="grid h-full grid-cols-1 md:grid-cols-[40fr_60fr]">
      {/* Content side */}
      <div className="flex flex-col justify-center p-6 md:p-8">
        {(slide.role || slide.status) && (
          <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {[slide.role, slide.status].filter(Boolean).join(" · ")}
          </div>
        )}

        <span className="mb-1 text-lg font-semibold text-primary md:text-xl">
          {slide.projectName}
        </span>

        {slide.headline && (
          <h3 className="mb-3 text-[2rem] font-bold leading-[1.1] text-surface-foreground">
            {slide.headline}
          </h3>
        )}

        {slide.description && (
          <div className="mb-4 line-clamp-3 text-sm text-slate-600 dark:text-slate-400 md:text-base">
            <MarkdownContent
              content={slide.description}
              inline
              className="text-muted"
            />
          </div>
        )}

        {slide.before && slide.after && (
          <div className="mb-4 grid grid-cols-2 gap-2">
            <div className="rounded-2xl border border-border bg-slate-50 px-2.5 py-2 dark:bg-slate-900/40">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                Before
              </p>
              <p className="text-xs font-medium leading-snug text-surface-foreground">
                {slide.before}
              </p>
            </div>
            <div className="rounded-2xl border border-accent/20 bg-accent/5 px-2.5 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-accent">
                Now
              </p>
              <p className="text-xs font-medium leading-snug text-surface-foreground">
                {slide.after}
              </p>
            </div>
          </div>
        )}

        {slide.evidence && (
          <div className="mb-4 flex items-center gap-3 text-sm text-surface-foreground">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Check className="h-4 w-4" strokeWidth={3} />
            </span>
            {slide.evidence}
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-4">
          <a
            href={`/products/${slide.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            View case study <ArrowRight className="h-4 w-4" />
          </a>
          {slide.productUrl && (
            <a
              href={slide.productUrl}
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
        {/* A `fill` image sizes itself to the parent's padding box, so
            padding on the parent has no visual effect - inset this wrapper
            instead to create the same breathing room as the text side. */}
        <div className="absolute inset-6 md:inset-8">
          <Image
            src={slide.image.src}
            alt={slide.image.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority={priority}
          />
        </div>
      </div>
    </div>
  );
}

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

  // All slides differ in content length (headline, before/after, evidence),
  // so the card would resize as you navigate. Measure every slide once in
  // an invisible pass and pin the visible card to the tallest one, so
  // height stays fixed no matter which slide is active.
  const measureRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [cardHeight, setCardHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const measure = () => {
      const heights = measureRefs.current.map((el) => el?.offsetHeight ?? 0);
      const max = Math.max(0, ...heights);
      setCardHeight(max || undefined);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [slides]);

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
            <div className="relative">
              {total > 1 && (
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous product"
                  className="absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white text-surface-foreground shadow-md transition hover:border-primary hover:text-primary dark:bg-slate-800"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
              )}
              {total > 1 && (
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next product"
                  className="absolute right-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-border bg-white text-surface-foreground shadow-md transition hover:border-primary hover:text-primary dark:bg-slate-800"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
              <div className="overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-slate-800">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.key}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35 }}
                    style={{ height: cardHeight }}
                    className="overflow-hidden"
                  >
                    <SlideBody slide={active} priority />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Invisible measurement pass: every slide rendered once at
                  the card's real width so we can read its natural height
                  and pin the visible card to the tallest one. */}
              <div
                aria-hidden="true"
                className="pointer-events-none invisible absolute inset-x-0 top-0 -z-10 overflow-hidden"
              >
                {slides.map((slide, index) => (
                  <div
                    key={slide.key}
                    ref={(el) => {
                      measureRefs.current[index] = el;
                    }}
                  >
                    <SlideBody slide={slide} />
                  </div>
                ))}
              </div>
            </div>

            {total > 1 && (
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {slides.map((slide, index) => (
                  <MiniProductCard
                    key={slide.key}
                    name={slide.projectName}
                    category={slide.category}
                    image={slide.image}
                    isActive={index === safeIndex}
                    onClick={() => goTo(index)}
                  />
                ))}
              </div>
            )}

            {total > 1 && (
              <div className="mt-4 flex items-center justify-end">
                <a
                  href="/products"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-secondary"
                >
                  More cases <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
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
