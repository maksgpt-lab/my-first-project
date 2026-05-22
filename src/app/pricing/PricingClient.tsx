"use client";
import { useState } from "react";
import Link from "next/link";

const plans = [
  {
    name: "Бесплатно",
    priceMonth: 0,
    priceOnce: 0,
    description: "Попробуй без риска. Бесплатные уроки доступны сразу.",
    cta: "Начать бесплатно",
    ctaSlug: null,
    ctaHref: "/courses",
    ctaStyle: "glass-dark text-white/70 hover:text-white border border-white/10",
    highlight: false,
    badge: null,
    features: [
      { text: "3 бесплатных урока в каждом курсе", included: true },
      { text: "Все гайды и статьи (7 материалов)", included: true },
      { text: "Библиотека из 30 промптов", included: true },
      { text: "Платные уроки курсов", included: false },
      { text: "Шаблоны и чек-листы", included: false },
      { text: "Telegram-клуб с автором", included: false },
    ],
  },
  {
    name: "Про",
    priceMonth: 990,
    priceOnce: 7900,
    description: "Все курсы целиком + шаблоны. Оптимальный выбор.",
    cta: "Купить доступ",
    ctaSlug: "pro",
    ctaHref: "/buy/pro",
    ctaStyle: "btn-glow text-white",
    highlight: true,
    badge: "Популярный",
    features: [
      { text: "Всё из бесплатного тарифа", included: true },
      { text: "Все платные уроки (20+ уроков)", included: true },
      { text: "Шаблоны и чек-листы для скачивания", included: true },
      { text: "Доступ к новым курсам без доплат", included: true },
      { text: "Telegram-клуб с автором", included: false },
      { text: "Обратная связь по вопросам", included: false },
    ],
  },
  {
    name: "Клуб",
    priceMonth: 1990,
    priceOnce: 14900,
    description: "Максимум: все курсы, шаблоны и живое общение с автором.",
    cta: "Вступить в клуб",
    ctaSlug: "club",
    ctaHref: "/buy/club",
    ctaStyle: "bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-indigo-500/30",
    highlight: false,
    badge: null,
    features: [
      { text: "Всё из тарифа Про", included: true },
      { text: "Закрытый Telegram-клуб с автором", included: true },
      { text: "Обратная связь по вопросам в Telegram", included: true },
      { text: "Приоритетная поддержка", included: true },
      { text: "Ранний доступ к новым материалам", included: true },
      { text: "Персональный разбор вашего кейса", included: true },
    ],
  },
];

function formatPrice(price: number) {
  return price.toLocaleString("ru-RU");
}

function savingsPercent(monthly: number, once: number) {
  const yearlyEquivalent = monthly * 12;
  return Math.round(((yearlyEquivalent - once) / yearlyEquivalent) * 100);
}

