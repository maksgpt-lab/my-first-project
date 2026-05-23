"use client";
import { motion } from "framer-motion";
import type { Easing } from "framer-motion";

const EASE: Easing = [0.21, 0.47, 0.32, 0.98];

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.55, delay, ease: EASE },
  };
}

function GptIcon({ amber = false }: { amber?: boolean }) {
  return (
    <div
      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
        amber
          ? "bg-amber-600/15 border border-amber-600/20"
          : "bg-white/[0.07] border border-white/[0.08]"
      }`}
    >
      <svg width="14" height="14" viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="26" stroke={amber ? "#F59E0B" : "white"} strokeWidth="2.5" opacity={amber ? "0.6" : "0.25"} />
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={angle}
              x1={30 + 8 * Math.cos(rad)} y1={30 + 8 * Math.sin(rad)}
              x2={30 + 19 * Math.cos(rad)} y2={30 + 19 * Math.sin(rad)}
              stroke={amber ? "#F59E0B" : "white"}
              strokeWidth="2.5" strokeLinecap="round"
              opacity={amber ? "0.6" : "0.25"}
            />
          );
        })}
        <circle cx="30" cy="30" r="4" fill={amber ? "#F59E0B" : "white"} opacity={amber ? "0.6" : "0.25"} />
      </svg>
    </div>
  );
}

export default function PromptDemoSection() {
  return (
    <section className="py-28 bg-[#0C0A08]">
      <div className="max-w-2xl mx-auto px-6">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-14 text-center">
          <p className="text-amber-500/60 text-[11px] tracking-[0.25em] uppercase font-medium mb-4">
            Разница — в том, как спрашивать
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            Тот же ChatGPT.<br />
            <span className="gradient-text">Другой результат.</span>
          </h2>
        </motion.div>

        {/* Chat window */}
        <div className="rounded-2xl border border-white/[0.07] overflow-hidden">

          {/* Window chrome */}
          <div className="bg-[#130E09] px-4 py-3 flex items-center gap-3 border-b border-white/[0.06]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/45" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/45" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/45" />
            </div>
            <span className="text-white/18 text-xs tracking-wide">ChatGPT</span>
          </div>

          <div className="bg-[#0D0A07] px-5 py-6 space-y-5">

            {/* ── BEFORE ── */}
            <motion.div {...fadeUp(0.2)}>
              <span className="text-white/20 text-[10px] tracking-[0.2em] uppercase font-semibold">
                Обычный запрос
              </span>
            </motion.div>

            {/* User: bad prompt */}
            <motion.div {...fadeUp(0.45)} className="flex justify-end">
              <div className="max-w-[72%] bg-white/[0.06] border border-white/[0.07] rounded-2xl rounded-tr-sm px-4 py-2.5">
                <p className="text-white/55 text-sm">Проанализируй этот документ</p>
              </div>
            </motion.div>

            {/* GPT: bad response */}
            <motion.div {...fadeUp(0.85)} className="flex gap-3">
              <GptIcon />
              <div className="bg-white/[0.025] border border-white/[0.05] rounded-2xl rounded-tl-sm px-4 py-3">
                <p className="text-white/28 text-sm leading-relaxed">
                  Документ представляет собой договор поставки. В нём описаны условия сделки, права и обязанности сторон, порядок оплаты. Текст составлен в соответствии с нормами действующего законодательства.
                </p>
              </div>
            </motion.div>

            {/* Divider */}
            <motion.div {...fadeUp(1.35)} className="flex items-center gap-3 py-1">
              <div className="flex-1 h-px bg-white/[0.05]" />
              <span className="text-amber-500/55 text-[10px] tracking-[0.22em] uppercase font-semibold whitespace-nowrap">
                После курса
              </span>
              <div className="flex-1 h-px bg-amber-700/20" />
            </motion.div>

            {/* ── AFTER ── */}

            {/* User: good prompt */}
            <motion.div {...fadeUp(1.65)} className="flex justify-end">
              <div className="max-w-[85%] bg-amber-950/45 border border-amber-800/22 rounded-2xl rounded-tr-sm px-4 py-3">
                <p className="text-amber-100/80 text-sm leading-relaxed">
                  Ты — юрист по коммерческим договорам. Перед тобой договор поставки. Найди:{" "}
                  <span className="text-amber-300/90 font-medium">1) риски для покупателя,</span>{" "}
                  <span className="text-amber-300/90 font-medium">2) пункты для переговоров,</span>{" "}
                  <span className="text-amber-300/90 font-medium">3) что отсутствует, но должно быть.</span>{" "}
                  Отвечай по пунктам, коротко и конкретно.
                </p>
              </div>
            </motion.div>

            {/* GPT: good response */}
            <motion.div {...fadeUp(2.15)} className="flex gap-3">
              <GptIcon amber />
              <div className="bg-white/[0.04] border border-white/[0.09] rounded-2xl rounded-tl-sm px-4 py-4 space-y-3.5">
                <div>
                  <p className="text-amber-400/85 text-xs font-bold tracking-wide uppercase mb-2">⚠ Риски</p>
                  <p className="text-white/70 text-sm leading-relaxed">· п.4.2 — штрафы только для покупателя; поставщик за срыв сроков не отвечает</p>
                  <p className="text-white/70 text-sm leading-relaxed mt-1">· п.7 — автопролонгация без вашего уведомления за 60 дней</p>
                </div>
                <div className="h-px bg-white/[0.05]" />
                <div>
                  <p className="text-white/55 text-xs font-bold tracking-wide uppercase mb-2">→ На переговоры</p>
                  <p className="text-white/70 text-sm leading-relaxed">· Добавить симметричную ответственность поставщика в п.4</p>
                  <p className="text-white/70 text-sm leading-relaxed mt-1">· Убрать п.11.3 или ограничить сумму компенсаций потолком</p>
                </div>
                <div className="h-px bg-white/[0.05]" />
                <div>
                  <p className="text-white/35 text-xs font-bold tracking-wide uppercase mb-2">✗ Отсутствует</p>
                  <p className="text-white/70 text-sm leading-relaxed">· Порядок разрешения споров</p>
                  <p className="text-white/70 text-sm leading-relaxed mt-1">· Требования к качеству и SLA на поставку</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Footer note */}
        <motion.p
          {...fadeUp(2.7)}
          className="text-center text-white/25 text-sm mt-7 leading-relaxed"
        >
          Разница — не в ChatGPT. В том, как ты с ним разговариваешь.
        </motion.p>

      </div>
    </section>
  );
}
