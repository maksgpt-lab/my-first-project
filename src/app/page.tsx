import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCourses } from "@/lib/courses";

const benefits = [
  {
    icon: "🇷🇺",
    title: "На русском языке",
    text: "Весь контент на русском — никаких языковых барьеров и переводчиков.",
  },
  {
    icon: "⚡",
    title: "Без программирования",
    text: "Только готовые инструменты: ChatGPT, Claude, n8n, Make. Никакого кода.",
  },
  {
    icon: "💼",
    title: "Реальные кейсы",
    text: "Каждый урок — конкретная задача из маркетинга, HR или управления.",
  },
];

const stats = [
  { value: "20–40%", label: "продуктивность" },
  { value: "3 ч/день", label: "экономия времени" },
  { value: "×7", label: "цена медленного ответа" },
];

export default function Home() {
  const courses = getCourses();

  return (
    <div className="bg-[#080810] min-h-screen">
      <Header />

      <main className="overflow-hidden">

        {/* ── Hero ── */}
        <section className="relative min-h-[92vh] flex items-center dot-grid">

          {/* aurora blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="animate-aurora absolute -top-60 -right-60 w-[700px] h-[700px] rounded-full bg-indigo-600/20 blur-[120px]" />
            <div className="animate-aurora absolute -bottom-60 -left-60 w-[600px] h-[600px] rounded-full bg-violet-600/20 blur-[100px]" style={{ animationDelay: "4s" }} />
            <div className="animate-aurora absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[80px]" style={{ animationDelay: "8s" }} />
          </div>

          {/* noise overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

          <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center w-full">

            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full mb-10 tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Обучение AI для бизнеса · На русском
              </span>
            </div>

            <h1 className="animate-fade-up-d1 text-5xl sm:text-6xl lg:text-[80px] font-bold tracking-tight leading-[1.05] text-white">
              Зарабатывай больше
              <br />
              <span className="gradient-text">с помощью AI</span>
            </h1>

            <p className="animate-fade-up-d2 mt-8 text-xl sm:text-2xl text-white/40 max-w-xl mx-auto leading-relaxed font-light">
              Практические курсы без кода. Реальные результаты
              для предпринимателей и их команд.
            </p>

            <div className="animate-fade-up-d3 mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="btn-glow text-white px-9 py-4 rounded-2xl text-lg font-bold"
              >
                Начать обучение →
              </Link>
              <Link
                href="https://t.me/+0ip_wx4Y4pFkMTAy"
                className="glass-dark text-white/70 hover:text-white px-9 py-4 rounded-2xl text-lg font-medium transition-colors"
              >
                Telegram-клуб
              </Link>
            </div>

            {/* Stats */}
            <div className="animate-fade-up-d4 mt-24 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              {stats.map((s) => (
                <div key={s.label} className="glass-dark rounded-2xl px-5 py-5">
                  <div className="text-2xl font-bold gradient-text">{s.value}</div>
                  <div className="text-xs text-white/35 mt-1.5 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* bottom fade */}
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#080810] to-transparent" />
        </section>

        {/* ── Benefits ── */}
        <section className="bg-[#080810] py-28">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-4">Почему здесь</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Три причины, которые отличают нас
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {benefits.map((b, i) => (
                <div
                  key={b.title}
                  className="card-hover gradient-border glass-dark rounded-3xl p-8"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="text-5xl mb-6">{b.icon}</div>
                  <h3 className="font-bold text-white text-lg mb-3">{b.title}</h3>
                  <p className="text-white/40 leading-relaxed text-[15px]">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Courses ── */}
        {courses.length > 0 && (
          <section className="bg-[#080810] pb-28">
            <div className="max-w-5xl mx-auto px-6">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-3">Курсы</p>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white">
                    Начни с любого
                  </h2>
                </div>
                <Link href="/courses" className="text-white/30 hover:text-white transition-colors text-sm font-medium hidden sm:block">
                  Все курсы →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {courses.map((course) => (
                  <Link
                    key={course.slug}
                    href={`/courses/${course.slug}`}
                    className="card-hover gradient-border glass-dark rounded-3xl p-8 block group"
                  >
                    <div className="flex items-start justify-between mb-5">
                      <span className="text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                        {course.lessons.filter((l) => l.free).length} урока бесплатно
                      </span>
                      <span className="text-white/20 group-hover:text-indigo-400 transition-colors text-lg">↗</span>
                    </div>
                    <h3 className="font-bold text-white text-xl group-hover:gradient-text transition-all mb-3 leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-white/40 leading-relaxed text-[15px] mb-7">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-white/[0.06] rounded-full">
                        <div className="h-full w-[28%] gradient-bg rounded-full opacity-70" />
                      </div>
                      <span className="text-xs text-white/25">{course.lessons.length} уроков</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="bg-[#080810] pb-28">
          <div className="max-w-5xl mx-auto px-6">
            <div className="relative rounded-3xl overflow-hidden">
              {/* background */}
              <div className="absolute inset-0 gradient-bg opacity-90" />
              <div className="absolute inset-0 dot-grid opacity-20" />
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />

              <div className="relative z-10 px-8 py-20 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Присоединись к Telegram-клубу
                </h2>
                <p className="text-white/70 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                  Шаблоны промптов, разборы кейсов, Q&A с автором
                  и ранний доступ к новым курсам.
                </p>
                <Link
                  href="https://t.me/+0ip_wx4Y4pFkMTAy"
                  className="inline-block bg-white text-indigo-600 px-9 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-colors shadow-2xl"
                >
                  Вступить бесплатно
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
