"use client";
import Link from "next/link";
import { useState } from "react";

const navLinks: { href: string; label: string; pulse?: boolean }[] = [
  { href: "/courses", label: "Курсы" },
  { href: "/guides", label: "Гайды" },
  { href: "/prompts", label: "Промпты" },
  { href: "/pricing", label: "Тарифы" },
  { href: "/club/agent", label: "AI-консультант", pulse: true },
];


export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#080810]/80 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-xl tracking-tight flex items-center gap-1.5"
          onClick={() => setOpen(false)}
        >
          <span className="gradient-text">AI</span>
          <span className="text-white/90"> для бизнеса</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-7 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors font-medium flex items-center gap-1.5 ${
                link.pulse
                  ? "text-indigo-300 hover:text-indigo-200"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {link.pulse && (
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shrink-0" />
              )}
              {link.label}
            </Link>
          ))}
          <Link
            href="https://t.me/+0ip_wx4Y4pFkMTAy"
            className="btn-glow text-white px-5 py-2.5 rounded-xl font-semibold text-sm shrink-0"
          >
            Telegram-клуб
          </Link>
        </nav>

        {/* Mobile: burger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Меню"
          className="flex sm:hidden items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <span className="text-sm font-medium">{open ? "Закрыть" : "Меню"}</span>
          {open ? (
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
              <path d="M4 4L18 18M18 4L4 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
              <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="sm:hidden border-t border-white/[0.06] bg-[#080810]/98 backdrop-blur-xl">
          <nav className="max-w-5xl mx-auto px-6 py-2 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`transition-colors font-medium py-3.5 border-b border-white/[0.05] flex items-center justify-between ${
                  link.pulse ? "text-indigo-300" : "text-white/70 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  {link.pulse && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shrink-0" />
                  )}
                  {link.label}
                </span>
                <span className={`text-sm ${link.pulse ? "text-indigo-400/40" : "text-white/20"}`}>→</span>
              </Link>
            ))}
            <Link
              href="https://t.me/+0ip_wx4Y4pFkMTAy"
              onClick={() => setOpen(false)}
              className="mt-3 mb-2 btn-glow text-white text-sm font-semibold px-5 py-3 rounded-xl text-center"
            >
              Telegram-клуб →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
