import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const jar = await cookies();
  const raw = jar.get("pending_payment")?.value;

  if (!raw) {
    return NextResponse.redirect(new URL("/pricing?error=session", request.url));
  }

  let pending: { id: string; plan: string; type: string };
  try {
    pending = JSON.parse(raw);
  } catch {
    return NextResponse.redirect(new URL("/pricing?error=session", request.url));
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
    return NextResponse.redirect(new URL("/pricing?error=verify", request.url));
  }

  const payment = await res.json();

  if (payment.status !== "succeeded") {
    return NextResponse.redirect(
      new URL("/pricing?error=not_paid", request.url)
    );
  }

  // once = 10 лет, monthly = 31 день
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

  return NextResponse.redirect(new URL("/courses", request.url));
}
