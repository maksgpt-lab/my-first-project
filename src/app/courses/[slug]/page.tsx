import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseProgress from "@/components/CourseProgress";
import { getCourse, getCourses } from "@/lib/courses";

export async function generateStaticParams() {
  return getCourses().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  return {
    title: `${course.title} — AI для бизнеса`,
    description: course.description,
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="max-w-3xl mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-400 mb-8">
            <Link href="/courses" className="hover:text-gray-600">
              Курсы
            </Link>
            <span className="mx-2">→</span>
            <span className="text-gray-700">{course.title}</span>
          </nav>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {course.title}
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-12">
            {course.description}
          </p>

          <CourseProgress courseSlug={slug} lessons={course.lessons} />

          {/* Lessons */}
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Содержание курса
          </h2>
          <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
            {course.lessons.map((lesson, index) => (
              <div key={lesson.slug} className="flex items-center gap-4 p-5">
                <span className="text-sm text-gray-400 w-6 shrink-0">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  {lesson.free ? (
                    <Link
                      href={`/courses/${slug}/${lesson.slug}`}
                      className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {lesson.title}
                    </Link>
                  ) : (
                    <span className="font-medium text-gray-400">
                      {lesson.title}
                    </span>
                  )}
                  {lesson.description && (
                    <p className="text-sm text-gray-400 mt-0.5 truncate">
                      {lesson.description}
                    </p>
                  )}
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full shrink-0 ${
                    lesson.free
                      ? "bg-green-50 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {lesson.free ? "Бесплатно" : "Платно"}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 p-8 bg-blue-50 rounded-2xl text-center">
            <p className="text-gray-700 mb-4">
              Хочешь доступ ко всем урокам? Вступай в Telegram-клуб.
            </p>
            <Link
              href="#"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-500 transition-colors inline-block"
            >
              Вступить в клуб
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
