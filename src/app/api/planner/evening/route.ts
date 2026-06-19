import { NextRequest, NextResponse } from "next/server";
import { sendMessage } from "@/lib/planner/telegram";
import { getTotalEarned } from "@/lib/planner/db";
import { getDayInfo } from "@/lib/planner/ai";

export const maxDuration = 30;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = process.env.PLANNER_USER_ID;
  if (!userId) {
    return NextResponse.json({ error: "PLANNER_USER_ID not set" }, { status: 500 });
  }

  const { day } = getDayInfo();
  const total = await getTotalEarned();
  const percent = Math.round((total / 1_000_000) * 100);

  await sendMessage(
    userId,
    `🌙 <b>Итог дня ${day}</b>

Заработано всего: <b>${total.toLocaleString("ru")} ₽</b> (${percent}%)

Напиши что сделал сегодня:
/итог [текст]

Если были оплаты — не забудь записать:
/деньги [сумма]`
  );

  return NextResponse.json({ ok: true, day });
}
