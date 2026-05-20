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
    <div className="bg-[#080810] min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="max-w-3xl mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <nav className="text-sm text-white/30 mb-10 flex items-center gap-2">
            <Link href="/courses" className="hover:text-white/60 transition-colors">Курсы</Link>
            <span>·</span>
            <span className="text-white/50">{course.title}</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
            {course.title}
          </h1>
          <p className="text-white/40 text-lg leading-relaxed mb-12">
            {course.description}
          </p>

          <CourseProgress courseSlug={slug} lessons={course.lessons} />

          {/* Lessons */}
          <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-5">
            Содержание курса
          </p>
          <div className="divide-y divide-white/[0.05] glass-dark rounded-3xl overflow-hidden">
            {course.lessons.map((lesson, index) => (
              <div key={lesson.slug} className="flex items-center gap-4 px-6 py-5 group hover:bg-white/[0.02] transition-colors">
                <span className="text-sm text-white/20 w-6 shrink-0 font-mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  {lesson.free ? (
                    <Link
                      href={`/courses/${slug}/${lesson.slug}`}
                      className="font-medium text-white/80 group-hover:text-white transition-colors"
                    >
                      {lesson.title}
                    </Link>
                  ) : (
                    <span className="font-medium text-white/30">
                      {lesson.title}
                    </span>
                  )}
                  {lesson.description && (
                    <p className="text-sm text-white/25 mt-0.5 truncate">
                      {lesson.description}
                    </p>
                  )}
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full shrink-0 font-medium ${
                    lesson.free
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-white/[0.04] text-white/25 border border-white/[0.06]"
                  }`}
                >
                  {lesson.free ? "Бесплатно" : "🔒 Платно"}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 gradient-bg opacity-90" />
            <div className="absolute inset-0 dot-grid opacity-10" />
            <div className="relative z-10 p-8 text-center">
              <p className="text-white font-semibold text-lg mb-2">
                Хочешь доступ ко всем урокам?
              </p>
              <p className="text-white/70 mb-6 text-sm">
                Вступай в Telegram-клуб и открой весь курс.
              </p>
              <Link
                href="https://t.me/+0ip_wx4Y4pFkMTAy"
                className="inline-block bg-white text-indigo-600 px-7 py-3 rounded-2xl font-bold hover:bg-indigo-50 transition-colors shadow-xl"
              >
                Вступить в клуб
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
