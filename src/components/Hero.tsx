"use client";
import {
  MotionValue,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { scrollToSection } from "@/lib/scroll";

type ShowcaseCard = {
  id: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  name: string;
  description: string;
  // Case study page when one exists in Contentful (productUrl there is
  // shown, not linked, when a case page exists - see contentful.ts),
  // otherwise a confirmed public product URL. Left undefined when
  // neither is confirmed - the card then renders as a static,
  // non-clickable preview.
  href?: string;
  external?: boolean;
  column: "left" | "right";
  // Fixed render height (px); width follows from the image's own aspect
  // ratio, never stretched or cropped. Chosen so each column's 3 heights +
  // 2 gaps add up to the exact same total, so both columns stay flush top
  // AND flush bottom with a truly identical gap - see COLLAGE_HEIGHT/GAP.
  boxHeight: number;
  // Corner the caption hangs off of (see captionAnchorClass for the base
  // "outside the image" positioning).
  captionCorner: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  // How far it's then pulled back toward/into the image - normally just
  // 10% of the caption's own size on each axis, but some cards need more
  // pull (to avoid running off small screens) or an extra fixed nudge.
  captionPull: string;
};

const COLLAGE_GAP = 16; // px, matches gap-4
const COLLAGE_HEIGHT = 610; // px - both columns sum to exactly this

// Real product screenshots, replacing the old AI-generated portrait photos.
// Two independent columns (like a masonry layout), each card keeping its
// real aspect ratio. Left column top-to-bottom: Remonkei, Bua, PDF Buddy -
// right column: Karakuê, Tomei, Sort and Go. Left-column images hug the
// right edge of their column, right-column images hug the left edge, so
// the gap down the middle reads as one clean seam.
const showcaseCards: ShowcaseCard[] = [
  {
    id: "remonkei",
    image: {
      src: "/images/cases/hero-images/remonkei-hero.png",
      alt: "Remonkei product interface",
      width: 1366,
      height: 893,
    },
    name: "Remonkei",
    description: "From work logs to invoices",
    href: "/products/remonkei",
    column: "right",
    boxHeight: 176,
    captionCorner: "top-left",
    captionPull: "translate(10%, 10%)",
  },
  {
    id: "bua-na-cainte",
    image: {
      src: "/images/cases/hero-images/bua-hero.png",
      alt: "Bua na Cainte product interface",
      width: 1199,
      height: 899,
    },
    name: "Bua na Cainte",
    description: "Design systems & platform modernization",
    href: "/products/bua-na-cainte",
    column: "right",
    boxHeight: 200,
    captionCorner: "top-left",
    captionPull: "translate(10%, 10%)",
  },
  {
    id: "pdfbuddy",
    image: {
      src: "/images/cases/hero-images/pdfbuddy-hero.png",
      alt: "Your PDF Buddy product interface",
      width: 975,
      height: 1033,
    },
    name: "Your PDF Buddy",
    description: "Batch PDF tools. Files stay local.",
    href: "https://pdfbuddy.brunix.studio/",
    external: true,
    column: "right",
    boxHeight: 202,
    captionCorner: "top-left",
    captionPull: "translate(10%, 10%)",
  },
  {
    id: "karakue",
    image: {
      src: "/images/cases/hero-images/karakue-hero.png",
      alt: "Karakuê product interface",
      width: 5144,
      height: 2630,
    },
    name: "Karakuê",
    description: "From song requests to a shared queue",
    href: "/products/karakue",
    column: "left",
    boxHeight: 160,
    captionCorner: "top-left",
    captionPull: "translate(10%, 10%)",
  },
  {
    id: "tomei",
    image: {
      src: "/images/cases/hero-images/tomei-hero.png",
      alt: "Tomei product interface",
      width: 1080,
      height: 2400,
    },
    name: "Tomei",
    description: "Medication routines made simpler",
    href: "/products/tomei",
    column: "left",
    boxHeight: 264,
    captionCorner: "bottom-left",
    // Extra 30px lift on top of the usual 10% pull - there's a lot of
    // empty space beside this one.
    captionPull: "translate(10%, calc(-10% - 30px))",
  },
  {
    id: "sortandgo",
    image: {
      src: "/images/cases/hero-images/sortandgo-hero.png",
      alt: "Sort and Go product interface",
      width: 1380,
      height: 821,
    },
    name: "Sort and Go",
    description: "Reorder, resize & export assets",
    href: "https://sortandgo.brunix.studio/",
    external: true,
    column: "left",
    boxHeight: 154,
    captionCorner: "top-left",
    captionPull: "translate(10%, 10%)",
  },
];

// Only mount the interactive collage for pointers that can actually hover
// (mouse/trackpad). Touch devices - phones and touch-primary tablets/
// laptops alike - never mount it, so they never pay for the six images or
// the pointer-move listeners, and never get invisible tab stops.
function useCanHover() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mq.matches);

    const listener = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  return canHover;
}

