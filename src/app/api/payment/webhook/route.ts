import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  const event = await request.json();

  if (event.event !== "payment.succeeded") {
    return NextResponse.json({ ok: true });
  }

  const paymentId = event.object?.id;
  if (!paymentId) return NextResponse.json({ ok: true });

  const shopId = process.env.YUKASSA_SHOP_ID;
  const secretKey = process.env.YUKASSA_SECRET_KEY;

  // Верифицируем — перезапрашиваем у ЮКассы, не доверяем телу вебхука
  const res = await fetch(`https://api.yookassa.ru/v3/payments/${paymentId}`, {
    headers: {
      Authorization: "Basic " + Buffer.from(`${shopId}:${secretKey}`).toString("base64"),
    },
  });

  if (!res.ok) return NextResponse.json({ ok: true });

  const payment = await res.json();
  if (payment.status !== "succeeded") return NextResponse.json({ ok: true });

  const { plan, type, user_id } = payment.metadata ?? {};
  if (!user_id || !plan || !type) return NextResponse.json({ ok: true });

  const planExpiresAt = type === "once"
    ? null
    : new Date(Date.now() + 31 * 24 * 60 * 60 * 1000).toISOString();

  const admin = createAdminClient();
  await admin
    .from("profiles")
    .update({ plan, plan_type: type, plan_expires_at: planExpiresAt })
    .eq("id", user_id);

  // Уведомление в личный Telegram
  const botToken = process.env.CONTACT_BOT_TOKEN;
  const chatId = process.env.CONTACT_CHAT_ID;
  if (botToken && chatId) {
    const amount = payment.amount?.value
      ? `${Math.round(Number(payment.amount.value))}₽`
      : "?₽";
    const planLabel = plan === "club" ? "Клуб" : "Про";
    const typeLabel = type === "once" ? "навсегда" : "/мес";
    const email = payment.metadata?.email ?? user_id;
    const text = `💸 Оплата! ${amount} — «${planLabel}» ${typeLabel}\n👤 ${email}`;
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
