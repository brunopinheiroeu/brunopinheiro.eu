"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState, useEffect } from "react";

export default function Hero() {
  const onAnchorClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Images in /public/images
  const imgs = [
    { src: "/images/photo1.png", alt: "Happy user 1" },
    { src: "/images/photo2.png", alt: "Happy user 2" },
    { src: "/images/photo3.png", alt: "Happy user 3" },
    { src: "/images/photo4.png", alt: "Happy user 4" },
    { src: "/images/photo5.png", alt: "Happy user 5" },
    { src: "/images/photo6.png", alt: "Happy user 6" },
  ];

  // Bubbles content (edit links/texts freely)
  const bubbles = [
    { text: "Virtual Showroom @ Wave VRS", href: "#" },
    { text: "structurAR @ McGowans Print", href: "#" },
    { text: "AI Expertise @ Life", href: "#" },
    { text: "Unit + Unreal Game Experienced", href: "#" },
    { text: "Automation Workflows", href: "#" },
    { text: "Bua na Cainte — Case Study", href: "#" },
  ];

  // Initial scattered positions (your values)
  const positions = [
    "-top-10 left-20", //1
    "top-10 right-10", //2
    "top-50 left-0", //3
    "top-70 right-30", //4
    "top-30 -right-44", //5
    "top-100 -right-28", //6
  ];

  // Organized target offsets (relative motion; tweak freely)
  // These são deslocamentos (x,y) quando "organizado".
  const org = [
    { x: 0, y: 0 },
    { x: 10, y: 5 },
    { x: 0, y: 10 },
    { x: 5, y: 10 },
    { x: 10, y: 0 },
    { x: 15, y: 0 },
  ];

  // Base 3D rotations (wind)
  const baseRx = [-1.5, 1.2, -1.0, 1.6, -1.8, 1.2];
  const baseRy = [-2.0, 1.5, -1.3, 1.8, -2.2, 1.6];
  const baseRz = [-6.0, 4.0, -4.0, 5.0, -8.0, 4.0];

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

  // Depth per card (hooks must be top-level)
  const d0 = 1.0,
    d1 = 0.85,
    d2 = 0.75,
    d3 = 0.9,
    d4 = 0.8,
    d5 = 0.7;

  const tRotX0 = useTransform(rotX, (v) => v * d0);
  const tRotY0 = useTransform(rotY, (v) => v * d0);
  const tX0 = useTransform(shiftX, (v) => v * d0);
  const tY0 = useTransform(shiftY, (v) => v * d0);

  const tRotX1 = useTransform(rotX, (v) => v * d1);
  const tRotY1 = useTransform(rotY, (v) => v * d1);
  const tX1 = useTransform(shiftX, (v) => v * d1);
  const tY1 = useTransform(shiftY, (v) => v * d1);

  const tRotX2 = useTransform(rotX, (v) => v * d2);
  const tRotY2 = useTransform(rotY, (v) => v * d2);
  const tX2 = useTransform(shiftX, (v) => v * d2);
  const tY2 = useTransform(shiftY, (v) => v * d2);

  const tRotX3 = useTransform(rotX, (v) => v * d3);
  const tRotY3 = useTransform(rotY, (v) => v * d3);
  const tX3 = useTransform(shiftX, (v) => v * d3);
  const tY3 = useTransform(shiftY, (v) => v * d3);

  const tRotX4 = useTransform(rotX, (v) => v * d4);
  const tRotY4 = useTransform(rotY, (v) => v * d4);
  const tX4 = useTransform(shiftX, (v) => v * d4);
  const tY4 = useTransform(shiftY, (v) => v * d4);

  const tRotX5 = useTransform(rotX, (v) => v * d5);
  const tRotY5 = useTransform(rotY, (v) => v * d5);
  const tX5 = useTransform(shiftX, (v) => v * d5);
  const tY5 = useTransform(shiftY, (v) => v * d5);

  const transforms = [
    { tRotX: tRotX0, tRotY: tRotY0, tX: tX0, tY: tY0 },
    { tRotX: tRotX1, tRotY: tRotY1, tX: tX1, tY: tY1 },
    { tRotX: tRotX2, tRotY: tRotY2, tX: tX2, tY: tY2 },
    { tRotX: tRotX3, tRotY: tRotY3, tX: tX3, tY: tY3 },
    { tRotX: tRotX4, tRotY: tRotY4, tX: tX4, tY: tY4 },
    { tRotX: tRotX5, tRotY: tRotY5, tX: tX5, tY: tY5 },
  ];

  // Per-bubble positioning (side, horizontal and vertical offsets)
  const bubblePos: {
    side: "left" | "right";
    offsetX: number;
    offsetY: number;
  }[] = [
    { side: "left", offsetX: -150, offsetY: -80 }, // photo1
    { side: "right", offsetX: -110, offsetY: -180 }, // photo2
    { side: "left", offsetX: -120, offsetY: 130 }, // photo3
    { side: "left", offsetX: -100, offsetY: 130 }, // photo4
    { side: "left", offsetX: -70, offsetY: -160 }, // photo5
    { side: "left", offsetX: -180, offsetY: 50 }, // photo6
  ];

  // Organization state: when true, all cards align + bubbles show
  // const [isOrganized, setIsOrganized] = useState(false);

  // Bubble hover control
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

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
            href="#projects"
            onClick={(e) => onAnchorClick(e, "projects")}
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
          {imgs.map((img, i) => {
            // When organized, we ignore parallax MotionValues and animate to org[i]
            const bp = bubblePos[i] ?? {
              side: "right",
              offsetX: -210,
              offsetY: 0,
            };

            const parallaxStyle = {
              rotateX: transforms[i].tRotX,
              rotateY: transforms[i].tRotY,
              x: transforms[i].tX,
              y: transforms[i].tY,
            } as const;

            return (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 + i * 0.08 }}
                style={{
                  rotateX: transforms[i].tRotX,
                  rotateY: transforms[i].tRotY,
                  x: transforms[i].tX,
                  y: transforms[i].tY,
                }}
                whileHover={{
                  scale: 1.06,
                  y: -8,
                  transition: { type: "spring", stiffness: 220, damping: 18 },
                }}
                onHoverStart={() => {
                  if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
                  setHoveredIndex(i);
                }}
                onHoverEnd={() => {
                  // pequeno atraso para permitir mover da foto até a bolha
                  hideTimerRef.current = setTimeout(() => {
                    setHoveredIndex((curr) => (curr === i ? null : curr));
                  }, 160);
                }}
                className={[
                  "absolute w-[180px] h-[240px] rounded-2xl select-none",
                  "shadow-[0_12px_30px_rgba(0,0,0,0.28)] ring-1 ring-white/20",
                  "bg-white/10 backdrop-blur-sm",
                  positions[i],
                  "z-10",
                ].join(" ")}
              >
                {/* imagem + rotação base */}
                <div
                  className="relative h-full w-full rounded-2xl"
                  style={{
                    transform: `rotateX(${baseRx[i]}deg) rotateY(${baseRy[i]}deg) rotateZ(${baseRz[i]}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={180}
                    height={240}
                    className="rounded-2xl object-cover pointer-events-none"
                    draggable={false}
                    priority={i === 0}
                  />
                </div>

                {/* bolha: controla visibilidade pelo hoveredIndex */}
                <motion.a
                  href={bubbles[i].href}
                  target="_self"
                  className="pointer-events-auto absolute w-[200px] rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-center text-white shadow-lg backdrop-blur-md"
                  style={{
                    right:
                      bubblePos[i].side === "right"
                        ? bubblePos[i].offsetX
                        : undefined,
                    left:
                      bubblePos[i].side === "left"
                        ? bubblePos[i].offsetX
                        : undefined,
                    top: `calc(50% + ${bubblePos[i].offsetY}px)`,
                    transform: "translateY(-50%)",
                  }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{
                    opacity: hoveredIndex === i ? 1 : 0,
                    y: hoveredIndex === i ? 0 : 6,
                  }}
                  transition={{ duration: 0.25 }}
                  onHoverStart={() => {
                    if (hideTimerRef.current)
                      clearTimeout(hideTimerRef.current);
                    setHoveredIndex(i);
                  }}
                  onHoverEnd={() => {
                    setHoveredIndex((curr) => (curr === i ? null : curr));
                  }}
                >
                  <span className="block text-sm font-medium leading-snug">
                    {bubbles[i].text}
                  </span>
                </motion.a>
              </motion.div>
            );
          })}
        </div>

        {/* mobile fallback (2x2) */}
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
        </div>
      </div>
    </section>
  );
}
