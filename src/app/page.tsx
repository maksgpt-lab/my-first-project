import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCourses } from "@/lib/courses";

export default function Home() {
  const courses = getCourses();

  return (
    <div className="bg-[#0C0A08] min-h-screen">
      <Header />

      <main className="overflow-hidden">

        {/* ── Hero ── */}
        <section className="relative min-h-[90vh] flex items-center">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-600/25 to-transparent" />
            <div className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full bg-amber-700/7 blur-[150px]" />
            <div className="absolute top-1/2 -left-60 w-[400px] h-[400px] rounded-full bg-amber-900/6 blur-[120px]" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Left: copy */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-5 h-px bg-amber-600/60" />
                  <span className="text-amber-500/75 text-xs tracking-widest uppercase font-medium">
                    Курсы по ChatGPT · На русском
                  </span>
                </div>

                <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05] text-white mb-7">
                  Большинство<br />
                  курсов по ChatGPT<br />
                  написаны ChatGPT.{" "}
                  <span className="gradient-text">Этот&nbsp;— нет.</span>
                </h1>

                <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-sm">
                  Практика прямо в уроке. Применяешь пока читаешь — не потом. На русском, без кода.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-12">
                  <Link
                    href="/courses"
                    className="btn-glow text-white px-8 py-3.5 rounded-xl font-semibold text-center"
                  >
                    Начать бесплатно →
                  </Link>
                  <Link
                    href="/pricing"
                    className="text-white/50 hover:text-white px-8 py-3.5 rounded-xl font-medium transition-colors border border-white/[0.08] text-center"
                  >
                    Тарифы — от 990 ₽
                  </Link>
                </div>

                <div className="flex items-center border-t border-white/[0.06] pt-6">
                  <div className="pr-6">
                    <div className="text-amber-500 font-bold text-xl leading-none">6</div>
                    <div className="text-white/35 text-xs mt-1.5 uppercase tracking-wide">курсов</div>
                  </div>
                  <div className="w-px h-8 bg-white/[0.08] shrink-0" />
                  <div className="px-6">
                    <div className="text-amber-500 font-bold text-xl leading-none">30+</div>
                    <div className="text-white/35 text-xs mt-1.5 uppercase tracking-wide">промптов</div>
                  </div>
                  <div className="w-px h-8 bg-white/[0.08] shrink-0" />
                  <div className="pl-6">
                    <div className="text-amber-500 font-bold text-xl leading-none">3</div>
                    <div className="text-white/35 text-xs mt-1.5 uppercase tracking-wide">урока бесплатно</div>
                  </div>
                </div>
              </div>

              {/* Right: lesson preview */}
              <div className="hidden lg:flex flex-col">
                <div className="relative">
                  <div className="rounded-2xl overflow-hidden border border-white/[0.09] shadow-[0_0_80px_rgba(217,119,6,0.08)]">
                    <div className="bg-[#130E09] px-4 py-3 flex items-center gap-2 border-b border-white/[0.06]">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                      </div>
                      <div className="flex-1 mx-3">
                        <div className="bg-white/[0.04] rounded-md px-3 py-1 text-[11px] text-white/20 flex items-center justify-center gap-1.5">
                          <svg className="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          aidabusiness.ru/courses/…
                        </div>
                      </div>
                    </div>
                    <div className="aspect-video">
                      <img
                        src="/lesson-preview.png"
                        alt="Урок на платформе"
                        className="w-full h-full object-cover block"
                      />
                    </div>
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/8 to-orange-600/8 rounded-3xl blur-3xl -z-10" />
                </div>
                <p className="text-white/25 text-sm text-center mt-5">
                  Практика прямо в уроке — не нужно никуда переходить
                </p>
              </div>

            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0C0A08] to-transparent" />
        </section>

        {/* ── Courses ── */}
        {courses.length > 0 && (
          <section className="py-24">
            <div className="max-w-5xl mx-auto px-6">
              <div className="flex items-end justify-between mb-10">
                <div>
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
                      <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                        {course.lessons.filter((l) => l.free).length} урока бесплатно
                      </span>
                      <span className="text-white/20 group-hover:text-amber-500 transition-colors">
                        ↗
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-xl group-hover:text-amber-400 transition-colors mb-2 leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-white/45 leading-relaxed text-[15px] mb-6">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-white/[0.06]">
                        <div className="h-full w-[28%] bg-amber-500/40 rounded-full" />
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
        <section className="py-24 bg-[#100D0A]">
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
                <h2 className="text-2xl font-bold text-white mb-1">Максим Батов</h2>
                <p className="text-white/30 text-sm mb-6">Санкт-Петербург · Предприниматель</p>
                <div className="space-y-4 text-white/55 leading-relaxed">
                  <p>
                    У меня есть агент, который каждое утро читает мою почту и присылает
                    сводку: что срочно, что подождёт, что можно удалить. Папку «Входящие»
                    я не открывал уже несколько месяцев.
                  </p>
                  <p>
                    Я строю такие инструменты для себя — и точно знаю, что реально
                    работает, а что нет. На западе это уже норма. На русском материалов
                    почти нет, и разрыв только растёт. Это я и решил исправить.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 bg-[#100D0A]">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-12">
              Частые вопросы
            </h2>
            <div className="divide-y divide-white/[0.07]">
              {[
                {
                  q: "Нужен ли опыт с ChatGPT?",
                  a: "Нет. Первый курс начинается с нуля — объясняем как работает и как писать запросы, которые дают результат с первого раза.",
                },
                {
                  q: "Чем это лучше YouTube?",
                  a: "На YouTube нужно самому искать, фильтровать и пробовать. Здесь — структурированный путь и практика прямо в уроке.",
                },
                {
                  q: "Это теория или практика?",
                  a: "Каждый урок заканчивается заданием прямо здесь. Не нужно переключаться — практика встроена в процесс.",
                },
                {
                  q: "Нужно ли программирование?",
                  a: "Нет. Только браузер и ChatGPT. Все курсы рассчитаны на людей без технического background.",
                },
              ].map((item) => (
                <div key={item.q} className="py-7 grid grid-cols-1 sm:grid-cols-[2fr_3fr] gap-3 sm:gap-8">
                  <h3 className="font-semibold text-white text-[15px] leading-snug">{item.q}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
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
                    className="inline-block bg-white text-amber-800 px-9 py-4 rounded-2xl font-bold text-lg hover:bg-amber-50 transition-colors"
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
