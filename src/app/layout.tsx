import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aidabusiness.ru";

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
  verification: {
    yandex: ["11e42f43a128aa4f", "2bd25c4a7ef8cb44"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0C0A08] text-gray-900">
        {children}
        <CookieBanner />
        <Script id="ym-init" strategy="afterInteractive">{`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
          ym(109349900,"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
        `}</Script>
        <noscript>
          <div><img src="https://mc.yandex.ru/watch/109349900" style={{position:"absolute",left:"-9999px"}} alt="" /></div>
        </noscript>
      </body>
    </html>
  );
}
