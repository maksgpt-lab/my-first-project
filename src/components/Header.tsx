"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const navLinks: { href: string; label: string; pulse?: boolean }[] = [
  { href: "/courses", label: "Курсы" },
  { href: "/guides", label: "Гайды" },
  { href: "/prompts", label: "Промпты" },
  { href: "/pricing", label: "Тарифы" },
  { href: "/club/agent", label: "AI-консультант", pulse: true },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  const initial = user?.email?.[0].toUpperCase() ?? "?";

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0C0A08]/80 backdrop-blur-xl">
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
                  ? "text-amber-400 hover:text-amber-300"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {link.pulse && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
              )}
              {link.label}
            </Link>
          ))}

          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu((v) => !v)}
                className="w-8 h-8 rounded-full bg-indigo-600/80 border border-indigo-500/50 flex items-center justify-center text-white text-xs font-bold hover:bg-indigo-600 transition-colors"
              >
                {initial}
              </button>
              {showMenu && (
                <div className="absolute right-0 top-10 glass-dark border border-white/[0.08] rounded-2xl p-1 min-w-[160px] shadow-xl">
                  <p className="px-3 py-2 text-xs text-white/30 truncate">{user.email}</p>
                  <Link
                    href="/account"
                    onClick={() => setShowMenu(false)}
                    className="block w-full text-left px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/[0.05] rounded-xl transition-colors"
                  >
                    Мой аккаунт
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/[0.05] rounded-xl transition-colors"
                  >
                    Выйти
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="px-4 py-2 rounded-xl border border-white/15 text-white/60 hover:text-white hover:border-white/30 text-sm font-medium transition-all"
            >
              Войти
            </Link>
          )}

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
        <div className="sm:hidden border-t border-white/[0.06] bg-[#0C0A08]/98 backdrop-blur-xl">
          <nav className="max-w-5xl mx-auto px-6 py-2 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`transition-colors font-medium py-3.5 border-b border-white/[0.05] flex items-center justify-between ${
                  link.pulse ? "text-amber-400" : "text-white/70 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  {link.pulse && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
                  )}
                  {link.label}
                </span>
                <span className={`text-sm ${link.pulse ? "text-amber-500/40" : "text-white/20"}`}>→</span>
              </Link>
            ))}
            {user ? (
              <>
                <p className="py-3 text-xs text-white/30 border-b border-white/[0.05]">{user.email}</p>
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="block py-3.5 border-b border-white/[0.05] text-sm text-white/60 hover:text-white transition-colors"
                >
                  Мой аккаунт
                </Link>
                <button
                  onClick={handleLogout}
                  className="py-3.5 text-left text-sm text-white/50 hover:text-white transition-colors"
                >
                  Выйти из аккаунта
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                onClick={() => setOpen(false)}
                className="py-3.5 border-b border-white/[0.05] text-sm text-white/60 hover:text-white transition-colors"
              >
                Войти
              </Link>
            )}
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
