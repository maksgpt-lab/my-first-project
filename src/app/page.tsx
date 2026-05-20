import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCourses } from "@/lib/courses";

const benefits = [
  {
    icon: "🇷🇺",
    title: "На русском языке",
    text: "Весь контент на русском — никаких языковых барьеров.",
  },
  {
    icon: "⚡",
    title: "Без программирования",
    text: "Только готовые инструменты: ChatGPT, Claude, n8n, Make.",
  },
  {
    icon: "💼",
    title: "Реальные кейсы",
    text: "Задачи из маркетинга, HR и управления — не абстрактная теория.",
  },
];

export default function Home() {
  const courses = getCourses();

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            Автоматизируй бизнес
            <br />
            <span className="text-blue-600">с помощью AI</span>
          </h1>
          <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
            Практические курсы на русском языке — без программирования.
            Для предпринимателей, руководителей и их команд.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-blue-500 transition-colors"
            >
              Смотреть курсы
            </Link>
            <Link
              href="#"
              className="border border-gray-200 text-gray-700 px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Telegram-клуб →
            </Link>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
              Почему здесь
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {benefits.map((b) => (
                <div key={b.title} className="bg-white rounded-2xl p-8 shadow-sm">
                  <div className="text-4xl mb-4">{b.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{b.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses */}
        {courses.length > 0 && (
          <section className="max-w-5xl mx-auto px-6 py-20">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold text-gray-900">Курсы</h2>
              <Link href="/courses" className="text-blue-600 text-sm hover:underline">
                Все курсы →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {courses.map((course) => (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="border border-gray-100 rounded-2xl p-8 hover:border-blue-200 hover:shadow-md transition-all group"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {course.description}
                  </p>
                  <span className="text-xs text-gray-400">
                    {course.lessons.length} уроков ·{" "}
                    {course.lessons.filter((l) => l.free).length} бесплатно
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-blue-600 py-20">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Присоединись к Telegram-клубу
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Шаблоны промптов, разборы кейсов, Q&A с автором и ранний доступ к
              новым курсам.
            </p>
            <Link
              href="#"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-medium hover:bg-blue-50 transition-colors inline-block"
            >
              Вступить в клуб
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
