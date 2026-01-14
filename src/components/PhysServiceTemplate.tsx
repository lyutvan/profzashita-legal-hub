import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PhysServiceLeadForm from "@/components/PhysServiceLeadForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckCircle2, FileText, ArrowUpRight } from "lucide-react";
import { BreadcrumbSchema, LegalServiceSchema, FAQPageSchema, ReviewsSchema } from "@/components/JsonLd";
import { SITE } from "@/config/site";
import { getServiceHeroImage } from "@/lib/serviceCardImages";
import type { PhysServicePageData } from "@/data/phys-service-content";

interface PhysServiceTemplateProps {
  data: PhysServicePageData;
}

const PhysServiceTemplate = ({ data }: PhysServiceTemplateProps) => {
  const [highlightStep, setHighlightStep] = useState<number | null>(null);
  const heroImage = getServiceHeroImage(data.entry.path, "phys");
  const ogImage = heroImage.startsWith("http")
    ? heroImage
    : `${SITE.url}${heroImage.replace(/^\//, "")}`;

  const handleScenarioClick = (stepIndex?: number) => {
    setHighlightStep(stepIndex ?? 0);
    const plan = document.getElementById("plan");
    if (plan) {
      plan.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{data.metaTitle}</title>
        <meta name="description" content={data.metaDescription} />
        <link rel="canonical" href={data.canonical} />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        <meta property="og:title" content={data.metaTitle} />
        <meta property="og:description" content={data.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={data.canonical} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="Профзащита" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.metaTitle} />
        <meta name="twitter:description" content={data.metaDescription} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <BreadcrumbSchema items={data.breadcrumbSchema} />
      <LegalServiceSchema serviceType={data.heroTitle} url={data.canonical} />
      {data.faqs.length > 0 && <FAQPageSchema items={data.faqs} url={data.canonical} />}
      {data.reviews.length > 0 && (
        <ReviewsSchema
          reviews={data.reviews.map((review) => ({
            author: review.name,
            rating: review.rating,
            reviewBody: review.text,
            datePublished: review.date
          }))}
        />
      )}

      <Header />

      <main className="flex-1">
        {/* Section A: Hero */}
        <section
          className="relative text-white py-12 md:py-16"
          style={{
            backgroundImage: `url("${heroImage}")`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background: "linear-gradient(180deg, rgba(5,12,28,0.92) 0%, rgba(11,31,58,0.75) 45%, rgba(11,31,58,0.35) 100%)"
            }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <Breadcrumbs items={data.breadcrumbs} />
            <div className="max-w-4xl mt-6">
              <div className="text-[#C9A227] text-sm md:text-base font-semibold tracking-wide uppercase mb-3">
                {data.categoryLabel}
              </div>
              <h1 className="font-montserrat text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {data.heroTitle}
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6">
                {data.heroSubtitle}
              </p>
              <ul className="grid gap-3 md:grid-cols-2 mb-8">
                {data.heroBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-white/85">
                    <CheckCircle2 className="h-5 w-5 text-[#C9A227] mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-5">
                <Button
                  size="lg"
                  className="bg-[#C9A227] hover:bg-[#B08E1F] text-white"
                  asChild
                >
                  <a href="#final-cta">Оценить перспективы</a>
                </Button>
                <a
                  href="#documents"
                  className="text-white/80 hover:text-white underline underline-offset-4"
                >
                  Какие документы нужны?
                </a>
              </div>
              <p className="text-xs text-white/60 mt-6">
                Не обещаем результат, оцениваем перспективы после изучения документов
              </p>
            </div>
          </div>
        </section>

        {/* Section B: Scenarios */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-8">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
                Это ваш случай?
              </h2>
              <p className="text-muted-foreground">
                Выберите ситуацию — покажем ближайший шаг и что важно учесть.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.scenarios.map((scenario, index) => (
                <button
                  key={`${scenario.title}-${index}`}
                  type="button"
                  onClick={() => handleScenarioClick(scenario.highlightStep)}
                  className="text-left"
                >
                  <Card className="h-full border-border hover:shadow-elegant transition-all">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <p className="font-semibold">{scenario.title}</p>
                        <ArrowUpRight className="h-4 w-4 text-[#C9A227]" />
                      </div>
                    </CardContent>
                  </Card>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Section C: Plan */}
        <section id="plan" className="py-12 md:py-16 bg-muted/30 scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-8">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
                Что сделаем и как
              </h2>
              <p className="text-muted-foreground">
                Структурируем работу так, чтобы вы понимали каждый этап и сроки.
              </p>
            </div>
            <div className="grid gap-4">
              {data.planSteps.map((step, index) => {
                const isActive = highlightStep === index;
                return (
                  <Card
                    key={`${step.title}-${index}`}
                    className={`border-l-4 ${isActive ? "border-l-[#C9A227] bg-[#C9A227]/5" : "border-l-transparent"}`}
                  >
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full ${isActive ? "bg-[#C9A227]" : "bg-[#C9A227]/10"} flex items-center justify-center`}>
                          <span className={`font-bold ${isActive ? "text-white" : "text-[#C9A227]"}`}>{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="grid gap-6 md:grid-cols-2 mt-8">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Если дело уже в суде</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {data.planInCourt.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#C9A227] mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Если суда ещё нет</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {data.planBeforeCourt.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#C9A227] mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section D: Timing and documents */}
        <section id="documents" className="py-12 md:py-16 scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-8">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
                Сроки и документы
              </h2>
              <p className="text-muted-foreground">
                Сразу обозначаем, что влияет на сроки и что нужно подготовить.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="h-5 w-5 text-[#C9A227]" />
                    <h3 className="font-semibold">Сроки</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {data.timingFactors.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#C9A227] mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="h-5 w-5 text-[#C9A227]" />
                    <h3 className="font-semibold">Документы</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {data.documents.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#C9A227] mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8">
              <Button
                className="bg-[#C9A227] hover:bg-[#B08E1F] text-white"
                asChild
              >
                <a href="#final-cta">Отправить документы на оценку</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Section E: Pricing */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-8">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
                Стоимость
              </h2>
              <p className="text-muted-foreground">
                Стоимость определяется после анализа документов и стадии дела.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Что влияет на стоимость</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {data.priceFactors.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#C9A227] mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Форматы работы</h3>
                  <div className="space-y-4">
                    {data.priceFormats.map((format) => (
                      <div key={format.title}>
                        <div className="font-semibold">{format.title}</div>
                        <p className="text-sm text-muted-foreground">{format.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Что не входит и оплачивается отдельно</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {data.priceExcludes.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#C9A227] mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section F: Risks */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-8">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
                Риски и частые ошибки клиентов
              </h2>
              <p className="text-muted-foreground">
                Эти ошибки часто ухудшают позицию и удлиняют сроки.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Типовые ошибки</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {data.mistakes.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Когда лучше не тянуть</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {data.urgent.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-[#C9A227] mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section G: Cases */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-8">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
                Кейсы и результаты
              </h2>
              <p className="text-muted-foreground">
                Обобщенные примеры без раскрытия персональных данных.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {data.cases.map((item, index) => (
                <Card key={`${item.situation}-${index}`}>
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <div className="text-xs uppercase text-muted-foreground mb-1">Ситуация</div>
                      <p className="font-semibold">{item.situation}</p>
                    </div>
                    <div>
                      <div className="text-xs uppercase text-muted-foreground mb-1">Что сделали</div>
                      <p className="text-sm text-muted-foreground">{item.actions}</p>
                    </div>
                    <div>
                      <div className="text-xs uppercase text-muted-foreground mb-1">Итог</div>
                      <p className="text-sm text-muted-foreground">{item.result}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Section H: Team */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-8">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
                Кто ведет дела
              </h2>
              <p className="text-muted-foreground">
                Ведущие специалисты по теме и профильные эксперты.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {data.team.map((member) => (
                <Card key={member.slug} className="h-full">
                  <CardContent className="pt-6 h-full flex flex-col">
                    <div className="flex gap-4 mb-4">
                      {member.photo && (
                        <div className="w-20 h-20 rounded-lg overflow-hidden border border-border">
                          <img
                            src={member.photo}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-lg">{member.name}</div>
                        <div className="text-sm text-accent">{member.role}</div>
                        {member.experience && (
                          <div className="text-xs text-muted-foreground mt-1">{member.experience}</div>
                        )}
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                      {member.bullets.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#C9A227] mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={`/team/${member.slug}`}
                      className="mt-auto text-sm text-[#C9A227] hover:underline"
                    >
                      Смотреть профиль
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Section I: Reviews */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-8">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
                Отзывы по теме
              </h2>
              <p className="text-muted-foreground">
                Клиенты отмечают прозрачность и результативность работы.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.reviews.map((review, index) => (
                <Card key={`${review.name}-${index}`} className="h-full">
                  <CardContent className="pt-6 h-full flex flex-col">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="text-sm font-semibold">{review.name}</div>
                      <div className="text-xs text-muted-foreground">{review.date}</div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {review.text}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8">
              <Button asChild className="bg-[#0B1F3A] text-white hover:bg-[#0B1F3A]/90">
                <a
                  href="https://yandex.ru/maps/org/244880896695/reviews/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Смотреть все отзывы в Яндекс.Картах
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-8">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
                Другие услуги физлицам
              </h2>
              <p className="text-muted-foreground">
                Посмотрите другие направления, если ваш запрос шире текущей услуги.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.otherServices.map((service) => (
                <Card key={service.path} className="h-full">
                  <CardContent className="pt-6">
                    <Link
                      to={service.path}
                      className="text-sm font-semibold text-[#0B1F3A] hover:text-[#C9A227]"
                    >
                      {service.title}
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6">
              <Button asChild variant="outline">
                <Link to="/services/phys">Все услуги физлицам</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* SEO Text */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-8">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
                Подробно об услуге
              </h2>
              <p className="text-muted-foreground">
                Разъясняем нюансы, этапы и типовые ситуации по теме услуги.
              </p>
            </div>
            <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              {data.seoText.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Section J: FAQ */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-8">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
                FAQ по услуге
              </h2>
              <p className="text-muted-foreground">
                Короткие ответы на самые частые вопросы.
              </p>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {data.faqs.map((faq, index) => (
                <AccordionItem key={`${faq.question}-${index}`} value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Section K: Final CTA */}
        <section id="final-cta" className="py-12 md:py-16 bg-[#0B1F3A] text-white scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-4">
                  Получите оценку перспектив и план действий
                </h2>
                <p className="text-white/80 mb-6">
                  Заполните форму — мы уточним детали и вернемся с конкретными шагами.
                </p>
              </div>
              <Card className="bg-white text-foreground border-0">
                <CardContent className="pt-6">
                  <PhysServiceLeadForm
                    serviceTitle={data.entry.title}
                    situationOptions={data.scenarios.map((item) => item.title)}
                    desiredResults={data.desiredResults}
                  />
                  <div className="text-xs text-muted-foreground mt-4">
                    Первичная оценка — после уточняющих вопросов и документов. Бесплатные консультации не обещаем.
                    В срочных случаях — приоритетная связь.
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Нажимая кнопку, вы соглашаетесь с{" "}
                    <a href="/privacy" className="text-[#C9A227] hover:underline">
                      политикой конфиденциальности
                    </a>.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PhysServiceTemplate;
