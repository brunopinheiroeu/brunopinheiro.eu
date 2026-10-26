"use client";

import { useEffect, useRef, useState } from "react";
import { Stage, useStageSize } from "@/components/site/Stage";
import SiteHeader from "@/components/site/SiteHeader";
import { useAppearance } from "@/components/site/Appearance";
import { usePageTransition } from "@/components/site/Transition";
import { CONTACT, FACETS, INTRO_ACCENT, accentFor } from "@/lib/story";

type ChapterRef = { slug: string; name: string };

const pad = (i: number) => String(i).padStart(2, "0");

export default function AboutExperience({ chapters }: { chapters: ChapterRef[] }) {
  const size = useStageSize();
  const { toast } = useAppearance();
  const { navigate } = usePageTransition();
  const [discovered, setDiscovered] = useState<Record<string, true>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [spin, setSpin] = useState(0);
  const [copied, setCopied] = useState(false);
  const milestones = useRef({ half: false, all: false });
  const orbitRef = useRef<HTMLDivElement>(null);

  const count = Object.keys(discovered).length;

  const pick = (key: string) => {
    const next = { ...discovered, [key]: true as const };
    const n = Object.keys(next).length;
    setDiscovered(next);
    setSelected(key);
    if (n === 5 && !milestones.current.half) { milestones.current.half = true; toast("Halfway there — 5 of 10 facets discovered."); }
    if (n === FACETS.length && !milestones.current.all) { milestones.current.all = true; toast("Achievement unlocked: Curious mind. You explored every facet."); }
  };

  useEffect(() => {
    const el = orbitRef.current;
    if (!el || size.mobile) return;
    const onWheel = (e: WheelEvent) => { e.preventDefault(); setSpin((s) => s + e.deltaY * 0.25); };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [size.mobile]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement | null)?.closest?.(".settings")) return;
      if (e.key === "ArrowRight") setSpin((s) => s + 30);
      if (e.key === "ArrowLeft") setSpin((s) => s - 30);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const copyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      toast("My email was copied to your clipboard");
      setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  };

  const goCase = (slug: string) => {
    const i = chapters.findIndex((c) => c.slug === slug);
    const name = chapters[i]?.name ?? slug;
    navigate(`/products/${slug}`, { color: accentFor(slug), label: `${pad(i + 1)} — ${name.toUpperCase()}` });
  };

  const facet = FACETS.find((f) => f.key === selected);
  const facetIndex = FACETS.findIndex((f) => f.key === selected);

  const nodes = (ring: "a" | "b", radius: number, offset: number) => {
    const list = FACETS.filter((f) => f.ring === ring);
    return list.map((f, i) => {
      const a = offset + i * (360 / list.length);
      return (
        <button
          key={f.key}
          type="button"
          className={`node node-${ring}${discovered[f.key] ? " is-found" : " is-new"}${selected === f.key ? " is-selected" : ""}`}
          style={{ transform: `rotate(${a}deg) translateX(${radius}px) rotate(${-a}deg)` }}
          onClick={() => pick(f.key)}
          aria-label={`Discover: ${f.label}`}
          aria-pressed={selected === f.key}
        >
          <span className="node-inner"><span className="node-unspin"><span className="node-dot" /><span className="node-label">{f.label}</span></span></span>
        </button>
      );
    });
  };

  return (
    <Stage size={size} className="phase-idle kind-about" style={{ ["--accent" as string]: INTRO_ACCENT }}>
      <div className="wash" aria-hidden="true">
        <div className="wash-inner">
          {[30, 24, 14].map((d, i) => <div key={i} className={`blob ${["b1", "b4", "b5"][i]}`} style={{ ["--depth" as string]: d }} />)}
        </div>
      </div>
      <SiteHeader variant="stage" current="about" />
      <div className="about-inner">
        <div className="about-text">
          <span className="eyebrow mono about-rise" style={{ ["--d" as string]: 0 }}>About — interactive</span>
          <h1 className="display about-title about-rise" style={{ ["--d" as string]: 1 }}>Curiosity, business thinking, and hands-on building.</h1>
          <p className="about-intro about-rise" style={{ ["--d" as string]: 2 }}>
            I'm Bruno Pinheiro, a Lead Product Designer and Design Engineer connecting product strategy, user experience, and development. I currently lead product design for educational platforms while building independent products and tools that address everyday problems.
          </p>
          <div className="stats about-rise" style={{ ["--d" as string]: 3 }}>
            <div className="stat"><span className="stat-num">3,500+</span><span className="stat-label">Products on the design system I built</span></div>
            <div className="stat"><span className="stat-num">50,000+</span><span className="stat-label">Students on the redesigned platform</span></div>
            <div className="stat"><span className="stat-num">10x+</span><span className="stat-label">Faster resource production</span></div>
          </div>
          <div className="about-rise" style={{ ["--d" as string]: 4 }}>
            <div className="discover-head mono"><span>DISCOVERED</span><span>{count} / {FACETS.length}</span></div>
            <div className="segs" aria-hidden="true">
              {FACETS.map((f, i) => <span key={f.key} className={`seg${i < count ? " is-on" : ""}`} />)}
            </div>
            <div className="facet-card" aria-live="polite">
              {facet ? (
                <>
                  <div className="facet-num mono">FACET {pad(facetIndex + 1)} / {FACETS.length} · {facet.ring === "a" ? "CORE" : "HOW I WORK"}</div>
                  <h2 className="facet-title">{facet.title}</h2>
                  <span className="seen-label mono">WHY</span>
                  <p className="facet-body">{facet.body}</p>
                  {facet.seen.length > 0 && (
                    <div className="seen">
                      <span className="seen-label mono">WHERE TO FIND IT</span>
                      {facet.seen.map((slug) => {
                        const c = chapters.find((x) => x.slug === slug);
                        return c ? <button key={slug} type="button" className="chip" onClick={() => goCase(slug)}>{c.name} →</button> : null;
                      })}
                    </div>
                  )}
                </>
              ) : (
                <p className="facet-hint"><strong>Click any node in the orbit</strong> to see why it matters and where to find it in my work. The inner ring is the core; the outer ring is how I work and who I am off the clock. Scroll to spin, hover to pause. Find all ten.</p>
              )}
            </div>
          </div>
          <div className="about-links about-rise" style={{ ["--d" as string]: 5 }}>
            <a href={CONTACT.cv} target="_blank" rel="noopener noreferrer">Download CV ↗</a>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href={`mailto:${CONTACT.email}`} onClick={copyEmail} title="Copy email address">{copied ? "Email copied ✓" : `${CONTACT.email} ⧉`}</a>
          </div>
        </div>

        <div className="orbit-stage" ref={orbitRef}>
          <div className="orbit-scale">
            <div className={`orbit${count === FACETS.length ? " is-complete" : ""}`}>
              <div className="orbit-tilt">
                <div className="guide g3" />
                <div className="guide g2" />
                <div className="guide g1" />
                <div className="axis-x" />
                <div className="axis-y" />
                <span className="deg deg-t mono">000°</span>
                <span className="deg deg-r mono">090°</span>
                <span className="deg deg-b mono">180°</span>
                <span className="deg deg-l mono">270°</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <div className="core"><img src="/images/story/portrait.webp" alt="" /></div>
                <div className="orbit-spin" style={{ transform: `rotate(${spin}deg)`, ["--spin" as string]: `${spin}deg` }}>
                  <div className="ring ring-a">{nodes("a", 180, 30)}</div>
                  <div className="ring ring-b">{nodes("b", 280, 15)}</div>
                </div>
              </div>
              <span className="orbit-hint mono">{count === FACETS.length ? "ALL FACETS DISCOVERED ✦" : "SCROLL TO SPIN · HOVER TO PAUSE · CLICK A NODE"}</span>
            </div>
          </div>
        </div>
      </div>
    </Stage>
  );
}
