import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgentWidget from "@/components/AgentWidget";

export const metadata = {
  title: "AI-консультант — Клуб",
  description: "Персональный AI-консультант по внедрению AI в бизнес. Задавай вопросы — разберём твою ситуацию вместе.",
};

export default function AgentPage() {
  return (
    <div className="bg-[#080810] min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 flex flex-col gap-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1 rounded-full">
              Клуб
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-white/25">Онлайн</span>
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            AI-консультант
          </h1>
          <p className="text-white/40 text-base leading-relaxed max-w-xl">
            Задавай вопросы о внедрении AI в свой бизнес. Консультант знает как найти правильные точки автоматизации и не наступить на типичные грабли.
          </p>
        </div>

        {/* How it works */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Разбирает твою задачу", desc: "Не даёт общих советов — задаёт уточняющие вопросы" },
            { label: "Находит приоритеты", desc: "Где AI даст максимум при минимуме усилий" },
            { label: "Даёт конкретные промпты", desc: "Готовые шаблоны под твою ситуацию" },
          ].map((item) => (
            <div key={item.label} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4">
              <p className="text-white/70 text-sm font-medium mb-1">{item.label}</p>
              <p className="text-white/25 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Chat */}
        <div className="flex-1 bg-white/[0.03] border border-white/[0.07] rounded-3xl overflow-hidden">
          <AgentWidget />
        </div>
      </main>

      <Footer />
    </div>
  );
}
