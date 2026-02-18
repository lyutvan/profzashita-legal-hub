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

const CARD_BUTTON_CLASS =
  "h-11 rounded-[10px] border border-[#b8911f] bg-[#C9A227] px-5 text-[14px] font-semibold text-white shadow-[0_6px_14px_rgba(111,83,15,0.24)] hover:border-[#a8831a] hover:bg-[#b8911f]";

const truncateText = (value: string, maxLength: number) =>
  value.length > maxLength ? `${value.slice(0, maxLength).trim()}...` : value;

const CriminalPage = () => {
  const canonical = new URL("/services/criminal", SITE.url).toString();
  const callHref = `tel:${SITE.phoneRaw}`;
  const contactsHref = "/kontakty";
  const whatsappUrl = "https://wa.me/74950040196";
  const telegramUrl = "https://t.me/profzashita_consult_bot";
  const maxUrl = "https://max.ru";
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
      description:
        "Важно подключиться до дачи показаний. Ошибки на этом этапе могут стать решающими.",
      icon: FileSearch
    },
    {
      title: "Обыск дома или в офисе",
      description:
        "Контроль законности действий следствия, фиксация нарушений, защита интересов.",
      icon: Search
    },
    {
      title: "Возбуждение уголовного дела",
      description:
        "Анализ материалов, формирование стратегии защиты с первых дней.",
      icon: Scale
    },
    {
      title: "Избрание меры пресечения",
      description:
        "Подготовка позиции для суда. Работаем над подпиской, домашним арестом или освобождением.",
      icon: Gavel
    },
    {
      title: "Экономические и должностные преступления",
      description:
        "Мошенничество, растрата, злоупотребление, служебные составы.",
      icon: Building2
    },
    {
      title: "Преступления против личности",
      description:
        "Причинение вреда здоровью, конфликты, обвинения с тяжкими последствиями.",
      icon: Users
    },
    {
      title: "Наркотические статьи",
      description:
        "Защита при хранении, сбыте и обвинениях по тяжким составам.",
      icon: Shield
    },
    {
      title: "Вы уже стали обвиняемым",
      description:
        "Подготовка линии защиты, работа с доказательствами, защита в суде.",
      icon: Landmark
    }
  ];

  const trustCards = [
    {
      title: "Опыт работы в следственных органах",
      description:
        "18 лет службы в следствии — понимаем механику обвинения изнутри и знаем, как выстраивается процесс.",
      icon: FileSearch
    },
    {
      title: "Защита на всех стадиях",
      description:
        "От доследственной проверки и задержания до суда и апелляции. Подключаемся на любом этапе.",
      icon: Scale
    },
    {
      title: "Работаем против сильной стороны",
      description:
        "Если против вас следственный комитет, прокуратура или экономические подразделения — выстраиваем защиту с учетом ресурсов обвинения.",
      icon: Landmark
    },
    {
      title: "Строгая конфиденциальность",
      description:
        "Адвокатская тайна. Информация не покидает рамки защиты.",
      icon: Shield
    },
    {
      title: "Командная работа коллегии",
      description:
        "Над делом работает не один специалист, а команда с разной специализацией. Это усиливает позицию в суде.",
      icon: Users
    },
    {
      title: "Индивидуальная стратегия",
      description:
        "Каждое дело требует своей тактики и анализа рисков. Мы не используем шаблонные решения.",
      icon: Gavel
    }
  ];

  const criminalCaseConfigs = [
    {
      id: "23",
      title: "СИЗО заменено на домашний арест",
      article: "ч. 3 ст. 111 УК РФ (умышленное причинение тяжкого вреда здоровью)",
      court: "Таганский районный суд г. Москвы"
    },
    {
      id: "22",
      title: "Возврат уголовного дела прокурору",
      article: "ч. 3 ст. 159 УК РФ (мошенничество в крупном размере)",
      court: "Люблинский районный суд г. Москвы"
    },
    {
      id: "21",
      title: "Незаконные действия следствия — имущество возвращено",
      article: "ст. 158 УК РФ (хищение имущества)",
      court: "Тупинский районный суд г. Москвы"
    },
    {
      id: "33",
      title: "Прекращение дела по краже",
      article: "несколько эпизодов по ст. 158 УК РФ",
      court: "Реутовский городской суд Московской области"
    },
    {
      id: "35",
      title: "Прекращение дела о грабеже с назначением судебного штрафа",
      article: "ч. 1 ст. 161 УК РФ (грабеж)",
      court: "Дорогомиловский районный суд г. Москвы"
    },
    {
      id: "30",
      title: "Дело по краже товаров Wildberries — прекращено",
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
      title: "Срочный анализ ситуации",
      description:
        "Изучаем материалы, протоколы, постановления. Определяем процессуальные нарушения и риски."
    },
    {
      number: 2,
      title: "Формирование правовой позиции",
      description:
        "Разрабатываем стратегию защиты: оспаривание обвинения, изменение квалификации или смягчение меры пресечения."
    },
    {
      number: 3,
      title: "Работа на стадии следствия",
      description:
        "Участие в допросах и следственных действиях. Заявление ходатайств и жалоб. Контроль допустимости доказательств."
    },
    {
      number: 4,
      title: "Защита в суде",
      description:
        "Оспариваем доказательства обвинения. Допрашиваем свидетелей. Обосновываем позицию защиты."
    },
    {
      number: 5,
      title: "Работа с мерой пресечения",
      description:
        "Добиваемся изменения меры пресечения или избрания более мягкой меры."
    },
    {
      number: 6,
      title: "Обжалование решений",
      description:
        "Подготовка апелляций и кассационных жалоб при необходимости."
    }
  ];

  const riskItems = [
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
        "Да. Подключение на стадии проверки часто позволяет не допустить возбуждения дела или снизить риски уже на старте."
    },
    {
      question: "Можно ли обсуждать ситуацию по телефону?",
      answer:
        "Да, первичную картину дела можно обсудить по телефону. Мы задаем уточняющие вопросы и говорим, какие действия нужны в первую очередь."
    },
    {
      question: "Что делать, если меня уже вызвали на допрос?",
      answer:
        "Не идите на допрос без защитника. Сначала согласуйте позицию с адвокатом и подготовьтесь к вопросам следствия."
    },
    {
      question: "Сколько стоит защита по уголовному делу?",
      answer:
        "Стоимость зависит от стадии, объема материалов и сложности дела. После анализа ситуации фиксируем формат и условия работы."
    },
    {
      question: "Если мера пресечения уже избрана, можно ли ее изменить?",
      answer:
        "Да, при наличии оснований можно добиваться изменения меры пресечения на более мягкую: подписку, запрет действий или домашний арест."
    },
    {
      question: "Можно ли прекратить уголовное дело до суда?",
      answer:
        "Да. Во многих случаях защита может добиться прекращения уголовного дела еще на стадии следствия. Решение зависит от обстоятельств дела и позиции защиты. Важно подключиться на раннем этапе."
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
    <div className="min-h-screen flex flex-col services-page category-landing-page criminal-compact">
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
          className="section section--hero relative overflow-hidden text-white"
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
                "linear-gradient(90deg, rgba(6,14,30,0.94) 0%, rgba(11,27,52,0.88) 48%, rgba(12,29,56,0.72) 100%)"
            }}
          />
          <div className="container relative z-10">
            <div className="inline-flex flex-wrap items-center gap-2 rounded-[8px] border border-[#244166] bg-[#132e53]/80 px-4 py-2 text-sm text-white/85">
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

            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_320px] md:items-start lg:grid-cols-[minmax(0,1fr)_340px]">
              <div className="max-w-5xl space-y-6">
                <h1 className="category-hero-title text-[clamp(2.1rem,3.4vw,3.05rem)] leading-[1.08] font-bold text-[#C9A227]">
                  Адвокат по уголовным делам
                </h1>
                <p className="text-xl leading-tight font-semibold text-white md:text-3xl lg:text-[2rem]">
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
                    <Link to={contactsHref}>Позвонить адвокату сейчас</Link>
                  </Button>
                  <p className="text-sm text-white/90 md:text-base">Подключимся к делу немедленно</p>
                </div>

                <p className="pt-2 text-xl font-medium text-white md:text-3xl">
                  Не давайте показания без адвоката!
                  <br />
                  <span className="text-white/90">Ошибки на первых этапах могут стать решающими.</span>
                </p>
              </div>

              <Card className="hidden w-full overflow-hidden rounded-[12px] border border-[#D8C08B] bg-[#F6F1E6] text-slate-900 md:block md:max-w-[340px] md:justify-self-end">
                <CardContent className="p-0">
                  <div className="h-[320px] w-full overflow-hidden">
                    <img
                      src={lyutikov?.photo ?? "/images/team/lyutikov-ivan.jpg"}
                      alt={lyutikov?.name ?? "Лютиков Иван Иванович"}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="px-5 py-5 text-center md:px-6">
                    <h3 className="text-[2rem] font-semibold leading-[1.1] tracking-[-0.01em]">
                      {lyutikov?.name ?? "Лютиков Иван Иванович"}
                    </h3>
                    <p className="mt-3 text-[1.05rem] leading-[1.28] text-slate-700">
                      Адвокат, Председатель коллегии
                    </p>
                    <div className="mt-5 space-y-1 text-[1.03rem] font-semibold leading-[1.26]">
                      <p>18 лет службы в следственных органах</p>
                      <p>8 лет адвокатской практики</p>
                      <p>170+ с положительным результатом</p>
                    </div>
                    <p className="mt-5 text-base leading-[1.3] text-slate-700">
                      Регистрационный номер в реестре
                      <br />
                      адвокатов г. Москвы № 77/17732
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-y-2 text-sm text-white/90 md:text-base">
              {heroTrustItems.map((item, index) => (
                <span
                  key={item.text}
                  className={`whitespace-nowrap ${index > 0 ? "before:content-['•'] before:mx-3 before:text-white/70" : ""}`}
                >
                  <span className={item.accent ? "text-[#C9A227]" : "text-white"}>
                    {item.text}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-muted/30">
          <div className="container">
            <div className="section__header mx-auto max-w-5xl text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                Ситуации, в которых нельзя оставаться без адвоката
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                Подключаемся на любой стадии — от проверки и задержания до суда и апелляции.
                <br />
                Каждая минута может повлиять на исход дела.
              </p>
            </div>

            <div className="section__content grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 auto-rows-fr">
              {emergencySituations.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="h-full rounded-[12px] border border-[#D8C08B] bg-[#F6F1E6]">
                    <CardContent className="h-full p-6 flex flex-col text-center">
                      <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full border border-[#D8C08B] text-[#C9A227]">
                        <Icon className="h-9 w-9" />
                      </div>
                      <h3 className="text-xl font-semibold leading-snug text-slate-900">{item.title}</h3>
                      <p className="mt-4 text-base leading-relaxed text-slate-700 flex-1">{item.description}</p>
                      <Button asChild size="lg" className={`${CARD_BUTTON_CLASS} mt-6 w-full`}>
                        <Link to={contactsHref}>Позвонить адвокату</Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="mt-10 text-center">
              <p className="text-base text-slate-700 md:text-lg">
                Не уверены, к какой ситуации относится ваш случай?
                <br />
                Позвоните — оценим риски по телефону.
              </p>
              <Button asChild size="lg" className={`${CTA_BUTTON_CLASS} mt-6 w-full sm:w-auto`}>
                <Link to={contactsHref}>Позвонить адвокату</Link>
              </Button>
              <p className="mt-8 text-xl font-semibold text-slate-900">
                Ошибка на первых этапах может стать решающей!
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-700 md:text-lg">
                Протокол допроса, объяснение, согласие с формулировками — всё это может повлиять на дальнейший ход
                дела.
                <br />
                Не принимайте решений без консультации защитника.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section__header mx-auto max-w-5xl text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                Почему нам доверяют в сложных уголовных делах
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                Коллегия адвокатов г. Москвы
                <br />
                Работаем системно: стратегия, доказательства, защита в суде.
              </p>
            </div>

            <div className="section__content grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr">
              {trustCards.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="text-center">
                    <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center text-[#C9A227]">
                      <Icon className="h-12 w-12" />
                    </div>
                    <h3 className="text-h3-mobile md:text-h3 font-semibold leading-snug text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-slate-700">{item.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center text-base leading-relaxed text-slate-700 md:text-lg">
              Не откладывайте защиту. Ошибки на ранних этапах могут повлиять на исход дела.
              <div className="mt-5">
                <a
                  href={callHref}
                  className="inline-flex items-center gap-3 text-xl font-semibold text-slate-900 hover:text-[#b8911f] md:text-2xl"
                >
                  <Phone className="h-7 w-7 text-[#C9A227]" />
                  Позвонить адвокату сейчас: {SITE.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-muted/30">
          <div className="container">
            <div className="section__header mx-auto max-w-5xl text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Реальные результаты по уголовным делам</h2>
              <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                Прекращение дел, изменение меры пресечения, возврат дел прокурору, освобождение из-под стражи.
                <br />
                Мы публикуем фрагменты судебных актов без раскрытия персональных данных доверителей.
              </p>
            </div>

            <div className="section__content grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr">
              {criminalCases.map(({ id, title, article, court, caseItem }) => {
                const caseHref = `/cases/${caseItem.slug}`;
                const previewUrl =
                  caseItem.decisionPreview ??
                  caseItem.documents?.[0] ??
                  "/cases/ugolovnoe-st159-domashnij-arest-2020-1.jpg";

                return (
                  <Card key={id} className="h-full rounded-[12px] border border-[#D8C08B] bg-[#F6F1E6]">
                    <CardContent className="h-full p-6 flex flex-col">
                      <div className="flex items-start gap-4">
                        <h3 className="flex-1 text-xl font-semibold leading-tight text-slate-900">
                          <Link to={caseHref} className="hover:text-[#b8911f] transition-colors">
                            {title}
                          </Link>
                        </h3>
                        <Link
                          to={caseHref}
                          className="flex h-28 w-24 shrink-0 items-center justify-center border border-[#D8C08B] bg-white hover:opacity-90"
                          aria-label={`Открыть кейс: ${title}`}
                        >
                          <img
                            src={previewUrl}
                            alt={`Скан решения: ${title}`}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </Link>
                      </div>

                      <div className="mt-4 space-y-1 text-sm text-slate-700 md:text-base">
                        <p>
                          <span className="font-semibold text-slate-900">Статья:</span> {article}
                        </p>
                        <p>
                          <span className="font-semibold text-slate-900">Суд:</span> {court}
                        </p>
                      </div>

                      <div className="mt-4 space-y-3 text-sm md:text-base leading-relaxed text-slate-700 flex-1">
                        <div>
                          <div className="font-semibold text-slate-900">Что сделали:</div>
                          <p>{truncateText(caseItem.actions, 230)}</p>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">Результат:</div>
                          <p className="font-medium text-slate-900">{truncateText(caseItem.result, 210)}</p>
                        </div>
                      </div>

                      <Button asChild size="lg" className={`${CARD_BUTTON_CLASS} mt-6 w-full`}>
                        <Link to={caseHref}>Подробнее о кейсе</Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="mt-10 text-center">
              <p className="text-xl font-semibold text-slate-900 md:text-2xl">Ваша ситуация может быть похожей</p>
              <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
                Ошибки следствия, нарушения процедуры, неточности в обвинении — это основания для защиты.
              </p>
              <p className="mt-3 text-xl font-semibold text-slate-900">Не принимайте решения без консультации адвоката</p>
              <Button asChild size="lg" className={`${CTA_BUTTON_CLASS} mt-6 w-full sm:w-auto`}>
                <Link to={contactsHref}>Позвонить адвокату сейчас</Link>
              </Button>
              <p className="mt-2 text-sm text-slate-600">Консультация по телефону. Строго конфиденциально</p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section__header mx-auto max-w-5xl text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Как выстраивается защита по уголовному делу</h2>
              <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                Работаем на всех стадиях: от доследственной проверки до суда и апелляции.
              </p>
            </div>

            <div className="section__content space-y-5">
              {processSteps.map((step) => (
                <div key={step.number} className="border-t border-[#D2D6DC] pt-5">
                  <div className="flex gap-5">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D8C08B] bg-[#F6F1E6] text-lg font-semibold text-[#C9A227]">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                      <p className="mt-1 text-base leading-relaxed text-slate-700">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-[#D2D6DC]" />
            </div>

            <div className="mt-10 text-center text-base leading-relaxed text-slate-700 md:text-lg">
              Стратегия защиты определяется <span className="font-semibold text-slate-900">индивидуально</span>.
              В уголовном процессе решают детали.
              <br />
              Ошибки, допущенные на первых этапах, могут определить исход дела.
              <div className="mt-5">
                <a
                  href={callHref}
                  className="inline-flex items-center gap-3 text-xl font-semibold text-slate-900 hover:text-[#b8911f] md:text-2xl"
                >
                  <Phone className="h-7 w-7 text-[#C9A227]" />
                  Получить оценку ситуации по телефону: {SITE.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-muted/30">
          <div className="container">
            <div className="section__header mx-auto max-w-5xl text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                Что происходит, если не подключить адвоката вовремя
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                Первые решения по делу принимаются в кратчайшие сроки.
                <br />
                Исправлять допущенные ошибки потом значительно сложнее.
              </p>
            </div>

            <div className="section__content mx-auto max-w-5xl space-y-5">
              {riskItems.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center text-[#C9A227]">
                    <AlertTriangle className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-base leading-relaxed text-slate-700">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-xl font-semibold text-slate-900 md:text-2xl">
                Каждый процессуальный шаг влияет на дальнейший ход дела.
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-700 md:text-lg">
                Не принимайте решений и не подписывайте документы без консультации адвоката.
              </p>
              <Button asChild size="lg" className={`${CTA_BUTTON_CLASS} mt-6 w-full sm:w-auto`}>
                <Link to={contactsHref}>Позвонить адвокату сейчас</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section__header mx-auto max-w-4xl text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">FAQ — Часто задаваемые вопросы по уголовным делам</h2>
            </div>
            <Accordion type="single" collapsible className="mx-auto max-w-4xl section__content space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  value={`faq-${index}`}
                  className="relative overflow-hidden rounded-xl border border-slate-200 px-6 transition-all hover:border-[#C9A227]/80 data-[state=open]:border-[#C9A227] before:absolute before:inset-y-3 before:left-0 before:w-1 before:rounded-full before:bg-transparent before:content-[''] before:transition-colors hover:before:bg-[#C9A227]/70 data-[state=open]:before:bg-[#C9A227]"
                >
                  <AccordionTrigger className="family-accordion-trigger py-4 text-left hover:no-underline hover:text-slate-900 data-[state=open]:text-[#b8911f]">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-10 text-center">
              <p className="text-base text-slate-700 md:text-lg">
                Если вы не нашли ответа на свой вопрос — позвоните адвокату и опишите ситуацию.
              </p>
              <Button asChild size="lg" className={`${CTA_BUTTON_CLASS} mt-6 w-full sm:w-auto`}>
                <Link to={contactsHref}>Позвонить сейчас</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="section bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start lg:gap-14">
              <div className="max-w-2xl space-y-5">
                <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                  Нужна защита по уголовному делу? Свяжитесь с адвокатом сейчас
                </h2>
                <p className="text-base leading-relaxed text-slate-700 md:text-lg">
                  Мы подключимся к ситуации и объясним, как действовать.
                  <br />
                  Консультация по телефону. Строго конфиденциально.
                </p>

                <div className="pt-2">
                  <p className="text-lg md:text-xl font-semibold text-slate-900">Или напишите нам напрямую:</p>
                  <div className="mt-3 flex items-center gap-4">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Написать в WhatsApp"
                      className="social-icon shadow-sm transition-opacity hover:opacity-90"
                    >
                      <WhatsAppIcon size={48} className="social-icon__image" />
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
                      className="social-icon shadow-sm transition-opacity hover:opacity-90"
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
              </div>

              <Card className="w-full rounded-[16px] border border-[#E5E7EB] bg-[#F8FAFC] shadow-[0_18px_40px_rgba(15,23,42,0.08)] lg:max-w-[420px]">
                <CardContent className="p-7 md:p-8">
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">Телефон для консультаций:</div>
                    <a
                      href={callHref}
                      className="inline-flex items-center gap-3 text-base font-semibold text-slate-900 hover:text-[#b8911f]"
                    >
                      <Phone className="h-6 w-6 text-[#C9A227]" />
                      {SITE.phone}
                    </a>
                    <Button asChild size="lg" className={`${CTA_BUTTON_CLASS} w-full`}>
                      <Link to={contactsHref}>Позвонить адвокату</Link>
                    </Button>
                    <p className="text-sm text-slate-600">Если дело уже возбуждено — не откладывайте звонок</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="section bg-muted/30">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Контакты</h2>
            </div>
            <div className="section__content grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-stretch">
              <div className="space-y-4">
                <Card className="border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Телефон</h3>
                        <a href={`tel:${SITE.phoneRaw}`} className="text-accent hover:underline">
                          {SITE.phone}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Почта</h3>
                        <a href={`mailto:${SITE.email}`} className="text-accent hover:underline">
                          {SITE.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Адрес</h3>
                        <p className="text-accent">Москва, ул. Дегунинская, д.1, к.2, офис 303</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="overflow-hidden rounded-xl border border-border min-h-[420px] lg:min-h-full">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=244880896695"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Карта офиса Профзащита"
                  className="h-full w-full"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CriminalPage;
