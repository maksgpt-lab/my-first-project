import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const maxDuration = 300;

const POSTS_DIR = path.join(process.cwd(), "content/telegram");

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
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const file = searchParams.get("file");

  if (secret !== process.env.CRON_SECRET) {
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

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md")).sort();

  if (!file) {
    return NextResponse.json({ available: files });
  }

  if (file === "all") {
    const results: { file: string; ok: boolean; error?: string }[] = [];
    for (const f of files) {
      const raw = fs.readFileSync(path.join(POSTS_DIR, f), "utf8");
      const { content } = matter(raw);
      const res = await sendTelegramMessage(token, channelId, content.trim());
      if (res.ok) {
        results.push({ file: f, ok: true });
      } else {
        const body = await res.text();
        results.push({ file: f, ok: false, error: body });
      }
      await new Promise((r) => setTimeout(r, 1000));
    }
    return NextResponse.json({ results });
  }

  const filePath = path.join(POSTS_DIR, file.endsWith(".md") ? file : `${file}.md`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);
  const text = content.trim();

  const res = await sendTelegramMessage(token, channelId, text);

  if (!res.ok) {
    const body = await res.text();
    return NextResponse.json(
      { error: "Telegram API error", detail: body },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, file });
}
