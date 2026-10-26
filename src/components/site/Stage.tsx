"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

export type StageSize = { mobile: boolean; scale: number; w: number; h: number; ready: boolean };

const DESKTOP = { w: 1440, h: 900 };
const MOBILE_W = 390;
const MOBILE_BREAKPOINT = 900;

function measure(): StageSize {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (vw < MOBILE_BREAKPOINT) {
    const scale = Math.min(vw / MOBILE_W, 1.6);
    return { mobile: true, scale, w: vw / scale, h: vh / scale, ready: true };
  }
  const scale = Math.min(vw / DESKTOP.w, vh / DESKTOP.h);
  return { mobile: false, scale, w: vw / scale, h: vh / scale, ready: true };
}

export function useStageSize() {
  const [size, setSize] = useState<StageSize>({ mobile: false, scale: 1, w: DESKTOP.w, h: DESKTOP.h, ready: false });
  useEffect(() => {
    const update = () => setSize(measure());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

type StageProps = {
  size: StageSize;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

// Fixed full-window host that renders its content at design size and scales
// it to fit. Pointer position is written to CSS variables (--mx/--my) on the
// viewport so parallax never re-renders React.
export const Stage = forwardRef<HTMLDivElement, StageProps>(function Stage({ size, className, style, children }, ref) {
  const inner = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => inner.current as HTMLDivElement);

  useEffect(() => {
    const el = inner.current;
    if (!el) return;
    let raf = 0;
    let px = 0;
    let py = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      px = (e.clientX / window.innerWidth) * 2 - 1;
      py = (e.clientY / window.innerHeight) * 2 - 1;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        el.style.setProperty("--mx", px.toFixed(3));
        el.style.setProperty("--my", py.toFixed(3));
      });
    };
    const onLeave = () => { el.style.setProperty("--mx", "0"); el.style.setProperty("--my", "0"); };
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`stage-host${size.ready ? "" : " is-pending"}`}>
      <div
        ref={inner}
        className={`viewport${size.mobile ? " is-mobile" : ""}${className ? ` ${className}` : ""}`}
        style={{ width: size.w, height: size.h, transform: `scale(${size.scale})`, ...style }}
      >
        {children}
      </div>
    </div>
  );
});
