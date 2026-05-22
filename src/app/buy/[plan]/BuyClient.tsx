"use client";

import { useState } from "react";
import Link from "next/link";

const TG_LINK = "https://t.me/+0ip_wx4Y4pFkMTAy";

const planData = {
  pro: {
    name: "Про",
    priceMonth: 990,
    priceOnce: 7900,
    description: "Все курсы целиком + шаблоны. Оптимальный выбор.",
    features: [
      "3 бесплатных урока в каждом курсе",
      "Все гайды и статьи (7 материалов)",
      "Библиотека из 30 промптов",
      "Все платные уроки (20+ уроков)",
      "Шаблоны и чек-листы для скачивания",
      "Доступ к новым курсам без доплат",
    ],
  },
  club: {
    name: "Клуб",
    priceMonth: 1990,
    priceOnce: 14900,
    description: "Максимум: все курсы, шаблоны и живое общение с автором.",
    features: [
      "Всё из тарифа Про",
      "Закрытый Telegram-клуб с автором",
      "Обратная связь по вопросам в Telegram",
      "Приоритетная поддержка",
      "Ранний доступ к новым материалам",
      "Персональный разбор вашего кейса",
    ],
  },
};

function formatPrice(n: number) {
  return n.toLocaleString("ru-RU");
}

interface Props {
  plan: "pro" | "club";
  isOnce: boolean;
}

