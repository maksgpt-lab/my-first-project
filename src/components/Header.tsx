import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-white/30">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight flex items-center gap-2">
          <span className="gradient-text">AI</span>
          <span className="text-gray-800"> для бизнеса</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/courses"
            className="text-gray-500 hover:text-gray-900 transition-colors font-medium"
          >
            Курсы
          </Link>
          <Link
            href="#"
            className="gradient-bg text-white px-5 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg shadow-indigo-200"
          >
            Telegram-клуб
          </Link>
        </nav>
      </div>
    </header>
  );
}
