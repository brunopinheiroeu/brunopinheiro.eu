"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePageTransition } from "@/components/site/Transition";
import { INTRO_ACCENT } from "@/lib/story";

export function ReadProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.current?.style.setProperty("--read", String(max > 0 ? window.scrollY / max : 0));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={bar} className="read-progress" aria-hidden="true" />;
}

export function BackToWork({ slug }: { slug?: string }) {
  const { navigate } = usePageTransition();
  const href = slug ? `/#${slug}` : "/";
  return (
    <Link
      className="back-btn"
      href={href}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        navigate(href, { color: INTRO_ACCENT, label: "WORK" });
      }}
    >
      ← Back to work
    </Link>
  );
}

export function NextCase({ slug, name, accent, label }: { slug: string; name: string; accent: string; label: string }) {
  const { navigate } = usePageTransition();
  return (
    <div className="case-next">
      <span className="case-next-label mono">NEXT CASE</span>
      <Link
        className="next-case"
        href={`/products/${slug}`}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey) return;
          e.preventDefault();
          navigate(`/products/${slug}`, { color: accent, label });
        }}
      >
        <span className="display next-title">{name}</span>
        <span className="next-arrow" aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
