"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

export type Prefs = {
  theme: "studio" | "paper" | "night";
  font: "serif" | "sans";
  size: "s" | "m" | "l";
  radius: number;
  motion: "cinematic" | "calm" | "off";
  wash: boolean;
  grid: boolean;
  cursor: boolean;
  autoplay: boolean;
};

export const PREFS_KEY = "bp-site-v1";
export const DEFAULT_PREFS: Prefs = { theme: "studio", font: "serif", size: "m", radius: 12, motion: "cinematic", wash: true, grid: false, cursor: false, autoplay: false };

// Runs before paint (see layout) so saved preferences never flash.
export const PREFS_BOOT_SCRIPT = `(function(){try{var d=document.documentElement,p=JSON.parse(localStorage.getItem('${PREFS_KEY}')||'{}');var r=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;d.dataset.theme=p.theme||'studio';d.dataset.font=p.font||'serif';d.dataset.size=p.size||'m';d.dataset.motion=p.motion||(r?'off':'cinematic');d.dataset.wash=p.wash===false?'off':'on';if(typeof p.radius==='number')d.style.setProperty('--radius',p.radius+'px');}catch(e){}})();`;

type Ctx = {
  prefs: Prefs;
  setPref: <K extends keyof Prefs>(key: K, value: Prefs[K]) => void;
  reset: () => void;
  panelOpen: boolean;
  setPanelOpen: (open: boolean) => void;
  toast: (message: string) => void;
  k: number;
  previewMobile: boolean;
  setPreviewMobile: (on: boolean) => void;
};

const AppearanceContext = createContext<Ctx | null>(null);

export function useAppearance() {
  const ctx = useContext(AppearanceContext);
  if (!ctx) throw new Error("useAppearance must be used inside AppearanceProvider");
  return ctx;
}

function motionFactor(motion: Prefs["motion"]) {
  return motion === "cinematic" ? 1 : motion === "calm" ? 0.8 : 0;
}

// Saved preferences live in a tiny external store so hydration renders the
// server defaults first and React swaps in the saved values without a mismatch.
let storedPrefs: Prefs | null = null;
const listeners = new Set<() => void>();

function readPrefs(): Prefs {
  if (storedPrefs) return storedPrefs;
  let saved: Partial<Prefs> = {};
  try { saved = JSON.parse(localStorage.getItem(PREFS_KEY) || "{}"); } catch {}
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  storedPrefs = { ...DEFAULT_PREFS, motion: reduce ? "off" : "cinematic", ...saved };
  return storedPrefs;
}

function writePrefs(next: Prefs) {
  storedPrefs = next;
  try { localStorage.setItem(PREFS_KEY, JSON.stringify(next)); } catch {}
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keeps the mobile preview iframe (same origin) in sync with the panel.
  const onStorage = (e: StorageEvent) => {
    if (e.key !== PREFS_KEY) return;
    storedPrefs = null;
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function AppearanceProvider({ children }: { children: React.ReactNode }) {
  const prefs = useSyncExternalStore(subscribe, readPrefs, () => DEFAULT_PREFS);
  const [panelOpen, setPanelOpen] = useState(false);
  const [previewMobile, setPreviewMobile] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastOn, setToastOn] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Read the store, not the render value: during hydration React renders
    // the server defaults, which must not overwrite the boot script's choice.
    const p = readPrefs();
    const d = document.documentElement;
    d.dataset.theme = p.theme;
    d.dataset.font = p.font;
    d.dataset.size = p.size;
    d.dataset.motion = p.motion;
    d.dataset.wash = p.wash ? "on" : "off";
    d.style.setProperty("--radius", `${p.radius}px`);
    d.classList.toggle("cursor-on", p.cursor);
  }, [prefs]);

  const setPref = useCallback(<K extends keyof Prefs>(key: K, value: Prefs[K]) => {
    writePrefs({ ...readPrefs(), [key]: value });
  }, []);

  const toast = useCallback((message: string) => {
    setToastMsg(message);
    setToastOn(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastOn(false), 3800);
  }, []);

  const value = useMemo<Ctx>(() => ({
    prefs,
    setPref,
    reset: () => writePrefs(DEFAULT_PREFS),
    panelOpen,
    setPanelOpen,
    toast,
    k: motionFactor(prefs.motion),
    previewMobile,
    setPreviewMobile,
  }), [prefs, setPref, panelOpen, toast, previewMobile]);

  return (
    <AppearanceContext.Provider value={value}>
      {children}
      {previewMobile && <MobilePreview onExit={() => setPreviewMobile(false)} />}
      {panelOpen && <AppearancePanel />}
      {prefs.grid && <LayoutGrid />}
      {prefs.cursor && <CustomCursor />}
      <div className={`toast${toastOn ? " is-on" : ""}`} role="status" aria-live="polite">
        <span className="toast-badge mono" aria-hidden="true">✦</span>
        <span>{toastMsg}</span>
      </div>
    </AppearanceContext.Provider>
  );
}

function Seg<T extends string>({ value, options, onPick }: { value: T; options: [T, string][]; onPick: (v: T) => void }) {
  return (
    <div className="seg-ctl">
      {options.map(([v, label]) => (
        <button key={v} type="button" className={value === v ? "is-active" : ""} aria-pressed={value === v} onClick={() => onPick(v)}>{label}</button>
      ))}
    </div>
  );
}

