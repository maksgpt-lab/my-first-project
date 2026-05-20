import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Гайды по AI для бизнеса — бесплатные статьи",
  description: "Бесплатные практические гайды по ChatGPT и другим AI-инструментам для предпринимателей. Готовые промпты, сравнения, кейсы.",
};

export default function GuidesPage() {
  const guides = getGuides();

  return (
    <div className="bg-[#080810] min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="max-w-3xl mx-auto px-6 py-20">
          <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-5">Гайды</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-5">
            Бесплатные материалы
          </h1>
          <p className="text-white/40 text-lg leading-relaxed mb-16 max-w-xl">
            Практические статьи по AI для бизнеса. Читай, применяй, зарабатывай больше.
          </p>

          {guides.length === 0 ? (
            <p className="text-white/30">Материалы скоро появятся.</p>
          ) : (
            <div className="space-y-4">
              {guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="card-hover gradient-border glass-dark rounded-2xl p-7 block group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="font-semibold text-white/90 group-hover:text-white transition-colors text-lg leading-snug mb-2">
                        {guide.title}
                      </h2>
                      <p className="text-sm text-white/35 leading-relaxed">
                        {guide.description}
                      </p>
                    </div>
                    <span className="text-white/20 group-hover:text-indigo-400 transition-colors text-lg shrink-0">↗</span>
                  </div>
                  {guide.publishedAt && (
                    <p className="text-xs text-white/20 mt-4">{guide.publishedAt}</p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
