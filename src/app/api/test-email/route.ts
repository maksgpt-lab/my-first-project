import { NextRequest, NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email";

export async function GET(request: NextRequest) {
  const secret = new URL(request.url).searchParams.get("secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = new URL(request.url).searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Pass ?email=you@example.com" }, { status: 400 });
  }

  await sendWelcomeEmail({ email, plan: "club", type: "monthly" });
  return NextResponse.json({ ok: true, sent_to: email });
}
