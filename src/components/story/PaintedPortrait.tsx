import { useId } from "react";

const PENCIL = [
  { d: "M170 110 L1120 200 L210 300 L1170 390 L190 480 L1180 560", pd: 520, pdl: 60 },
  { d: "M130 560 L1200 650 L160 740 L1220 830 L140 920", pd: 480, pdl: 220 },
  { d: "M110 900 L1240 980 L130 1070 L1250 1150 L210 1210", pd: 460, pdl: 360 },
];

const COLOR = [
  { d: "M300 90 C600 0 900 150 1160 250", w: 300, pd: 420, pdl: 520 },
  { d: "M80 420 C400 300 800 460 1240 360", w: 300, pd: 420, pdl: 640 },
  { d: "M520 260 C660 560 700 820 640 1180", w: 300, pd: 420, pdl: 720 },
  { d: "M120 720 C500 580 900 770 1260 650", w: 300, pd: 420, pdl: 800 },
  { d: "M60 1010 C400 890 850 1090 1280 950", w: 300, pd: 420, pdl: 900 },
  { d: "M260 200 C300 600 260 900 300 1180", w: 260, pd: 400, pdl: 980 },
];

const t = (pd: number, pdl: number) => ({ ["--pd" as string]: `calc(${pd}ms * var(--k))`, ["--pdl" as string]: `calc(${pdl}ms * var(--k))` });

// Reveals the portrait as if drawn live: grey pencil scribbles first, then
// watercolor strokes bring in the color. Driven by the stage phase classes.
export default function PaintedPortrait({ src }: { src: string }) {
  const id = useId().replace(/:/g, "");
  const rough = `rough-${id}`;
  const pencil = `pencil-${id}`;
  const maskPencil = `mp-${id}`;
  const maskColor = `mc-${id}`;

  return (
    <svg className="hero-portrait" viewBox="0 0 1293 1217" role="img" aria-label="Hand-drawn pencil and watercolor portrait of Bruno Pinheiro">
      <defs>
        <filter id={rough} x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves={3} seed={7} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={70} xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id={pencil}>
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="linear" slope={1.08} />
            <feFuncG type="linear" slope={1.08} />
            <feFuncB type="linear" slope={1.08} />
          </feComponentTransfer>
        </filter>
        <mask id={maskPencil} maskUnits="userSpaceOnUse" x="0" y="0" width="1293" height="1217">
          <g filter={`url(#${rough})`}>
            {PENCIL.map((s, i) => (
              <path key={i} className="paint-stroke" pathLength={1} strokeWidth={170} d={s.d} style={t(s.pd, s.pdl)} />
            ))}
          </g>
          <rect className="paint-fill" x="0" y="0" width="1293" height="1217" fill="#fff" style={t(320, 820)} />
        </mask>
        <mask id={maskColor} maskUnits="userSpaceOnUse" x="0" y="0" width="1293" height="1217">
          <g filter={`url(#${rough})`}>
            {COLOR.map((s, i) => (
              <path key={i} className="paint-stroke" pathLength={1} strokeWidth={s.w} d={s.d} style={t(s.pd, s.pdl)} />
            ))}
          </g>
          <rect className="paint-fill" x="0" y="0" width="1293" height="1217" fill="#fff" style={t(380, 1320)} />
        </mask>
      </defs>
      <image href={src} x="0" y="0" width="1293" height="1217" filter={`url(#${pencil})`} mask={`url(#${maskPencil})`} />
      <image href={src} x="0" y="0" width="1293" height="1217" mask={`url(#${maskColor})`} />
    </svg>
  );
}
