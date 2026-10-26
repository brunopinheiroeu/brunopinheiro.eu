import type { Chapter } from "@/lib/story";

const r3 = (v: number) => Math.round(v * 1000) / 1000;

export default function Cover({ chapter }: { chapter: Chapter }) {
  const { layers, chip, rigid, imageAlt } = chapter;
  return (
    <div className={`stack${rigid ? " is-rigid" : ""}`} role="img" aria-label={imageAlt}>
      {layers.map((ly, i) => {
        const ease = ly.enter === "swing" ? "cubic-bezier(.16,1,.3,1)" : "cubic-bezier(.34,1.4,.64,1)";
        const style = {
          left: `${r3(ly.x * 100)}%`,
          top: `${r3(ly.y * 100)}%`,
          width: `${r3(ly.w * 100)}%`,
          "--z": i + 1,
          "--i": ly.order,
          "--rot": `${ly.rot}deg`,
          "--depth": ly.depth,
          "--ease": ease,
          "--sx": r3(0.3 - ly.x),
          "--sy": r3((0.42 - ly.y) * 0.8696),
          "--fd": `${ly.fd}s`,
          "--fdl": `${ly.fdl}s`,
          "--fa": ly.fa ?? 10,
        } as React.CSSProperties;
        const screen = ly.screen
          ? ({ clipPath: ly.screen.clip, "--sl": `${ly.screen.box[0]}%`, "--st": `${ly.screen.box[1]}%`, "--sw": `${ly.screen.box[2]}%`, "--sh": `${ly.screen.box[3]}%` } as React.CSSProperties)
          : undefined;
        return (
          <div key={ly.src} className={`cover-layer enter-${ly.enter}${ly.still ? " is-still" : ""}`} style={style}>
            <div className="layer-in">
              <div className="layer-float">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ly.src} alt="" draggable={false} />
                {screen && <span className="crt-screen" style={screen} />}
              </div>
            </div>
          </div>
        );
      })}
      {chip && (
        <>
          <span className="q-move" style={{ left: `${r3(chip.x * 100)}%`, top: `${r3(chip.y * 100)}%`, ["--dx" as string]: chip.dx, ["--dy" as string]: chip.dy }} aria-hidden="true">
            <span className="q-move-y"><span className="q-chip">{chip.label}</span></span>
          </span>
          <span className="q-ping" style={{ left: `${r3((chip.x + chip.dx) * 100)}%`, top: `${r3((chip.y + (chip.dy * 644) / 560) * 100)}%` }} aria-hidden="true" />
        </>
      )}
    </div>
  );
}
