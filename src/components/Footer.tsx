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
      <div className="max-w-5xl mx-auto px-6 py-5 border-b border-white/[0.04] flex flex-wrap items-center gap-3">
        <span className="text-[10px] font-semibold tracking-widest text-white/20 uppercase mr-1">Оплата</span>
        {/* Visa */}
        <div className="h-7 px-3 rounded bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
          <svg width="38" height="12" viewBox="0 0 38 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5 11.5H11.7L13.5 0.5H16.3L14.5 11.5Z" fill="white" fillOpacity="0.7"/>
            <path d="M24.3 0.8C23.7 0.6 22.8 0.3 21.7 0.3C19 0.3 17.1 1.7 17.1 3.7C17.1 5.2 18.4 6 19.4 6.5C20.4 7 20.8 7.3 20.8 7.8C20.8 8.5 19.9 8.8 19.1 8.8C18 8.8 17.4 8.6 16.5 8.2L16.1 8L15.7 10.6C16.4 10.9 17.7 11.2 19 11.2C21.9 11.2 23.8 9.8 23.8 7.7C23.8 6.5 23 5.7 21.5 5.1C20.6 4.6 20 4.3 20 3.8C20 3.3 20.6 2.8 21.7 2.8C22.7 2.8 23.4 3 24 3.3L24.3 3.4L24.7 0.9L24.3 0.8Z" fill="white" fillOpacity="0.7"/>
            <path d="M27.9 7.6L29.1 4.4C29.1 4.4 29.4 3.6 29.6 3.1L29.8 4.3L30.5 7.6H27.9ZM31.6 0.5H29.4C28.7 0.5 28.2 0.7 27.9 1.4L23.8 11.5H26.7L27.3 9.8H30.8L31.1 11.5H33.7L31.6 0.5Z" fill="white" fillOpacity="0.7"/>
            <path d="M9.8 0.5L7.1 8L6.8 6.4C6.3 4.7 4.7 2.9 2.9 1.9L5.4 11.5H8.3L12.7 0.5H9.8Z" fill="white" fillOpacity="0.7"/>
            <path d="M4.5 0.5H0L0 0.7C3.5 1.6 5.8 3.6 6.8 6.4L5.7 1.4C5.5 0.7 5 0.5 4.5 0.5Z" fill="white" fillOpacity="0.4"/>
          </svg>
        </div>
        {/* Mastercard */}
        <div className="h-7 px-2.5 rounded bg-white/[0.06] border border-white/[0.08] flex items-center justify-center gap-1">
          <div className="w-5 h-5 rounded-full bg-red-500/70" />
          <div className="w-5 h-5 rounded-full bg-orange-400/70 -ml-2.5" />
        </div>
        {/* Мир */}
        <div className="h-7 px-3 rounded bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
          <span className="text-[11px] font-bold text-green-400/80 tracking-wide">МИР</span>
        </div>
        {/* ЮКасса */}
        <div className="h-7 px-3 rounded bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
          <span className="text-[11px] font-bold text-yellow-400/80 tracking-wide">ЮКасса</span>
        </div>
        {/* SBP */}
        <div className="h-7 px-3 rounded bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
          <span className="text-[11px] font-bold text-white/50 tracking-wide">СБП</span>
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
