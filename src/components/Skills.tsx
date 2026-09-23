"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeHeader from "@/components/FadeHeader";
import SkillCard from "@/components/SkillCard";
import { Compass, PenTool, Rocket } from "lucide-react";

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
      id="expertise"
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end py-24 text-white"
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
          subtitle="The intersection of design, AI, and rapid execution."
          titleClassName="text-white"
          subtitleClassName="text-white/90"
        />
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <SkillCard
            icon={<Compass className="h-12 w-12 text-white" />}
            title="Product Strategy & Business"
            items={[
              "Problem discovery & validation",
              "Business viability & prioritization",
              "MVP scoping & trade-offs",
              "Stakeholder alignment",
            ]}
          />

          <SkillCard
            icon={<PenTool className="h-12 w-12 text-white" />}
            title="Product & UX Design"
            items={[
              "User journeys & interaction design",
              "UI design & reusable systems",
              "Usability testing & iteration",
              "Design leadership & collaboration",
            ]}
          />

          <SkillCard
            icon={<Rocket className="h-12 w-12 text-white" />}
            title="Development & Automation"
            items={[
              "Web & mobile product development",
              "AI-assisted prototyping & implementation",
              "Internal tools & workflow automation",
              "Deployment & ongoing improvements",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
