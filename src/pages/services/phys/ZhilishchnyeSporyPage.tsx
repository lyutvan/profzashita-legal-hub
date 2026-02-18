import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  Star,
  Phone,
  Mail,
  MapPin,
  Home,
  Scale,
  Building2,
  Users,
  Shield,
  FileSearch,
  Landmark,
  HelpCircle
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BreadcrumbSchema, FAQPageSchema, JsonLd } from "@/components/JsonLd";
import { SITE } from "@/config/site";
import { cases as allCases, type Case } from "@/data/cases";
import { teamMembers as allTeamMembers, type TeamMember } from "@/data/team";
import TelegramIcon from "@/components/icons/TelegramIcon";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import MaxIcon from "@/components/icons/MaxIcon";

import lawyerConsultationBg from "@/assets/legal/lawyer-consultation-bg.webp";

type TeamCardConfig = {
  slug: string;
  roleBadge: string;
  subtitle?: string;
  buttonLabel: string;
  specializations: string[];
};

const CTA_BUTTON_CLASS =
  "h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] px-6 text-[14px] font-semibold text-white shadow-[0_8px_18px_rgba(111,83,15,0.28)] hover:border-[#a8831a] hover:bg-[#b8911f]";

const CARD_BUTTON_CLASS =
  "h-11 rounded-[10px] border border-[#b8911f] bg-[#C9A227] px-5 text-[14px] font-semibold text-white shadow-[0_6px_14px_rgba(111,83,15,0.24)] hover:border-[#a8831a] hover:bg-[#b8911f]";

