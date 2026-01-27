import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useQuickQuestionModal } from "@/components/QuickQuestionModalProvider";
import {
  AlertTriangle,
  Award,
  CheckCircle2,
  Clock,
  Shield,
  TrendingUp,
  Users
} from "lucide-react";
import { BreadcrumbSchema, FAQPageSchema, LegalServiceSchema, ReviewsSchema } from "@/components/JsonLd";
import { SITE } from "@/config/site";
import { getServiceHeroImage } from "@/lib/serviceCardImages";
import type { CriminalServicePageData, CriminalWhyUsItem } from "@/data/criminal-service-content";

interface CriminalServiceTemplateProps {
  data: CriminalServicePageData;
}

const iconMap: Record<CriminalWhyUsItem["icon"], JSX.Element> = {
  shield: <Shield className="h-6 w-6 text-accent" />,
  clock: <Clock className="h-6 w-6 text-accent" />,
  trend: <TrendingUp className="h-6 w-6 text-accent" />,
  users: <Users className="h-6 w-6 text-accent" />,
  award: <Award className="h-6 w-6 text-accent" />,
  check: <CheckCircle2 className="h-6 w-6 text-accent" />
};

const CriminalServiceTemplate = ({ data }: CriminalServiceTemplateProps) => {
  const heroImage = getServiceHeroImage(data.entry.path, "criminal");
  const ogImage = heroImage.startsWith("http")
    ? heroImage
    : `${SITE.url}${heroImage.replace(/^\//, "")}`;
  const { openQuickQuestionModal } = useQuickQuestionModal();

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
        {/* Hero */}
        <section
          className="relative text-white section"
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
              background:
                "linear-gradient(180deg, rgba(5,12,28,0.92) 0%, rgba(11,31,58,0.75) 45%, rgba(11,31,58,0.35) 100%)"
            }}
          />
          <div className="container relative z-10">
            <Breadcrumbs items={data.breadcrumbs} />
            <div className="max-w-4xl mt-6">
              <div className="text-accent text-small font-semibold tracking-wide uppercase mb-3">
                {data.categoryLabel}
              </div>
              <h1 className="font-serif text-h1-mobile md:text-h1 font-bold mb-6 leading-tight">
                {data.heroTitle}
              </h1>
              <p className="lead text-white/90 leading-relaxed mb-6">
                {data.heroSubtitle}
              </p>
              <ul className="grid gap-3 md:grid-cols-2 mb-8">
                {data.heroBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-white/85">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-5">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white"
                  onClick={() => openQuickQuestionModal({ topic: data.heroTitle })}
                >
                  Получить план защиты
                </Button>
                <a
                  href="#included"
                  className="text-white/80 hover:text-white underline underline-offset-4"
                >
                  Что входит в помощь
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Offer 24/48 */}
        <section id="offer" className="section bg-muted/30">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-3">
                Что сделаем в первые 24–48 часов
              </h2>
              <p className="text-muted-foreground">
                Планируем первичные действия без обещаний результата — только то, что реально влияет на защиту.
              </p>
            </div>
            <div className="section__content grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">За 24 часа</h3>
                  <ul className="space-y-2 text-small text-muted-foreground">
                    {data.offer24.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">За 48 часов</h3>
                  <ul className="space-y-2 text-small text-muted-foreground">
                    {data.offer48.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Triggers */}
        <section className="section">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-3">
                Когда нужен адвокат
              </h2>
              <p className="text-muted-foreground">
                Эти ситуации требуют защиты как можно раньше.
              </p>
            </div>
            <div className="section__content grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.triggers.map((item) => (
                <Card key={item} className="h-full border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-accent mt-0.5" />
                      <span className="text-small text-muted-foreground">{item}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Plan */}
        <section id="plan" className="section bg-muted/30 scroll-mt-24">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-3">
                Что делаем по шагам
              </h2>
              <p className="text-muted-foreground">
                Пошаговая защита на каждом этапе процесса.
              </p>
            </div>
            <div className="section__content grid gap-4">
              {data.planSteps.map((step, index) => (
                <Card key={step.title} className="border-l-4 border-l-accent">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <span className="font-bold text-accent">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-body-mobile md:text-body mb-2">{step.title}</h3>
                        <p className="text-small text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Included */}
        <section id="included" className="section scroll-mt-24">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-3">
                Что входит в помощь
              </h2>
              <p className="text-muted-foreground">
                Фиксируем объем работ сразу, чтобы вы понимали, что получаете.
              </p>
            </div>
            <div className="section__content grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.included.map((item) => (
                <Card key={item} className="h-full border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5" />
                      <span className="text-small text-muted-foreground">{item}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Practice */}
        <section id="practice" className="section bg-muted/30">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-3">
                Практика и кейсы
              </h2>
              <p className="text-muted-foreground">
                {data.cases.length > 0
                  ? "Обобщенные примеры работы без раскрытия персональных данных."
                  : data.practiceNote}
              </p>
            </div>
            {data.cases.length > 0 ? (
              <div className="section__content grid gap-6 md:grid-cols-2">
                {data.cases.map((item, index) => (
                  <Card key={`${item.situation}-${index}`}>
                    <CardContent className="pt-6 space-y-4">
                      <div>
                        <div className="text-small uppercase text-muted-foreground mb-1">Ситуация</div>
                        <p className="font-semibold">{item.situation}</p>
                      </div>
                      <div>
                        <div className="text-small uppercase text-muted-foreground mb-1">Что сделали</div>
                        <p className="text-small text-muted-foreground">{item.actions}</p>
                      </div>
                      <div>
                        <div className="text-small uppercase text-muted-foreground mb-1">Итог</div>
                        <p className="text-small text-muted-foreground">{item.result}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="section__content grid gap-4 sm:grid-cols-2">
                {data.practiceHighlights.map((item) => (
                  <Card key={item} className="h-full border-border">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-accent mt-0.5" />
                        <span className="text-small text-muted-foreground">{item}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Price */}
        <section id="price" className="section">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-3">
                Стоимость
              </h2>
              <p className="text-muted-foreground">{data.priceNote}</p>
            </div>
            <div className="section__content grid gap-6 lg:grid-cols-2">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Что влияет на стоимость</h3>
                  <ul className="space-y-2 text-small text-muted-foreground">
                    {data.priceFactors.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent mt-0.5" />
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
                        <p className="text-small text-muted-foreground">{format.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section id="why-us" className="section bg-muted/30">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-3">
                Почему выбирают нас
              </h2>
              <p className="text-muted-foreground">
                Сильная защита строится на опыте, стратегии и дисциплине.
              </p>
            </div>
            <div className="section__content grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.whyUs.map((item) => (
                <Card key={item.title} className="border-l-4 border-l-accent">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-accent/10">
                        {iconMap[item.icon]}
                      </div>
                      <div>
                        <h3 className="font-semibold text-body-mobile md:text-body mb-2">{item.title}</h3>
                        <p className="text-small text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="team" className="section">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-3">
                Наша команда
              </h2>
              <p className="text-muted-foreground">
                Профильные адвокаты, которые ведут уголовные дела.
              </p>
            </div>
            <div className="section__content grid gap-6 md:grid-cols-2">
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
                        <div className="font-semibold text-body-mobile md:text-body">{member.name}</div>
                        <div className="text-small text-accent">{member.role}</div>
                        {member.experience && (
                          <div className="text-small text-muted-foreground mt-1">{member.experience}</div>
                        )}
                      </div>
                    </div>
                    <ul className="space-y-2 text-small text-muted-foreground mb-4">
                      {member.bullets.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant="outline" className="mt-auto">
                      <Link to={`/team/${member.slug}`}>Подробнее</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="section bg-muted/30">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-3">
                Отзывы
              </h2>
              <p className="text-muted-foreground">
                Клиенты отмечают точность и аккуратность защиты.
              </p>
            </div>
            <div className="section__content grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.reviews.map((review, index) => (
                <Card key={`${review.name}-${index}`} className="h-full">
                  <CardContent className="pt-6 h-full flex flex-col">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="text-small font-semibold">{review.name}</div>
                      <div className="text-small text-muted-foreground">{review.date}</div>
                    </div>
                    <p className="text-small text-muted-foreground leading-relaxed">{review.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8">
              <Button asChild className="bg-primary text-white hover:bg-primary/90">
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

        {/* FAQ */}
        <section id="faq" className="section">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-3">
                FAQ по теме
              </h2>
              <p className="text-muted-foreground">Короткие ответы на самые частые вопросы.</p>
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

        {/* Consultation */}
        <section id="consultation" className="section bg-primary text-white scroll-mt-24">
          <div className="container">
            <div className="section__content grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-4">
                  Получите оценку ситуации и план защиты
                </h2>
                <p className="text-white/80 mb-6">
                  Опишите обстоятельства — мы уточним детали и предложим следующий шаг.
                </p>
              </div>
              <Card className="bg-white text-foreground border-0">
                <CardContent className="pt-6">
                  <LeadForm practiceType={data.entry.title} variant="compact" />
                  <div className="text-small text-muted-foreground mt-4">
                    Первичная оценка — после уточняющих вопросов и документов. Срочные запросы обрабатываются в приоритете.
                  </div>
                  <p className="text-small text-muted-foreground mt-3">{data.disclaimer}</p>
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

export default CriminalServiceTemplate;
