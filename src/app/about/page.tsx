import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCourses } from "@/lib/courses";

export const metadata: Metadata = {
  title: "О проекте — AI для бизнеса",
  description: "Кто мы и зачем создали этот проект. Практические курсы по AI-инструментам для предпринимателей на русском языке.",
};

export default function AboutPage() {
  const courses = getCourses();
  const totalLessons = courses.reduce((sum, c) => sum + c.lessons.length, 0);
  const freeLessons = courses.reduce(
    (sum, c) => sum + c.lessons.filter((l) => l.free).length,
    0
  );

  return (
    <div className="bg-[#080810] min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="max-w-3xl mx-auto px-6 py-20">

          <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-5">О проекте</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
            AI для тех, кто<br />
            <span className="gradient-text">зарабатывает деньги</span>
          </h1>
          <p className="text-white/40 text-lg leading-relaxed mb-16 max-w-xl">
            Не для программистов. Не для энтузиастов технологий. Для предпринимателей, менеджеров и маркетологов которые хотят работать быстрее и зарабатывать больше.
          </p>

          {/* Author */}
          <div className="glass-dark rounded-3xl p-8 mb-6">
            <div className="flex items-start gap-5 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl shrink-0">
                М
              </div>
              <div>
                <p className="text-white font-bold text-lg">Батов Максим</p>
                <p className="text-white/40 text-sm mt-0.5">Создаёт AI-агентов для бизнеса · Использует AI каждый день как основной рабочий инструмент</p>
              </div>
            </div>
            <div className="space-y-4 text-white/50 leading-relaxed">
              <p>
                Я строю AI-агентов для компаний — это моя основная работа. Каждый день работаю с ChatGPT, Claude, автоматизациями и вижу как бизнес меняется когда начинает использовать AI правильно.
              </p>
              <p>
                Проблема в том, что большинство обучения по AI — либо слишком техническое, либо слишком общее. Предпринимателям нужны конкретные ответы: <span className="text-white/70">«Что именно написать? Как автоматизировать этот процесс? С чего начать?»</span>
              </p>
              <p>
                Этот проект — то что я сам хотел бы иметь когда начинал. Только практика. Только то что работает в реальных задачах.
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
                className="inline-block bg-white text-indigo-600 px-7 py-3 rounded-2xl font-bold hover:bg-indigo-50 transition-colors shadow-xl"
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
