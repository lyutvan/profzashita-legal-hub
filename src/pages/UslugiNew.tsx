import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Clock,
  Phone,
  Scale,
  Search,
  Shield,
  TrendingUp,
  UserCircle,
  X
} from "lucide-react";
import { getCategoriesForAudience, getServicesByAudience } from "@/data/services-audiences";
import { sharedReviews } from "@/data/shared-reviews";
import { popularServiceItems, searchQuickChips, serviceSearchItems } from "@/data/services-search";
import { SITE } from "@/config/site";

const directionCards = [
  {
    title: "Физическим лицам",
    subtitle: "Защита прав граждан и сопровождение личных споров",
    icon: <UserCircle className="h-10 w-10 text-accent" />,
    items: [
      "Защита прав потребителей",
      "ДТП / страхование / вред здоровью",
      "Семейные споры",
      "Жилищные вопросы",
      "Наследство",
      "Трудовые споры",
      "Взыскание долгов",
      "Ущерб имуществу"
    ],
    to: "/services/phys",
    audience: "phys" as const
  },
  {
    title: "Юридическим лицам",
    subtitle: "Комплексное сопровождение бизнеса и сделок",
    icon: <Building2 className="h-10 w-10 text-accent" />,
    items: [
      "Абонентское сопровождение",
      "Взыскание дебиторки",
      "Арбитражные споры",
      "Договорная работа",
      "Налоговые споры",
      "Банкротство",
      "115-ФЗ / блокировки",
      "Корпоративные конфликты"
    ],
    to: "/services/biz",
    audience: "biz" as const
  },
  {
    title: "Уголовные дела",
    subtitle: "Защита на всех стадиях уголовного процесса",
    icon: <Scale className="h-10 w-10 text-accent" />,
    items: [
      "Жизнь и здоровье",
      "Свобода и честь",
      "Половая неприкосновенность",
      "Собственность",
      "Экономические",
      "Общественная безопасность",
      "Госвласть",
      "Здоровье населения"
    ],
    to: "/services/criminal",
    audience: "criminal" as const
  }
];

const howWeWork = [
  {
    title: "Запрос и первичная оценка",
    description: "Уточняем ситуацию, сроки, риски и возможные сценарии."
  },
  {
    title: "Стратегия и план",
    description: "Фиксируем цель, этапы, документы и ориентиры по срокам."
  },
  {
    title: "Действия и сопровождение",
    description: "Готовим документы, ведем переговоры, представляем в суде."
  },
  {
    title: "Контроль результата",
    description: "Доводим дело до результата и контролируем исполнение."
  }
];

const advantages = [
  {
    title: "Опыт с 2005 года",
    description: "Ведем сложные споры и уголовные дела с устойчивой практикой.",
    icon: <Shield className="h-6 w-6 text-accent" />
  },
  {
    title: "Работаем 24/7",
    description: "Срочное подключение, выезд адвоката и поддержка в любое время.",
    icon: <Clock className="h-6 w-6 text-accent" />
  },
  {
    title: "Сильная стратегия",
    description: "Выстраиваем позицию на фактах, сроках и судебной практике.",
    icon: <TrendingUp className="h-6 w-6 text-accent" />
  },
  {
    title: "Прозрачные этапы",
    description: "Понятный план действий, сроки и регулярные отчеты.",
    icon: <CheckCircle2 className="h-6 w-6 text-accent" />
  },
  {
    title: "Команда экспертов",
    description: "Профильные адвокаты и эксперты под вашу задачу.",
    icon: <UserCircle className="h-6 w-6 text-accent" />
  },
  {
    title: "Фокус на результат",
    description: "Делаем то, что реально влияет на исход и сроки.",
    icon: <ArrowRight className="h-6 w-6 text-accent" />
  }
];

const faqItems = [
  {
    question: "Как быстро можно получить консультацию?",
    answer: "Свяжитесь с нами — уточним детали и предложим ближайшее время. В срочных ситуациях подключаемся в течение нескольких часов."
  },
  {
    question: "Работаете ли вы по договору?",
    answer: "Да. Мы фиксируем объем работ, этапы и порядок оплаты в договоре."
  },
  {
    question: "Можно ли начать работу без личной встречи?",
    answer: "Да. Можно начать с онлайн-консультации и передать документы дистанционно."
  },
  {
    question: "Сколько стоят услуги?",
    answer: "Стоимость зависит от сложности задачи и стадии дела. Оценку дадим после анализа документов."
  }
];

