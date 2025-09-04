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
          subtitle="Smart Work Over Hard Work — Always Building Better"
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
              It`s not that I`m always working — actually, I really don`t
              believe that heavy work is the answer. I believe in{" "}
              <strong className="text-indigo-700">smart work</strong>: making
              the most of our time, learning new tools, and improving processes
              to build better projects and a better quality of life.
            </p>
            <p className="mb-4">
              My journey into tech started back in the late `90s. In 1998, I
              took my first course:{" "}
              <strong className="text-indigo-700">
                How to Assemble and Maintain a Computer
              </strong>
              , followed by{" "}
              <strong className="text-indigo-700">Programming in Delphi</strong>
              . But honestly, my earliest memory of all is way before that —{" "}
              <em className="text-slate-500">
                pulling motors from toy cars to build my own fans and boats
              </em>
              .
            </p>
            <p>
              Fast forward a bit, in 2001 I began studying Graphic Design while
              working with web technologies like HTML, Fireworks, Photoshop,
              Flash and PHP. Since then, I`ve explored multiple fields of
              design, with a special focus on 3D, Video, Games, Web, VR, AR, 3D
              printing, UX and now AI.{" "}
            </p>
            <p>
              Outside of work, my passions are{" "}
              <strong className="text-indigo-700">
                running, photography, cooking, and playing guitar.{" "}
              </strong>
              <em className="text-slate-500">
                Would you believe if I said that I went from Obese to Run a Full
                marathon?
              </em>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
