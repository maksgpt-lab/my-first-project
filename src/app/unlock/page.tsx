"use client";
import { useSearchParams } from "next/navigation";
import { useActionState, Suspense } from "react";
import { unlockAccess } from "./actions";

function UnlockForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/courses";
  const [state, action, pending] = useActionState(unlockAccess, null);

  return (
    <div className="bg-[#0C0A08] min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <p className="text-2xl font-bold">
            <span className="gradient-text">AI</span>
            <span className="text-white/80"> для бизнеса</span>
          </p>
          <p className="text-white/30 text-sm mt-2">Клуб · Закрытый доступ</p>
        </div>

        {/* Card */}
        <div className="glass-dark rounded-3xl p-8">
          <h1 className="text-xl font-bold text-white mb-2">Введи пароль</h1>
          <p className="text-white/40 text-sm mb-8 leading-relaxed">
            Пароль из Telegram-клуба открывает доступ ко всем урокам на 30 дней.
          </p>

          <form action={action}>
            <input type="hidden" name="next" value={next} />
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              autoFocus
              className="w-full bg-white/[0.06] border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder-white/20 text-base outline-none focus:border-amber-500/50 focus:bg-white/[0.08] transition-all mb-4"
            />

            {state?.error && (
              <p className="text-red-400 text-sm mb-4 text-center">
                Неверный пароль. Попробуй ещё раз.
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="btn-glow w-full text-white py-3.5 rounded-2xl font-semibold text-base disabled:opacity-60 transition-opacity"
            >
              {pending ? "Проверяю..." : "Войти"}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          Нет пароля?{" "}
          <a
            href="/pricing"
            className="text-amber-500 hover:text-amber-400 transition-colors"
          >
            Смотреть тарифы →
          </a>
        </p>
      </div>
    </div>
  );
}

export default function UnlockPage() {
  return (
    <Suspense>
      <UnlockForm />
    </Suspense>
  );
}
