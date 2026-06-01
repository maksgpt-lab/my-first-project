import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const event = await request.json();

  if (event.event !== "payment.succeeded") {
    return NextResponse.json({ ok: true });
  }

  const paymentId = event.object?.id;
  if (!paymentId) return NextResponse.json({ ok: true });

  // Верифицируем, перезапрашивая у ЮКассы — не доверяем телу вебхука
  const shopId = process.env.YUKASSA_SHOP_ID;
  const secretKey = process.env.YUKASSA_SECRET_KEY;

  const res = await fetch(
    `https://api.yookassa.ru/v3/payments/${paymentId}`,
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${shopId}:${secretKey}`).toString("base64"),
      },
    }
  );

  if (res.ok) {
    const payment = await res.json();
    if (payment.status === "succeeded") {
      console.log(
        "Payment succeeded:",
        paymentId,
        payment.metadata,
        payment.amount
      );
    }
  }

  return NextResponse.json({ ok: true });
}
