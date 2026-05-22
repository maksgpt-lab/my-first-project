import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type UseCase = {
  title: string;
  description: string;
  prompt: string;
};

type Profession = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  headlineAccent: string;
  subheadline: string;
  painPoints: { icon: string; title: string; text: string }[];
  useCases: UseCase[];
  courses: { slug: string; title: string; description: string }[];
  result: string;
};

const professions: Record<string, Profession> = {
  marketolog: {
    title: "Маркетолог",
    metaTitle: "ChatGPT для маркетолога — готовые промпты и курсы",
    metaDescription:
      "Контент-план на месяц за 20 минут, продающие тексты, рекламные объявления и email-рассылки с помощью ChatGPT. Практические курсы на русском.",
    headline: "Контент-план на месяц —",
    headlineAccent: "за 20 минут",
    subheadline:
      "Маркетологи используют ChatGPT для написания постов, создания рекламных объявлений и email-кампаний. Без копирайтера. Без ожидания.",
    painPoints: [
      {
        icon: "📅",
        title: "Контент-план съедает день",
        text: "Придумать темы, написать посты, согласовать — это часы работы каждую неделю. ChatGPT делает это за 20 минут.",
      },
      {
        icon: "✍️",
        title: "Тексты получаются «не те»",
        text: "Либо слишком официально, либо слишком общо. Правильный промпт даёт текст в нужном тоне с первого раза.",
      },
      {
        icon: "📊",
        title: "Анализ конкурентов — вручную",
        text: "Сбор данных, сравнение, выводы — часы работы. ChatGPT структурирует анализ за минуты.",
      },
    ],
    useCases: [
      {
        title: "Контент-план на месяц",
        description: "30 идей для постов под любую нишу за одну итерацию",
        prompt:
          "Составь контент-план на месяц для [ниша бизнеса]. Аудитория: [описание]. Каналы: [Instagram/Telegram/VK]. Нужно 20 тем с форматом (пост/сторис/видео) и кратким описанием. Чередуй: полезный контент, развлекательный, продающий в пропорции 60/20/20.",
      },
      {
        title: "Продающий текст по AIDA",
        description: "Внимание → Интерес → Желание → Действие за 2 минуты",
        prompt:
          "Напиши продающий текст для [продукт/услуга] по формуле AIDA. Целевая аудитория: [описание]. Главная боль клиента: [боль]. Основное преимущество: [преимущество]. Призыв к действию: [что сделать]. Объём: 150-200 слов.",
      },
      {
        title: "Рекламное объявление",
        description: "5 вариантов заголовков для таргета или контекста",
        prompt:
          "Придумай 5 вариантов заголовков для рекламного объявления [продукт]. Аудитория: [описание]. Задача объявления: [клики/заявки/узнаваемость]. Для каждого заголовка напиши краткий текст объявления (до 90 символов) и призыв к действию.",
      },
      {
        title: "Email для реактивации клиентов",
        description: "Письмо для базы которая давно не покупала",
        prompt:
          "Напиши email для реактивации клиентов которые не покупали 3-6 месяцев. Компания: [название]. Продукт: [что продаём]. Тон: дружелюбный, без давления. Структура: напоминание о себе → что нового → специальное предложение → CTA. 150-200 слов. 3 варианта темы письма.",
      },
    ],
    courses: [
      {
        slug: "ai-dlya-marketinga",
        title: "AI для маркетинга",
        description:
          "Контент-план, продающие тексты, реклама и email-маркетинг с ChatGPT.",
      },
      {
        slug: "chatgpt-dlya-biznesa",
        title: "ChatGPT для бизнеса",
        description: "Основы работы с AI — с чего начать и как получать нужный результат.",
      },
    ],
    result:
      "Маркетолог который умеет работать с ChatGPT производит контент в 5-10 раз быстрее — и тратит это время на стратегию, а не на рутину.",
  },

  rukovoditel: {
    title: "Руководитель",
    metaTitle: "ChatGPT для руководителя — управление, делегирование, аналитика",
    metaDescription:
      "Регламенты за 15 минут, анализ без аналитика, делегирование и найм с ChatGPT. Практические курсы для руководителей на русском.",
    headline: "Управляй стратегией,",
    headlineAccent: "а не тонни в рутине",
    subheadline:
      "Руководители используют ChatGPT для написания регламентов, подготовки отчётов и найма сотрудников. Освобождай 2-3 часа каждый день.",
    painPoints: [
      {
        icon: "📋",
        title: "Регламенты и инструкции — вечно нет времени",
        text: "Сотрудники делают «как понимают» потому что инструкций нет. ChatGPT пишет регламент за 15 минут.",
      },
      {
        icon: "👥",
        title: "Найм затягивается на месяцы",
        text: "Написать вакансию, разобрать резюме, подготовить вопросы — это дни работы. AI сокращает до часа.",
      },
      {
        icon: "📈",
        title: "Отчёты и аналитика вручную",
        text: "Собрать цифры, найти тренды, сформулировать выводы — всё это ChatGPT делает из твоих данных за минуты.",
      },
    ],
    useCases: [
      {
        title: "Регламент для сотрудника",
        description: "Пошаговая инструкция по любому процессу за 15 минут",
        prompt:
          "Напиши пошаговый регламент для сотрудника на должности [должность] по процессу [процесс]. Формат: нумерованный список шагов, к каждому шагу — что именно делать, в каком инструменте, на что обратить внимание. В конце — чек-лист для самопроверки.",
      },
      {
        title: "Вакансия которую читают",
        description: "Текст объявления о найме с правильной структурой",
        prompt:
          "Напиши вакансию для [должность] в компании [описание компании]. Задачи: [список]. Требования: [список]. Тон: профессиональный, но живой. Структура: крючок в первом абзаце → задачи → что предлагаем → требования → как откликнуться. Без канцелярщины.",
      },
      {
        title: "Вопросы для интервью",
        description: "20 вопросов которые реально показывают кандидата",
        prompt:
          "Составь список из 20 вопросов для интервью на позицию [должность]. Раздели на блоки: опыт и навыки, мотивация, ситуационные кейсы, культурное соответствие. Для каждого вопроса укажи что именно проверяет этот вопрос.",
      },
      {
        title: "Анализ данных и выводы",
        description: "Из сырых цифр — в понятный отчёт с рекомендациями",
        prompt:
          "Проанализируй следующие данные: [вставь данные]. Найди ключевые тренды, аномалии и точки роста. Сформулируй 3-5 конкретных выводов и рекомендации что делать дальше. Формат: краткое резюме → детальный анализ → рекомендации.",
      },
    ],
    courses: [
      {
        slug: "ai-dlya-operatsionki",
        title: "AI для операционки",
        description: "Регламенты, делегирование, найм и отчёты с помощью ChatGPT.",
      },
      {
        slug: "svoya-ai-sistema",
        title: "Своя AI-система",
        description: "Выстрой персональную систему автоматизации под свой бизнес.",
      },
    ],
    result:
      "Руководитель с AI-системой тратит на операционку в 3 раза меньше времени — и может заниматься тем что реально двигает бизнес вперёд.",
  },

  prodazhi: {
    title: "Продажи",
    metaTitle: "ChatGPT для продаж — скрипты, КП и работа с возражениями",
    metaDescription:
      "Скрипты продаж, персональные КП, работа с возражениями и реактивация клиентов с ChatGPT. Практические курсы на русском языке.",
    headline: "Скрипт продаж",
    headlineAccent: "за 10 минут",
    subheadline:
      "Менеджеры по продажам используют ChatGPT для написания скриптов, подготовки КП и работы с возражениями. Больше сделок — меньше стресса.",
    painPoints: [
      {
        icon: "📞",
        title: "Скрипты устарели или их нет",
        text: "Каждый менеджер продаёт по-своему. ChatGPT создаёт скрипт под любую ситуацию: холодный звонок, встреча, мессенджер.",
      },
      {
        icon: "😤",
        title: "Возражения «дорого» и «подумаю» ставят в тупик",
        text: "Не знаешь как ответить — теряешь клиента. ChatGPT даёт 5-10 вариантов ответа на любое возражение.",
      },
      {
        icon: "📄",
        title: "КП пишется часами",
        text: "Персональное коммерческое предложение под каждого клиента — это долго. AI делает за 5 минут.",
      },
    ],
    useCases: [
      {
        title: "Скрипт холодного звонка",
        description: "Структура разговора с незнакомым клиентом",
        prompt:
          "Напиши скрипт холодного звонка для продажи [продукт/услуга]. Целевой клиент: [описание]. Цель звонка: [записать на встречу/выявить интерес/продать]. Включи: открытие (зацепить за 10 секунд), выявление потребности (3 вопроса), презентацию (2-3 преимущества), закрытие. Добавь варианты ответов на «не интересно» и «перезвоните позже».",
      },
      {
        title: "Ответы на возражения",
        description: "5 вариантов на «дорого», «подумаю», «уже работаем с другими»",
        prompt:
          "Дай 5 вариантов ответа на возражение «[возражение]» при продаже [продукт]. Каждый вариант должен: не спорить с клиентом, выяснять реальную причину, возвращать к ценности продукта. Тон: уверенный, но не агрессивный.",
      },
      {
        title: "Персональное КП",
        description: "Коммерческое предложение под конкретного клиента",
        prompt:
          "Напиши коммерческое предложение для [название компании клиента]. Наш продукт: [описание]. Проблема клиента которую решаем: [проблема]. Структура: обращение по имени → понимание их ситуации → наше решение → результаты которые получат → цена и условия → призыв к действию. Объём: 1 страница.",
      },
      {
        title: "Follow-up после встречи",
        description: "Письмо которое держит контакт тёплым",
        prompt:
          "Напиши follow-up письмо после встречи с клиентом [описание клиента]. Мы обсудили: [ключевые темы]. Следующий шаг: [что договорились]. Тон: дружелюбный, деловой. Не навязчивый. Включи краткое резюме встречи и чёткий следующий шаг.",
      },
    ],
    courses: [
      {
        slug: "ai-dlya-prodazh",
        title: "AI для продаж",
        description: "Скрипты, работа с возражениями, КП и квалификация лидов с ChatGPT.",
      },
      {
        slug: "chatgpt-dlya-biznesa",
        title: "ChatGPT для бизнеса",
        description: "Основы работы с AI — как правильно формулировать запросы.",
      },
    ],
    result:
      "Менеджер по продажам с ChatGPT готовится к звонку в 5 раз быстрее и закрывает больше сделок — потому что всегда знает что сказать.",
  },

  hr: {
    title: "HR",
    metaTitle: "ChatGPT для HR — вакансии, интервью и онбординг",
    metaDescription:
      "Вакансии которые читают, вопросы для интервью, адаптация новых сотрудников с ChatGPT. Практические курсы для HR на русском.",
    headline: "Закрывай вакансии",
    headlineAccent: "в два раза быстрее",
    subheadline:
      "HR-специалисты используют ChatGPT для написания вакансий, подготовки интервью и онбординга новых сотрудников. Меньше рутины — больше работы с людьми.",
    painPoints: [
      {
        icon: "📝",
        title: "Вакансии не привлекают нужных кандидатов",
        text: "Шаблонный текст — шаблонные отклики. ChatGPT пишет вакансию которая цепляет именно тех кого ищешь.",
      },
      {
        icon: "🎯",
        title: "Интервью проходят без структуры",
        text: "Разные менеджеры спрашивают разное, сравнить кандидатов сложно. AI готовит структурированный список вопросов.",
      },
      {
        icon: "🚀",
        title: "Онбординг занимает недели",
        text: "Новый сотрудник долго входит в курс дела. ChatGPT создаёт гайды и чек-листы для быстрой адаптации.",
      },
    ],
    useCases: [
      {
        title: "Вакансия которую читают",
        description: "Текст объявления который привлекает нужных кандидатов",
        prompt:
          "Напиши текст вакансии для [должность] в компании [описание]. Задачи: [список]. Требования: [список]. Условия: [зарплата, формат работы]. Начни с сильного крючка — почему интересно работать именно у нас. Избегай канцелярщины и клише типа «стрессоустойчивость» и «коммуникабельность».",
      },
      {
        title: "Вопросы для структурированного интервью",
        description: "Набор вопросов для объективной оценки кандидата",
        prompt:
          "Составь 15 вопросов для интервью на должность [должность]. Блоки: профессиональные компетенции (5 вопросов), поведенческие ситуации (5 вопросов), мотивация и ценности (5 вопросов). Для каждого вопроса укажи: что проверяет, хороший ответ выглядит как, красные флаги.",
      },
      {
        title: "Онбординг-план на первые 30 дней",
        description: "Структурированный план адаптации нового сотрудника",
        prompt:
          "Создай план онбординга для нового сотрудника на должности [должность]. Неделя 1: знакомство и ориентация. Неделя 2-3: погружение в задачи. Неделя 4: первые самостоятельные результаты. Для каждого периода: задачи, кто помогает, ожидаемый результат, чек-лист.",
      },
      {
        title: "Отказ кандидату",
        description: "Корректное письмо об отказе которое сохраняет репутацию",
        prompt:
          "Напиши вежливое письмо об отказе кандидату на позицию [должность]. Имя кандидата: [имя]. Причина отказа (для внутреннего использования): [причина]. Письмо должно: поблагодарить за время, дать нейтральную обратную связь без деталей, оставить дверь открытой на будущее. Тон: уважительный, без шаблонных фраз.",
      },
    ],
    courses: [
      {
        slug: "ai-dlya-operatsionki",
        title: "AI для операционки",
        description: "Найм, регламенты и управление командой с помощью ChatGPT.",
      },
      {
        slug: "chatgpt-dlya-biznesa",
        title: "ChatGPT для бизнеса",
        description: "Основы работы с AI — как правильно формулировать запросы.",
      },
    ],
    result:
      "HR с ChatGPT закрывает вакансии быстрее, проводит более структурированные интервью и тратит меньше времени на рутинные документы.",
  },

  buhgalter: {
    title: "Бухгалтер",
    metaTitle: "ChatGPT для бухгалтера — документы, письма и объяснения",
    metaDescription:
      "Деловые письма, объяснительные записки, шаблоны документов и ответы на запросы с ChatGPT. Практические курсы для бухгалтеров на русском.",
    headline: "Деловые письма",
    headlineAccent: "за 2 минуты",
    subheadline:
      "Бухгалтеры используют ChatGPT для составления деловых писем, объяснительных записок и шаблонов документов. Меньше времени на текст — больше на цифры.",
    painPoints: [
      {
        icon: "✉️",
        title: "Деловые письма занимают много времени",
        text: "Ответить на запрос, написать претензию, объяснить ситуацию — каждое письмо это 20-30 минут. ChatGPT делает за 2 минуты.",
      },
      {
        icon: "📑",
        title: "Шаблоны документов устаревают",
        text: "Поддерживать актуальную библиотеку шаблонов сложно. AI генерирует нужный документ под конкретную ситуацию.",
      },
      {
        icon: "🔍",
        title: "Объяснить сложное простыми словами",
        text: "Руководитель не понимает бухгалтерских терминов. ChatGPT переводит сложное в понятное без потери точности.",
      },
    ],
    useCases: [
      {
        title: "Деловое письмо контрагенту",
        description: "Любое деловое письмо в правильном формате за 2 минуты",
        prompt:
          "Напиши деловое письмо от [название компании] компании [получатель]. Тема: [тема]. Суть: [что нужно сообщить/запросить]. Тон: официальный, но не сухой. Структура: обращение → суть вопроса → что ожидаем от получателя → контакты. Без канцелярских штампов.",
      },
      {
        title: "Объяснительная записка",
        description: "Чёткое объяснение ситуации для руководства или контролирующих органов",
        prompt:
          "Напиши объяснительную записку по ситуации: [описание ситуации]. От кого: [должность]. Кому: [кому адресовано]. Факты: [что произошло]. Причины: [почему это произошло]. Меры: [что сделано или будет сделано]. Официальный стиль, без лишних слов.",
      },
      {
        title: "Объяснение для руководителя",
        description: "Перевести бухгалтерские термины на понятный язык",
        prompt:
          "Объясни простыми словами для руководителя без бухгалтерского образования: [сложная тема или ситуация]. Используй аналогии из обычной жизни. Избегай профессиональных терминов или объясняй их. Объём: 3-5 предложений.",
      },
      {
        title: "Ответ на претензию",
        description: "Грамотный ответ на претензию от контрагента или клиента",
        prompt:
          "Составь официальный ответ на претензию: [суть претензии]. Наша позиция: [позиция компании]. Ответ должен: признать факт обращения, изложить нашу позицию со ссылкой на документы/договор, предложить решение или объяснить почему требования неправомерны. Официальный стиль.",
      },
    ],
    courses: [
      {
        slug: "chatgpt-dlya-biznesa",
        title: "ChatGPT для бизнеса",
        description: "Основы работы с AI — деловые тексты, документы, коммуникация.",
      },
      {
        slug: "prompt-inzhiniring",
        title: "Промпт-инжиниринг",
        description: "Как формулировать запросы чтобы получать точный и нужный результат.",
      },
    ],
    result:
      "Бухгалтер с ChatGPT тратит в разы меньше времени на деловую переписку и документы — и может сосредоточиться на профессиональных задачах.",
  },
};

