import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCourses } from "@/lib/courses";
import { getGuides } from "@/lib/guides";


const painPoints = [
  {
    icon: "⏳",
    title: "Рутина съедает день",
    text: "Одни и те же тексты, письма, объяснения сотрудникам — снова и снова. На стратегию времени не остаётся.",
  },
  {
    icon: "😵",
    title: "Слышал про AI — не знаешь с чего начать",
    text: "Все вокруг говорят ChatGPT, но обучение либо на английском, либо для программистов. Непонятно как применить к своему бизнесу.",
  },
  {
    icon: "📉",
    title: "Конкуренты двигаются быстрее",
    text: "Пока ты тратишь часы на задачи, другие делают их за минуты. Разрыв растёт с каждым месяцем.",
  },
];

const steps = [
  {
    num: "01",
    title: "Выбери курс и открой первый урок",
    text: "Три урока в каждом курсе — бесплатно. Никакой регистрации. Начни прямо сейчас.",
  },
  {
    num: "02",
    title: "Сделай задание в ChatGPT",
    text: "Каждый урок заканчивается практикой: копируешь промпт, подставляешь свои данные, получаешь результат.",
  },
  {
    num: "03",
    title: "Применяй в бизнесе с завтрашнего утра",
    text: "Скрипт, пост, регламент или КП — готовый инструмент, который работает уже сегодня.",
  },
];

const stats = [
  { value: "1 вечер", label: "до первого рабочего результата" },
  { value: "6 курсов", label: "полная программа от основ до системы" },
  { value: "3 урока", label: "бесплатно в каждом курсе" },
];

