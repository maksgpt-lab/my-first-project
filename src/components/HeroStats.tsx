"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-amber-500 font-bold text-xl leading-none tabular-nums">
      {count}{suffix}
    </div>
  );
}

export default function HeroStats() {
  return (
    <div className="flex items-center border-t border-white/[0.06] pt-6">
      <div className="pr-6">
        <CountUp value={6} />
        <div className="text-white/35 text-xs mt-1.5 uppercase tracking-wide">курсов</div>
      </div>
      <div className="w-px h-8 bg-white/[0.08] shrink-0" />
      <div className="px-6">
        <CountUp value={30} suffix="+" />
        <div className="text-white/35 text-xs mt-1.5 uppercase tracking-wide">промптов</div>
      </div>
      <div className="w-px h-8 bg-white/[0.08] shrink-0" />
      <div className="pl-6">
        <CountUp value={3} />
        <div className="text-white/35 text-xs mt-1.5 uppercase tracking-wide">урока бесплатно</div>
      </div>
    </div>
  );
}
