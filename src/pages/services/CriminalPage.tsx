import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Building2,
  FileSearch,
  Gavel,
  Landmark,
  MapPin,
  Mail,
  Phone,
  Scale,
  Search,
  Shield,
  Users
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BreadcrumbSchema, FAQPageSchema, JsonLd } from "@/components/JsonLd";
import { SITE } from "@/config/site";
import { cases as allCases, type Case } from "@/data/cases";
import { teamMembers } from "@/data/team";
import TelegramIcon from "@/components/icons/TelegramIcon";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import MaxIcon from "@/components/icons/MaxIcon";
import lawyerConsultationBg from "@/assets/legal/lawyer-consultation-bg.webp";

const CTA_BUTTON_CLASS =
  "h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] px-6 text-[14px] font-semibold text-white shadow-[0_8px_18px_rgba(111,83,15,0.28)] hover:border-[#a8831a] hover:bg-[#b8911f]";

const RED_BUTTON_CLASS =
  "h-12 rounded-[12px] border border-red-700 bg-red-600 px-6 text-[14px] font-semibold text-white shadow-[0_8px_18px_rgba(127,29,29,0.25)] hover:border-red-800 hover:bg-red-700";

const truncateText = (value: string, maxLength: number) =>
  value.length > maxLength ? `${value.slice(0, maxLength).trim()}...` : value;

const formatCaseDate = (isoDate: string) =>
  new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(isoDate));

