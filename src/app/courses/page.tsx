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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Курсы</h1>
          <p className="text-gray-500 mb-12 text-lg">
            Практические курсы по AI-инструментам для бизнеса — без программирования.
          </p>

          {courses.length === 0 ? (
            <p className="text-gray-400">Курсы скоро появятся.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {courses.map((course) => (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="border border-gray-100 rounded-2xl p-8 hover:border-blue-200 hover:shadow-md transition-all group"
                >
                  <h2 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 text-lg">
                    {course.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {course.lessons.length} уроков ·{" "}
                      {course.lessons.filter((l) => l.free).length} бесплатно
                    </span>
                    <span className="text-blue-600 text-sm font-medium">
                      Начать →
                    </span>
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
