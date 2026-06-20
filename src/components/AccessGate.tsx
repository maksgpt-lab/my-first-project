"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type AccessStatus = "loading" | "granted" | "no_login" | "expired" | "no_plan";

export default function AccessGate({
  fallback,
  children,
}: {
  fallback: React.ReactNode;
  children: React.ReactNode;
}) {
  const [status, setStatus] = useState<AccessStatus>("loading");

  useEffect(() => {
    async function check() {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          // Проверяем club_token cookie (для админов)
          const jar = document.cookie;
          const match = jar.match(/club_token=([^;]+)/);
          if (match && match[1] === "__CLUB_TOKEN__") {
            setStatus("granted");
            return;
          }
          setStatus("no_login");
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("plan, plan_type, plan_expires_at")
          .eq("id", user.id)
          .single();

        if (profile?.plan) {
          const isOnce = profile.plan_type === "once";
          const expired =
            !isOnce &&
            !!profile.plan_expires_at &&
            new Date(profile.plan_expires_at) <= new Date();
          if (!expired) {
            setStatus("granted");
            return;
          }
          setStatus("expired");
          return;
        }

        setStatus("no_plan");
      } catch {
        setStatus("no_login");
      }
    }

    check();
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0C0A08]">
        <div className="text-white/30 text-sm animate-pulse">Проверка доступа…</div>
      </div>
    );
  }

  if (status === "granted") {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
