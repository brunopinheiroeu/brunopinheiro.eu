"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import FadeHeader from "@/components/FadeHeader";
import { ChevronDown } from "lucide-react";
import { GrDocumentDownload } from "react-icons/gr";
import { SiLinkedin } from "react-icons/si";

export default function Experience() {
  const [openIdx, setOpenIdx] = useState(0);
  const experience = [
    {
      title: "Lead Product Designer",
      company: "Edco - Ireland's Leading Educational Platform - Ireland",
      period: "05/2022 - Present",
      bullets: [
        "Led Flash-to-HTML5 migration, increasing monthly delivery from 30 to 100 products while cutting developer hours by 50% through process optimisation",
        "Redesigned the main learning platform using a component-based design system, expanding usable screen space by 11% and improving focus and engagement for 50,000+ students",
        "Built and scaled a unified design system adopted across 3,500+ products, enabling faster handoffs and consistent user experience",
        "Developed Python and Shell automation scripts to eliminate repetitive tasks, enabling async collaboration and accelerating team productivity",
        "Translated stakeholder needs into clear product and technical direction, and made engineering constraints understandable to non-technical teams while shipping workflows, prototypes, and automation tools",
      ],
    },
    {
      title: "Founder & Design Engineer",
      company: "Brunix Studio",
      period: "2025",
      bullets: [
        "Built AI-assisted mobile, web, and internal products from 0 to 1, taking them through user tests, live pilots, team adoption, and Android launch prep",
        "Designed and deployed MVPs with Codex, Claude Code, Lovable, React/Next.js, React Native, Vercel, Supabase, and Neon",
        "Created Edco/Bua automation tools that cut resource-production tasks by 10x+, turning PDF, thumbnail, title, and SVG workflows from hours into seconds",
      ],
    },
    {
      title: "Product Designer (Contract)",
      company: "Imvizar - Augmented Reality Startup - Ireland",
      period: "01/2022 - 04/2022",
      bullets: [
        "Led end-to-end redesign of mobile and web platform plus complete visual identity overhaul, directly contributing to the company securing new partnerships and investment",
        "Built foundational design system still scaling across the product today",
      ],
    },
    {
      title: "Founder & Product Leader",
      company: "Wave VR Studio - VR/AR Startup",
      period: "06/2014 - 08/2017",
      bullets: [
        "Founded and led VR startup building architectural visualisation and tourism platforms in Unity 3D and Unreal Engine, securing incubation at InovAtiva Brasil",
        "Pivoted from B2C to B2B based on user research, resulting in partnerships with real estate developers and tourism boards",
      ],
    },
  ];

  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeHeader
          title="Professional Experience"
          subtitle="From design leadership to shipping AI-powered products."
        />
        <div className="mx-auto max-w-3xl">
          {experience.map((exp, idx) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="mb-4 overflow-hidden rounded-xl border border-border"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="flex w-full items-center justify-between bg-white dark:bg-slate-800 px-6 py-4 text-left transition hover:bg-muted/10 dark:hover:bg-slate-700/50"
              >
                <div>
                  <div className="text-base font-semibold text-surface-foreground">
                    {exp.title}
                  </div>
                  <div className="mt-0.5 text-sm font-medium text-primary">
                    {exp.company}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted">
                  <span>{exp.period}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-primary transition-transform ${
                      openIdx === idx ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  openIdx === idx ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="bg-primary/5 px-6 pb-6 pt-2">
                    <ul className="mt-4 list-none space-y-2 text-sm text-surface-foreground/80">
                      {exp.bullets.map((b, i) => (
                        <li key={i} className="relative pl-5">
                          <span className="absolute left-0 top-1 text-primary">
                            ▶
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Actions at the end of Experience */}
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href="https://linkedin.com/in/brunopinheiroeu"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-full border-2 border-secondary/50 bg-secondary/10 px-6 py-3 font-medium text-secondary backdrop-blur transition hover:-translate-y-0.5 hover:bg-secondary/20"
        >
          <SiLinkedin className="h-5 w-5" />
          LinkedIn
        </a>

        <a
          href="/cv/Bruno_Pinheiro_CV_EN.pdf"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-full border-2 border-secondary/50 bg-secondary/10 px-6 py-3 font-medium text-secondary backdrop-blur transition hover:-translate-y-0.5 hover:bg-secondary/20"
        >
          <GrDocumentDownload className="h-5 w-5" />
          Download my CV
        </a>
      </div>
    </section>
  );
}
