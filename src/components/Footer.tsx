import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#080810] border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          <span className="font-bold gradient-text">AI</span>
          <span className="text-white/30 text-sm"> для бизнеса</span>
        </div>
        <p className="text-sm text-white/20">
          Автоматизируй бизнес с помощью AI — без кода
        </p>
        <Link
          href="#"
          className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
        >
          Telegram-клуб →
        </Link>
      </div>
    </footer>
  );
}
