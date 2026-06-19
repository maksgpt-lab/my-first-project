import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccountActions from "./AccountActions";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata = { title: "Мой аккаунт — AI для бизнеса" };

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login?next=/account");

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, plan_type, plan_expires_at")
    .eq("id", user.id)
    .single();

  const plan = profile?.plan ?? null;
  const planType = profile?.plan_type ?? null;
  const expiresAt = profile?.plan_expires_at ?? null;

  const planLabel = plan === "club" ? "Клуб" : plan === "pro" ? "Про" : null;
  const isOnce = planType === "once";
  const isExpired = !isOnce && expiresAt && new Date(expiresAt) <= new Date();
  const expiresFormatted = expiresAt
    ? new Date(expiresAt).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="bg-[#0C0A08] min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="max-w-xl mx-auto px-6 py-16">
          <h1 className="text-3xl font-bold text-white mb-10">Мой аккаунт</h1>

          {/* Email */}
          <div className="glass-dark rounded-3xl border border-white/[0.07] divide-y divide-white/[0.06] mb-6">
            <InfoRow label="Email" value={user.email ?? ""} />
            <InfoRow
              label="Статус"
              value={
                planLabel && !isExpired ? (
                  <span className="text-emerald-400 font-medium">{planLabel} — активен</span>
                ) : isExpired ? (
                  <span className="text-red-400 font-medium">Истёк</span>
                ) : (
                  <span className="text-white/30">Нет подписки</span>
                )
              }
            />
            {planLabel && (
              <InfoRow
                label="Тариф"
                value={
                  <span className="text-amber-400 font-semibold">{planLabel}</span>
                }
              />
            )}
            {planLabel && (
              <InfoRow
                label="Тип"
                value={isOnce ? "Навсегда" : "Ежемесячно"}
              />
            )}
            {!isOnce && expiresFormatted && (
              <InfoRow
                label={isExpired ? "Истёк" : "Действует до"}
                value={
                  <span className={isExpired ? "text-red-400" : "text-white/70"}>
                    {expiresFormatted}
                  </span>
                }
              />
            )}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {plan && !isExpired ? (
              <>
                <Link
                  href="/courses"
                  className="block w-full btn-glow text-white py-3.5 rounded-xl font-semibold text-sm text-center"
                >
                  Перейти к курсам →
                </Link>
                {!isOnce && (
                  <Link
                    href={`/api/payment/create?plan=${plan}&type=monthly`}
                    className="block w-full bg-white/[0.04] border border-white/[0.1] hover:bg-white/[0.07] text-white/60 hover:text-white py-3.5 rounded-xl font-medium text-sm text-center transition-colors"
                  >
                    Продлить подписку
                  </Link>
                )}
              </>
            ) : (
              <>
                {isExpired && (
                  <Link
                    href={`/api/payment/create?plan=${plan}&type=monthly`}
                    className="block w-full btn-glow text-white py-3.5 rounded-xl font-semibold text-sm text-center"
                  >
                    Восстановить доступ →
                  </Link>
                )}
                <Link
                  href="/pricing"
                  className={`block w-full ${isExpired ? "bg-white/[0.04] border border-white/[0.1] hover:bg-white/[0.07] text-white/60 hover:text-white" : "btn-glow text-white"} py-3.5 rounded-xl font-semibold text-sm text-center transition-colors`}
                >
                  {isExpired ? "Сменить тариф" : "Выбрать тариф →"}
                </Link>
              </>
            )}

            <AccountActions />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-6 py-4">
      <span className="text-sm text-white/40 shrink-0">{label}</span>
      <span className="text-sm text-white/70 text-right">{value}</span>
    </div>
  );
}
