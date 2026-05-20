"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function unlockAccess(
  _prevState: { error: boolean } | null,
  formData: FormData
): Promise<{ error: boolean }> {
  const password = formData.get("password") as string;
  const next = (formData.get("next") as string) || "/courses";

  if (password === process.env.CLUB_PASSWORD) {
    const jar = await cookies();
    jar.set("club_token", process.env.CLUB_TOKEN!, {
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    redirect(next);
  }

  return { error: true };
}

