import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata = { title: "Оплата прошла — AI для бизнеса" };

export default async function PaymentSuccessPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, plan_type, plan_expires_at")
    .eq("id", user.id)
    .single();

  if (!profile?.plan) redirect("/pricing?error=not_paid");

  const planLabel = profile.plan === "club" ? "Клуб" : "Про";
  const isOnce = profile.plan_type === "once";
  const expiresAt = profile.plan_expires_at
    ? new Date(profile.plan_expires_at).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="bg-[#0C0A08] min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center mx-auto mb-8">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13l4 4L19 7"
                stroke="#34d399"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-white mb-3">Оплата прошла!</h1>
          <p className="text-white/50 mb-8 leading-relaxed">
            Доступ к тарифу{" "}
            <strong className="text-amber-400">{planLabel}</strong>{" "}
            {isOnce ? "навсегда" : "на 31 день"} открыт. Письмо с подтверждением
            отправлено на {user.email}.
          </p>

          <div className="glass-dark rounded-2xl border border-white/[0.07] p-6 mb-8 text-left space-y-4">
            <Row label="Тариф" value={<span className="text-amber-400 font-semibold">{planLabel}</span>} />
            <Row label="Тип" value={isOnce ? "Навсегда" : "Ежемесячно"} />
            {!isOnce && expiresAt && (
              <Row label="Действует до" value={expiresAt} />
            )}
            <Row label="Email" value={user.email ?? ""} />
          </div>

          <Link
            href="/courses"
            className="btn-glow text-white px-8 py-3.5 rounded-xl font-semibold text-sm inline-block mb-4 w-full"
          >
            Перейти к курсам →
          </Link>

          <Link
            href="/account"
            className="block text-xs text-white/30 hover:text-white/60 transition-colors mt-3"
          >
            Мой аккаунт →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-white/40 shrink-0">{label}</span>
      <span className="text-sm text-white/70 text-right truncate">{value}</span>
    </div>
  );
}
