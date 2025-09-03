"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCallback, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const onAnchorClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Your PNGs in /public/images
  const imgs = [
    { src: "/images/photo1.png", alt: "Happy user 1" },
    { src: "/images/photo2.png", alt: "Happy user 2" },
    { src: "/images/photo3.png", alt: "Happy user 3" },
    { src: "/images/photo4.png", alt: "Happy user 4" },
    { src: "/images/photo5.png", alt: "Happy user 5" },
  ];

  // Positions (your values; Tailwind arbitrary for 84/104)
  const positions = [
    "top-0 left-24", // 1
    "top-20 right-0", // 2
    "top-64 left-0", // 3
    "top-[21rem] right-24", // 4  ≈ top-84
    "top-[26rem] -right-40", // 5  ≈ top-104 (peeking)
  ];

  // Base 3D rotations (wind look): rx, ry, rz per card
  const baseRx = [-1.5, 1.2, -1.0, 1.6, -1.8];
  const baseRy = [-2.0, 1.5, -1.3, 1.8, -2.2];
  const baseRz = [-6.0, 4.0, -4.0, 5.0, -8.0];

  // Parallax driven by mouse over the whole Hero
  const heroRef = useRef<HTMLElement | null>(null);
  const mx = useMotionValue(0); // -1..1
  const my = useMotionValue(0); // -1..1
  // Springs: smooth movement + fix the “jump” feeling
  const smx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.3 });
  const smy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.3 });

  // Global tilts derived from mouse (shared by all cards, then each card scales its influence)
  const rotX = useTransform(smy, [-1, 1], [10, -10]);
  const rotY = useTransform(smx, [-1, 1], [-12, 12]);
  const shiftX = useTransform(smx, [-1, 1], [16, -16]);
  const shiftY = useTransform(smy, [-1, 1], [-12, 12]);

  // Each card gets a different parallax depth (hooks must be top-level)
  const d0 = 1.0,
    d1 = 0.85,
    d2 = 0.75,
    d3 = 0.9,
    d4 = 0.8;

  // Card 0
  const tRotX0 = useTransform(rotX, (v) => v * d0);
  const tRotY0 = useTransform(rotY, (v) => v * d0);
  const tX0 = useTransform(shiftX, (v) => v * d0);
  const tY0 = useTransform(shiftY, (v) => v * d0);

  // Card 1
  const tRotX1 = useTransform(rotX, (v) => v * d1);
  const tRotY1 = useTransform(rotY, (v) => v * d1);
  const tX1 = useTransform(shiftX, (v) => v * d1);
  const tY1 = useTransform(shiftY, (v) => v * d1);

  // Card 2
  const tRotX2 = useTransform(rotX, (v) => v * d2);
  const tRotY2 = useTransform(rotY, (v) => v * d2);
  const tX2 = useTransform(shiftX, (v) => v * d2);
  const tY2 = useTransform(shiftY, (v) => v * d2);

  // Card 3
  const tRotX3 = useTransform(rotX, (v) => v * d3);
  const tRotY3 = useTransform(rotY, (v) => v * d3);
  const tX3 = useTransform(shiftX, (v) => v * d3);
  const tY3 = useTransform(shiftY, (v) => v * d3);

  // Card 4
  const tRotX4 = useTransform(rotX, (v) => v * d4);
  const tRotY4 = useTransform(rotY, (v) => v * d4);
  const tX4 = useTransform(shiftX, (v) => v * d4);
  const tY4 = useTransform(shiftY, (v) => v * d4);

  // Group for easy indexing in JSX
  const transforms = [
    { tRotX: tRotX0, tRotY: tRotY0, tX: tX0, tY: tY0 },
    { tRotX: tRotX1, tRotY: tRotY1, tX: tX1, tY: tY1 },
    { tRotX: tRotX2, tRotY: tRotY2, tX: tX2, tY: tY2 },
    { tRotX: tRotX3, tRotY: tRotY3, tX: tX3, tY: tY3 },
    { tRotX: tRotX4, tRotY: tRotY4, tX: tX4, tY: tY4 },
  ];

  // Mouse tracking across the entire hero (no “jump” on enter)
  const onMouseMoveHero = useCallback(
    (e: React.MouseEvent) => {
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height; // 0..1
      mx.set(px * 2 - 1);
      my.set(py * 2 - 1);
    },
    [mx, my]
  );

  const onMouseEnterHero = useCallback(
    (e: React.MouseEvent) => {
      // Initialize mx/my to the cursor position to avoid snapping from 0 → current
      onMouseMoveHero(e);
    },
    [onMouseMoveHero]
  );

  const onMouseLeaveHero = useCallback(() => {
    // Ease back to neutral
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
      {/* angled SVG overlay */}
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
            className="inline-flex items-center gap-2 rounded-full bg-blue-400 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-500"
          >
            View My Work <ArrowRight className="h-5 w-5" />
          </motion.a>
        </div>

        {/* right: collage with 3D wind + parallax */}
        <div
          className="relative hidden h-[560px] transform-gpu md:block"
          style={{ perspective: "1200px" }}
        >
          {imgs.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 + i * 0.08 }}
              // Parallax from precomputed transforms
              style={{
                rotateX: transforms[i].tRotX,
                rotateY: transforms[i].tRotY,
                x: transforms[i].tX,
                y: transforms[i].tY,
              }}
              whileHover={{
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                y: -6,
                scale: 1.06,
                transition: { type: "spring", stiffness: 220, damping: 18 },
              }}
              className={[
                "absolute w-[180px] h-[240px] rounded-2xl select-none",
                "shadow-[0_12px_30px_rgba(0,0,0,0.28)] ring-1 ring-white/20",
                "bg-white/10 backdrop-blur-sm",
                positions[i],
              ].join(" ")}
            >
              {/* inner wrapper applies the base 'wind' rotation (static) */}
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
                  priority={i === 0} // ajuda LCP
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* mobile fallback (2x2 grid) */}
        <div className="relative grid grid-cols-2 gap-4 md:hidden">
          {imgs.slice(0, 4).map((img, i) => (
            <div
              key={img.src}
              className="relative h-40 w-full overflow-hidden rounded-2xl bg-white/10 shadow-[0_10px_24px_rgba(0,0,0,0.22)] ring-1 ring-white/20"
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