function Toggle({ label, on, onToggle }: { label: string; on: boolean; onToggle: () => void }) {
  return (
    <div className="toggle-row">
      <span>{label}</span>
      <button type="button" className={`switch${on ? " is-on" : ""}`} role="switch" aria-checked={on} aria-label={label} onClick={onToggle}>
        <span className="knob" />
      </button>
    </div>
  );
}

function AppearancePanel() {
  const { prefs, setPref, reset, setPanelOpen, previewMobile, setPreviewMobile } = useAppearance();
  // The panel only ever renders on the client, after a click.
  const canPreview = window.self === window.top && window.innerWidth >= 900;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setPanelOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setPanelOpen]);

  const themes: [Prefs["theme"], string, string][] = [["studio", "Studio", "#EDEEF1"], ["paper", "Paper", "#F6F1E7"], ["night", "Night", "#17181B"]];

  return (
    <aside className="settings" aria-label="Appearance settings">
      <div className="set-head">
        <span><span className="set-title">Appearance</span><span className="set-ver mono">SETUP</span></span>
        <button type="button" className="set-close" onClick={() => setPanelOpen(false)} aria-label="Close settings">×</button>
      </div>
      <div className="set-group">
        <div className="set-label"><span>Theme</span></div>
        <div className="theme-row">
          {themes.map(([v, label, swatch]) => (
            <button key={v} type="button" className={`theme-opt${prefs.theme === v ? " is-active" : ""}`} aria-pressed={prefs.theme === v} onClick={() => setPref("theme", v)}>
              <span className="swatch" style={{ background: swatch }} />{label}
            </button>
          ))}
        </div>
      </div>
      <div className="set-group">
        <div className="set-label"><span>Headline</span></div>
        <Seg value={prefs.font} options={[["serif", "Editorial serif"], ["sans", "Grotesk"]]} onPick={(v) => setPref("font", v)} />
      </div>
      <div className="set-group">
        <div className="set-label"><span>Text size</span></div>
        <Seg value={prefs.size} options={[["s", "S"], ["m", "M"], ["l", "L"]]} onPick={(v) => setPref("size", v)} />
      </div>
      <div className="set-group">
        <div className="set-label"><span>Corner radius</span><span className="mono">{prefs.radius}px</span></div>
        <input className="slider" type="range" min={0} max={32} step={1} value={prefs.radius} onChange={(e) => setPref("radius", Number(e.target.value))} aria-label="Corner radius" />
      </div>
      <div className="set-group">
        <div className="set-label"><span>Motion</span></div>
        <Seg value={prefs.motion} options={[["cinematic", "Cinematic"], ["calm", "Calm"], ["off", "Off"]]} onPick={(v) => setPref("motion", v)} />
      </div>
      <div className="set-group">
        <Toggle label="Color wash" on={prefs.wash} onToggle={() => setPref("wash", !prefs.wash)} />
        <Toggle label="Layout grid" on={prefs.grid} onToggle={() => setPref("grid", !prefs.grid)} />
        <Toggle label="Custom cursor" on={prefs.cursor} onToggle={() => setPref("cursor", !prefs.cursor)} />
      </div>
      {canPreview && (
        <div className="set-group">
          <div className="set-label"><span>Preview</span></div>
          <Seg value={previewMobile ? "mobile" : "desktop"} options={[["desktop", "Desktop"], ["mobile", "Mobile"]]} onPick={(v) => setPreviewMobile(v === "mobile")} />
        </div>
      )}
      <div className="set-foot">
        <span className="kbd-hint mono">SCROLL · ← → · ESC</span>
        <button type="button" className="reset-btn" onClick={reset}>↺ Reset to default</button>
      </div>
    </aside>
  );
}

function LayoutGrid() {
  return (
    <>
      <div className="grid-overlay" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => <span key={i} />)}
      </div>
      <span className="grid-tag mono" aria-hidden="true">GRID · 12 COL · 24 GUTTER · 4 COL ON PHONES</span>
    </>
  );
}

function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const t = `translate(${e.clientX}px, ${e.clientY}px)`;
      if (dot.current) dot.current.style.transform = t;
      if (ring.current) ring.current.style.transform = t;
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}

function MobilePreview({ onExit }: { onExit: () => void }) {
  const [src] = useState(() => window.location.pathname + window.location.hash);
  const [scale, setScale] = useState(() => Math.min(1, (window.innerHeight - 64) / 844));

  useEffect(() => {
    const onResize = () => setScale(Math.min(1, (window.innerHeight - 64) / 844));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="mobile-preview" role="dialog" aria-label="Mobile preview">
      <div className="preview-caption">
        <span className="mono">PREVIEW — MOBILE · 390 × 844</span>
        <span className="preview-hint">Swipe, scroll or tap the arrows inside the phone. Everything works as on a real device.</span>
        <button type="button" className="back-btn" onClick={onExit}>← Back to desktop</button>
      </div>
      <div className="phone-frame" style={{ ["--ps" as string]: scale }}>
        <iframe src={src} title="Mobile preview of the portfolio" />
      </div>
    </div>
  );
}
