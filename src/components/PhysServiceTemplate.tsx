import { useState, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PhysServiceLeadForm from "@/components/PhysServiceLeadForm";
import PhoneInput from "@/components/PhoneInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  ArrowUpRight,
  HeartHandshake,
  Home,
  HandCoins,
  Baby,
  Users,
  UserX,
  Fingerprint,
  CircleHelp,
  Loader2
} from "lucide-react";
import { BreadcrumbSchema, LegalServiceSchema, FAQPageSchema, ReviewsSchema } from "@/components/JsonLd";
import { SITE } from "@/config/site";
import { teamMembers } from "@/data/team";
import { getServiceHeroImage } from "@/lib/serviceCardImages";
import { submitToWebhook } from "@/lib/webhook";
import { toast } from "@/hooks/use-toast";
import { isPhoneValid, normalizePhone } from "@/lib/phone";
import type { PhysServicePageData } from "@/data/phys-service-content";
import { useQuickQuestionModal } from "@/components/QuickQuestionModalProvider";

const FAMILY_ISSUES = [
  {
    title: "Расторжение брака без лишних нервов",
    description: "Подготовим документы, представим интересы в суде",
    icon: HeartHandshake
  },
  {
    title: "Раздел совместно нажитого имущества",
    description: "Защитим ваши права на квартиру, автомобиль и сбережения",
    icon: Home
  },
  {
    title: "Взыскание алиментов",
    description: "Поможем получить долг и установить выплаты через суд",
    icon: HandCoins
  },
  {
    title: "Определение места жительства ребенка",
    description: "Разберем, как законно оформить проживание ребенка",
    icon: Baby
  },
  {
    title: "Определение порядка общения с ребенком",
    description: "Поможем установить законный порядок встреч с учетом интересов ребенка",
    icon: Users
  },
  {
    title: "Ограничение или лишение родительских прав",
    description: "Действуем в интересах ребенка",
    icon: UserX
  },
  {
    title: "Оспаривание отцовства/материнства",
    description: "Юридически оспорим или подтвердим родственную связь",
    icon: Fingerprint
  },
  {
    title: "Другая ситуация — нужна помощь",
    description: "Разберем и подскажем, как действовать",
    icon: CircleHelp
  }
];

const FAMILY_TEAM_ORDER = ["yulia-lyadova", "kalabekov", "vaskovsky"] as const;

const FAMILY_TEAM_CONTENT: Record<string, { name: string; role: string; experience: string; specializations: string[] }> = {
  "yulia-lyadova": {
    name: "Лядова Юлия Сергеевна",
    role: "Адвокат",
    experience: "Стаж 18 лет",
    specializations: [
      "Семейные споры",
      "Договорные и имущественные споры",
      "Интеллектуальная собственность"
    ]
  },
  kalabekov: {
    name: "Калабеков Эльдар Султан-Муратович",
    role: "Адвокат",
    experience: "Стаж 8 лет",
    specializations: [
      "Гражданское и семейное право",
      "Семейные и наследственные споры",
      "Защита прав потребителей",
      "Обязательственное право и взыскания"
    ]
  },
  vaskovsky: {
    name: "Васьковский Михаил Михайлович",
    role: "Адвокат",
    experience: "Стаж 15 лет",
    specializations: [
      "Семейные споры и раздел имущества",
      "Наследственные дела",
      "Административные дела",
      "Страховые споры"
    ]
  }
};

interface FamilyShortFormProps {
  topic: string;
  onSuccess?: () => void;
}

