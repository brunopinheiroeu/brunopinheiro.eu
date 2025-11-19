"use client";
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState, useEffect } from "react";
import type { MutableRefObject } from "react";
import { scrollToSection } from "@/lib/scroll";

type BubbleConfig = {
  text: string;
  href: string;
  side: "left" | "right";
  offsetX: number;
  offsetY: number;
};

type HeroCardConfig = {
  image: {
    src: string;
    alt: string;
  };
  bubble: BubbleConfig;
  positionClass: string;
  depth: number;
  baseRotation: {
    x: number;
    y: number;
    z: number;
  };
};

const heroCards: HeroCardConfig[] = [
  {
    image: { src: "/images/photo1.png", alt: "Happy user 1" },
    bubble: {
      text: "Virtual Showroom @ Wave VRS",
      href: "#",
      side: "left",
      offsetX: -150,
      offsetY: -80,
    },
    positionClass: "-top-10 left-20",
    depth: 1,
    baseRotation: { x: -1.5, y: -2, z: -6 },
  },
  {
    image: { src: "/images/photo2.png", alt: "Happy user 2" },
    bubble: {
      text: "structurAR @ McGowans Print",
      href: "#",
      side: "right",
      offsetX: -110,
      offsetY: -180,
    },
    positionClass: "top-10 right-10",
    depth: 0.85,
    baseRotation: { x: 1.2, y: 1.5, z: 4 },
  },
  {
    image: { src: "/images/photo3.png", alt: "Happy user 3" },
    bubble: {
      text: "AI Expertise @ Life",
      href: "#",
      side: "left",
      offsetX: -120,
      offsetY: 130,
    },
    positionClass: "top-50 left-0",
    depth: 0.75,
    baseRotation: { x: -1, y: -1.3, z: -4 },
  },
  {
    image: { src: "/images/photo4.png", alt: "Happy user 4" },
    bubble: {
      text: "Unit + Unreal Game Experienced",
      href: "#",
      side: "left",
      offsetX: -100,
      offsetY: 130,
    },
    positionClass: "top-70 right-30",
    depth: 0.9,
    baseRotation: { x: 1.6, y: 1.8, z: 5 },
  },
  {
    image: { src: "/images/photo5.png", alt: "Happy user 5" },
    bubble: {
      text: "Automation Workflows",
      href: "#",
      side: "left",
      offsetX: -70,
      offsetY: -160,
    },
    positionClass: "top-30 -right-44",
    depth: 0.8,
    baseRotation: { x: -1.8, y: -2.2, z: -8 },
  },
  {
    image: { src: "/images/photo6.png", alt: "Happy user 6" },
    bubble: {
      text: "Bua na Cainte — Case Study",
      href: "#",
      side: "left",
      offsetX: -180,
      offsetY: 50,
    },
    positionClass: "top-100 -right-28",
    depth: 0.7,
    baseRotation: { x: 1.2, y: 1.6, z: 4 },
  },
];

type HeroCardProps = {
  card: HeroCardConfig;
  index: number;
  rotX: MotionValue<number>;
  rotY: MotionValue<number>;
  shiftX: MotionValue<number>;
  shiftY: MotionValue<number>;
  hoveredIndex: number | null;
  setHoveredIndex: (fn: (current: number | null) => number | null) => void;
  hideTimerRef: MutableRefObject<ReturnType<typeof setTimeout> | null>;
};

