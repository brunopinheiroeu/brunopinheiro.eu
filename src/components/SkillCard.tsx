"use client";
import { motion } from "framer-motion";

export default function SkillCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className="rounded-2xl border border-white/20 bg-white/10 p-8 text-center text-white shadow-lg backdrop-blur-md transition hover:translate-y-1 hover:bg-black/25 hover:border-white/50"
    >
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border ßborder-white/50 ">
        {icon}
      </div>
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      <ul className="space-y-1 text-sm text-white/80">
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </motion.div>
  );
}