const FamilyShortForm = ({ topic, onSuccess }: FamilyShortFormProps) => {
  const [formData, setFormData] = useState({ name: "", phone: "", consent: false });
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitTime, setSubmitTime] = useState<number>(Date.now());

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim() || formData.name.length < 2) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, укажите ваше имя",
        variant: "destructive"
      });
      return false;
    }

    const phoneDigits = normalizePhone(formData.phone);
    if (!isPhoneValid(phoneDigits)) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, укажите корректный номер телефона",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.consent) {
      toast({
        title: "Ошибка",
        description: "Нужно подтвердить согласие на обработку данных",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (honeypot) return;

    const timeDiff = Date.now() - submitTime;
    if (timeDiff < 2000) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, подождите немного перед отправкой",
        variant: "destructive"
      });
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await submitToWebhook({
        name: formData.name,
        phone: formData.phone,
        topic
      });
      toast({
        title: "Заявка отправлена",
        description: "Мы свяжемся с вами в ближайшее время"
      });
      setFormData({ name: "", phone: "", consent: false });
      setSubmitTime(Date.now());
      onSuccess?.();
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Ошибка отправки",
        description: "Пожалуйста, попробуйте позже или свяжитесь с нами по телефону",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute opacity-0 pointer-events-none"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="space-y-2">
        <Label htmlFor="family-name">
          Ваше имя <span className="text-destructive">*</span>
        </Label>
        <Input
          id="family-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Ваше имя"
          disabled={isSubmitting}
          maxLength={100}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="family-phone">
          Ваш номер телефона <span className="text-destructive">*</span>
        </Label>
        <PhoneInput
          id="family-phone"
          name="phone"
          value={formData.phone}
          onChange={handlePhoneChange}
          disabled={isSubmitting}
          required
          placeholder="+7 (___) ___-__-__"
        />
      </div>

      <div className="flex items-start gap-2 text-small text-muted-foreground">
        <Checkbox
          id="family-consent"
          checked={formData.consent}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, consent: checked === true }))
          }
        />
        <label htmlFor="family-consent" className="leading-relaxed">
          Я даю свое согласие на обработку моих персональных данных в соответствии с{" "}
          <a href="/privacy" className="text-accent hover:underline">
            политикой конфиденциальности
          </a>
          .
        </label>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#C9A227] text-white shadow-[0_2px_0_rgba(0,0,0,0.2)] hover:bg-[#B88F1E]"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Отправка...
          </>
        ) : (
          "Получить консультацию"
        )}
      </Button>
    </form>
  );
};

interface PhysServiceTemplateProps {
  data: PhysServicePageData;
}

