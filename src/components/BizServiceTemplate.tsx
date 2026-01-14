import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
import type { BizServicePageData, BizWhyUsItem } from "@/data/biz-service-content";

interface BizServiceTemplateProps {
  data: BizServicePageData;
}

const iconMap: Record<BizWhyUsItem["icon"], JSX.Element> = {
  shield: <Shield className="h-6 w-6 text-[#C9A227]" />,
  clock: <Clock className="h-6 w-6 text-[#C9A227]" />,
  trend: <TrendingUp className="h-6 w-6 text-[#C9A227]" />,
  users: <Users className="h-6 w-6 text-[#C9A227]" />,
  award: <Award className="h-6 w-6 text-[#C9A227]" />,
  check: <CheckCircle2 className="h-6 w-6 text-[#C9A227]" />
};

const BizServiceTemplate = ({ data }: BizServiceTemplateProps) => {
  const heroImage = getServiceHeroImage(data.entry.path, "biz");
  const ogImage = heroImage.startsWith("http")
    ? heroImage
    : `${SITE.url}${heroImage.replace(/^\//, "")}`;

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
              background:
                "linear-gradient(180deg, rgba(5,12,28,0.92) 0%, rgba(11,31,58,0.75) 45%, rgba(11,31,58,0.35) 100%)"
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
              <div className="flex flex-wrap items-center gap-5">
                <Button size="lg" className="bg-[#C9A227] hover:bg-[#B08E1F] text-white" asChild>
                  <a href="#consultation">Получить консультацию</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Who fits */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-8">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
                Кому подходит
              </h2>
              <p className="text-muted-foreground">
                Подходит компаниям, которым важны срок, результат и управляемые риски.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.whoFits.map((item) => (
                <Card key={item} className="h-full border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#C9A227] mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-8">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
                Что получите на выходе
              </h2>
              <p className="text-muted-foreground">
                Результат фиксируем документально и по этапам.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.outcomes.map((item) => (
                <Card key={item} className="h-full border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#C9A227] mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Risks */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-8">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
                Риски, которые снимаем
              </h2>
              <p className="text-muted-foreground">
                Снижаем юридические и финансовые риски без обещаний невозможного.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.risks.map((item) => (
                <Card key={item} className="h-full border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-[#C9A227] mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-8">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
                Как работаем
              </h2>
              <p className="text-muted-foreground">
                Пошаговый процесс, чтобы вы понимали сроки и зоны ответственности.
              </p>
            </div>
            <div className="grid gap-4">
              {data.steps.map((step, index) => (
                <Card key={step.title} className="border-l-4 border-l-[#C9A227]">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C9A227]/10 flex items-center justify-center">
                        <span className="font-bold text-[#C9A227]">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Included */}
        <section id="included" className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-8">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
                Что входит
              </h2>
              <p className="text-muted-foreground">
                Фиксируем объем работ до начала проекта.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.included.map((item) => (
                <Card key={item} className="h-full border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#C9A227] mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timing */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-8">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
                Сроки
              </h2>
              <p className="text-muted-foreground">{data.timing}</p>
            </div>
          </div>
        </section>

        {/* Price */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-8">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
                Стоимость
              </h2>
              <p className="text-muted-foreground">{data.priceNote}</p>
            </div>
          </div>
        </section>

        {/* Practice */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-8">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
                Кейсы и практика
              </h2>
              <p className="text-muted-foreground">
                {data.cases.length > 0
                  ? "Обобщенные примеры без раскрытия конфиденциальных данных."
                  : data.practiceNote}
              </p>
            </div>
            {data.cases.length > 0 ? (
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
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {data.practiceHighlights.map((item) => (
                  <Card key={item} className="h-full border-border">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#C9A227] mt-0.5" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Why Us */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-8">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
                Почему выбирают нас
              </h2>
              <p className="text-muted-foreground">
                Опыт, стратегия и прозрачность — основа защиты бизнеса.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.whyUs.map((item) => (
                <Card key={item.title} className="border-l-4 border-l-[#C9A227]">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-[#C9A227]/10">
                        {iconMap[item.icon]}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="team" className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-8">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
                Наша команда
              </h2>
              <p className="text-muted-foreground">
                Профильные специалисты по юридическому сопровождению бизнеса.
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
        <section id="reviews" className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-8">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
                Отзывы
              </h2>
              <p className="text-muted-foreground">
                Клиенты ценят точность и прозрачность работы.
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
                    <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
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
                  Смотреть все отзывы на Яндекс.Картах
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-8">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
                FAQ по теме услуги
              </h2>
              <p className="text-muted-foreground">Короткие ответы на частые вопросы.</p>
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
        <section id="consultation" className="py-12 md:py-16 bg-[#0B1F3A] text-white scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-4">
                  Получите план решения и оценку рисков
                </h2>
                <p className="text-white/80 mb-6">
                  Опишите задачу — уточним детали и предложим следующий шаг.
                </p>
              </div>
              <Card className="bg-white text-foreground border-0">
                <CardContent className="pt-6">
                  <LeadForm practiceType={data.entry.title} variant="compact" />
                  <div className="text-xs text-muted-foreground mt-4">
                    Первичная оценка — после уточняющих вопросов и документов. Срочные запросы обрабатываются в приоритете.
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">{data.disclaimer}</p>
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

export default BizServiceTemplate;
