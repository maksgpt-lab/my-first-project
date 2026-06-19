import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LessonProgressButton from "@/components/LessonProgress";
import CopyPromptButtons from "@/components/CopyPromptButtons";
import PracticeWidget from "@/components/PracticeWidget";
import { getCourse, getCourses, getLessonContent } from "@/lib/courses";
import { createClient } from "@/lib/supabase/server";

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

export const dynamic = "force-dynamic";

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

  if (!lessonMeta.free) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let hasPlan = false;
    let accessStatus: "no_login" | "expired" | "no_plan" = "no_login";

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("plan, plan_type, plan_expires_at")
        .eq("id", user.id)
        .single();

      if (profile?.plan) {
        const isOnce = profile.plan_type === "once";
        const expired =
          !isOnce &&
          !!profile.plan_expires_at &&
          new Date(profile.plan_expires_at) <= new Date();
        if (!expired) {
          hasPlan = true;
        } else {
          accessStatus = "expired";
        }
      } else {
        accessStatus = "no_plan";
      }
    }

    if (!hasPlan) {
      const jar = await cookies();
      if (jar.get("club_token")?.value === process.env.CLUB_TOKEN) {
        hasPlan = true;
      }
    }

    if (!hasPlan) {
      return (
        <AccessDenied
          status={accessStatus}
          lessonTitle={lessonMeta.title}
          courseSlug={slug}
          courseTitle={course.title}
          loginRedirect={`/courses/${slug}/${lessonSlug}`}
        />
      );
    }
  }

  const lessonData = getLessonContent(slug, lessonSlug);
  if (!lessonData) notFound();

  const currentIndex = course.lessons.findIndex((l) => l.slug === lessonSlug);
  const prevLesson = course.lessons[currentIndex - 1];
  const nextLesson = course.lessons[currentIndex + 1];

  const contentHtml = await markdownToHtml(lessonData.content);

  const wordCount = lessonData.content.split(/\s+/).length;
  const readMinutes = Math.max(1, Math.round(wordCount / 200));

  return (
    <div className="bg-[#0C0A08] min-h-screen flex flex-col">
      <Header />

      {/* ── Dark header ── */}
      <div className="bg-[#0C0A08] border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6 pt-10 pb-12">

          {/* Breadcrumb */}
          <nav className="text-sm text-white/25 mb-8 flex items-center gap-2 flex-wrap">
            <Link href="/courses" className="hover:text-white/50 transition-colors">Курсы</Link>
            <span>·</span>
            <Link href={`/courses/${slug}`} className="hover:text-white/50 transition-colors">{course.title}</Link>
            <span>·</span>
            <span className="text-white/40">Урок {currentIndex + 1}</span>
          </nav>

          {/* Badges */}
          <div className="flex items-center gap-3 mb-6">
            {lessonMeta.free ? (
              <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full">
                Бесплатный урок
              </span>
            ) : (
              <span className="text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full">
                Клуб
              </span>
            )}
            <span className="text-xs text-white/20">{readMinutes} мин чтения</span>
            {lessonData.data.updatedAt && (
              <span className="text-xs text-white/20">
                Обновлено {String(lessonData.data.updatedAt)}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight">
            {lessonMeta.title}
          </h1>
        </div>
      </div>

      {/* ── Reading area ── */}
      <main className="flex-1 bg-[#0C0A08] relative">
        {/* subtle glow behind content */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-indigo-600/5 blur-[100px]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 py-14">
          {/* content card */}
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-3xl px-8 sm:px-12 py-12">
            <article
              className="lesson-article prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-5
                prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-3
                prose-p:text-gray-300 prose-p:leading-[1.9] prose-p:text-[17px]
                prose-a:text-amber-500 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white prose-strong:font-semibold
                prose-code:bg-indigo-500/15 prose-code:text-amber-400 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-[#0d0f1e] prose-pre:border prose-pre:border-white/10
                prose-li:text-gray-300 prose-li:leading-relaxed
                prose-ul:space-y-2 prose-ol:space-y-2
                prose-hr:border-white/10 prose-hr:my-10"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>

          <CopyPromptButtons />

          <PracticeWidget />

          {/* Progress */}
          <div className="mt-14 flex justify-center">
            <LessonProgressButton lessonId={`${slug}/${lessonSlug}`} />
          </div>
        </div>
      </main>

      {/* ── Navigation ── */}
      <div className="bg-[#0C0A08] border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6 py-8 flex justify-between gap-4">
          {prevLesson && prevLesson.free ? (
            <Link
              href={`/courses/${slug}/${prevLesson.slug}`}
              className="flex-1 p-5 glass-dark rounded-2xl hover:border-amber-500/30 transition-all group"
            >
              <div className="text-xs text-white/25 mb-1.5 group-hover:text-amber-500 transition-colors">← Предыдущий</div>
              <div className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                {prevLesson.title}
              </div>
            </Link>
          ) : <div />}

          {nextLesson ? (
            nextLesson.free ? (
              <Link
                href={`/courses/${slug}/${nextLesson.slug}`}
                className="flex-1 p-5 glass-dark rounded-2xl hover:border-amber-500/30 transition-all text-right group"
              >
                <div className="text-xs text-white/25 mb-1.5 group-hover:text-amber-500 transition-colors">Следующий →</div>
                <div className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                  {nextLesson.title}
                </div>
              </Link>
            ) : (
              <div className="flex-1 p-5 glass-dark rounded-2xl border-amber-500/20 text-right">
                <div className="text-xs text-amber-500 mb-1.5">Следующий →</div>
                <div className="text-sm font-semibold text-white/60 mb-3">
                  {nextLesson.title}
                </div>
                <Link
                  href="/pricing"
                  className="text-xs text-amber-500 font-medium hover:text-amber-400 transition-colors"
                >
                  Открыть доступ →
                </Link>
              </div>
            )
          ) : null}
        </div>
      </div>

      <Footer />
    </div>
  );
}

async function markdownToHtml(markdown: string): Promise<string> {
  const { remark } = await import("remark");
  const { default: html } = await import("remark-html");
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

function AccessDenied({
  status,
  lessonTitle,
  courseSlug,
  courseTitle,
  loginRedirect,
}: {
  status: "no_login" | "expired" | "no_plan";
  lessonTitle: string;
  courseSlug: string;
  courseTitle: string;
  loginRedirect: string;
}) {
  const isExpired = status === "expired";
  const isNoLogin = status === "no_login";

  return (
    <div className="bg-[#0C0A08] min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-8">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="#f59e0b" strokeWidth="1.8" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-white mb-3">
            {isExpired ? "Подписка истекла" : "Доступ закрыт"}
          </h1>
          <p className="text-white/40 mb-2 text-sm leading-relaxed">
            {isNoLogin
              ? "Войдите в аккаунт, чтобы открыть этот урок."
              : isExpired
              ? "Ваша подписка закончилась. Продлите её, чтобы продолжить обучение."
              : "Этот урок доступен только участникам Клуба или тарифа Про."}
          </p>
          <p className="text-white/25 text-xs mb-10">
            Урок: {lessonTitle}
          </p>

          <div className="space-y-3">
            {isNoLogin ? (
              <>
                <Link
                  href={`/auth/login?next=${encodeURIComponent(loginRedirect)}`}
                  className="block w-full btn-glow text-white py-3.5 rounded-xl font-semibold text-sm"
                >
                  Войти в аккаунт →
                </Link>
                <Link
                  href="/pricing"
                  className="block w-full bg-white/[0.04] border border-white/[0.1] hover:bg-white/[0.07] text-white/60 hover:text-white py-3.5 rounded-xl font-medium text-sm transition-colors"
                >
                  Смотреть тарифы
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/pricing"
                  className="block w-full btn-glow text-white py-3.5 rounded-xl font-semibold text-sm"
                >
                  {isExpired ? "Продлить подписку →" : "Открыть доступ →"}
                </Link>
                <Link
                  href={`/courses/${courseSlug}`}
                  className="block w-full bg-white/[0.04] border border-white/[0.1] hover:bg-white/[0.07] text-white/60 hover:text-white py-3.5 rounded-xl font-medium text-sm transition-colors"
                >
                  ← Вернуться к курсу «{courseTitle}»
                </Link>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
