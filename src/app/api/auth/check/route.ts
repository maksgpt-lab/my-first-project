import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const jar = await cookies();
  const token = jar.get("club_token")?.value;
  const isClubMember = token === process.env.CLUB_TOKEN;
  return NextResponse.json({ isClubMember });
}
