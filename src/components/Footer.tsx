import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-100 bg-gray-50/50">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold gradient-text">AI</span>
          <span className="text-gray-500 text-sm"> для бизнеса</span>
        </div>
        <p className="text-sm text-gray-400">
          Автоматизируй бизнес с помощью AI — без кода
        </p>
        <Link
          href="#"
          className="text-sm text-indigo-600 hover:text-indigo-500 transition-colors font-medium"
        >
          Telegram-клуб →
        </Link>
      </div>
    </footer>
  );
}