export default function PricingClient() {
  const [isOnce, setIsOnce] = useState(false);

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase mb-5">
          Тарифы
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-5">
          Выбери свой
          <br />
          <span className="gradient-text">формат доступа</span>
        </h1>
        <p className="text-white/40 text-lg max-w-md mx-auto leading-relaxed">
          Начни бесплатно — перейди на платный когда будешь готов.
        </p>

        {/* Toggle */}
        <div className="mt-10 inline-flex items-center gap-3 glass-dark rounded-2xl p-1.5">
          <button
            onClick={() => setIsOnce(false)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              !isOnce
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            Ежемесячно
          </button>
          <button
            onClick={() => setIsOnce(true)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              isOnce
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            Навсегда
            <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded-md">
              −33%
            </span>
          </button>
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-3xl overflow-hidden flex flex-col ${
              plan.highlight
                ? "gradient-border"
                : "border border-white/[0.07]"
            } glass-dark`}
          >
            {plan.badge && (
              <div className="absolute top-5 right-5">
                <span className="text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full tracking-wide uppercase">
                  {plan.badge}
                </span>
              </div>
            )}

            <div className="p-8 flex flex-col flex-1">
              {/* Plan name */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-white mb-1">{plan.name}</h2>
                <p className="text-sm text-white/35 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8">
                {plan.priceMonth === 0 ? (
                  <div className="text-4xl font-bold text-white">
                    Бесплатно
                  </div>
                ) : (
                  <>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-bold text-white">
                        {formatPrice(isOnce ? plan.priceOnce : plan.priceMonth)} ₽
                      </span>
                    </div>
                    <div className="text-sm text-white/30 mt-1">
                      {isOnce ? (
                        <span className="text-emerald-400/80">
                          навсегда · экономия {savingsPercent(plan.priceMonth, plan.priceOnce)}%
                        </span>
                      ) : (
                        "в месяц · отмена в любое время"
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* CTA */}
              <Link
                href={plan.ctaSlug ? `${plan.ctaHref}${isOnce ? "?type=once" : ""}` : plan.ctaHref}
                className={`w-full py-3 rounded-xl text-sm font-semibold text-center transition-all mb-8 block ${plan.ctaStyle}`}
              >
                {plan.cta}
              </Link>

              {/* Features */}
              <ul className="space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-3">
                    <span
                      className={`shrink-0 mt-0.5 text-sm ${
                        f.included ? "text-amber-500" : "text-white/15"
                      }`}
                    >
                      {f.included ? "✓" : "✗"}
                    </span>
                    <span
                      className={`text-sm leading-snug ${
                        f.included ? "text-white/60" : "text-white/20"
                      }`}
                    >
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Payment methods */}
      <div className="mt-10 flex flex-col items-center gap-3">
        <p className="text-xs text-white/20 uppercase tracking-widest font-semibold">Способы оплаты</p>
        <div className="flex flex-wrap justify-center gap-3">
          <div className="h-8 px-4 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
            <svg width="38" height="12" viewBox="0 0 38 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5 11.5H11.7L13.5 0.5H16.3L14.5 11.5Z" fill="white" fillOpacity="0.7"/>
              <path d="M24.3 0.8C23.7 0.6 22.8 0.3 21.7 0.3C19 0.3 17.1 1.7 17.1 3.7C17.1 5.2 18.4 6 19.4 6.5C20.4 7 20.8 7.3 20.8 7.8C20.8 8.5 19.9 8.8 19.1 8.8C18 8.8 17.4 8.6 16.5 8.2L16.1 8L15.7 10.6C16.4 10.9 17.7 11.2 19 11.2C21.9 11.2 23.8 9.8 23.8 7.7C23.8 6.5 23 5.7 21.5 5.1C20.6 4.6 20 4.3 20 3.8C20 3.3 20.6 2.8 21.7 2.8C22.7 2.8 23.4 3 24 3.3L24.3 3.4L24.7 0.9L24.3 0.8Z" fill="white" fillOpacity="0.7"/>
              <path d="M27.9 7.6L29.1 4.4C29.1 4.4 29.4 3.6 29.6 3.1L29.8 4.3L30.5 7.6H27.9ZM31.6 0.5H29.4C28.7 0.5 28.2 0.7 27.9 1.4L23.8 11.5H26.7L27.3 9.8H30.8L31.1 11.5H33.7L31.6 0.5Z" fill="white" fillOpacity="0.7"/>
              <path d="M9.8 0.5L7.1 8L6.8 6.4C6.3 4.7 4.7 2.9 2.9 1.9L5.4 11.5H8.3L12.7 0.5H9.8Z" fill="white" fillOpacity="0.7"/>
              <path d="M4.5 0.5H0L0 0.7C3.5 1.6 5.8 3.6 6.8 6.4L5.7 1.4C5.5 0.7 5 0.5 4.5 0.5Z" fill="white" fillOpacity="0.4"/>
            </svg>
          </div>
          <div className="h-8 px-3 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center gap-1">
            <div className="w-5 h-5 rounded-full bg-red-500/70" />
            <div className="w-5 h-5 rounded-full bg-orange-400/70 -ml-2.5" />
          </div>
          <div className="h-8 px-4 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
            <span className="text-[11px] font-bold text-green-400/80 tracking-wide">МИР</span>
          </div>
          <div className="h-8 px-4 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
            <span className="text-[11px] font-bold text-yellow-400/80 tracking-wide">ЮКасса</span>
          </div>
          <div className="h-8 px-4 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
            <span className="text-[11px] font-bold text-white/50 tracking-wide">СБП</span>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-white text-center mb-10">
          Частые вопросы
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {[
            {
              q: "Как получить доступ после оплаты?",
              a: "Напиши нам в Telegram — пришлём пароль в течение нескольких минут.",
            },
            {
              q: "Можно ли отменить подписку?",
              a: "Да, в любое время. Доступ сохраняется до конца оплаченного периода.",
            },
            {
              q: "Обновляется ли контент?",
              a: "Да. Все участники получают новые курсы и материалы без доплат.",
            },
            {
              q: "Подходит ли для новичков?",
              a: "Курсы построены с нуля — программирование и технические знания не нужны.",
            },
          ].map((item) => (
            <div key={item.q} className="glass-dark rounded-2xl p-6">
              <div className="text-sm font-semibold text-white mb-2">{item.q}</div>
              <div className="text-sm text-white/40 leading-relaxed">{item.a}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <p className="text-white/30 text-sm mb-3">
          Остались вопросы перед покупкой?
        </p>
        <Link
          href="https://t.me/+0ip_wx4Y4pFkMTAy"
          className="text-amber-500 hover:text-amber-400 transition-colors text-sm font-medium"
        >
          Написать в Telegram →
        </Link>
        <p className="mt-6 text-xs text-white/15">
          Нажимая кнопку оплаты, вы соглашаетесь с{" "}
          <Link href="/oferta" className="underline hover:text-white/30 transition-colors">
            публичной офертой
          </Link>{" "}
          и{" "}
          <Link href="/refund" className="underline hover:text-white/30 transition-colors">
            политикой возврата
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
