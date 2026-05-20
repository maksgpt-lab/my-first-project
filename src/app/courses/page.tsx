import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCourses } from "@/lib/courses";

export default function CoursesPage() {
  const courses = getCourses();

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="mb-14">
            <span className="text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full">
              Все курсы
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
              Учись зарабатывать
              <br />
              <span className="gradient-text">больше с AI</span>
            </h1>
            <p className="mt-4 text-gray-400 text-lg max-w-xl">
              Практические курсы по AI-инструментам для бизнеса — без программирования, на русском языке.
            </p>
          </div>

          {courses.length === 0 ? (
            <p className="text-gray-400">Курсы скоро появятся.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {courses.map((course) => (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="card-hover group border border-gray-100 bg-white rounded-3xl p-8 block"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                      {course.lessons.filter((l) => l.free).length} урока бесплатно
                    </span>
                    <span className="text-gray-300 group-hover:text-indigo-400 transition-colors text-xl">→</span>
                  </div>
                  <h2 className="font-bold text-gray-900 text-xl group-hover:text-indigo-600 transition-colors mb-3">
                    {course.title}
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-6">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                      <div className="h-full w-[28%] gradient-bg rounded-full" />
                    </div>
                    <span className="text-xs text-gray-400 shrink-0">{course.lessons.length} уроков</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
