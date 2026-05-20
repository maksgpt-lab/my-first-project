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
