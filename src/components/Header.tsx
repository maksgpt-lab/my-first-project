import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#080810]/80 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-1.5">
          <span className="gradient-text">AI</span>
          <span className="text-white/90"> для бизнеса</span>
        </Link>
        <nav className="flex items-center gap-8 text-sm">
          <Link
            href="/courses"
            className="text-white/50 hover:text-white transition-colors font-medium"
          >
            Курсы
          </Link>
          <Link
            href="https://t.me/+0ip_wx4Y4pFkMTAy"
            className="btn-glow text-white px-5 py-2.5 rounded-xl font-semibold text-sm"
          >
            Telegram-клуб
          </Link>
        </nav>
      </div>
    </header>
  );
}
