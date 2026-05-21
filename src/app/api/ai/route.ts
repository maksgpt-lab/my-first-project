import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
    return NextResponse.json({ error: "Промпт не может быть пустым" }, { status: 400 });
  }

  if (prompt.length > 2000) {
    return NextResponse.json({ error: "Промпт слишком длинный (макс. 2000 символов)" }, { status: 400 });
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 600,
    temperature: 0.7,
  });

  const result = completion.choices[0]?.message?.content ?? "";
  return NextResponse.json({ result });
}
