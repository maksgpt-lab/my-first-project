import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getGuides, getGuideContent } from "@/lib/guides";

export async function generateStaticParams() {
  return getGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = getGuideContent(slug);
  if (!content) return {};
  return {
    title: `${content.data.title} — AI для бизнеса`,
    description: content.data.description,
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideContent(slug);
  if (!guide) notFound();

  const { remark } = await import("remark");
  const { default: html } = await import("remark-html");
  const result = await remark().use(html).process(guide.content);
  const contentHtml = result.toString();

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="max-w-3xl mx-auto px-6 py-16">
          <nav className="text-sm text-gray-400 mb-8">
            <Link href="/guides" className="hover:text-gray-600">
              Гайды
            </Link>
            <span className="mx-2">→</span>
            <span className="text-gray-700">{String(guide.data.title ?? "")}</span>
          </nav>

          {guide.data.publishedAt && (
            <p className="text-xs text-gray-400 mb-6">
              {String(guide.data.publishedAt)}
            </p>
          )}

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-10 leading-tight">
            {String(guide.data.title ?? "")}
          </h1>

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
              prose-table:text-sm
              prose-hr:border-gray-100"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          <div className="mt-16 pt-8 border-t border-gray-100">
            <Link href="/guides" className="text-sm text-indigo-600 hover:underline">
              ← Все гайды
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