const popularServices = popularServiceItems;

const audienceLabels = {
  phys: "Физическим лицам",
  biz: "Юридическим лицам",
  criminal: "Уголовные дела"
};

const audienceOrder = ["phys", "biz", "criminal"] as const;

const normalizeSearch = (value: string) =>
  value
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[‐‑–—−]/g, " ")
    .replace(/[^a-z0-9а-я\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const buildHighlightRegex = (tokens: string[]) => {
  const escapedTokens = tokens.map(escapeRegExp).filter(Boolean);
  if (!escapedTokens.length) return null;
  const pattern = escapedTokens.sort((a, b) => b.length - a.length).join("|");
  return pattern ? new RegExp(`(${pattern})`, "gi") : null;
};

const highlightText = (text: string, tokens: string[]) => {
  if (!tokens.length) return text;
  const regex = buildHighlightRegex(tokens);
  if (!regex) return text;
  const parts = text.split(regex);
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <span key={`${part}-${index}`} className="services-highlight">
        {part}
      </span>
    ) : (
      part
    )
  );
};

const UslugiNew = () => {
  const [query, setQuery] = useState("");
  const [showAllResults, setShowAllResults] = useState(false);
  const popularRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const whatsappNumber = SITE.phoneRaw.replace(/\D/g, "");

  const tokens = useMemo(() => {
    return normalizeSearch(query)
      .split(/[\s,]+/)
      .map((token) => token.trim())
      .filter(Boolean);
  }, [query]);

  const searchResults = useMemo(() => {
    if (!tokens.length) return [];

    return serviceSearchItems
      .filter((service) => {
        const haystack = normalizeSearch(
          [
            service.title,
            service.subtitle ?? "",
            service.category ?? "",
            service.slug.replace(/-/g, " "),
            service.description ?? "",
            ...(service.keywords ?? [])
          ].join(" ")
        );
        return tokens.every((token) => haystack.includes(token));
      })
      .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));
  }, [tokens]);

  const resultsToShow = showAllResults ? searchResults : searchResults.slice(0, 8);
  const hasMoreResults = searchResults.length > resultsToShow.length;

  const filteredPopular = useMemo(() => {
    if (!tokens.length) return popularServices;

    return popularServices.filter((service) => {
      const haystack = normalizeSearch(
        [
          service.title,
          service.subtitle ?? "",
          service.category ?? "",
          service.slug.replace(/-/g, " "),
          service.description ?? "",
          ...(service.keywords ?? [])
        ].join(" ")
      );
      return tokens.every((token) => haystack.includes(token));
    });
  }, [tokens]);

  const totalByAudience = {
    phys: getServicesByAudience("phys").length,
    biz: getServicesByAudience("biz").length,
    criminal: getServicesByAudience("criminal").length
  };

  const categoriesByAudience = useMemo(
    () => ({
      phys: getCategoriesForAudience("phys"),
      biz: getCategoriesForAudience("biz"),
      criminal: getCategoriesForAudience("criminal")
    }),
    []
  );

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setShowAllResults(false);
  };

  const handleChipClick = (chip: string) => {
    handleQueryChange(chip);
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      handleQueryChange("");
      return;
    }
    if (event.key === "Enter" && searchResults.length === 1) {
      navigate(searchResults[0].path);
    }
  };

  return (
    <div className="services-page min-h-screen flex flex-col">
      <Helmet>
        <title>Юридические услуги в Москве — Профзащита</title>
        <meta
          name="description"
          content="Юридические услуги в Москве: выберите направление или найдите нужную услугу за 10 секунд. Семейные, гражданские, бизнес и уголовные дела."
        />
        <link rel="canonical" href={`${SITE.url}uslugi`} />
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* A) Hero */}
        <section className="section py-10 md:py-12 lg:py-14 bg-gradient-to-br from-primary to-primary/90 text-white">
          <div className="container">
            <Breadcrumbs items={[{ label: "Услуги" }]} />
            <div className="mt-6 max-w-3xl space-y-4">
              <h1 className="font-serif text-h1-mobile md:text-h1 font-bold leading-tight">
                Юридические услуги в Москве
              </h1>
              <p className="lead text-white/85">
                Выберите направление или найдите услугу по вашей ситуации за 10 секунд.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white" asChild>
                  <Link to="/kontakty">Бесплатная консультация</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/25 bg-white/10 text-white hover:bg-white/20"
                  asChild
                >
                  <a href={`tel:${SITE.phoneRaw}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    Позвонить сейчас
                  </a>
                </Button>
              </div>
              <div className="text-small text-white/70">
                Или напишите в WhatsApp:{" "}
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline underline-offset-4"
                >
                  {SITE.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* B) Quick Search */}
        <section className="section pt-0">
          <div className="container">
            <Card className="border-border/60 shadow-lg">
              <CardContent className="pt-6 pb-6">
                <div className="grid grid-cols-4 lg:grid-cols-12 gap-6 items-start">
                  <div className="col-span-4 lg:col-span-5">
                    <h2 className="font-serif text-h3-mobile md:text-h3 font-semibold mb-2">
                      Быстрый поиск услуги
                    </h2>
                    <p className="text-small text-muted-foreground">
                      Введите ключевое слово или выберите популярный запрос ниже.
                    </p>
                  </div>
                  <div className="col-span-4 lg:col-span-7">
                    <label className="sr-only" htmlFor="service-search">
                      Поиск услуги
                    </label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="service-search"
                        type="search"
                        value={query}
                        onChange={(event) => handleQueryChange(event.target.value)}
                        onKeyDown={handleSearchKeyDown}
                        placeholder="Например: развод, ДТП, наследство, 115-ФЗ, 159 УК…"
                        className="w-full rounded-xl border border-border bg-background pl-12 pr-12 py-3 text-body focus:outline-none focus:ring-2 focus:ring-accent/40"
                        autoFocus
                      />
                      {query && (
                        <button
                          type="button"
                          onClick={() => handleQueryChange("")}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent"
                          aria-label="Очистить поиск"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {searchQuickChips.map((chip) => (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => handleChipClick(chip)}
                          className="rounded-full border border-border px-4 py-1.5 text-small text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                        >
                          {chip}
                        </button>
                      ))}
                      {query && (
                        <button
                          type="button"
                          onClick={() => handleQueryChange("")}
                          className="rounded-full border border-accent/30 px-4 py-1.5 text-small text-accent hover:border-accent"
                        >
                          Сбросить фильтр
                        </button>
                      )}
                    </div>
                    {query && (
                      <div className="mt-6">
                        <div className="flex flex-wrap items-center justify-between gap-3 text-small text-muted-foreground">
                          <span>
                            Найдено: <span className="text-foreground font-semibold">{searchResults.length}</span>
                          </span>
                          {hasMoreResults && !showAllResults && (
                            <span>Показаны первые {resultsToShow.length} результатов</span>
                          )}
                        </div>
                        {searchResults.length > 0 ? (
                          <div className="mt-3 grid gap-2">
                            {resultsToShow.map((service) => (
                              <Link
                                key={service.id}
                                to={service.path}
                                className="rounded-xl border border-border/80 bg-background px-4 py-3 transition-colors hover:border-accent hover:bg-accent/5"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <div className="font-medium text-foreground">
                                      {highlightText(service.title, tokens)}
                                    </div>
                                    <div className="text-small text-muted-foreground">
                                      {highlightText(service.subtitle ?? service.category ?? "", tokens)}
                                    </div>
                                  </div>
                                  <span className="rounded-full border border-border px-3 py-1 text-[12px] text-muted-foreground">
                                    {audienceLabels[service.audience]}
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="mt-3 rounded-xl border border-dashed border-border/70 bg-muted/40 px-4 py-4 text-small text-muted-foreground">
                            Ничего не найдено. Попробуйте запросы: «развод», «дтп», «наследство», «115-фз», «159 ук».
                          </div>
                        )}
                        {hasMoreResults && !showAllResults && (
                          <div className="mt-4">
                            <Button variant="outline" onClick={() => setShowAllResults(true)}>
                              Показать все результаты
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* C) Catalog */}
        <section className="section">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                Каталог услуг
              </h2>
              <p className="text-muted-foreground">
                Полный список направлений и услуг с быстрыми переходами.
              </p>
            </div>
            <div className="section__content grid grid-cols-1 lg:grid-cols-3 gap-6">
              {audienceOrder.map((audience) => (
                <Card key={audience} className="border-border/80 h-full">
                  <CardContent className="pt-6 pb-6 h-full flex flex-col">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-semibold text-body-mobile md:text-body">
                          {audienceLabels[audience]}
                        </h3>
                        <p className="text-small text-muted-foreground">
                          {totalByAudience[audience]} услуг в разделе
                        </p>
                      </div>
                      <Button variant="outline" size="sm" asChild className="h-10 px-4 text-small">
                        <Link to={directionCards.find((card) => card.audience === audience)?.to ?? "/"}>
                          Все услуги
                        </Link>
                      </Button>
                    </div>
                    <div className="space-y-5">
                      {categoriesByAudience[audience].map((category) => (
                        <div key={category.slug}>
                          <p className="text-small font-semibold text-foreground">
                            {category.title}
                          </p>
                          <ul className="mt-2 space-y-1 text-small text-muted-foreground">
                            {category.services.map((service) => (
                              <li key={service.path}>
                                <Link
                                  to={service.path}
                                  className="transition-colors hover:text-accent"
                                >
                                  {service.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* D) Directions */}
        <section className="section">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                Направления услуг
              </h2>
              <p className="text-muted-foreground">
                Быстрый вход в нужный раздел — выберите вашу ситуацию.
              </p>
            </div>
            <div className="section__content grid grid-cols-4 lg:grid-cols-12 gap-6">
              {directionCards.map((card) => (
                <Card key={card.title} className="col-span-4 lg:col-span-4 h-full border-border/80">
                  <CardContent className="pt-6 h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="rounded-xl bg-accent/10 p-3">{card.icon}</div>
                      <div>
                        <div className="font-semibold text-body-mobile md:text-body">{card.title}</div>
                        <div className="text-small text-muted-foreground">{card.subtitle}</div>
                      </div>
                    </div>
                    <ul className="space-y-2 text-small text-muted-foreground mb-6">
                      {card.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant="outline" className="mt-auto">
                      <Link to={card.to}>
                        Все услуги раздела ({totalByAudience[card.audience]})
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* E) Popular services */}
        <section className="section bg-muted/30 scroll-mt-24" ref={popularRef} id="popular">
          <div className="container">
            <div className="section__header">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                Популярные услуги
              </h2>
              <p className="text-muted-foreground">
                Быстрые переходы по самым частым запросам. Ищите по ключевым словам — результаты подсвечиваются.
              </p>
            </div>
            {query && (
              <div className="mb-4 text-small text-muted-foreground">
                Найдено: <span className="text-foreground font-semibold">{filteredPopular.length}</span>
              </div>
            )}
            <div className="section__content grid grid-cols-4 lg:grid-cols-12 gap-4 lg:gap-6">
              {filteredPopular.map((service) => (
                <Link
                  key={service.path}
                  to={service.path}
                  className="col-span-4 lg:col-span-4 group"
                >
                  <Card className="h-full border-border/80 transition-all hover:border-accent/60 hover:shadow-elegant">
                    <CardContent className="pt-5 pb-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-body-mobile md:text-body mb-2 text-foreground group-hover:text-accent">
                            {highlightText(service.title, tokens)}
                          </h3>
                          <p className="text-small text-muted-foreground">
                            {highlightText(service.subtitle, tokens)}
                          </p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              {!filteredPopular.length && (
                <div className="col-span-4 lg:col-span-12 text-center text-muted-foreground py-6">
                  Ничего не найдено. Попробуйте другой запрос или получите консультацию.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* F) How we work */}
        <section className="section">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                Как мы работаем
              </h2>
              <p className="text-muted-foreground">
                Понятные этапы, чтобы вы контролировали процесс и сроки.
              </p>
            </div>
            <div className="section__content grid grid-cols-4 lg:grid-cols-12 gap-4 lg:gap-6">
              {howWeWork.map((step, index) => (
                <Card key={step.title} className="col-span-4 lg:col-span-3 border-border/80">
                  <CardContent className="pt-5 pb-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold mb-2">{step.title}</div>
                        <p className="text-small text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* G) Why us */}
        <section className="section bg-muted/30">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Почему выбирают нас</h2>
              <p className="text-muted-foreground">
                Фокус на результате, прозрачности и сильной юридической позиции.
              </p>
            </div>
            <div className="section__content grid grid-cols-4 lg:grid-cols-12 gap-4 lg:gap-6">
              {advantages.map((item) => (
                <Card key={item.title} className="col-span-4 lg:col-span-4 border-border/80">
                  <CardContent className="pt-5 pb-5">
                    <div className="flex items-start gap-4">
                      <div className="rounded-xl bg-accent/10 p-3">{item.icon}</div>
                      <div>
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-small text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* H) Reviews */}
        <section className="section">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Отзывы</h2>
              <p className="text-muted-foreground">
                Реальные истории клиентов — о подходе, сроках и результате.
              </p>
            </div>
            <div className="section__content grid grid-cols-4 lg:grid-cols-12 gap-4 lg:gap-6">
              {sharedReviews.slice(0, 6).map((review) => (
                <Card key={review.id} className="col-span-4 lg:col-span-4 border-border/80">
                  <CardContent className="pt-5 pb-5 h-full flex flex-col">
                    <div className="flex items-center justify-between text-small text-muted-foreground mb-2">
                      <span className="font-semibold text-foreground">{review.name}</span>
                      <span>{review.date}</span>
                    </div>
                    <p className="text-small text-muted-foreground leading-relaxed">{review.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6">
              <Button asChild className="bg-primary text-white hover:bg-primary/90">
                <a
                  href="https://yandex.ru/maps/org/244880896695/reviews/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Смотреть все отзывы в Яндекс Картах
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* I) FAQ + Final CTA */}
        <section className="section bg-muted/30">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">FAQ</h2>
              <p className="text-muted-foreground">Короткие ответы на частые вопросы.</p>
            </div>
            <Accordion type="single" collapsible className="section__content max-w-3xl space-y-3">
              {faqItems.map((faq, index) => (
                <AccordionItem
                  key={`${faq.question}-${index}`}
                  value={`faq-${index}`}
                  className="border rounded-lg px-6 bg-background"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-10">
              <Card className="bg-gradient-to-br from-primary to-primary/90 text-white border-0">
                <CardContent className="pt-6 pb-6">
                  <div className="grid grid-cols-4 lg:grid-cols-12 gap-6 items-start">
                    <div className="col-span-4 lg:col-span-5">
                      <h3 className="font-serif text-h3-mobile md:text-h3 font-semibold mb-3">
                        Получите оценку и план действий
                      </h3>
                      <p className="text-white/80 text-small">
                        Заполните форму — мы уточним детали и предложим следующий шаг.
                      </p>
                      <div className="mt-4 text-small text-white/70">
                        Или напишите в WhatsApp: {SITE.phone}
                      </div>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <Button className="bg-accent text-white hover:bg-accent/90" asChild>
                          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                            Написать в WhatsApp
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          className="border-primary/35 bg-white/95 text-primary hover:bg-primary/5 hover:text-primary hover:border-primary/50 focus-visible:ring-primary/40"
                          asChild
                        >
                          <a href={`tel:${SITE.phoneRaw}`}>Позвонить</a>
                        </Button>
                      </div>
                    </div>
                    <div className="col-span-4 lg:col-span-7">
                      <Card className="bg-white text-foreground border-0">
                        <CardContent className="pt-6">
                          <LeadForm variant="compact" />
                          <p className="text-small text-muted-foreground mt-4">
                            Первичная оценка — после уточняющих вопросов и документов.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
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

export default UslugiNew;