const CriminalPage = () => {
  const canonical = new URL("/services/criminal", SITE.url).toString();
  const callHref = `tel:${SITE.phoneRaw}`;
  const contactsHref = "/kontakty";
  const whatsappUrl = SITE.whatsappUrl;
  const telegramUrl = SITE.telegramUrl;
  const maxUrl = SITE.maxUrl;
  const hasSecondaryPhone = Boolean(SITE.messengerPhone && SITE.messengerPhoneRaw);
  const lyutikov = teamMembers.find((member) => member.slug === "lyutikov");

  const heroFacts = [
    "Статус коллегии адвокатов г. Москвы",
    "Срочный выезд адвоката к задержанному",
    "Опыт защиты по делам любой сложности"
  ];

  const heroTrustItems = [
    { text: "Работаем в Москве и Московской области", accent: true },
    { text: "Защита по делам высокой сложности", accent: false },
    { text: "Командная работа коллегии", accent: true }
  ];

  const emergencySituations = [
    {
      title: "Задержание и первый допрос",
      description: "Подключаемся до дачи показаний.",
      icon: FileSearch
    },
    {
      title: "Обыск дома или в офисе",
      description: "Контролируем законность действий следствия.",
      icon: Search
    },
    {
      title: "Возбуждение уголовного дела",
      description: "Анализируем материалы и риски обвинения.",
      icon: Scale
    },
    {
      title: "Мера пресечения",
      description: "Готовим позицию для суда.",
      icon: Gavel
    },
    {
      title: "Экономические преступления",
      description: "Мошенничество, растрата, служебные составы.",
      icon: Building2
    },
    {
      title: "Преступления против личности",
      description: "Вред здоровью, конфликты, тяжкие последствия.",
      icon: Users
    },
    {
      title: "Наркотические статьи",
      description: "Защита по тяжким составам.",
      icon: Shield
    },
    {
      title: "Дело уже в суде",
      description: "Выстраиваем позицию и оспариваем доказательства.",
      icon: Landmark
    }
  ];

  const trustCards = [
    {
      title: "Срочное подключение",
      description: "Подключаемся при задержании, обыске, вызове на допрос или риске ареста.",
      points: ["Выезд к задержанному", "Первичная позиция"],
      icon: AlertTriangle
    },
    {
      title: "Опыт следственной работы",
      description: "Понимаем, как формируется обвинительная версия и какие документы становятся ключевыми.",
      points: ["Логика следствия", "Слабые места обвинения"],
      icon: FileSearch
    },
    {
      title: "Защита на всех стадиях",
      description: "Подключаемся от доследственной проверки и задержания до суда и апелляции.",
      points: ["Проверка", "Суд"],
      icon: Scale
    },
    {
      title: "Работа с доказательствами",
      description: "Проверяем протоколы, заключения экспертов, показания и порядок их получения.",
      points: ["Допустимость", "Нарушения"],
      icon: Search
    },
    {
      title: "Мера пресечения",
      description: "Готовим позицию, чтобы снизить риск заключения под стражу или добиться более мягкой меры.",
      points: ["Домашний арест", "Подписка или запрет"],
      icon: Shield
    },
    {
      title: "Конфиденциальная стратегия",
      description: "Информация о деле остается в рамках защиты, а тактика выбирается под конкретные материалы.",
      points: ["Анализ материалов", "План защиты"],
      icon: Gavel
    }
  ];

  const criminalCaseConfigs = [
    {
      id: "23",
      title: "СИЗО заменено на домашний арест",
      article: "ч. 3 ст. 111 УК РФ",
      court: "Таганский районный суд г. Москвы"
    },
    {
      id: "22",
      title: "Возврат уголовного дела прокурору",
      article: "ч. 3 ст. 159 УК РФ",
      court: "Люблинский районный суд г. Москвы"
    },
    {
      id: "21",
      title: "Незаконные действия следствия — имущество возвращено",
      article: "ст. 158 УК РФ",
      court: "Тупинский районный суд г. Москвы"
    },
    {
      id: "33",
      title: "Прекращение дела по краже",
      article: "ст. 158 УК РФ",
      court: "Реутовский городской суд Московской области"
    },
    {
      id: "35",
      title: "Прекращение дела о грабеже с судебным штрафом",
      article: "ч. 1 ст. 161 УК РФ",
      court: "Дорогомиловский районный суд г. Москвы"
    },
    {
      id: "30",
      title: "Дело по краже товаров Wildberries прекращено",
      article: "п. «а» ч. 2 ст. 158 УК РФ",
      court: "Подольский городской суд Московской области"
    }
  ];

  const criminalCases = criminalCaseConfigs
    .map((config) => {
      const caseItem = allCases.find((entry) => entry.id === config.id);
      if (!caseItem) return null;
      return { ...config, caseItem };
    })
    .filter(
      (item): item is { id: string; title: string; article: string; court: string; caseItem: Case } => Boolean(item)
    );

  const processSteps = [
    {
      number: 1,
      title: "Быстро выясняем статус",
      description: "Понимаем, человек свидетель, подозреваемый или обвиняемый.",
      details: ["Статус", "Срочность"]
    },
    {
      number: 2,
      title: "Проверяем документы",
      description: "Смотрим протоколы, постановления, повестки и уже подписанные объяснения.",
      details: ["Протоколы", "Постановления"]
    },
    {
      number: 3,
      title: "Согласуем позицию",
      description: "Определяем, что говорить, какие объяснения не давать и какие риски не создавать.",
      details: ["Допрос", "Объяснения"]
    },
    {
      number: 4,
      title: "Готовим ходатайства",
      description: "Заявляем документы, которые помогают фиксировать нарушения и защищать позицию.",
      details: ["Жалобы", "Ходатайства"]
    },
    {
      number: 5,
      title: "Участвуем в следствии",
      description: "Сопровождаем допросы, обыски, очные ставки, экспертизы и проверки показаний.",
      details: ["Следственные действия", "Замечания в протокол"]
    },
    {
      number: 6,
      title: "Защищаем в суде",
      description: "Оспариваем доказательства, допрашиваем свидетелей и добиваемся нужного результата.",
      details: ["Суд", "Апелляция"]
    }
  ];

  const riskItems = [
    "Не давайте показания без адвоката.",
    "Не подписывайте протокол, если не понимаете формулировки.",
    "Не соглашайтесь с квалификацией обвинения без анализа материалов.",
    "Не откладывайте защиту до суда: часть ошибок потом сложно исправить."
  ];

  const delayedLawyerRisks = [
    {
      title: "Дача показаний без адвоката",
      description:
        "Неправильно сформулированные объяснения могут быть использованы против вас и повлиять на квалификацию обвинения."
    },
    {
      title: "Фиксация доказательств без контроля защиты",
      description:
        "Протоколы осмотра, допроса и обыска оформляются так, как их фиксирует следствие. Позже доказать нарушения бывает крайне сложно."
    },
    {
      title: "Избрание строгой меры пресечения",
      description:
        "При отсутствии подготовленной позиции суд может выбрать заключение под стражу."
    },
    {
      title: "Признание доказательств допустимыми",
      description:
        "Если вовремя не заявить возражения и ходатайства, оспорить нарушения позже значительно сложнее."
    },
    {
      title: "Потеря процессуальных возможностей",
      description:
        "Не поданные вовремя жалобы, ходатайства и заявления могут быть утрачены без возможности восстановления."
    },
    {
      title: "Закрепление обвинительной версии в материалах дела",
      description:
        "Без активной линии защиты версия следствия закрепляется в материалах дела как основная."
    }
  ];

  const faqItems = [
    {
      question: "Можно ли звонить, если дело еще не возбуждено?",
      answer:
        "Да. Подключение на стадии проверки часто позволяет снизить риски еще до возбуждения уголовного дела."
    },
    {
      question: "Что делать, если меня вызвали на допрос?",
      answer:
        "Не идите на допрос без защитника. Сначала нужно согласовать позицию и понять, в каком статусе вас вызывают."
    },
    {
      question: "Можно ли изменить меру пресечения?",
      answer:
        "Да, при наличии оснований можно добиваться более мягкой меры: подписки, запрета действий или домашнего ареста."
    },
    {
      question: "Сколько стоит защита по уголовному делу?",
      answer:
        "Стоимость зависит от стадии, объема материалов и сложности дела. После анализа ситуации фиксируем формат работы."
    },
    {
      question: "Можно ли прекратить уголовное дело до суда?",
      answer:
        "Да, в ряде дел это возможно. Перспектива зависит от состава, доказательств, позиции потерпевшего и процессуальных нарушений."
    }
  ];

  const breadcrumbItems = [
    { name: "Главная", url: SITE.url },
    { name: "Услуги", url: new URL("/uslugi", SITE.url).toString() },
    { name: "Уголовные дела", url: canonical }
  ];

  const legalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${canonical}#service`,
    name: "Адвокат по уголовным делам",
    serviceType: "Защита по уголовным делам",
    url: canonical,
    inLanguage: "ru-RU",
    areaServed: SITE.areaServed,
    telephone: SITE.phone,
    email: SITE.email,
    provider: {
      "@type": "Organization",
      "@id": `${SITE.url}#organization`,
      name: SITE.name,
      url: SITE.url,
      telephone: SITE.phone,
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        addressCountry: SITE.address.country,
        addressLocality: SITE.address.city,
        streetAddress: SITE.address.street,
        postalCode: SITE.address.postal
      }
    }
  };

  return (
    <div className="criminal-mobile-compact min-h-screen flex flex-col services-page category-landing-page criminal-compact">
      <Helmet>
        <title>Адвокат по уголовным делам в Москве | Профзащита</title>
        <meta
          name="description"
          content="Защита по уголовным делам в Москве: задержание, обыск, мера пресечения, следствие и суд. Срочное подключение адвоката, конфиденциально."
        />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:title" content="Адвокат по уголовным делам в Москве | Профзащита" />
        <meta
          property="og:description"
          content="Срочная защита при задержании, обыске и возбуждении дела. Работаем на всех стадиях уголовного процесса."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={SITE.ogImage} />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="Профзащита" />
      </Helmet>

      <JsonLd data={legalServiceSchema} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQPageSchema items={faqItems} url={canonical} />

      <Header />

      <main className="flex-1 services-page">
        <section
          className="criminal-hero section section--hero relative overflow-hidden text-white"
          style={{
            backgroundImage: `url(${lawyerConsultationBg})`,
            backgroundSize: "cover",
            backgroundPosition: "right center"
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, rgba(6,14,30,0.96) 0%, rgba(11,27,52,0.9) 52%, rgba(12,29,56,0.72) 100%)"
            }}
          />
          <div className="container relative z-10">
            <div className="criminal-breadcrumb inline-flex flex-wrap items-center gap-2 rounded-[8px] border border-[#244166] bg-[#132e53]/80 px-4 py-2 text-sm text-white/85">
              <Link to="/" className="hover:text-white">
                Главная
              </Link>
              <span className="text-white/45">›</span>
              <Link to="/uslugi" className="hover:text-white">
                Услуги
              </Link>
              <span className="text-white/45">›</span>
              <span className="text-white font-medium">Уголовные дела</span>
            </div>

            <div className="criminal-hero-layout mt-6 md:hidden">
              <div className="criminal-hero-content mx-auto max-w-4xl space-y-5 text-center">
                <h1 className="category-hero-title text-[clamp(2.1rem,3.4vw,3.2rem)] leading-[1.05] font-bold text-[#C9A227]">
                  Адвокат по уголовным делам
                </h1>
                <p className="text-xl leading-tight font-semibold text-white md:text-3xl">
                  Срочная защита при задержании, обыске и возбуждении дела
                </p>
                <p className="mx-auto max-w-3xl text-base leading-relaxed text-white/92 md:text-lg">
                  Согласуйте позицию до показаний и подписания протоколов. Первые действия часто определяют ход дела.
                </p>

                <div className="criminal-hero-facts mx-auto max-w-3xl space-y-3 pt-2 text-left">
                  <p className="text-xl font-semibold text-white md:text-2xl">Строго конфиденциально</p>
                  <ul className="criminal-hero-facts-list list-disc space-y-2 pl-8 text-base leading-relaxed text-white/95 md:text-lg marker:text-white">
                    {heroFacts.map((fact) => (
                      <li key={fact}>{fact}</li>
                    ))}
                  </ul>
                </div>

                <div className="criminal-hero-lawyer-mobile mx-auto">
                  <div className="criminal-hero-lawyer-mobile__photo">
                    <img
                      src={lyutikov?.photo ?? "/images/team/lyutikov-ivan.jpg"}
                      alt={lyutikov?.name ?? "Лютиков Иван Иванович"}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-lg font-semibold leading-tight text-white">
                      {lyutikov?.name ?? "Лютиков Иван Иванович"}
                    </p>
                    <p className="mt-1 text-sm leading-snug text-white/80">Адвокат, председатель коллегии</p>
                    <p className="mt-2 text-sm font-semibold leading-snug text-[#C9A227]">
                      18 лет службы в следствии
                      <br />
                      8 лет адвокатской практики
                      <br />
                      170+ дел с положительным результатом
                    </p>
                  </div>
                </div>

                <div className="mx-auto max-w-3xl space-y-2 pt-1">
                  <Button asChild size="lg" className={`${RED_BUTTON_CLASS} w-full`}>
                    <a href={callHref}>Позвонить адвокату сейчас</a>
                  </Button>
                  <p className="text-base font-medium text-white/90 md:text-lg">Подключимся к делу немедленно</p>
                </div>

              </div>
            </div>

            <div className="mt-6 hidden grid-cols-1 gap-8 md:grid md:grid-cols-[minmax(0,1fr)_300px] md:items-start lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="max-w-5xl space-y-6">
                <h1 className="category-hero-title text-[clamp(2.1rem,3.4vw,3.05rem)] font-bold leading-[1.08] text-[#C9A227]">
                  Адвокат по уголовным делам
                </h1>
                <p className="text-xl font-semibold leading-tight text-white md:text-3xl lg:text-[2rem]">
                  Срочная защита при задержании, обыске и возбуждении дела
                </p>
                <p className="max-w-4xl text-base leading-relaxed text-white/95 md:text-lg">
                  Защищаем подозреваемых и обвиняемых на всех стадиях:
                  <br />
                  от доследственной проверки и задержания до суда и апелляции.
                </p>

                <div className="space-y-3 pt-2">
                  <p className="text-xl font-semibold text-white md:text-2xl">Строго конфиденциально</p>
                  <ul className="list-disc space-y-1 pl-8 text-base leading-relaxed text-white/95 md:text-lg marker:text-white">
                    {heroFacts.map((fact) => (
                      <li key={fact}>{fact}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 pt-3">
                  <Button asChild size="lg" className={`${CTA_BUTTON_CLASS} w-full sm:w-auto`}>
                    <a href={callHref}>Позвонить адвокату сейчас</a>
                  </Button>
                  <p className="text-sm text-white/90 md:text-base">Подключимся к делу немедленно</p>
                </div>

                <p className="pt-2 text-xl font-medium text-white md:text-3xl">
                  Не давайте показания без адвоката!
                  <br />
                  <span className="text-white/90">Ошибки на первых этапах могут стать решающими.</span>
                </p>

                <div className="flex max-w-full flex-wrap items-center gap-y-2 overflow-hidden pt-1 text-sm text-white/90 md:flex-nowrap md:text-[13px] lg:text-[14px] xl:text-[15px]">
                  {heroTrustItems.map((item, index) => (
                    <span
                      key={item.text}
                      className={`min-w-0 whitespace-nowrap ${index > 0 ? "before:mx-2 before:text-white/70 before:content-['•'] lg:before:mx-3" : ""}`}
                    >
                      <span className={item.accent ? "text-[#C9A227]" : "text-white"}>{item.text}</span>
                    </span>
                  ))}
                </div>
              </div>

              <Card className="mx-auto w-full max-w-[320px] overflow-hidden rounded-[12px] border border-[#D8C08B] bg-[#F6F1E6] text-slate-900 md:mx-0 md:max-w-[300px] md:justify-self-end lg:max-w-[320px]">
                <CardContent className="p-0">
                  <div className="h-[240px] w-full overflow-hidden md:h-[260px]">
                    <img
                      src={lyutikov?.photo ?? "/images/team/lyutikov-ivan.jpg"}
                      alt={lyutikov?.name ?? "Лютиков Иван Иванович"}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="px-5 py-4 text-center">
                    <h3 className="text-[1.65rem] font-semibold leading-[1.1] tracking-[-0.01em] md:text-[1.75rem]">
                      {lyutikov?.name ?? "Лютиков Иван Иванович"}
                    </h3>
                    <p className="mt-2 text-[0.98rem] leading-[1.28] text-slate-700">
                      Адвокат, Председатель коллегии
                    </p>
                    <div className="mt-4 space-y-1 text-[0.96rem] font-semibold leading-[1.26]">
                      <p>18 лет службы в следственных органах</p>
                      <p>8 лет адвокатской практики</p>
                      <p>170+ дел с положительным результатом</p>
                    </div>
                    <p className="mt-4 text-[0.95rem] leading-[1.3] text-slate-700">
                      Регистрационный номер в реестре
                      <br />
                      адвокатов г. Москвы № 77/17732
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </section>

        <section id="criminal-urgent" className="section bg-muted/30">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                Ситуации, в которых нельзя оставаться без адвоката
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-[18px]">
                Подключаемся на любой стадии — от проверки и задержания до суда и апелляции.
                <br className="hidden md:block" />
                Каждая минута может повлиять на исход дела.
              </p>
            </div>

            <div className="criminal-emergency-grid mx-auto mt-6 grid max-w-6xl gap-3 md:mt-10 md:gap-6 md:grid-cols-2 xl:grid-cols-4">
              {emergencySituations.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="rounded-[12px] border border-[#D8C08B] bg-[#F6F1E6] shadow-[0_8px_18px_rgba(15,23,42,0.06)]">
                    <CardContent className="flex h-full items-start gap-3 p-4 text-left md:flex-col md:items-center md:p-6 md:text-center">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center text-[#C9A227] md:mb-5 md:h-16 md:w-16">
                        <Icon className="h-8 w-8 md:h-12 md:w-12" strokeWidth={1.8} />
                      </div>
                      <div className="min-w-0 md:contents">
                        <h3 className="text-[15px] font-bold leading-snug text-slate-900 md:text-[17px]">{item.title}</h3>
                        <p className="mt-1 text-[13px] leading-snug text-slate-600 md:mt-4 md:min-h-[72px] md:text-[15px] md:leading-relaxed">{item.description}</p>
                      </div>
                      <Button asChild size="lg" className={`${CTA_BUTTON_CLASS} mt-auto hidden w-full md:inline-flex`}>
                        <a href={callHref}>Позвонить адвокату</a>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="mx-auto mt-12 max-w-3xl text-center">
              <p className="text-base font-medium leading-relaxed text-slate-600 md:text-[18px]">
                Не уверены, к какой ситуации относится ваш случай?
                <br />
                Позвоните — оценим риски по телефону.
              </p>
              <Button asChild size="lg" className={`${CTA_BUTTON_CLASS} mt-6 w-full sm:w-auto`}>
                <a href={callHref}>Позвонить адвокату</a>
              </Button>
              <p className="mt-12 text-[20px] font-bold leading-tight text-slate-950">
                Ошибка на первых этапах может стать решающей!
              </p>
              <p className="mx-auto mt-4 max-w-4xl text-[15px] leading-relaxed text-slate-600 md:text-[17px]">
                Протокол допроса, объяснение, согласие с формулировками — всё это может повлиять на дальнейший ход дела.
                <br className="hidden md:block" />
                Не принимайте решений без консультации защитника.
              </p>
            </div>
          </div>
        </section>

        <section id="criminal-trust" className="criminal-trust-section section bg-white">
          <div className="container">
            <div className="criminal-trust-header mx-auto max-w-5xl text-center">
              <h2 className="font-serif text-h2-mobile font-bold leading-tight text-slate-950 md:text-h2">
                Почему нам доверяют в сложных уголовных делах
              </h2>
              <p className="mt-4 text-base font-medium leading-relaxed text-slate-500 md:text-[18px]">
                Коллегия адвокатов г. Москвы
                <br />
                Работаем системно: стратегия, доказательства, защита в суде.
              </p>
            </div>

            <div className="criminal-trust-grid mx-auto mt-14 grid max-w-6xl gap-x-14 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
              {trustCards.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="criminal-trust-item text-center">
                    <Icon className="criminal-trust-icon mx-auto h-14 w-14 text-[#C9A227]" strokeWidth={1.8} />
                    <div className="criminal-trust-copy">
                      <h3 className="mx-auto mt-8 max-w-[340px] text-[21px] font-bold leading-tight text-slate-950 md:text-[23px]">
                        {item.title}
                      </h3>
                      <p className="mx-auto mt-5 max-w-[340px] text-[15px] font-medium leading-relaxed text-slate-600 md:text-[16px]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-16 text-center">
              <p className="text-[17px] font-medium leading-relaxed text-slate-600 md:text-[18px]">
                Не откладывайте защиту. Ошибки на ранних этапах могут повлиять на исход дела.
              </p>
              <div className="mt-6 hidden items-center gap-3 text-[20px] font-bold text-slate-950 md:inline-flex">
                <Phone className="h-7 w-7 text-[#C9A227]" />
                <span>Позвонить адвокату сейчас:</span>
                <a href={callHref} className="mango-phone transition-colors hover:text-[#b8911f]">
                  {SITE.phone}
                </a>
              </div>
              <Button asChild size="lg" className={`${CTA_BUTTON_CLASS} mt-6 w-full md:hidden`}>
                <a href={callHref}>Позвонить адвокату сейчас</a>
              </Button>
            </div>
          </div>
        </section>

        <section id="criminal-cases" className="section">
          <div className="container max-w-[1280px]">
            <div className="section__header mx-auto max-w-4xl text-center">
              <h2 className="mb-4 font-serif text-h2-mobile font-bold md:text-h2">
                Реальные результаты по уголовным делам
              </h2>
              <p className="text-body-mobile text-muted-foreground md:text-body">
                Прекращение дел, изменение меры пресечения, возврат дел прокурору, освобождение из-под стражи.
                <br className="hidden md:block" />
                Публикуем фрагменты судебных актов без раскрытия персональных данных доверителей.
              </p>
            </div>

            <div className="criminal-cases-grid section__content mt-10 grid grid-cols-1 gap-8 md:mt-14 md:grid-cols-2 xl:grid-cols-3">
              {criminalCases.map(({ id, title, article, court, caseItem }) => {
                const decisionPreview = caseItem.documents?.[0] ?? caseItem.decisionPreview;

                return (
                  <Card
                    key={id}
                    className="criminal-case-card relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-[12px] border border-[#C9A227] bg-[#F6F1E6] transition-all hover:shadow-elegant"
                  >
                    <CardContent className="flex h-full flex-col px-5 pb-6 pt-20 md:px-7 md:pb-7">
                      <div className="absolute right-6 top-5 hidden sm:flex">
                        <div className="flex h-[132px] w-[94px] overflow-hidden border border-[#bfbfbf] bg-white shadow-sm">
                          {decisionPreview ? (
                            <img
                              src={decisionPreview}
                              alt={`Скан решения по делу: ${caseItem.title}`}
                              className="h-full w-full object-contain p-1"
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center px-3 text-center text-[14px] text-muted-foreground">
                              Скан решения
                            </div>
                          )}
                        </div>
                      </div>

                      <h3 className="max-w-[70%] text-[18px] font-bold leading-tight text-slate-950 md:text-[19px]">
                        <Link to={`/keisy#${caseItem.slug}`} className="transition-colors hover:text-[#b8911f]">
                          {title}
                        </Link>
                      </h3>

                      <div className="mt-6 space-y-4 text-[14px] leading-relaxed text-slate-700 md:text-[15px]">
                        <p>
                          <span className="font-bold text-slate-950">Статья:</span> {article}
                          <br />
                          <span className="font-bold text-slate-950">Суд:</span> {court}
                        </p>
                        <p>
                          <span className="font-bold text-slate-950">Что сделали:</span>
                          <br />
                          {truncateText(caseItem.actions, 180)}
                        </p>
                        <p>
                          <span className="font-bold text-slate-950">Результат:</span>
                          <br />
                          <span className="font-semibold text-slate-950">{truncateText(caseItem.result, 180)}</span>
                        </p>
                      </div>

                      <div className="mt-auto flex justify-center pt-6">
                        <Button asChild size="lg" className={`${CTA_BUTTON_CLASS} w-full md:w-auto`}>
                          <Link to={`/keisy#${caseItem.slug}`}>Посмотреть кейс</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="mt-14 text-center">
              <p className="text-[20px] font-bold leading-tight text-slate-950">
                Ваша ситуация может быть похожей
              </p>
              <p className="mx-auto mt-5 max-w-3xl text-[15px] leading-relaxed text-slate-600 md:text-[17px]">
                Ошибки следствия, нарушения процедуры, неточности в обвинении — это основания для защиты.
              </p>
              <p className="mt-5 text-[17px] font-bold text-slate-950">Не принимайте решения без консультации адвоката</p>
              <Button asChild size="lg" className={`${CTA_BUTTON_CLASS} mt-7 w-full sm:w-auto`}>
                <a href={callHref}>Позвонить адвокату сейчас</a>
              </Button>
              <p className="mt-3 text-sm text-slate-500">Консультация по телефону. Строго конфиденциально</p>
            </div>
          </div>
        </section>

        <section id="criminal-process" className="section bg-[#F8FAFC]">
          <div className="container max-w-[1120px]">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="font-serif text-h2-mobile font-bold md:text-h2">
                Как выстраивается защита по уголовному делу
              </h2>
              <p className="mt-4 text-body-mobile leading-relaxed text-muted-foreground md:text-body">
                Работаем на всех стадиях: от доследственной проверки до суда и апелляции.
              </p>
            </div>

            <div className="criminal-process-grid mx-auto mt-12 max-w-5xl">
              {processSteps.map((step) => (
                <div key={step.number} className="border-t border-slate-300 py-5 last:border-b">
                  <div className="flex gap-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D8C08B] bg-[#F6F1E6] text-base font-semibold text-[#C9A227]">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-[17px] font-bold leading-tight text-slate-950">{step.title}</h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-slate-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-10 max-w-4xl text-center">
              <p className="text-[19px] leading-relaxed text-slate-700 md:text-[20px]">
                Стратегия защиты определяется <span className="font-bold text-slate-950">индивидуально</span>. В уголовном процессе решают детали.
                        <br />
                Ошибки, допущенные на первых этапах, могут определить исход дела.
              </p>
              <div className="mt-8 inline-flex max-w-full items-center gap-2 whitespace-nowrap text-[15px] font-bold text-slate-950 sm:text-[16px] md:gap-3 md:text-[18px]">
                <Phone className="h-5 w-5 shrink-0 text-[#C9A227] md:h-7 md:w-7" />
                <span>Оценим по телефону:</span>
                <a href={callHref} className="mango-phone transition-colors hover:text-[#b8911f]">
                  {SITE.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="criminal-risks" className="criminal-delayed-risks section bg-white">
          <div className="container max-w-[1120px]">
            <div className="criminal-delayed-risks__header mx-auto max-w-5xl text-center">
              <h2 className="font-serif text-h2-mobile font-bold leading-tight text-slate-950 md:text-h2">
                Что происходит, если не подключить адвоката вовремя
              </h2>
              <p className="mt-4 text-body-mobile font-medium leading-relaxed text-muted-foreground md:text-body">
                Первые решения по делу принимаются в кратчайшие сроки.
                <br className="hidden md:block" />
                Исправлять допущенные ошибки потом значительно сложнее.
              </p>
            </div>

            <div className="criminal-delayed-risks__list mx-auto mt-12 grid max-w-5xl gap-4">
              {delayedLawyerRisks.map((item) => (
                <div key={item.title} className="criminal-delayed-risks__item flex gap-6">
                  <AlertTriangle className="criminal-delayed-risks__icon mt-1 h-7 w-7 shrink-0 text-[#C9A227]" strokeWidth={2.2} />
                  <div>
                    <h3 className="text-[17px] font-bold leading-tight text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[15px] font-medium leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="criminal-delayed-risks__summary mx-auto mt-12 max-w-4xl text-center">
              <p className="text-[20px] font-bold leading-tight text-slate-950">
                Каждый процессуальный шаг влияет на дальнейший ход дела.
              </p>
              <p className="mt-4 text-[15px] font-medium leading-relaxed text-slate-600 md:text-[17px]">
                Не принимайте решений и не подписывайте документы без консультации адвоката.
                      </p>
              <Button asChild size="lg" className={`${CTA_BUTTON_CLASS} mt-7 w-full sm:w-auto`}>
                <a href={callHref}>Позвонить адвокату сейчас</a>
              </Button>
            </div>
          </div>
        </section>

        <section id="criminal-faq" className="section bg-muted/30">
          <div className="container max-w-[1120px]">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                Частые вопросы
              </h2>
            </div>
            <Accordion type="single" collapsible className="criminal-faq-list mx-auto mt-8 max-w-4xl space-y-3">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  value={`faq-${index}`}
                  className="overflow-hidden rounded-2xl border border-[#d7c28b] bg-white px-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)] md:px-6"
                >
                  <AccordionTrigger className="family-accordion-trigger faq-question text-left text-[16px] font-semibold text-foreground hover:no-underline hover:text-[#b8911f] data-[state=open]:text-[#b8911f] md:text-[20px] [&>svg]:text-[#c9a227]">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-body-mobile leading-relaxed text-muted-foreground md:text-body">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section id="criminal-contacts" className="section bg-[#f8fafc]">
          <div className="container max-w-[1240px]">
            <Card className="border-[#d7c28b] bg-white shadow-[0_14px_36px_rgba(15,23,42,0.08)]">
              <CardContent className="p-6 md:p-10">
                <div className="grid grid-cols-1 gap-10">
                  <div className="space-y-6">
                    <h2 className="font-serif text-[30px] font-bold leading-tight text-foreground md:text-[36px]">
                      Контакты
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 text-foreground">
                        <Phone className="h-7 w-7 text-accent" />
                        <div className="flex flex-col items-start text-[18px] font-medium leading-snug md:text-[21px]">
                          <a href={`tel:${SITE.phoneRaw}`} className="mango-phone transition-colors hover:text-accent">
                            {SITE.phone}
                          </a>
                          {hasSecondaryPhone && (
                            <a href={`tel:+${SITE.messengerPhoneRaw}`} className="transition-colors hover:text-accent">
                              {SITE.messengerPhone}
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-foreground">
                        <Mail className="h-7 w-7 text-accent" />
                        <a
                          href={`mailto:${SITE.email}`}
                          className="text-[18px] font-medium leading-snug transition-colors hover:text-accent md:text-[21px]"
                        >
                          {SITE.email}
                        </a>
                      </div>
                      <div className="flex items-start gap-4 text-foreground">
                        <MapPin className="mt-0.5 h-7 w-7 text-accent" />
                        <p className="text-[18px] font-medium leading-snug md:text-[21px]">
                          {SITE.address.city}, {SITE.address.street}
                        </p>
                      </div>
                    </div>
                    <div className="pt-2">
                      <p className="text-[17px] font-medium leading-tight text-foreground md:text-[18px]">
                        Или напишите нам напрямую:
                      </p>
                      <div className="mt-5 flex flex-wrap items-center gap-4">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Написать в WhatsApp"
                          className="social-icon social-icon--whatsapp shadow-sm transition-opacity hover:opacity-90"
                        >
                          <WhatsAppIcon size={48} variant="original" className="social-icon__image" />
                        </a>
                        <a
                          href={telegramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Написать в Telegram"
                          className="social-icon bg-[#229ED9] text-white shadow-sm transition-colors hover:bg-[#1d8fc6]"
                        >
                          <TelegramIcon size={26} className="social-icon__svg" />
                        </a>
                        <a
                          href={maxUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="MAX"
                          className="social-icon social-icon--max shadow-sm transition-opacity hover:opacity-90"
                        >
                          <MaxIcon size={48} className="social-icon__image" />
                        </a>
                        <a
                          href={`mailto:${SITE.email}`}
                          aria-label="Написать на email"
                          className="social-icon border border-slate-200 bg-white text-accent shadow-sm transition-colors hover:border-[#C9A227] hover:text-[#b8911f]"
                        >
                          <Mail className="h-6 w-6" />
                        </a>
                      </div>
                    </div>
                    <div className="pt-3">
                      <a
                        href="https://yandex.ru/maps/-/CHXU5RzE"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center whitespace-nowrap rounded-2xl bg-primary px-4 py-3 text-[15px] font-semibold text-white md:hidden"
                      >
                        Открыть в Яндекс.Картах
                      </a>
                      <iframe
                        src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=244880896695"
                        width="100%"
                        height="300"
                        frameBorder="0"
                        allowFullScreen
                        title="Мы на карте Яндекс"
                        className="hidden w-full rounded-xl border border-[#e6d8ab] md:block"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CriminalPage;
