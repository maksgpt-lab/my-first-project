import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseProgress from "@/components/CourseProgress";
import { getCourse, getCourses } from "@/lib/courses";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

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

  // Проверяем, есть ли у пользователя активный план
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let hasPlan = false;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan, plan_type, plan_expires_at")
      .eq("id", user.id)
      .single();

    if (profile?.plan) {
      const isOnce = profile.plan_type === "once";
      const notExpired = isOnce || !profile.plan_expires_at
        || new Date(profile.plan_expires_at) > new Date();
      hasPlan = notExpired;
    }
  }

  if (!hasPlan) {
    const jar = await cookies();
    const token = jar.get("club_token")?.value;
    hasPlan = token === process.env.CLUB_TOKEN;
  }

  const allCourses = getCourses();
  const currentIndex = allCourses.findIndex((c) => c.slug === slug);
  const nextCourse = allCourses[currentIndex + 1] ?? null;

  return (
    <div className="bg-[#0C0A08] min-h-screen">
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
          <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase mb-5">
            Содержание курса
          </p>
          <div className="divide-y divide-white/[0.05] glass-dark rounded-3xl overflow-hidden">
            {course.lessons.map((lesson, index) => {
              const accessible = lesson.free || hasPlan;
              const href = accessible
                ? `/courses/${slug}/${lesson.slug}`
                : "/pricing";

              return (
                <Link
                  key={lesson.slug}
                  href={href}
                  className="flex items-center gap-4 px-6 py-5 group hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm text-white/20 w-6 shrink-0 font-mono">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className={`font-medium transition-colors ${
                      accessible
                        ? "text-white/80 group-hover:text-white"
                        : "text-white/40 group-hover:text-white/60"
                    }`}>
                      {lesson.title}
                    </span>
                    {lesson.description && (
                      <p className="text-sm text-white/25 mt-0.5 truncate">
                        {lesson.description}
                      </p>
                    )}
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full shrink-0 font-medium ${
                    lesson.free
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : hasPlan
                      ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                      : "bg-white/[0.04] text-white/25 border border-white/[0.06]"
                  }`}>
                    {lesson.free ? "Бесплатно" : hasPlan ? "✓ Доступно" : "🔒 Платно"}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Next course */}
          {nextCourse && (
            <div className="mt-8 glass-dark rounded-3xl border border-white/[0.07] p-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-white/30 mb-1">Следующий курс</p>
                <p className="text-base font-semibold text-white">{nextCourse.title}</p>
                <p className="text-sm text-white/35 mt-0.5 line-clamp-1">{nextCourse.description}</p>
              </div>
              <Link
                href={`/courses/${nextCourse.slug}`}
                className="shrink-0 btn-glow text-white px-5 py-2.5 rounded-xl text-sm font-semibold"
              >
                Перейти →
              </Link>
            </div>
          )}

          {/* CTA — показываем только если нет доступа */}
          {!hasPlan && (
            <div className="mt-8 relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 gradient-bg opacity-90" />
              <div className="absolute inset-0 dot-grid opacity-10" />
              <div className="relative z-10 p-8 text-center">
                <p className="text-white font-semibold text-lg mb-2">
                  Хочешь доступ ко всем урокам?
                </p>
                <p className="text-white/70 mb-6 text-sm">
                  Открой полный доступ и продолжай обучение прямо сейчас.
                </p>
                <Link
                  href="/pricing"
                  className="inline-block bg-white text-amber-600 px-7 py-3 rounded-2xl font-bold hover:bg-indigo-50 transition-colors shadow-xl"
                >
                  Смотреть тарифы →
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
