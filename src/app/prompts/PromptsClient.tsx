"use client";
import { useState } from "react";
import { prompts, categories, type Category } from "@/lib/prompts";

const categoryIcons: Record<Category, string> = {
  Тексты: "✦",
  Продажи: "◈",
  HR: "◎",
  Аналитика: "◇",
  Маркетинг: "◉",
  Управление: "⬡",
};

export default function PromptsClient() {
  const [active, setActive] = useState<Category | "Все">("Все");
  const [copied, setCopied] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered =
    active === "Все" ? prompts : prompts.filter((p) => p.category === active);

  function copy(id: string, text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-14">
        <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-5">
          Библиотека
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-5">
          Готовые промпты
          <br />
          <span className="gradient-text">для бизнеса</span>
        </h1>
        <p className="text-white/40 text-lg leading-relaxed max-w-xl">
          {prompts.length} шаблонов по категориям. Скопируй, подставь свои данные
          в скобках — и получи результат за 30 секунд.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {(["Все", ...categories] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              active === cat
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "glass-dark text-white/40 hover:text-white/70"
            }`}
          >
            {cat !== "Все" && (
              <span className="mr-1.5 opacity-60">{categoryIcons[cat as Category]}</span>
            )}
            {cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-xs text-white/20 mb-6 font-mono">
        {filtered.length} промптов
      </p>

      {/* Prompts grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((p) => {
          const isExpanded = expanded === p.id;
          const isCopied = copied === p.id;

          return (
            <div
              key={p.id}
              className="glass-dark rounded-2xl border border-white/[0.07] overflow-hidden flex flex-col"
            >
              {/* Card header */}
              <div className="px-6 pt-6 pb-4 flex-1">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-xs font-mono text-indigo-500/60 bg-indigo-500/10 px-2 py-0.5 rounded">
                    {categoryIcons[p.category]} {p.category}
                  </span>
                </div>
                <h3 className="font-semibold text-white text-base mb-1.5 leading-snug">
                  {p.title}
                </h3>
                <p className="text-sm text-white/35 leading-relaxed">
                  {p.description}
                </p>
              </div>

              {/* Prompt text (expandable) */}
              <div className="px-6 pb-2">
                <div
                  className={`bg-[#0d0d1a] border border-indigo-500/20 rounded-xl overflow-hidden transition-all duration-300 ${
                    isExpanded ? "" : "max-h-24"
                  }`}
                >
                  <div className="px-4 py-3 border-b border-indigo-500/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-indigo-500/50 tracking-widest">
                      ▸ ПРОМПТ
                    </span>
                    <button
                      onClick={() => setExpanded(isExpanded ? null : p.id)}
                      className="text-[10px] text-white/20 hover:text-white/50 transition-colors font-mono"
                    >
                      {isExpanded ? "свернуть ↑" : "развернуть ↓"}
                    </button>
                  </div>
                  <pre className="px-4 py-3 text-[13px] text-indigo-200/70 font-mono whitespace-pre-wrap leading-relaxed">
                    {p.prompt}
                  </pre>
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 pb-6 pt-3">
                <button
                  onClick={() => copy(p.id, p.prompt)}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isCopied
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                      : "bg-indigo-600/20 text-indigo-300 border border-indigo-500/20 hover:bg-indigo-600/30 hover:text-indigo-200"
                  }`}
                >
                  {isCopied ? "Скопировано ✓" : "Скопировать промпт"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-16 relative rounded-3xl overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-90" />
        <div className="absolute inset-0 dot-grid opacity-10" />
        <div className="relative z-10 p-10 text-center">
          <p className="text-white font-semibold text-xl mb-2">
            Хочешь научиться писать свои промпты?
          </p>
          <p className="text-white/60 mb-6 text-sm">
            В курсе «Промпт-инжиниринг» — Chain-of-Thought, мега-промпты и ролевые модели.
          </p>
          <a
            href="/courses/prompt-inzhiniring"
            className="inline-block bg-white text-indigo-600 px-7 py-3 rounded-2xl font-bold hover:bg-indigo-50 transition-colors shadow-xl"
          >
            Смотреть курс →
          </a>
        </div>
      </div>
    </section>
  );
}
