import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCourses } from "@/lib/courses";

export default function ClubPage() {
  const courses = getCourses();
  const coursesWithPaid = courses.filter((c) =>
    c.lessons.some((l) => !l.free)
  );

  return (
    <div className="bg-[#080810] min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="max-w-4xl mx-auto px-6 py-20">
          {/* Header */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1 rounded-full">
                Клуб
              </span>
              <span className="text-white/20 text-sm">Закрытый доступ</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-5">
              Добро пожаловать
              <br />
              <span className="gradient-text">в клуб</span>
            </h1>
            <p className="text-white/40 text-lg leading-relaxed max-w-xl">
              Здесь собраны все платные уроки. Изучай в любом порядке — каждый урок самодостаточен.
            </p>
          </div>

          {/* Courses */}
          <div className="space-y-8">
            {coursesWithPaid.map((course) => {
              const paidLessons = course.lessons.filter((l) => !l.free);
              const freeLessons = course.lessons.filter((l) => l.free);

              return (
                <div
                  key={course.slug}
                  className="glass-dark rounded-3xl border border-white/[0.07] overflow-hidden"
                >
                  {/* Course header */}
                  <div className="px-8 py-7 border-b border-white/[0.06]">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold text-white mb-1">
                          {course.title}
                        </h2>
                        <p className="text-sm text-white/35">{course.description}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="text-2xl font-bold text-white">
                          {paidLessons.length}
                        </div>
                        <div className="text-xs text-white/25">платных уроков</div>
                      </div>
                    </div>
                  </div>

                  {/* Paid lessons */}
                  <div className="divide-y divide-white/[0.04]">
                    {paidLessons.map((lesson, i) => (
                      <Link
                        key={lesson.slug}
                        href={`/club/${course.slug}/${lesson.slug}`}
                        className="flex items-center gap-5 px-8 py-5 hover:bg-white/[0.03] transition-colors group"
                      >
                        <span className="text-xs font-mono text-indigo-500/40 w-6 shrink-0">
                          {String(freeLessons.length + i + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-white/70 group-hover:text-white transition-colors truncate">
                            {lesson.title}
                          </div>
                          {lesson.description && (
                            <div className="text-xs text-white/25 mt-0.5 truncate">
                              {lesson.description}
                            </div>
                          )}
                        </div>
                        <span className="text-white/20 group-hover:text-indigo-400 transition-colors text-sm shrink-0">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* Free lessons link */}
                  {freeLessons.length > 0 && (
                    <div className="px-8 py-4 bg-white/[0.02] border-t border-white/[0.04]">
                      <Link
                        href={`/courses/${course.slug}`}
                        className="text-xs text-white/25 hover:text-white/50 transition-colors"
                      >
                        + {freeLessons.length} бесплатных уроков в открытом доступе →
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Agent CTA */}
          <div className="mt-14">
            <Link
              href="/club/agent"
              className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white/[0.03] hover:bg-white/[0.05] border border-indigo-500/20 hover:border-indigo-500/40 rounded-3xl p-8 transition-all"
            >
              <div className="absolute inset-0 rounded-3xl bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Новинка</span>
                  </span>
                </div>
                <p className="text-white font-semibold text-lg mb-1.5">
                  AI-консультант по твоему бизнесу
                </p>
                <p className="text-white/40 text-sm leading-relaxed max-w-md">
                  Задаёт правильные вопросы, находит точки автоматизации и даёт готовые промпты под твою ситуацию. Не общие советы — конкретный разбор.
                </p>
              </div>
              <span className="relative z-10 shrink-0 text-indigo-400 group-hover:text-indigo-300 transition-colors text-2xl">
                →
              </span>
            </Link>
          </div>

          {/* Telegram CTA */}
          <div className="mt-6 relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 gradient-bg opacity-80" />
            <div className="absolute inset-0 dot-grid opacity-10" />
            <div className="relative z-10 p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-white font-semibold text-lg mb-1">
                  Остались вопросы по урокам?
                </p>
                <p className="text-white/60 text-sm">
                  Задавай в нашем Telegram-клубе — разбираем вместе.
                </p>
              </div>
              <Link
                href="https://t.me/+0ip_wx4Y4pFkMTAy"
                className="shrink-0 bg-white text-indigo-600 px-6 py-3 rounded-2xl font-bold hover:bg-indigo-50 transition-colors shadow-xl text-sm"
              >
                Перейти в Telegram →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
