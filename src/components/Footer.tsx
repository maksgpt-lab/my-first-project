import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#080810] border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          <span className="font-bold gradient-text">AI</span>
          <span className="text-white/30 text-sm"> для бизнеса</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {[
            { href: "/courses", label: "Курсы" },
            { href: "/prompts", label: "Промпты" },
            { href: "/guides", label: "Гайды" },
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
        <Link
          href="https://t.me/+0ip_wx4Y4pFkMTAy"
          className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
        >
          Telegram-клуб →
        </Link>
      </div>
    </footer>
  );
}
