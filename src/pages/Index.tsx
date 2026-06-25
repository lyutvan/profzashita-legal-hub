import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegalBackground from "@/components/LegalBackground";
import CaseTrustCard from "@/components/CaseTrustCard";
import AttorneyCard from "@/components/AttorneyCard";
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
import AnimatedStats from "@/components/AnimatedStats";
import WorkTimeline from "@/components/WorkTimeline";
import ServiceDirectionSelector from "@/components/ServiceDirectionSelector";
import ReviewsCarousel from "@/components/ReviewsCarousel";

const Index = () => {
  const whatsappUrl = SITE.whatsappUrl;
  const telegramUrl = SITE.telegramUrl;
  const maxUrl = SITE.maxUrl;
  const hasSecondaryPhone = Boolean(SITE.messengerPhone && SITE.messengerPhoneRaw);

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
    "izmenenie-mery-111-domashnij-arest",
    "razdel-imushchestva-nedeistv-sdelki-perovo-2-2621-2025",
    "a40-76521-2017-reshenie-20171003"
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
        "Уголовное право",
        "Арбитражное право",
        "Административное судопроизводство"
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

  const featuredTeam = ["lyutikov", "ryzhenko", "vaskovsky"]
    .map((slug) => teamMembers.find((member) => member.slug === slug))
    .filter((member): member is (typeof teamMembers)[number] => Boolean(member));

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

  const heroBadge = "Коллегия адвокатов города Москвы";

  return (
    <div className="home-mobile-compact min-h-screen flex flex-col">
      <Helmet>
        <title>Коллегия адвокатов Профзащита — юридическая помощь в Москве</title>
        <meta name="description" content="Профессиональная юридическая помощь в Москве. Уголовные, гражданские, корпоративные дела. Более 500 выигранных дел. Бесплатная консультация." />
        <link rel="canonical" href={SITE.homeUrl} />
        
        {/* OpenGraph */}
        <meta property="og:title" content="Коллегия адвокатов Профзащита — премиум-юридические услуги" />
        <meta property="og:description" content="15+ лет опыта, 500+ выигранных дел, 98% довольных клиентов. Профессиональная защита в уголовных, гражданских и корпоративных делах." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE.homeUrl} />
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
          parallax
          priority
        >
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-[42px] md:text-h1 font-bold text-accent mb-4 md:mb-6 leading-[0.95] md:leading-tight">
              Решаем сложные юридические споры
            </h1>
            <p className="text-white text-[16px] sm:text-[22px] md:text-[26px] font-semibold leading-[1.25] mb-5 md:mb-8">
              В интересах физических и юридических лиц
              <br />
              {heroBadge}
            </p>
            <p className="mx-auto mb-6 max-w-[340px] text-[15px] leading-6 text-white/90 md:lead md:mb-8 md:max-w-none">
              Стратегическая защита в судах и на переговорах
              <br />
              Работаем по делам, где важен результат
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-stretch sm:items-center">
              <a href={`tel:${SITE.phoneRaw}`} className="w-full sm:w-auto">
	                <Button
	                  size="lg"
	                  className="urgent-help-button h-12 w-full border border-[#b91c1c] bg-[#dc2626] px-6 text-[15px] text-white shadow-[0_8px_18px_rgba(220,38,38,0.35)] hover:bg-[#b91c1c] md:h-14 md:px-8 md:text-[16px]"
	                >
                  Срочная помощь адвоката
                </Button>
              </a>
              <Link to="/kontakty" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="h-12 w-full border border-[#b8911f] bg-[#C9A227] px-6 text-[15px] text-white shadow-[0_8px_18px_rgba(201,162,39,0.35)] hover:border-[#a8831a] hover:bg-[#b8911f] hover:text-white md:h-14 md:px-8 md:text-[16px]"
                >
                  Получить консультацию
                </Button>
              </Link>
            </div>
            <p className="text-small text-white/85 mt-3">Оценка перспектив до начала работы</p>
            <p className="text-[14px] leading-6 text-white/90 mt-4 md:mt-8 md:text-body">
              Работаем в Москве и Московской области • Консультация в день обращения
            </p>
          </div>
        </LegalBackground>

        <AnimatedStats />

        <ServiceDirectionSelector />

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

            <div className="section__content mt-8 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-2 md:gap-y-16 md:gap-x-12 lg:grid-cols-3">
              {advantages.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className={`${index > 2 ? "hidden md:block" : ""} px-2 text-center md:px-3`}>
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center md:mb-6 md:h-16 md:w-16">
                      <Icon className="h-8 w-8 text-accent md:h-11 md:w-11" strokeWidth={1.6} />
                    </div>
                    <h3 className="mb-2 text-[18px] font-semibold leading-tight text-foreground md:mb-4 md:text-[22px]">
                      {item.title}
                    </h3>
                    <p className="mx-auto max-w-[330px] text-center text-[14px] leading-6 text-muted-foreground md:text-left md:text-body md:leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 hidden text-center text-[18px] font-semibold text-foreground md:mt-20 md:block md:text-[22px]">
              Если ситуация требует взвешенного правового решения — обсудите ее с адвокатом
            </div>
            <div className="mt-8 hidden justify-center md:flex">
              <Link to="/kontakty">
                <Button
                  size="lg"
                  className="h-auto min-h-14 w-[280px] whitespace-normal px-8 py-3 leading-tight bg-accent text-white hover:bg-accent/90"
                >
                  Обсудить ситуацию по телефону
                </Button>
              </Link>
            </div>
            <p className="mt-3 hidden text-center text-small text-muted-foreground md:block">Кратко разберем вашу ситуацию и оценим перспективы</p>
          </div>
        </section>

        <WorkTimeline />

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

            <div className="section__content mt-8 grid auto-rows-fr grid-cols-1 gap-5 md:mt-12 md:grid-cols-2 xl:grid-cols-3">
              {featuredCases.map((caseItem) => (
                <CaseTrustCard key={caseItem.id} caseItem={caseItem} />
              ))}
            </div>

            <div className="mt-8 text-center text-body-mobile text-muted-foreground md:mt-14 md:text-body">
              Если вы столкнулись с похожей проблемой — проанализируем обстоятельства и выстроим стратегию защиты
            </div>
            <div className="mt-8 flex justify-center">
              <Link to="/keisy">
                <Button
                  size="lg"
                  className="h-auto min-h-14 w-[280px] whitespace-normal px-8 py-3 leading-tight bg-accent text-white hover:bg-accent/90"
                >
                  Посмотреть все кейсы
                </Button>
              </Link>
            </div>
            <p className="mt-8 hidden text-center text-body-mobile text-muted-foreground md:mt-10 md:block md:text-body">
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
                <a
                  href="https://yandex.ru/maps/org/244880896695/reviews/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-[300px] rounded-[16px] bg-[#f3f4f6] px-5 py-4 text-left shadow-[0_6px_18px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(15,23,42,0.12)]"
                  aria-label="Отзывы Профзащита на Яндекс.Картах"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      viewBox="0 0 32 32"
                      className="h-8 w-8 shrink-0"
                      aria-hidden="true"
                    >
                      <path
                        fill="#ff5a1f"
                        d="M16 2C10.477 2 6 6.477 6 12c0 7.338 10 18 10 18s10-10.662 10-18c0-5.523-4.477-10-10-10Z"
                      />
                      <circle cx="16" cy="12" r="4.2" fill="#fff" />
                    </svg>
                    <span className="text-[22px] font-bold leading-none tracking-[-0.02em] text-[#111827]">
                      5,0
                    </span>
                    <div className="ml-1 flex items-center gap-1 text-[#FFC107]">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star key={starIndex} className="h-5 w-5 fill-current stroke-none" />
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 text-[15px] leading-snug text-[#5f6368]">
                    Рейтинг организации в Яндексе
                  </div>
                </a>
              </div>
            </div>

            <ReviewsCarousel
              reviews={testimonials.map((testimonial) => ({
                name: testimonial.nameShort,
                date: testimonial.dateText,
                rating: testimonial.rating,
                text: testimonial.text
              }))}
            />

            <div className="mt-8 flex justify-center">
              <Button
                asChild
                size="lg"
                className="h-auto min-h-12 rounded-[14px] bg-primary px-7 py-3 text-white hover:bg-primary/90"
              >
                <a
                  href="https://yandex.ru/maps/org/244880896695/reviews/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Посмотреть все отзывы
                </a>
              </Button>
            </div>

            <p className="mt-8 hidden text-center text-body-mobile text-foreground md:mt-16 md:block md:text-body">
              Обсудите вашу ситуацию напрямую с адвокатом коллегии
            </p>
            <div className="mt-6 hidden justify-center md:flex">
              <div className="inline-flex items-start gap-3 text-[17px] md:text-[20px] font-semibold text-foreground">
                <Phone className="h-7 w-7 md:h-8 md:w-8 text-accent mt-0.5" />
                <div className="flex flex-col items-start">
                  <a href={`tel:${SITE.phoneRaw}`} className="hover:text-accent transition-colors">
                    {SITE.phone}
                  </a>
                  {hasSecondaryPhone && (
                    <a href={`tel:+${SITE.messengerPhoneRaw}`} className="hover:text-accent transition-colors">
                      {SITE.messengerPhone}
                    </a>
                  )}
                </div>
              </div>
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

            <div className="section__content mx-auto mt-8 grid max-w-[1180px] grid-cols-1 items-stretch gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {featuredTeam.map((member) => {
                const override = featuredTeamOverrides[member.slug];

                return (
                  <AttorneyCard
                    key={member.slug}
                    member={member}
                    badge={override?.badge}
                    roleTitle={override?.subtitle}
                    experience={override?.experience}
                    points={override?.specializations}
                  />
                );
              })}
            </div>

            <p className="mt-8 text-center text-body-mobile text-muted-foreground md:mt-14 md:text-body">
              Сложные дела ведутся командой профильных адвокатов с учетом судебной практики и процессуальных рисков
            </p>

            <div className="text-center mt-8">
              <Button size="lg" className="h-auto min-h-14 w-[290px] whitespace-normal px-8 py-3 leading-tight bg-accent text-white hover:bg-accent/90" asChild>
                <Link to="/o-kollegii#nasha-komanda">Посмотреть всю команду</Link>
              </Button>
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
                  className={`${index > 2 ? "hidden md:block" : ""} overflow-hidden rounded-2xl border border-[#d7c28b] bg-white px-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)] md:px-6`}
                >
                  <AccordionTrigger className="family-accordion-trigger faq-question text-left text-[16px] font-semibold text-foreground hover:no-underline hover:text-[#b8911f] data-[state=open]:text-[#b8911f] md:text-[22px] [&>svg]:text-[#c9a227]">
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
                <div className="grid grid-cols-1 gap-10">
                  <div className="space-y-6">
                    <h2 className="font-serif text-[30px] font-bold leading-tight text-foreground md:text-[36px]">
                      Контакты
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 text-foreground">
                        <Phone className="h-7 w-7 text-accent" />
                        <div className="flex flex-col items-start text-[18px] leading-snug font-medium md:text-[21px]">
                          <a href={`tel:${SITE.phoneRaw}`} className="hover:text-accent transition-colors">
                            {SITE.phone}
                          </a>
                          {hasSecondaryPhone && (
                            <a href={`tel:+${SITE.messengerPhoneRaw}`} className="hover:text-accent transition-colors">
                              {SITE.messengerPhone}
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-foreground">
                        <Mail className="h-7 w-7 text-accent" />
                        <a href={`mailto:${SITE.email}`} className="text-[18px] leading-snug font-medium hover:text-accent transition-colors md:text-[21px]">
                          {SITE.email}
                        </a>
                      </div>
                      <div className="flex items-start gap-4 text-foreground">
                        <MapPin className="mt-0.5 h-7 w-7 text-accent" />
                        <p className="text-[18px] leading-snug font-medium md:text-[21px]">
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
                        href={SITE.yandexMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-[16px] font-semibold text-white md:hidden"
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

export default Index;
