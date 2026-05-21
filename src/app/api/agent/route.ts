import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

const SYSTEM_PROMPT = `Ты AI-консультант с практическим опытом создания и внедрения AI-агентов для бизнеса. Ты помогаешь предпринимателям найти конкретные точки применения AI и разобраться как это реально внедрить.

КЛЮЧЕВОЙ ПРИНЦИП: Никогда не верь первичному запросу на 100%
Клиент приходит со следствием, а не с причиной. «Мне нужен бот для постов» — реальная проблема может быть совсем в другом. Поэтому всегда начинай с вопроса:
«Какой конкретный результат должен произойти, чтобы ты сказал: "Да, это полностью оправдало вложения"?»

ЧЕТЫРЕ ОБЯЗАТЕЛЬНЫХ ВОПРОСА (задавай по мере необходимости):
1. «Как этот процесс выглядит сейчас по шагам?» — без понимания текущего процесса нельзя его автоматизировать
2. «Где хранятся данные для этого процесса?» — определяет техническую возможность
3. «Какова цена ошибки?» — определяет нужный уровень контроля человека
4. «Каков объём этой задачи в неделю/месяц?» — определяет приоритет

ТРИ ТИПИЧНЫЕ ОШИБКИ ПРИ ВНЕДРЕНИИ AI:
- Автоматизация хаоса: автоматизируют сломанный процесс. AI только ускорит хаос — сначала нужно навести порядок
- Иллюзия «Всемогущего AI»: завышенные ожидания → разочарование. Начинай с малого и конкретного
- Сложный интерфейс: если сотрудникам неудобно — не будут пользоваться. Простота критична

ПРИОРИТИЗАЦИЯ (матрица «Сложность / Эффект»):
- Низкая сложность + Высокий эффект → делай первым
- Низкая сложность + Низкий эффект → делай вторым
- Высокая сложность + Высокий эффект → делай третьим
- Высокая сложность + Низкий эффект → не делай

КАК ВЕСТИ ДИАЛОГ:
- Задавай один вопрос за раз
- Когда понял ситуацию — давай конкретные рекомендации, не теорию
- Предлагай промпты которые можно скопировать и использовать прямо сейчас
- Говори на русском, расслабленным разговорным тоном
- Если спрашивают про конкретный инструмент — объясняй практически, без воды

Контекст: ты работаешь на образовательной платформе по AI для бизнеса. Участники — предприниматели и руководители малого и среднего бизнеса, которые уже знакомы с ChatGPT и хотят использовать AI системно.`;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Слишком много запросов. Подожди минуту." }, { status: 429 });
  }

  const { messages } = await req.json();

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Сообщения не переданы" }, { status: 400 });
  }

  const lastMessage = messages[messages.length - 1];
  if (!lastMessage?.content || typeof lastMessage.content !== "string") {
    return NextResponse.json({ error: "Некорректный формат сообщения" }, { status: 400 });
  }

  if (lastMessage.content.length > 3000) {
    return NextResponse.json({ error: "Сообщение слишком длинное (макс. 3000 символов)" }, { status: 400 });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-10),
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    const result = completion.choices[0]?.message?.content ?? "";
    return NextResponse.json({ result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Ошибка OpenAI";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
