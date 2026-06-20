import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCourses } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Об авторе — AI для бизнеса",
  description: "Максим Батов строит AI-агентов для компаний — это основная работа. Курсы о том, за что платят на практике.",
};

export default function AboutPage() {
  const courses = getCourses();
  const totalLessons = courses.reduce((sum, c) => sum + c.lessons.length, 0);
  const freeLessons = courses.reduce(
    (sum, c) => sum + c.lessons.filter((l) => l.free).length,
    0
  );

  return (
    <div className="bg-[#0C0A08] min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="max-w-3xl mx-auto px-6 py-20">

          <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase mb-5">Об авторе</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
            AI для тех, кто<br />
            <span className="gradient-text">зарабатывает деньги</span>
          </h1>
          <p className="text-white/40 text-lg leading-relaxed mb-16 max-w-xl">
            Не для программистов. Не для энтузиастов. Для предпринимателей и менеджеров, которые хотят работать быстрее — от человека, которому за это платят.
          </p>

          {/* Author */}
          <div className="glass-dark rounded-3xl p-8 mb-6">
            <div className="flex items-start gap-5 mb-6">
              <img
                src="/author.jpg"
                alt="Максим Батов"
                className="w-14 h-14 rounded-2xl object-cover object-top shrink-0"
              />
              <div>
                <p className="text-white font-bold text-lg">Батов Максим</p>
                <p className="text-white/40 text-sm mt-0.5">Строит AI-агентов для компаний · Санкт-Петербург</p>
              </div>
            </div>
            <div className="space-y-4 text-white/50 leading-relaxed">
              <p>
                Строю AI-агентов для компаний — это основная работа, за которую платят деньги. Не блог, не курсы ради курсов. Компании нанимают меня когда хотят автоматизировать продажи, операционку, поддержку или онбординг.
              </p>
              <p>
                Каждый день работаю с ChatGPT, Claude, n8n и вижу в чём разница между тем что выглядит красиво на слайде — и тем что реально работает в бизнесе.
              </p>
              <p>
                Большинство обучения по AI написано людьми, которые читали о нём. Этот проект — о том, за что я лично несу ответственность перед клиентами. <span className="text-white/70">Только практика. Только то что работает.</span>
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { title: "Только практика", desc: "Никакой теории ради теории. Каждый урок — готовый промпт который можно использовать сегодня." },
              { title: "На русском", desc: "Весь контент на русском языке. Примеры из российского рынка. Инструменты доступные в России." },
              { title: "Без программирования", desc: "Не нужно знать код. Не нужен технический бэкграунд. Нужен только ChatGPT и желание работать умнее." },
            ].map((item) => (
              <div key={item.title} className="glass-dark rounded-2xl p-6">
                <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="glass-dark rounded-3xl p-8 mb-6">
            <h2 className="text-xl font-bold text-white mb-6">Что внутри</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { value: String(courses.length), label: courses.length === 1 ? "курс" : courses.length < 5 ? "курса" : "курсов" },
                { value: String(totalLessons), label: "уроков" },
                { value: String(freeLessons), label: "бесплатных" },
                { value: "∞", label: "практики" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-xs text-white/30">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 gradient-bg opacity-90" />
            <div className="absolute inset-0 dot-grid opacity-10" />
            <div className="relative z-10 p-8 text-center">
              <p className="text-white font-semibold text-lg mb-2">
                Готов начать?
              </p>
              <p className="text-white/70 mb-6 text-sm">
                Первые уроки — бесплатно. Без регистрации.
              </p>
              <Link
                href="/courses"
                className="inline-block bg-white text-amber-600 px-7 py-3 rounded-2xl font-bold hover:bg-indigo-50 transition-colors shadow-xl"
              >
                Смотреть курсы
              </Link>
            </div>
          </div>

        </section>
      </main>
      <Footer />
    </div>
  );
}
