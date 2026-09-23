"use client";
import { motion } from "framer-motion";
import { Camera, Utensils, Guitar, Footprints } from "lucide-react";
import FadeHeader from "@/components/FadeHeader";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeHeader
          title="About Me"
          subtitle="Curiosity, business thinking, and hands-on building."
        />
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1.5fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative h-80 overflow-hidden rounded-2xl shadow-xl md:h-[420px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary" />
            <Image
              src="/images/aboutMe.png"
              alt="Bruno Pinheiro"
              fill
              className="relative z-10 h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-secondary/0 opacity-0 transition-opacity duration-300 hover:opacity-100">
              <div className="flex gap-6 text-white">
                <Footprints className="h-8 w-8" />
                <Camera className="h-8 w-8" />
                <Utensils className="h-8 w-8" />
                <Guitar className="h-8 w-8" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-base leading-relaxed text-surface-foreground"
          >
            <p className="mb-4">
              I'm <strong className="text-primary">Bruno Pinheiro</strong>, a{" "}
              <strong className="text-primary">
                Lead Product Designer and Design Engineer
              </strong>{" "}
              connecting product strategy, user experience, and development.
            </p>

            <p className="mb-4">
              I previously founded and ran a VR company. That experience and
              my{" "}
              <strong className="text-primary">
                MBA in Entrepreneurial Management and Innovation
              </strong>{" "}
              help me balance user needs with business viability, set
              priorities, and decide what to build.
            </p>

            <p className="mb-4">
              My interest in building started with taking motors out of toy
              cars to make small fans and boats. That curiosity led me to
              design and development with Unity, Unreal, and HTML/CSS. Today,
              I also use AI-assisted development to prototype, test, and
              iterate faster.
            </p>

            <p className="mb-4">
              I currently lead product design for educational platforms while
              building independent products and tools that address everyday
              problems.
            </p>

            <p className="mb-4">
              Outside of work, I enjoy running, photography, cooking, and
              playing guitar.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
