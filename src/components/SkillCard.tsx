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
      className="rounded-2xl border-2 border-transparent bg-white p-8 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-600"
    >
      <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
        {icon}
      </div>
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      <ul className="space-y-1 text-sm text-slate-600">
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </motion.div>
  );
}
