import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

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

  const maxAge =
    pending.type === "once"
      ? 60 * 60 * 24 * 365 * 10
      : 60 * 60 * 24 * 31;

  jar.delete("pending_payment");
  jar.set("club_token", process.env.CLUB_TOKEN!, {
    maxAge,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return NextResponse.redirect(new URL("/courses", siteUrl));
}
