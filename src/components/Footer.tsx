import Link from "next/link";

const professionLinks = [
  { href: "/for/marketolog", label: "Маркетологу" },
  { href: "/for/rukovoditel", label: "Руководителю" },
  { href: "/for/prodazhi", label: "Отделу продаж" },
  { href: "/for/hr", label: "HR" },
  { href: "/for/buhgalter", label: "Бухгалтеру" },
];

export default function Footer() {
  return (
    <footer className="bg-[#080810] border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-4 border-b border-white/[0.04]">
        <p className="text-[10px] font-semibold tracking-widest text-white/20 uppercase mb-3">ChatGPT для специалистов</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {professionLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/25 hover:text-white/50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          <span className="font-bold gradient-text">AI</span>
          <span className="text-white/30 text-sm"> для бизнеса</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {[
            { href: "/courses", label: "Курсы" },
            { href: "/prompts", label: "Промпты" },
            { href: "/guides", label: "Гайды" },
            { href: "/pricing", label: "Тарифы" },
            { href: "/about", label: "О проекте" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/25 hover:text-white/50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col items-center sm:items-end gap-2">
          <Link
            href="https://t.me/+0ip_wx4Y4pFkMTAy"
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
          >
            Telegram-клуб →
          </Link>
          <div className="flex gap-4">
            <Link href="/oferta" className="text-xs text-white/15 hover:text-white/35 transition-colors">
              Оферта
            </Link>
            <Link href="/refund" className="text-xs text-white/15 hover:text-white/35 transition-colors">
              Возврат
            </Link>
            <Link href="/rekvizity" className="text-xs text-white/15 hover:text-white/35 transition-colors">
              Реквизиты
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
