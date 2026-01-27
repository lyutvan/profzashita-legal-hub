import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Star,
  Phone,
  Mail,
  MapPin,
  Scale,
  Home,
  Building2,
  Users,
  MessageCircle,
  Shield,
  FileSearch,
  HelpCircle,
  Landmark
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PhoneInput from "@/components/PhoneInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BreadcrumbSchema, FAQPageSchema, LegalServiceSchema, ReviewsSchema } from "@/components/JsonLd";
import { toast } from "@/hooks/use-toast";
import { submitToWebhook } from "@/lib/webhook";
import { isPhoneValid, normalizePhone } from "@/lib/phone";
import { SITE } from "@/config/site";
import { audienceServices } from "@/data/services-audiences";
import { sharedReviews } from "@/data/shared-reviews";
import { getServiceHeroImage } from "@/lib/serviceCardImages";
import { useQuickQuestionModal } from "@/components/QuickQuestionModalProvider";
import type { PhysServicePageData } from "@/data/phys-service-content";

type LeadFormProps = {
  formId: string;
  submitLabel: string;
  placeholder?: string;
  footerNote: string;
  topic: string;
  onSuccess?: () => void;
};

const LeadForm = ({ formId, submitLabel, placeholder, footerNote, topic, onSuccess }: LeadFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: ""
  });
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submitTime, setSubmitTime] = useState<number>(Date.now());

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, укажите имя",
        variant: "destructive"
      });
      return;
    }

    const phoneDigits = normalizePhone(formData.phone);
    if (!isPhoneValid(phoneDigits)) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, укажите корректный номер телефона",
        variant: "destructive"
      });
      return;
    }

    if (!consent) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, подтвердите согласие на обработку данных",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await submitToWebhook({
        name: formData.name.trim(),
        phone: formData.phone,
        topic,
        message: formData.comment.trim()
      });
      toast({
        title: "Заявка отправлена",
        description: "Мы свяжемся с вами в ближайшее время"
      });
      setFormData({ name: "", phone: "", comment: "" });
      setConsent(false);
      setSubmitTime(Date.now());
      if (onSuccess) onSuccess();
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
        <Label htmlFor={`${formId}-name`}>
          Имя <span className="text-destructive">*</span>
        </Label>
        <Input
          id={`${formId}-name`}
          name="name"
          value={formData.name}
          onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
          required
          placeholder="Ваше имя*"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${formId}-phone`}>
          Телефон <span className="text-destructive">*</span>
        </Label>
        <PhoneInput
          id={`${formId}-phone`}
          value={formData.phone}
          onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
          disabled={isSubmitting}
          required
          placeholder="Ваш номер телефона*"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${formId}-comment`}>Коротко опишите ситуацию</Label>
        <Textarea
          id={`${formId}-comment`}
          name="comment"
          value={formData.comment}
          onChange={(event) => setFormData((prev) => ({ ...prev, comment: event.target.value }))}
          placeholder={placeholder}
          rows={4}
          disabled={isSubmitting}
        />
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id={`${formId}-consent`}
          checked={consent}
          onCheckedChange={(value) => setConsent(Boolean(value))}
        />
        <Label htmlFor={`${formId}-consent`} className="text-small text-muted-foreground leading-relaxed">
          Я даю свое согласие на обработку персональных данных и принимаю условия{" "}
          <Link to="/privacy" className="text-accent hover:underline">
            политики конфиденциальности
          </Link>{" "}
          и{" "}
          <Link to="/disclaimer" className="text-accent hover:underline">
            пользовательского соглашения
          </Link>
          .
        </Label>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] text-[14px] text-slate-900 shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f]"
        disabled={isSubmitting}
      >
        {submitLabel}
      </Button>

      <p className="text-small text-muted-foreground text-center">{footerNote}</p>
    </form>
  );
};

type PhysCategoryLandingTemplateProps = {
  data: PhysServicePageData;
};

