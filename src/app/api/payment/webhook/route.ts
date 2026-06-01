import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendWelcomeEmail } from "@/lib/email";

const auth = () =>
  "Basic " +
  Buffer.from(
    `${process.env.YUKASSA_SHOP_ID}:${process.env.YUKASSA_SECRET_KEY}`
  ).toString("base64");

export async function POST(request: NextRequest) {
  const event = await request.json();

  // ── Оплата прошла ──────────────────────────────────────────────────────────
  if (event.event === "payment.succeeded") {
    const paymentId = event.object?.id;
    if (!paymentId) return NextResponse.json({ ok: true });

    const res = await fetch(
      `https://api.yookassa.ru/v3/payments/${paymentId}`,
      { headers: { Authorization: auth() } }
    );
    if (!res.ok) return NextResponse.json({ ok: true });

    const payment = await res.json();
    if (payment.status !== "succeeded") return NextResponse.json({ ok: true });

    const { plan, type, user_id, email } = payment.metadata ?? {};
    if (!user_id || !plan || !type) return NextResponse.json({ ok: true });

    const planExpiresAt =
      type === "once"
        ? null
        : new Date(Date.now() + 31 * 24 * 60 * 60 * 1000).toISOString();

    const admin = createAdminClient();
    await admin
      .from("profiles")
      .update({ plan, plan_type: type, plan_expires_at: planExpiresAt })
      .eq("id", user_id);

    // Welcome-письмо пользователю
    if (email) {
      sendWelcomeEmail({ email, plan, type }).catch(() => {});
    }

    // Уведомление в Telegram
    const amount = payment.amount?.value
      ? `${Math.round(Number(payment.amount.value))}₽`
      : "?₽";
    const planLabel = plan === "club" ? "Клуб" : "Про";
    const typeLabel = type === "once" ? "навсегда" : "/мес";
    sendTelegram(
      `💸 Оплата! ${amount} — «${planLabel}» ${typeLabel}\n👤 ${email ?? user_id}`
    );
  }

  // ── Возврат ────────────────────────────────────────────────────────────────
  if (event.event === "refund.succeeded") {
    const paymentId = event.object?.payment_id;
    if (!paymentId) return NextResponse.json({ ok: true });

    // Перезапрашиваем исходный платёж чтобы получить user_id из metadata
    const res = await fetch(
      `https://api.yookassa.ru/v3/payments/${paymentId}`,
      { headers: { Authorization: auth() } }
    );
    if (!res.ok) return NextResponse.json({ ok: true });

    const payment = await res.json();
    const { user_id, email } = payment.metadata ?? {};
    if (!user_id) return NextResponse.json({ ok: true });

    const admin = createAdminClient();
    await admin
      .from("profiles")
      .update({ plan: null, plan_type: null, plan_expires_at: null })
      .eq("id", user_id);

    // Уведомление в Telegram
    const amount = event.object?.amount?.value
      ? `${Math.round(Number(event.object.amount.value))}₽`
      : "?₽";
    sendTelegram(`↩️ Возврат ${amount}\n👤 ${email ?? user_id}`);
  }

  return NextResponse.json({ ok: true });
}

function sendTelegram(text: string) {
  const botToken = process.env.CONTACT_BOT_TOKEN;
  const chatId = process.env.CONTACT_CHAT_ID;
  if (!botToken || !chatId) return;
  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  }).catch(() => {});
}
