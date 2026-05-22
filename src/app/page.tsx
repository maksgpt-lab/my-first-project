import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCourses } from "@/lib/courses";

const TG_LINK = "https://t.me/+0ip_wx4Y4pFkMTAy";

export default function Home() {
  const courses = getCourses();

  return (
    <div className="bg-[#080810] min-h-screen">
      <Header />

      <main className="overflow-hidden">

        {/* ── Hero ── */}
        <section className="relative min-h-[90vh] flex items-center dot-grid">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="animate-aurora absolute -top-60 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-600/15 blur-[130px]" />
            <div className="animate-aurora absolute -bottom-60 -left-40 w-[400px] h-[400px] rounded-full bg-violet-600/10 blur-[110px]" style={{ animationDelay: "4s" }} />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Left: copy */}
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full mb-8 tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  На русском · Без кода · Для бизнеса
                </span>

                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] text-white mb-6">
                  ChatGPT для реальной работы —{" "}
                  <span className="gradient-text">конкретно и на русском</span>
                </h1>

                <p className="text-white/55 text-lg leading-relaxed mb-8 max-w-lg">
                  Курсы, промпты и гайды для предпринимателей и специалистов. Без программирования — только то, что можно применить сразу.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-10">
                  <Link
                    href="/courses"
                    className="btn-glow text-white px-8 py-3.5 rounded-xl font-semibold text-center"
                  >
                    Начать бесплатно →
                  </Link>
                  <Link
                    href="/pricing"
                    className="glass-dark text-white/55 hover:text-white px-8 py-3.5 rounded-xl font-medium transition-colors border border-white/[0.08] text-center"
                  >
                    Смотреть тарифы
                  </Link>
                </div>

                <div className="flex items-center gap-5 text-sm text-white/40">
                  <span><strong className="text-white/80 font-semibold">6</strong> курсов</span>
                  <span className="text-white/15">·</span>
                  <span><strong className="text-white/80 font-semibold">30+</strong> промптов</span>
                  <span className="text-white/15">·</span>
                  <span><strong className="text-white/80 font-semibold">3 урока</strong> бесплатно</span>
                </div>
              </div>

              {/* Right: lesson preview */}
              <div className="hidden lg:flex flex-col">
                <div className="rounded-2xl overflow-hidden border border-white/[0.09] shadow-[0_0_80px_rgba(99,102,241,0.08)]">
                  <div className="bg-[#13131f] px-4 py-3 flex items-center gap-2 border-b border-white/[0.06]">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    </div>
                    <div className="flex-1 mx-3">
                      <div className="bg-white/[0.04] rounded-md px-3 py-1 text-[11px] text-white/20 text-center">
                        aidabusiness.ru/courses/…
                      </div>
                    </div>
                  </div>
                  <img
                    src="/lesson-preview.png"
                    alt="Урок на платформе"
                    className="w-full block"
                  />
                </div>
                <p className="text-white/30 text-sm text-center mt-4 leading-relaxed">
                  Практика прямо в уроке — не нужно никуда переходить
                </p>
              </div>

            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#080810] to-transparent" />
        </section>

        {/* ── Courses ── */}
        {courses.length > 0 && (
          <section className="py-24">
            <div className="max-w-5xl mx-auto px-6">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-3">
                    Программа
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white">
                    6 курсов — от основ до системы
                  </h2>
                  <p className="text-white/40 mt-2 text-base max-w-md">
                    Проходи по порядку или начни с того, что нужно прямо сейчас.
                  </p>
                </div>
                <Link
                  href="/courses"
                  className="text-white/30 hover:text-white transition-colors text-sm font-medium hidden sm:block shrink-0"
                >
                  Все курсы →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {courses.slice(0, 4).map((course) => (
                  <Link
                    key={course.slug}
                    href={`/courses/${course.slug}`}
                    className="card-hover gradient-border glass-dark rounded-2xl p-7 block group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                        {course.lessons.filter((l) => l.free).length} урока бесплатно
                      </span>
                      <span className="text-white/20 group-hover:text-indigo-400 transition-colors">
                        ↗
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-xl group-hover:text-indigo-300 transition-colors mb-2 leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-white/45 leading-relaxed text-[15px] mb-6">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-white/[0.06]">
                        <div className="h-full w-[28%] bg-indigo-500/40 rounded-full" />
                      </div>
                      <span className="text-xs text-white/25">{course.lessons.length} уроков</span>
                    </div>
                  </Link>
                ))}
              </div>

              {courses.length > 4 && (
                <div className="mt-4 text-center">
                  <Link
                    href="/courses"
                    className="glass-dark text-white/40 hover:text-white border border-white/[0.07] px-7 py-3 rounded-xl text-sm font-medium transition-all inline-block"
                  >
                    Ещё {courses.length - 4} курса →
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Author ── */}
        <section className="py-24 bg-[#0b0b16]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center max-w-3xl mx-auto">

              <div className="flex justify-center sm:justify-start">
                <div className="relative w-60 h-72">
                  <img
                    src="/author.jpg"
                    alt="Максим Батов"
                    className="w-full h-full object-cover object-top rounded-2xl"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.07]" />
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-5">
                  Кто за этим стоит
                </p>
                <h2 className="text-2xl font-bold text-white mb-1">Максим Батов</h2>
                <p className="text-white/30 text-sm mb-6">Санкт-Петербург · Предприниматель</p>
                <div className="space-y-4 text-white/55 leading-relaxed">
                  <p>
                    Я не продаю мечту — я сам работаю с AI каждый день. Строю агентов,
                    тестирую инструменты, вижу что реально работает, а что нет.
                  </p>
                  <p>
                    На западе таких материалов много. На русском — почти нет.
                    Это я и решил исправить.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Reviews placeholder ── */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-4">
              Отзывы
            </p>
            <h2 className="text-2xl font-bold text-white mb-3">
              Используешь материалы в работе?
            </h2>
            <p className="text-white/40 mb-8 max-w-sm mx-auto leading-relaxed">
              Напиши нам в Telegram — опубликуем твой опыт здесь.
            </p>
            <Link
              href={TG_LINK}
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
            >
              Написать в Telegram →
            </Link>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="pb-28">
          <div className="max-w-5xl mx-auto px-6">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 gradient-bg opacity-90" />
              <div className="absolute inset-0 dot-grid opacity-20" />
              <div className="relative z-10 px-8 py-16 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Начни с бесплатного урока
                </h2>
                <p className="text-white/65 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                  Три урока в каждом курсе — без регистрации и без карты.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/courses/chatgpt-dlya-biznesa"
                    className="inline-block bg-white text-indigo-600 px-9 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-colors"
                  >
                    Открыть первый курс →
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-block bg-white/10 text-white border border-white/20 px-9 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-colors"
                  >
                    Смотреть тарифы
                  </Link>
                </div>
                <p className="mt-5 text-white/40 text-sm">
                  Без регистрации · Без карты · Первые 3 урока бесплатно
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
