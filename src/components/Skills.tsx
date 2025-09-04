"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeHeader from "@/components/FadeHeader";
import SkillCard from "@/components/SkillCard";
import { Palette, Code, Users } from "lucide-react";

export default function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Range mais "fácil de disparar" na viewport:
  // 0 quando ~90% do topo da section entra, 1 quando ~10% do fundo sai
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 100%", "end 0%"],
  });

  // Camada de trás (suave)
  const backX = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  const backY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Camada da frente (um pouco mais forte / direção oposta)
  const frontX = useTransform(scrollYProgress, [500, 1], [300, -300]);
  const frontY = useTransform(scrollYProgress, [0, 1], [-150, 150]);

  // Evita hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-700 py-24 text-white"
    >
      {/* Background polygons (scroll parallax) */}
      {mounted ? (
        <>
          {/* back layer */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-15"
            style={{ translateX: backX, translateY: backY }}
          >
            <svg viewBox="0 0 1000 1000" className="h-[180%] w-[180%]">
              <polygon fill="white" points="0,0 1000,300 1000,1000 0,700" />
            </svg>
          </motion.div>

          {/* front layer */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{ translateX: frontX, translateY: frontY }}
          >
            <svg viewBox="0 0 1000 1000" className="h-[200%] w-[200%]">
              <polygon fill="white" points="0,150 1000,450 1000,1000 0,850" />
            </svg>
          </motion.div>
        </>
      ) : (
        // Fallback estático no SSR
        <>
          <div className="pointer-events-none absolute inset-0 opacity-15">
            <svg viewBox="0 0 1000 1000" className="h-[180%] w-[180%]">
              <polygon fill="white" points="0,0 1000,300 1000,1000 0,700" />
            </svg>
          </div>
          <div className="pointer-events-none absolute inset-0 opacity-25">
            <svg viewBox="0 0 1000 1000" className="h-[200%] w-[200%]">
              <polygon fill="white" points="0,150 1000,450 1000,1000 0,850" />
            </svg>
          </div>
        </>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <FadeHeader
          title="Core Expertise"
          subtitle="A unique blend of design thinking, technical expertise, and leadership experience"
          titleClassName="text-white"
          subtitleClassName="text-white/90"
        />
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <SkillCard
            icon={<Palette className="h-12 w-12 text-white" />}
            title="Product & UX Design"
            items={[
              "Design Thinking & Strategy",
              "User-Centric Design",
              "Prototyping & Wireframing",
              "Usability Testing",
              "Figma & Adobe Suite",
            ]}
          />
          <SkillCard
            icon={<Code className="h-12 w-12 text-white" />}
            title="Technical Development"
            items={[
              "HTML, CSS, JavaScript",
              "AI Integration & Prompting",
              "DevOps & CI/CD",
              "Git & Linux",
              "Python Automation",
            ]}
          />
          <SkillCard
            icon={<Users className="h-12 w-12 text-white" />}
            title="Leadership & Process"
            items={[
              "Agile Methodologies",
              "Remote Team Leadership",
              "Project Management",
              "Process Optimization",
              "Stakeholder Management",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
