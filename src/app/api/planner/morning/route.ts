import { NextRequest, NextResponse } from "next/server";
import { generateDailyPlan, getDayInfo } from "@/lib/planner/ai";
import { savePlan } from "@/lib/planner/db";
import { sendMessage } from "@/lib/planner/telegram";

export const maxDuration = 120;

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
  const plan = await generateDailyPlan();
  await savePlan(plan);

  await sendMessage(userId, `🌅 <b>Доброе утро! День ${day} из 75</b>\n\n${plan}`);

  return NextResponse.json({ ok: true, day });
}
