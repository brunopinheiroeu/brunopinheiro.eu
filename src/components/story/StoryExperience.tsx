"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Stage, useStageSize } from "@/components/site/Stage";
import SiteHeader from "@/components/site/SiteHeader";
import { useAppearance } from "@/components/site/Appearance";
import { usePageTransition } from "@/components/site/Transition";
import { INTRO_ACCENT, type Chapter } from "@/lib/story";
import Cover from "./Cover";
import PaintedPortrait from "./PaintedPortrait";

type Scene =
  | { kind: "intro"; slug: ""; name: string; accent: string; eyebrow: string; title: string; description: string }
  | ({ kind: "project"; title: string } & Chapter);

type Phase = "pre" | "idle" | "out";

const INTRO: Scene = {
  kind: "intro",
  slug: "",
  name: "Introduction",
  accent: INTRO_ACCENT,
  eyebrow: "00 / Introduction",
  title: "Turning messy ideas into shipped products.",
  description: "I connect business goals, user needs, and hands-on development to build useful products, from educational platforms to tools people use every day.",
};

const pad = (i: number) => String(i).padStart(2, "0");
const DECODE_STEPS = 12;
const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%";

function splitWords(text: string) {
  let idx = 0;
  const words = text.split(" ");
  return words.map((w, wi) => (w + (wi < words.length - 1 ? " " : "")).split("").map((ch) => ({ ch, i: idx++ })));
}

function Title({ text, className, as: Tag }: { text: string; className: string; as: "h1" | "h2" }) {
  return (
    <Tag className={`display ${className}`} aria-label={text}>
      {splitWords(text).map((word, wi) => (
        <span className="word" aria-hidden="true" key={wi}>
          {word.map((c) => <span className="ch" key={c.i} style={{ ["--i" as string]: c.i }}>{c.ch}</span>)}
        </span>
      ))}
    </Tag>
  );
}

