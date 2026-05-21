import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCourses } from "@/lib/courses";

export default function CoursesPage() {
  const courses = getCourses();

  return (
    <div className="bg-[#080810] min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-6 py-20">

          <div className="mb-16">
            <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-5">Все курсы</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              Учись зарабатывать
              <br />
              <span className="gradient-text">больше с AI</span>
            </h1>
            <p className="mt-5 text-white/40 text-lg max-w-xl leading-relaxed">
              Практические курсы по AI-инструментам для бизнеса — без программирования, на русском языке.
            </p>
          </div>

          {/* Learning path */}
          {courses.length > 1 && (() => {
            const pathMeta = [
              {
                level: "Уровень 1 · Основа",
                tag: "Начни здесь",
                points: ["Что такое ChatGPT и как он работает", "Формула правильного промпта", "Тексты, документы, клиенты, управление"],
              },
              {
                level: "Уровень 2 · Мастерство",
                tag: "Мастерство промптов",
                points: ["Chain-of-Thought и мега-промпты", "Ролевые модели под твой бизнес", "Анализ данных и личная система"],
              },
              {
                level: "Уровень 3 · Маркетинг",
                tag: "Привлечение клиентов",
                points: ["Контент-план на месяц за 20 минут", "Продающие тексты по формулам AIDA/PAS", "Email-маркетинг и рекламные объявления"],
              },
              {
                level: "Уровень 4 · Продажи",
                tag: "Закрытие сделок",
                points: ["Скрипты продаж под любую ситуацию", "Работа с возражениями: дорого, подумаю", "Квалификация лидов и персональные КП"],
              },
              {
                level: "Уровень 5 · Операционка",
                tag: "Освободи время",
                points: ["Регламенты и инструкции за 15 минут", "Делегирование и найм с AI", "Отчёты и аналитика без аналитика"],
              },
              {
                level: "Уровень 6 · Финал",
                tag: "Твоя AI-система",
                points: ["Аудит: где AI даёт максимум именно тебе", "Библиотека промптов под твой бизнес", "Финальный проект: запуск AI-системы"],
              },
            ];
            return (
              <div className="mb-14">
                <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-6">
                  Рекомендуемый порядок изучения
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses.map((course, i) => {
                    const meta = pathMeta[i];
                    return (
                      <Link
                        key={course.slug}
                        href={`/courses/${course.slug}`}
                        className="glass-dark rounded-2xl p-6 border border-white/[0.07] hover:border-indigo-500/30 transition-all group flex flex-col gap-4"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-3xl font-bold gradient-text leading-none">{i + 1}</span>
                          <span className="text-[10px] font-semibold text-indigo-400/70 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                            {meta?.tag}
                          </span>
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-1.5">
                            {meta?.level}
                          </div>
                          <div className="text-base font-bold text-white/90 group-hover:text-white transition-colors leading-snug">
                            {course.title}
                          </div>
                        </div>
                        <ul className="space-y-1.5 flex-1">
                          {meta?.points.map((point) => (
                            <li key={point} className="flex items-start gap-2 text-xs text-white/35 leading-relaxed">
                              <span className="text-indigo-500/50 mt-0.5 shrink-0">✦</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                          <span className="text-xs text-white/20">{course.lessons.length} уроков</span>
                          <span className="text-xs text-indigo-400/60 group-hover:text-indigo-400 transition-colors">
                            Открыть →
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-5 relative overflow-hidden glass-dark rounded-2xl p-5 border border-indigo-500/20">
                  <div className="absolute left-0 top-0 bottom-0 w-1 gradient-bg" />
                  <div className="pl-4">
                    <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-2">Результат после всех 6 курсов</p>
                    <p className="text-sm text-white/50 leading-relaxed">
                      У тебя работает AI-система для бизнеса: маркетинг привлекает клиентов, продажи закрывают сделки, операционка работает без твоего постоянного участия — ты управляешь стратегией, а не тонешь в рутине.
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}

          {courses.length === 0 ? (
            <p className="text-white/30">Курсы скоро появятся.</p>
          ) : (
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
                  <h2 className="font-bold text-white text-xl group-hover:gradient-text transition-all mb-3 leading-snug">
                    {course.title}
                  </h2>
                  <p className="text-white/40 leading-relaxed text-[15px] mb-7">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-white/[0.06] rounded-full overflow-hidden">
                      <div className="h-full w-[28%] gradient-bg opacity-70" />
                    </div>
                    <span className="text-xs text-white/25">{course.lessons.length} уроков</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
