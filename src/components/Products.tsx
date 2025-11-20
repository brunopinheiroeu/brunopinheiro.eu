// === File: components/Projects.tsx ===
"use client";
import { useMemo } from "react";
import type { ComponentType } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import FadeHeader from "@/components/FadeHeader";
import MarkdownContent from "@/components/MarkdownContent";
import { ArrowRight } from "lucide-react";
import {
  SiFigma,
  SiAdobephotoshop,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiVite,
  SiWebpack,
  SiDocker,
  SiMongodb,
  SiPostgresql,
  SiGraphql,
  SiRedis,
  SiAdobeillustrator,
  SiAdobexd,
  SiSketch,
  SiFramer,
  SiBlender,
  SiUnity,
  SiUnrealengine,
} from "react-icons/si";
import { Project, getStrapiImageUrl } from "@/lib/strapi";

type ToolIcon = ComponentType<{ className?: string }>;

const fallbackProductImages = [
  { src: "/images/photo6.png", alt: "Project cover 1" },
  { src: "/images/photo2.png", alt: "Project cover 2" },
  { src: "/images/photo1.png", alt: "Project cover 3" },
  { src: "/images/photo3.png", alt: "Project cover 4" },
];

const toolMap: Record<string, ToolIcon> = {
  // Design Tools
  sifigma: SiFigma,
  figma: SiFigma,
  siadobephotoshop: SiAdobephotoshop,
  photoshop: SiAdobephotoshop,
  siadobeillustrator: SiAdobeillustrator,
  illustrator: SiAdobeillustrator,
  siadobexd: SiAdobexd,
  adobexd: SiAdobexd,
  xd: SiAdobexd,
  sisketch: SiSketch,
  sketch: SiSketch,
  siframer: SiFramer,
  framer: SiFramer,

  // Web Technologies
  sihtml5: SiHtml5,
  html5: SiHtml5,
  html: SiHtml5,
  sicss3: SiCss3,
  css3: SiCss3,
  css: SiCss3,
  sijavascript: SiJavascript,
  javascript: SiJavascript,
  js: SiJavascript,
  sitypescript: SiTypescript,
  typescript: SiTypescript,
  ts: SiTypescript,
  sireact: SiReact,
  react: SiReact,
  sinextdotjs: SiNextdotjs,
  nextjs: SiNextdotjs,
  next: SiNextdotjs,
  sinodedotjs: SiNodedotjs,
  nodejs: SiNodedotjs,
  node: SiNodedotjs,
  sitailwindcss: SiTailwindcss,
  tailwindcss: SiTailwindcss,
  tailwind: SiTailwindcss,

  // Build Tools & Version Control
  sivite: SiVite,
  vite: SiVite,
  siwebpack: SiWebpack,
  webpack: SiWebpack,
  sigit: SiGit,
  git: SiGit,
  sigithub: SiGithub,
  github: SiGithub,

  // Backend & Databases
  sidocker: SiDocker,
  docker: SiDocker,
  simongodb: SiMongodb,
  mongodb: SiMongodb,
  sipostgresql: SiPostgresql,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  sigraphql: SiGraphql,
  graphql: SiGraphql,
  siredis: SiRedis,
  redis: SiRedis,

  // 3D & Game Engines
  siblender: SiBlender,
  blender: SiBlender,
  siunity: SiUnity,
  unity: SiUnity,
  siunrealengine: SiUnrealengine,
  unrealengine: SiUnrealengine,
  unreal: SiUnrealengine,
};

const getToolIcons = (toolsString?: string): ToolIcon[] => {
  if (!toolsString) return [];

  const toolNames = toolsString.split(",").map((t) => t.trim().toLowerCase());

  return toolNames
    .map((name) => toolMap[name] || null)
    .filter(Boolean) as ToolIcon[];
};

interface ProductsProps {
  products: Project[];
}

type NormalizedProduct = {
  title: string;
  desc: string;
  tags: string[];
  href: string;
  tools: ToolIcon[];
  cover: {
    src: string;
    alt: string;
  };
};

export default function Products({ products: strapiProducts }: ProductsProps) {
  const frontPageProducts = useMemo(
    () => strapiProducts.filter((product) => product?.front_page),
    [strapiProducts]
  );

  const products = useMemo<NormalizedProduct[]>(() => {
    return frontPageProducts.map((product, index) => {
      const fallbackImage =
        fallbackProductImages[index % fallbackProductImages.length];
      const coverSrc = product.cover_image?.url
        ? getStrapiImageUrl(product.cover_image.url)
        : fallbackImage.src;

      return {
        title: product.title,
        desc: product.excerpt,
        tags: product.tags
          ? product.tags.split(",").map((t: string) => t.trim())
          : [],
        href: `/products/${product.slug}`,
        tools: getToolIcons(product.tools),
        cover: {
          src: coverSrc,
          alt:
            product.cover_image?.alternativeText ||
            fallbackImage.alt ||
            product.title,
        },
      };
    });
  }, [frontPageProducts]);

  const hasProducts = products.length > 0;

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <section id="products" className="bg-indigo-50 py-24">
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
                      "bg-gradient-to-br from-indigo-500 to-violet-700",
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
                      <div className="flex items-center justify-center gap-4 text-white">
                        {p.tools.length ? (
                          p.tools.map((Icon, idx) => (
                            <Icon key={idx} className="h-5 w-5 text-white" />
                          ))
                        ) : (
                          <span className="text-xs uppercase tracking-wide text-white/70">
                            Tooling coming soon
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content side */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-2 text-lg font-semibold text-slate-900">
                      {p.title}
                    </h3>
                    <div className="mb-4 text-sm text-slate-600">
                      <MarkdownContent
                        content={p.desc}
                        inline
                        className="text-slate-600"
                      />
                    </div>

                    {p.tags.length ? (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {p.tags.map((t: string) => (
                          <span
                            key={t}
                            className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-800"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="mb-4 text-sm text-slate-500">
                        Tags are being curated for this project.
                      </p>
                    )}

                    {/* tools fixed on mobile */}
                    <div className="mb-4 flex items-center gap-3 md:hidden">
                      {p.tools.length ? (
                        p.tools.map((Icon, idx) => (
                          <Icon key={idx} className="h-5 w-5 text-indigo-600" />
                        ))
                      ) : (
                        <span className="text-xs uppercase tracking-wide text-slate-500">
                          Tooling coming soon
                        </span>
                      )}
                    </div>

                    {/* Footer colado no bottom */}
                    <div className="mt-auto">
                      <div className="h-px w-full bg-violet-100" />
                      <a
                        href={p.href}
                        className="mt-4 inline-flex items-center gap-2 font-medium text-indigo-600 hover:text-violet-700"
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
          <div className="mt-12 rounded-2xl border border-dashed border-indigo-200 bg-white/60 p-10 text-center shadow-inner">
            <p className="text-lg font-semibold text-slate-900">
              Warming up the content server…
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Strapi Cloud takes a few seconds to wake up after inactivity.
              Leave this tab open and the projects will appear automatically
              once the cached data refreshes.
            </p>
            <button
              type="button"
              onClick={handleRetry}
              className="mt-6 inline-flex items-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70"
            >
              Try again now
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
