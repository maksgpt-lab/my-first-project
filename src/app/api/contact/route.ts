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

  const token = process.env.CONTACT_BOT_TOKEN;
  const chatId = process.env.CONTACT_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const text =
    `📋 <b>Новая заявка на внедрение AI</b>\n\n` +
    `👤 Имя: ${esc(name.trim())}\n` +
    `📧 Email: ${esc(email.trim())}\n` +
    `💬 Задача:\n${esc(comment.trim())}`;

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
