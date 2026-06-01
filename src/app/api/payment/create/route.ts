import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

const AMOUNTS = {
  pro:  { monthly: 990,  once: 7900  },
  club: { monthly: 1990, once: 14900 },
};

const LABELS = {
  pro:  "Про",
  club: "Клуб",
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const plan = searchParams.get("plan") as "pro" | "club";
  const type = searchParams.get("type") === "once" ? "once" : "monthly";

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aidabusiness.ru";

  if (!AMOUNTS[plan]) {
    return NextResponse.redirect(new URL("/pricing", siteUrl));
  }

  // Проверяем авторизацию — без аккаунта не пускаем
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    const next = encodeURIComponent(`/api/payment/create?plan=${plan}&type=${type}`);
    return NextResponse.redirect(new URL(`/auth/register?next=${next}`, siteUrl));
  }

  const shopId = process.env.YUKASSA_SHOP_ID;
  const secretKey = process.env.YUKASSA_SECRET_KEY;

  if (!shopId || !secretKey) {
    console.error("YUKASSA_SHOP_ID or YUKASSA_SECRET_KEY not set");
    return NextResponse.redirect(new URL("/pricing?error=config", siteUrl));
  }

  const amount = AMOUNTS[plan][type];
  const typeLabel = type === "once" ? "навсегда" : "на месяц";

  const res = await fetch("https://api.yookassa.ru/v3/payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotence-Key": crypto.randomUUID(),
      Authorization:
        "Basic " +
        Buffer.from(`${shopId}:${secretKey}`).toString("base64"),
    },
    body: JSON.stringify({
      amount: { value: amount.toFixed(2), currency: "RUB" },
      confirmation: {
        type: "redirect",
        return_url: `${siteUrl}/api/payment/success`,
      },
      capture: true,
      description: `Доступ «${LABELS[plan]}» ${typeLabel} — AI для бизнеса`,
      metadata: { plan, type },
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("YuKassa create payment error:", error);
    return NextResponse.redirect(new URL("/pricing?error=payment", siteUrl));
  }

  const payment = await res.json();

  const jar = await cookies();
  jar.set(
    "pending_payment",
    JSON.stringify({ id: payment.id, plan, type }),
    {
      maxAge: 3600,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    }
  );

  return NextResponse.redirect(payment.confirmation.confirmation_url);
}
