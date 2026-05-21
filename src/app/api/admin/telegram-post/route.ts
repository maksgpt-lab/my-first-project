import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const maxDuration = 300;

const POSTS_DIR = path.join(process.cwd(), "content/telegram");

const CATEGORY_EMOJI: Record<string, string> = {
  "совет": "💡",
  "промпт": "⚙️",
  "кейс": "📊",
  "анонс": "📢",
  "вопрос-ответ": "❓",
  "инструмент недели": "🛠",
};

function extractTitle(text: string): string {
  const match = text.match(/<b>(.*?)<\/b>/);
  return match ? match[1] : text.split("\n")[0].replace(/<[^>]+>/g, "").slice(0, 60);
}

function buildToc(
  posts: { file: string; category: string; title: string; messageId: number }[],
  channelNumericId: string
): string {
  const groups: Record<string, typeof posts> = {};
  for (const p of posts) {
    const cat = p.category || "другое";
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(p);
  }

  let text = "📋 <b>Оглавление канала</b>\n\n";

  for (const [cat, catPosts] of Object.entries(groups)) {
    const emoji = CATEGORY_EMOJI[cat] ?? "•";
    const label = cat.charAt(0).toUpperCase() + cat.slice(1);
    text += `${emoji} <b>${label}</b>\n`;
    for (const p of catPosts) {
      text += `• <a href="https://t.me/c/${channelNumericId}/${p.messageId}">${p.title}</a>\n`;
    }
    text += "\n";
  }

  return text.trim();
}

async function sendTelegramMessage(token: string, channelId: string, text: string) {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: channelId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
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

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md") && f !== "nav.md")
    .sort();

  if (!file) {
    return NextResponse.json({ available: ["nav.md", ...files] });
  }

  if (file === "all") {
    const channelNumericId = channelId.replace(/^-100/, "");
    const published: { file: string; category: string; title: string; messageId: number }[] = [];
    const errors: { file: string; error: string }[] = [];

    for (const f of files) {
      const raw = fs.readFileSync(path.join(POSTS_DIR, f), "utf8");
      const { data, content } = matter(raw);
      const text = content.trim();

      let res = await sendTelegramMessage(token, channelId, text);

      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        const retryAfter: number = errJson?.parameters?.retry_after ?? 0;
        if (res.status === 429 && retryAfter > 0) {
          await new Promise((r) => setTimeout(r, (retryAfter + 2) * 1000));
          res = await sendTelegramMessage(token, channelId, text);
        }
      }

      if (res.ok) {
        const json = await res.json();
        const messageId: number = json.result?.message_id;
        published.push({
          file: f,
          category: String(data.category ?? ""),
          title: extractTitle(text),
          messageId,
        });
      } else {
        const body = await res.text();
        errors.push({ file: f, error: body });
      }

      await new Promise((r) => setTimeout(r, 3000));
    }

    const toc = buildToc(published, channelNumericId);
    const tocRes = await sendTelegramMessage(token, channelId, toc);
    const tocJson = tocRes.ok ? await tocRes.json() : null;
    const tocMessageId: number | null = tocJson?.result?.message_id ?? null;

    return NextResponse.json({
      published: published.length,
      errors,
      tocMessageId,
      toc,
    });
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

  const json = await res.json();
  return NextResponse.json({ success: true, file, messageId: json.result?.message_id });
}
