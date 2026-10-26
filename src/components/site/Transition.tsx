"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppearance } from "./Appearance";

type NavOptions = { color: string; label?: string; axis?: "x" | "y" };
type Ctx = { navigate: (href: string, opts: NavOptions) => void; busy: boolean };

const TransitionContext = createContext<Ctx | null>(null);

export function usePageTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("usePageTransition must be used inside TransitionProvider");
  return ctx;
}

type Phase = "idle" | "cover" | "reveal";

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { k } = useAppearance();
  const [phase, setPhase] = useState<Phase>("idle");
  const [opts, setOpts] = useState<NavOptions>({ color: "#D9824F" });
  const waiting = useRef<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const later = (fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); };

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const navigate = useCallback((href: string, o: NavOptions) => {
    if (phase !== "idle") return;
    const target = href.split("#")[0] || "/";
    router.prefetch(target);
    if (k === 0) { router.push(href); return; }
    setOpts(o);
    setPhase("cover");
    later(() => {
      waiting.current = target;
      router.push(href, { scroll: true });
      if (target === pathname) {
        waiting.current = null;
        setPhase("reveal");
        later(() => setPhase("idle"), Math.round(820 * k));
      }
    }, Math.round(620 * k));
  }, [phase, k, router, pathname]);

  useEffect(() => {
    if (!waiting.current || waiting.current !== pathname) return;
    waiting.current = null;
    window.scrollTo(0, 0);
    later(() => {
      setPhase("reveal");
      later(() => setPhase("idle"), Math.round(820 * Math.max(k, 0.3)));
    }, 140);
  }, [pathname, k]);

  const cls = `page-wipe${opts.axis === "x" ? " dir-x" : ""}${phase === "cover" ? " is-cover" : phase === "reveal" ? " is-reveal" : ""}`;

  return (
    <TransitionContext.Provider value={{ navigate, busy: phase !== "idle" }}>
      {children}
      <div className={cls} style={{ ["--wipe" as string]: opts.color }} aria-hidden="true">
        {opts.label && <span className="page-wipe-label mono">{opts.label}</span>}
      </div>
    </TransitionContext.Provider>
  );
}
