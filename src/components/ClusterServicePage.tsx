import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";
import LeadForm from "./LeadForm";
import PriceBlock from "./PriceBlock";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { useQuickQuestionModal } from "@/components/QuickQuestionModalProvider";
import { ServiceSituation } from "@/data/services-clusters";
import { 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  Phone,
  MessageCircle,
  FileText,
  Scale,
  Shield
} from "lucide-react";
import WhatsAppIcon from "./icons/WhatsAppIcon";
import { LegalServiceSchema, BreadcrumbSchema, FAQPageSchema } from "@/components/JsonLd";
import { SITE } from "@/config/site";

interface ClusterServicePageProps {
  situation: ServiceSituation;
  clusterTitle: string;
  clusterSlug: string;
  allSituations: ServiceSituation[];
}

const ClusterServicePage = ({ 
  situation, 
  clusterTitle, 
  clusterSlug,
  allSituations 
}: ClusterServicePageProps) => {
  const isCriminalCluster = clusterSlug === "ugolovnoye-delo";
  const currentUrl = `${SITE.url}uslugi/${clusterSlug}/${situation.slug}/`;
  const ogImage = situation.ogImage || `${SITE.url}og-cover.jpg`;
  const ogImageAbsolute = ogImage.startsWith('http') ? ogImage : `${SITE.url}${ogImage.replace(/^\//, '')}`;
  const { openQuickQuestionModal } = useQuickQuestionModal();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{situation.metaTitle}</title>
        <meta name="description" content={situation.metaDescription} />
        <link rel="canonical" href={currentUrl} />
        
        {/* OpenGraph */}
        <meta property="og:title" content={situation.metaTitle} />
        <meta property="og:description" content={situation.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content={ogImageAbsolute} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="Профзащита" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={situation.metaTitle} />
        <meta name="twitter:description" content={situation.metaDescription} />
        <meta name="twitter:image" content={ogImageAbsolute} />
      </Helmet>

      <BreadcrumbSchema items={[
        { name: "Главная", url: SITE.url },
        { name: "Услуги", url: `${SITE.url}uslugi/` },
        { name: clusterTitle, url: `${SITE.url}uslugi/#${clusterSlug}` },
        { name: situation.title, url: currentUrl }
      ]} />

      <LegalServiceSchema 
        serviceType={situation.title}
        url={currentUrl}
        priceFrom={isCriminalCluster ? undefined : situation.priceFrom?.toString()}
      />

      {situation.faqs.length > 0 && (
        <FAQPageSchema 
          items={situation.faqs.map(faq => ({ question: faq.question, answer: faq.answer }))}
          url={currentUrl}
        />
      )}

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary to-primary/90 text-white section overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\\"60\\" height=\\"60\\" viewBox=\\"0 0 60 60\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cg fill=\\"none\\" fill-rule=\\"evenodd\\"%3E%3Cg fill=\\"%23ffffff\\" fill-opacity=\\"1\\"%3E%3Cpath d=\\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }} />
          </div>

          <div className="container relative z-10">
            <Breadcrumbs 
              items={[
                { label: "Услуги", path: "/uslugi" },
                { label: clusterTitle, path: `/uslugi#${clusterSlug}` },
                { label: situation.title }
              ]} 
            />
            
            <div className="max-w-4xl mt-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 border border-accent/30 rounded-full mb-6">
                <Scale className="h-4 w-4 text-accent" />
                <span className="text-small font-medium text-accent">{clusterTitle}</span>
              </div>
              
              <h1 className="font-serif text-h1-mobile md:text-h1 font-bold mb-4 leading-tight">
                {situation.h1}
              </h1>
              
              <p className="text-body-mobile md:text-body text-white/80 mb-8 leading-relaxed">
                {situation.subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-accent text-white hover:bg-accent/90 font-medium"
                  onClick={() => openQuickQuestionModal({ topic: situation.title })}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Бесплатная консультация
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white/20 bg-white/10 hover:bg-white/20 text-white"
                  asChild
                >
                  <a href="https://wa.me/79999999999" target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="mr-2 h-5 w-5" />
                    Написать в WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* 1. Что грозит (Risks) */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-destructive/10 rounded-xl">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                  </div>
                  <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                    Что грозит, если ничего не делать
                  </h2>
                </div>
                <Card className="border-destructive/20">
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {situation.risks.map((risk, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </section>

              {/* 2. Что делать сейчас (Checklist) */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-accent/10 rounded-xl">
                    <CheckCircle2 className="h-6 w-6 text-accent" />
                  </div>
                  <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                    Что делать сейчас: план действий
                  </h2>
                </div>
                <Card className="border-accent/20 bg-accent/5">
                  <CardContent className="pt-6">
                    <ol className="space-y-4">
                      {situation.checklist.map((item, index) => (
                        <li key={index} className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-small">
                            {index + 1}
                          </div>
                          <span className="pt-1">{item}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </section>

              {/* 3. Наша стратегия */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                    Наша стратегия работы
                  </h2>
                </div>
                <div className="space-y-4">
                  {situation.strategy.map((step, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Shield className="h-5 w-5 text-primary" />
                          </div>
                          <p className="pt-2">{step}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* 3.5 Цена */}
              <PriceBlock 
                priceFrom={isCriminalCluster ? undefined : situation.priceFrom} 
                priceNote={isCriminalCluster ? undefined : situation.pricingNote}
              />

              {/* 4. Сроки / этапы / цена */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                    Сроки, этапы и стоимость
                  </h2>
                </div>
                <div className="space-y-4">
                  {situation.timeline.map((step, index) => (
                    <Card key={index} className="border-l-4 border-l-accent">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div className="flex-1 min-w-[200px]">
                            <h3 className="font-semibold text-body-mobile md:text-body mb-2">{step.stage}</h3>
                            <div className="flex items-center gap-2 text-small text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{step.duration}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-xl">
                            {isCriminalCluster ? (
                              <span className="font-bold text-body-mobile md:text-body">По договоренности</span>
                            ) : (
                              <span className="font-bold text-body-mobile md:text-body">от {step.priceFrom.toLocaleString('ru-RU')} ₽</span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Card className="mt-4 bg-muted/50">
                  <CardContent className="pt-6">
                    <p className="text-small text-muted-foreground italic">
                      <FileText className="inline h-4 w-4 mr-2" />
                      {situation.pricingNote}
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* 5. Кейсы */}
              {situation.cases.length > 0 && (
                <section>
                  <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-6">
                    Примеры из практики
                  </h2>
                  <div className="space-y-6">
                    {situation.cases.map((caseItem, index) => (
                      <Card key={index} className="border-l-4 border-l-primary">
                        <CardContent className="pt-6 space-y-4">
                          <div>
                            <h3 className="font-semibold text-small uppercase text-muted-foreground mb-2">
                              Ситуация
                            </h3>
                            <p className="text-body-mobile md:text-body">{caseItem.situation}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold text-small uppercase text-muted-foreground mb-2">
                              Что сделали
                            </h3>
                            <p className="text-body-mobile md:text-body text-muted-foreground">{caseItem.actions}</p>
                          </div>
                          <div className="pt-2 border-t">
                            <h3 className="font-semibold text-small uppercase text-accent mb-2">
                              Результат
                            </h3>
                            <p className="text-body-mobile md:text-body font-medium">{caseItem.result}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {/* 6. FAQ */}
              {situation.faqs.length > 0 && (
                <section>
                  <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-6">
                    Часто задаваемые вопросы
                  </h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {situation.faqs.map((faq, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`faq-${index}`}
                        className="border border-border rounded-xl px-6 bg-card"
                      >
                        <AccordionTrigger className="hover:text-accent hover:no-underline text-left font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pt-4 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              )}

              {/* 7. Форма захвата */}
              <section>
                <Card className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground border-0">
                  <CardContent className="pt-8 pb-8">
                    <div className="text-center mb-8">
                      <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-4">
                        Получите план действий за 15 минут
                      </h2>
                      <p className="text-primary-foreground/80 text-body-mobile md:text-body">
                        Оставьте заявку — мы перезвоним в течение 10 минут и составим индивидуальный план защиты
                      </p>
                    </div>
                    <div className="max-w-xl mx-auto">
                      <LeadForm variant="compact" practiceType={situation.title} />
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 8. Повторный CTA */}
              <section className="text-center py-8">
                <div className="inline-flex flex-col items-center gap-6 p-8 bg-muted/50 rounded-xl">
                  <MessageCircle className="h-16 w-16 text-accent" />
                  <div>
                    <h3 className="font-serif text-h3-mobile md:text-h3 font-semibold mb-2">
                      Не знаете, с чего начать?
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Позвоните нам прямо сейчас или запишитесь на бесплатную консультацию
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
                        <a href="tel:+74950040196">
                          <Phone className="mr-2 h-5 w-5" />
                          +7 (495) 004-01-96
                        </a>
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() => openQuickQuestionModal({ topic: situation.title })}
                      >
                        Записаться на встречу
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              {/* 9. Правовой дисклеймер */}
              <section>
                <Card className="bg-muted/30 border-muted">
                  <CardContent className="pt-6">
                    <p className="text-small text-muted-foreground leading-relaxed">
                      <strong>Правовая информация:</strong> Материал носит информационный характер и не является публичной офертой. 
                      Точная стоимость услуг определяется после анализа вашей ситуации. Результаты прошлых дел не гарантируют 
                      аналогичного исхода в вашем случае. Каждое дело индивидуально и зависит от множества факторов.
                    </p>
                  </CardContent>
                </Card>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 h-fit space-y-6">
              {/* Quick Contact Card */}
              <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-transparent">
                <CardContent className="pt-6 space-y-4">
                  <div className="text-center">
                    <h3 className="font-semibold text-body-mobile md:text-body mb-2">Срочная консультация</h3>
                    <p className="text-small text-muted-foreground mb-4">
                      Работаем 24/7, выезд в течение 2 часов
                    </p>
                    <a 
                      href="tel:+74950040196"
                      className="block text-h3 font-bold text-accent hover:text-accent/90 transition-colors mb-4"
                    >
                      +7 (495) 004-01-96
                    </a>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-accent hover:bg-accent/90" asChild>
                        <a href="tel:+74950040196">
                          <Phone className="mr-2 h-4 w-4" />
                          Позвонить
                        </a>
                      </Button>
                      <Button variant="outline" className="flex-1" asChild>
                        <a href="https://wa.me/79999999999" target="_blank" rel="noopener noreferrer">
                          <WhatsAppIcon className="mr-2 h-4 w-4" />
                          WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Price Card */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-body-mobile md:text-body mb-4">Стоимость</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-h3 font-bold text-accent">
                      {isCriminalCluster ? "По договоренности" : `от ${situation.priceFrom.toLocaleString('ru-RU')} ₽`}
                    </span>
                  </div>
                  <p className="text-small text-muted-foreground mb-4">
                    {isCriminalCluster
                      ? "Стоимость определяется индивидуально после анализа вашей ситуации"
                      : "Точная стоимость определяется после консультации"}
                  </p>
                  <Button
                    className="w-full bg-accent hover:bg-accent/90"
                    onClick={() => openQuickQuestionModal({ topic: situation.title })}
                  >
                    Узнать точную цену
                  </Button>
                </CardContent>
              </Card>

              {/* Other Services */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-body-mobile md:text-body mb-4">Другие услуги раздела</h3>
                  <ul className="space-y-3">
                    {allSituations
                      .filter(s => s.id !== situation.id)
                      .slice(0, 8)
                      .map((s) => (
                        <li key={s.id}>
                          <Link
                            to={`/uslugi/${clusterSlug}/${s.slug}`}
                            className="text-small text-muted-foreground hover:text-accent transition-colors block py-1"
                          >
                            → {s.title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                  <Link
                    to={`/uslugi#${clusterSlug}`}
                    className="inline-block mt-4 text-small text-accent hover:underline font-medium"
                  >
                    Все услуги раздела →
                  </Link>
                </CardContent>
              </Card>
            </aside>
          </div>
          </div>
        </section>
      </main>

      {/* Mobile Fixed CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border p-4 shadow-lg">
        <div className="flex gap-2">
          <Button className="flex-1 bg-accent hover:bg-accent/90" asChild>
            <a href="tel:+74950040196">
              <Phone className="mr-2 h-4 w-4" />
              Позвонить
            </a>
          </Button>
          <Button variant="outline" className="flex-1" asChild>
            <a href="https://wa.me/79999999999" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="mr-2 h-4 w-4" />
              WhatsApp
            </a>
          </Button>
          <Button variant="outline" onClick={() => openQuickQuestionModal({ topic: situation.title })}>
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ClusterServicePage;
