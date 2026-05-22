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

        {/* ── Разрыв ── */}
        <section className="py-28 border-t border-white/[0.05]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                  Почему большинство<br />курсов по ChatGPT<br />не работают
                </h2>
                <p className="text-white/35 mt-5 text-base leading-relaxed max-w-xs">
                  И что мы сделали иначе.
                </p>
              </div>
              <div className="divide-y divide-white/[0.06]">
                {[
                  {
                    problem: "Смотришь видео — ничего не делаешь",
                    fix: "Практика встроена в каждый урок. Промпт — прямо здесь.",
                  },
                  {
                    problem: "Нет структуры — сам ищи, сам пробуй",
                    fix: "6 курсов от основ до системы. Идёшь по пути.",
                  },
                  {
                    problem: "Написано ИИ — нет реального опыта",
                    fix: "Автор сам строит AI-агентов. Только то, что работает.",
                  },
                ].map((item) => (
                  <div key={item.problem} className="py-6 grid grid-cols-2 gap-6">
                    <p className="text-white/30 text-sm leading-relaxed line-through decoration-white/15">
                      {item.problem}
                    </p>
                    <p className="text-white/65 text-sm leading-relaxed">
                      <span className="text-amber-500 mr-1.5">→</span>
                      {item.fix}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Как это устроено ── */}
        <section className="py-24 bg-[#100D0A]">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-16">
              Как это устроено
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              {[
                {
                  n: "01",
                  title: "Читаешь, не смотришь",
                  body: "Текстовые уроки — в своём темпе, без перемотки, в любое время.",
                },
                {
                  n: "02",
                  title: "Практикуешься сразу",
                  body: "Промпт прямо в уроке. Открываешь ChatGPT рядом — и применяешь пока тема свежая.",
                },
                {
                  n: "03",
                  title: "Один урок — один навык",
                  body: "Каждый урок даёт что-то конкретное. Не теорию — инструмент, который используешь сегодня.",
                },
              ].map((step) => (
                <div key={step.n}>
                  <div className="text-6xl font-bold text-white/[0.05] mb-5 leading-none tabular-nums">
                    {step.n}
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-3">{step.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Courses ── */}
        {courses.length > 0 && (
          <section className="py-24">
            <div className="max-w-5xl mx-auto px-6">
              <div className="flex items-end justify-between mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Программа
                </h2>
                <Link
                  href="/courses"
                  className="text-white/30 hover:text-white transition-colors text-sm font-medium hidden sm:block shrink-0"
                >
                  Все курсы →
                </Link>
              </div>

              <div className="divide-y divide-white/[0.06]">
                {courses.slice(0, 6).map((course, i) => (
                  <Link
                    key={course.slug}
                    href={`/courses/${course.slug}`}
                    className="group flex items-center gap-6 py-6 hover:bg-white/[0.02] -mx-4 px-4 rounded-xl transition-colors"
                  >
                    <span className="text-3xl font-bold text-white/[0.07] tabular-nums w-10 shrink-0 group-hover:text-white/[0.12] transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-lg group-hover:text-amber-400 transition-colors mb-1 leading-snug">
                        {course.title}
                      </h3>
                      <p className="text-white/35 text-sm leading-relaxed truncate">
                        {course.description}
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center gap-4">
                      <span className="text-white/20 text-xs hidden sm:block">
                        {course.lessons.length} уроков
                      </span>
                      {course.lessons.filter((l) => l.free).length > 0 && (
                        <span className="text-xs text-amber-500/70 bg-amber-500/8 border border-amber-500/15 px-2.5 py-1 rounded-full hidden sm:block">
                          {course.lessons.filter((l) => l.free).length} бесплатно
                        </span>
                      )}
                      <span className="text-white/20 group-hover:text-amber-500 transition-colors text-lg">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Author ── */}
        <section className="py-24 bg-[#100D0A] border-t border-white/[0.04]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20 items-start">

              <div className="flex justify-center lg:justify-start">
                <div className="relative w-56 h-64 lg:w-full lg:h-80">
                  <img
                    src="/author.jpg"
                    alt="Максим Батов"
                    className="w-full h-full object-cover object-top rounded-2xl grayscale-[15%]"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.07]" />
                </div>
              </div>

              <div className="lg:pt-2">
                <h2 className="text-2xl font-bold text-white mb-1">Максим Батов</h2>
                <p className="text-white/25 text-sm mb-8">Санкт-Петербург · Предприниматель</p>

                <blockquote className="border-l-2 border-amber-600/50 pl-5 mb-8">
                  <p className="text-white/70 text-lg leading-relaxed italic">
                    "У меня есть агент, который каждое утро читает мою почту и присылает сводку:
                    что срочно, что подождёт, что удалить. Папку «Входящие» я не открывал уже несколько месяцев."
                  </p>
                </blockquote>

                <p className="text-white/45 text-[15px] leading-relaxed max-w-lg">
                  Я строю такие инструменты для себя — и точно знаю, что реально работает, а что нет.
                  На западе это уже норма. На русском материалов почти нет, и разрыв только растёт.
                  Это я и решил исправить.
                </p>
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
        <section className="py-28 border-t border-white/[0.05]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-amber-500/70 text-xs tracking-widest uppercase font-medium mb-6">
              Начать прямо сейчас
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-5 leading-tight">
              Три урока — бесплатно.<br />Без регистрации.
            </h2>
            <p className="text-white/40 text-lg mb-10 max-w-sm mx-auto leading-relaxed">
              Открой первый курс и реши сам — подходит или нет.
            </p>
            <Link
              href="/courses/chatgpt-dlya-biznesa"
              className="btn-glow text-white px-10 py-4 rounded-xl font-semibold text-lg inline-block"
            >
              Открыть первый курс →
            </Link>
            <p className="mt-6 text-white/20 text-sm">
              Без карты · Первые 3 урока в каждом курсе бесплатно
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
