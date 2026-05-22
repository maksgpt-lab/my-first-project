"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "ai_practice_uses";
const MAX_FREE_USES = 5;

function getUsesLeft(): number {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return MAX_FREE_USES;
    const { count, date } = JSON.parse(stored);
    // Сброс счётчика каждый день
    const today = new Date().toDateString();
    if (date !== today) return MAX_FREE_USES;
    return Math.max(0, MAX_FREE_USES - count);
  } catch {
    return MAX_FREE_USES;
  }
}

function incrementUses() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const today = new Date().toDateString();
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ count: 1, date: today }));
      return;
    }
    const { count, date } = JSON.parse(stored);
    const newCount = date === today ? count + 1 : 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ count: newCount, date: today }));
  } catch {
    // ignore
  }
}

export default function PracticeWidget() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usesLeft, setUsesLeft] = useState(MAX_FREE_USES);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUsesLeft(getUsesLeft());
  }, []);

  async function handleSubmit() {
    if (!prompt.trim() || loading) return;
    if (usesLeft <= 0) return;

    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Что-то пошло не так. Попробуй ещё раз.");
        return;
      }

      setResult(data.result);
      incrementUses();
      setUsesLeft((prev) => Math.max(0, prev - 1));
    } catch {
      setError("Ошибка соединения. Проверь интернет и попробуй снова.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-14 bg-white/[0.03] border border-amber-500/20 rounded-3xl p-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Практика прямо здесь
            </span>
          </div>
          <p className="text-white/40 text-sm leading-relaxed">
            Вставь промпт из урока, подставь свои данные — и получи результат без перехода в ChatGPT.
          </p>
        </div>
        <span className="shrink-0 text-xs text-white/25 bg-white/[0.05] px-3 py-1.5 rounded-full border border-white/[0.07]">
          {usesLeft} из {MAX_FREE_USES} сегодня
        </span>
      </div>

      {/* Textarea */}
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Вставь промпт из урока и подставь свои данные..."
        rows={5}
        disabled={usesLeft <= 0}
        className="w-full bg-[#0C0A08] border border-white/[0.08] rounded-2xl px-5 py-4 text-white/70 placeholder-white/20 text-sm leading-relaxed resize-none focus:outline-none focus:border-amber-500/40 transition-colors disabled:opacity-40"
      />

      {/* Controls */}
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-white/20">{prompt.length}/2000</span>
        <button
          onClick={handleSubmit}
          disabled={loading || !prompt.trim() || usesLeft <= 0}
          className="btn-glow text-white text-sm font-semibold px-6 py-2.5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Думает...
            </span>
          ) : (
            "Отправить →"
          )}
        </button>
      </div>

      {/* Limit reached */}
      {usesLeft <= 0 && (
        <div className="mt-4 text-center p-4 bg-indigo-500/5 border border-amber-500/20 rounded-2xl">
          <p className="text-white/50 text-sm">
            Лимит на сегодня исчерпан. Завтра счётчик обновится.
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Ответ AI</span>
            <button
              onClick={handleCopy}
              className="text-xs text-white/30 hover:text-white/60 transition-colors px-3 py-1 rounded-lg border border-white/[0.07] hover:border-white/20"
            >
              {copied ? "Скопировано ✓" : "Скопировать"}
            </button>
          </div>
          <div className="bg-[#0C0A08] border border-white/[0.07] rounded-2xl px-6 py-5">
            <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">{result}</p>
          </div>
        </div>
      )}
    </div>
  );
}
