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
          subtitle="Smart Work Over Hard Work - Always Building Better"
        />
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1.5fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative h-80 overflow-hidden rounded-2xl shadow-xl md:h-[420px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-violet-700" />
            <Image
              src="/images/aboutMe.png"
              alt="Bruno Pinheiro"
              fill
              className="relative z-10 h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-violet-600/0 opacity-0 transition-opacity duration-300 hover:opacity-100">
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
            className="text-base leading-relaxed text-slate-800"
          >
            <p className="mb-4">
              Hi, my name is
              <strong className="text-indigo-700"> Bruno Pinheiro</strong> and
              I`m a{" "}
              <strong className="text-indigo-700">AI Product Builder</strong>{" "}
              based in Valencia, Spain.{" "}
            </p>
            <p className="mb-4">
              It's not that I'm always working—I really don't believe heavy work
              is the answer. I believe in smart work: using the right tools,
              learning fast, and improving processes to build better products
              and a better quality of life.
            </p>

            <p className="mb-4">
              My tech journey started in the late '90s with my first course:
              "How to Assemble and Maintain a Computer." But honestly, my
              earliest memory is way before that—pulling motors from toy cars to
              build my own fans and boats. That curiosity never left.
            </p>

            <p className="mb-4">
              For 20 years, I designed products. Then AI tools arrived and I
              realized: why hand off when I can just build it myself? So I
              learned to code with AI, and now I ship complete products—from
              concept to deployment—in weeks.
            </p>

            <p className="mb-4">
              Outside of work: running (went from obese to full marathon
              runner), photography, cooking, and guitar.
            </p>

            <p className="mb-4">
              Currently building AI tools, managing educational gaming
              platforms, and helping designers become builders.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
