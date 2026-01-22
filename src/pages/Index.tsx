import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegalBackground from "@/components/LegalBackground";
import { OrganizationSchema, WebSiteSchema, ReviewsSchema } from "@/components/JsonLd";
import { cases } from "@/data/cases";
import { teamMembers } from "@/data/team";
import {
  Shield,
  Target,
  Award,
  Users,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Scale,
  Clock,
  Star
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import courtColumnsImg from "@/assets/legal/court-columns.jpg";
import { Helmet } from "react-helmet";
import { SITE } from "@/config/site";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const Index = () => {
  const navigationSections = [
    {
      title: "Физическим лицам",
      description: "Личные, семейные и имущественные споры с понятной стратегией.",
      items: [
        "Семейные споры",
        "Жилищные споры",
        "Наследство",
        "ДТП и страховые споры",
        "Защита прав потребителей",
        "Взыскание долгов",
        "Административные дела"
      ],
      href: "/uslugi/fiz-lica"
    },
    {
      title: "Юридическим лицам",
      description: "Сопровождение бизнеса, защита интересов и снижение рисков.",
      items: [
        "Договорная работа",
        "Арбитражные споры",
        "Взыскание задолженности",
        "Налоговые споры",
        "Банкротство",
        "Корпоративные споры",
        "Абонентское сопровождение"
      ],
      href: "/uslugi/yur-lica"
    },
    {
      title: "Уголовные дела",
      description: "Защита на всех стадиях: проверка, следствие, суд.",
      items: [
        "Преступления против личности",
        "Преступления против собственности",
        "Экономические преступления",
        "Должностные и коррупционные",
        "Наркотики",
        "Общественная безопасность",
        "Порядок управления"
      ],
      href: "/uslugi/ugolovnye"
    }
  ];

  const advantages = [
    {
      title: "Стратегия под задачу",
      description: "Не обещаем невозможного — вы получаете честную оценку перспектив.",
      icon: Target
    },
    {
      title: "Сильная судебная практика",
      description: "Готовим позицию так, чтобы выдержать проверку в суде.",
      icon: Scale
    },
    {
      title: "Ответственный подход",
      description: "Фиксируем сроки, этапы и держим в курсе каждого решения.",
      icon: Shield
    },
    {
      title: "Опыт в сложных делах",
      description: "Работаем с конфликтами высокой сложности и ставки.",
      icon: Award
    },
    {
      title: "Команда, а не один адвокат",
      description: "К делу подключаются профильные специалисты.",
      icon: Users
    },
    {
      title: "Быстрый старт",
      description: "Срочные консультации и подключение к делу в сжатые сроки.",
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

  const featuredCases = cases.slice(0, 4);
  const featuredTeam = teamMembers.slice(0, 4);

  const faqItems = [
    {
      question: "С чего начинается работа с адвокатом?",
      answer: "С короткой консультации: оцениваем ситуацию, документы и предлагаем план действий."
    },
    {
      question: "Можно ли получить консультацию в день обращения?",
      answer: "Да, мы организуем консультацию в день обращения, особенно по срочным вопросам."
    },
    {
      question: "Какие документы нужны для старта?",
      answer: "Базовые материалы по делу, переписка, договоры, судебные документы — всё, что есть у вас на руках."
    },
    {
      question: "Работаете ли вы по Московской области?",
      answer: "Да, ведём дела в Москве и Московской области, при необходимости выезжаем в другие регионы."
    },
    {
      question: "Сколько времени занимает анализ дела?",
      answer: "Как правило, первичный анализ занимает 1–2 дня после получения документов."
    }
  ];

  const truncateText = (text: string, max = 160) => {
    if (text.length <= max) return text;
    return `${text.slice(0, max).trim()}…`;
  };

  const heroBadge = "Коллегия адвокатов города Москвы «Профзащита»";

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
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex max-w-[90%] mx-auto items-center justify-center rounded-xl border border-accent/70 bg-black/30 px-5 py-2.5 text-small md:text-[15px] font-medium tracking-[0.06em] text-white/90 text-center leading-snug mb-4">
              {heroBadge}
            </div>
            <h1 className="font-serif text-h1-mobile md:text-h1 font-bold text-white mb-4 leading-tight">
              Юридическая помощь по делам любой сложности
            </h1>
            <p className="lead text-white/90 mb-8">
              Москва и Московская область · консультация в день обращения
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent text-white hover:bg-accent/90 px-8" asChild>
                <Link to="/kontakty">Получить консультацию</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white bg-white/10 hover:bg-white/20"
                asChild
              >
                <a href={`https://wa.me/${SITE.phoneRaw.replace("+", "")}`} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon size={18} />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </LegalBackground>

        {/* Navigation Section */}
        <section className="section home-navigation">
          <div className="container">
            <div className="section__header max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-4">
                Выберите направление
              </h2>
              <p className="text-body-mobile md:text-body text-muted-foreground">
                Главная страница помогает быстро перейти в нужный раздел услуг.
              </p>
            </div>

            <div className="section__content grid grid-cols-1 lg:grid-cols-3 gap-8">
              {navigationSections.map((section) => (
                <Link key={section.title} to={section.href} className="group block h-full">
                  <Card className="border-border hover:shadow-elegant transition-all h-full">
                    <CardContent className="pt-6 flex flex-col h-full">
                      <div className="flex-1">
                        <h3 className="font-serif text-h3-mobile md:text-h3 font-bold mb-2 text-foreground">
                          {section.title}
                        </h3>
                        <p className="text-small text-muted-foreground mb-4">
                          {section.description}
                        </p>
                        <ul className="space-y-2">
                          {section.items.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-small text-muted-foreground">
                              <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <span className="mt-6 inline-flex items-center gap-2 text-small font-semibold text-accent group-hover:underline">
                        Все услуги раздела →
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="section bg-muted/30">
          <div className="container">
            <div className="section__header max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-4">
                Почему выбирают нас
              </h2>
              <p className="text-body-mobile md:text-body text-muted-foreground">
                Коротко о том, что получает клиент на старте и в процессе работы.
              </p>
            </div>

            <div className="section__content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advantages.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="border-border hover:shadow-elegant transition-all">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="font-serif text-h3-mobile md:text-h3 font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-small text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Practice / Results */}
        <section className="section">
          <div className="container">
            <div className="section__header max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-4">
                Практика / Результаты
              </h2>
              <p className="text-body-mobile md:text-body text-muted-foreground">
                Примеры дел, где защита привела к конкретному результату.
              </p>
            </div>

            <div className="section__content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCases.map((caseItem) => {
                const decisionPreview = caseItem.decisionPreview ?? caseItem.documents?.[0];
                const decisionUrl = caseItem.decisionUrl ?? caseItem.documents?.[0];

                return (
                  <Card key={caseItem.id} className="border-border hover:shadow-elegant transition-all h-full flex flex-col">
                    <CardContent className="pt-6 flex flex-col h-full">
                      <div className="text-small text-muted-foreground mb-2">
                        {caseItem.category}
                      </div>
                      <h3 className="font-serif text-h3-mobile md:text-h3 font-semibold mb-3">
                        {caseItem.title}
                      </h3>

                      {decisionPreview ? (
                        <div className="mb-4 overflow-hidden rounded-xl border border-border bg-muted/20">
                          <img
                            src={decisionPreview}
                            alt={`Скан решения по делу: ${caseItem.title}`}
                            className="h-[200px] w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="mb-4 h-[200px] w-full rounded-xl border border-border bg-muted/30 flex items-center justify-center text-small text-muted-foreground">
                          Скан решения скоро будет добавлен
                        </div>
                      )}

                      <p className="text-small text-muted-foreground leading-relaxed">
                        {truncateText(caseItem.result)}
                      </p>

                      <div className="mt-auto pt-5 flex flex-wrap gap-2">
                        <Button variant="link" className="p-0 h-auto text-accent font-semibold" asChild>
                          <Link to={`/keisy#${caseItem.slug}`}>Смотреть кейс →</Link>
                        </Button>
                        {decisionUrl ? (
                          <Button variant="outline" size="sm" asChild>
                            <a href={decisionUrl} target="_blank" rel="noopener noreferrer">
                              Открыть решение
                            </a>
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" disabled>
                            Скоро
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <Button variant="outline" size="lg" asChild>
                <Link to="/keisy">Все кейсы →</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section bg-muted/30">
          <div className="container">
            <div className="section__header max-w-3xl mx-auto text-center">
              <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-6">
                <h2 className="font-serif text-h2-mobile md:text-h2 font-bold text-center">
                  Отзывы клиентов
                </h2>
                <div className="max-w-full overflow-hidden">
                  <iframe src="https://yandex.ru/sprav/widget/rating-badge/244880896695?type=rating" width="150" height="50" frameborder="0"></iframe>
                </div>
              </div>
              <p className="text-body-mobile md:text-body text-muted-foreground mt-4">
                Ровно шесть отзывов о нашей работе в разных ситуациях.
              </p>
            </div>

            <div className="section__content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={`${testimonial.nameShort}-${index}`} className="border-border h-full">
                  <CardContent className="pt-6 h-full flex flex-col">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-1 text-accent">
                        {[...Array(testimonial.rating)].map((_, starIndex) => (
                          <Star key={starIndex} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-small text-muted-foreground">
                        {testimonial.dateText}
                      </p>
                    </div>
                    <blockquote className="text-small text-muted-foreground italic mb-4 leading-relaxed">
                      “{testimonial.text}”
                    </blockquote>
                    <div className="border-t border-border pt-4 mt-auto">
                      <p className="text-small font-semibold">{testimonial.nameShort}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button asChild size="lg" className="px-6">
                <a
                  href="https://yandex.ru/maps/org/244880896695/reviews/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Смотреть все отзывы на Яндекс.Картах
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="section">
          <div className="container">
            <div className="section__header max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-4">
                Команда
              </h2>
              <p className="text-body-mobile md:text-body text-muted-foreground">
                Специалисты, которые ведут дела клиентов в ключевых направлениях.
              </p>
            </div>

            <div className="section__content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredTeam.map((member) => (
                <Card key={member.slug} className="border-border hover:shadow-elegant transition-all h-full">
                  <CardContent className="pt-6 flex flex-col h-full">
                    <div className="w-24 h-24 rounded-xl overflow-hidden mb-4 border border-border">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-serif text-h3-mobile md:text-h3 font-semibold mb-2">
                      {member.name}
                    </h3>
                    <p className="text-small text-muted-foreground mb-3">{member.role}</p>
                    {member.experienceText && (
                      <p className="text-small text-muted-foreground mb-4">{member.experienceText}</p>
                    )}
                    <ul className="space-y-2 text-small text-muted-foreground">
                      {(member.specializations ?? []).slice(0, 2).map((spec) => (
                        <li key={spec}>• {spec}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button variant="outline" size="lg" asChild>
                <Link to="/o-kollegii#team">Смотреть всю команду →</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="section__header text-center">
                <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-4">
                  Короткий FAQ
                </h2>
              </div>

              <Accordion type="single" collapsible className="section__content space-y-4">
                {faqItems.map((item, index) => (
                  <AccordionItem key={item.question} value={`faq-${index}`} className="bg-card border border-border rounded-xl px-6">
                    <AccordionTrigger className="text-left hover:text-accent">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contacts Section */}
        <section className="section">
          <div className="container">
            <Card className="border-border shadow-elegant">
              <CardContent className="pt-8 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-4">
                      Контакты
                    </h2>
                    <p className="text-body-mobile md:text-body text-muted-foreground mb-6">
                      Напишите или позвоните — мы подскажем, как лучше начать работу с вашим вопросом.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-accent" />
                        <a href={`tel:${SITE.phoneRaw}`} className="text-body-mobile md:text-body font-medium hover:text-accent transition-colors">
                          {SITE.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-accent" />
                        <a href={`mailto:${SITE.email}`} className="text-body-mobile md:text-body font-medium hover:text-accent transition-colors">
                          {SITE.email}
                        </a>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-accent mt-1" />
                        <p className="text-body-mobile md:text-body font-medium">
                          {SITE.address.city}, {SITE.address.street}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <Button size="lg" className="bg-accent text-white hover:bg-accent/90" asChild>
                      <Link to="/kontakty">Получить консультацию</Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-border"
                      asChild
                    >
                      <a href={`https://wa.me/${SITE.phoneRaw.replace("+", "")}`} target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon size={18} />
                        WhatsApp
                      </a>
                    </Button>
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
