"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/courses";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(
        error.message === "User already registered"
          ? "Этот email уже зарегистрирован"
          : "Ошибка регистрации. Попробуй ещё раз."
      );
      setLoading(false);
      return;
    }

    router.push(next);
    router.refresh();
  }

  return (
    <div className="w-full max-w-sm">
      <div className="glass-dark rounded-3xl p-8 border border-white/[0.07] shadow-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Создать аккаунт</h1>
          <p className="text-white/40 text-sm">Доступ с любого устройства</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-indigo-500/60 focus:bg-white/[0.06] transition-all placeholder:text-white/20"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wider">
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-indigo-500/60 focus:bg-white/[0.06] transition-all placeholder:text-white/20"
              placeholder="минимум 6 символов"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-glow text-white py-3 rounded-xl text-sm font-semibold disabled:opacity-50 transition-opacity mt-2"
          >
            {loading ? "Создаём аккаунт..." : "Создать аккаунт"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/[0.06] text-center">
          <p className="text-sm text-white/30">
            Уже есть аккаунт?{" "}
            <Link
              href={`/auth/login${next !== "/courses" ? `?next=${encodeURIComponent(next)}` : ""}`}
              className="text-amber-500 hover:text-amber-400 font-medium transition-colors"
            >
              Войти
            </Link>
          </p>
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-white/20">
        Регистрируясь, вы соглашаетесь с{" "}
        <Link href="/oferta" className="underline hover:text-white/40 transition-colors">
          публичной офертой
        </Link>
      </p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-1.5 mb-10">
        <span className="gradient-text">AI</span>
        <span className="text-white/90"> для бизнеса</span>
      </Link>
      <Suspense>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