function HeroCard({
  card,
  index,
  rotX,
  rotY,
  shiftX,
  shiftY,
  hoveredIndex,
  setHoveredIndex,
  hideTimerRef,
}: HeroCardProps) {
  const tRotX = useTransform(rotX, (v) => v * card.depth);
  const tRotY = useTransform(rotY, (v) => v * card.depth);
  const tX = useTransform(shiftX, (v) => v * card.depth);
  const tY = useTransform(shiftY, (v) => v * card.depth);

  return (
    <motion.div
      key={card.image.src}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35 + index * 0.08 }}
      style={{
        rotateX: tRotX,
        rotateY: tRotY,
        x: tX,
        y: tY,
      }}
      whileHover={{
        scale: 1.06,
        y: -8,
        transition: { type: "spring", stiffness: 220, damping: 18 },
      }}
      onHoverStart={() => {
        clearHideTimer();
        setHoveredIndex(index);
      }}
      onHoverEnd={() => {
        hideTimerRef.current = setTimeout(() => {
          setHoveredIndex((curr) => (curr === index ? null : curr));
        }, 160);
      }}
      className={[
        "absolute w-[180px] h-[240px] rounded-2xl select-none",
        "shadow-[0_12px_30px_rgba(0,0,0,0.28)] ring-1 ring-white/20",
        "bg-white/10 backdrop-blur-sm",
        card.positionClass,
        "z-10",
      ].join(" ")}
    >
      <div
        className="relative h-full w-full rounded-2xl"
        style={{
          transform: `rotateX(${card.baseRotation.x}deg) rotateY(${card.baseRotation.y}deg) rotateZ(${card.baseRotation.z}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <Image
          src={card.image.src}
          alt={card.image.alt}
          width={180}
          height={240}
          className="rounded-2xl object-cover pointer-events-none"
          draggable={false}
          priority={index === 0}
        />
      </div>

      <motion.a
        href={card.bubble.href}
        target="_self"
        className="pointer-events-auto absolute w-[200px] rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-center text-white shadow-lg backdrop-blur-md"
        style={{
          right: card.bubble.side === "right" ? card.bubble.offsetX : undefined,
          left: card.bubble.side === "left" ? card.bubble.offsetX : undefined,
          top: `calc(50% + ${card.bubble.offsetY}px)`,
          transform: "translateY(-50%)",
        }}
        initial={{ opacity: 0, y: 6 }}
        animate={{
          opacity: hoveredIndex === index ? 1 : 0,
          y: hoveredIndex === index ? 0 : 6,
        }}
        transition={{ duration: 0.25 }}
        onHoverStart={() => {
          clearHideTimer();
          setHoveredIndex(index);
        }}
        onHoverEnd={() => {
          setHoveredIndex((curr) => (curr === index ? null : curr));
        }}
      >
        <span className="block text-sm font-medium leading-snug">
          {card.bubble.text}
        </span>
      </motion.a>
    </motion.div>
  );
}

export default function Hero() {
  const onAnchorClick = (e: React.MouseEvent, id: string) =>
    scrollToSection(e, id);

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

  // Organization state: when true, all cards align + bubbles show
  // const [isOrganized, setIsOrganized] = useState(false);

  // Bubble hover control
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHideTimer = useCallback(() => {
    const timer = hideTimerRef.current;
    if (timer) {
      clearTimeout(timer);
      hideTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearHideTimer();
    };
  }, [clearHideTimer]);

  const onMouseMoveHero = useCallback(
    (e: React.MouseEvent) => {
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      mx.set(px * 2 - 1);
      my.set(py * 2 - 1);
    },
    [mx, my]
  );

  const onMouseEnterHero = useCallback(
    (e: React.MouseEvent) => {
      // Start organized as soon as mouse enters; also sync parallax to cursor
      // setIsOrganized(false);
      onMouseMoveHero(e);
    },
    [onMouseMoveHero]
  );

  const onMouseLeaveHero = useCallback(() => {
    // Return to scattered parallax
    // setIsOrganized(false);
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
      className="relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-700 py-24 text-white"
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
            className="mb-4 text-xl font-semibold text-blue-100"
          >
            Senior Product Designer & Technologist
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 text-4xl font-extrabold md:text-6xl"
          >
            TURNING IDEAS INTO PURE REALITY
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 max-w-xl text-blue-100"
          >
            Transforming complex systems into seamless user experiences. 20+
            years crafting digital solutions that drive business growth and
            delight users across web, mobile, and emerging technologies.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            href="#products"
            onClick={(e) => onAnchorClick(e, "products")}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-medium text-white shadow-lg backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20"
          >
            View My Work <ArrowRight className="h-5 w-5" />
          </motion.a>
        </div>

        {/* right: collage */}
        <div
          className="relative hidden h-[560px] transform-gpu md:block"
          style={{ perspective: "1200px" }}
        >
          {heroCards.map((card, i) => (
            <HeroCard
              key={card.image.src}
              card={card}
              index={i}
              rotX={rotX}
              rotY={rotY}
              shiftX={shiftX}
              shiftY={shiftY}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              hideTimerRef={hideTimerRef}
            />
          ))}
        </div>

        {/* mobile fallback (2x2)
        <div className="relative grid grid-cols-2 gap-4 md:hidden">
          {imgs.slice(0, 4).map((img, i) => (
            <div
              key={img.src}
              className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white/10 shadow-[0_10px_24px_rgba(0,0,0,0.22)] ring-1 ring-white/20"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 180px"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