export default function StoryExperience({ chapters }: { chapters: Chapter[] }) {
  const size = useStageSize();
  const { prefs, k, panelOpen, previewMobile } = useAppearance();
  const { navigate, busy } = usePageTransition();
  const scenes = useMemo<Scene[]>(() => [INTRO, ...chapters.map((c, i) => ({ ...c, kind: "project" as const, title: c.name, eyebrow: `${pad(i + 1)} / ${c.eyebrow}` }))], [chapters]);
  const last = scenes.length - 1;

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("pre");
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const [sweepRun, setSweepRun] = useState<"" | "a" | "b">("");
  const [decodeTick, setDecodeTick] = useState(DECODE_STEPS);
  const [autoT, setAutoT] = useState(0);
  const [scrubbing, setScrubbing] = useState(false);
  const [scrubView, setScrubView] = useState(0);

  const viewport = useRef<HTMLDivElement>(null);
  const locked = useRef(true);
  const scrub = useRef(0);
  const indexRef = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const decodeTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const scrubTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const kRef = useRef(k);
  kRef.current = k;
  indexRef.current = index;

  const later = useCallback((fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); }, []);

  const setScrub = useCallback((v: number) => {
    scrub.current = v;
    const el = viewport.current;
    if (el) {
      el.style.setProperty("--scrub", v.toFixed(3));
      el.style.setProperty("--scrub-abs", Math.abs(v).toFixed(3));
    }
    setScrubView(v);
  }, []);

  const startDecode = useCallback(() => {
    if (decodeTimer.current) clearInterval(decodeTimer.current);
    if (prefs.motion !== "cinematic") { setDecodeTick(DECODE_STEPS); return; }
    let t = 0;
    setDecodeTick(0);
    decodeTimer.current = setInterval(() => {
      t += 1;
      setDecodeTick(t);
      if (t >= DECODE_STEPS && decodeTimer.current) clearInterval(decodeTimer.current);
    }, 40);
  }, [prefs.motion]);

  const goTo = useCallback((target: number) => {
    const to = Math.max(0, Math.min(last, target));
    if (to === indexRef.current || locked.current) return;
    const kk = kRef.current;
    setAutoT(0);
    setScrub(0);
    setScrubbing(false);
    if (kk === 0) { setIndex(to); setPhase("idle"); setDecodeTick(DECODE_STEPS); return; }
    locked.current = true;
    setDir(to > indexRef.current ? "fwd" : "back");
    setPhase("out");
    if (prefs.motion === "cinematic") setSweepRun((s) => (s === "a" ? "b" : "a"));
    later(() => {
      setIndex(to);
      setPhase("pre");
      later(() => {
        setPhase("idle");
        startDecode();
        later(() => { locked.current = false; }, 380 * kk);
      }, 40);
    }, 560 * kk);
  }, [last, later, prefs.motion, setScrub, startDecode]);

  // Initial chapter from the URL hash (#tomei, #work), then play the intro.
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    const found = hash === "work" ? 1 : scenes.findIndex((s) => s.slug && s.slug === hash);
    if (found > 0) setIndex(found);
    const kk = kRef.current;
    const t = setTimeout(() => {
      setPhase("idle");
      startDecode();
      setTimeout(() => { locked.current = false; }, 600 * kk);
    }, kk === 0 ? 0 : 90);
    const timersSnapshot = timers.current;
    return () => {
      clearTimeout(t);
      timersSnapshot.forEach(clearTimeout);
      if (decodeTimer.current) clearInterval(decodeTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the URL shareable: /#slug for the current chapter.
  useEffect(() => {
    const slug = scenes[index]?.slug;
    const url = slug ? `#${slug}` : window.location.pathname;
    window.history.replaceState(null, "", url);
  }, [index, scenes]);

  const openCase = useCallback((i: number) => {
    const s = scenes[i];
    if (!s || s.kind !== "project") return;
    navigate(`/products/${s.slug}`, { color: s.accent, label: `${pad(i)} — ${s.name.toUpperCase()}` });
  }, [navigate, scenes]);

  // Wheel scrubbing, keyboard and touch swipe.
  useEffect(() => {
    const inPanel = (t: EventTarget | null) => t instanceof Element && Boolean(t.closest(".settings, .mobile-preview"));
    const onWheel = (e: WheelEvent) => {
      if (previewMobile || inPanel(e.target)) return;
      e.preventDefault();
      if (locked.current || busy) return;
      const dy = e.deltaY * (e.deltaMode === 1 ? 33 : 1);
      let next = scrub.current + dy / 170;
      if (scrubTimer.current) clearTimeout(scrubTimer.current);
      const i = indexRef.current;
      if (next >= 1 && i < last) { goTo(i + 1); return; }
      if (next <= -1 && i > 0) { goTo(i - 1); return; }
      if (i === 0) next = Math.max(next, -0.25);
      if (i === last) next = Math.min(next, 0.25);
      next = Math.max(-0.99, Math.min(0.99, next));
      setScrub(next);
      setScrubbing(true);
      setAutoT(0);
      scrubTimer.current = setTimeout(() => { setScrub(0); setScrubbing(false); }, 260);
    };
    const onKey = (e: KeyboardEvent) => {
      if (previewMobile) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.closest?.(".settings"))) return;
      const onControl = Boolean(t && (t.tagName === "BUTTON" || t.tagName === "A"));
      const i = indexRef.current;
      if (["ArrowDown", "ArrowRight", "PageDown"].includes(e.key) || (e.key === " " && !onControl)) { e.preventDefault(); goTo(i + 1); }
      else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); goTo(i - 1); }
      else if (e.key === "Home") { e.preventDefault(); goTo(0); }
      else if (e.key === "End") { e.preventDefault(); goTo(last); }
      else if (e.key === "Enter" && !onControl) openCase(i);
    };
    let startY = 0;
    let startX = 0;
    const onTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; startX = e.touches[0].clientX; };
    const onTouchEnd = (e: TouchEvent) => {
      if (previewMobile) return;
      const dy = startY - e.changedTouches[0].clientY;
      const dx = startX - e.changedTouches[0].clientX;
      if (Math.abs(dy) < 50 || Math.abs(dy) < Math.abs(dx)) return;
      goTo(indexRef.current + (dy > 0 ? 1 : -1));
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [busy, goTo, last, openCase, setScrub, previewMobile]);

  // Autoplay: advance every 7s, loop back to the intro at the end.
  useEffect(() => {
    if (!prefs.autoplay || panelOpen || busy || previewMobile) return;
    const id = setInterval(() => {
      if (locked.current) return;
      setAutoT((t) => {
        if (t + 1 < 70) return t + 1;
        const i = indexRef.current;
        goTo(i >= last ? 0 : i + 1);
        return 0;
      });
    }, 100);
    return () => clearInterval(id);
  }, [prefs.autoplay, panelOpen, busy, goTo, last, previewMobile]);

  const active = scenes[index];
  const decoded = useMemo(() => {
    const text = active.eyebrow;
    if (decodeTick >= DECODE_STEPS) return text;
    const shown = Math.floor((text.length * decodeTick) / DECODE_STEPS);
    return text.split("").map((c, i) => (i < shown || c === " " || c === "/" || c === "&" ? c : POOL.charAt(Math.floor(Math.random() * POOL.length)))).join("");
  }, [active.eyebrow, decodeTick]);

  const progress = Math.max(0, Math.min(1, (index + scrubView) / last));
  const segW = 100 / last;
  const hint = index === 0 ? "SCROLL TO PLAY" : index === last ? "END — SCROLL UP TO REWIND" : "SCROLL · ← → · ENTER OPENS CASE";
  const accent = active.accent;

  return (
    <Stage
      ref={viewport}
      size={size}
      className={`phase-${phase} dir-${dir} kind-${active.kind}${scrubbing ? " is-scrubbing" : ""}`}
      style={{ ["--accent" as string]: accent }}
    >
      <div className={`wash${active.kind === "intro" ? " is-hidden" : ""}`} aria-hidden="true">
        <div className="wash-inner">
          {[34, 22, 46, 28, 16, 52].map((d, i) => <div key={i} className={`blob b${i + 1}`} style={{ ["--depth" as string]: d }} />)}
        </div>
      </div>
      <div className={`ghost-wrap${active.kind === "intro" ? " is-hidden" : ""}`} aria-hidden="true"><div className="ghost-num">{pad(index)}</div></div>
      <div className={`sweep${sweepRun ? ` run-${sweepRun}` : ""}${dir === "back" ? " back" : ""}`} aria-hidden="true">
        <span className="sweep-label mono">▸ {pad(index)} — {active.name.toUpperCase()}</span>
      </div>

      <SiteHeader variant="stage" current="work" onHome={() => goTo(0)} onWork={() => goTo(index === 0 ? 1 : index)} />

      <main className="stage" id="work">
        <div className="scene-inner">
          {active.kind === "intro" ? (
            <div className="scene-frame">
              <div className="col-text">
                <div className="mask"><div className="rise eyebrow mono" style={{ ["--d" as string]: 0 }}>{decoded}</div></div>
                <Title as="h1" className="intro-headline" text={active.title} />
                <div className="mask"><p className="rise desc intro-desc" style={{ ["--d" as string]: 3 }}>{active.description}</p></div>
                <div className="mask"><div className="rise cta-row" style={{ ["--d" as string]: 4 }}>
                  <button type="button" className="cta" onClick={() => goTo(1)}>Explore my work <span className="arrow">→</span></button>
                  <button type="button" className="cta-ghost" style={{ background: "none", border: "none", borderBottom: "1px solid var(--border)" }} onClick={() => navigate("/about", { color: INTRO_ACCENT, label: "ABOUT", axis: "x" })}>About me</button>
                </div></div>
              </div>
            </div>
          ) : (
            <div className="scene-frame">
              <div className="col-text">
                <div className="mask"><div className="rise eyebrow mono" style={{ ["--d" as string]: 0 }}>{decoded}</div></div>
                <Title as="h2" className="proj-title" text={active.title} />
                {active.headline && <div className="mask"><p className="rise subtitle" style={{ ["--d" as string]: 2 }}>{active.headline}</p></div>}
                <div className="mask"><p className="rise desc" style={{ ["--d" as string]: 3 }}>{active.description}</p></div>
                <div className="meta-list">
                  {([["Category", active.category], ["Role", active.role], ["Status", active.status]] as const).filter(([, v]) => v).map(([label, value], i) => (
                    <div className="mask" key={label}><div className="rise meta-row" style={{ ["--d" as string]: 4 + i }}><span className="meta-label">{label}</span><span className="meta-value">{value}</span></div></div>
                  ))}
                </div>
                <div className="mask cta-wrap"><div className="rise cta-row" style={{ ["--d" as string]: 7 }}>
                  <a className="cta" href={`/products/${active.slug}`} onClick={(e) => { if (e.metaKey || e.ctrlKey) return; e.preventDefault(); openCase(index); }}>View case study <span className="arrow">→</span></a>
                  {active.links.map((l) => <a key={l.url} className="ext-link" href={l.url} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>)}
                </div></div>
              </div>
              <div className="col-visual">
                <div className="visual-parallax">
                  <Cover key={active.slug} chapter={active} />
                  <div className="mask"><div className="rise fig-caption mono" style={{ ["--d" as string]: 6 }}>FIG. {pad(index)} — {active.name.toUpperCase()}</div></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {active.kind === "intro" && (
        <div className="portrait-wrap"><PaintedPortrait src="/images/story/portrait.webp" /></div>
      )}

      <nav className="progress" aria-label="Chapters">
        <span className="progress-label mono">{pad(0)}</span>
        <div className="progress-track">
          <div className="progress-line" />
          <div className="progress-fill" style={{ height: `calc((100% - 14px) * ${index / last})` }} />
          {scenes.map((s, i) => (
            <button
              key={s.name}
              type="button"
              className={`dot-btn${i === index ? " is-active" : i < index ? " is-past" : ""}`}
              aria-label={`Go to ${s.name}`}
              aria-current={i === index ? "step" : undefined}
              onClick={() => goTo(i)}
            >
              <span className="dot-tip mono">{pad(i)} {s.name}</span>
            </button>
          ))}
        </div>
        <span className="progress-label mono">{pad(last)}</span>
      </nav>

      <div className="player">
        <button type="button" className="nav-btn" onClick={() => goTo(index - 1)} aria-label="Previous chapter">←</button>
        <AutoplayButton />
        <span className="timecode mono">{pad(index)} / {pad(last)}</span>
        <span className="player-sep" />
        <span className="player-name mono">{active.name.toUpperCase()}</span>
        <span className="player-spacer" />
        <span className="player-hint mono">{hint}{index < last && <span className="hint-chevron">↓</span>}</span>
        <button type="button" className="nav-btn" onClick={() => goTo(index + 1)} aria-label="Next chapter">→</button>
      </div>
      <div className="timeline" aria-hidden="true">
        <div className="timeline-fill" style={{ width: `${progress * 100}%` }} />
        <div className="timeline-auto" style={prefs.autoplay ? { left: `${index * segW}%`, width: `${(autoT / 70) * segW}%` } : { width: 0 }} />
      </div>
    </Stage>
  );
}

function AutoplayButton() {
  const { prefs, setPref } = useAppearance();
  return (
    <button type="button" className={`play-btn${prefs.autoplay ? " is-on" : ""}`} onClick={() => setPref("autoplay", !prefs.autoplay)} aria-label={prefs.autoplay ? "Pause autoplay" : "Play the story automatically"}>
      <svg className="ico-play" width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4l13 8-13 8z" /></svg>
      <svg className="ico-pause" width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
    </button>
  );
}
