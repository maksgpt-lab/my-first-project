import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BuyClient from "./BuyClient";

const validPlans = ["pro", "club"] as const;
type Plan = (typeof validPlans)[number];

const planNames: Record<Plan, string> = {
  pro: "Про",
  club: "Клуб",
};

export function generateStaticParams() {
  return validPlans.map((plan) => ({ plan }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ plan: string }>;
}): Promise<Metadata> {
  const { plan } = await params;
  if (!validPlans.includes(plan as Plan)) return {};
  return {
    title: `Оформление заказа — тариф ${planNames[plan as Plan]}`,
    description: "Оформите доступ к курсам по AI-инструментам для бизнеса.",
    robots: { index: false },
  };
}

export default async function BuyPage({
  params,
  searchParams,
}: {
  params: Promise<{ plan: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const { plan } = await params;
  const { type } = await searchParams;

  if (!validPlans.includes(plan as Plan)) notFound();

  const isOnce = type === "once";

  return (
    <div className="bg-[#080810] min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <BuyClient plan={plan as Plan} isOnce={isOnce} />
      </main>
      <Footer />
    </div>
  );
}
