import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aidabusiness.ru";

  const jar = await cookies();
  const raw = jar.get("pending_payment")?.value;

  if (!raw) {
    return NextResponse.redirect(new URL("/pricing?error=session", siteUrl));
  }

  let pending: { id: string; plan: string; type: string };
  try {
    pending = JSON.parse(raw);
  } catch {
    return NextResponse.redirect(new URL("/pricing?error=session", siteUrl));
  }

  const shopId = process.env.YUKASSA_SHOP_ID;
  const secretKey = process.env.YUKASSA_SECRET_KEY;

  const res = await fetch(
    `https://api.yookassa.ru/v3/payments/${pending.id}`,
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${shopId}:${secretKey}`).toString("base64"),
      },
    }
  );

  if (!res.ok) {
    return NextResponse.redirect(new URL("/pricing?error=verify", siteUrl));
  }

  const payment = await res.json();

  if (payment.status !== "succeeded") {
    return NextResponse.redirect(new URL("/pricing?error=not_paid", siteUrl));
  }

  // Берём план из метаданных платежа (YuKassa), а не из cookie
  // Это предотвращает подмену плана через редактирование cookie
  const VALID_PLANS = ["pro", "club"] as const;
  const VALID_TYPES = ["once", "monthly"] as const;
  type Plan = typeof VALID_PLANS[number];
  type PType = typeof VALID_TYPES[number];

  const metaPlan = payment.metadata?.plan as string;
  const metaType = payment.metadata?.type as string;

  if (!VALID_PLANS.includes(metaPlan as Plan) || !VALID_TYPES.includes(metaType as PType)) {
    return NextResponse.redirect(new URL("/pricing?error=invalid_plan", siteUrl));
  }

  const plan = metaPlan as Plan;
  const planType = metaType as PType;

  jar.delete("pending_payment");

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const planExpiresAt = planType === "once"
      ? null
      : new Date(Date.now() + 31 * 24 * 60 * 60 * 1000).toISOString();

    const admin = createAdminClient();
    await admin
      .from("profiles")
      .update({
        plan,
        plan_type: planType,
        plan_expires_at: planExpiresAt,
      })
      .eq("id", user.id);
  } else {
    // Fallback: cookie для тех, кто не зарегистрирован
    const maxAge = planType === "once"
      ? 60 * 60 * 24 * 365 * 10
      : 60 * 60 * 24 * 31;

    jar.set("club_token", process.env.CLUB_TOKEN!, {
      maxAge,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  return NextResponse.redirect(new URL("/payment/success", siteUrl));
}
