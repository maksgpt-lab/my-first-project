import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — AI для бизнеса",
  description: "Политика обработки персональных данных сайта aidabusiness.ru в соответствии с ФЗ-152.",
};

export default function PrivacyPage() {
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
              Политика конфиденциальности
            </h1>
            <p className="text-white/30 text-sm">Редакция от 22 мая 2026 года</p>
          </div>

          <div className="glass-dark rounded-3xl border border-white/[0.07] px-8 sm:px-12 py-12 space-y-10 text-white/55 leading-relaxed text-[15px]">

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">1. Общие положения</h2>
              <p>
                Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки
                персональных данных пользователей сайта aidabusiness.ru (далее — «Сайт»).
              </p>
              <p>
                Оператором персональных данных является Батов Максим Дмитриевич, ИНН 631609803763
                (далее — «Оператор»).
              </p>
              <p>
                Политика разработана в соответствии с требованиями Федерального закона от 27.07.2006
                № 152-ФЗ «О персональных данных».
              </p>
              <p>
                Используя Сайт, вы соглашаетесь с условиями настоящей Политики. Если вы не согласны
                с Политикой — пожалуйста, прекратите использование Сайта.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">2. Какие данные мы собираем</h2>
              <p>При использовании Сайта мы можем собирать следующие данные:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 shrink-0 mt-0.5">—</span>
                  <span><strong className="text-white/70">Данные при оплате:</strong> имя, email-адрес, необходимые для проведения платежа и предоставления доступа к материалам.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 shrink-0 mt-0.5">—</span>
                  <span><strong className="text-white/70">Технические данные:</strong> IP-адрес, тип браузера, страницы Сайта которые вы посещаете, время посещения — собираются автоматически в целях аналитики (Яндекс Метрика).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 shrink-0 mt-0.5">—</span>
                  <span><strong className="text-white/70">Данные из форм:</strong> сообщения которые вы отправляете через формы обратной связи или AI-ассистент на Сайте.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">3. Цели обработки данных</h2>
              <p>Мы обрабатываем персональные данные в следующих целях:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 shrink-0 mt-0.5">—</span>
                  <span>Исполнение договора: предоставление доступа к приобретённым информационным материалам.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 shrink-0 mt-0.5">—</span>
                  <span>Обработка платежей через платёжный сервис ЮКасса.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 shrink-0 mt-0.5">—</span>
                  <span>Улучшение работы Сайта на основе анализа пользовательского поведения.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 shrink-0 mt-0.5">—</span>
                  <span>Ответы на обращения и вопросы пользователей.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 shrink-0 mt-0.5">—</span>
                  <span>Соблюдение требований законодательства Российской Федерации.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">4. Передача данных третьим лицам</h2>
              <p>
                Мы не продаём и не передаём ваши персональные данные третьим лицам, за исключением
                следующих случаев:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 shrink-0 mt-0.5">—</span>
                  <span><strong className="text-white/70">ЮКасса (ООО «ЮМани»):</strong> платёжный сервис для обработки транзакций. Передаются только данные необходимые для проведения платежа.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 shrink-0 mt-0.5">—</span>
                  <span><strong className="text-white/70">Яндекс Метрика:</strong> сервис веб-аналитики. Данные обезличены и используются только в аналитических целях.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 shrink-0 mt-0.5">—</span>
                  <span>По требованию уполномоченных государственных органов в случаях, предусмотренных законодательством РФ.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">5. Хранение и защита данных</h2>
              <p>
                Персональные данные хранятся на защищённых серверах и обрабатываются только в
                объёме, необходимом для достижения целей, указанных в настоящей Политике.
              </p>
              <p>
                Мы принимаем технические и организационные меры для защиты данных от
                несанкционированного доступа, изменения, раскрытия или уничтожения.
              </p>
              <p>
                Данные хранятся в течение срока, необходимого для исполнения договора, и не более
                трёх лет после его окончания, если иное не предусмотрено законодательством.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">6. Права пользователя</h2>
              <p>В соответствии с ФЗ-152 вы имеете право:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 shrink-0 mt-0.5">—</span>
                  <span>Получить информацию о том, какие ваши данные обрабатываются.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 shrink-0 mt-0.5">—</span>
                  <span>Потребовать исправления неточных или неполных данных.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 shrink-0 mt-0.5">—</span>
                  <span>Потребовать удаления ваших данных (право на забвение).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 shrink-0 mt-0.5">—</span>
                  <span>Отозвать согласие на обработку персональных данных.</span>
                </li>
              </ul>
              <p>
                Для реализации своих прав направьте запрос на email:{" "}
                <a href="mailto:maks.gpt@gmail.com" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                  maks.gpt@gmail.com
                </a>
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">7. Cookies и аналитика</h2>
              <p>
                Сайт использует файлы cookie для обеспечения работы функций и сбора аналитики.
                Cookie — это небольшие файлы, которые сохраняются в вашем браузере.
              </p>
              <p>
                Мы используем Яндекс Метрику для анализа посещаемости. Данные собираются
                в обезличенном виде. Вы можете отключить cookies в настройках браузера,
                однако это может повлиять на работу некоторых функций Сайта.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">8. Изменения Политики</h2>
              <p>
                Оператор вправе вносить изменения в настоящую Политику. При существенных
                изменениях дата редакции в заголовке обновляется. Продолжение использования
                Сайта после обновления Политики означает ваше согласие с новой редакцией.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">9. Контактная информация</h2>
              <p>
                По вопросам обработки персональных данных обращайтесь:
              </p>
              <ul className="space-y-1 ml-4">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 shrink-0">Email:</span>
                  <a href="mailto:maks.gpt@gmail.com" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                    maks.gpt@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 shrink-0">Сайт:</span>
                  <span>aidabusiness.ru</span>
                </li>
              </ul>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
