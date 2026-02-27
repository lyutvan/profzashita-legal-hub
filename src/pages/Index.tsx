import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegalBackground from "@/components/LegalBackground";
import { OrganizationSchema, WebSiteSchema, ReviewsSchema } from "@/components/JsonLd";
import { cases } from "@/data/cases";
import { teamMembers } from "@/data/team";
import {
  Users,
  Phone,
  Mail,
  MapPin,
  Scale,
  Clock,
  Star,
  FileText,
  FileCheck,
  FolderCheck
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import courtColumnsImg from "@/assets/legal/court-columns.jpg";
import { Helmet } from "react-helmet";
import { SITE } from "@/config/site";
import TelegramIcon from "@/components/icons/TelegramIcon";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import MaxIcon from "@/components/icons/MaxIcon";
import { getCategoriesForAudience } from "@/data/services-audiences";
import { getPhysCategoryPagePath, getPhysServiceEntryBySlug } from "@/data/phys-service-content";

const Index = () => {
  const navigate = useNavigate();
  const whatsappUrl = SITE.whatsappUrl;
  const telegramUrl = SITE.telegramUrl;
  const maxUrl = SITE.maxUrl;
  const physCategoryItems = getCategoriesForAudience("phys")
    .filter((category) => category.title !== "Ущерб имуществу")
    .map((category) => {
      const path = getPhysCategoryPagePath(category.title);
      if (!path) return null;
      const slug = path.replace("/services/phys/", "");
      const entry = getPhysServiceEntryBySlug(slug);
      const label =
        category.title === "Жилищные споры"
          ? "Жилищные спорам и возмещение ущерба"
          : (entry?.title ?? category.title);
      return {
        label,
        path
      };
    })
    .filter((item): item is { label: string; path: string } => Boolean(item));
  const uniquePhysCategoryItems = physCategoryItems.filter(
    (item, index, array) => array.findIndex((other) => other.path === item.path) === index
  );
  const bizCategoryItems = getCategoriesForAudience("biz").map((category) => ({
    label: category.title,
    path: `/services/biz#${category.slug}`
  }));
  const criminalCategoryItems = getCategoriesForAudience("criminal").map((category) => ({
    label: category.title,
    path: `/services/criminal#${category.slug}`
  }));
  const navigationSections = [
    {
      title: "Физическим лицам",
      description: "Личные, семейные и имущественные споры с понятной стратегией.",
      items: uniquePhysCategoryItems,
      href: "/uslugi/fiz-lica"
    },
    {
      title: "Уголовные дела",
      description: "Защита на всех стадиях: проверка, следствие, суд.",
      items: criminalCategoryItems,
      href: "/uslugi/ugolovnye"
    },
    {
      title: "Юридическим лицам",
      description: "Сопровождение бизнеса, защита интересов и снижение рисков.",
      items: bizCategoryItems,
      href: "/uslugi/yur-lica"
    }
  ];
  const [activeNavigationTitle, setActiveNavigationTitle] = useState(navigationSections[0]?.title ?? "");
  const activeNavigationSection =
    navigationSections.find((section) => section.title === activeNavigationTitle) ?? navigationSections[0];
  const activeNavigationItems = activeNavigationSection.items.map((item) =>
    typeof item === "string" ? { label: item, path: activeNavigationSection.href } : item
  );
  const activeColumnSplitIndex = Math.ceil(activeNavigationItems.length / 2);
  const activeNavigationColumns = [
    activeNavigationItems.slice(0, activeColumnSplitIndex),
    activeNavigationItems.slice(activeColumnSplitIndex)
  ].filter((column) => column.length > 0);

  const advantages = [
    {
      title: "Стратегия под задачу",
      description:
        "Каждое дело анализируется до начала активной стадии. Правовая позиция формируется с учетом судебной практики и процессуальных рисков.",
      icon: FileText
    },
    {
      title: "Сильная судебная практика",
      description:
        "Практика представительства в судах различных юрисдикций и инстанций. Опыт ведения дел повышенной сложности.",
      icon: Scale
    },
    {
      title: "Команда, а не один адвокат",
      description:
        "По сложным делам формируется рабочая группа профильных специалистов. Коллегиальный формат позволяет учитывать все существенные аспекты правовой позиции.",
      icon: Users
    },
    {
      title: "Внутренний стандарт качества",
      description:
        "Каждая правовая позиция проходит внутреннюю проверку перед совершением ключевых процессуальных действий.",
      icon: FileCheck
    },
    {
      title: "Ответственный подход",
      description:
        "Фиксируем этапы работы, сроки и стратегию защиты. Клиент информирован о ходе дела и возможных процессуальных сценариях.",
      icon: FolderCheck
    },
    {
      title: "Быстрое подключение к делу",
      description:
        "Оперативное подключение к делу — от первичной консультации до судебного представительства и последующего сопровождения исполнения решения.",
      icon: Clock
    }
  ];

  const testimonials = [
    {
      nameShort: "Евгений С.",
      dateText: "10 декабря 2025",
      rating: 5,
      text: "Понятно объяснили перспективы и риски, подготовили документы и представили в суде. Результат совпал с планом."
    },
    {
      nameShort: "Мария Л.",
      dateText: "28 ноября 2025",
      rating: 5,
      text: "Быстро включились, помогли с претензией и переговорами. Дело закрыли без затяжных процессов."
    },
    {
      nameShort: "Ирина К.",
      dateText: "15 октября 2025",
      rating: 5,
      text: "Получила четкий план действий и список документов. Всю коммуникацию вели за меня, я была в курсе."
    },
    {
      nameShort: "Алексей П.",
      dateText: "2 сентября 2025",
      rating: 5,
      text: "В споре со страховой добились выплаты в полном объеме. Работали аккуратно и без лишних обещаний."
    },
    {
      nameShort: "Ольга Н.",
      dateText: "20 августа 2025",
      rating: 5,
      text: "Отстояли интересы в жилищном вопросе и объясняли каждый шаг. Осталась довольна подходом."
    },
    {
      nameShort: "Сергей В.",
      dateText: "5 июля 2025",
      rating: 5,
      text: "Сдержанные и профессиональные, без давления. После консультации стало понятно, как двигаться дальше."
    }
  ];

  const featuredCaseSlugs = [
    "prekrashhenie-ugolovnogo-dela-moshennichestvo-primirenie-159-uk-rf",
    "izmenenie-mery-111-domashnij-arest",
    "zpp-tushinskiy-sk-soglasie-2-1636-2019",
    "razdel-imushchestva-nedeistv-sdelki-perovo-2-2621-2025",
    "a40-76521-2017-reshenie-20171003",
    "arbitrazh-povarova-isklyuchenie-zhilya-iz-konkursnoj-massy"
  ];
  const featuredCases = featuredCaseSlugs
    .map((slug) => cases.find((caseItem) => caseItem.slug === slug))
    .filter((caseItem): caseItem is (typeof cases)[number] => Boolean(caseItem));
  const featuredTeamOverrides: Record<
    string,
    {
      badge: string;
      subtitle: string;
      experience: string;
      specializations: string[];
    }
  > = {
    lyutikov: {
      badge: "Адвокат",
      subtitle: "Председатель коллегии",
      experience: "Стаж 26 лет",
      specializations: [
        "Уголовные дела общей и экономической направленности",
        "Представительство в арбитражных судах",
        "Корпоративные споры и субсидиарная ответственность"
      ]
    },
    ryzhenko: {
      badge: "Юрист",
      subtitle: "Помощник председателя коллегии",
      experience: "Стаж 23 года",
      specializations: [
        "Корпоративные и договорные споры",
        "Сопровождение наследственных дел",
        "Подготовка правовых позиций по сложным категориям споров"
      ]
    },
    sotnikov: {
      badge: "Адвокат",
      subtitle: "Адвокат",
      experience: "Стаж 15 лет",
      specializations: [
        "Уголовные дела экономической направленности",
        "Защита на стадии следствия и суда",
        "Досудебное урегулирование и переговоры"
      ]
    },
    vaskovsky: {
      badge: "Адвокат",
      subtitle: "Адвокат",
      experience: "Стаж 15 лет",
      specializations: [
        "Семейные и наследственные споры",
        "Административные дела",
        "Представительство в судах различных инстанций"
      ]
    }
  };

  const featuredTeam = ["lyutikov", "ryzhenko", "sotnikov", "vaskovsky"]
    .map((slug) => teamMembers.find((member) => member.slug === slug))
    .filter((member): member is (typeof teamMembers)[number] => Boolean(member));

  const workflowSteps = [
    {
      title: "Анализ ситуации",
      description: "Изучаем документы, обстоятельства дела и позиции сторон. Оцениваем правовые основания и перспективы"
    },
    {
      title: "Формирование стратегии",
      description: "Определяем правовую позицию и тактику защиты. Согласовываем план действий"
    },
    {
      title: "Подготовка доказательств",
      description: "Формируем доказательственную базу, готовим процессуальные документы, при необходимости инициируем экспертизы"
    },
    {
      title: "Представительство в суде",
      description: "Представляем интересы клиента в суде, участвуем в заседаниях и заявляем необходимые процессуальные ходатайства"
    },
    {
      title: "Обжалование",
      description: "При необходимости подготавливаем апелляционные и кассационные жалобы и сопровождаем рассмотрение дела"
    },
    {
      title: "Контроль исполнения",
      description: "Сопровождаем исполнение судебного решения и дальнейшие юридические действия"
    }
  ];
  const faqItems = [
    {
      question: "С чего начинается работа с адвокатом?",
      answer: "Работа начинается с краткой консультации. Мы оцениваем ситуацию, изучаем документы и предлагаем возможный план действий."
    },
    {
      question: "Можно ли получить консультацию в день обращения?",
      answer: "Да, мы организуем консультацию в день обращения, особенно по срочным вопросам."
    },
    {
      question: "Какие документы нужны для начала работы?",
      answer: "Базовые материалы по делу: переписка, договоры, судебные документы — всё, что есть у вас на руках."
    },
    {
      question: "Работаете ли вы по Московской области?",
      answer: "Да, ведем дела в Москве и Московской области, при необходимости выезжаем в другие регионы."
    },
    {
      question: "Сколько длится наследственный спор?",
      answer: "Как правило, первичный анализ занимает 1–2 дня после получения документов."
    }
  ];

  const truncateText = (text: string, max = 160) => {
    if (text.length <= max) return text;
    return `${text.slice(0, max).trim()}…`;
  };
  const formatCaseDate = (isoDate: string) =>
    new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(new Date(isoDate));

  const heroBadge = "Коллегия адвокатов города Москвы";

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Коллегия адвокатов Профзащита — юридическая помощь в Москве</title>
        <meta name="description" content="Профессиональная юридическая помощь в Москве. Уголовные, гражданские, корпоративные дела. Более 500 выигранных дел. Бесплатная консультация." />
        <link rel="canonical" href={SITE.url} />
        
        {/* OpenGraph */}
        <meta property="og:title" content="Коллегия адвокатов Профзащита — премиум-юридические услуги" />
        <meta property="og:description" content="15+ лет опыта, 500+ выигранных дел, 98% довольных клиентов. Профессиональная защита в уголовных, гражданских и корпоративных делах." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE.url} />
        <meta property="og:image" content={SITE.ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="Профзащита" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Коллегия адвокатов Профзащита" />
        <meta name="twitter:description" content="Профессиональная юридическая помощь в Москве. 15+ лет опыта, 500+ выигранных дел." />
        <meta name="twitter:image" content={SITE.ogImage} />
      </Helmet>
      
      <OrganizationSchema />
      <WebSiteSchema />
      <ReviewsSchema reviews={testimonials.map(t => ({
        author: t.nameShort,
        rating: t.rating,
        reviewBody: t.text,
        datePublished: t.dateText
      }))} />
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <LegalBackground
          imageSrc={courtColumnsImg}
          imageAlt="Классический зал суда с мраморными колоннами"
          overlayOpacity={0.6}
          className="home-hero"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-h1-mobile md:text-h1 font-bold text-accent mb-6 leading-tight">
              Решаем сложные юридические споры
            </h1>
            <p className="text-white text-[18px] sm:text-[22px] md:text-[26px] font-semibold leading-[1.2] mb-8">
              В интересах физических и юридических лиц
              <br />
              {heroBadge}
            </p>
            <p className="lead text-white/90 mb-8">
              Стратегическая защита в судах и на переговорах
              <br />
              Работаем по делам, где важен результат
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/kontakty">
                <Button size="lg" className="bg-accent text-white hover:bg-accent/90 px-8">
                  Обсудить ситуацию по телефону
                </Button>
              </Link>
            </div>
            <p className="text-small text-white/85 mt-3">Оценка перспектив до начала работы</p>
            <p className="text-body-mobile md:text-body text-white/90 mt-8">
              Работаем в Москве и Московской области • Консультация в день обращения
            </p>
          </div>
        </LegalBackground>

        {/* Navigation Section */}
        <section className="section home-navigation">
          <div className="container">
            <div className="section__header max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-4">Выберите направление работы</h2>
              <p className="text-body-mobile md:text-body text-muted-foreground">
                Главная страница помогает быстро перейти в нужный раздел услуг
              </p>
            </div>

            <div className="section__content max-w-6xl mx-auto">
              <div className="flex flex-wrap items-end gap-2">
                {navigationSections.map((section) => {
                  const isActive = section.title === activeNavigationSection.title;
                  return (
                    <button
                      key={section.title}
                      type="button"
                      onClick={() => setActiveNavigationTitle(section.title)}
                      className={`rounded-t-[10px] border border-[#C9A227] px-4 md:px-5 py-2 text-[18px] md:text-[22px] font-semibold leading-none transition-colors ${
                        isActive
                          ? "bg-[#C9A227] text-slate-900"
                          : "bg-transparent text-slate-900 hover:bg-[#f6efdb]"
                      }`}
                    >
                      {section.title}
                    </button>
                  );
                })}
              </div>

              <div className="rounded-b-[12px] rounded-tr-[12px] border border-[#C9A227] bg-[#F8F6EE] p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
                  {activeNavigationColumns.map((column, columnIndex) => (
                    <ul key={columnIndex} className="space-y-4 md:space-y-5">
                      {column.map((item) => (
                        <li key={item.label} className="relative pl-6 text-[16px] sm:text-[17px] md:text-[18px] text-slate-900">
                          <span
                            aria-hidden="true"
                            className="absolute left-0 top-[0.52em] h-2 w-2 rounded-full bg-slate-900"
                          />
                          <button
                            type="button"
                            onClick={() => navigate(item.path)}
                            className="inline text-left leading-[1.35] hover:text-[#b8911f] transition-colors"
                          >
                            {item.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
                <div className="mt-8">
                  <Link
                    to={activeNavigationSection.href}
                    className="text-[18px] sm:text-[20px] md:text-[24px] font-semibold text-[#C9A227] hover:underline"
                  >
                    Все услуги раздела →
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center text-body-mobile md:text-body text-muted-foreground">
              Если ситуация требует отдельного анализа — обсудите ее с адвокатом по телефону
            </div>
            <div className="mt-8 flex justify-center">
              <Link to="/kontakty">
                <Button size="lg" className="bg-accent text-white hover:bg-accent/90 px-8">
                  Обсудить ситуацию по телефону
                </Button>
              </Link>
            </div>
            <p className="mt-3 text-small text-center text-muted-foreground">Коротко разберем ситуацию и оценим перспективы дела</p>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="section bg-background">
          <div className="container max-w-[1180px]">
            <div className="section__header max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-4">
                Почему коллегии доверяют сложные дела
              </h2>
              <p className="text-body-mobile md:text-body text-muted-foreground">
                Работаем системно, стратегически и с пониманием процессуальных рисков
              </p>
            </div>

            <div className="section__content mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
              {advantages.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="px-2 md:px-3 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center">
                      <Icon className="h-11 w-11 text-accent" strokeWidth={1.6} />
                    </div>
                    <h3 className="text-[20px] md:text-[22px] leading-tight font-semibold text-foreground mb-4">
                      {item.title}
                    </h3>
                    <p className="mx-auto max-w-[330px] text-left text-body-mobile md:text-body leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-20 text-center text-[18px] md:text-[22px] font-semibold text-foreground">
              Если ситуация требует взвешенного правового решения — обсудите ее с адвокатом
            </div>
            <div className="mt-8 flex justify-center">
              <Link to="/kontakty">
                <Button
                  size="lg"
                  className="h-auto min-h-14 w-[280px] whitespace-normal px-8 py-3 leading-tight bg-accent text-white hover:bg-accent/90"
                >
                  Обсудить ситуацию по телефону
                </Button>
              </Link>
            </div>
            <p className="mt-3 text-small text-center text-muted-foreground">Кратко разберем вашу ситуацию и оценим перспективы</p>
          </div>
        </section>

        {/* Practice / Results */}
        <section className="section">
          <div className="container max-w-[1280px]">
            <div className="section__header max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-4">
                Судебная практика коллегии
              </h2>
              <p className="text-body-mobile md:text-body text-muted-foreground">
                Результаты по уголовным, гражданским и арбитражным делам
              </p>
            </div>

            <div className="section__content mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {featuredCases.map((caseItem) => {
                const decisionPreview = caseItem.documents?.[0];

                return (
                  <Card
                    key={caseItem.id}
                    className="border-[#C9A227] bg-[#f3efe4] hover:shadow-elegant transition-all h-full flex flex-col overflow-hidden"
                  >
                    <CardContent className="pt-7 px-7 pb-7 flex flex-col h-full">
                      <div className="mb-6 flex justify-end">
                        <div className="h-[156px] w-[128px] overflow-hidden border border-[#bfbfbf] bg-white shadow-sm">
                          {decisionPreview ? (
                            <img
                              src={decisionPreview}
                              alt={`Скан решения по делу: ${caseItem.title}`}
                              className="h-full w-full object-contain p-1"
                              loading="lazy"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-center text-[14px] text-muted-foreground px-3">
                              Скан решения
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-[18px] font-semibold leading-snug text-foreground">
                        {caseItem.category}
                      </div>
                      <div className="text-[16px] text-foreground/80 mb-5">{formatCaseDate(caseItem.datePublished)} г.</div>
                      <h3 className="text-[20px] md:text-[22px] leading-tight font-semibold mb-5 text-foreground">
                        {caseItem.title}
                      </h3>

                      <p className="text-[16px] leading-relaxed text-foreground/90">
                        <span className="font-semibold text-foreground">Ситуация:</span>
                        <br />
                        {truncateText(caseItem.task, 220)}
                      </p>
                      <p className="mt-4 text-[16px] leading-relaxed text-foreground/90">
                        <span className="font-semibold text-foreground">Результат:</span>
                        <br />
                        {truncateText(caseItem.result, 210)}
                      </p>

                      <div className="mt-auto pt-8 flex justify-center">
                        <Button size="lg" className="min-w-[190px] bg-accent text-white hover:bg-accent/90" asChild>
                          <Link to={`/keisy#${caseItem.slug}`}>Перейти к кейсу</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="mt-14 text-center text-body-mobile md:text-body text-muted-foreground">
              Если вы столкнулись с похожей проблемой — проанализируем обстоятельства и выстроим стратегию защиты
            </div>
            <div className="mt-8 flex justify-center">
              <Link to="/kontakty">
                <Button
                  size="lg"
                  className="h-auto min-h-14 w-[280px] whitespace-normal px-8 py-3 leading-tight bg-accent text-white hover:bg-accent/90"
                >
                  Обсудить ситуацию по телефону
                </Button>
              </Link>
            </div>
            <p className="mt-10 text-center text-body-mobile md:text-body text-muted-foreground">
              Результаты подтверждаются не только судебными актами, но и отзывами клиентов
            </p>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="reviews" className="section bg-[#F8FAFC]">
          <div className="container max-w-[1280px]">
            <div className="section__header max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-4">
                Отзывы клиентов о работе коллегии
              </h2>
              <p className="text-body-mobile md:text-body text-muted-foreground">
                Мы не раскрываем персональные данные клиентов. Отзывы публикуются с их согласия
              </p>
              <div className="mt-6 flex justify-center">
                <div className="max-w-full overflow-hidden">
                  <iframe src="https://yandex.ru/sprav/widget/rating-badge/244880896695?type=rating" width="150" height="50" frameborder="0"></iframe>
                </div>
              </div>
            </div>

            <div className="section__content mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={`${testimonial.nameShort}-${index}`}
                  className="h-full rounded-[14px] border border-[#C9A227] bg-[#F6F1E6] shadow-[0_8px_20px_rgba(60,52,31,0.08)]"
                >
                  <CardContent className="pt-6 px-6 pb-6 h-full flex flex-col">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-1 text-accent">
                        {[...Array(testimonial.rating)].map((_, starIndex) => (
                          <Star key={starIndex} className="h-5 w-5 fill-current" />
                        ))}
                      </div>
                      <p className="text-[15px] text-foreground/70 whitespace-nowrap">
                        {testimonial.dateText}
                      </p>
                    </div>

                    <p className="mt-4 text-[16px] leading-relaxed text-foreground/90">
                      {testimonial.text}
                    </p>

                    <div className="border-t border-[#dccda5] pt-4 mt-auto">
                      <p className="text-[16px] font-semibold text-foreground">{testimonial.nameShort}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="mt-16 text-center text-body-mobile md:text-body text-foreground">
              Обсудите вашу ситуацию напрямую с адвокатом коллегии
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                to="/kontakty"
                className="inline-flex items-center gap-3 text-[17px] md:text-[20px] font-semibold text-foreground hover:text-accent transition-colors"
              >
                <Phone className="h-7 w-7 md:h-8 md:w-8 text-accent" />
                +7 (495) 004-01-96
              </Link>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="section">
          <div className="container max-w-[1380px]">
            <div className="section__header max-w-5xl mx-auto text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-4">
                Команда коллегии адвокатов
              </h2>
              <p className="text-[14px] md:text-[18px] text-muted-foreground lg:whitespace-nowrap">
                Коллегиальный формат работы позволяет формировать стратегию с учетом разных правовых позиций и судебной практики
              </p>
            </div>

            <div className="section__content mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
              {featuredTeam.map((member) => {
                const override = featuredTeamOverrides[member.slug];
                const badge = override?.badge ?? (member.role.toLowerCase().includes("юрист") ? "Юрист" : "Адвокат");
                const subtitle = override?.subtitle ?? member.role;
                const experience = override?.experience ?? member.experienceText;
                const cardSpecializations = override?.specializations ?? (member.specializations ?? []).slice(0, 3);

                return (
                  <Card
                    key={member.slug}
                    className="h-full border-[#C9A227] bg-[#f3f4f6] hover:shadow-elegant transition-all overflow-hidden"
                  >
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="h-[345px] w-full overflow-hidden border-b border-[#C9A227]">
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="px-6 pt-7 pb-6 flex flex-col h-full">
                        <h3 className="font-serif text-[20px] leading-tight font-semibold text-center min-h-[62px] mb-4">
                          {member.name}
                        </h3>

                        <div className="mx-auto mb-4 rounded-full bg-accent px-5 py-1 text-[17px] font-semibold text-white leading-none">
                          {badge}
                        </div>

                        <p className="text-[16px] text-center text-foreground mb-2">{subtitle}</p>
                        {experience && <p className="text-[16px] text-center text-muted-foreground mb-5">{experience}</p>}

                        <ul className="space-y-2.5 text-[16px] leading-relaxed text-foreground/90">
                          {cardSpecializations.map((spec) => (
                            <li key={spec} className="flex items-start gap-2">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/90 shrink-0" />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <p className="mt-14 text-center text-body-mobile md:text-body text-muted-foreground">
              Сложные дела ведутся командой профильных адвокатов с учетом судебной практики и процессуальных рисков
            </p>

            <div className="text-center mt-8">
              <Button size="lg" className="h-auto min-h-14 w-[290px] whitespace-normal px-8 py-3 leading-tight bg-accent text-white hover:bg-accent/90" asChild>
                <Link to="/o-kollegii#about-team">Посмотреть всю команду</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="section bg-[#F8FAFC]">
          <div className="container max-w-[1280px]">
            <div className="section__header max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-4">
                Как организована работа по вашему делу
              </h2>
              <p className="text-body-mobile md:text-body text-muted-foreground">
                Каждое дело ведется системно — с анализом, стратегией и контролем ключевых этапов
              </p>
            </div>

            <div className="section__content mt-12 rounded-[16px] border border-[#C9A227] bg-[#F6F1E6] px-4 md:px-8">
              {workflowSteps.map((step, index) => (
                <div
                  key={step.title}
                  className={`px-2 py-5 md:px-4 md:py-6 ${
                    index > 0 ? "border-t border-[#d7cda9]" : ""
                  }`}
                >
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d7d2c6] bg-[#f2efe8] text-[24px] font-semibold leading-none text-accent md:h-14 md:w-14">
                      {index + 1}
                    </div>
                    <div className="pt-1">
                      <h3 className="text-[20px] md:text-[24px] font-semibold leading-tight text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-body-mobile md:text-body leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-14 text-center text-[17px] md:text-[20px] font-medium text-foreground">
              <span className="block md:whitespace-nowrap">
                Понимание последовательности действий позволяет выстроить защиту системно и снизить процессуальные риски.
              </span>
              <br />
              Первый шаг — профессиональная оценка вашей ситуации
            </p>

            <div className="mt-10 flex justify-center">
              <Link
                to="/kontakty"
                className="inline-flex items-center gap-3 text-[20px] md:text-[24px] font-semibold text-foreground hover:text-accent transition-colors"
              >
                <Phone className="h-8 w-8 md:h-10 md:w-10 text-accent" />
                Обсудить ситуацию по телефону: +7 (495) 004-01-96
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section bg-[#f8fafc]">
          <div className="container max-w-[1120px]">
            <div className="section__header max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-4">Короткий FAQ</h2>
            </div>

            <Accordion type="single" collapsible className="section__content mt-8 space-y-3">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  value={`faq-${index}`}
                  className="overflow-hidden rounded-2xl border border-[#d7c28b] bg-white px-6 shadow-[0_8px_20px_rgba(15,23,42,0.06)]"
                >
                  <AccordionTrigger className="family-accordion-trigger faq-question text-left text-[18px] md:text-[22px] font-semibold text-foreground hover:no-underline hover:text-[#b8911f] data-[state=open]:text-[#b8911f] [&>svg]:text-[#c9a227]">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-body-mobile md:text-body leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-20 text-center">
              <p className="text-[20px] md:text-[26px] text-foreground">Остались вопросы?</p>
              <p className="mt-2 text-body-mobile md:text-body text-muted-foreground">
                Обсудите вашу ситуацию напрямую с адвокатом коллегии
              </p>
              <div className="mt-8">
                <Button
                  size="lg"
                  className="h-auto min-h-14 w-[300px] whitespace-normal px-8 py-3 leading-tight bg-accent text-white hover:bg-accent/90"
                  asChild
                >
                  <Link to="/kontakty">Обсудить ситуацию по телефону</Link>
                </Button>
              </div>
              <p className="mt-3 text-small text-muted-foreground">Разговор не обязывает к заключению договора</p>
            </div>
          </div>
        </section>

        {/* Contacts Section */}
        <section className="section bg-[#f8fafc]">
          <div className="container max-w-[1240px]">
            <Card className="border-[#d7c28b] bg-white shadow-[0_14px_36px_rgba(15,23,42,0.08)]">
              <CardContent className="p-6 md:p-10">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-14">
                  <div className="space-y-6">
                    <h2 className="font-serif text-h2-mobile md:text-h2 font-bold text-foreground">
                      Контакты
                    </h2>
                    <div className="space-y-5">
                      <div className="flex items-center gap-4 text-foreground">
                        <Phone className="h-8 w-8 text-accent" />
                        <a href={`tel:${SITE.phoneRaw}`} className="text-[22px] leading-tight font-medium hover:text-accent transition-colors md:text-[26px]">
                          {SITE.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-4 text-foreground">
                        <Mail className="h-8 w-8 text-accent" />
                        <a href={`mailto:${SITE.email}`} className="text-[20px] leading-tight font-medium hover:text-accent transition-colors md:text-[24px]">
                          {SITE.email}
                        </a>
                      </div>
                      <div className="flex items-start gap-4 text-foreground">
                        <MapPin className="mt-1 h-8 w-8 text-accent" />
                        <p className="text-[20px] leading-tight font-medium md:text-[24px]">
                          {SITE.address.city}, {SITE.address.street}
                        </p>
                      </div>
                    </div>
                    <div className="pt-3">
                      <iframe
                        src="https://yandex.ru/sprav/widget/rating-badge/244880896695?type=rating"
                        width="150"
                        height="50"
                        frameBorder="0"
                        title="Рейтинг Профзащита в Яндекс.Картах"
                        className="max-w-full"
                      ></iframe>
                    </div>
                  </div>

                  <div className="border-l border-[#e6d8ab] pl-0 lg:pl-10">
                    <div className="space-y-6 rounded-2xl border border-[#d7c28b] bg-[#f6f1e6] p-6 md:p-7 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
                      <p className="text-[18px] font-semibold leading-tight text-foreground md:text-[20px] whitespace-nowrap">
                        Телефон для консультаций:
                      </p>
                      <a
                        href={`tel:${SITE.phoneRaw}`}
                        className="inline-flex items-center gap-3 text-[22px] font-semibold leading-tight text-foreground hover:text-accent md:text-[26px]"
                      >
                        <Phone className="h-7 w-7 text-accent md:h-8 md:w-8" />
                        {SITE.phone}
                      </a>
                      <Button
                        size="lg"
                        className="h-auto w-full bg-accent px-5 py-3 text-[16px] leading-tight text-white hover:bg-accent/90 md:text-[18px]"
                        asChild
                      >
                        <Link to="/kontakty">Обсудить ситуацию по телефону</Link>
                      </Button>
                      <p className="text-[16px] leading-tight text-muted-foreground md:text-[18px]">
                        Разговор не обязывает к заключению договора
                      </p>

                      <div className="pt-3">
                        <p className="text-[21px] font-medium leading-tight text-foreground md:text-[24px]">
                          Или напишите нам напрямую:
                        </p>
                        <div className="mt-5 flex flex-wrap items-center gap-4">
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

export default Index;
