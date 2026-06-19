import OpenAI from "openai";
import { getTotalEarned, getOpenLeads, getYesterdayContext } from "./db";

const GOAL = 1_000_000;
const TOTAL_DAYS = 75;
const START_MS = new Date("2026-06-17T00:00:00+03:00").getTime();

export function getDayInfo() {
  const elapsed = Math.ceil((Date.now() - START_MS) / 86400000);
  const day = Math.max(1, Math.min(elapsed, TOTAL_DAYS));
  const daysLeft = TOTAL_DAYS - day + 1;
  return { day, daysLeft };
}

export async function generateDailyPlan(): Promise<string> {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const { day, daysLeft } = getDayInfo();
  const total = await getTotalEarned();
  const remaining = GOAL - total;
  const dailyNeeded = daysLeft > 0 ? Math.ceil(remaining / daysLeft) : 0;
  const percent = Math.round((total / GOAL) * 100);
  const leads = await getOpenLeads();
  const yesterday = await getYesterdayContext();

  const leadsText =
    leads.length > 0
      ? leads
          .map(
            (l) =>
              `• ${l.name} (${l.channel}) — ${Number(l.amount).toLocaleString("ru")} ₽, статус: ${l.status}`
          )
          .join("\n")
      : "Открытых лидов нет — нужно искать новых";

  const prompt = `Ты мой личный бизнес-коуч. Помогаешь зарабатывать на фрилансе, чтобы оплатить ИТМО.

ЦЕЛЬ: 1 000 000 ₽ за 75 дней (17 июня → 31 августа 2026).

ТЕКУЩИЙ СТАТУС (день ${day} из ${TOTAL_DAYS}):
• Заработано: ${total.toLocaleString("ru")} ₽ из 1 000 000 ₽ (${percent}%)
• Осталось: ${remaining.toLocaleString("ru")} ₽ за ${daysLeft} дней
• Нужно в день: ${dailyNeeded.toLocaleString("ru")} ₽

ОТКРЫТЫЕ СДЕЛКИ:
${leadsText}

ВЧЕРА:
${yesterday ?? "Нет записей"}

Составь план на сегодня:
- 3–5 конкретных задач (кому написать, что предложить, какую сумму назвать)
- Приоритет — двигать открытые сделки к оплате
- Если лидов нет — указать откуда взять (Kwork, B2B холодный outreach, Telegram)
- Без мотивации и воды, только действия
- В конце — одна короткая фраза-мотивация`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 800,
  });

  return res.choices[0].message.content ?? "Не удалось сгенерировать план";
}
