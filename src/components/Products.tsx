// === File: components/Projects.tsx ===
"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import FadeHeader from "@/components/FadeHeader";
import MarkdownContent from "@/components/MarkdownContent";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/contentful";
import { getToolItems, type ToolItem } from "@/lib/toolIcons";

const fallbackProductImages = [
  { src: "/images/photo6.png", alt: "Project cover 1" },
  { src: "/images/photo2.png", alt: "Project cover 2" },
  { src: "/images/photo1.png", alt: "Project cover 3" },
  { src: "/images/photo3.png", alt: "Project cover 4" },
];

interface ProductsProps {
  products: Product[];
}

type NormalizedProduct = {
  title: string;
  desc: string;
  tags: string[];
  href: string;
  tools: ToolItem[];
  cover: {
    src: string;
    alt: string;
  };
};

export default function Products({ products: strapiProducts }: ProductsProps) {
  const frontPageProducts = useMemo(
    () => strapiProducts.filter((product) => product?.frontPage),
    [strapiProducts]
  );

  const products = useMemo<NormalizedProduct[]>(() => {
    return frontPageProducts.map((product, index) => {
      const fallbackImage =
        fallbackProductImages[index % fallbackProductImages.length];
      const coverSrc = product.coverImage?.url ?? fallbackImage.src;
      const toolItems = getToolItems(product.tools);

      return {
        title: product.title,
        desc: product.frontPageText,
        tags: product.tags ?? [],
        href: `/products/${product.slug}`,
        tools: toolItems,
        cover: {
          src: coverSrc,
          alt: product.coverImage?.alt || fallbackImage.alt || product.title,
        },
      };
    });
  }, [frontPageProducts]);

  const hasProducts = products.length > 0;

  return (
    <section id="products" className="bg-primary/5 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeHeader
          title="Featured Products"
          subtitle="A showcase of impactful design solutions across various industries and technologies"
        />

        {hasProducts ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {products.map((p, i) => {
              const reversed = i % 2 === 1;

              return (
                <motion.article
                  key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.05 * i }}
                  className={[
                    "group relative flex h-full overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl",
                    "flex-col",
                    reversed ? "sm:flex-row-reverse" : "sm:flex-row",
                  ].join(" ")}
                >
                  {/* Media side */}
                  <div
                    className={[
                      "relative w-full shrink-0 overflow-hidden",
                      "sm:w-[46%]",
                      "bg-gradient-to-br from-primary to-secondary",
                    ].join(" ")}
                  >
                    <div className="relative h-64 sm:h-full">
                      <Image
                        src={p.cover.src}
                        alt={p.cover.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 46vw"
                        priority={i === 0}
                      />
                      <div className="absolute inset-0 bg-white/10 [mask-image:radial-gradient(40%_40%_at_30%_20%,black,transparent)]" />
                    </div>

                    {/* Glass bar no hover do card */}
                    <div
                      className={[
                        "absolute bottom-0 left-0 right-0 origin-left",
                        "border-t border-white/20 bg-white/15 backdrop-blur-md",
                        "px-4 py-3",
                        "transform transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100",
                        "z-10",
                      ].join(" ")}
                      style={{ transformOrigin: "left center" }}
                    >
                      <div className="flex flex-wrap items-center justify-center gap-3 text-white text-xs font-medium">
                        {p.tools.map((tool) =>
                          tool.Icon ? (
                            <span
                              key={`hover-${tool.key}`}
                              className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10"
                              title={tool.label}
                            >
                              <tool.Icon className="h-4 w-4 text-white" />
                            </span>
                          ) : (
                            <span
                              key={`hover-${tool.key}`}
                              className="rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-[11px] uppercase tracking-wide"
                            >
                              {tool.label}
                            </span>
                          )
                        )}
                        {!p.tools.length ? (
                          <span className="text-xs uppercase tracking-wide text-white/70">
                            Tooling coming soon
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {/* Content side */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-2 text-lg font-semibold text-surface-foreground">
                      {p.title}
                    </h3>
                    <div className="mb-4 text-sm text-slate-600">
                      <MarkdownContent
                        content={p.desc}
                        inline
                        className="text-muted"
                      />
                    </div>

                    {p.tags.length ? (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {p.tags.map((t: string) => (
                          <span
                            key={t}
                            className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="mb-4 text-sm text-muted">
                        Tags are being curated for this project.
                      </p>
                    )}

                    {/* tools fixed on mobile */}
                    <div className="mb-4 flex flex-wrap items-center gap-3 md:hidden">
                      {p.tools.map((tool) =>
                        tool.Icon ? (
                          <span
                            key={`mobile-${tool.key}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary/20 bg-primary/5"
                            title={tool.label}
                          >
                            <tool.Icon className="h-4 w-4 text-primary" />
                          </span>
                        ) : (
                          <span
                            key={`mobile-${tool.key}`}
                            className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-primary"
                          >
                            {tool.label}
                          </span>
                        )
                      )}
                      {!p.tools.length ? (
                        <span className="text-xs uppercase tracking-wide text-muted">
                          Tooling coming soon
                        </span>
                      ) : null}
                    </div>

                    {/* Footer colado no bottom */}
                    <div className="mt-auto">
                      <div className="h-px w-full bg-secondary/10" />
                      <a
                        href={p.href}
                        className="mt-4 inline-flex items-center gap-2 font-medium text-primary hover:text-secondary"
                      >
                        Case Study <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
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
