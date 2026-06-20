import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Club token check ──
  if (pathname.startsWith("/club")) {
    const token = request.cookies.get("club_token")?.value;
    const validToken = process.env.CLUB_TOKEN;
    if (!validToken || token !== validToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/unlock";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  // ── Supabase auth refresh — only on authenticated routes ──
  // На публичных страницах НЕ вызываем Supabase — из-за этого сайт
  // не открывался для пользователей из РФ (Supabase timeout).
  if (
    pathname.startsWith("/account") ||
    pathname.startsWith("/buy") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/payment")
  ) {
    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    try {
      await supabase.auth.getUser();
    } catch {
      // Если Supabase недоступен — пропускаем, не блокируем страницу
    }

    return supabaseResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account/:path*",
    "/buy/:path*",
    "/club/:path*",
    "/api/auth/:path*",
    "/api/payment/:path*",
  ],
};
