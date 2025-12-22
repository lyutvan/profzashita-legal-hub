import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegalBackground from "@/components/LegalBackground";
import LeadForm from "@/components/LeadForm";
import Testimonials from "@/components/Testimonials";
import { OrganizationSchema, WebSiteSchema, ReviewsSchema } from "@/components/JsonLd";
import { testimonials } from "@/data/testimonials";
import { serviceCategories } from "@/data/services";
import { Shield, Target, Award, Users, CheckCircle, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import courtColumnsImg from "@/assets/legal/court-columns.jpg";
import gavelScalesBookImg from "@/assets/legal/gavel-scales-book.jpg";
import lawyerConsultationImg from "@/assets/legal/lawyer-consultation.jpg";
import themisStatueImg from "@/assets/legal/themis-statue.jpg";
import courtBuildingImg from "@/assets/legal/court-building.jpg";
import lawyerWritingImg from "@/assets/legal/lawyer-writing.jpg";
import themisDeskImg from "@/assets/legal/themis-desk.jpg";
import { Helmet } from "react-helmet";
import { SITE } from "@/config/site";
import TeamSection from "@/components/TeamSection";

const Index = () => {
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
        author: t.name,
        rating: t.rating,
        reviewBody: t.quote,
        datePublished: t.datePublished
      }))} />
      <Header />
      
      <main className="flex-1">
        {/* Hero with Legal Background */}
        <LegalBackground
          imageSrc={courtColumnsImg}
          imageAlt="Классический зал суда с мраморными колоннами"
          overlayOpacity={0.6}
          className="min-h-[600px] md:min-h-[700px]"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block border-2 border-white/30 rounded-lg px-6 py-3 mb-8">
              <p className="text-white text-base md:text-lg font-medium">
                Коллегия адвокатов города Москвы "ПРОФЗАЩИТА"
              </p>
            </div>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6 leading-tight mt-4">
              Юридическая помощь по делам любой сложности
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Бесплатная консультация · Индивидуальная стратегия · Профессиональный подход
            </p>
            <div className="flex justify-center">
              <Button size="lg" variant="destructive" className="text-lg px-8" asChild>
                <Link to="/kontakty">Дежурный адвокат</Link>
              </Button>
            </div>

            {/* Services Quick Access */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto mt-12">
              {/* Уголовные дела */}
              <Card className="border-2 border-white/20 bg-black/30 backdrop-blur-sm hover:border-accent/50 transition-all hover:shadow-elegant flex flex-col h-full">
                <CardContent className="p-4 flex flex-col flex-1">
                  <div className="flex-1">
                    <h3 className="font-playfair text-xl font-bold mb-2 text-white">Уголовные дела</h3>
                    <p className="text-white/80 mb-4 leading-relaxed text-sm">
                      Профессиональные юридические услуги для защиты ваших интересов
                    </p>
                  </div>
                  <Button asChild className="w-full bg-[#C9A227] hover:bg-[#B08E1F] text-white">
                    <Link to="/services/criminal">
                      Подробнее →
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Для бизнеса */}
              <Card className="border-2 border-white/20 bg-black/30 backdrop-blur-sm hover:border-accent/50 transition-all hover:shadow-elegant flex flex-col h-full">
                <CardContent className="p-4 flex flex-col flex-1">
                  <div className="flex-1">
                    <h3 className="font-playfair text-xl font-bold mb-2 text-white">Для бизнеса</h3>
                    <p className="text-white/80 mb-4 leading-relaxed text-sm">
                      Комплексное юридическое сопровождение компаний и предпринимателей
                    </p>
                  </div>
                  <Button asChild className="w-full bg-[#C9A227] hover:bg-[#B08E1F] text-white">
                    <Link to="/services/biz">
                      Подробнее →
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Для граждан */}
              <Card className="border-2 border-white/20 bg-black/30 backdrop-blur-sm hover:border-accent/50 transition-all hover:shadow-elegant flex flex-col h-full">
                <CardContent className="p-4 flex flex-col flex-1">
                  <div className="flex-1">
                    <h3 className="font-playfair text-xl font-bold mb-2 text-white">Для граждан</h3>
                    <p className="text-white/80 mb-4 leading-relaxed text-sm">
                      Защита прав и интересов физических лиц в гражданских делах
                    </p>
                  </div>
                  <Button asChild className="w-full bg-[#C9A227] hover:bg-[#B08E1F] text-white">
                    <Link to="/services/phys">
                      Подробнее →
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </LegalBackground>

        {/* About Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src={courtBuildingImg} 
              alt="" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-background/85" />
          </div>
          {/* Texture strip */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent z-10" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                О коллегии адвокатов <span className="text-accent">Профзащита</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Мы — команда опытных адвокатов, объединённых общей целью: защитить права и интересы наших клиентов. 
                За годы работы мы помогли сотням людей и организаций добиться справедливости.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center border-border hover:shadow-elegant transition-all">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold mb-2">Опыт</h3>
                  <p className="text-sm text-muted-foreground">Более 15 лет успешной практики</p>
                </CardContent>
              </Card>

              <Card className="text-center border-border hover:shadow-elegant transition-all">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold mb-2">Точность</h3>
                  <p className="text-sm text-muted-foreground">Детальный анализ каждого дела</p>
                </CardContent>
              </Card>

              <Card className="text-center border-border hover:shadow-elegant transition-all">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold mb-2">Качество</h3>
                  <p className="text-sm text-muted-foreground">Высокий процент выигранных дел</p>
                </CardContent>
              </Card>

              <Card className="text-center border-border hover:shadow-elegant transition-all">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold mb-2">Команда</h3>
                  <p className="text-sm text-muted-foreground">Профессиональные адвокаты</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Practices Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src={gavelScalesBookImg} 
              alt="" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-background/90" />
          </div>
          {/* Texture strip */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent z-10" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                Наши <span className="text-accent">услуги</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Комплексная юридическая помощь в различных областях права
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
              <Card className="border-border hover:shadow-elegant transition-all group">
                <CardContent className="pt-6">
                  <h3 className="font-playfair text-2xl font-bold mb-2 text-accent">
                    Физическим лицам
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Защита прав граждан в различных сферах
                  </p>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        to="/services/phys#Уголовная защита"
                        className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-start gap-2"
                      >
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        Уголовные дела
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/services/phys#Гражданские дела"
                        className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-start gap-2"
                      >
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        Гражданские дела
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/services/phys#Семейные споры"
                        className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-start gap-2"
                      >
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        Семейные споры
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/services/phys#Гражданские дела"
                        className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-start gap-2"
                      >
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        Жилищные дела
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/services/phys#Гражданские дела"
                        className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-start gap-2"
                      >
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        Наследство
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-border hover:shadow-elegant transition-all group">
                <CardContent className="pt-6">
                  <h3 className="font-playfair text-2xl font-bold mb-2 text-accent">
                    Юридическим лицам
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Корпоративное обслуживание бизнеса
                  </p>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        to="/services/biz#Судебная защита"
                        className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-start gap-2"
                      >
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        Арбитражные споры
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/services/biz#Договорная работа"
                        className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-start gap-2"
                      >
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        Договорная работа и претензии
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/services/biz#Налоговое право"
                        className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-start gap-2"
                      >
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        Налоговые споры и проверки
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/services/biz#Взыскание долгов"
                        className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-start gap-2"
                      >
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        Взыскание дебиторской задолженности
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/services/biz#Банкротство"
                        className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-start gap-2"
                      >
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        Банкротство и субсидиарная ответственность
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button variant="outline" size="lg" asChild>
                <Link to="/uslugi">Все услуги →</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src={lawyerWritingImg} 
              alt="" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-background/85" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                Почему выбирают <span className="text-accent">нас</span>
              </h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {[
                "Бесплатная первичная консультация для оценки перспектив дела",
                "Индивидуальный подход к каждому клиенту и делу",
                "Прозрачное ценообразование без скрытых комиссий",
                "Конфиденциальность и соблюдение адвокатской тайны",
                "Работаем по всей России, представительство в судах любых инстанций",
                "Возможность удалённого взаимодействия через видеосвязь",
              ].map((advantage, index) => (
                <div key={index} className="flex items-start gap-4 bg-card p-6 rounded-lg border border-border hover:shadow-elegant transition-all">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <p className="text-base leading-relaxed">{advantage}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <TeamSection id="team" backgroundImage={lawyerConsultationImg} />

        {/* Testimonials Section */}
        <Testimonials />

        {/* FAQ Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src={themisDeskImg} 
              alt="" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-background/85" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                  Часто задаваемые <span className="text-accent">вопросы</span>
                </h2>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="bg-card border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:text-accent">
                    Сколько стоит первичная консультация?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Первичная консультация бесплатна. На ней мы оценим перспективы вашего дела и предложим стратегию защиты.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="bg-card border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:text-accent">
                    Как происходит оплата услуг?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Стоимость определяется после изучения дела. Возможна поэтапная оплата. Мы заключаем официальный договор с прозрачными условиями.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="bg-card border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:text-accent">
                    Можно ли работать удалённо?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Да, мы работаем с клиентами из любого региона России. Консультации проводим по видеосвязи, документы обмениваем электронно.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="bg-card border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:text-accent">
                    Какие гарантии успеха?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Мы честно оцениваем перспективы дела на этапе консультации. Более 98% наших клиентов получают положительное решение.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="bg-card border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:text-accent">
                    Как быстро можно начать работу?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    После первичной консультации и заключения договора мы приступаем к работе немедленно. В срочных случаях — в течение суток.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src={themisStatueImg} 
              alt="" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-background/90" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                    Получите бесплатную <span className="text-accent">консультацию</span>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    Оставьте заявку, и наш специалист свяжется с вами в течение 15 минут, 
                    чтобы обсудить вашу ситуацию и предложить решение.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-accent" />
                      <a href="tel:+79168597654" className="text-lg font-medium hover:text-accent transition-colors">
                        +7 (916) 859‑76‑54
                      </a>
                    </div>
                  </div>
                </div>

                <Card className="border-border shadow-elegant">
                  <CardContent className="pt-6">
                    <LeadForm />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
