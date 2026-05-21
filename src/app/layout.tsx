import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://my-first-project-five-beta.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "AI для бизнеса",
    template: "%s — AI для бизнеса",
  },
  description:
    "Практические курсы по AI-инструментам для бизнеса — без программирования, на русском языке. ChatGPT, промпт-инжиниринг, автоматизация.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: "AI для бизнеса",
    title: "AI для бизнеса",
    description: "Практические курсы по AI-инструментам для предпринимателей — без программирования, на русском языке.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI для бизнеса" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI для бизнеса",
    description: "Практические курсы по AI-инструментам для предпринимателей.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#080810] text-gray-900">
        {children}
      </body>
    </html>
  );
}