// Anchors the caption's opposite corner to the image's own corner (fully
// outside it), then pulls it back 10% of its own size so only that sliver
// overlaps the image - 10% in, 90% out, as requested.
// Anchors the caption's opposite corner to the image's own corner (fully
// outside it) - card.captionPull then pulls it back toward the image.
const captionAnchorClass: Record<ShowcaseCard["captionCorner"], string> = {
  "top-left": "bottom-full right-full",
  "top-right": "bottom-full left-full",
  "bottom-left": "top-full right-full",
  "bottom-right": "top-full left-full",
};

type ShowcaseCardItemProps = {
  card: ShowcaseCard;
  index: number;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  reduceMotion: boolean;
  rotX: MotionValue<number>;
  rotY: MotionValue<number>;
};

function ShowcaseCardItem({
  card,
  index,
  activeIndex,
  setActiveIndex,
  reduceMotion,
  rotX,
  rotY,
}: ShowcaseCardItemProps) {
  const isActive = activeIndex === index;

  const activate = () => setActiveIndex(index);
  const deactivate = () =>
    setActiveIndex((curr) => (curr === index ? null : curr));

  // A short, no-overshoot tween (not a spring) so the card snaps back to
  // rest the instant the pointer leaves - no bounce, no settle-time lag.
  // Scale only: no rotation, no directional shift, so every tile stays put
  // on the grid and only lifts in place.
  const hoverAnimation = reduceMotion
    ? undefined
    : {
        scale: 1.18,
        transition: { duration: 0.5, ease: "easeOut" as const },
      };

  const accessibleLabel = card.href
    ? `${card.name}: ${card.description.replace(/\.$/, "")}. ${
        card.external ? "Open product" : "View case study"
      }.`
    : undefined;

  return (
    <div
      className="relative"
      style={{
        zIndex: isActive ? 30 : 1,
        height: card.boxHeight,
        aspectRatio: `${card.image.width} / ${card.image.height}`,
      }}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.6,
          delay: reduceMotion ? 0 : 0.35 + index * 0.08,
        }}
        style={reduceMotion ? undefined : { rotateX: rotX, rotateY: rotY }}
        className="h-full"
      >
        <motion.a
          {...(card.href ? { href: card.href } : {})}
          {...(card.href && card.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...(accessibleLabel ? { "aria-label": accessibleLabel } : {})}
          // Own, un-delayed transition: this is the ONLY transition on this
          // element, so it governs entering AND leaving whileHover/whileFocus
          // symmetrically - same speed both ways, no lag on release.
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={hoverAnimation}
          whileFocus={hoverAnimation}
          onHoverStart={activate}
          onHoverEnd={deactivate}
          onFocus={activate}
          onBlur={deactivate}
          className={[
            "group relative block h-full w-full overflow-hidden rounded-lg shadow-[0_8px_20px_rgba(0,0,0,0.18)] ring-2 ring-white/20",
            card.href
              ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              : "cursor-default",
          ].join(" ")}
          style={{ transformOrigin: "center center" }}
        >
          <Image
            src={card.image.src}
            alt={card.image.alt}
            fill
            sizes="(max-width: 767px) 0px, 30vw"
            className="object-contain pointer-events-none"
            draggable={false}
            priority={index < 2}
          />
        </motion.a>
      </motion.div>

      {/* Caption lives outside the card (so the image's overflow-hidden
          doesn't clip it), hanging off its assigned corner - 90% outside
          the image, 10% overlapping it - and only shows on hover/focus.
          The fade uses the exact same duration/easing as the card's own
          hover scale so both read as one motion. */}
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute z-20 w-[190px] max-w-[60vw] rounded-2xl border border-white/40 bg-white/90 px-4 py-3 text-primary shadow-lg backdrop-blur-md transition-opacity duration-500 ease-out",
          captionAnchorClass[card.captionCorner],
          isActive ? "opacity-100" : "opacity-0",
        ].join(" ")}
        style={{ transform: card.captionPull }}
      >
        <span className="block text-sm font-semibold leading-snug">
          {card.name}
        </span>
        <span className="mt-0.5 block text-xs leading-snug text-primary/75">
          {card.description}
        </span>
        {card.href && card.external && (
          <span className="mt-1 block text-xs font-medium text-primary">
            Open product
          </span>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  const onAnchorClick = (e: React.MouseEvent, id: string) =>
    scrollToSection(e, id);

  const canHover = useCanHover();
  const reduceMotion = Boolean(useReducedMotion());
  const showCollage = canHover;

  // Subtle "look at the cursor" tilt on the whole collage - the cards
  // gently turn toward the mouse as it moves over the hero, on top of
  // (composed with) each column's fixed rotateY lean.
  const heroRef = useRef<HTMLElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 150, damping: 18, mass: 0.3 });
  const smy = useSpring(my, { stiffness: 150, damping: 18, mass: 0.3 });
  const rotX = useTransform(smy, [-1, 1], [12, -12]);
  const rotY = useTransform(smx, [-1, 1], [-12, 12]);

  const onMouseMoveHero = useCallback(
    (e: React.MouseEvent) => {
      if (reduceMotion) return;
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      mx.set(px * 2 - 1);
      my.set(py * 2 - 1);
    },
    [mx, my, reduceMotion],
  );

  const onMouseLeaveHero = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  // Bubble hover/focus control
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={onMouseMoveHero}
      onMouseLeave={onMouseLeaveHero}
      className="relative overflow-hidden bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end py-24 text-white"
    >
      {/* angled overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 1000 1000" className="h-full w-full">
          <polygon fill="white" points="0,0 1000,300 1000,1000 0,700" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[40fr_60fr]">
        {/* left: text */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 text-xl font-semibold text-highlight"
          >
            Lead Product Designer & Design Engineer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 max-w-5xl text-[2.7rem] font-extrabold leading-[0.95] tracking-tight md:text-[4rem]"
          >
            TURNING MESSY IDEAS INTO SHIPPED PRODUCTS
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 max-w-2xl space-y-3 text-highlight"
          >
            <p>
              I connect business goals, user needs, and hands-on development
              to build useful products, from educational platforms to tools
              people use every day.
            </p>
          </motion.div>

          <motion.a
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            href="#products"
            onClick={(e) => onAnchorClick(e, "products")}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-medium text-white shadow-lg backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20"
          >
            Explore my work
            <ArrowRight className="h-5 w-5" />
          </motion.a>
        </div>

        {/* right: product showcase collage - desktop/hover-capable only */}
        <div className="hidden md:block">
          {showCollage && (
            <div
              className="flex justify-center"
              style={{
                gap: COLLAGE_GAP,
                height: COLLAGE_HEIGHT,
                perspective: "1400px",
              }}
            >
              {(["left", "right"] as const).map((column) => (
                <div
                  key={column}
                  className={[
                    "flex flex-col",
                    column === "left" ? "items-end" : "items-start",
                  ].join(" ")}
                  style={{
                    gap: COLLAGE_GAP,
                    // Each half tilts on its own Y axis so the inner edges
                    // (meeting at the center seam) recede slightly, giving
                    // the whole grid a shallow, organized 3D "gatefold" -
                    // one static rotation for the pair, not per card.
                    transform: `rotateY(-16deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {showcaseCards
                    .filter((card) => card.column === column)
                    .map((card, i) => (
                      <ShowcaseCardItem
                        key={card.id}
                        card={card}
                        index={showcaseCards.indexOf(card)}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        reduceMotion={reduceMotion}
                        rotX={rotX}
                        rotY={rotY}
                      />
                    ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
