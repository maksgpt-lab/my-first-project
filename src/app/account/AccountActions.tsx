"use client";
import { createClient } from "@/lib/supabase/client";

export default function AccountActions() {
  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <button
      onClick={handleLogout}
      className="block w-full bg-white/[0.03] border border-white/[0.07] hover:bg-red-500/10 hover:border-red-500/20 text-white/40 hover:text-red-400 py-3.5 rounded-xl font-medium text-sm text-center transition-colors"
    >
      Выйти из аккаунта
    </button>
  );
}
