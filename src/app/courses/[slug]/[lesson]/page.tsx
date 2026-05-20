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
            <span className="text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-full">
              ✦ Бесплатный урок
            </span>
            {lessonData.data.updatedAt && (
              <span className="text-xs text-gray-400">
                Обновлено: {String(lessonData.data.updatedAt)}
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-10 leading-tight">
            {lessonMeta.title}
          </h1>

          {/* Content */}
          <article
            className="prose prose-lg prose-gray max-w-none
              prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-p:text-gray-600 prose-p:leading-[1.8] prose-p:text-[17px]
              prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-code:bg-indigo-50 prose-code:text-indigo-700 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-lg prose-code:text-sm prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
              prose-blockquote:border-l-4 prose-blockquote:border-indigo-400 prose-blockquote:bg-indigo-50/50 prose-blockquote:rounded-r-xl prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:not-italic
              prose-blockquote:text-gray-700 prose-blockquote:font-medium
              prose-li:text-gray-600 prose-li:leading-relaxed
              prose-ul:space-y-2 prose-ol:space-y-2
              prose-hr:border-gray-100"
            dangerouslySetInnerHTML={{ __html: await markdownToHtml(lessonData.content) }}
          />

          {/* Progress button */}
          <div className="mt-14 flex justify-center">
            <LessonProgressButton lessonId={`${slug}/${lessonSlug}`} />
          </div>

          {/* Navigation */}
          <div className="mt-10 pt-8 border-t border-gray-100 flex justify-between gap-4">
            {prevLesson && prevLesson.free ? (
              <Link
                href={`/courses/${slug}/${prevLesson.slug}`}
                className="flex-1 p-5 border border-gray-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group"
              >
                <div className="text-xs text-gray-400 mb-1.5 group-hover:text-indigo-400 transition-colors">← Предыдущий</div>
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
                  className="flex-1 p-5 border border-gray-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-all text-right group"
                >
                  <div className="text-xs text-gray-400 mb-1.5 group-hover:text-indigo-400 transition-colors">Следующий →</div>
                  <div className="text-sm font-medium text-gray-700">
                    {nextLesson.title}
                  </div>
                </Link>
              ) : (
                <div className="flex-1 p-5 bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl text-right">
                  <div className="text-xs text-indigo-400 mb-1.5">Следующий →</div>
                  <div className="text-sm font-semibold text-gray-700 mb-3">
                    {nextLesson.title}
                  </div>
                  <Link
                    href="https://t.me/+0ip_wx4Y4pFkMTAy"
                    className="text-xs text-indigo-600 font-medium hover:underline"
                  >
                    Открыть в клубе →
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
