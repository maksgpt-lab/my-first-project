import { NextRequest, NextResponse } from "next/server";

const WORKER_URL = "https://ai-proxy.maks-gpt.workers.dev";

// In-memory rate limit: 10 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Слишком много запросов. Подожди минуту." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const { prompt } = body as { prompt?: unknown };

  if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
    return NextResponse.json({ error: "Промпт не может быть пустым" }, { status: 400 });
  }

  if (prompt.length > 2000) {
    return NextResponse.json({ error: "Промпт слишком длинный (макс. 2000 символов)" }, { status: 400 });
  }

  try {
    const workerRes = await fetch(WORKER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Secret": process.env.WORKER_SECRET ?? "",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await workerRes.json();

    if (!workerRes.ok) {
      console.error("[/api/ai] Worker error:", data);
      return NextResponse.json({ error: "Не удалось получить ответ. Попробуй ещё раз." }, { status: 500 });
    }

    return NextResponse.json({ result: data.result ?? "" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Worker error";
    console.error("[/api/ai]", message);
    return NextResponse.json({ error: "Не удалось получить ответ. Попробуй ещё раз." }, { status: 500 });
  }
}
