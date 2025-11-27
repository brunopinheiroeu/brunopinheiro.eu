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
      title: "Product Design & Technology Lead",
      company: "Edco - Ireland's Leading Educational Platform - Ireland",
      period: "05/2022 - Present",
      bullets: [
        "Led Flash-to-HTML5 migration for educational gaming platform serving 50,000+ students, increasing monthly game delivery from 30 to 100 (3x improvement)",
        "Reduced game rework by 70% through improved testing practices and automated workflows using Python and AI tools",
        "Optimized development processes for distributed team, reducing developer hours from 100 to 50 weekly while maintaining productivity (50% cost savings)",
        "Redesigned flagship learning platform with 11% more usable screen space, improving student focus and engagement",
        "Active member of company's AI research group, implementing automation solutions and exploring AI integration opportunities",
      ],
    },
    {
      title: "AI Product Manager Bootcamp (Maven)",
      company: "Capstone Project: Artori.app",
      period: "2025",
      bullets: [
        "Built full-stack AI art generator using Next.js, Supabase, and OpenAI APIs in 4-week sprint",
        "Managed end-to-end product lifecycle from concept to deployment using AI-assisted development (Snapdev)",
        "Currently live at artori.app, demonstrating rapid prototyping and AI product development capabilities'",
      ],
    },
    {
      title: "Product Designer (Contract)",
      company: "Imvizar - Augmented Reality Startup - Ireland",
      period: "01/2022 - 04/2022",
      bullets: [
        "Led complete redesign of mobile/web application and visual identity overhaul, directly contributing to securing new partnerships and investment",
        "Created foundational design system (still in use today) ensuring consistency and scalability across 3 user experiences",
      ],
    },
    {
      title: "Founder & Product Leader",
      company: "Wave VR Studio - VR/AR Startup",
      period: "06/2014 - 08/2017",
      bullets: [
        "Founded and led VR startup, managing end-to-end product lifecycle for multiple VR/AR solutions (VR Showroom, Go There tourism app)",
        "Developed products in Unity 3D and Unreal Engine, conducted user research, pivoted to B2B based on market analysis",
        "Secured incubation and mentorship (InovAtiva Brasil, Paraíba Technological Park) for MVP development",
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
                className="flex w-full items-center justify-between bg-white px-6 py-4 text-left transition hover:bg-muted/10"
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
          href="/cv/Bruno_Pinheiro_Resume.pdf"
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
