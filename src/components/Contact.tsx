// === File: components/Contact.tsx ===
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FadeHeader from "@/components/FadeHeader";
import { Mail, Check } from "lucide-react";
import { SiLinkedin, SiGithub } from "react-icons/si";

export default function Contact() {
  const EMAIL = "bruno@pinheiro.art.br";
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = EMAIL;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
    }
  };

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 5000);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-700 py-24 text-white"
    >
      {/* angled overlay (static, sem parallax) */}
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 1000 1000" className="h-[160%] w-[160%]">
          <polygon fill="white" points="0,0 1000,300 1000,1000 0,700" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <FadeHeader
          titleClassName="text-white"
          subtitleClassName="text-white/90"
          title="Let's Build Something"
          subtitle="Got an idea that needs to ship fast? Let's talk about turning it 
into reality."
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          {/* Copy email */}
          <button
            onClick={copyEmail}
            className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 font-medium backdrop-blur transition hover:-translate-y-0.5 ${
              copied
                ? "border-white bg-white/20 text-white"
                : "border-white/30 bg-white/10 text-white hover:bg-white/20"
            }`}
            aria-live="polite"
          >
            {copied ? (
              <Check className="h-5 w-5" />
            ) : (
              <Mail className="h-5 w-5" />
            )}
            {copied ? "Copied!" : "Copy my email"}
          </button>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/brunopinheiroeu"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-medium text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
          >
            <SiLinkedin className="h-5 w-5" /> LinkedIn
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/brunopinheiroeu"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-medium text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
          >
            <SiGithub className="h-5 w-5" /> GitHub
          </a>
        </motion.div>

        {/* copied message */}
        <div className="h-6 pt-2">
          {copied && (
            <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-sm text-white/90">
              {EMAIL} copied to clipboard
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
