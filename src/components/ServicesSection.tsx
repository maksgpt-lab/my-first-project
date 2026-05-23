import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";

export default function ServicesSection() {
  return (
    <section className="py-24 border-t border-white/[0.05]">
      <div className="max-w-5xl mx-auto px-6">

        <AnimateIn>
          <p className="text-amber-500/60 text-[11px] tracking-[0.25em] uppercase font-medium mb-4">
            Два направления
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-14 leading-tight">
            Выберите, что вам нужно
          </h2>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Обучение */}
          <AnimateIn delay={0.1}>
            <div className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 flex flex-col h-full hover:border-white/[0.14] transition-colors">
              <div className="mb-6">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/25">
                  Направление 01
                </span>
                <h3 className="text-2xl font-bold text-white mt-2">Обучение</h3>
                <p className="text-white/45 text-sm mt-2 leading-relaxed">
                  Практические курсы по ChatGPT для предпринимателей и специалистов. Читаешь, применяешь сразу — не потом.
                </p>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {[
                  "Текстовые уроки в своём темпе",
                  "Промпты прямо в уроке — применяешь сразу",
                  "6 курсов: от основ до AI-систем",
                  "Первые 3 урока в каждом курсе — бесплатно",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/55">
                    <span className="text-amber-500/70 mt-0.5 shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/25 text-xs mb-1">Стоимость</p>
                  <p className="text-white font-bold text-xl">от 990 <span className="text-white/40 text-base font-normal">₽/мес</span></p>
                </div>
                <Link
                  href="/courses"
                  className="text-white/60 hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5 group-hover:text-amber-400"
                >
                  Смотреть курсы
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </AnimateIn>

          {/* Внедрение */}
          <AnimateIn delay={0.2}>
            <div className="group relative rounded-2xl border border-amber-800/30 bg-amber-950/20 p-8 flex flex-col h-full hover:border-amber-700/40 transition-colors">
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-amber-500/60 bg-amber-500/8 border border-amber-500/15 px-2.5 py-1 rounded-full">
                  B2B
                </span>
              </div>

              <div className="mb-6">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-amber-500/40">
                  Направление 02
                </span>
                <h3 className="text-2xl font-bold text-white mt-2">Внедрение AI</h3>
                <p className="text-white/45 text-sm mt-2 leading-relaxed">
                  Строю AI-системы для бизнеса под ключ. Автоматизирую процессы, создаю агентов, настраиваю интеграции.
                </p>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {[
                  "AI-агенты для работы с почтой, данными, клиентами",
                  "Автоматизация рутинных процессов",
                  "Интеграции с CRM, мессенджерами, таблицами",
                  "Разбор задачи и расчёт стоимости — бесплатно",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/55">
                    <span className="text-amber-500/70 mt-0.5 shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/25 text-xs mb-1">Стоимость</p>
                  <p className="text-white font-bold text-xl">от 50 000 <span className="text-white/40 text-base font-normal">₽</span></p>
                </div>
                <Link
                  href="/contact"
                  className="btn-glow text-white text-sm font-semibold px-5 py-2.5 rounded-xl"
                >
                  Обсудить задачу →
                </Link>
              </div>
            </div>
          </AnimateIn>

        </div>
      </div>
    </section>
  );
}
