import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Calculator,
  Clock3,
  FileText,
  PhoneCall,
  Scale,
  WalletCards
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BreadcrumbSchema, FAQPageSchema, LegalServiceSchema } from "@/components/JsonLd";
import { SITE } from "@/config/site";
import lawyerConsultationBg from "@/assets/legal/lawyer-consultation-bg.webp";
import {
  priceCtas,
  priceFactors,
  priceFaqItems,
  priceIntroPoints,
  priceSections,
  type PriceCta,
  type PriceSection
} from "@/data/prices";

const factorIcons = [Calculator, FileText, Clock3, WalletCards];
const primaryPhoneHref = `tel:${SITE.phoneRaw}`;
const secondaryPhoneHref = `tel:+${SITE.messengerPhoneRaw}`;

const PriceCtaBanner = ({ cta }: { cta: PriceCta }) => {
  const primaryIsPhone = cta.primaryAction === "phone";
  const secondaryIsPhone = cta.secondaryAction === "phone";

  return (
    <div className="rounded-2xl border border-border bg-gradient-to-br from-primary to-primary/95 p-7 text-white shadow-[0_20px_50px_rgba(6,16,31,0.16)] md:p-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="max-w-2xl">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65">
            Стоимость и консультация
          </p>
          <h2 className="font-serif text-h3-mobile font-semibold md:text-h3">{cta.title}</h2>
          <p className="mt-3 text-body-mobile leading-7 text-white/82 md:text-body">{cta.description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <Button asChild size="lg" className="bg-accent px-7 text-white hover:bg-accent/90">
            {primaryIsPhone ? (
              <a href={primaryPhoneHref}>{cta.primaryLabel}</a>
            ) : (
              <Link to="/kontakty">{cta.primaryLabel}</Link>
            )}
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/20 bg-white/6 px-7 text-white hover:bg-white/12 hover:text-white"
          >
            {secondaryIsPhone ? (
              <a href={secondaryPhoneHref}>{cta.secondaryLabel}</a>
            ) : (
              <Link to="/kontakty">{cta.secondaryLabel}</Link>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

const PriceSectionCard = ({ section }: { section: PriceSection }) => (
  <Card id={section.slug} className="h-full border-border">
    <CardContent className="p-6 pt-6 md:p-7 md:pt-7">
      <div className="mb-6">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Раздел цен
        </p>
        <h2 className="font-serif text-h3-mobile font-semibold md:text-h3">{section.title}</h2>
        <p className="mt-3 text-small leading-7 text-muted-foreground">{section.description}</p>
      </div>

      <div className="divide-y divide-border/80">
        {section.items.map((item) => (
          <div
            key={`${section.slug}-${item.title}`}
            className="grid gap-3 py-4 first:pt-0 last:pb-0 md:grid-cols-[minmax(0,1fr)_180px] md:gap-6"
          >
            <div className="min-w-0">
              <h3 className="text-body-mobile font-semibold leading-snug md:text-body">{item.title}</h3>
              <p className="mt-1 text-small leading-7 text-muted-foreground">{item.description}</p>
              {item.note ? (
                <p className="mt-2 text-small leading-6 text-muted-foreground/90">{item.note}</p>
              ) : null}
            </div>
            <div className="md:text-right">
              <div className="inline-flex rounded-full bg-accent/10 px-4 py-2 text-[18px] font-semibold leading-none text-accent md:text-[20px]">
                {item.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const Prices = () => {
  const topSections = priceSections.slice(0, 6);
  const bottomSections = priceSections.slice(6);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Цены на юридические услуги в Москве — Профзащита</title>
        <meta
          name="description"
          content="Стоимость консультаций, подготовки документов и судебного сопровождения по семейным, жилищным, наследственным, уголовным и другим юридическим спорам."
        />
        <link rel="canonical" href={`${SITE.url}tseny/`} />
        <meta property="og:title" content="Цены на юридические услуги — Профзащита" />
        <meta
          property="og:description"
          content="Ориентировочная стоимость консультаций, подготовки документов и представительства в суде по основным юридическим направлениям."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE.url}tseny/`} />
        <meta property="og:image" content={SITE.ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="Профзащита" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Цены на юридические услуги — Профзащита" />
        <meta
          name="twitter:description"
          content="Ориентировочные цены на консультации, документы и судебное сопровождение."
        />
        <meta name="twitter:image" content={SITE.ogImage} />
      </Helmet>

      <BreadcrumbSchema
        items={[
          { name: "Главная", url: SITE.url },
          { name: "Цены на юридические услуги", url: `${SITE.url}tseny/` }
        ]}
      />
      <FAQPageSchema items={priceFaqItems} url={`${SITE.url}tseny/`} />
      <LegalServiceSchema
        serviceType="Цены на юридические услуги"
        url={`${SITE.url}tseny/`}
        priceFrom="3000"
      />

      <Header />

      <main className="flex-1">
        <PageHero
          backgroundImage={lawyerConsultationBg}
          overlay="linear-gradient(180deg, rgba(7,16,31,0.84) 0%, rgba(7,16,31,0.74) 48%, rgba(7,16,31,0.5) 100%)"
        >
          <Breadcrumbs items={[{ label: "Цены на юридические услуги" }]} />
          <div className="mt-6 max-w-4xl">
            <p className="mb-4 inline-flex rounded-full border border-white/14 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
              Ориентиры по стоимости
            </p>
            <h1 className="font-serif text-h1-mobile font-bold text-white md:text-h1">
              Цены на юридические услуги
            </h1>
            <p className="mt-5 max-w-3xl text-body-mobile leading-8 text-white/88 md:text-body">
              Стоимость зависит от сложности дела, объема работы, срочности и стадии спора, но
              основные ориентиры по наиболее востребованным услугам приведены ниже.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-accent px-8 text-white hover:bg-accent/90">
                <Link to="/kontakty">Получить консультацию</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/8 px-8 text-white hover:bg-white/12 hover:text-white"
              >
                <a href={primaryPhoneHref}>
                  <PhoneCall className="mr-2 h-4 w-4" />
                  Позвонить сейчас
                </a>
              </Button>
            </div>
            <p className="mt-4 text-small leading-7 text-white/72">
              Окончательная стоимость определяется после изучения ситуации и документов.
            </p>
          </div>
        </PageHero>

        <section className="section">
          <div className="container">
            <div className="mb-8 max-w-3xl">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Прайс по направлениям
              </p>
              <h2 className="font-serif text-h2-mobile font-bold md:text-h2">Основные цены по юридическим услугам</h2>
              <p className="mt-4 text-body-mobile leading-8 text-muted-foreground md:text-body">
                Сначала собрали ориентиры по самым частым услугам и форматам работы. После прайса
                ниже можно посмотреть, как рассчитывается стоимость и от чего она зависит.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-muted/20 p-5 md:p-6">
              <h2 className="font-serif text-h3-mobile font-semibold md:text-h3">
                Быстрый переход к разделам
              </h2>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {priceSections.map((section) => (
                  <a
                    key={section.slug}
                    href={`#${section.slug}`}
                    className="rounded-full border border-border bg-background px-4 py-2 text-small leading-6 text-foreground transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-muted/10 pt-0">
          <div className="container">
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              {topSections.map((section) => (
                <PriceSectionCard key={section.slug} section={section} />
              ))}
            </div>
          </div>
        </section>

        <section className="section section--tight">
          <div className="container">
            <PriceCtaBanner cta={priceCtas[0]} />
          </div>
        </section>

        <section className="section pt-0">
          <div className="container">
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              {bottomSections.map((section) => (
                <PriceSectionCard key={section.slug} section={section} />
              ))}
            </div>

            <Card className="mt-8 border-border">
              <CardContent className="p-6 pt-6 md:p-7 md:pt-7">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-start">
                  <div>
                    <h2 className="font-serif text-h3-mobile font-semibold md:text-h3">
                      Если услуга не указана в прайсе
                    </h2>
                    <p className="mt-3 text-body-mobile leading-8 text-muted-foreground md:text-body">
                      На странице собраны самые частые форматы работы. Если ваш вопрос шире или
                      требует нестандартного решения, мы рассчитаем стоимость индивидуально.
                    </p>
                    <div className="mt-5 rounded-xl bg-muted/30 px-5 py-4 text-small leading-7 text-muted-foreground">
                      Обычно клиент может выбрать: разовую консультацию, подготовку документов,
                      отдельную судебную стадию или полное сопровождение дела.
                    </div>
                  </div>
                  <div className="rounded-xl border border-border/80 bg-muted/20 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Контакты для быстрого уточнения
                    </p>
                    <div className="mt-4 flex flex-col gap-1.5">
                      <a href={primaryPhoneHref} className="text-[18px] font-semibold text-foreground hover:text-accent">
                        {SITE.phone}
                      </a>
                      <a href={secondaryPhoneHref} className="text-[18px] font-semibold text-foreground hover:text-accent">
                        {SITE.messengerPhone}
                      </a>
                    </div>
                    <div className="mt-5 flex flex-col gap-3">
                      <Button asChild className="bg-accent text-white hover:bg-accent/90">
                        <Link to="/kontakty">Получить консультацию</Link>
                      </Button>
                      <Button asChild variant="outline">
                        <a href={primaryPhoneHref}>Позвонить</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="section section--tight pt-0">
          <div className="container">
            <PriceCtaBanner cta={priceCtas[1]} />
          </div>
        </section>

        <section className="section bg-muted/10">
          <div className="container">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
              <Card className="border-border">
                <CardContent className="p-6 pt-6 md:p-7 md:pt-7">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
                      <Scale className="h-6 w-6 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-serif text-h3-mobile font-semibold md:text-h3">
                        Как формируется стоимость
                      </h2>
                      <p className="mt-3 text-small leading-7 text-muted-foreground">
                        Мы показываем ориентиры по прайсу, но окончательный расчет всегда зависит от
                        реального объема работы, документов, срочности и стадии спора.
                      </p>
                    </div>
                  </div>
                  <ul className="mt-6 grid gap-3">
                    {priceIntroPoints.map((point) => (
                      <li
                        key={point}
                        className="rounded-xl border border-border/80 bg-muted/30 px-4 py-3 text-small leading-7 text-muted-foreground"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6 pt-6 md:p-7 md:pt-7">
                  <h2 className="font-serif text-h3-mobile font-semibold md:text-h3">
                    Быстро узнать точную стоимость
                  </h2>
                  <p className="mt-3 text-small leading-7 text-muted-foreground">
                    Если нужно понять цену именно по вашей ситуации, начните с короткой консультации
                    или звонка.
                  </p>
                  <div className="mt-6 space-y-5">
                    <LeadForm practiceType="Цены на юридические услуги" variant="compact" />
                    <div className="rounded-xl border border-border/80 bg-muted/30 px-4 py-4 text-small leading-7 text-muted-foreground">
                      После первичного разговора обычно уже понятно, нужен ли один документ,
                      отдельная стадия суда или комплексное сопровождение дела.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {priceFactors.map((factor, index) => {
                const Icon = factorIcons[index] ?? Calculator;
                return (
                  <Card key={factor.title} className="border-border">
                    <CardContent className="p-6 pt-6">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <h3 className="mt-4 text-body-mobile font-semibold md:text-body">{factor.title}</h3>
                      <p className="mt-2 text-small leading-7 text-muted-foreground">{factor.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section bg-muted/10">
          <div className="container">
            <div className="mb-8 max-w-3xl">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                FAQ по стоимости
              </p>
              <h2 className="font-serif text-h2-mobile font-bold md:text-h2">Частые вопросы о ценах</h2>
              <p className="mt-4 text-body-mobile leading-8 text-muted-foreground md:text-body">
                Ниже собрали ответы на вопросы, которые чаще всего возникают до начала работы.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
              <Accordion type="single" collapsible className="space-y-5">
                {priceFaqItems.map((item, index) => (
                  <AccordionItem
                    key={item.question}
                    value={`price-faq-${index}`}
                    className="rounded-xl border border-border bg-card px-6 md:px-7"
                  >
                    <AccordionTrigger className="text-left hover:text-accent hover:no-underline">
                      <span className="font-semibold">{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pt-5 leading-7 text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <Card className="h-fit border-border lg:sticky lg:top-24">
                <CardContent className="p-6 pt-6 md:p-7 md:pt-7">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Запись на консультацию
                  </p>
                  <h2 className="font-serif text-h3-mobile font-semibold md:text-h3">
                    Уточним стоимость после короткого разговора
                  </h2>
                  <p className="mt-3 text-small leading-7 text-muted-foreground">
                    Можно обсудить ситуацию по телефону, а затем перейти к документам и точному
                    расчету стоимости.
                  </p>
                  <div className="mt-6">
                    <LeadForm practiceType="Цены на юридические услуги" variant="compact" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="section section--tight pt-0">
          <div className="container">
            <PriceCtaBanner cta={priceCtas[2]} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Prices;