const ZhilishchnyeSporyPage = () => {
  const callHref = `tel:${SITE.phoneRaw}`;
  const contactsHref = "/kontakty";
  const whatsappUrl = "https://wa.me/74950040196";
  const telegramUrl = "https://t.me/profzashita_consult_bot";
  const maxUrl = "https://max.ru";
  const canonical = new URL("/services/phys/vyselenie", SITE.url).toString();
  const yandexOrgId = "244880896695";

  const heroTrustItems = [
    { text: "Работаем в Москве и Московской области", accent: true },
    { text: "Защита по делам высокой сложности", accent: false },
    { text: "Командная работа коллегии", accent: true }
  ];

  const situationCards = [
    {
      title: "Выселение и снятие с регистрации",
      description:
        "Если ставится вопрос о прекращении права проживания или принудительном выселении через суд. Важно подключиться до вынесения решения.",
      icon: Home
    },
    {
      title: "Признание утратившим право пользования",
      description:
        "Когда оспаривается законность проживания или инициируется выписка через суд. Работаем с доказательствами фактического проживания.",
      icon: FileSearch
    },
    {
      title: "Споры между собственниками",
      description:
        "Конфликты между родственниками, долевыми владельцами и супругами по порядку пользования и распределению прав.",
      icon: Users
    },
    {
      title: "Раздел долей в квартире",
      description:
        "Определение порядка проживания, выдел или выкуп доли, защита интересов в суде. Ошибочная стратегия может привести к потерям.",
      icon: Scale
    },
    {
      title: "Затопление квартиры",
      description:
        "Фиксация ущерба, формирование доказательной базы и взыскание компенсации. Без грамотной фиксации размер ущерба занижают.",
      icon: Shield
    },
    {
      title: "Пожар и повреждение имущества",
      description:
        "Оценка убытков, взаимодействие со страховой компанией, судебное взыскание реального ущерба и расходов.",
      icon: Landmark
    },
    {
      title: "Конфликт с управляющей компанией",
      description:
        "Оспаривание начислений и бездействия. Добиваемся перерасчёта и компенсации ущерба через суд.",
      icon: Building2
    },
    {
      title: "Незаконная перепланировка",
      description:
        "Защита при наложении штрафов, узаконивание изменений и оспаривание требований привести помещение в прежнее состояние.",
      icon: HelpCircle
    }
  ];

  const riskItems = [
    {
      title: "Неправильно выбранная позиция",
      description:
        "Самостоятельные объяснения, жалобы и заявления могут сформировать доказательственную базу против вас."
    },
    {
      title: "Потеря права на жильё",
      description:
        "При пропуске сроков или слабой позиции суд может прекратить право пользования помещением."
    },
    {
      title: "Заниженная компенсация ущерба",
      description:
        "Без правильной фиксации доказательств размер выплаты уменьшают в 2-3 раза."
    },
    {
      title: "Невыгодное судебное решение",
      description:
        "Если в процессе не заявлены ходатайства и доказательства, позже исправить ситуацию значительно сложнее."
    },
    {
      title: "Упущенные процессуальные возможности",
      description:
        "Пропущенные сроки обжалования, ошибки в иске или отзыве могут закрыть путь к защите."
    }
  ];

  const earlyBenefits = [
    "Зафиксировать доказательства правильно",
    "Выстроить стратегию до суда",
    "Усилить позицию в переговорах",
    "Минимизировать риски"
  ];

  const workSteps = [
    {
      title: "Консультация и анализ ситуации",
      description:
        "Изучаем документы, переписку, судебные акты, оцениваем риски и реальные перспективы дела."
    },
    {
      title: "Формирование стратегии",
      description:
        "Определяем тактику: переговоры, претензия, иск, встречный иск, обеспечительные меры."
    },
    {
      title: "Сбор и фиксация доказательств",
      description:
        "Оценка ущерба, экспертизы, свидетельские показания, документы, запросы — формируем сильную доказательственную базу."
    },
    {
      title: "Представительство в суде",
      description:
        "Защищаем позицию в процессе, заявляем ходатайства, работаем с возражениями второй стороны."
    },
    {
      title: "Обжалование при необходимости",
      description: "Апелляция, кассация — если решение требует корректировки."
    }
  ];

  const housingCaseConfigs = [
    { id: "44", label: "Отказ в признании утратившей право пользования по соцнайму" },
    { id: "54", label: "Возмещение ущерба от залива квартиры" }
  ];

  const housingCases = housingCaseConfigs
    .map((item) => {
      const caseItem = allCases.find((entry) => entry.id === item.id);
      const hasScans = Boolean(caseItem?.documents?.length || caseItem?.decisionPreview);
      if (!caseItem || !hasScans) return null;
      return { ...item, caseItem };
    })
    .filter((item): item is { id: string; label: string; caseItem: Case } => Boolean(item));

  const teamCardConfigs: TeamCardConfig[] = [
    {
      slug: "yulia-lyadova",
      roleBadge: "Адвокат",
      buttonLabel: "Подробнее об адвокате",
      specializations: [
        "Выселение и защита права проживания",
        "Снятие с регистрационного учета",
        "Споры о долях и разделе квартиры",
        "Имущественные споры между собственниками"
      ]
    },
    {
      slug: "ryzhenko",
      roleBadge: "Юрист",
      subtitle: "Помощник председателя коллегии",
      buttonLabel: "Подробнее о юристе",
      specializations: [
        "Споры с УК, ТСЖ и ресурсоснабжающими организациями",
        "Взыскание ущерба после затопления и пожара",
        "Претензионная работа и переговоры",
        "Подготовка доказательной базы для суда"
      ]
    },
    {
      slug: "sotnikov",
      roleBadge: "Адвокат",
      buttonLabel: "Подробнее об адвокате",
      specializations: [
        "Оспаривание сделок с недвижимостью",
        "Споры между собственниками и родственниками",
        "Судебная защита права собственности",
        "Сопровождение дел повышенной сложности"
      ]
    }
  ];

  const teamCards = teamCardConfigs
    .map((config) => {
      const member = allTeamMembers.find((item) => item.slug === config.slug);
      if (!member) return null;
      return { config, member };
    })
    .filter((item): item is { config: TeamCardConfig; member: TeamMember } => Boolean(item));

  const reviewCards = [
    {
      name: "Мария Л.",
      text: "Обратилась за помощью по делу о заливе квартиры. Юристы сразу объяснили порядок действий, помогли собрать акты и доказательства. Вопрос решили быстро, без лишних нервов."
    },
    {
      name: "Евгений С.",
      text: "Обращался по спору с управляющей компанией из-за начислений. Работа была выстроена четко по шагам, сделали перерасчет и добились результата в мою пользу."
    },
    {
      name: "Виктор А.",
      text: "Обратился по вопросу выселения и защиты права пользования жильем. Сам не понимал, как вести дело, но в коллегии все объяснили простым языком и довели до решения."
    },
    {
      name: "Екатерина К.",
      text: "После затопления квартиры соседи отказались добровольно возмещать ущерб. Подготовили документы, экспертизу и взыскали стоимость ремонта в полном объеме."
    },
    {
      name: "Андрей З.",
      text: "Сложный конфликт между собственниками по порядку пользования квартирой. Сразу выстроили правильную позицию, суд закрепил конкретные комнаты и спор снят."
    },
    {
      name: "Юлия Б.",
      text: "Обращалась по разделу лицевых счетов и оплате ЖКУ. Все сделали в законном порядке, добились ясного и понятного решения. Работа профессиональная и без лишних обещаний."
    }
  ];

  const trustAdvantageCards = [
    {
      title: "Коллегия адвокатов города Москвы",
      description:
        "Вы работаете не с частным юристом, а с коллегией. Это профессиональный статус, внутренняя ответственность и возможность подключить профильных адвокатов под задачу.",
      icon: Users
    },
    {
      title: "Судебная практика по сложным жилищным спорам",
      description:
        "Регулярно ведем дела о выселении, снятии с регистрации, разделе долей и взыскании ущерба. Понимаем, где чаще всего ломается позиция и заранее закрываем эти риски.",
      icon: Scale
    },
    {
      title: "Работаем против сильной стороны",
      description:
        "Если оппонент — управляющая компания, страховая или второй собственник с юристом, выстраиваем стратегию так, чтобы не дать перехватить инициативу.",
      icon: Shield
    },
    {
      title: "Индивидуальная стратегия под вашу ситуацию",
      description:
        "Жилищные споры зависят от деталей: фактическое проживание, регистрация, документы, перепланировки, расчеты ущерба. Мы строим позицию под конкретные обстоятельства.",
      icon: FileSearch
    },
    {
      title: "Делаем упор на доказательства",
      description:
        "Собираем и оформляем доказательства, расчеты, экспертизы. Наша задача — получить результат не только в суде первой инстанции, но и в апелляции.",
      icon: Landmark
    },
    {
      title: "Подключаемся быстро и ведем до результата",
      description:
        "Подключаемся на любой стадии: от первого конфликта до суда и апелляции. Объясняем перспективы и шаги простым языком, чтобы у клиента было ощущение контроля.",
      icon: Building2
    }
  ];

  const faqItems = [
    {
      question: "Можно ли выселить человека без права собственности?",
      answer:
        "Да, но не автоматически. Если человек не является собственником, но зарегистрирован или фактически проживает, в большинстве случаев потребуется судебное решение. Важно доказать прекращение права пользования и отсутствие оснований для проживания."
    },
    {
      question: "Как снять человека с регистрационного учета?",
      answer:
        "Через суд, если он не выписывается добровольно. Необходимо подтвердить, что человек не проживает, не участвует в оплате и утратил право пользования жилым помещением."
    },
    {
      question: "Как определить порядок пользования квартирой?",
      answer:
        "Суд закрепляет конкретные комнаты за каждым собственником с учетом долей, фактического проживания и интересов сторон. Без грамотно подготовленной позиции суд может отказать или закрепить неудобный вариант."
    },
    {
      question: "Что делать, если управляющая компания не выполняет обязанности?",
      answer:
        "Сначала фиксируются нарушения и направляется претензия. Если реакции нет — подается иск о понуждении к исполнению обязанностей или взыскании ущерба."
    },
    {
      question: "Как взыскать ущерб после залива квартиры?",
      answer:
        "Важно правильно зафиксировать ущерб, провести оценку и определить виновную сторону. Ошибки на этом этапе часто приводят к отказу в иске или заниженной компенсации."
    },
    {
      question: "Можно ли оспорить сделки или доли в квартире?",
      answer:
        "Да, если есть основания: нарушение прав, давление, недействительность сделки, злоупотребление правом. Такие дела требуют серьезной доказательной базы и процессуальной подготовки."
    }
  ];

  const breadcrumbItems = [
    { name: "Главная", url: SITE.url },
    { name: "Услуги", url: new URL("/uslugi", SITE.url).toString() },
    { name: "Физлицам", url: new URL("/services/phys", SITE.url).toString() },
    { name: "Жилищные споры и возмещение ущерба", url: canonical }
  ];

  const legalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${canonical}#service`,
    name: "Жилищные споры и возмещение ущерба",
    serviceType: "Жилищные споры и возмещение ущерба",
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
      },
      areaServed: SITE.areaServed
    }
  };

  const YandexRatingWidget = () => (
    <div className="category-yandex-badge mt-6 flex justify-center">
      <iframe
        src={`https://yandex.ru/sprav/widget/rating-badge/${yandexOrgId}?type=rating`}
        width="150"
        height="50"
        frameBorder="0"
        title="Рейтинг Профзащита в Яндекс.Картах"
        className="max-w-full"
      ></iframe>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col services-page category-landing-page">
      <Helmet>
        <title>Адвокаты по жилищным спорам и возмещению ущерба | Профзащита</title>
        <meta
          name="description"
          content="Жилищные споры и возмещение ущерба: выселение, регистрация, споры между собственниками, залив и пожар квартиры, споры с УК. Москва и МО."
        />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        <meta property="og:title" content="Адвокаты по жилищным спорам и возмещению ущерба | Профзащита" />
        <meta
          property="og:description"
          content="Жилищные споры и возмещение ущерба: защита права на жилье, взыскание компенсации, судебное сопровождение под ключ."
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
          className="section section--hero relative text-white"
          style={{
            backgroundImage: `url(${lawyerConsultationBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(6,14,30,0.92) 0%, rgba(13,34,63,0.86) 55%, rgba(15,37,66,0.78) 100%)"
            }}
          />
          <div className="container relative z-10">
            <Breadcrumbs
              items={[
                { label: "Услуги", path: "/uslugi" },
                { label: "Физическим лицам", path: "/services/phys" },
                { label: "Жилищные споры и возмещение ущерба" }
              ]}
            />
            <div className="mt-6 max-w-5xl space-y-6">
              <h1 className="category-hero-title text-h1-mobile md:text-h1 font-bold whitespace-normal break-words">
                Адвокаты по жилищным спорам и возмещению ущерба
              </h1>
              <p className="text-xl leading-tight font-semibold text-white md:text-3xl">
                Защитим ваше право на жильё и добьемся компенсации
              </p>
              <p className="max-w-4xl text-base leading-relaxed text-white/95 md:text-lg">
                Представляем интересы в судах по делам о выселении, праве пользования жильем, спорах между
                собственниками и взыскании значительных сумм ущерба.
              </p>

              <div className="space-y-3 pt-2">
                <p className="text-base leading-relaxed text-white/95 md:text-lg">Подключаемся на любой стадии конфликта</p>
                <ul className="list-disc pl-8 space-y-1 text-base leading-relaxed text-white/95 md:text-lg marker:text-white">
                  <li>угроза выселения или снятия с регистрационного учета</li>
                  <li>спор о праве пользования жилым помещением</li>
                  <li>конфликт между долевыми собственниками</li>
                  <li>взыскание ущерба после затопления или пожара</li>
                  <li>отказ в компенсации или незаконные действия управляющей компании</li>
                </ul>
              </div>

              <div className="space-y-2 pt-2">
                <Button asChild size="lg" className={`${CTA_BUTTON_CLASS} w-full sm:w-auto`}>
                  <Link to={contactsHref}>Позвонить адвокату</Link>
                </Button>
                <p className="text-sm text-white/90 md:text-base">Обсудим ситуацию и оценим перспективу спора</p>
              </div>
            </div>
          </div>
          <div className="container relative z-10 mt-8">
            <div className="flex flex-wrap items-center gap-y-2 text-sm md:text-base text-white/90">
              {heroTrustItems.map((item, index) => (
                <span
                  key={item.text}
                  className={`whitespace-nowrap ${index > 0 ? "before:content-['•'] before:mx-3 before:text-white/70" : ""} ${
                    item.accent ? "text-[#f2d37f]" : ""
                  }`}
                >
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section__header mx-auto max-w-5xl text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">В каких ситуациях мы подключаемся к защите</h2>
              <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                Подключаемся на любой стадии — от конфликта с соседями до суда о выселении.
                <br />
                Чем раньше начнем работу, тем выше шанс сохранить жилье и деньги.
              </p>
            </div>
            <div className="section__content grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6 auto-rows-fr">
              {situationCards.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.title}
                    className="h-full rounded-[12px] border border-[#D8C08B] bg-[#F6F1E6] shadow-[0_8px_20px_rgba(60,52,31,0.08)]"
                  >
                    <CardContent className="h-full p-6 flex flex-col items-center text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#d9b759]/70 text-[#C9A227]">
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-lg font-semibold leading-snug text-slate-900">{item.title}</h3>
                      <p className="mt-4 text-sm leading-relaxed text-slate-700 flex-1">{item.description}</p>
                      <Button asChild size="lg" className={`${CARD_BUTTON_CLASS} mt-6 w-full`}>
                        <Link to={contactsHref}>Позвонить адвокату</Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="mt-9 text-center text-base text-slate-600 md:text-lg">
              Каждый спор требует индивидуальной стратегии и грамотной процессуальной подготовки.
              <br />
              Если ваша ситуация отличается — позвоните нам и мы коротко разберем вашу ситуацию по телефону и подскажем,
              есть ли перспектива.
            </div>
          </div>
        </section>

        <section className="section bg-muted/30">
          <div className="container">
            <div className="section__header mx-auto max-w-5xl text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                Что может произойти, если не подключить адвоката вовремя
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                В жилищных спорах критичны первые шаги. Ошибки на старте могут определить исход дела.
              </p>
            </div>

            <div className="mx-auto max-w-5xl space-y-6">
              {riskItems.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#C9A227] text-lg font-bold text-[#C9A227]">
                    ×
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                    <p className="text-sm md:text-base text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-12 max-w-4xl text-center">
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900">Подключение адвоката на ранней стадии позволяет:</h3>
              <ul className="mt-4 inline-block list-disc pl-6 text-left text-base leading-relaxed text-slate-700">
                {earlyBenefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p className="mt-10 text-lg font-semibold text-slate-900 md:text-xl">
                Чем раньше вы подключите адвоката, тем больше возможностей сохранить жилье и деньги
              </p>
              <div className="mt-6 space-y-2">
                <Button asChild size="lg" className={`${CTA_BUTTON_CLASS} w-full sm:w-auto`}>
                  <Link to={contactsHref}>Позвонить и обсудить ситуацию</Link>
                </Button>
                <p className="text-sm text-slate-600">Коротко разберём ситуацию и скажем, есть ли перспектива</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section__header mx-auto max-w-5xl text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Как мы защищаем ваши интересы по жилищным спорам</h2>
              <p className="text-muted-foreground text-base md:text-lg">
                Работаем системно. Не просто подаем иск — выстраиваем позицию до результата.
              </p>
            </div>
            <div className="mx-auto max-w-5xl divide-y divide-slate-300 border-y border-slate-300">
              {workSteps.map((step, index) => (
                <div key={step.title} className="flex items-start gap-4 py-6">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#D8C08B] bg-[#F7F2E8] text-lg font-semibold text-[#C9A227]">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                    <p className="text-sm md:text-base text-slate-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center text-base text-slate-700 md:text-lg">
              Жилищные споры требуют точных процессуальных действий с самого начала.
              <br />
              <span className="font-semibold text-[#7e6220]">Чем раньше формируется позиция, тем больше возможностей повлиять на исход дела.</span>
              <div className="mt-5">
                <a href={callHref} className="inline-flex items-center gap-3 text-lg font-semibold text-slate-900 hover:text-[#b8911f]">
                  <Phone className="h-6 w-6 text-[#C9A227]" />
                  Обсудить ситуацию по телефону: {SITE.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-muted/30">
          <div className="container">
            <div className="section__header mx-auto max-w-4xl text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Реальные дела по жилищным спорам</h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Мы публикуем фрагменты судебных решений с соблюдением требований закона о персональных данных.
              </p>
            </div>

            <div className="section__content mx-auto grid max-w-[980px] grid-cols-1 gap-6 auto-rows-fr md:grid-cols-2">
              {housingCases.map(({ id, label, caseItem }) => {
                const previewUrl = caseItem.decisionPreview ?? caseItem.documents?.[0];
                const caseHref = `/cases/${caseItem.slug}`;
                return (
                  <Card key={id} className="h-full rounded-[12px] border border-[#D8C08B] bg-[#F6F1E6]">
                    <CardContent className="h-full p-6 flex flex-col">
                      <div className="flex items-start gap-4">
                        <h3 className="flex-1 text-xl font-semibold leading-tight text-slate-900">
                          <Link to={caseHref} className="hover:text-[#b8911f] transition-colors">
                            {label}
                          </Link>
                        </h3>
                        <Link
                          to={caseHref}
                          className="flex h-28 w-24 shrink-0 items-center justify-center border border-[#D8C08B] bg-white text-center text-sm text-slate-500 hover:opacity-90"
                          aria-label={`Открыть кейс: ${label}`}
                        >
                          <img
                            src={previewUrl}
                            alt={`Скан решения: ${label}`}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </Link>
                      </div>

                      <div className="mt-5 space-y-3 text-sm md:text-base leading-relaxed text-slate-700 flex-1">
                        <div>
                          <div className="font-semibold text-slate-900">Ситуация:</div>
                          <p>{caseItem.task}</p>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">Что сделали:</div>
                          <p>{caseItem.actions}</p>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">Результат:</div>
                          <p>{caseItem.result}</p>
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
              <p className="text-base text-slate-700 md:text-lg">
                Если у вас похожая ситуация — обсудим ее по телефону.
                <br />
                Коротко оценим перспективу спора и подскажем, как действовать дальше.
              </p>
              <Button asChild size="lg" className={`${CTA_BUTTON_CLASS} mt-6 w-full sm:w-auto`}>
                <Link to={contactsHref}>Позвонить и обсудить ситуацию</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section__header mx-auto max-w-4xl text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Кто будет вести ваше дело</h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Практикующие адвокаты коллегии с опытом судебной защиты по жилищным и имущественным спорам.
              </p>
            </div>
            <div className="section__content grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
              {teamCards.map(({ config, member }) => (
                <Card key={member.slug} className="h-full rounded-[12px] border border-[#D8C08B] bg-white">
                  <CardContent className="h-full p-6 flex flex-col text-center">
                    <div className="mx-auto w-full max-w-[300px] overflow-hidden border border-[#E5D8BB] bg-white">
                      <img
                        src={member.photo ?? ""}
                        alt={member.name}
                        loading="lazy"
                        className="h-[320px] w-full object-cover object-top"
                      />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold leading-tight text-slate-900">{member.name}</h3>
                    <div className="mt-3 inline-flex self-center rounded-full bg-[#C9A227] px-4 py-1 text-xs font-semibold text-white">
                      {config.roleBadge}
                    </div>
                    {config.subtitle ? <div className="mt-3 text-sm text-slate-700">{config.subtitle}</div> : null}
                    <div className="mt-2 text-sm text-slate-700">{member.experienceText}</div>

                    <div className="mt-4 text-left">
                      <div className="text-sm font-semibold text-slate-900">Специализация в жилищных спорах:</div>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-700">
                        {config.specializations.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-6">
                      <Button asChild size="lg" className={`${CARD_BUTTON_CLASS} w-full`}>
                        <Link to={contactsHref}>{config.buttonLabel}</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-slate-600 md:text-base">
              Над делом работает команда адвокатов коллегии. В зависимости от ситуации подключаются профильные
              специалисты с узкой практикой.
            </p>
          </div>
        </section>

        <section className="section bg-muted/30">
          <div className="container">
            <div className="section__header mx-auto max-w-4xl text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Отзывы клиентов</h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Мы не раскрываем персональные данные клиентов. Отзывы публикуются с их согласия.
              </p>
            </div>
            <YandexRatingWidget />
            <div className="section__content mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
              {reviewCards.map((review) => (
                <Card key={review.name} className="h-full">
                  <CardContent className="pt-6 h-full flex flex-col">
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <div className="text-base font-semibold text-slate-900">{review.name}</div>
                      <div className="flex items-center gap-1 text-accent">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star key={`${review.name}-${index}`} className="h-5 w-5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-small text-muted-foreground leading-relaxed flex-1">{review.text}</p>
                    <div className="border-t border-border mt-4 pt-4">
                      <span className="text-small font-semibold">{review.name}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button asChild size="lg" className={`${CTA_BUTTON_CLASS} w-full sm:w-auto`}>
                <Link to={contactsHref}>Обсудить свою ситуацию</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section__header mx-auto max-w-5xl text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                Почему клиенты доверяют нам сложные жилищные споры
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                Когда вопрос стоит о праве на жильё и крупных суммах компенсации, важны не обещания,
                <br />а реальный судебный опыт и системная работа.
              </p>
            </div>
            <div className="section__content grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 auto-rows-fr">
              {trustAdvantageCards.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="text-center">
                    <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center text-[#C9A227]">
                      <Icon className="h-12 w-12" />
                    </div>
                    <h3 className="text-xl font-semibold leading-snug text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">{item.description}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 text-center text-base leading-relaxed text-slate-700 md:text-lg">
              Перед началом работы мы честно оцениваем перспективу.
              <br />
              <span className="font-semibold text-[#7e6220]">
                Если дело слабое — скажем об этом сразу.
                <br />
                Если есть шансы — объясним, за счет чего можно выиграть.
              </span>
              <div className="mt-5">
                <a href={callHref} className="inline-flex items-center gap-3 text-lg font-semibold text-slate-900 hover:text-[#b8911f]">
                  <Phone className="h-6 w-6 text-[#C9A227]" />
                  Обсудить ситуацию по телефону: {SITE.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-muted/30">
          <div className="container">
            <div className="section__header mx-auto max-w-4xl text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">FAQ — Частые вопросы о жилищных спорах</h2>
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
                Каждая ситуация в жилищном споре индивидуальна.
                <br />
                По телефону мы коротко оценим перспективу и скажем, есть ли шансы на положительное решение.
              </p>
              <Button asChild size="lg" className={`${CTA_BUTTON_CLASS} mt-6 w-full sm:w-auto`}>
                <Link to={contactsHref}>Позвонить и задать вопрос</Link>
              </Button>
              <p className="mt-2 text-sm text-slate-600">Без обязательств и навязывания услуг</p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start lg:gap-14">
              <div className="max-w-2xl space-y-5">
                <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                  Получите честную оценку перспектив по вашему жилищному спору
                </h2>
                <p className="text-base leading-relaxed text-slate-700 md:text-lg">
                  Позвоните нам — адвокат по жилищным спорам проанализирует вашу ситуацию и прямо скажет, есть ли
                  реальные шансы на положительный исход.
                </p>
                <p className="text-base leading-relaxed text-slate-700 md:text-lg">
                  Если перспектив нет, вы узнаете об этом сразу — без пустых обещаний.
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
                    <a href={callHref} className="inline-flex items-center gap-3 text-base font-semibold text-slate-900 hover:text-[#b8911f]">
                      <Phone className="h-6 w-6 text-[#C9A227]" />
                      {SITE.phone}
                    </a>
                    <Button asChild size="lg" className={`${CTA_BUTTON_CLASS} w-full`}>
                      <Link to={contactsHref}>Позвонить адвокату</Link>
                    </Button>
                    <p className="text-sm text-slate-600">Разговор не обязывает к заключению договора</p>
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
            <div className="section__content grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-8">
              <div className="space-y-4">
                <Card className="border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
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
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
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
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Адрес</h3>
                        <p className="text-accent">
                          {SITE.address.city}, {SITE.address.street}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="aspect-video rounded-xl border border-border overflow-hidden">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=244880896695"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Карта офиса Профзащита"
                  className="w-full h-full"
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

export default ZhilishchnyeSporyPage;
