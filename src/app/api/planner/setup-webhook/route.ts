import { NextRequest, NextResponse } from "next/server";

// Run once: GET /api/planner/setup-webhook?secret=YOUR_CRON_SECRET
// This registers the Telegram webhook URL with Telegram servers.

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.PLANNER_BOT_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "PLANNER_BOT_TOKEN not set" }, { status: 500 });
  }

  const host = req.headers.get("host");
  const webhookUrl = `https://${host}/api/planner/webhook`;

  const res = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: webhookUrl }),
  });

  const data = await res.json();
  return NextResponse.json({ webhookUrl, telegram: data });
}
