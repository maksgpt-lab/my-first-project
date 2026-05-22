import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromptsClient from "./PromptsClient";

export const metadata: Metadata = {
  title: "Библиотека промптов — готовые шаблоны для бизнеса",
  description:
    "30 готовых промптов для ChatGPT по категориям: тексты, продажи, HR, маркетинг, аналитика, управление. Копируй и используй прямо сейчас.",
};

export default function PromptsPage() {
  return (
    <div className="bg-[#0C0A08] min-h-screen">
      <Header />
      <main className="flex-1">
        <PromptsClient />
      </main>
      <Footer />
    </div>
  );
}