const PhysServiceTemplate = ({ data }: PhysServiceTemplateProps) => {
  const [highlightStep, setHighlightStep] = useState<number | null>(null);
  const { openQuickQuestionModal } = useQuickQuestionModal();
  const heroImage = getServiceHeroImage(data.entry.path, "phys");
  const isFamilyLanding = data.entry.slug === "razvod-razdel-imushchestva";
  const ogImage = heroImage.startsWith("http")
    ? heroImage
    : `${SITE.url}${heroImage.replace(/^\//, "")}`;

  const familyTeamMembers = isFamilyLanding
    ? FAMILY_TEAM_ORDER.map((slug) => {
        const base = teamMembers.find((member) => member.slug === slug);
        const content = FAMILY_TEAM_CONTENT[slug];
        return {
          ...content,
          slug,
          photo: base?.photo
        };
      })
    : [];

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
              background: "linear-gradient(180deg, rgba(5,12,28,0.92) 0%, rgba(11,31,58,0.75) 45%, rgba(11,31,58,0.35) 100%)"
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
                  onClick={() => openQuickQuestionModal({ topic: data.entry.title })}
                >
                  Оценить перспективы
                </Button>
                <a
                  href="#documents"
                  className="text-white/80 hover:text-white underline underline-offset-4"
                >
                  Какие документы нужны?
                </a>
              </div>
              <p className="text-small text-white/60 mt-6">
                Не обещаем результат, оцениваем перспективы после изучения документов
              </p>
            </div>
          </div>
        </section>

        {/* Section B: Scenarios */}
        <section className="section">
          <div className="container">
            {isFamilyLanding ? (
              <>
                <div className="section__header max-w-3xl">
                  <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-3">
                    Помогаем в любых семейных вопросах
                  </h2>
                  <p className="text-muted-foreground">
                    Выберите вашу ситуацию — подскажем, как действовать:
                  </p>
                </div>
                <div className="section__content grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {FAMILY_ISSUES.map((issue) => {
                    const Icon = issue.icon;
                    return (
                      <Card
                        key={issue.title}
                        className="h-full bg-[#F5F0E6] border border-[#C9A227] rounded-2xl shadow-sm"
                      >
                        <CardContent className="pt-6 pb-6 flex flex-col items-center text-center h-full">
                          <div className="h-12 w-12 rounded-full bg-white border border-[#C9A227]/40 flex items-center justify-center mb-4">
                            <Icon className="h-6 w-6 text-[#6B7280]" />
                          </div>
                          <h3 className="font-semibold text-body-mobile md:text-body mb-2">
                            {issue.title}
                          </h3>
                          <p className="text-small text-muted-foreground mb-6">
                            {issue.description}
                          </p>
                          <Button
                            type="button"
                            onClick={() => openQuickQuestionModal({ topic: data.entry.title })}
                            className="mt-auto bg-[#C9A227] text-white shadow-[0_2px_0_rgba(0,0,0,0.2)] hover:bg-[#B88F1E]"
                          >
                            Получить консультацию
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                <div className="mt-8 text-center text-small text-muted-foreground">
                  <p>
                    Каждая неделя без четкой позиции — это риск потерять квартиру, контакт с ребенком
                    или деньги.
                  </p>
                  <p className="mt-2">
                    В 70% случаев клиенты обращаются слишком поздно — когда позиция уже ослаблена!
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="section__header max-w-3xl">
                  <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-3">
                    Это ваш случай?
                  </h2>
                  <p className="text-muted-foreground">
                    Выберите ситуацию — покажем ближайший шаг и что важно учесть.
                  </p>
                </div>
                <div className="section__content grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                            <ArrowUpRight className="h-4 w-4 text-accent" />
                          </div>
                        </CardContent>
                      </Card>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Section C: Plan */}
        <section id="plan" className="section bg-muted/30 scroll-mt-24">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-3">
                Что сделаем и как
              </h2>
              <p className="text-muted-foreground">
                Структурируем работу так, чтобы вы понимали каждый этап и сроки.
              </p>
            </div>
            <div className="section__content grid gap-4">
              {data.planSteps.map((step, index) => {
                const isActive = highlightStep === index;
                return (
                  <Card
                    key={`${step.title}-${index}`}
                    className={`border-l-4 ${isActive ? "border-l-accent bg-accent/5" : "border-l-transparent"}`}
                  >
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full ${isActive ? "bg-accent" : "bg-accent/10"} flex items-center justify-center`}>
                          <span className={`font-bold ${isActive ? "text-white" : "text-accent"}`}>{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-body-mobile md:text-body mb-2">{step.title}</h3>
                          <p className="text-small text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="section__content grid gap-6 md:grid-cols-2 mt-8">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Если дело уже в суде</h3>
                  <ul className="space-y-2 text-small text-muted-foreground">
                    {data.planInCourt.map((item) => (
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
                  <h3 className="font-semibold mb-3">Если суда ещё нет</h3>
                  <ul className="space-y-2 text-small text-muted-foreground">
                    {data.planBeforeCourt.map((item) => (
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

        {/* Section D: Timing and documents */}
        <section id="documents" className="section scroll-mt-24">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-3">
                Сроки и документы
              </h2>
              <p className="text-muted-foreground">
                Сразу обозначаем, что влияет на сроки и что нужно подготовить.
              </p>
            </div>
            <div className="section__content grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold">Сроки</h3>
                  </div>
                  <ul className="space-y-2 text-small text-muted-foreground">
                    {data.timingFactors.map((item) => (
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
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold">Документы</h3>
                  </div>
                  <ul className="space-y-2 text-small text-muted-foreground">
                    {data.documents.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8">
              <Button
                className="bg-accent hover:bg-accent/90 text-white"
                onClick={() => openQuickQuestionModal({ topic: data.entry.title })}
              >
                Отправить документы на оценку
              </Button>
            </div>
          </div>
        </section>

        {/* Section E: Pricing */}
        <section className="section bg-muted/30">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-3">
                Стоимость
              </h2>
              <p className="text-muted-foreground">
                Стоимость определяется после анализа документов и стадии дела.
              </p>
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
            <div className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Что не входит и оплачивается отдельно</h3>
                  <ul className="space-y-2 text-small text-muted-foreground">
                    {data.priceExcludes.map((item) => (
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

        {/* Section F: Risks */}
        <section className="section">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-3">
                Риски и частые ошибки клиентов
              </h2>
              <p className="text-muted-foreground">
                Эти ошибки часто ухудшают позицию и удлиняют сроки.
              </p>
            </div>
            <div className="section__content grid gap-6 lg:grid-cols-2">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Типовые ошибки</h3>
                  <ul className="space-y-2 text-small text-muted-foreground">
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
                  <ul className="space-y-2 text-small text-muted-foreground">
                    {data.urgent.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-accent mt-0.5" />
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
        <section className="section bg-muted/30">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-3">
                Кейсы и результаты
              </h2>
              <p className="text-muted-foreground">
                Обобщенные примеры без раскрытия персональных данных.
              </p>
            </div>
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
          </div>
        </section>

        {/* Section H: Team */}
        <section className="section">
          <div className="container">
            {isFamilyLanding ? (
              <>
                <div className="section__header max-w-3xl mx-auto text-center">
                  <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-3">
                    Кто ведет ваши дела
                  </h2>
                  <p className="text-muted-foreground">
                    Вашим делом занимаются практикующие адвокаты с опытом в семейных спорах
                  </p>
                </div>
                <div className="section__content grid gap-6 md:grid-cols-3">
                  {familyTeamMembers.map((member) => (
                    <Card
                      key={member.slug}
                      className="h-full border border-[#C9A227] rounded-2xl"
                    >
                      <CardContent className="pt-6 pb-6 flex flex-col items-center text-center h-full">
                        {member.photo && (
                          <div className="w-full h-[240px] rounded-xl overflow-hidden mb-4 border border-[#C9A227]/30">
                            <img
                              src={member.photo}
                              alt={member.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="font-semibold text-body-mobile md:text-body mb-2">
                          {member.name}
                        </div>
                        <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold bg-[#C9A227] text-white rounded-full mb-2">
                          {member.role}
                        </span>
                        <div className="text-small text-muted-foreground mb-4">{member.experience}</div>
                        <div className="font-semibold text-small mb-2">Специализации:</div>
                        <ul className="space-y-1 text-small text-muted-foreground">
                          {member.specializations.map((item) => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <p className="text-center text-small text-muted-foreground mt-6">
                  Все наши юристы проходят ежегодную аттестацию и имеют доступ к базе судебной практики
                </p>
              </>
            ) : (
              <>
                <div className="section__header max-w-3xl">
                  <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-3">
                    Кто ведет дела
                  </h2>
                  <p className="text-muted-foreground">
                    Ведущие специалисты по теме и профильные эксперты.
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
                        <Link
                          to={`/team/${member.slug}`}
                          className="mt-auto text-small text-accent hover:underline"
                        >
                          Смотреть профиль
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Section I: Reviews */}
        <section className="section bg-muted/30">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-3">
                Отзывы по теме
              </h2>
              <p className="text-muted-foreground">
                Клиенты отмечают прозрачность и результативность работы.
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
                    <p className="text-small text-muted-foreground leading-relaxed">
                      {review.text}
                    </p>
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
                  Смотреть все отзывы в Яндекс.Картах
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="section">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-3">
                Другие услуги физлицам
              </h2>
              <p className="text-muted-foreground">
                Посмотрите другие направления, если ваш запрос шире текущей услуги.
              </p>
            </div>
            <div className="section__content grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.otherServices.map((service) => (
                <Card key={service.path} className="h-full">
                  <CardContent className="pt-6">
                    <Link
                      to={service.path}
                      className="text-small font-semibold text-primary hover:text-accent"
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
        <section className="section bg-muted/30">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-3">
                Подробно об услуге
              </h2>
              <p className="text-muted-foreground">
                Разъясняем нюансы, этапы и типовые ситуации по теме услуги.
              </p>
            </div>
            <div className="section__content space-y-4 text-small text-muted-foreground leading-relaxed">
              {data.seoText.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Section J: FAQ */}
        <section className="section">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-3">
                FAQ по услуге
              </h2>
              <p className="text-muted-foreground">
                Короткие ответы на самые частые вопросы.
              </p>
            </div>
            <Accordion type="single" collapsible className="section__content space-y-4">
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
        <section
          id="final-cta"
          className={`section scroll-mt-24 ${isFamilyLanding ? "bg-muted/30" : "bg-primary text-white"}`}
        >
          <div className="container">
            {isFamilyLanding ? (
              <div className="max-w-2xl mx-auto">
                <Card className="bg-white border border-[#C9A227]/60 rounded-2xl shadow-elegant">
                  <CardContent className="pt-6">
                    <h2 className="font-serif text-h3-mobile md:text-h3 font-bold mb-2">
                      Оставьте свой номер телефона — адвокат свяжется с вами в течение 15 минут
                    </h2>
                    <p className="text-small text-muted-foreground mb-6">
                      Перезвоним в течение 15–20 минут в рабочее время
                    </p>
                    <FamilyShortForm topic={data.entry.title} />
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="section__content grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-4">
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
                    <div className="text-small text-muted-foreground mt-4">
                      Первичная оценка — после уточняющих вопросов и документов. Бесплатные консультации не обещаем.
                      В срочных случаях — приоритетная связь.
                    </div>
                    <p className="text-small text-muted-foreground mt-3">
                      Нажимая кнопку, вы соглашаетесь с{" "}
                      <a href="/privacy" className="text-accent hover:underline">
                        политикой конфиденциальности
                      </a>
                      .
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PhysServiceTemplate;
