import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, email, comment } = body as Record<string, unknown>;

  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !email.trim() ||
    typeof comment !== "string" || !comment.trim()
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHANNEL_ID;

  if (!token || !chatId) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const text =
    `📋 Новая заявка на внедрение AI\n\n` +
    `👤 Имя: ${name.trim()}\n` +
    `📧 Email: ${email.trim()}\n` +
    `💬 Задача:\n${comment.trim()}`;

  const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });

  if (!tgRes.ok) {
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