export default function Home() {
  const courses = getCourses();
  const guides = getGuides().slice(0, 3);

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
                Практические материалы по AI · На русском · Без кода
              </span>
            </div>

            <h1 className="animate-fade-up-d1 text-4xl sm:text-6xl lg:text-[80px] font-bold tracking-tight leading-[1.05] text-white">
              Первый рабочий
              <br />
              <span className="gradient-text">AI-инструмент — за вечер</span>
            </h1>

            <p className="animate-fade-up-d2 mt-8 text-base sm:text-2xl text-white/40 max-w-2xl mx-auto leading-relaxed font-light">
              Практические материалы для предпринимателей, маркетологов и руководителей.
              Открываешь модуль, применяешь промпт в ChatGPT — и уже сегодня экономишь время.
            </p>

            <div className="animate-fade-up-d3 mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="btn-glow text-white px-9 py-4 rounded-2xl text-lg font-bold"
              >
                Начать бесплатно →
              </Link>
              <Link
                href="/pricing"
                className="glass-dark text-white/70 hover:text-white px-9 py-4 rounded-2xl text-lg font-medium transition-colors"
              >
                Смотреть тарифы
              </Link>
            </div>

            <p className="animate-fade-up-d3 mt-4 text-sm text-white/25">
              Первые 3 урока в каждом курсе — бесплатно. Без регистрации.
            </p>

            {/* Stats */}
            <div className="animate-fade-up-d4 mt-20 grid grid-cols-3 gap-3 max-w-2xl mx-auto">
              {stats.map((s) => (
                <div key={s.label} className="glass-dark rounded-2xl px-3 py-4 sm:px-5 sm:py-5">
                  <div className="text-lg sm:text-2xl font-bold gradient-text">{s.value}</div>
                  <div className="text-[10px] sm:text-xs text-white/35 mt-1.5 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* bottom fade */}
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#080810] to-transparent" />
        </section>

        {/* ── Pain points ── */}
        <section className="bg-[#080810] py-28">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-4">Узнаёшь себя?</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Это мешает тебе расти прямо сейчас
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {painPoints.map((p) => (
                <div key={p.title} className="glass-dark rounded-3xl p-8 border border-white/[0.07]">
                  <div className="text-3xl mb-5">{p.icon}</div>
                  <h3 className="font-bold text-white text-lg mb-3">{p.title}</h3>
                  <p className="text-white/40 leading-relaxed text-[15px]">{p.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 relative overflow-hidden glass-dark rounded-2xl p-6 border border-indigo-500/20">
              <div className="absolute left-0 top-0 bottom-0 w-1 gradient-bg" />
              <div className="pl-5">
                <p className="text-white/70 text-base leading-relaxed">
                  <span className="text-white font-semibold">ChatGPT решает всё это.</span>{" "}
                  Но только если знаешь как правильно его попросить. Именно этому учат наши курсы — конкретным промптам под конкретные задачи твоего бизнеса.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="bg-[#080810] pb-28">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-4">Как это работает</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Три шага до первого результата
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {steps.map((s, i) => (
                <div key={s.num} className="relative">
                  <div className="glass-dark rounded-3xl p-8 border border-white/[0.07] h-full">
                    <div className="text-xs font-mono text-indigo-500/60 mb-5 tracking-widest">{s.num}</div>
                    <h3 className="font-bold text-white text-lg mb-3 leading-snug">{s.title}</h3>
                    <p className="text-white/40 leading-relaxed text-[15px]">{s.text}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full glass-dark border border-white/10 items-center justify-center">
                      <span className="text-white/30 text-xs">→</span>
                    </div>
                  )}
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
                  <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-3">6 курсов</p>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white">От основ до своей AI-системы</h2>
                  <p className="text-white/35 mt-3 text-base max-w-md">
                    Проходи по порядку — каждый курс строится на предыдущем.
                  </p>
                </div>
                <Link href="/courses" className="text-white/30 hover:text-white transition-colors text-sm font-medium hidden sm:block">
                  Все курсы →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {courses.slice(0, 4).map((course) => (
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
              {courses.length > 4 && (
                <div className="mt-5 text-center">
                  <Link
                    href="/courses"
                    className="inline-block glass-dark text-white/50 hover:text-white border border-white/[0.07] hover:border-white/20 px-8 py-3 rounded-2xl text-sm font-medium transition-all"
                  >
                    Ещё {courses.length - 4} курса →
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}


        {/* ── For professions ── */}
        <section className="bg-[#080810] pb-28">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-4">Для вашей профессии</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                ChatGPT решает задачи именно вашей роли
              </h2>
              <p className="text-white/35 mt-4 text-base max-w-lg mx-auto">
                Готовые промпты и курсы под конкретные задачи — без воды и лишней теории.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { slug: "marketolog", label: "Маркетолог", icon: "📣", text: "Контент-план, тексты, реклама, email-кампании" },
                { slug: "rukovoditel", label: "Руководитель", icon: "🎯", text: "Регламенты, найм, аналитика, делегирование" },
                { slug: "prodazhi", label: "Отдел продаж", icon: "💼", text: "Скрипты, возражения, КП, реактивация клиентов" },
                { slug: "hr", label: "HR", icon: "👥", text: "Вакансии, интервью, онбординг новых сотрудников" },
                { slug: "buhgalter", label: "Бухгалтер", icon: "📊", text: "Деловые письма, документы, объяснительные" },
              ].map((p) => (
                <Link
                  key={p.slug}
                  href={`/for/${p.slug}`}
                  className="glass-dark rounded-2xl p-6 border border-white/[0.07] hover:border-indigo-500/30 transition-all group flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{p.icon}</span>
                    <span className="text-white/20 group-hover:text-indigo-400 transition-colors">→</span>
                  </div>
                  <div>
                    <div className="font-bold text-white group-hover:text-indigo-300 transition-colors mb-1">{p.label}</div>
                    <div className="text-sm text-white/35 leading-relaxed">{p.text}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Benefits ── */}
        <section className="bg-[#080810] pb-28">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-4">Почему здесь</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Не просто смотришь — сразу делаешь
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                {
                  num: "01",
                  title: "Практика с первого урока",
                  text: "Каждый урок заканчивается заданием. Копируешь промпт, подставляешь свои данные — и получаешь готовый результат для бизнеса.",
                },
                {
                  num: "02",
                  title: "На русском, без кода",
                  text: "Никаких технических барьеров. Только ChatGPT, твой браузер и задачи которые ты уже делаешь каждый день.",
                },
                {
                  num: "03",
                  title: "Полная программа с результатом",
                  text: "6 курсов выстроены в логику: проходишь по порядку — и к финалу у тебя работающая AI-система для бизнеса.",
                },
              ].map((b) => (
                <div
                  key={b.title}
                  className="card-hover gradient-border glass-dark rounded-3xl p-8"
                >
                  <div className="text-xs font-mono text-indigo-500/60 mb-5 tracking-widest">{b.num}</div>
                  <h3 className="font-bold text-white text-lg mb-3">{b.title}</h3>
                  <p className="text-white/40 leading-relaxed text-[15px]">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Prompts teaser ── */}
        <section className="bg-[#080810] pb-28">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-3">Бесплатно прямо сейчас</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white">30 готовых промптов</h2>
                <p className="text-white/35 mt-3 text-base max-w-md">
                  Скопируй, подставь свои данные — и получи результат за 30 секунд.
                </p>
              </div>
              <Link href="/prompts" className="text-white/30 hover:text-white transition-colors text-sm font-medium hidden sm:block shrink-0">
                Вся библиотека →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { cat: "Тексты", title: "Пост для Telegram" },
                { cat: "Продажи", title: "Холодное письмо клиенту" },
                { cat: "HR", title: "Вакансия которую читают" },
                { cat: "Маркетинг", title: "Контент-план на месяц" },
                { cat: "Аналитика", title: "Анализ конкурентов" },
                { cat: "Управление", title: "Регламент за 10 минут" },
              ].map((p) => (
                <Link
                  key={p.title}
                  href="/prompts"
                  className="glass-dark rounded-2xl p-5 hover:border-indigo-500/30 border border-white/[0.07] transition-all group"
                >
                  <div className="text-[10px] font-mono text-indigo-500/50 mb-2">{p.cat}</div>
                  <div className="text-sm font-medium text-white/60 group-hover:text-white transition-colors leading-snug">
                    {p.title}
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center sm:hidden">
              <Link href="/prompts" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                Все 30 промптов →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Guides ── */}
        {guides.length > 0 && (
          <section className="bg-[#080810] pb-28">
            <div className="max-w-5xl mx-auto px-6">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-3">Бесплатно</p>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white">Читай и применяй</h2>
                </div>
                <Link href="/guides" className="text-white/30 hover:text-white transition-colors text-sm font-medium hidden sm:block">
                  Все гайды →
                </Link>
              </div>
              <div className="divide-y divide-white/[0.05] glass-dark rounded-3xl overflow-hidden">
                {guides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="flex items-center gap-5 px-7 py-5 group hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white/70 group-hover:text-white transition-colors truncate">
                        {guide.title}
                      </p>
                      <p className="text-sm text-white/25 mt-0.5 truncate">{guide.description}</p>
                    </div>
                    <span className="text-white/20 group-hover:text-indigo-400 transition-colors shrink-0">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Final CTA ── */}
        <section className="bg-[#080810] pb-28">
          <div className="max-w-5xl mx-auto px-6">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 gradient-bg opacity-90" />
              <div className="absolute inset-0 dot-grid opacity-20" />
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
              <div className="relative z-10 px-8 py-20 text-center">
                <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-4">Начни сегодня</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Первый урок — бесплатно.<br />Первый результат — сегодня вечером.
                </h2>
                <p className="text-white/70 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                  Открой первый курс, сделай задание — и уже завтра утром у тебя есть инструмент который экономит время каждый день.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/courses/chatgpt-dlya-biznesa"
                    className="inline-block bg-white text-indigo-600 px-9 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-colors shadow-2xl"
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
                <p className="mt-5 text-white/40 text-sm">Без регистрации · Без карты · Первые 3 урока бесплатно</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
