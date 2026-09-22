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
  positionClass: string;
  widthClass: string;
  zIndex: number;
  depth: number;
  rotation: number;
  // Extra nudge (px) toward the middle of the collage, added on top of
  // the hover scale-up so the card leans into the composition instead of
  // just growing in place.
  hoverShift: { x: number; y: number };
  bubbleSide: "above" | "below";
  bubbleAlign: "left" | "center" | "right";
};

// Real product screenshots, replacing the old AI-generated portrait photos.
// Sizes/positions are role-driven per the composition brief: Bua + Remonkei
// are the large horizontal base layer, Karakuê is the mid-size horizontal
// highlight, Tomei is the vertical foreground card, and PDF Buddy / Sort and
// Go are small complementary accents. Each card keeps its source image's
// real aspect ratio (see width/height) so nothing is cropped or stretched.
const showcaseCards: ShowcaseCard[] = [
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
    positionClass: "-left-12 top-3",
    widthClass: "w-[61%]",
    zIndex: 10,
    depth: 0.65,
    rotation: -6,
    hoverShift: { x: 16, y: 12 },
    bubbleSide: "below",
    bubbleAlign: "left",
  },
  {
    id: "remonkei",
    image: {
      src: "/images/cases/hero-images/remonkei-hero.png",
      alt: "Remonkei product interface",
      width: 1402,
      height: 927,
    },
    name: "Remonkei",
    description: "From work logs to invoices",
    href: "/products/remonkei",
    positionClass: "left-0 top-[41%]",
    widthClass: "w-[61%]",
    zIndex: 25,
    depth: 0.7,
    rotation: -2,
    hoverShift: { x: 16, y: 0 },
    bubbleSide: "below",
    bubbleAlign: "center",
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
    positionClass: "-left-20 -bottom-2",
    widthClass: "w-[61%]",
    zIndex: 15,
    depth: 0.85,
    rotation: -3,
    hoverShift: { x: 16, y: -12 },
    bubbleSide: "above",
    bubbleAlign: "left",
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
    positionClass: "right-[8%] top-[34%]",
    widthClass: "w-[26%]",
    zIndex: 30,
    depth: 1,
    rotation: 3,
    hoverShift: { x: -12, y: 0 },
    bubbleSide: "below",
    bubbleAlign: "right",
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
    positionClass: "right-0 top-[-0.5rem]",
    widthClass: "w-[50%]",
    zIndex: 20,
    depth: 0.75,
    rotation: 4,
    hoverShift: { x: -16, y: 12 },
    bubbleSide: "below",
    bubbleAlign: "right",
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
    positionClass: "right-[2%] bottom-[-0.5rem]",
    widthClass: "w-[55%]",
    zIndex: 21,
    depth: 0.8,
    rotation: 5,
    hoverShift: { x: -16, y: -12 },
    bubbleSide: "above",
    bubbleAlign: "right",
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

const bubbleAlignClass: Record<ShowcaseCard["bubbleAlign"], string> = {
  left: "left-0",
  center: "left-1/2 -translate-x-1/2",
  right: "right-0",
};

const bubbleSideClass: Record<ShowcaseCard["bubbleSide"], string> = {
  above: "bottom-full mb-3",
  below: "top-full mt-3",
};

type ShowcaseCardItemProps = {
  card: ShowcaseCard;
  index: number;
  rotX: MotionValue<number>;
  rotY: MotionValue<number>;
  shiftX: MotionValue<number>;
  shiftY: MotionValue<number>;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  reduceMotion: boolean;
};

function ShowcaseCardItem({
  card,
  index,
  rotX,
  rotY,
  shiftX,
  shiftY,
  activeIndex,
  setActiveIndex,
  reduceMotion,
}: ShowcaseCardItemProps) {
  const tRotX = useTransform(rotX, (v) => v * card.depth);
  const tRotY = useTransform(rotY, (v) => v * card.depth);
  const tX = useTransform(shiftX, (v) => v * card.depth);
  const tY = useTransform(shiftY, (v) => v * card.depth);

  const isActive = activeIndex === index;

  // No grace-period timeout on the way out: the bubble is decorative
  // (pointer-events-none) so there's nothing to "reach" on leave, and any
  // delay here reads as lag between releasing the card and it settling
  // back into place.
  const activate = () => setActiveIndex(index);
  const deactivate = () =>
    setActiveIndex((curr) => (curr === index ? null : curr));

  // A short, no-overshoot tween (not a spring) so the card snaps back to
  // rest the instant the pointer leaves - no bounce, no settle-time lag.
  const hoverAnimation = reduceMotion
    ? undefined
    : {
        scale: 1.16,
        x: card.hoverShift.x,
        y: card.hoverShift.y,
        transition: { duration: 0.5, ease: "easeOut" as const },
      };

  const accessibleLabel = card.href
    ? `${card.name}: ${card.description.replace(/\.$/, "")}. ${
        card.external ? "Open product" : "View case study"
      }.`
    : undefined;

  return (
    <motion.div
      className={[
        "absolute select-none",
        card.positionClass,
        card.widthClass,
      ].join(" ")}
      style={{
        rotateX: tRotX,
        rotateY: tRotY,
        x: tX,
        y: tY,
        zIndex: isActive ? 60 : card.zIndex,
      }}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.6,
          delay: reduceMotion ? 0 : 0.35 + index * 0.08,
        }}
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
          "group relative block rounded-lg",
          card.href
            ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            : "cursor-default",
        ].join(" ")}
        style={{ transformOrigin: "center center" }}
      >
        <div
          className="overflow-hidden rounded-lg shadow-[0_8px_20px_rgba(0,0,0,0.18)] ring-2 ring-white/20"
          style={{
            aspectRatio: `${card.image.width} / ${card.image.height}`,
            transform: `rotate(${card.rotation}deg)`,
          }}
        >
          <Image
            src={card.image.src}
            alt={card.image.alt}
            fill
            sizes="(max-width: 767px) 0px, 30vw"
            className="object-cover pointer-events-none"
            draggable={false}
            priority={index < 2}
          />
        </div>

        <div
          aria-hidden="true"
          className={[
            "pointer-events-none absolute z-10 w-[190px] max-w-[60vw] rounded-2xl border border-white/40 bg-white/80 px-4 py-3 text-primary shadow-lg backdrop-blur-md transition-all duration-200",
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
            bubbleSideClass[card.bubbleSide],
            bubbleAlignClass[card.bubbleAlign],
          ].join(" ")}
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
      </motion.a>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const onAnchorClick = (e: React.MouseEvent, id: string) =>
    scrollToSection(e, id);

  const canHover = useCanHover();
  const reduceMotion = Boolean(useReducedMotion());
  const showCollage = canHover;

  // Parallax over the whole Hero
  const heroRef = useRef<HTMLElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.3 });
  const smy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.3 });

  const rotX = useTransform(smy, [-1, 5], [16, -10]);
  const rotY = useTransform(smx, [-1, 1], [-12, 12]);
  const shiftX = useTransform(smx, [-1, 1], [16, -16]);
  const shiftY = useTransform(smy, [-1, 1], [-12, 12]);

  // Bubble hover/focus control
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

  const onMouseEnterHero = useCallback(
    (e: React.MouseEvent) => {
      onMouseMoveHero(e);
    },
    [onMouseMoveHero],
  );

  const onMouseLeaveHero = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseEnter={onMouseEnterHero}
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

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
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
              I turn ambiguous problems into usable systems, MVPs, automations,
              and shipped product experiences.
            </p>
            <p>
              From concept to code to customer: Digital platforms, AI tools, and
              <br></br>
              0-to-1 products.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8 max-w-2xl text-highlight"
          >
            AI-assisted builds with:<br></br> Codex · Claude Code · Lovable ·
            React · Next.js · Supabase · Vercel
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            href="#products"
            onClick={(e) => onAnchorClick(e, "products")}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-medium text-white shadow-lg backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20"
          >
            See What I've Built
            <ArrowRight className="h-5 w-5" />
          </motion.a>
        </div>

        {/* right: product showcase collage - desktop/hover-capable only */}
        <div
          className="relative hidden transform-gpu md:block"
          style={{
            perspective: "1200px",
            height: showCollage ? 680 : 0,
          }}
        >
          {showCollage &&
            showcaseCards.map((card, i) => (
              <ShowcaseCardItem
                key={card.id}
                card={card}
                index={i}
                rotX={rotX}
                rotY={rotY}
                shiftX={shiftX}
                shiftY={shiftY}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                reduceMotion={reduceMotion}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