export default function BuyClient({ plan, isOnce }: Props) {
  const data = planData[plan];
  const price = isOnce ? data.priceOnce : data.priceMonth;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  function validate() {
    const e: { name?: string; email?: string } = {};
    if (!name.trim()) e.name = "Введите имя";
    if (!email.trim()) e.email = "Введите email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Неверный формат email";
    return e;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-6 py-20 text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center mx-auto mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Заявка принята!</h2>
        <p className="text-white/50 leading-relaxed mb-2">
          Напишите нам в Telegram и укажите ваш email:
        </p>
        <p className="text-indigo-300 font-medium mb-8">{email}</p>
        <p className="text-white/40 text-sm mb-6">
          Мы выставим счёт на оплату через ЮКасса в течение нескольких минут.
        </p>
        <Link
          href={TG_LINK}
          className="btn-glow text-white text-sm font-semibold px-8 py-3 rounded-xl inline-block"
        >
          Открыть Telegram →
        </Link>
        <p className="mt-6 text-xs text-white/20">
          Тариф: {data.name} · {formatPrice(price)} {isOnce ? "₽ навсегда" : "₽/мес"}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link
        href="/pricing"
        className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors mb-10"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Вернуться к тарифам
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Form */}
        <div>
          <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-5">
            Оформление заказа
          </p>
          <h1 className="text-3xl font-bold text-white mb-8">
            Тариф <span className="gradient-text">{data.name}</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Ваше имя
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Иван Иванов"
                className={`w-full bg-white/[0.05] border rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none focus:border-indigo-500/60 transition-colors text-sm ${
                  errors.name ? "border-red-500/50" : "border-white/[0.1]"
                }`}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Email для получения доступа
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ivan@example.com"
                className={`w-full bg-white/[0.05] border rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none focus:border-indigo-500/60 transition-colors text-sm ${
                  errors.email ? "border-red-500/50" : "border-white/[0.1]"
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full btn-glow text-white font-semibold py-3.5 rounded-xl text-sm mt-2"
            >
              Оплатить {formatPrice(price)} {isOnce ? "₽" : "₽/мес"}
            </button>
          </form>

          <div className="mt-5 flex items-start gap-2.5 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM8 11V7.5M8 5.5v.5" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <p className="text-xs text-white/35 leading-relaxed">
              Онлайн-оплата через ЮКасса подключается. После отправки заявки мы напишем вам
              на указанный email или пришлём ссылку на оплату в Telegram.
            </p>
          </div>

          <p className="mt-5 text-xs text-white/20 leading-relaxed">
            Нажимая кнопку оплаты, вы соглашаетесь с{" "}
            <Link href="/oferta" className="underline hover:text-white/40 transition-colors">
              публичной офертой
            </Link>{" "}
            и{" "}
            <Link href="/refund" className="underline hover:text-white/40 transition-colors">
              политикой возврата
            </Link>
            .
          </p>
        </div>

        {/* Order summary */}
        <div className="glass-dark rounded-3xl border border-white/[0.07] p-8">
          <h2 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-6">
            Состав заказа
          </h2>

          <div className="mb-6">
            <div className="text-lg font-bold text-white mb-1">{data.name}</div>
            <div className="text-sm text-white/35">{data.description}</div>
          </div>

          <ul className="space-y-3 mb-8">
            {data.features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span className="text-indigo-400 shrink-0 mt-0.5 text-sm">✓</span>
                <span className="text-sm text-white/60 leading-snug">{f}</span>
              </li>
            ))}
          </ul>

          <div className="border-t border-white/[0.07] pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/40">Итого</span>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {formatPrice(price)} ₽
                </div>
                <div className="text-xs text-white/30 mt-0.5">
                  {isOnce ? "единоразово · навсегда" : "в месяц · отмена в любое время"}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs text-white/25">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="5" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M4.5 5V3.5a2.5 2.5 0 0 1 5 0V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            Безопасная оплата через ЮКасса
          </div>

          {/* Payment logos */}
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <div className="h-6 px-2.5 rounded bg-white/[0.05] border border-white/[0.07] flex items-center justify-center">
              <svg width="32" height="10" viewBox="0 0 38 12" fill="none">
                <path d="M14.5 11.5H11.7L13.5 0.5H16.3L14.5 11.5Z" fill="white" fillOpacity="0.5"/>
                <path d="M24.3 0.8C23.7 0.6 22.8 0.3 21.7 0.3C19 0.3 17.1 1.7 17.1 3.7C17.1 5.2 18.4 6 19.4 6.5C20.4 7 20.8 7.3 20.8 7.8C20.8 8.5 19.9 8.8 19.1 8.8C18 8.8 17.4 8.6 16.5 8.2L16.1 8L15.7 10.6C16.4 10.9 17.7 11.2 19 11.2C21.9 11.2 23.8 9.8 23.8 7.7C23.8 6.5 23 5.7 21.5 5.1C20.6 4.6 20 4.3 20 3.8C20 3.3 20.6 2.8 21.7 2.8C22.7 2.8 23.4 3 24 3.3L24.3 3.4L24.7 0.9L24.3 0.8Z" fill="white" fillOpacity="0.5"/>
                <path d="M27.9 7.6L29.1 4.4C29.1 4.4 29.4 3.6 29.6 3.1L29.8 4.3L30.5 7.6H27.9ZM31.6 0.5H29.4C28.7 0.5 28.2 0.7 27.9 1.4L23.8 11.5H26.7L27.3 9.8H30.8L31.1 11.5H33.7L31.6 0.5Z" fill="white" fillOpacity="0.5"/>
                <path d="M9.8 0.5L7.1 8L6.8 6.4C6.3 4.7 4.7 2.9 2.9 1.9L5.4 11.5H8.3L12.7 0.5H9.8Z" fill="white" fillOpacity="0.5"/>
                <path d="M4.5 0.5H0L0 0.7C3.5 1.6 5.8 3.6 6.8 6.4L5.7 1.4C5.5 0.7 5 0.5 4.5 0.5Z" fill="white" fillOpacity="0.3"/>
              </svg>
            </div>
            <div className="h-6 px-2 rounded bg-white/[0.05] border border-white/[0.07] flex items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-red-500/60" />
              <div className="w-4 h-4 rounded-full bg-orange-400/60 -ml-2" />
            </div>
            <div className="h-6 px-2.5 rounded bg-white/[0.05] border border-white/[0.07] flex items-center">
              <span className="text-[10px] font-bold text-green-400/70">МИР</span>
            </div>
            <div className="h-6 px-2.5 rounded bg-white/[0.05] border border-white/[0.07] flex items-center">
              <span className="text-[10px] font-bold text-white/40">СБП</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
