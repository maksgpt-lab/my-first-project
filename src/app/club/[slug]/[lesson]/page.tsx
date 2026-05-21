import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LessonProgressButton from "@/components/LessonProgress";
import CopyPromptButtons from "@/components/CopyPromptButtons";
import PracticeWidget from "@/components/PracticeWidget";
import { getCourse, getLessonContent } from "@/lib/courses";

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
    title: `${lesson.title} — ${course.title}`,
    description: lesson.description,
  };
}

export default async function ClubLessonPage({
  params,
}: {
  params: Promise<{ slug: string; lesson: string }>;
}) {
  const { slug, lesson: lessonSlug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const lessonMeta = course.lessons.find((l) => l.slug === lessonSlug);
  if (!lessonMeta) notFound();

  const lessonData = getLessonContent(slug, lessonSlug);
  if (!lessonData) notFound();

  const currentIndex = course.lessons.findIndex((l) => l.slug === lessonSlug);
  const prevLesson = course.lessons[currentIndex - 1];
  const nextLesson = course.lessons[currentIndex + 1];

  const { remark } = await import("remark");
  const { default: html } = await import("remark-html");
  const result = await remark().use(html).process(lessonData.content);
  const contentHtml = result.toString();

  const wordCount = lessonData.content.split(/\s+/).length;
  const readMinutes = Math.max(1, Math.round(wordCount / 200));

  return (
    <div className="bg-[#080810] min-h-screen flex flex-col">
      <Header />

      {/* ── Dark header ── */}
      <div className="bg-[#080810] border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6 pt-10 pb-12">
          <nav className="text-sm text-white/25 mb-8 flex items-center gap-2 flex-wrap">
            <Link href="/courses" className="hover:text-white/50 transition-colors">Курсы</Link>
            <span>·</span>
            <Link href={`/courses/${slug}`} className="hover:text-white/50 transition-colors">{course.title}</Link>
            <span>·</span>
            <span className="text-white/40">Урок {currentIndex + 1}</span>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1 rounded-full">
              Клуб
            </span>
            <span className="text-xs text-white/20">{readMinutes} мин чтения</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight">
            {lessonMeta.title}
          </h1>
        </div>
      </div>

      {/* ── Reading area ── */}
      <main className="flex-1 bg-[#080810] relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-indigo-600/5 blur-[100px]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 py-14">
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-3xl px-8 sm:px-12 py-12">
            <article
              className="lesson-article prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-5
                prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-3
                prose-p:text-gray-300 prose-p:leading-[1.9] prose-p:text-[17px]
                prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white prose-strong:font-semibold
                prose-code:bg-indigo-500/15 prose-code:text-indigo-300 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-[#0d0f1e] prose-pre:border prose-pre:border-white/10
                prose-li:text-gray-300 prose-li:leading-relaxed
                prose-ul:space-y-2 prose-ol:space-y-2
                prose-hr:border-white/10 prose-hr:my-10"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>

          <CopyPromptButtons />

          <PracticeWidget />

          <div className="mt-10 flex justify-center">
            <LessonProgressButton lessonId={`${slug}/${lessonSlug}`} />
          </div>
        </div>
      </main>

      {/* ── Navigation ── */}
      <div className="bg-[#080810] border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6 py-8 flex justify-between gap-4">
          {prevLesson ? (
            <Link
              href={`/club/${slug}/${prevLesson.slug}`}
              className="flex-1 p-5 glass-dark rounded-2xl hover:border-indigo-500/30 transition-all group"
            >
              <div className="text-xs text-white/25 mb-1.5 group-hover:text-indigo-400 transition-colors">← Предыдущий</div>
              <div className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                {prevLesson.title}
              </div>
            </Link>
          ) : <div />}

          {nextLesson ? (
            <Link
              href={`/club/${slug}/${nextLesson.slug}`}
              className="flex-1 p-5 glass-dark rounded-2xl hover:border-indigo-500/30 transition-all text-right group"
            >
              <div className="text-xs text-white/25 mb-1.5 group-hover:text-indigo-400 transition-colors">Следующий →</div>
              <div className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                {nextLesson.title}
              </div>
            </Link>
          ) : null}
        </div>
      </div>

      <Footer />
    </div>
  );
}
