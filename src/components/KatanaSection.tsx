"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function KatanaSVG() {
  return (
    <svg viewBox="0 0 480 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[340px] sm:w-[460px]">
      <defs>
        <linearGradient id="blade" x1="100" y1="28" x2="480" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#888" stopOpacity="0.3" />
          <stop offset="25%" stopColor="#ccc" />
          <stop offset="52%" stopColor="#fff" />
          <stop offset="78%" stopColor="#bbb" />
          <stop offset="100%" stopColor="#777" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="shine" x1="100" y1="28" x2="480" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="42%" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.1" />
        </linearGradient>
        <filter id="tip-glow" x="-20%" y="-100%" width="140%" height="300%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Blade body — tapers to a point */}
      <polygon points="478,28 102,37 102,19" fill="url(#blade)" />
      {/* Blade spine highlight */}
      <line x1="102" y1="28" x2="477" y2="28" stroke="url(#shine)" strokeWidth="1.2" />
      {/* Tip glint */}
      <polygon points="480,28 462,31 462,25" fill="white" opacity="0.95" filter="url(#tip-glow)" />

      {/* Guard (tsuba) */}
      <ellipse cx="93" cy="28" rx="11" ry="23" fill="#3D2510" />
      <ellipse cx="93" cy="28" rx="8"  ry="18" fill="#6A4525" />
      <ellipse cx="93" cy="28" rx="4"  ry="10" fill="#3D2510" />

      {/* Handle (tsuka) */}
      <rect x="4" y="22" width="87" height="12" rx="6" fill="#180C06" />
      <rect x="7" y="24" width="81" height="8"  rx="4" fill="#2A1608" />
      {[11, 22, 33, 44, 55, 66, 77].map((x) => (
        <line key={x} x1={x} y1="22" x2={x + 4} y2="34" stroke="#0A0603" strokeWidth="2" opacity="0.75" />
      ))}

      {/* Pommel (kashira) */}
      <ellipse cx="5" cy="28" rx="6" ry="10" fill="#3D2510" />
      <ellipse cx="5" cy="28" rx="3" ry="6"  fill="#4A2C18" />
    </svg>
  );
}

function ChatGPTLogo() {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Simplified ChatGPT mark */}
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="28" stroke="white" strokeWidth="2" opacity="0.8" />
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const r = Math.PI / 180;
          return (
            <line
              key={angle}
              x1={30 + 9 * Math.cos(angle * r)}
              y1={30 + 9 * Math.sin(angle * r)}
              x2={30 + 22 * Math.cos(angle * r)}
              y2={30 + 22 * Math.sin(angle * r)}
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

  // Katana sweeps right → left
  const katanaX = useTransform(scrollYProgress, [0.04, 0.58], ["58vw", "-55vw"]);
  const katanaOpacity = useTransform(scrollYProgress, [0.02, 0.1, 0.88, 0.96], [0, 1, 1, 0]);

  // Slash glow appears as katana crosses
  const slashOpacity = useTransform(scrollYProgress, [0.28, 0.4, 0.68, 0.88], [0, 1, 1, 0]);
  const slashScaleX = useTransform(scrollYProgress, [0.28, 0.44], [0, 1]);

  // Logo halves split apart
  const topY    = useTransform(scrollYProgress, [0.4, 0.76], ["0%", "-90%"]);
  const bottomY = useTransform(scrollYProgress, [0.4, 0.76], ["0%",  "90%"]);
  const logoOpacity = useTransform(scrollYProgress, [0.56, 0.82], [1, 0]);

  // Tagline fades in
  const tagOpacity = useTransform(scrollYProgress, [0.78, 0.94], [0, 1]);
  const tagY       = useTransform(scrollYProgress, [0.78, 0.94], [18, 0]);

  // Scroll hint disappears
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[270vh] bg-[#0C0A08]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

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

        {/* Scene */}
        <div className="relative w-full flex flex-col items-center">

          {/* Logo + slash container */}
          <div className="relative" style={{ width: "min(480px, 88vw)", height: "168px" }}>

            {/* Top half of logo */}
            <motion.div
              className="absolute inset-0"
              style={{ clipPath: "inset(0 0 50% 0)", y: topY, opacity: logoOpacity }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <ChatGPTLogo />
              </div>
            </motion.div>

            {/* Bottom half of logo */}
            <motion.div
              className="absolute inset-0"
              style={{ clipPath: "inset(50% 0 0 0)", y: bottomY, opacity: logoOpacity }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <ChatGPTLogo />
              </div>
            </motion.div>

            {/* Amber slash line */}
            <motion.div
              className="absolute top-1/2 rounded-full pointer-events-none"
              style={{
                insetInline: "-15%",
                height: "2px",
                translateY: "-50%",
                background: "linear-gradient(90deg, transparent 0%, #F59E0B 18%, #FBBF24 50%, #F59E0B 82%, transparent 100%)",
                boxShadow: "0 0 18px 6px rgba(251,191,36,0.65), 0 0 56px 12px rgba(251,191,36,0.28)",
                opacity: slashOpacity,
                scaleX: slashScaleX,
                transformOrigin: "50% 50%",
              }}
            />
          </div>

          {/* Katana — sweeps across logo vertically centered */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              top: "84px",
              left: "50%",
              x: katanaX,
              y: "-50%",
              rotate: -13,
              opacity: katanaOpacity,
            }}
          >
            <KatanaSVG />
          </motion.div>

          {/* Tagline */}
          <motion.div
            style={{ opacity: tagOpacity, y: tagY }}
            className="text-center mt-8 px-6 pointer-events-none"
          >
            <p className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              Освой ChatGPT.{" "}
              <span className="gradient-text">Стань мастером.</span>
            </p>
            <p className="text-white/35 mt-3 text-base max-w-xs mx-auto leading-relaxed">
              Не бойся инструмента — научись им управлять.
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
