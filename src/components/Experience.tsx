"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import FadeHeader from "@/components/FadeHeader";
import { ChevronDown } from "lucide-react";

export default function Experience() {
  const [openIdx, setOpenIdx] = useState(0);
  const experience = [
    {
      title: "Product Design & Technology Lead",
      company: "Edco - Ireland's Leading Educational Platform",
      period: "05/2022 - Present",
      bullets: [
        "Led remote development teams and managed cross-functional stakeholder relationships",
        "Spearheaded Flash-to-HTML5 migration, increasing monthly game delivery from 30 to 100",
        "Reduced game rework by 70% through improved testing practices",
        "Optimized processes, reducing developer hours from 100 to 50 weekly while maintaining productivity",
        "Active member of company's AI research group, implementing automation solutions",
      ],
    },
    {
      title: "Product Designer (Contract)",
      company: "Imvizar - Augmented Reality Startup",
      period: "01/2022 - 04/2022",
      bullets: [
        "Led end-to-end mobile and web application redesign",
        "Complete visual identity overhaul including new logo, website, and app styling",
        "Contributed directly to securing new partnerships and investments post-rebranding",
        "Created foundational design system still in use today",
      ],
    },
    {
      title: "Motion Designer",
      company: "Thérapie Clinic - Europe's No.1 Medical Aesthetic Clinic",
      period: "01/2021 - 10/2021",
      bullets: [
        "Primary Motion Designer for Marketing team",
        "Delivered 40+ publicity videos, 100 images, and 10 3D animations",
        "Contributed to creation of company podcast 'Fertility Talks'",
        "Enhanced creative production processes with new tools and technologies",
      ],
    },
    {
      title: "Founder & Product Leader",
      company: "Wave VR Studio - VR/AR Startup",
      period: "06/2014 - 08/2017",
      bullets: [
        "Founded and led innovative virtual reality startup",
        "Developed 'VR Showroom' real estate platform and 'Go There' tourism app",
        "Managed development in Unity 3D and Unreal Engine",
        "Secured incubation and mentorship from InovAtiva Brasil",
        "Integrated 360º video, 3D modeling, and real-time animation",
      ],
    },
  ];

  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeHeader
          title="Professional Experience"
          subtitle="Two decades of design leadership across diverse industries and emerging technologies"
        />
        <div className="mx-auto max-w-3xl">
          {experience.map((exp, idx) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="mb-4 overflow-hidden rounded-xl border border-slate-200"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="flex w-full items-center justify-between bg-white px-6 py-4 text-left transition hover:bg-slate-50"
              >
                <div>
                  <div className="text-base font-semibold text-slate-900">
                    {exp.title}
                  </div>
                  <div className="mt-0.5 text-sm font-medium text-indigo-700">
                    {exp.company}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span>{exp.period}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-indigo-600 transition-transform ${
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
                  <div className="bg-slate-50 px-6 pb-6 pt-2">
                    <ul className="mt-4 list-none space-y-2 text-sm text-slate-700">
                      {exp.bullets.map((b, i) => (
                        <li key={i} className="relative pl-5">
                          <span className="absolute left-0 top-1 text-indigo-600">
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
    </section>
  );
}
