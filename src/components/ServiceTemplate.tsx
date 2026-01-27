import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PriceBlock from "@/components/PriceBlock";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, FileText, Clock, Phone } from "lucide-react";
import { LegalServiceSchema, BreadcrumbSchema } from "@/components/JsonLd";
import { SITE } from "@/config/site";
import { useQuickQuestionModal } from "@/components/QuickQuestionModalProvider";
import { getPriceBySlug } from "@/data/pricing";
import { getServiceCardImageForPath } from "@/lib/serviceCardImages";

interface ServiceStep {
  number: number;
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface ServiceTemplateProps {
  // Meta
  title: string;
  metaDescription: string;
  canonical: string;

  audience?: "phys" | "biz" | "criminal";
  subtitle?: string;
  
  // Breadcrumbs
  breadcrumbLabel: string;
  
  // Content
  h1: string;
  leadParagraph: string;
  introParagraphs?: string[];
  whenToContactTitle?: string;
  whenToContact: string[];
  whatWeDoTitle?: string;
  whatWeDo: string[];
  steps: ServiceStep[];
  stepsTitle?: string;
  documentsAndTimingTitle?: string;
  documentsAndTiming: string;
  documentsList?: string[];
  faqs: FAQ[];
  ctaBlock?: {
    title: string;
    description: string;
  };
  
  // Related links
  relatedLinks?: Array<{
    title: string;
    url: string;
  }>;
  
  // Price (optional - will be fetched from pricing.ts if not provided)
  priceFrom?: number;
  priceNote?: string;

  ctaButtons?: {
    primaryLabel?: string;
    primaryTo?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
    secondaryNote?: string;
  };

  heroImageSrc?: string;
  heroAlt?: string;
}

const ServiceTemplate = ({
  title,
  metaDescription,
  canonical,
  audience,
  subtitle,
  breadcrumbLabel,
  h1,
  leadParagraph,
  introParagraphs,
  whenToContactTitle = "Когда обращаться",
  whenToContact,
  whatWeDoTitle = "Что мы делаем",
  whatWeDo,
  steps,
  stepsTitle = "Порядок работы",
  documentsAndTimingTitle = "Документы и сроки",
  documentsAndTiming,
  documentsList,
  faqs,
  relatedLinks,
  priceFrom: providedPriceFrom,
  priceNote: providedPriceNote,
  ctaBlock,
  ctaButtons,
  heroImageSrc: providedHeroImageSrc,
  heroAlt
}: ServiceTemplateProps) => {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/+$/, "") || "/";
  const { openQuickQuestionModal } = useQuickQuestionModal();

  const resolvedAudience: "phys" | "biz" | "criminal" =
    audience ??
    (pathname.startsWith("/services/criminal")
      ? "criminal"
      : pathname.startsWith("/services/biz")
        ? "biz"
        : "phys");

  const heroImageSrc =
    providedHeroImageSrc ??
    getServiceCardImageForPath(pathname, resolvedAudience);

  // Get price from pricing.ts if not provided directly
  const pricingData = getPriceBySlug(canonical);
  const shouldHidePrice = resolvedAudience === "criminal";
  const priceFrom = shouldHidePrice ? undefined : providedPriceFrom ?? pricingData?.priceFrom;
  const priceNote = shouldHidePrice ? undefined : providedPriceNote ?? pricingData?.priceNote;

  const audienceCrumb =
    resolvedAudience === "biz"
      ? { label: "Юридическим лицам", path: "/services/biz" }
      : resolvedAudience === "criminal"
        ? { label: "Уголовные дела", path: "/services/criminal" }
        : { label: "Физическим лицам", path: "/services/phys" };

  const primaryCtaLabel = ctaButtons?.primaryLabel ?? "Получить консультацию";
  const primaryCtaTo = ctaButtons?.primaryTo ?? "/kontakty";
  const secondaryCtaLabel = ctaButtons?.secondaryLabel ?? SITE.phone;
  const secondaryCtaHref = ctaButtons?.secondaryHref ?? `tel:${SITE.phoneRaw}`;
  const secondaryCtaNote =
    ctaButtons?.secondaryNote ??
    (secondaryCtaLabel !== SITE.phone ? SITE.phone : undefined);
  
