import { useParams, Navigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PricingBlock from "@/components/PricingBlock";
import LeadForm from "@/components/LeadForm";
import { Helmet } from "react-helmet";
import { serviceCategories, ServiceItem } from "@/data/services";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import legalBg3 from "@/assets/legal-bg-3.jpg";

const ServiceDetail = () => {
  const { categorySlug, serviceSlug } = useParams();

  // Find category and service
  const category = serviceCategories.find(cat => cat.slug === categorySlug);
  const service = category?.items.find(item => item.slug === serviceSlug);

  if (!category || !service) {
    return <Navigate to="/uslugi" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{service.title} — Профзащита</title>
        <meta name="description" content={service.shortDescription} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": service.title,
            "description": service.shortDescription,
            "provider": {
              "@type": "LegalService",
              "name": "Профзащита",
              "areaServed": "Москва"
            },
            "areaServed": {
              "@type": "City",
              "name": "Москва"
            },
            "priceRange": "RUB"
          })}
        </script>
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-12 overflow-hidden">
          {/* Professional Legal Background Photo */}
          <div className="absolute inset-0 opacity-10">
            <img 
              src={legalBg3} 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <Breadcrumbs 
              items={[
                { label: "Услуги", path: "/uslugi" },
                { label: category.title, path: "/uslugi" },
                { label: service.title }
              ]} 
            />
            <div className="max-w-4xl mt-6">
              <div className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium mb-4">
                {category.title}
              </div>
              <h1 className="font-playfair text-3xl md:text-5xl font-bold mb-4">
                {service.title}
              </h1>
              <p className="text-lg text-primary-foreground/80">
                {service.shortDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* When We Help */}
                <div>
                  <h2 className="font-playfair text-2xl font-bold mb-6 flex items-center gap-2">
                    <AlertCircle className="h-6 w-6 text-accent" />
                    Когда мы помогаем
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.situations.map((situation, index) => (
                      <li key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{situation}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What We Do */}
                <div>
                  <h2 className="font-playfair text-2xl font-bold mb-6">Что мы делаем</h2>
                  <ul className="space-y-3">
                    {service.actions.map((action, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Process */}
                <div>
                  <h2 className="font-playfair text-2xl font-bold mb-6">Процесс работы</h2>
                  <div className="space-y-6">
                    {service.process.map((step) => (
                      <div key={step.number} className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xl font-bold">
                          {step.number}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timing */}
                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-accent" />
                    Сроки и риски
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{service.timing}</p>
                </div>

                {/* Pricing */}
                <div>
                  <h2 className="font-playfair text-2xl font-bold mb-6">Стоимость услуг</h2>
                  <PricingBlock packages={service.pricing} />
                </div>

                {/* FAQ */}
                <div>
                  <h2 className="font-playfair text-2xl font-bold mb-6">Часто задаваемые вопросы</h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {service.faqs.map((faq, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`faq-${index}`}
                        className="border border-border rounded-lg px-6 bg-card"
                      >
                        <AccordionTrigger className="hover:text-accent hover:no-underline text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pt-4">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-lg p-8 text-center">
                  <h3 className="font-playfair text-2xl font-bold mb-4">
                    Готовы решить вашу задачу?
                  </h3>
                  <p className="text-primary-foreground/80 mb-6">
                    Получите бесплатную консультацию и узнайте точную стоимость
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" variant="secondary" asChild>
                      <Link to="/kontakty">Получить консультацию</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="border-primary-foreground/20 hover:bg-primary-foreground/10" asChild>
                      <a href="tel:+79999999999">
                        Позвонить
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:sticky lg:top-24 h-fit space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-4">Получить консультацию</h3>
                  <LeadForm variant="compact" practiceType={service.title} />
                </div>

                {/* Other Services */}
                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-4">Другие услуги</h3>
                  <ul className="space-y-3">
                    {category.items
                      .filter(item => item.id !== service.id)
                      .slice(0, 5)
                      .map((item) => (
                        <li key={item.id}>
                          <Link
                            to={`/uslugi/${category.slug}/${item.slug}`}
                            className="text-sm text-muted-foreground hover:text-accent transition-colors"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                  <Link
                    to="/uslugi"
                    className="inline-block mt-4 text-sm text-accent hover:underline"
                  >
                    Все услуги →
                  </Link>
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

export default ServiceDetail;
