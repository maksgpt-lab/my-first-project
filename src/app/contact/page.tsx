"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; comment?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  function validate() {
    const e: { name?: string; email?: string; comment?: string } = {};
    if (!name.trim()) e.name = "Введите имя";
    if (!email.trim()) e.email = "Введите email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Неверный формат email";
    if (!comment.trim()) e.comment = "Опишите вашу задачу";
    return e;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setLoading(true);
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), comment: comment.trim() }),
      });
      if (!res.ok) throw new Error("server");
      setSubmitted(true);
    } catch {
      setServerError("Что-то пошло не так. Напишите нам напрямую в Telegram.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#0C0A08] min-h-screen">
      <Header />
      <main className="max-w-2xl mx-auto px-6 py-20">

        {submitted ? (
          <div className="text-center py-16">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center mx-auto mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Заявка отправлена</h2>
            <p className="text-white/45 leading-relaxed mb-8">
              Свяжемся с вами в ближайшее время.
            </p>
            <Link
              href="/"
              className="text-amber-500 hover:text-amber-400 transition-colors text-sm font-medium"
            >
              ← На главную
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-12">
              <p className="text-amber-500/60 text-[11px] tracking-[0.25em] uppercase font-medium mb-4">
                Внедрение AI
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                Обсудить задачу
              </h1>
              <p className="text-white/40 text-base leading-relaxed max-w-md">
                Расскажите, что нужно автоматизировать — разберём задачу и предложим решение.
                Консультация бесплатная.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Ваше имя
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван Иванов"
                  className={`w-full bg-white/[0.05] border rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none focus:border-amber-500/60 transition-colors text-sm ${
                    errors.name ? "border-red-500/50" : "border-white/[0.1]"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Email для связи
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ivan@example.com"
                  className={`w-full bg-white/[0.05] border rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none focus:border-amber-500/60 transition-colors text-sm ${
                    errors.email ? "border-red-500/50" : "border-white/[0.1]"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Опишите вашу задачу
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Что хотите автоматизировать? Какие процессы занимают больше всего времени?"
                  rows={5}
                  className={`w-full bg-white/[0.05] border rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none focus:border-amber-500/60 transition-colors text-sm resize-none ${
                    errors.comment ? "border-red-500/50" : "border-white/[0.1]"
                  }`}
                />
                {errors.comment && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.comment}</p>
                )}
              </div>

              {serverError && (
                <p className="text-sm text-red-400 leading-relaxed">{serverError}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-glow text-white font-semibold py-3.5 rounded-xl text-sm mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Отправляем..." : "Отправить заявку →"}
              </button>
            </form>

            <p className="mt-6 text-xs text-white/20 leading-relaxed text-center">
              Или напишите напрямую:{" "}
              <a
                href="https://t.me/+0ip_wx4Y4pFkMTAy"
                className="underline hover:text-white/40 transition-colors"
              >
                Telegram
              </a>
            </p>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
