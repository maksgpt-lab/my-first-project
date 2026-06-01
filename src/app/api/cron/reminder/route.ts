import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendExpiryReminderEmail } from "@/lib/email";

export async function GET(request: NextRequest) {
  const secret = request.headers.get("x-cron-secret")
    ?? new URL(request.url).searchParams.get("secret");

  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();

  // Находим пользователей, у которых подписка истекает через 3 дня (±12 часов)
  const from = new Date(Date.now() + 2.5 * 24 * 60 * 60 * 1000).toISOString();
  const to = new Date(Date.now() + 3.5 * 24 * 60 * 60 * 1000).toISOString();

  const { data: profiles, error } = await admin
    .from("profiles")
    .select("email, plan_expires_at")
    .eq("plan_type", "monthly")
    .gte("plan_expires_at", from)
    .lte("plan_expires_at", to);

  if (error) {
    console.error("[cron/reminder]", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  let sent = 0;
  for (const profile of profiles ?? []) {
    if (!profile.email || !profile.plan_expires_at) continue;
    try {
      await sendExpiryReminderEmail({
        email: profile.email,
        expiresAt: profile.plan_expires_at,
      });
      sent++;
    } catch (e) {
      console.error("[cron/reminder] email failed for", profile.email, e);
    }
  }

  return NextResponse.json({ ok: true, sent });
}