const CATEGORY_ICONS = [Scale, Home, Building2, Users, MessageCircle, Shield, FileSearch, Landmark, HelpCircle] as const;

const PhysCategoryLandingTemplate = ({ data }: PhysCategoryLandingTemplateProps) => {
  const { openQuickQuestionModal } = useQuickQuestionModal();

  const heroImage = getServiceHeroImage(data.entry.path, "phys");
  const ogImage = heroImage.startsWith("http") ? heroImage : `${SITE.url}${heroImage.replace(/^\//, "")}`;

  const trustItems = [
    { id: "confidential", label: "Конфиденциально" },
    { id: "experience", accent: "15+", label: "лет практики" },
    { id: "region", label: "Работаем в Москве и Московской области" },
    { id: "category", label: `Экспертиза в категории «${data.categoryLabel}»` }
  ];

  const categoryServices = useMemo(() => {
    return audienceServices
      .filter(
        (service) =>
          service.audience === "phys" && service.category === data.entry.category && service.path !== data.entry.path
      )
      .slice(0, 8)
      .map((service) => ({ title: service.title, description: service.description, path: service.path }));
  }, [data.entry.category, data.entry.path]);

  const situationCards = categoryServices.length > 0
    ? categoryServices
    : data.scenarios.slice(0, 8).map((scenario) => ({
        title: scenario.title,
        description: "Подскажем ближайший шаг и соберем сильную позицию",
        path: data.entry.path
      }));

  const salesWhatWeDo = Array.from(
    new Set([
      ...data.planBeforeCourt.slice(0, 3),
      ...data.planInCourt.slice(0, 3),
      ...data.planSteps.slice(0, 2).map((step) => step.title)
    ])
  ).slice(0, 6);

  const cases = data.cases.slice(0, 2).map((item, index) => {
    const withDecision = item as PhysServicePageData["cases"][number] & {
      decisionPreview?: string;
      decisionUrl?: string;
    };
    return {
      title: `${data.categoryLabel}: кейс ${index + 1}`,
      situation: item.situation,
      task:
        data.desiredResults[index % data.desiredResults.length] ??
        "Защитить права и добиться управляемого результата.",
      actions: item.actions,
      result: item.result,
      decisionPreview: withDecision.decisionPreview,
      decisionUrl: withDecision.decisionUrl
    };
  });

  const steps = data.planSteps.slice(0, 6).map((step, index) => ({
    title: step.title,
    action: step.description,
    result:
      data.desiredResults[index % data.desiredResults.length] ??
      "Фиксируем позицию и снижаем риски на этом этапе."
  }));

  const accordionItems = [
    {
      title: "Что мы делаем",
      content: (
        <ul className="list-disc list-inside space-y-2 text-small text-muted-foreground">
          {salesWhatWeDo.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )
    },
    {
      title: "Когда лучше действовать — и почему сроки важны",
      content: (
        <p className="text-small text-muted-foreground leading-relaxed">
          В делах категории «{data.categoryLabel}» важны сроки: можно пропустить исковую давность,
          потерять доказательства и усложнить переговорную позицию. Чем раньше вы фиксируете факты
          и правовую позицию, тем больше вариантов защитить интересы.
        </p>
      )
    },
    {
      title: "Какие документы нужны",
      content: (
        <ul className="list-disc list-inside space-y-2 text-small text-muted-foreground">
          {data.documents.slice(0, 8).map((doc) => (
            <li key={doc}>{doc}</li>
          ))}
        </ul>
      )
    },
    {
      title: "Сколько это стоит?",
      content: (
        <div className="space-y-2 text-small text-muted-foreground leading-relaxed">
          <p>
            Стоимость зависит от сложности ситуации, объема документов и стадии процесса. После
            первичной оценки фиксируем объем работ и условия сотрудничества в договоре.
          </p>
          {data.priceFactors.length > 0 && (
            <ul className="list-disc list-inside space-y-1">
              {data.priceFactors.slice(0, 5).map((factor) => (
                <li key={factor}>{factor}</li>
              ))}
            </ul>
          )}
        </div>
      )
    },
    {
      title: "Типичные ошибки — и как их избежать",
      content: (
        <ul className="list-disc list-inside space-y-2 text-small text-muted-foreground">
          {data.mistakes.slice(0, 6).map((mistake) => (
            <li key={mistake}>{mistake}</li>
          ))}
        </ul>
      )
    },
    {
      title: "Что вы получаете?",
      content: (
        <ul className="list-disc list-inside space-y-2 text-small text-muted-foreground">
          {data.desiredResults.slice(0, 6).map((result) => (
            <li key={result}>{result}</li>
          ))}
        </ul>
      )
    }
  ];

  const reviews = (data.reviews.length > 0 ? data.reviews : sharedReviews).slice(0, 6);

  const shouldShowCases = cases.length > 0;

  return (
    <div className="min-h-screen flex flex-col category-landing-page">
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
      </Helmet>

      <BreadcrumbSchema items={data.breadcrumbSchema} />
      <LegalServiceSchema serviceType={data.heroTitle} url={data.canonical} />
      {data.faqs.length > 0 && <FAQPageSchema items={data.faqs} url={data.canonical} />}
      {reviews.length > 0 && (
        <ReviewsSchema
          reviews={reviews.map((review) => ({
            author: review.name,
            rating: review.rating,
            reviewBody: review.text,
            datePublished: review.date
          }))}
          url={data.canonical}
        />
      )}

      <Header />

      <main className="flex-1 services-page">
        {/* Экран 1: Hero */}
        <section
          className="relative text-white section section--hero"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(5,12,28,0.9) 0%, rgba(11,31,58,0.75) 55%, rgba(11,31,58,0.4) 100%)"
            }}
          />
          <div className="container relative z-10">
            <Breadcrumbs items={data.breadcrumbs} />
            <div className="max-w-4xl mt-6 space-y-5">
              <h1 className="category-hero-title font-serif text-h1-mobile md:text-h1 font-bold">{data.heroTitle}</h1>
              <ul className="category-hero-benefits pl-6 list-disc space-y-2 text-white/90 text-base md:text-lg leading-relaxed marker:text-white/80">
                {data.heroBenefits.slice(0, 6).map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
              <p className="lead text-white/90">{data.heroSubtitle}</p>
              <Button
                size="lg"
                className="w-full sm:w-auto bg-accent text-primary shadow-[0_8px_18px_rgba(201,162,39,0.35)] hover:bg-[#c09a23] active:bg-[#a9851d] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary/40"
                onClick={() => openQuickQuestionModal({ topic: data.heroTitle })}
              >
                Получить консультацию
              </Button>
              <div className="category-hero-trust flex flex-wrap items-center gap-y-2 text-small text-white/80">
                {trustItems.map((item, index) => (
                  <span
                    key={item.id}
                    className={`category-hero-trust-item flex items-center ${
                      index > 0 ? "before:content-['•'] before:mx-2 before:text-white/50" : ""
                    }`}
                  >
                    {item.accent ? (
                      <>
                        <span className="category-hero-trust-accent">{item.accent}</span>{" "}
                        {item.label}
                      </>
                    ) : (
                      item.label
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Экран 2: Каталог услуг */}
        <section className="section">
          <div className="container">
            <div className="section__header max-w-3xl mx-auto text-center pt-2 md:pt-4 mb-6 md:mb-7">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Популярные услуги в категории</h2>
              <p className="text-muted-foreground">Выберите услугу — подскажем, как действовать:</p>
            </div>
            <div className="section__content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
              {situationCards.map((card, index) => {
                const Icon = CATEGORY_ICONS[index % CATEGORY_ICONS.length];
                return (
                  <Card
                    key={card.title}
                    className="h-full rounded-[12px] border border-[#D8C08B] bg-[#F6F1E6] shadow-[0_8px_20px_rgba(60,52,31,0.08)]"
                  >
                    <CardContent className="p-5 md:p-6 pt-5 md:pt-6 h-full flex flex-col items-center text-center gap-3">
                      <Icon className="h-12 w-12 text-[#111827]" strokeWidth={2} />
                      <h3 className="font-semibold text-[16px] md:text-[17px] text-slate-900">{card.title}</h3>
                      <p className="text-[13px] md:text-[14px] text-slate-600 leading-relaxed flex-1">
                        {card.description ?? "Подготовим документы и защитим позицию в переговорах и суде"}
                      </p>
                      <Button
                        asChild
                        size="lg"
                        className="mt-2 h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] px-6 text-[14px] text-slate-900 shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f] hover:shadow-[0_4px_12px_rgba(111,83,15,0.2)]"
                      >
                        <Link to={card.path}>Перейти к услуге</Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="mt-7 md:mt-8 rounded-[12px] border border-[#D8C08B] bg-[#F7F2E8] p-6 text-center shadow-[0_6px_16px_rgba(60,52,31,0.08)]">
              <p className="font-semibold text-body-mobile md:text-body text-slate-900">
                Каждая неделя без четкой позиции — это риск потерять время, деньги и сильную переговорную позицию.
              </p>
              <p className="mt-2 text-[14px] md:text-[15px] text-slate-600 font-medium">
                Чем раньше вы фиксируете факты и стратегию, тем выше шанс решить вопрос в вашу пользу.
              </p>
            </div>
          </div>
        </section>

        {/* Экран 3: Команда */}
        {data.team.length > 0 && (
          <section className="section bg-muted/30">
            <div className="container">
              <div className="section__header max-w-3xl mx-auto text-center">
                <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Кто ведет ваши дела</h2>
                <p className="text-muted-foreground">
                  Вашим делом занимаются практикующие адвокаты с опытом именно в этой категории споров
                </p>
              </div>
              <div className="section__content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {data.team.map((member) => (
                  <Card
                    key={member.slug}
                    className="h-full rounded-[12px] border border-[#C9A227] bg-white shadow-[0_8px_20px_rgba(60,52,31,0.08)]"
                  >
                    <CardContent className="p-6 h-full flex flex-col items-center text-center">
                      <div className="flex w-full flex-col items-center text-center gap-4">
                        {member.photo && (
                          <div className="w-full overflow-hidden rounded-[10px] border border-[#E6DDCC] bg-white">
                            <img
                              src={member.photo}
                              alt={member.name}
                              className="h-[320px] w-full object-cover object-center md:h-[340px] lg:h-[360px]"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <h3 className="font-semibold text-[16px] md:text-[18px] text-slate-900">{member.name}</h3>
                        <span className="inline-flex items-center rounded-full bg-[#C9A227] px-4 py-1 text-[12px] font-semibold text-slate-900">
                          {member.role}
                        </span>
                        {member.experience && (
                          <div className="text-[13px] font-semibold text-slate-800">{member.experience}</div>
                        )}
                        <div className="w-full">
                          <div className="text-[12px] font-semibold text-slate-700">Специализации:</div>
                          <ul className="mt-2 space-y-1 text-[13px] text-slate-700 list-disc list-inside text-center">
                            {member.bullets.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-[13px] text-slate-600 leading-relaxed space-y-2">
                          <p>
                            Ведет дела по направлению «{data.categoryLabel}», помогает зафиксировать позицию,
                            подготовить документы и защитить интересы в переговорах и суде.
                          </p>
                          <p>Работает системно: от диагностики ситуации до исполнения решения.</p>
                        </div>
                      </div>
                      <div className="mt-auto w-full pt-5 flex justify-center">
                        <Button
                          asChild
                          size="lg"
                          className="w-full md:w-auto h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] text-[14px] text-slate-900 shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f] hover:shadow-[0_4px_12px_rgba(111,83,15,0.2)]"
                        >
                          <Link to={`/team/${member.slug}`}>Подробнее об адвокате</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="mt-8 text-center text-small text-muted-foreground">
                Все наши юристы проходят ежегодную аттестацию и имеют доступ к базе судебной практики
              </p>
            </div>
          </section>
        )}

        {/* Экран 4: Этапы работы */}
        <section className="section">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                Как мы работаем: 6 этапов, чтобы вы вышли из ситуации с минимальными потерями
              </h2>
            </div>
            <div className="section__content">
              <div className="category-steps-list divide-y divide-border/80 rounded-2xl border border-border/80 bg-white/90 shadow-[0_12px_28px_rgba(15,23,42,0.06)] overflow-hidden">
                {steps.map((step, index) => (
                  <div key={step.title} className="category-step-item flex gap-4 md:gap-6 px-4 md:px-6 py-5 md:py-6">
                    <div className="category-step-number h-11 w-11 md:h-12 md:w-12 shrink-0 rounded-full border border-accent/40 bg-accent/10 text-accent flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1 space-y-3">
                      <h3 className="font-semibold text-body-mobile md:text-body text-slate-900">{step.title}</h3>
                      <div>
                        <div className="category-step-label text-xs uppercase tracking-wide text-muted-foreground mb-1">
                          Что мы делаем
                        </div>
                        <p className="category-step-text text-small text-muted-foreground leading-relaxed">{step.action}</p>
                      </div>
                      <div>
                        <div className="category-step-label text-xs uppercase tracking-wide text-muted-foreground mb-1">
                          Результат для вас
                        </div>
                        <p className="category-step-text text-small text-muted-foreground leading-relaxed">{step.result}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="rounded-[12px] border border-[#D8C08B] bg-[#F6F1E6] shadow-[0_8px_20px_rgba(60,52,31,0.08)]">
                <CardContent className="p-6 text-center">
                  <p className="text-body-mobile md:text-body text-slate-900">
                    Если дело уже в суде — подключимся сразу. Проанализируем материалы, укажем, что можно усилить,
                    и начнем действовать.
                  </p>
                </CardContent>
              </Card>
              <Card className="rounded-[12px] border border-[#D8C08B] bg-[#F6F1E6] shadow-[0_8px_20px_rgba(60,52,31,0.08)]">
                <CardContent className="p-6 text-center">
                  <p className="text-body-mobile md:text-body text-slate-900">
                    Если еще не дошло до суда — подготовим сильную позицию заранее. Часто этого достаточно,
                    чтобы вторая сторона пошла на уступки без заседаний.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8 flex flex-col items-center gap-3 text-center">
              <Button
                size="lg"
                className="w-full sm:w-[360px] h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] text-[14px] text-slate-900 shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f] hover:shadow-[0_4px_12px_rgba(111,83,15,0.2)]"
                onClick={() => openQuickQuestionModal({ topic: data.heroTitle })}
              >
                Получить индивидуальный план действий
              </Button>
              <p className="text-small text-slate-600">
                Мы проанализируем вашу ситуацию и покажем, как действовать дальше — без обязательств
              </p>
            </div>
          </div>
        </section>

        {/* Экран 5: Кейсы и отзывы */}
        <section className="section bg-muted/30">
          <div className="container">
            {shouldShowCases && (
              <div className="category-cases-surface rounded-2xl border border-[#D8C08B] bg-[#F8F4EA] p-6 md:p-8 shadow-[0_16px_36px_rgba(60,52,31,0.1)]">
                <div className="section__header max-w-3xl">
                  <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Кейсы</h2>
                  <p className="text-muted-foreground">
                    Мы не раскрываем персональные данные клиентов — примеры основаны на реальных делах
                  </p>
                </div>
                <div className="section__content grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {cases.map((caseItem) => (
                    <Card
                      key={caseItem.title}
                      className="category-case-card h-full rounded-xl border border-[#D8C08B]/80 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]"
                    >
                      <CardContent className="pt-6 h-full flex flex-col gap-5">
                        {caseItem.decisionPreview ? (
                          <div className="category-case-preview overflow-hidden rounded-lg border border-[#E6DDCC] bg-white">
                            <img
                              src={caseItem.decisionPreview}
                              alt={`Решение по кейсу: ${caseItem.title}`}
                              className="h-[190px] w-full object-contain bg-white"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="category-case-preview flex h-[190px] w-full items-center justify-center rounded-lg border border-dashed border-[#D8C08B] bg-white/70 text-center text-small text-slate-500">
                            Скан решения будет добавлен
                          </div>
                        )}
                        <h3 className="font-semibold text-body-mobile md:text-body text-slate-900">{caseItem.title}</h3>
                        <div className="space-y-3 text-small text-muted-foreground leading-relaxed">
                          <div>
                            <span className="font-semibold text-foreground">Ситуация: </span>
                            {caseItem.situation}
                          </div>
                          <div>
                            <span className="font-semibold text-foreground">Задача: </span>
                            {caseItem.task}
                          </div>
                          <div>
                            <span className="font-semibold text-foreground">Что сделали: </span>
                            {caseItem.actions}
                          </div>
                          <div>
                            <span className="font-semibold text-foreground">Результат: </span>
                            {caseItem.result}
                          </div>
                        </div>
                        <div className="mt-auto flex flex-wrap gap-3 pt-2">
                          <Button
                            asChild
                            size="lg"
                            className="category-case-button h-11 rounded-[12px] border border-[#b8911f] bg-[#C9A227] px-5 text-[14px] text-slate-900 shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f]"
                          >
                            <Link to="/keisy">Смотреть кейсы</Link>
                          </Button>
                          {caseItem.decisionUrl && (
                            <Button asChild variant="outline" size="lg" className="h-11 rounded-[12px] border-[#C9A227] text-slate-900 hover:bg-[#F7F2E8]">
                              <a href={caseItem.decisionUrl} target="_blank" rel="noopener noreferrer">
                                Решение
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div className={shouldShowCases ? "mt-12" : undefined}>
              <div className="category-reviews-surface rounded-2xl border border-[#D8C08B] bg-white p-6 md:p-8 shadow-[0_16px_36px_rgba(15,23,42,0.08)]">
                <div className="category-reviews-header mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="section__header max-w-3xl !mb-0">
                    <h3 className="font-serif text-h3-mobile md:text-h3 font-semibold">Отзывы клиентов</h3>
                    <p className="text-muted-foreground">Реальные отзывы о качестве нашей юридической помощи</p>
                  </div>
                  <div className="category-yandex-badge w-full max-w-[170px]">
                    <iframe
                      src="https://yandex.ru/sprav/widget/rating-badge/244880896695?type=rating"
                      width="150"
                      height="50"
                      frameBorder="0"
                      title="Рейтинг Профзащита в Яндекс.Картах"
                      className="max-w-full"
                    ></iframe>
                  </div>
                </div>
                <div className="section__content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {reviews.map((review, reviewIndex) => (
                    <Card
                      key={`${review.name}-${reviewIndex}`}
                      className="category-review-card h-full rounded-xl border border-[#E6DDCC] bg-[#F9F7F2] shadow-[0_10px_22px_rgba(15,23,42,0.06)]"
                    >
                      <CardContent className="pt-6 h-full flex flex-col">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex items-center gap-1 text-accent">
                            {Array.from({ length: review.rating }).map((_, index) => (
                              <Star key={`${review.name}-${index}`} className="h-4 w-4 fill-current" />
                            ))}
                          </div>
                          <span className="text-small text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-small text-muted-foreground leading-relaxed flex-1">{review.text}</p>
                        <div className="border-t border-border mt-4 pt-4">
                          <span className="text-small font-semibold">{review.name}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center mt-8">
                  <Button
                    asChild
                    size="lg"
                    className="category-yandex-button h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] px-6 text-[14px] text-slate-900 shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f]"
                  >
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
            </div>
          </div>
        </section>

        {/* Экран 6: Большой продающий блок + аккордеон */}
        <section className="section">
          <div className="container">
            <div className="section__header max-w-4xl !mb-4 md:!mb-5">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                {data.categoryLabel}: как получить справедливый результат — без лишнего стресса и потерь?
              </h2>
            </div>
            <Card className="border-border">
              <CardContent className="pt-6 space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Если вы столкнулись со спором по направлению «{data.categoryLabel}» — главное сейчас:{" "}
                  <strong>не терять время</strong>. В таких делах быстро теряются доказательства, усложняются
                  переговоры и растут риски для вашей позиции.
                </p>
                <p>
                  Мы не обещаем невозможного. Но мы помогаем объяснить перспективы, обозначить реальные риски
                  и строим стратегию, которая работает именно в вашей ситуации.
                </p>
              </CardContent>
            </Card>

            <Accordion type="single" collapsible className="section__content mt-8 space-y-4">
              {accordionItems.map((item, index) => (
                <AccordionItem key={item.title} value={`sales-${index}`} className="border rounded-xl px-6">
                  <AccordionTrigger className="text-left hover:no-underline py-4">{item.title}</AccordionTrigger>
                  <AccordionContent className="pb-4">{item.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Экран 7: FAQ */}
        <section className="section bg-muted/30">
          <div className="container">
            <div className="section__header max-w-4xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">FAQ — Частые вопросы</h2>
            </div>
            <Accordion type="single" collapsible className="section__content space-y-4">
              {data.faqs.slice(0, 7).map((item, index) => (
                <AccordionItem key={item.question} value={`faq-${index}`} className="border rounded-xl px-6">
                  <AccordionTrigger className="text-left hover:no-underline py-4">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-8 text-center space-y-4">
              <p className="text-muted-foreground">Не нашли свой вопрос? Оставьте заявку и мы оценим вашу ситуацию</p>
              <Button size="lg" onClick={() => openQuickQuestionModal({ topic: data.heroTitle })}>
                Получить оценку перспектив
              </Button>
            </div>
          </div>
        </section>

        {/* Экран 8: Финальная форма */}
        <section className="section" id="final-cta">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Получите оценку перспектив по вашей ситуации</h2>
              <p className="text-muted-foreground">
                Оставьте контакты — адвокат свяжется и расскажет, как действовать дальше.
              </p>
            </div>
            <Card className="category-form-card max-w-3xl rounded-2xl border border-[#D8C08B] bg-[#F8F4EA] shadow-[0_16px_36px_rgba(60,52,31,0.1)]">
              <CardContent className="pt-6 md:pt-8">
                <LeadForm
                  formId="lead-final"
                  submitLabel="Оценить перспективы"
                  placeholder={`Например: «${data.heroBenefits[0] ?? "Нужна помощь по моей ситуации"}»`}
                  footerNote="Перезвоним в течение 15–20 минут в рабочее время"
                  topic={data.entry.title}
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Экран 9: Контакты */}
        <section className="section bg-muted/30">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Контакты</h2>
            </div>
            <div className="section__content grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-8">
              <div className="space-y-4">
                <Card className="border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Телефон</h3>
                        <a href={`tel:${SITE.phoneRaw}`} className="text-accent hover:underline">
                          {SITE.phone}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Почта</h3>
                        <a href={`mailto:${SITE.email}`} className="text-accent hover:underline">
                          {SITE.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Адрес</h3>
                        <p className="category-contact-address text-accent font-semibold">
                          {SITE.address.city}, {SITE.address.street}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="aspect-video rounded-xl border border-border overflow-hidden">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=244880896695"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Карта офиса Профзащита"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PhysCategoryLandingTemplate;
