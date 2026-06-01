"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
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
      setError(error.message === "User already registered"
        ? "Этот email уже зарегистрирован"
        : "Ошибка регистрации. Попробуй ещё раз.");
      setLoading(false);
      return;
    }

    router.push("/courses");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="glass-dark rounded-3xl p-8 border border-white/[0.07]">
          <h1 className="text-2xl font-bold text-white mb-2">Регистрация</h1>
          <p className="text-white/40 text-sm mb-8">
            Уже есть аккаунт?{" "}
            <Link href="/auth/login" className="text-amber-500 hover:text-amber-400">
              Войти
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-white/50 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-indigo-500 transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-1.5">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-indigo-500 transition-colors"
                placeholder="минимум 6 символов"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-glow text-white py-3 rounded-xl text-sm font-semibold disabled:opacity-50 transition-opacity"
            >
              {loading ? "Создаём аккаунт..." : "Создать аккаунт"}
            </button>
          </form>

          <p className="mt-6 text-xs text-white/20 text-center">
            Регистрируясь, вы соглашаетесь с{" "}
            <Link href="/oferta" className="underline hover:text-white/40">офертой</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
