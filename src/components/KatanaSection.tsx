"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

function KatanaSVG() {
  return (
    <svg viewBox="0 0 480 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[300px] sm:w-[440px]">
      <defs>
        <linearGradient id="kat-blade" x1="100" y1="28" x2="480" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#888" stopOpacity="0.3" />
          <stop offset="25%"  stopColor="#ccc" />
          <stop offset="52%"  stopColor="#fff" />
          <stop offset="78%"  stopColor="#bbb" />
          <stop offset="100%" stopColor="#777" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="kat-shine" x1="100" y1="28" x2="480" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#fff" stopOpacity="0" />
          <stop offset="42%"  stopColor="#fff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <polygon points="478,28 102,37 102,19" fill="url(#kat-blade)" />
      <line x1="102" y1="28" x2="477" y2="28" stroke="url(#kat-shine)" strokeWidth="1.2" />
      <polygon points="480,28 462,31 462,25" fill="white" opacity="0.95" />
      <ellipse cx="93" cy="28" rx="11" ry="23" fill="#3D2510" />
      <ellipse cx="93" cy="28" rx="8"  ry="18" fill="#6A4525" />
      <ellipse cx="93" cy="28" rx="4"  ry="10" fill="#3D2510" />
      <rect x="4" y="22" width="87" height="12" rx="6" fill="#180C06" />
      <rect x="7" y="24" width="81" height="8"  rx="4" fill="#2A1608" />
      {[11, 22, 33, 44, 55, 66, 77].map((x) => (
        <line key={x} x1={x} y1="22" x2={x + 4} y2="34" stroke="#0A0603" strokeWidth="2" opacity="0.75" />
      ))}
      <ellipse cx="5" cy="28" rx="6" ry="10" fill="#3D2510" />
      <ellipse cx="5" cy="28" rx="3" ry="6"  fill="#4A2C18" />
    </svg>
  );
}

function ChatGPTLogo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="28" stroke="white" strokeWidth="2" opacity="0.8" />
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={angle}
              x1={30 + 9  * Math.cos(rad)} y1={30 + 9  * Math.sin(rad)}
              x2={30 + 22 * Math.cos(rad)} y2={30 + 22 * Math.sin(rad)}
              stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.8"
            />
          );
        })}
        <circle cx="30" cy="30" r="5" fill="white" opacity="0.85" />
      </svg>
      <span className="text-5xl sm:text-6xl font-bold text-white tracking-tight leading-none select-none">
        ChatGPT
      </span>
    </div>
  );
}

export default function KatanaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Katana sweeps early and clears by 72%
  const katanaVw      = useTransform(scrollYProgress, [0.02, 0.46], [60, -85]);
  const katanaOpacity = useTransform(scrollYProgress, [0.01, 0.08, 0.68, 0.78], [0, 1, 1, 0]);
  const katanaTransform = useMotionTemplate`translateX(calc(-50% + ${katanaVw}vw)) translateY(-50%) rotate(-13deg)`;

  // Slash — brighter, appears earlier
  const slashOpacity = useTransform(scrollYProgress, [0.20, 0.32, 0.56, 0.70], [0, 1, 1, 0]);
  const slashScaleX  = useTransform(scrollYProgress, [0.20, 0.36], [0, 1]);

  // Logo halves — dramatic split with rotation
  const topY      = useTransform(scrollYProgress, [0.30, 0.62], [0, -220]);
  const topRot    = useTransform(scrollYProgress, [0.30, 0.62], [0, -5]);
  const bottomY   = useTransform(scrollYProgress, [0.30, 0.62], [0,  220]);
  const bottomRot = useTransform(scrollYProgress, [0.30, 0.62], [0,  5]);
  const logoOpacity = useTransform(scrollYProgress, [0.48, 0.64], [1, 0]);

  // Tagline — appears as logo clears, occupies full viewport center
  const tagOpacity     = useTransform(scrollYProgress, [0.58, 0.72, 0.96, 1.0], [0, 1, 1, 0]);
  const tagY           = useTransform(scrollYProgress, [0.58, 0.72], [44, 0]);
  const tagScale       = useTransform(scrollYProgress, [0.58, 0.72], [0.88, 1.0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.68, 0.80], [0, 1]);
  const glowOpacity    = useTransform(scrollYProgress, [0.60, 0.76, 0.96], [0, 1, 0]);

  // Scroll hint
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[380vh] bg-[#0C0A08]">
      {/* relative needed so absolute children (tagline, katana) are positioned within the sticky viewport */}
      <div className="sticky top-[57px] h-[calc(100vh-57px)] relative flex items-center justify-center overflow-hidden">

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10"
        >
          <span className="text-white/30 text-[11px] tracking-[0.25em] uppercase">Листай</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent"
          />
        </motion.div>

        {/* Logo + slash — centered by parent flex */}
        <div className="relative" style={{ width: "min(480px, 88vw)", height: "168px" }}>

          {/* Top half */}
          <motion.div
            className="absolute inset-0"
            style={{ clipPath: "inset(0 0 50% 0)", y: topY, rotate: topRot, opacity: logoOpacity }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <ChatGPTLogo />
            </div>
          </motion.div>

          {/* Bottom half */}
          <motion.div
            className="absolute inset-0"
            style={{ clipPath: "inset(50% 0 0 0)", y: bottomY, rotate: bottomRot, opacity: logoOpacity }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <ChatGPTLogo />
            </div>
          </motion.div>

          {/* Slash line — thicker and brighter */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              left: "-20%",
              right: "-20%",
              top: "calc(50% - 1.5px)",
              height: "3px",
              background: "linear-gradient(90deg, transparent 0%, #F59E0B 10%, #FBBF24 30%, #fff 50%, #FBBF24 70%, #F59E0B 90%, transparent 100%)",
              boxShadow: "0 0 24px 8px rgba(251,191,36,0.9), 0 0 64px 22px rgba(251,191,36,0.45), 0 0 110px 44px rgba(251,191,36,0.18)",
              opacity: slashOpacity,
              scaleX: slashScaleX,
              transformOrigin: "50% 50%",
            }}
          />
        </div>

        {/* Katana */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            top: "84px",
            left: "50%",
            transform: katanaTransform,
            opacity: katanaOpacity,
          }}
        >
          <KatanaSVG />
        </motion.div>

        {/* Tagline — absolute, fills the full sticky viewport, centered */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-20"
          style={{ opacity: tagOpacity, scale: tagScale }}
        >
          {/* Ambient amber glow behind text */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[360px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, rgba(217,119,6,0.16) 0%, transparent 65%)",
              filter: "blur(70px)",
              opacity: glowOpacity,
            }}
          />

          {/* Main headline */}
          <motion.p
            className="relative text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight"
            style={{ y: tagY }}
          >
            Освой ChatGPT.<br />
            <span className="gradient-text">Стань мастером.</span>
          </motion.p>

          {/* Subtitle — delayed, more visible */}
          <motion.p
            className="relative text-white/65 mt-6 text-lg sm:text-xl max-w-sm mx-auto leading-relaxed"
            style={{ y: tagY, opacity: subtitleOpacity }}
          >
            Не бойся инструмента —<br className="hidden sm:block" /> научись им управлять.
          </motion.p>

          {/* Price hint */}
          <motion.div
            className="relative flex items-center gap-4 mt-9"
            style={{ opacity: subtitleOpacity }}
          >
            <div className="w-10 h-px bg-amber-600/35" />
            <span className="text-amber-500/55 text-[11px] tracking-[0.35em] uppercase font-semibold">
              Курсы · от 990 ₽
            </span>
            <div className="w-10 h-px bg-amber-600/35" />
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
