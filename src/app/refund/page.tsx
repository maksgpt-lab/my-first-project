import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Политика возврата — AI для бизнеса",
  description: "Условия и порядок возврата денежных средств за информационные продукты.",
};

export default function RefundPage() {
  return (
    <div className="bg-[#080810] min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="max-w-3xl mx-auto px-6 py-20">
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-5">
              Юридические документы
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Политика возврата
            </h1>
            <p className="text-white/30 text-sm">Редакция от 21 мая 2026 года</p>
          </div>

          <div className="glass-dark rounded-3xl border border-white/[0.07] px-8 sm:px-12 py-12 space-y-10 text-white/55 leading-relaxed text-[15px]">

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">Общий принцип</h2>
              <p>
                Мы продаём информационные продукты в цифровом формате. Согласно п. 4 ст. 26.1
                Закона РФ «О защите прав потребителей», возврат надлежащего качества товара,
                имеющего индивидуально-определённые свойства, не предусмотрен, если он может быть
                использован исключительно приобретающим его потребителем.
              </p>
              <p>
                Тем не менее мы идём навстречу покупателям и принимаем запросы на возврат
                в течение 7 календарных дней с момента оплаты при соблюдении условий ниже.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">Условия возврата</h2>
              <p>Возврат возможен если выполнены все три условия одновременно:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 shrink-0 mt-0.5">1.</span>
                  <span>Прошло не более 7 календарных дней с момента оплаты.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 shrink-0 mt-0.5">2.</span>
                  <span>
                    Просмотрено не более 2 уроков из приобретённого доступа (менее 20% контента).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 shrink-0 mt-0.5">3.</span>
                  <span>Покупатель указал причину возврата.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">Когда возврат невозможен</h2>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <span className="text-white/25 shrink-0 mt-0.5">—</span>
                  <span>Прошло более 7 дней с момента оплаты.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/25 shrink-0 mt-0.5">—</span>
                  <span>Просмотрено более 2 уроков.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/25 shrink-0 mt-0.5">—</span>
                  <span>
                    Материалы были скачаны или переданы третьим лицам.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/25 shrink-0 mt-0.5">—</span>
                  <span>
                    Причина возврата — «не понравился стиль подачи» или «уже знал этот материал»,
                    если Покупатель не воспользовался бесплатными уроками перед покупкой.
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">Как запросить возврат</h2>
              <ol className="space-y-3 ml-4">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 shrink-0 font-semibold mt-0.5">1.</span>
                  <span>
                    Напиши нам в Telegram с темой «Возврат» и укажи: дату оплаты, сумму,
                    причину возврата.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 shrink-0 font-semibold mt-0.5">2.</span>
                  <span>Мы ответим в течение 1 рабочего дня и подтвердим запрос.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 shrink-0 font-semibold mt-0.5">3.</span>
                  <span>
                    Средства возвращаются на карту, с которой производилась оплата,
                    в течение 10 рабочих дней.
                  </span>
                </li>
              </ol>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">Подписка (ежемесячная оплата)</h2>
              <p>
                При отмене подписки списание прекращается с ближайшего расчётного периода.
                Доступ к материалам сохраняется до конца оплаченного месяца. Частичный возврат
                за неиспользованные дни не производится.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">Контакт для возвратов</h2>
              <p>
                Все запросы принимаются через Telegram:
                <a
                  href="https://t.me/+0ip_wx4Y4pFkMTAy"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors ml-1"
                >
                  написать в Telegram
                </a>
              </p>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
