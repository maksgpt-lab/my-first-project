import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Реквизиты — AI для бизнеса",
  description: "Реквизиты продавца образовательных материалов aidabusiness.ru",
};

export default function RekvizityPage() {
  return (
    <div className="bg-[#080810] min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-16">
        <h1 className="text-3xl font-bold text-white mb-10">Реквизиты</h1>

        <div className="bg-white/[0.03] border border-white/[0.07] rounded-3xl overflow-hidden">
          {[
            { label: "Исполнитель", value: "Батов Максим Дмитриевич" },
            { label: "Статус", value: "Самозанятый" },
            { label: "ИНН", value: "631609803763" },
            { label: "Email", value: "maks.gpt@gmail.com" },
            { label: "Сайт", value: "aidabusiness.ru" },
          ].map((row, i, arr) => (
            <div
              key={row.label}
              className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-8 px-7 py-5 ${
                i < arr.length - 1 ? "border-b border-white/[0.05]" : ""
              }`}
            >
              <span className="text-sm text-white/30 sm:w-40 shrink-0">{row.label}</span>
              <span className="text-sm text-white/80 font-medium">{row.value}</span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-white/25 leading-relaxed">
          Оказание услуг осуществляется на основании публичной оферты.{" "}
          <a href="/oferta" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Читать оферту →
          </a>
        </p>
      </main>

      <Footer />
    </div>
  );
}
