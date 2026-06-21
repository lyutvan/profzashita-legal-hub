import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  Clock3,
  ClipboardCheck,
  FileText,
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
const hasSecondaryPhone = Boolean(SITE.messengerPhone && SITE.messengerPhoneRaw);
const allPricesFilter = "all";

const trustPoints = [
  "Объем работ фиксируем до начала сопровождения",
  "Не обещаем цену без анализа документов",
  "Можно начать с консультации или отдельного документа"
];

const includedItems = [
  "Первичный анализ ситуации и документов",
  "Оценка рисков, сроков и судебной перспективы",
  "Подготовка правовой позиции и процессуальных документов",
  "Участие в переговорах, заседаниях или следственных действиях",
  "Пояснение следующих шагов после каждого этапа",
  "Контроль исполнения решения, если это входит в договор"
];

const pricingSteps = [
  { title: "Коротко разбираем ситуацию", description: "Понимаем категорию дела, срочность и стадию." },
  { title: "Смотрим документы", description: "Оцениваем объем материалов, доказательства и риски." },
  { title: "Определяем формат", description: "Консультация, документ, судебная стадия или сопровождение под ключ." },
  { title: "Фиксируем стоимость", description: "Называем цену и состав работ до начала активных действий." }
];

const PriceCtaBanner = ({ cta }: { cta: PriceCta }) => {
  const primaryIsPhone = cta.primaryAction === "phone";
  const secondaryIsPhone = cta.secondaryAction === "phone";

  return (
    <div className="rounded-2xl border border-border bg-gradient-to-br from-primary to-primary/95 p-7 text-white shadow-[0_20px_50px_rgba(6,16,31,0.16)] md:p-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="min-w-0 max-w-2xl">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65">
            Стоимость и консультация
          </p>
          <h2 className="font-serif text-h3-mobile font-semibold md:text-h3">{cta.title}</h2>
          <p className="mt-3 text-body-mobile leading-7 text-white/82 md:text-body">{cta.description}</p>
        </div>
        <div className="min-w-0 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <Button asChild size="lg" className="h-auto min-h-12 whitespace-normal bg-accent px-5 py-3 leading-tight text-white hover:bg-accent/90">
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
            className="h-auto min-h-12 whitespace-normal border-white/20 bg-white/6 px-5 py-3 leading-tight text-white hover:bg-white/12 hover:text-white"
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

const PriceItemCard = ({ section, item }: { section: PriceSection; item: PriceSection["items"][number] }) => (
  <Card className="h-full border-[#e4d4a8] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.05)] transition-all hover:border-accent/70 hover:shadow-[0_16px_34px_rgba(15,23,42,0.09)]">
    <CardContent className="flex h-full flex-col p-5 md:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[#fbf7ec] px-3 py-1 text-[12px] font-semibold text-accent">
          {section.title}
        </span>
      </div>
      <h3 className="mt-4 text-[18px] font-semibold leading-tight text-foreground md:text-[20px]">
        {item.title}
      </h3>
      <p className="mt-3 text-small leading-7 text-muted-foreground">
        {item.description}
      </p>
      {item.note ? (
        <p className="mt-3 border-l-4 border-accent bg-[#fbf7ec] px-3 py-2 text-small leading-6 text-muted-foreground">
          {item.note}
        </p>
      ) : null}
      <div className="mt-auto pt-5">
        <div className="rounded-lg border border-accent/25 bg-accent/10 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Ориентир
          </p>
          <p className="mt-1 text-[24px] font-bold leading-none text-accent md:text-[26px]">
            {item.price}
          </p>
        </div>
        <Button asChild className="mt-4 h-11 w-full rounded-md bg-primary text-white hover:bg-primary/90">
          <Link to="/kontakty">
            Уточнить по делу
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CardContent>
  </Card>
);

const Prices = () => {
  const initialFilter = typeof window !== "undefined" && priceSections.some((section) => section.slug === window.location.hash.replace("#", ""))
    ? window.location.hash.replace("#", "")
    : allPricesFilter;
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  useEffect(() => {
    const syncFilterFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (priceSections.some((section) => section.slug === hash)) {
        setActiveFilter(hash);
      } else if (!hash || hash === "price-list") {
        setActiveFilter(allPricesFilter);
      }
    };

    syncFilterFromHash();
    window.addEventListener("hashchange", syncFilterFromHash);
    return () => window.removeEventListener("hashchange", syncFilterFromHash);
  }, []);

  const visibleSections = useMemo(
    () => activeFilter === allPricesFilter
      ? priceSections
      : priceSections.filter((section) => section.slug === activeFilter),
    [activeFilter]
  );

  const activeSection = priceSections.find((section) => section.slug === activeFilter);
  const visibleItemsCount = visibleSections.reduce((total, section) => total + section.items.length, 0);

  const handleFilterClick = (slug: string) => {
    setActiveFilter(slug);
    if (slug === allPricesFilter) {
      window.history.replaceState(null, "", `${window.location.pathname}#price-list`);
      return;
    }
    window.history.replaceState(null, "", `${window.location.pathname}#${slug}`);
  };

  return (
    <div className="top-page-mobile-compact min-h-screen flex flex-col">
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
        <PageHero className="prices-hero">
          <div className="hidden lg:block">
            <Breadcrumbs items={[{ label: "Цены на юридические услуги" }]} />
          </div>
          <div className="grid gap-8 lg:mt-7 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
            <div className="max-w-4xl">
              <h1 className="font-serif text-h1-mobile font-bold leading-tight text-white md:text-h1">
                Стоимость юридической помощи
              </h1>
              <p className="mt-5 max-w-3xl text-body-mobile leading-8 text-white/88 md:text-body">
                Показываем ориентиры по стоимости. Точная цена зависит от документов, стадии дела,
                срочности и объема работы, поэтому окончательный расчет даем после первичного анализа.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="h-auto min-h-12 bg-accent px-8 py-3 text-white hover:bg-accent/90">
                  <Link to="/kontakty">Уточнить стоимость по делу</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-auto min-h-12 border-white/20 bg-white/8 px-8 py-3 text-white hover:bg-white/12 hover:text-white"
                >
                  <a href="#price-list">Посмотреть прайс</a>
                </Button>
              </div>
              <p className="mt-4 text-small leading-7 text-white/72">
                Цена на сайте является ориентиром и не является публичной офертой.
              </p>
            </div>

            <div className="rounded-xl border border-white/15 bg-white/10 p-5 text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/62">
                Как работаем с ценой
              </p>
              <ul className="mt-4 grid gap-3">
                {trustPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-small leading-6 text-white/82">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-lg border border-white/10 bg-white/8 px-4 py-3">
                <p className="text-[13px] text-white/70">Быстрый звонок</p>
                <a href={primaryPhoneHref} className="mango-phone mt-1 block text-[20px] font-semibold text-white hover:text-accent">
                  {SITE.phone}
                </a>
              </div>
            </div>
          </div>
        </PageHero>

        <section id="price-list" className="section bg-muted/10">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
              <div className="min-w-0">
                <h2 className="font-serif text-h2-mobile font-bold md:text-h2">
                  Прайс по направлениям
                </h2>
                <p className="mt-4 max-w-3xl text-body-mobile leading-8 text-muted-foreground md:text-body">
                  Сначала выберите направление, затем откройте подходящую услугу или оставьте заявку
                  на расчет. В карточках показан ориентир, краткая суть работы и следующий шаг.
                </p>
              </div>

              <Card className="border-[#e4d4a8] bg-[#fbf7ec]">
                <CardContent className="p-5">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent">
                    Точный расчет
                  </p>
                  <p className="mt-2 text-small leading-7 text-muted-foreground">
                    После короткого разговора обычно понятно, нужен один документ, отдельная стадия
                    суда или полное сопровождение.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-7 rounded-xl border border-[#e4d4a8] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.05)] md:p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                    Шаг 1
                  </p>
                  <h3 className="mt-1 text-[18px] font-semibold leading-tight text-foreground">
                    Выберите направление дела
                  </h3>
                </div>
                <p className="text-small leading-6 text-muted-foreground">
                  Сейчас показано: <span className="font-semibold text-foreground">{visibleItemsCount}</span> позиций
                </p>
              </div>

              <div className="mt-4 overflow-x-auto pb-2 md:overflow-visible">
                <div className="flex min-w-max gap-2.5 md:min-w-0 md:flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleFilterClick(allPricesFilter)}
                    className={`rounded-full border px-4 py-2 text-small font-semibold leading-6 transition-colors ${
                      activeFilter === allPricesFilter
                        ? "border-accent bg-accent text-white"
                        : "border-[#e4d4a8] bg-white text-foreground hover:border-accent/60 hover:text-accent"
                    }`}
                  >
                    Все
                  </button>
                  {priceSections.map((section) => (
                    <button
                      key={section.slug}
                      type="button"
                      onClick={() => handleFilterClick(section.slug)}
                      className={`rounded-full border px-4 py-2 text-small font-semibold leading-6 transition-colors ${
                        activeFilter === section.slug
                          ? "border-accent bg-accent text-white"
                          : "border-[#e4d4a8] bg-white text-foreground hover:border-accent/60 hover:text-accent"
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-[#eadcb6] bg-[#fbf7ec] px-4 py-3">
                <p className="text-small leading-6 text-muted-foreground">
                  {activeSection ? (
                    <>
                      Выбран раздел <span className="font-semibold text-foreground">{activeSection.title}</span>.
                      Ниже оставлены только услуги по этому направлению.
                    </>
                  ) : (
                    <>
                      Вы видите весь прайс. Если знаете категорию дела, нажмите нужный фильтр —
                      список станет короче.
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="mt-6">
              {activeSection ? (
                <div className="mb-5 rounded-xl border border-[#e4d4a8] bg-white p-5 md:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Выбранный раздел
                  </p>
                  <h2 id={activeSection.slug} className="mt-2 font-serif text-h3-mobile font-semibold md:text-h3">
                    {activeSection.title}
                  </h2>
                  <p className="mt-3 text-small leading-7 text-muted-foreground">
                    {activeSection.description}
                  </p>
                </div>
              ) : (
                <h2 className="sr-only">
                  Все услуги
                </h2>
              )}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {visibleSections.flatMap((section) =>
                  section.items.map((item) => (
                    <PriceItemCard key={`${section.slug}-${item.title}`} section={section} item={item} />
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="section section--tight">
          <div className="container">
            <PriceCtaBanner cta={priceCtas[0]} />
          </div>
        </section>

        <section className="section bg-muted/10">
          <div className="container">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:items-start">
              <Card className="border-[#e4d4a8] bg-white lg:self-start">
                <CardContent className="p-6 md:p-7">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                      <ClipboardCheck className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-serif text-h3-mobile font-semibold md:text-h3">
                        Что входит в стоимость
                      </h2>
                      <p className="mt-3 text-small leading-7 text-muted-foreground">
                        Состав работ зависит от формата поручения, но мы заранее объясняем,
                        какие действия входят в цену.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {includedItems.map((item) => (
                      <div key={item} className="flex items-start gap-2 rounded-lg border border-border/80 bg-muted/20 px-3 py-3 text-small leading-6 text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#e4d4a8] bg-white lg:self-start">
                <CardContent className="p-6 md:p-7">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                      <Scale className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-serif text-h3-mobile font-semibold md:text-h3">
                        Как считаем цену
                      </h2>
                      <p className="mt-3 text-small leading-7 text-muted-foreground">
                        Цена появляется не из общей категории, а из конкретного объема работы
                        по вашему делу.
                      </p>
                    </div>
                  </div>
                  <ol className="mt-6 grid gap-3">
                    {pricingSteps.map((step, index) => (
                      <li
                        key={step.title}
                        className="grid grid-cols-[32px_1fr] gap-3 rounded-lg border border-border/80 bg-muted/20 px-3 py-3"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-[13px] font-semibold text-white">
                          {index + 1}
                        </span>
                        <span>
                          <span className="block text-small font-semibold text-foreground">{step.title}</span>
                          <span className="mt-1 block text-small leading-6 text-muted-foreground">{step.description}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {priceFactors.map((factor, index) => {
                const Icon = factorIcons[index] ?? Calculator;
                return (
                  <Card key={factor.title} className="border-border bg-white">
                    <CardContent className="p-5 md:p-6">
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

            <Card className="mt-8 border-[#e4d4a8] bg-[#fbf7ec]">
              <CardContent className="grid gap-6 p-6 md:p-7 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
                <div>
                  <h2 className="font-serif text-h3-mobile font-semibold md:text-h3">
                    Если услуги нет в прайсе
                  </h2>
                  <p className="mt-3 text-body-mobile leading-8 text-muted-foreground md:text-body">
                    На странице собраны самые частые форматы работы. Если вопрос шире или требует
                    нестандартного решения, рассчитаем стоимость индивидуально.
                  </p>
                  <ul className="mt-4 grid gap-2">
                    {priceIntroPoints.slice(0, 3).map((point) => (
                      <li key={point} className="flex items-start gap-2 text-small leading-6 text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-[#e4d4a8] bg-white p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Быстро уточнить
                  </p>
                  <a href={primaryPhoneHref} className="mango-phone mt-3 block text-[20px] font-semibold text-foreground hover:text-accent">
                    {SITE.phone}
                  </a>
                  {hasSecondaryPhone && (
                    <a href={secondaryPhoneHref} className="mt-1 block text-[18px] font-semibold text-foreground hover:text-accent">
                      {SITE.messengerPhone}
                    </a>
                  )}
                  <Button asChild className="mt-5 h-11 w-full bg-accent text-white hover:bg-accent/90">
                    <Link to="/kontakty">Получить расчет</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8">
              <PriceCtaBanner cta={priceCtas[1]} />
            </div>
          </div>
        </section>

        <section className="section bg-muted/10">
          <div className="container">
            <div className="mb-6 max-w-3xl">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                FAQ по стоимости
              </p>
              <h2 className="font-serif text-h2-mobile font-bold md:text-h2">Частые вопросы о ценах</h2>
              <p className="mt-4 text-body-mobile leading-8 text-muted-foreground md:text-body">
                Ниже собрали ответы на вопросы, которые чаще всего возникают до начала работы.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start xl:grid-cols-[minmax(0,1fr)_420px]">
              <Accordion type="single" collapsible className="space-y-4">
                {priceFaqItems.map((item, index) => (
                  <AccordionItem
                    key={item.question}
                    value={`price-faq-${index}`}
                    className="rounded-xl border border-border bg-white px-5 transition-colors hover:border-[#d8bf72] hover:bg-white md:px-6"
                  >
                    <AccordionTrigger className="bg-transparent text-left hover:bg-transparent hover:text-accent hover:no-underline focus:bg-transparent active:bg-transparent">
                      <span className="font-semibold">{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 leading-7 text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <Card className="border-border">
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