  const breadcrumbItems = [
    { name: "Главная", url: SITE.url },
    { name: "Услуги", url: new URL("/uslugi", SITE.url).toString() },
    { name: audienceCrumb.label, url: new URL(audienceCrumb.path, SITE.url).toString() },
    { name: breadcrumbLabel, url: canonical }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <BreadcrumbSchema items={breadcrumbItems} />
      <LegalServiceSchema 
        serviceType={h1}
        url={canonical}
        priceFrom={priceFrom?.toString()}
      />

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          className={[
            "relative text-white section section--hero",
            heroImageSrc ? "bg-primary" : "bg-gradient-to-br from-primary to-primary/90"
          ].join(" ")}
          style={
            heroImageSrc
              ? {
                  backgroundImage: `url("${heroImageSrc}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }
              : undefined
          }
        >
          {heroImageSrc && (
            <div 
              className="absolute inset-0 pointer-events-none" 
              aria-hidden="true"
              style={{
                background: "linear-gradient(180deg, hsl(var(--primary) / 0.92) 0%, hsl(var(--primary) / 0.7) 45%, hsl(var(--primary) / 0.28) 100%)"
              }}
            />
          )}
          <div className="container relative z-10">
            <Breadcrumbs items={[
              { label: "Услуги", path: "/uslugi" },
              { label: audienceCrumb.label, path: audienceCrumb.path },
              { label: breadcrumbLabel }
            ]} />
            
            <div className="mt-8 max-w-4xl">
              {subtitle && (
                <div className="text-accent text-small font-semibold tracking-wide uppercase mb-3">
                  {subtitle}
                </div>
              )}
              <h1 className="font-serif font-bold mb-6 leading-tight">
                {h1}
              </h1>
              <div className="space-y-5 lead text-white/90 leading-relaxed">
                <p>{leadParagraph}</p>
                {introParagraphs?.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="section">
          <div className="container">
            <div className="section__content grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* When to Contact */}
                <div>
                  <h2 className="font-serif font-bold mb-6">
                    {whenToContactTitle}
                  </h2>
                  <ul className="space-y-3">
                    {whenToContact.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What We Do */}
                <div>
                  <h2 className="font-serif font-bold mb-6">
                    {whatWeDoTitle}
                  </h2>
                  <ul className="space-y-3">
                    {whatWeDo.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Process Steps */}
                <div>
                  <h2 className="font-serif font-bold mb-6">
                    {stepsTitle}
                  </h2>
                  <div className="space-y-4">
                    {steps.map((step) => (
                      <Card key={step.number} className="border-l-4 border-l-accent">
                        <CardContent className="pt-6">
                          <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                              <span className="font-bold text-accent">{step.number}</span>
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

                {/* Documents and Timing */}
                <div>
                  <h2 className="font-serif font-bold mb-6">
                    {documentsAndTimingTitle}
                  </h2>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-start gap-4">
                          <FileText className="h-6 w-6 text-accent flex-shrink-0" />
                          <div className="text-muted-foreground leading-relaxed space-y-4">
                            {documentsList && documentsList.length > 0 && (
                              <ul className="space-y-2">
                                {documentsList.map((item, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-accent mt-1" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                            {documentsAndTiming && (
                              <p>{documentsAndTiming}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Custom CTA */}
                {ctaBlock && (
                  <div>
                    <h2 className="font-serif font-bold mb-6">
                      {ctaBlock.title}
                    </h2>
                    <Card className="bg-gradient-to-br from-primary to-primary/90 text-white border-0">
                      <CardContent className="pt-6 pb-6">
                        <p className="text-white/80 leading-relaxed">
                          {ctaBlock.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Price */}
                <PriceBlock
                  priceFrom={priceFrom}
                  priceNote={priceNote}
                  fallbackTitle="По договоренности"
                />

                {/* FAQ */}
                <div>
                  <h2 className="font-serif font-bold mb-6">
                    Частые вопросы
                  </h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`} className="border rounded-xl px-6">
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
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* CTA Card */}
                  <Card className="bg-gradient-to-br from-primary to-primary/90 text-white border-0">
                    <CardContent className="pt-6 pb-6">
                      <h3 className="font-serif font-bold mb-4">
                        Нужна консультация?
                      </h3>
                      <p className="text-white/80 text-small mb-6">
                        Свяжитесь с нами для получения профессиональной юридической помощи
                      </p>
                      <div className="space-y-3">
                        <Button 
                          className="w-full bg-accent text-white hover:bg-accent/90"
                          onClick={() => openQuickQuestionModal({ topic: h1 })}
                        >
                          {primaryCtaLabel}
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full border-white/20 bg-white/10 hover:bg-white/20 text-white"
                          asChild
                        >
                          <a href={secondaryCtaHref}>
                            <Phone className="mr-2 h-4 w-4" />
                            {secondaryCtaLabel}
                          </a>
                        </Button>
                        {secondaryCtaNote && (
                          <div className="text-white/70 text-small text-center">
                            {secondaryCtaNote}
                          </div>
                        )}
                      </div>
                      <p className="text-white/60 text-small mt-4 text-center">
                        Работаем круглосуточно
                      </p>
                    </CardContent>
                  </Card>

                  {/* Quick Info */}
                  <Card>
                    <CardContent className="pt-6 pb-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-small mb-1">Срочный выезд</div>
                            <div className="text-small text-muted-foreground">В течение 2 часов по Москве</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-small mb-1">Опыт 15+ лет</div>
                            <div className="text-small text-muted-foreground">Более 500 выигранных дел</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Related Links */}
                  {relatedLinks && relatedLinks.length > 0 && (
                    <Card>
                      <CardContent className="pt-6 pb-6">
                        <h3 className="font-semibold mb-4">Смежные услуги</h3>
                        <ul className="space-y-2">
                          {relatedLinks.map((link, index) => (
                            <li key={index}>
                              <Link 
                                to={link.url}
                                className="text-small text-accent hover:underline"
                              >
                                {link.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceTemplate;
