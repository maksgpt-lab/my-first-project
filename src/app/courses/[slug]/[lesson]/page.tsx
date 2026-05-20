import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LessonProgressButton from "@/components/LessonProgress";
import { getCourse, getCourses, getLessonContent } from "@/lib/courses";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lesson: string }>;
}): Promise<Metadata> {
  const { slug, lesson: lessonSlug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  const lesson = course.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return {};
  return {
    title: `${lesson.title} — ${course.title} — AI для бизнеса`,
    description: lesson.description,
  };
}

export async function generateStaticParams() {
  const params = [];
  for (const course of getCourses()) {
    for (const lesson of course.lessons) {
      params.push({ slug: course.slug, lesson: lesson.slug });
    }
  }
  return params;
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lesson: string }>;
}) {
  const { slug, lesson: lessonSlug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const lessonMeta = course.lessons.find((l) => l.slug === lessonSlug);
  if (!lessonMeta) notFound();

  if (!lessonMeta.free) notFound();

  const lessonData = getLessonContent(slug, lessonSlug);
  if (!lessonData) notFound();

  const currentIndex = course.lessons.findIndex((l) => l.slug === lessonSlug);
  const prevLesson = course.lessons[currentIndex - 1];
  const nextLesson = course.lessons[currentIndex + 1];

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
            <Link href={`/courses/${slug}`} className="hover:text-gray-600">
              {course.title}
            </Link>
            <span className="mx-2">→</span>
            <span className="text-gray-700">{lessonMeta.title}</span>
          </nav>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs bg-green-50 text-green-600 px-2.5 py-1 rounded-full">
              Бесплатный урок
            </span>
            {lessonData.data.updatedAt && (
              <span className="text-xs text-gray-400">
                Обновлено: {String(lessonData.data.updatedAt)}
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-10">
            {lessonMeta.title}
          </h1>

          {/* Content */}
          <article
            className="prose prose-gray max-w-none
              prose-headings:font-semibold prose-headings:text-gray-900
              prose-p:text-gray-600 prose-p:leading-relaxed
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-blockquote:border-blue-400 prose-blockquote:text-gray-500
              prose-li:text-gray-600"
            dangerouslySetInnerHTML={{ __html: await markdownToHtml(lessonData.content) }}
          />

          {/* Progress button */}
          <div className="mt-12 flex justify-center">
            <LessonProgressButton lessonId={`${slug}/${lessonSlug}`} />
          </div>

          {/* Navigation */}
          <div className="mt-8 pt-8 border-t border-gray-100 flex justify-between gap-4">
            {prevLesson && prevLesson.free ? (
              <Link
                href={`/courses/${slug}/${prevLesson.slug}`}
                className="flex-1 p-4 border border-gray-100 rounded-xl hover:border-blue-200 transition-colors"
              >
                <div className="text-xs text-gray-400 mb-1">← Предыдущий</div>
                <div className="text-sm font-medium text-gray-700">
                  {prevLesson.title}
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextLesson ? (
              nextLesson.free ? (
                <Link
                  href={`/courses/${slug}/${nextLesson.slug}`}
                  className="flex-1 p-4 border border-gray-100 rounded-xl hover:border-blue-200 transition-colors text-right"
                >
                  <div className="text-xs text-gray-400 mb-1">Следующий →</div>
                  <div className="text-sm font-medium text-gray-700">
                    {nextLesson.title}
                  </div>
                </Link>
              ) : (
                <div className="flex-1 p-4 bg-blue-50 rounded-xl text-right">
                  <div className="text-xs text-gray-400 mb-1">Следующий →</div>
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    {nextLesson.title}
                  </div>
                  <Link
                    href="#"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Открыть в клубе
                  </Link>
                </div>
              )
            ) : null}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

async function markdownToHtml(markdown: string): Promise<string> {
  const { remark } = await import("remark");
  const { default: html } = await import("remark-html");
  const result = await remark().use(html).process(markdown);
  return result.toString();
}
