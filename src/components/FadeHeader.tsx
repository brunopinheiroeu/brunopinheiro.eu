"use client";
import { motion } from "framer-motion";

export default function FadeHeader({
  title,
  subtitle,
  titleClassName = "",
  subtitleClassName = "",
}: {
  title: string;
  subtitle: string;
  titleClassName?: string;
  subtitleClassName?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className={`mb-3 text-3xl font-bold text-slate-900 md:text-4xl ${titleClassName}`}
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className={`text-sm text-slate-600 md:text-base ${subtitleClassName}`}
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
