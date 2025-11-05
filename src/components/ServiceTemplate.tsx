import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, FileText, Clock, Phone } from "lucide-react";
import { LegalServiceSchema, BreadcrumbSchema } from "@/components/JsonLd";
import { SITE } from "@/config/site";

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
  
  // Breadcrumbs
  breadcrumbLabel: string;
  
  // Content
  h1: string;
  leadParagraph: string;
  whenToContactTitle?: string;
  whenToContact: string[];
  whatWeDoTitle?: string;
  whatWeDo: string[];
  steps: ServiceStep[];
  documentsAndTimingTitle?: string;
  documentsAndTiming: string;
  faqs: FAQ[];
  
  // Related links
  relatedLinks?: Array<{
    title: string;
    url: string;
  }>;
}

const ServiceTemplate = ({
  title,
  metaDescription,
  canonical,
  breadcrumbLabel,
  h1,
  leadParagraph,
  whenToContactTitle = "Когда обращаться",
  whenToContact,
  whatWeDoTitle = "Что мы делаем",
  whatWeDo,
  steps,
  documentsAndTimingTitle = "Документы и сроки",
  documentsAndTiming,
  faqs,
  relatedLinks
}: ServiceTemplateProps) => {
  const breadcrumbItems = [
    { name: "Главная", url: SITE.url },
    { name: "Услуги", url: `${SITE.url}/uslugi` },
    { name: "Физическим лицам", url: `${SITE.url}/services/phys` },
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
      />

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0B1F3A] to-[#0C1926] text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Breadcrumbs items={[
              { label: "Услуги", path: "/uslugi" },
              { label: "Физическим лицам", path: "/services/phys" },
              { label: breadcrumbLabel }
            ]} />
            
            <div className="mt-8 max-w-4xl">
              <h1 className="font-montserrat text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {h1}
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                {leadParagraph}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Column */}
              <div className="lg:col-span-2 space-y-12">
                {/* When to Contact */}
                <div>
                  <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-6">
                    {whenToContactTitle}
                  </h2>
                  <ul className="space-y-3">
                    {whenToContact.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#C9A227] flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What We Do */}
                <div>
                  <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-6">
                    {whatWeDoTitle}
                  </h2>
                  <ul className="space-y-3">
                    {whatWeDo.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#C9A227] flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Process Steps */}
                <div>
                  <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-6">
                    Порядок работы
                  </h2>
                  <div className="space-y-4">
                    {steps.map((step) => (
                      <Card key={step.number} className="border-l-4 border-l-[#C9A227]">
                        <CardContent className="pt-6">
                          <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C9A227]/10 flex items-center justify-center">
                              <span className="font-bold text-[#C9A227]">{step.number}</span>
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

                {/* Documents and Timing */}
                <div>
                  <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-6">
                    {documentsAndTimingTitle}
                  </h2>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <FileText className="h-6 w-6 text-[#C9A227] flex-shrink-0" />
                        <p className="text-muted-foreground leading-relaxed">
                          {documentsAndTiming}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* FAQ */}
                <div>
                  <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-6">
                    Частые вопросы
                  </h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
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
                  <Card className="bg-gradient-to-br from-[#0B1F3A] to-[#0C1926] text-white border-0">
                    <CardContent className="pt-6 pb-6">
                      <h3 className="font-montserrat text-xl font-bold mb-4">
                        Нужна консультация?
                      </h3>
                      <p className="text-white/80 text-sm mb-6">
                        Свяжитесь с нами для получения профессиональной юридической помощи
                      </p>
                      <div className="space-y-3">
                        <Button 
                          className="w-full bg-[#C9A227] hover:bg-[#B08E1F] text-white"
                          asChild
                        >
                          <Link to="/kontakty">
                            Получить консультацию
                          </Link>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full border-white/20 bg-white/10 hover:bg-white/20 text-white"
                          asChild
                        >
                          <a href="tel:+79168597654">
                            <Phone className="mr-2 h-4 w-4" />
                            +7 (916) 859-76-54
                          </a>
                        </Button>
                      </div>
                      <p className="text-white/60 text-xs mt-4 text-center">
                        Работаем круглосуточно
                      </p>
                    </CardContent>
                  </Card>

                  {/* Quick Info */}
                  <Card>
                    <CardContent className="pt-6 pb-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-[#C9A227] flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-sm mb-1">Срочный выезд</div>
                            <div className="text-xs text-muted-foreground">В течение 2 часов по Москве</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-[#C9A227] flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-sm mb-1">Опыт 15+ лет</div>
                            <div className="text-xs text-muted-foreground">Более 500 выигранных дел</div>
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
                                className="text-sm text-[#C9A227] hover:underline"
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