export async function generateStaticParams() {
  return Object.keys(professions).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const prof = professions[slug];
  if (!prof) return {};
  return {
    title: prof.metaTitle,
    description: prof.metaDescription,
  };
}

export default async function ForProfessionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prof = professions[slug];
  if (!prof) notFound();

  return (
    <div className="bg-[#0C0A08] min-h-screen">
      <Header />

      <main className="overflow-hidden">

        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-center dot-grid">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="animate-aurora absolute -top-60 -right-60 w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[120px]" />
            <div className="animate-aurora absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-600/15 blur-[100px]" style={{ animationDelay: "4s" }} />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 py-28 w-full">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full mb-8 tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                ChatGPT для {prof.title === "Продажи" ? "отдела продаж" : prof.title === "HR" ? "HR" : prof.title.toLowerCase() + "а"}
              </span>
            </div>

            <h1 className="animate-fade-up-d1 text-4xl sm:text-6xl lg:text-[72px] font-bold tracking-tight leading-[1.05] text-white max-w-3xl">
              {prof.headline}
              <br />
              <span className="gradient-text">{prof.headlineAccent}</span>
            </h1>

            <p className="animate-fade-up-d2 mt-7 text-base sm:text-xl text-white/40 max-w-2xl leading-relaxed font-light">
              {prof.subheadline}
            </p>

            <div className="animate-fade-up-d3 mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/courses/${prof.courses[0].slug}`}
                className="btn-glow text-white px-8 py-4 rounded-2xl text-lg font-bold"
              >
                Начать бесплатно →
              </Link>
              <Link
                href="/prompts"
                className="glass-dark text-white/70 hover:text-white px-8 py-4 rounded-2xl text-lg font-medium transition-colors"
              >
                Смотреть промпты
              </Link>
            </div>
            <p className="animate-fade-up-d3 mt-4 text-sm text-white/25">
              Первые 3 урока бесплатно · Без регистрации
            </p>
          </div>

          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0C0A08] to-transparent" />
        </section>

        {/* Pain points */}
        <section className="bg-[#0C0A08] py-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase mb-4">Узнаёшь себя?</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Что отнимает больше всего времени
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {prof.painPoints.map((p) => (
                <div key={p.title} className="glass-dark rounded-3xl p-8 border border-white/[0.07]">
                  <div className="text-3xl mb-5">{p.icon}</div>
                  <h3 className="font-bold text-white text-lg mb-3">{p.title}</h3>
                  <p className="text-white/40 leading-relaxed text-[15px]">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use cases with prompts */}
        <section className="bg-[#0C0A08] pb-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase mb-4">Попробуй прямо сейчас</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Готовые промпты — копируй и используй
              </h2>
              <p className="text-white/35 mt-4 text-base max-w-lg mx-auto">
                Подставь свои данные вместо [скобок] — и получи результат за 30 секунд.
              </p>
            </div>
            <div className="space-y-5">
              {prof.useCases.map((uc, i) => (
                <div key={i} className="glass-dark rounded-3xl p-8 border border-white/[0.07]">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="shrink-0 w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-amber-500">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg leading-snug">{uc.title}</h3>
                      <p className="text-white/35 text-sm mt-1">{uc.description}</p>
                    </div>
                  </div>
                  <div className="bg-[#120D07] rounded-2xl p-5 border border-white/[0.05]">
                    <p className="text-[11px] font-mono text-indigo-500/50 mb-3 uppercase tracking-widest">Промпт</p>
                    <p className="text-white/55 text-sm leading-relaxed font-mono">{uc.prompt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses */}
        <section className="bg-[#0C0A08] pb-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase mb-4">Углубись</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Курсы под твои задачи
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {prof.courses.map((course) => (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="card-hover gradient-border glass-dark rounded-3xl p-8 block group"
                >
                  <div className="flex items-start justify-between mb-5">
                    <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                      3 урока бесплатно
                    </span>
                    <span className="text-white/20 group-hover:text-amber-500 transition-colors text-lg">↗</span>
                  </div>
                  <h3 className="font-bold text-white text-xl group-hover:gradient-text transition-all mb-3 leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-white/40 leading-relaxed text-[15px]">
                    {course.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Result + CTA */}
        <section className="bg-[#0C0A08] pb-28">
          <div className="max-w-5xl mx-auto px-6">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 gradient-bg opacity-90" />
              <div className="absolute inset-0 dot-grid opacity-20" />
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
              <div className="relative z-10 px-8 py-20 text-center">
                <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-4">Результат</p>
                <p className="text-xl sm:text-2xl font-medium text-white mb-10 max-w-2xl mx-auto leading-relaxed">
                  {prof.result}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href={`/courses/${prof.courses[0].slug}`}
                    className="inline-block bg-white text-amber-600 px-9 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-colors shadow-2xl"
                  >
                    Начать бесплатно →
                  </Link>
                  <Link
                    href="/courses"
                    className="inline-block bg-white/10 text-white border border-white/20 px-9 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-colors"
                  >
                    Все курсы
                  </Link>
                </div>
                <p className="mt-5 text-white/40 text-sm">Без регистрации · Без карты · Первые 3 урока бесплатно</p>
              </div>
            </div>
          </div>
        </section>

        {/* Other professions */}
        <section className="bg-[#0C0A08] pb-24">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase mb-6 text-center">
              Для других специалистов
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {Object.entries(professions)
                .filter(([s]) => s !== slug)
                .map(([s, p]) => (
                  <Link
                    key={s}
                    href={`/for/${s}`}
                    className="glass-dark text-white/50 hover:text-white border border-white/[0.07] hover:border-amber-500/30 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                  >
                    ChatGPT для {p.title === "Продажи" ? "продаж" : p.title === "HR" ? "HR" : p.title.toLowerCase() + "а"} →
                  </Link>
                ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
