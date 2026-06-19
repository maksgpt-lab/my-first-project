import { NextRequest, NextResponse } from "next/server";
import { sendMessage } from "@/lib/planner/telegram";
import {
  addLead,
  getOpenLeads,
  getTotalEarned,
  recordPayment,
  saveNote,
  savePlan,
  updateLeadStatus,
} from "@/lib/planner/db";
import { generateDailyPlan, getDayInfo } from "@/lib/planner/ai";

export const maxDuration = 60;

const GOAL = 1_000_000;
const TOTAL_DAYS = 75;

async function handleCommand(chatId: number, text: string) {
  const parts = text.trim().split(/\s+/);
  const cmd = parts[0].toLowerCase().replace("@", "").split("@")[0];

  // /старт or /start — главное меню
  if (cmd === "/старт" || cmd === "/start") {
    const total = await getTotalEarned();
    const { day, daysLeft } = getDayInfo();
    const remaining = GOAL - total;
    const percent = Math.round((total / GOAL) * 100);
    const dailyNeeded = daysLeft > 0 ? Math.ceil(remaining / daysLeft) : 0;

    await sendMessage(
      chatId,
      `💼 <b>Лето 2026 — Статус</b>

День <b>${day}</b> из ${TOTAL_DAYS}
Заработано: <b>${total.toLocaleString("ru")} ₽</b> (${percent}%)
Осталось: ${remaining.toLocaleString("ru")} ₽ за ${daysLeft} дней
Нужно в день: <b>${dailyNeeded.toLocaleString("ru")} ₽</b>

<b>Команды:</b>
/план — план на сегодня от GPT
/статус — полный дашборд
/деньги 50000 — записать оплату
/лид Имя 50000 b2b — добавить лид
/сделки — открытые лиды
/выиграл 3 — закрыть лид #3 как оплаченный
/итог текст — вечерний отчёт`
    );
    return;
  }

  // /деньги 50000
  if (cmd === "/деньги") {
    const amount = parseFloat(parts[1]);
    if (!amount || isNaN(amount)) {
      await sendMessage(chatId, "Формат: /деньги 50000");
      return;
    }
    await recordPayment(amount);
    const total = await getTotalEarned();
    const percent = Math.round((total / GOAL) * 100);
    const bar = "█".repeat(Math.floor(percent / 5)) + "░".repeat(20 - Math.floor(percent / 5));
    await sendMessage(
      chatId,
      `✅ +${amount.toLocaleString("ru")} ₽ записано!\n\n${bar} ${percent}%\nИтого: <b>${total.toLocaleString("ru")} ₽</b> из 1 000 000 ₽`
    );
    return;
  }

  // /лид Вася 80000 b2b
  if (cmd === "/лид") {
    const name = parts[1];
    const amount = parseFloat(parts[2]);
    const channel = (parts[3] ?? "other").toLowerCase();
    if (!name || !amount || isNaN(amount)) {
      await sendMessage(chatId, "Формат: /лид Имя 50000 b2b\nКаналы: kwork | b2b | telegram | other");
      return;
    }
    await addLead(name, amount, channel);
    await sendMessage(
      chatId,
      `📌 Лид добавлен!\n${name} — ${amount.toLocaleString("ru")} ₽ (${channel})\n\nЗакрой его командой /выиграл [id] когда заплатят.`
    );
    return;
  }

  // /сделки
  if (cmd === "/сделки") {
    const leads = await getOpenLeads();
    if (!leads.length) {
      await sendMessage(chatId, "Открытых лидов нет.\n\nДобавь: /лид Имя 50000 b2b");
      return;
    }
    const totalPotential = leads.reduce((s, l) => s + Number(l.amount), 0);
    const lines = leads
      .map((l) => `[${l.id}] <b>${l.name}</b> — ${Number(l.amount).toLocaleString("ru")} ₽ · ${l.channel} · ${l.status}`)
      .join("\n");
    await sendMessage(
      chatId,
      `📋 <b>Открытые сделки</b>\n\n${lines}\n\n💰 Потенциал: ${totalPotential.toLocaleString("ru")} ₽\n\nЗакрыть: /выиграл [id]`
    );
    return;
  }

  // /выиграл 3 — помечает лид как won + записывает деньги
  if (cmd === "/выиграл") {
    const id = parseInt(parts[1]);
    if (!id || isNaN(id)) {
      await sendMessage(chatId, "Формат: /выиграл 3 (id лида из /сделки)");
      return;
    }
    const leads = await getOpenLeads();
    const lead = leads.find((l) => l.id === id);
    if (!lead) {
      await sendMessage(chatId, `Лид #${id} не найден в открытых. Проверь /сделки`);
      return;
    }
    await updateLeadStatus(id, "won");
    await recordPayment(Number(lead.amount));
    const total = await getTotalEarned();
    const percent = Math.round((total / GOAL) * 100);
    await sendMessage(
      chatId,
      `🎉 <b>Победа!</b>\n${lead.name} — +${Number(lead.amount).toLocaleString("ru")} ₽\n\nИтого: <b>${total.toLocaleString("ru")} ₽</b> (${percent}% от цели)\n\n${percent >= 10 ? "Отличный прогресс! 🔥" : "Продолжаем! Следующий лид ждёт."}`
    );
    return;
  }

  // /статус — полный дашборд
  if (cmd === "/статус") {
    const total = await getTotalEarned();
    const leads = await getOpenLeads();
    const { day, daysLeft } = getDayInfo();
    const remaining = GOAL - total;
    const percent = Math.round((total / GOAL) * 100);
    const leadsPotential = leads.reduce((s, l) => s + Number(l.amount), 0);
    const dailyNeeded = daysLeft > 0 ? Math.ceil(remaining / daysLeft) : 0;
    const bar = "█".repeat(Math.floor(percent / 5)) + "░".repeat(20 - Math.floor(percent / 5));

    await sendMessage(
      chatId,
      `📊 <b>Дашборд — День ${day} из ${TOTAL_DAYS}</b>

${bar} ${percent}%
💰 Заработано: <b>${total.toLocaleString("ru")} ₽</b>
🎯 Цель: 1 000 000 ₽
📉 Осталось: ${remaining.toLocaleString("ru")} ₽
📅 Дней: ${daysLeft}
⚡ Нужно/день: <b>${dailyNeeded.toLocaleString("ru")} ₽</b>

🔮 В открытых сделках: ${leadsPotential.toLocaleString("ru")} ₽ (${leads.length} лидов)`
    );
    return;
  }

  // /план — генерация прямо сейчас
  if (cmd === "/план") {
    await sendMessage(chatId, "⏳ Генерирую план...");
    const plan = await generateDailyPlan();
    await savePlan(plan);
    const { day } = getDayInfo();
    await sendMessage(chatId, `📅 <b>День ${day} из ${TOTAL_DAYS} — план</b>\n\n${plan}`);
    return;
  }

  // /итог текст... — вечерний отчёт
  if (cmd === "/итог") {
    const note = parts.slice(1).join(" ");
    if (!note) {
      await sendMessage(chatId, "Формат: /итог Написал 3 письма, провёл встречу с Васей, получил оплату");
      return;
    }
    await saveNote(note);
    await sendMessage(chatId, "✅ Записал. Учту завтра при составлении плана.");
    return;
  }

  await sendMessage(
    chatId,
    "Не понял команду.\n\n/старт — меню\n/план — план на сегодня\n/статус — дашборд"
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body?.message;
    if (!message?.text) return NextResponse.json({ ok: true });

    const chatId: number = message.chat.id;
    const text: string = message.text;

    const allowedId = process.env.PLANNER_USER_ID;
    if (allowedId && String(chatId) !== allowedId) {
      return NextResponse.json({ ok: true });
    }

    if (text.startsWith("/")) {
      await handleCommand(chatId, text);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
