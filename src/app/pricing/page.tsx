import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Тарифы — AI для бизнеса",
  description:
    "Выбери формат обучения: бесплатные уроки, полный доступ к курсам или клуб с автором. Подписка от 990 ₽/мес или разовая оплата навсегда.",
};

export default function PricingPage() {
  return (
    <div className="bg-[#080810] min-h-screen">
      <Header />
      <main className="flex-1">
        <PricingClient />
      </main>
      <Footer />
    </div>
  );
}
