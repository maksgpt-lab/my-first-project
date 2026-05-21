import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/telegram");

function getMoscowDateString(): string {
  const now = new Date();
  // UTC+3
  const moscow = new Date(now.getTime() + 3 * 60 * 60 * 1000);
  return moscow.toISOString().split("T")[0];
}

async function sendTelegramMessage(token: string, channelId: string, text: string) {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: channelId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: false,
    }),
  });
  return res;
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const channelId = process.env.TELEGRAM_CHANNEL_ID;

  if (!token || !channelId) {
    return NextResponse.json(
      { error: "TELEGRAM_BOT_TOKEN or TELEGRAM_CHANNEL_ID not set" },
      { status: 500 }
    );
  }

  if (!fs.existsSync(POSTS_DIR)) {
    return NextResponse.json({ message: "No posts directory found" });
  }

  const today = getMoscowDateString();
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data, content } = matter(raw);

    const postDate = data.date instanceof Date
      ? data.date.toISOString().split("T")[0]
      : String(data.date);

    if (postDate === today) {
      const text = content.trim();
      const res = await sendTelegramMessage(token, channelId, text);

      if (!res.ok) {
        const body = await res.text();
        return NextResponse.json(
          { error: "Telegram API error", detail: body },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, file, date: today });
    }
  }

  return NextResponse.json({ message: "No post scheduled for today", date: today });
}
