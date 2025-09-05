// === File: components/Projects.tsx ===
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import FadeHeader from "@/components/FadeHeader";
import { Gamepad2, Box, Layers, Sparkles, ArrowRight } from "lucide-react";
import { SiFigma, SiAdobephotoshop, SiHtml5, SiCss3 } from "react-icons/si";

export default function Projects() {
  const photos = [
    { src: "/images/photo6.png", alt: "Project cover 1" },
    { src: "/images/photo2.png", alt: "Project cover 2" },
    { src: "/images/photo1.png", alt: "Project cover 3" },
    { src: "/images/photo3.png", alt: "Project cover 4" },
  ];

  const projects = [
    {
      title: "Bua na Cainte - Educational Platform",
      desc: "Led Flash-to-HTML5 migration for Ireland's leading educational platform, increasing monthly game delivery from 30 to 100 while reducing rework by 70%.",
      tags: [
        "Product Design",
        "HTML5",
        "Process Optimization",
        "Team Leadership",
      ],
      href: "#",
      tools: [SiFigma, SiAdobephotoshop, SiHtml5, SiCss3],
    },
    {
      title: "Imvizar AR Platform",
      desc: "Complete mobile and web app redesign with visual identity overhaul for an AR startup, directly contributing to securing new partnerships and investments.",
      tags: [
        "Mobile Design",
        "Brand Identity",
        "Design System",
        "Augmented Reality",
      ],
      href: "#",
      tools: [SiFigma, SiHtml5, SiCss3],
    },
    {
      title: "Wave VR Studio",
      desc: "Founded and led VR startup creating immersive real estate and tourism experiences, including 'VR Showroom' and 'Go There' applications.",
      tags: ["VR/AR", "Unity 3D", "Product Strategy", "Startup Leadership"],
      href: "#",
      tools: [SiFigma, SiAdobephotoshop],
    },
    {
      title: "Automation & AI Workflows",
      desc: "Implemented AI-driven automation to reduce repetitive tasks, streamline design ops, and optimize production pipelines.",
      tags: ["AI", "Automation", "Workflow Optimization", "Innovation"],
      href: "#",
      tools: [SiFigma, SiHtml5],
    },
  ];

  return (
    <section id="projects" className="bg-indigo-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeHeader
          title="Featured Projects"
          subtitle="A showcase of impactful design solutions across various industries and technologies"
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {projects.map((p, i) => {
            const photo = photos[i % photos.length];
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
                      src={photo.src}
                      alt={photo.alt}
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
                      {p.tools.map((Icon, idx) => (
                        <Icon key={idx} className="h-5 w-5 text-white" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content side */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">
                    {p.title}
                  </h3>
                  <p className="mb-4 text-sm text-slate-600">{p.desc}</p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {/* tools fixed on mobile */}
                  <div className="mb-4 flex items-center gap-3 md:hidden">
                    {p.tools.map((Icon, idx) => (
                      <Icon key={idx} className="h-5 w-5 text-indigo-600" />
                    ))}
                  </div>

                  {/* Footer colado no bottom */}
                  <div className="mt-auto">
                    <div className="h-px w-full bg-violet-100" />
                    <a
                      href={p.href}
                      className="mt-4 inline-flex items-center gap-2 font-medium text-indigo-600 hover:text-violet-700"
                    >
                      View Case Study <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
