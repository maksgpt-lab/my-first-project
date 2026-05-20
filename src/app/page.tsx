import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCourses } from "@/lib/courses";

const benefits = [
  {
    icon: "🇷🇺",
    title: "На русском языке",
    text: "Весь контент на русском — никаких языковых барьеров.",
    color: "from-blue-50 to-indigo-50",
    border: "border-indigo-100",
  },
  {
    icon: "⚡",
    title: "Без программирования",
    text: "Только готовые инструменты: ChatGPT, Claude, n8n, Make.",
    color: "from-violet-50 to-purple-50",
    border: "border-violet-100",
  },
  {
    icon: "💼",
    title: "Реальные кейсы",
    text: "Задачи из маркетинга, HR и управления — не абстрактная теория.",
    color: "from-cyan-50 to-sky-50",
    border: "border-cyan-100",
  },
];

const stats = [
  { value: "20–40%", label: "рост продуктивности по данным McKinsey" },
  { value: "3 ч/день", label: "экономит предприниматель освоивший AI" },
  { value: "×7", label: "дороже стоит медленный ответ клиенту" },
];

export default function Home() {
  const courses = getCourses();

  return (
    <>
      <Header />

      <main className="flex-1 overflow-hidden">

        {/* Hero */}
        <section className="relative min-h-[90vh] flex items-center">
          {/* Background blobs */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-indigo-100/60 blur-3xl animate-float" />
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-100/60 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-100/40 blur-3xl" />
          </div>

          <div className="max-w-5xl mx-auto px-6 py-24 text-center w-full">
            <div className="animate-fade-up">
              <span className="inline-block text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full mb-8">
                🚀 Обучение AI для бизнеса на русском языке
              </span>
            </div>

            <h1 className="animate-fade-up-delay-1 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]">
              Зарабатывай больше
              <br />
              <span className="gradient-text">с помощью AI</span>
            </h1>

            <p className="animate-fade-up-delay-2 mt-8 text-xl sm:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
              Практические курсы для предпринимателей и команд.
              Без кода. На русском. С реальными результатами.
            </p>

            <div className="animate-fade-up-delay-3 mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="gradient-bg text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:opacity-90 transition-opacity shadow-xl shadow-indigo-200"
              >
                Начать обучение →
              </Link>
              <Link
                href="#"
                className="glass border border-gray-200 text-gray-700 px-8 py-4 rounded-2xl text-lg font-medium hover:bg-white transition-colors"
              >
                Telegram-клуб
              </Link>
            </div>

            {/* Stats */}
            <div className="animate-fade-up-delay-3 mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-bold gradient-text">{s.value}</div>
                  <div className="text-sm text-gray-400 mt-1 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-24 bg-gray-50/80">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Почему именно здесь
              </h2>
              <p className="mt-4 text-gray-400 text-lg">Три причины, которые отличают нас от других</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className={`card-hover bg-gradient-to-br ${b.color} border ${b.border} rounded-3xl p-8`}
                >
                  <div className="text-5xl mb-5">{b.icon}</div>
                  <h3 className="font-bold text-gray-900 text-lg mb-3">{b.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses */}
        {courses.length > 0 && (
          <section className="py-24">
            <div className="max-w-5xl mx-auto px-6">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Курсы</h2>
                  <p className="mt-2 text-gray-400">Начни с любого — каждый даёт конкретный результат</p>
                </div>
                <Link href="/courses" className="text-indigo-600 font-medium hover:text-indigo-500 transition-colors hidden sm:block">
                  Все курсы →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <Link
                    key={course.slug}
                    href={`/courses/${course.slug}`}
                    className="card-hover group border border-gray-100 bg-white rounded-3xl p-8 block"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                        {course.lessons.filter((l) => l.free).length} урока бесплатно
                      </span>
                      <span className="text-gray-300 group-hover:text-indigo-400 transition-colors text-xl">→</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-xl group-hover:text-indigo-600 transition-colors mb-3">
                      {course.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed mb-6">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                        <div className="h-full w-[28%] gradient-bg rounded-full" />
                      </div>
                      <span className="text-xs text-gray-400">{course.lessons.length} уроков</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="gradient-bg rounded-3xl px-8 py-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Присоединись к Telegram-клубу
                </h2>
                <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                  Шаблоны промптов, разборы кейсов, Q&A с автором
                  и ранний доступ к новым курсам.
                </p>
                <Link
                  href="#"
                  className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-colors shadow-xl"
                >
                  Вступить бесплатно
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
