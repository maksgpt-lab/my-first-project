import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          AI для бизнеса
        </Link>
        <nav className="flex items-center gap-6 text-sm text-gray-600">
          <Link href="/courses" className="hover:text-gray-900 transition-colors">
            Курсы
          </Link>
          <Link
            href="#"
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Telegram-клуб
          </Link>
        </nav>
      </div>
    </header>
  );
}
