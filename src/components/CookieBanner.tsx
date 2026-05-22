"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie_consent", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4">
      <div className="max-w-5xl mx-auto bg-[#13131f] border border-white/[0.1] rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl">
        <p className="text-sm text-white/50 leading-relaxed flex-1">
          Мы используем файлы cookie и Яндекс Метрику для анализа посещаемости.
          Продолжая использовать сайт, вы соглашаетесь с нашей{" "}
          <Link href="/privacy" className="text-indigo-400 hover:text-indigo-300 transition-colors underline">
            политикой конфиденциальности
          </Link>
          .
        </p>
        <button
          onClick={accept}
          className="shrink-0 btn-glow text-white text-sm font-semibold px-5 py-2.5 rounded-xl whitespace-nowrap"
        >
          Принять
        </button>
      </div>
    </div>
  );
}
