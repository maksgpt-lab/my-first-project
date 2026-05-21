import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="bg-[#080810] min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-7xl font-bold gradient-text mb-6">404</div>
          <h1 className="text-2xl font-bold text-white mb-3">Страница не найдена</h1>
          <p className="text-white/40 leading-relaxed mb-10">
            Такой страницы не существует. Возможно, ссылка устарела или ты ошибся адресом.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="btn-glow text-white px-7 py-3 rounded-xl font-semibold text-sm"
            >
              На главную
            </Link>
            <Link
              href="/courses"
              className="glass-dark text-white/60 hover:text-white px-7 py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              Смотреть курсы
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
