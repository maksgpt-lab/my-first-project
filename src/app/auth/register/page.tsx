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
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-white">Создать аккаунт</h1>
          <p className="mt-1 text-sm text-white/40">Доступ с любого устройства</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium uppercase tracking-widest text-white/40">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-amber-500/50 focus:bg-white/8 focus:ring-2 focus:ring-amber-500/10"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium uppercase tracking-widest text-white/40">
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-amber-500/50 focus:bg-white/8 focus:ring-2 focus:ring-amber-500/10"
              placeholder="минимум 6 символов"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-glow mt-2 w-full rounded-xl py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
          >
            {loading ? "Создаём аккаунт..." : "Создать аккаунт"}
          </button>
        </form>

        <div className="mt-6 border-t border-white/[0.06] pt-6 text-center">
          <p className="text-sm text-white/30">
            Уже есть аккаунт?{" "}
            <Link
              href={`/auth/login${next !== "/courses" ? `?next=${encodeURIComponent(next)}` : ""}`}
              className="font-medium text-amber-500 transition-colors hover:text-amber-400"
            >
              Войти
            </Link>
          </p>
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-white/20">
        Регистрируясь, вы соглашаетесь с{" "}
        <Link href="/oferta" className="underline transition-colors hover:text-white/40">
          публичной офертой
        </Link>
      </p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0C0A08]">
      {/* фоновые блики */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-amber-600/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-amber-800/8 blur-[120px]" />
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16">
        <Link href="/" className="mb-10 flex items-center gap-1.5 text-xl font-bold tracking-tight">
          <span className="gradient-text">AI</span>
          <span className="text-white/90"> для бизнеса</span>
        </Link>
        <Suspense>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
