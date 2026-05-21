"use client";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/courses", label: "Курсы" },
  { href: "/guides", label: "Гайды" },
  { href: "/prompts", label: "Промпты" },
  { href: "/pricing", label: "Тарифы" },
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
        <nav className="hidden sm:flex items-center gap-8 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/50 hover:text-white transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/club/agent"
            className="flex items-center gap-2 text-indigo-300 hover:text-white font-semibold px-4 py-2 rounded-xl border border-indigo-500/30 hover:border-indigo-400/60 bg-indigo-500/5 hover:bg-indigo-500/10 transition-all"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shrink-0" />
            AI-консультант
          </Link>
          <Link
            href="https://t.me/+0ip_wx4Y4pFkMTAy"
            className="btn-glow text-white px-5 py-2.5 rounded-xl font-semibold text-sm"
          >
            Telegram-клуб
          </Link>
        </nav>

        {/* Mobile: telegram + burger */}
        <div className="flex sm:hidden items-center gap-3">
          <Link
            href="https://t.me/+0ip_wx4Y4pFkMTAy"
            className="btn-glow text-white px-4 py-2 rounded-xl font-semibold text-sm"
          >
            Telegram
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Меню"
            className="text-white/50 hover:text-white transition-colors p-1"
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M4 4L18 18M18 4L4 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="sm:hidden border-t border-white/[0.06] bg-[#080810]/95 backdrop-blur-xl">
          <nav className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white transition-colors font-medium py-3 border-b border-white/[0.05]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/club/agent"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-indigo-300 font-semibold py-3 mt-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shrink-0" />
              AI-консультант
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
