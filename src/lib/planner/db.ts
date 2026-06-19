import { createAdminClient } from "@/lib/supabase/admin";

export interface Lead {
  id: number;
  name: string;
  channel: string;
  amount: number;
  status: string;
  notes?: string;
}

export async function getTotalEarned(): Promise<number> {
  const db = createAdminClient();
  const { data } = await db.from("planner_log").select("earned_today");
  return (data ?? []).reduce((sum, row) => sum + (Number(row.earned_today) || 0), 0);
}

export async function getOpenLeads(): Promise<Lead[]> {
  const db = createAdminClient();
  const { data } = await db
    .from("planner_leads")
    .select("*")
    .in("status", ["new", "negotiating"])
    .order("amount", { ascending: false });
  return (data ?? []) as Lead[];
}

export async function addLead(name: string, amount: number, channel: string) {
  const db = createAdminClient();
  await db.from("planner_leads").insert({ name, amount, channel });
}

export async function updateLeadStatus(id: number, status: string) {
  const db = createAdminClient();
  await db.from("planner_leads").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
}

export async function recordPayment(amount: number) {
  const db = createAdminClient();
  const today = new Date().toISOString().split("T")[0];
  const { data: existing } = await db
    .from("planner_log")
    .select("id, earned_today")
    .eq("date", today)
    .maybeSingle();

  if (existing) {
    await db
      .from("planner_log")
      .update({ earned_today: Number(existing.earned_today) + amount })
      .eq("id", existing.id);
  } else {
    await db.from("planner_log").insert({ date: today, earned_today: amount });
  }
}

export async function saveNote(note: string) {
  const db = createAdminClient();
  const today = new Date().toISOString().split("T")[0];
  const { data: existing } = await db
    .from("planner_log")
    .select("id, notes")
    .eq("date", today)
    .maybeSingle();

  if (existing) {
    const combined = existing.notes ? `${existing.notes}\n${note}` : note;
    await db.from("planner_log").update({ notes: combined }).eq("id", existing.id);
  } else {
    await db.from("planner_log").insert({ date: today, notes: note });
  }
}

export async function savePlan(planText: string) {
  const db = createAdminClient();
  const today = new Date().toISOString().split("T")[0];
  const { data: existing } = await db
    .from("planner_log")
    .select("id")
    .eq("date", today)
    .maybeSingle();

  if (existing) {
    await db.from("planner_log").update({ plan_text: planText }).eq("id", existing.id);
  } else {
    await db.from("planner_log").insert({ date: today, plan_text: planText });
  }
}

export async function getYesterdayContext(): Promise<string | null> {
  const db = createAdminClient();
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  const { data } = await db
    .from("planner_log")
    .select("notes, earned_today")
    .eq("date", yesterday)
    .maybeSingle();
  if (!data) return null;
  const parts: string[] = [];
  if (Number(data.earned_today) > 0)
    parts.push(`Заработано: ${Number(data.earned_today).toLocaleString("ru")} ₽`);
  if (data.notes) parts.push(data.notes);
  return parts.join(". ") || null;
}
