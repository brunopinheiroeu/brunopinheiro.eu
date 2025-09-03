"use client";
import { motion } from "framer-motion";
import FadeHeader from "@/components/FadeHeader";
import { Gamepad2, Box, Layers, ChevronDown } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      icon: <Gamepad2 className="w-10 h-10 text-white" />,
      title: "Bua na Cainte - Educational Platform",
      desc: "Led Flash-to-HTML5 migration for Ireland's leading educational platform, increasing monthly game delivery from 30 to 100 while reducing rework by 70%.",
      tags: [
        "Product Design",
        "HTML5",
        "Process Optimization",
        "Team Leadership",
      ],
      href: "#",
    },
    {
      icon: <Box className="w-10 h-10 text-white" />,
      title: "Imvizar AR Platform",
      desc: "Complete mobile and web app redesign with visual identity overhaul for an AR startup, directly contributing to securing new partnerships and investments.",
      tags: [
        "Mobile Design",
        "Brand Identity",
        "Design System",
        "Augmented Reality",
      ],
      href: "#",
    },
    {
      icon: <Layers className="w-10 h-10 text-white" />,
      title: "Wave VR Studio",
      desc: "Founded and led VR startup creating immersive real estate and tourism experiences, including 'VR Showroom' and 'Go There' applications.",
      tags: ["VR/AR", "Unity 3D", "Product Strategy", "Startup Leadership"],
      href: "#",
    },
  ];

  return (
    <section id="projects" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeHeader
          title="Featured Projects"
          subtitle="A showcase of impactful design solutions across various industries and technologies"
        />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.05 * i }}
              className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-500 to-violet-700">
                <div className="absolute inset-0 bg-white/10 [mask-image:radial-gradient(40%_40%_at_30%_20%,black,transparent)]" />
                <div className="relative z-10">{p.icon}</div>
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold">{p.title}</h3>
                <p className="mb-4 text-sm text-slate-600">{p.desc}</p>
                <div className="mb-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={p.href}
                  className="inline-flex items-center gap-2 font-medium text-indigo-600 hover:text-blue-800"
                >
                  View Case Study{" "}
                  <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
