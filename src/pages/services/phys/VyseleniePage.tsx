import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Star,
  Phone,
  Mail,
  MapPin,
  Home,
  Scale,
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
import { BreadcrumbSchema, FAQPageSchema, JsonLd } from "@/components/JsonLd";
import { toast } from "@/hooks/use-toast";
import { submitToWebhook } from "@/lib/webhook";
import { isPhoneValid, normalizePhone } from "@/lib/phone";
import { SITE } from "@/config/site";
import { sharedReviews } from "@/data/shared-reviews";
import { useQuickQuestionModal } from "@/components/QuickQuestionModalProvider";
import TelegramIcon from "@/components/icons/TelegramIcon";

import lawyerConsultationBg from "@/assets/legal/lawyer-consultation-bg.webp";
import ryzhenkoImg from "@/assets/team/ryzhenko.jpg";
import sotnikovImg from "@/assets/team/sotnikov.jpg";

type LeadFormProps = {
  formId: string;
  submitLabel: string;
  placeholder?: string;
  footerNote: string;
  onSuccess?: () => void;
};

const LeadForm = ({ formId, submitLabel, placeholder, footerNote, onSuccess }: LeadFormProps) => {
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
        topic: "Жилищные споры",
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

  return null;

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

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {submitLabel}
      </Button>

      <p className="text-small text-muted-foreground text-center">{footerNote}</p>
    </form>
  );
};

const VyseleniePage = () => {
  const { openQuickQuestionModal } = useQuickQuestionModal();
  const callHref = "tel:+74950040196";
  const canonical = new URL("/services/phys/vyselenie", SITE.url).toString();
  const yandexOrgId = "244880896695";

  const YandexRatingWidget = () => (
    <div className="mt-8 flex justify-center">
      <iframe
        src={`https://yandex.ru/sprav/widget/rating-badge/${yandexOrgId}?type=rating`}
        width="150"
        height="50"
        frameBorder="0"
        title="Рейтинг Профзащита в Яндекс.Картах"
        className="max-w-full"
      ></iframe>
    </div>
  );

  const trustItems = [
    "Конфиденциально",
    "15+ лет практики",
    "Работаем в Москве и Московской области",
    "200+ жилищных споров"
  ];

  const situations = [
    {
      title: "Выселение и снятие с регистрационного учета",
      description: "Проведем процесс законно и с сильной доказательной базой",
      icon: Home
    },
    {
      title: "Признание права пользования и собственности",
      description: "Защитим права на жилье, доли и законное проживание",
      icon: Scale
    },
    {
      title: "Споры с управляющей компанией, ТСЖ и ЖСК",
      description: "Добьемся исполнения обязанностей, перерасчетов и компенсаций",
      icon: Building2
    },
    {
      title: "Вселение и порядок пользования жилым помещением",
      description: "Закрепим понятный порядок проживания и доступ к жилью",
      icon: Users
    },
    {
      title: "Доли, раздел квартиры и споры с родственниками",
      description: "Защитим интересы по долям, соглашениям и праву собственности",
      icon: FileSearch
    },
    {
      title: "Перепланировки, заливы и ущерб",
      description: "Взыщем расходы, устраним нарушения и зафиксируем ответственность",
      icon: Shield
    },
    {
      title: "Оспаривание сделок и регистрационных действий",
      description: "Проверим документы и восстановим права на недвижимость",
      icon: Landmark
    },
    {
      title: "Другая ситуация — нужна помощь",
      description: "Разберем кейс и предложим план действий под вашу цель",
      icon: HelpCircle
    }
  ];

  const teamMembers = [
    {
      name: "Лядова Юлия Сергеевна",
      role: "Адвокат",
      experience: "Стаж 18 лет",
      profileUrl: "/team/yulia-lyadova",
      photo: "/images/team/lyadova-yuliya.jpg",
      specializations: ["Жилищные споры", "Имущественные споры", "Договорное право"],
      description: [
        "Сопровождает жилищные и имущественные споры: от признания права пользования до конфликтов по долям и регистрациям. Делает акцент на точной правовой позиции, доказательствах и стратегии, которая работает в суде и на переговорах.",
        "Ведет дела на досудебной стадии и в суде, готовит процессуальные документы, участвует в переговорах и добивается исполнения решений."
      ]
    },
    {
      name: "Рыженко Дмитрий Петрович",
      role: "Юрист",
      experience: "Стаж 23 года",
      profileUrl: "/team/ryzhenko",
      photo: ryzhenkoImg,
      specializations: ["Жилищные споры", "Договорное право", "Имущественные споры", "Взыскание задолженностей"],
      description: [
        "Глубоко погружается в документы и финансовую картину, чтобы построить доказательную базу и удержать позицию клиента в суде и на переговорах.",
        "Сопровождает претензионную работу, готовит документы и выстраивает стратегию взыскания и защиты интересов клиента."
      ]
    },
    {
      name: "Сотников Дмитрий Валерьевич",
      role: "Адвокат",
      experience: "Стаж 15 лет",
      profileUrl: "/team/sotnikov",
      photo: sotnikovImg,
      specializations: ["Имущественные споры", "Досудебные переговоры", "Медиация", "Защита интересов в судах"],
      description: [
        "Работает на стыке уголовного и гражданского права, помогает снизить риски и защищает интересы в сложных конфликтах.",
        "Ведет переговоры, готовит процессуальные документы и сопровождает клиентов на всех стадиях разбирательств."
      ]
    }
  ];

  const steps = [
    {
      title: "Диагностика ситуации",
      action: "Разбираем факты, документы на жилье, регистрации, позиции сторон и ключевые риски.",
      result: "Понимаете перспективы, слабые места и что важно сделать в первую очередь."
    },
    {
      title: "Стратегия и план действий",
      action: "Определяем правильный способ защиты права и последовательность шагов под вашу цель.",
      result: "Получаете понятный план и прогноз возможного результата."
    },
    {
      title: "Подготовка документов",
      action: "Готовим претензии, иски, заявления, запросы и доказательственную базу по делу.",
      result: "Документы соответствуют требованиям и усиливают позицию в суде и переговорах."
    },
    {
      title: "Досудебная работа",
      action: "Ведем переговоры, фиксируем позицию, направляем требования в УК/ТСЖ/другим сторонам.",
      result: "Шанс решить вопрос быстрее и на выгодных условиях без затяжных заседаний."
    },
    {
      title: "Судебное представительство",
      action: "Представляем интересы в суде, заявляем ходатайства, защищаем позицию на каждом этапе.",
      result: "Ваши права защищены профессионально и последовательно."
    },
    {
      title: "Исполнение решения",
      action: "Контролируем исполнение, работаем с приставами, регистрациями и оформлением итогов.",
      result: "Решение начинает работать в вашу пользу и закрепляется документально."
    }
  ];

  const faqItems = [
    {
      question: "Можно ли выселить человека без права собственности?",
      answer:
        "Зависит от оснований проживания. Если у человека нет законного права пользования и нет соглашений, вопрос можно решать через суд. Важно правильно выбрать способ защиты и собрать доказательства."
    },
    {
      question: "Как снять человека с регистрационного учета?",
      answer:
        "Снятие с регистрации возможно добровольно или через суд. Суд оценивает основания проживания, документы и фактические обстоятельства. Мы готовим позицию и сопровождаем процесс до результата."
    },
    {
      question: "Что делать, если управляющая компания не выполняет обязанности?",
      answer:
        "Нужно зафиксировать нарушения, направить претензию и при необходимости обращаться в суд или контролирующие органы. Чем лучше собраны документы и акты, тем сильнее позиция."
    },
    {
      question: "Как определить порядок пользования квартирой?",
      answer:
        "Порядок пользования можно установить соглашением или через суд. Суд учитывает доли, фактическое проживание и интересы сторон. Мы помогаем закрепить рабочий и исполнимый вариант."
    },
    {
      question: "Как взыскать ущерб после залива?",
      answer:
        "Важно быстро зафиксировать факт залива, ущерб и причину. Затем готовится претензия и расчет, а при отказе — иск. Мы сопровождаем весь путь: от актов до исполнения решения."
    },
    {
      question: "Можно ли оспорить сделки или доли в квартире?",
      answer:
        "Да, при наличии оснований: например, нарушение прав, давление, ошибки в оформлении или злоупотребления. Мы проверяем документы, оцениваем риски и предлагаем стратегию защиты."
    }
  ];

  const salesAccordion = [
    {
      title: "Что мы делаем",
      content: (
        <ul className="list-disc list-inside space-y-2 text-small text-muted-foreground">
          <li>Анализируем документы и факты по жилью</li>
          <li>Фиксируем позицию и выбираем правильный способ защиты права</li>
          <li>Готовим претензии, иски и доказательственную базу</li>
          <li>Ведем переговоры и сопровождаем в суде</li>
          <li>Контролируем исполнение решения</li>
        </ul>
      )
    },
    {
      title: "Когда лучше действовать — и почему сроки важны",
      content: (
        <p className="text-small text-muted-foreground leading-relaxed">
          В жилищных спорах важны сроки: можно пропустить исковую давность, потерять доказательства, а
          регистрационные и владельческие вопросы со временем усложняются. Чем раньше вы сформируете
          правовую позицию, тем больше вариантов защитить жилье и деньги.
        </p>
      )
    },
    {
      title: "Какие документы нужны",
      content: (
        <ul className="list-disc list-inside space-y-2 text-small text-muted-foreground">
          <li>Правоустанавливающие документы и выписки ЕГРН</li>
          <li>Договоры, соглашения, переписка и уведомления</li>
          <li>Квитанции, акты, экспертные заключения и расчеты</li>
          <li>Справки о регистрации, составе семьи и проживании</li>
        </ul>
      )
    },
    {
      title: "Сколько это стоит?",
      content: (
        <p className="text-small text-muted-foreground leading-relaxed">
          Стоимость зависит от сложности спора, объема документов и стадии процесса. После первичной
          оценки фиксируем объем работ и условия сотрудничества в договоре.
        </p>
      )
    },
    {
      title: "Типичные ошибки — и как их избежать",
      content: (
        <ul className="list-disc list-inside space-y-2 text-small text-muted-foreground">
          <li>Подача иска без доказательной базы</li>
          <li>Выбор неверного способа защиты права</li>
          <li>Игнорирование претензионного порядка, если он нужен</li>
          <li>Эмоциональные переговоры без фиксации позиций</li>
          <li>Затягивание и потеря времени на ключевых этапах</li>
        </ul>
      )
    },
    {
      title: "Что вы получаете?",
      content: (
        <ul className="list-disc list-inside space-y-2 text-small text-muted-foreground">
          <li>Понятный план действий и прогноз результата</li>
          <li>Системную защиту прав на жилье и имущество</li>
          <li>Профессиональные документы и сильную доказательную базу</li>
          <li>Контроль сроков, рисков и исполнения решений</li>
        </ul>
      )
    }
  ];

  const breadcrumbItems = [
    { name: "Главная", url: SITE.url },
    { name: "Услуги", url: new URL("/uslugi", SITE.url).toString() },
    { name: "Физлицам", url: new URL("/services/phys", SITE.url).toString() },
    { name: "Жилищные споры", url: canonical }
  ];

  const legalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${canonical}#service`,
    name: "Жилищные споры",
    serviceType: "Жилищные споры",
    url: canonical,
    inLanguage: "ru-RU",
    areaServed: SITE.areaServed,
    telephone: SITE.phone,
    email: SITE.email,
    provider: {
      "@type": "Organization",
      "@id": `${SITE.url}#organization`,
      name: SITE.name,
      url: SITE.url,
      telephone: SITE.phone,
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        addressCountry: SITE.address.country,
        addressLocality: SITE.address.city,
        streetAddress: SITE.address.street,
        postalCode: SITE.address.postal
      },
      areaServed: SITE.areaServed
    }
  };

  return (
    <div className="min-h-screen flex flex-col family-landing-page">
      <Helmet>
        <title>Жилищные споры — адвокаты по жилищным вопросам | Профзащита</title>
        <meta
          name="description"
          content="Жилищные споры: выселение, регистрация, доли, споры с УК и ТСЖ. Москва и МО. Оценим перспективы и предложим план действий."
        />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        <meta property="og:title" content="Жилищные споры — адвокаты по жилищным вопросам | Профзащита" />
        <meta
          property="og:description"
          content="Жилищные споры: выселение, регистрация, доли, споры с УК и ТСЖ. Москва и МО. Оценим перспективы и предложим план действий."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={SITE.ogImage} />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="Профзащита" />
      </Helmet>

      <JsonLd data={legalServiceSchema} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQPageSchema items={faqItems} url={canonical} />

      <Header />

      <main className="flex-1 services-page">
        {/* Экран 1: Hero */}
        <section
          className="relative text-white section section--hero"
          style={{
            backgroundImage: `url(${lawyerConsultationBg})`,
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
            <Breadcrumbs
              items={[
                { label: "Услуги", path: "/uslugi" },
                { label: "Физлицам", path: "/services/phys" },
                { label: "Жилищные споры" }
              ]}
            />
            <div className="max-w-4xl mt-6 space-y-5">
              <h1 className="font-serif text-h1-mobile md:text-h1 font-bold text-accent">
                Жилищные споры: защищаем ваши права на жилье и имущество
              </h1>
              <ul className="pl-6 list-disc space-y-2 text-white/90 text-base md:text-lg leading-relaxed marker:text-white/80">
                <li>Выселение и снятие с регистрационного учета</li>
                <li>Признание права пользования и собственности</li>
                <li>Споры с управляющей компанией, ТСЖ и ЖСК</li>
                <li>Вселение и порядок пользования жилым помещением</li>
                <li>Доли, раздел квартиры и споры с родственниками</li>
                <li>Перепланировки, заливы, ущерб и взыскание расходов</li>
              </ul>
              <p className="lead text-white/90">
                Оценим перспективы, риски и предложим понятный план действий по вашей ситуации.
              </p>
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-accent text-primary shadow-[0_8px_18px_rgba(201,162,39,0.35)] hover:bg-[#c09a23] active:bg-[#a9851d] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary/40"
              >
                <a href={callHref}>Получить консультацию</a>
              </Button>
              <div className="flex flex-wrap items-center gap-y-2 text-small text-white/75 lg:flex-nowrap lg:whitespace-nowrap">
                {trustItems.map((item, index) => (
                  <span
                    key={item}
                    className={`flex items-center ${
                      index > 0 ? "before:content-['•'] before:mx-2 before:text-white/50" : ""
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Экран 2: Ситуации */}
        <section className="section">
          <div className="container">
            <div className="section__header max-w-3xl mx-auto text-center pt-2 md:pt-4 mb-6 md:mb-7">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                Помогаем в любых жилищных вопросах
              </h2>
              <p className="text-muted-foreground">Выберите вашу ситуацию — подскажем, как действовать:</p>
            </div>
            <div className="section__content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
              {situations.map((card) => {
                const Icon = card.icon;
                return (
                  <Card
                    key={card.title}
                    className="h-full rounded-[12px] border border-[#D8C08B] bg-[#F6F1E6] shadow-[0_8px_20px_rgba(60,52,31,0.08)]"
                  >
                    <CardContent className="p-5 md:p-6 pt-5 md:pt-6 h-full flex flex-col items-center text-center gap-3">
                      <Icon className="h-12 w-12 text-[#111827]" strokeWidth={2} />
                      <h3 className="font-semibold text-[16px] md:text-[17px] text-slate-900">{card.title}</h3>
                      <p className="text-[13px] md:text-[14px] text-slate-600 leading-relaxed flex-1">
                        {card.description}
                      </p>
                      <Button
                        asChild
                        size="lg"
                        className="mt-2 h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] px-6 text-[14px] text-slate-900 shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f] hover:shadow-[0_4px_12px_rgba(111,83,15,0.2)]"
                      >
                        <a href={callHref}>Получить консультацию</a>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="mt-7 md:mt-8 rounded-[12px] border border-[#D8C08B] bg-[#F7F2E8] p-6 text-center shadow-[0_6px_16px_rgba(60,52,31,0.08)]">
              <p className="font-semibold text-body-mobile md:text-body text-slate-900">
                Каждая неделя без четкой позиции — это риск потерять жилье, регистрацию или деньги.
              </p>
              <p className="mt-2 text-[14px] md:text-[15px] text-slate-600 font-medium">
                В жилищных спорах позднее обращение часто ослабляет позицию и усложняет доказательства.
              </p>
            </div>
          </div>
        </section>

        {/* Экран 3: Команда */}
        <section className="section bg-muted/30">
          <div className="container">
            <div className="section__header max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Кто ведет ваши дела</h2>
              <p className="text-muted-foreground">
                Вашим делом занимаются практикующие адвокаты с опытом в жилищных и имущественных спорах
              </p>
            </div>
            <div className="section__content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {teamMembers.map((member) => (
                <Card
                  key={member.name}
                  className="h-full rounded-[12px] border border-[#C9A227] bg-white shadow-[0_8px_20px_rgba(60,52,31,0.08)]"
                >
                  <CardContent className="p-6 h-full flex flex-col items-center text-center">
                    <div className="flex w-full flex-col items-center text-center gap-4">
                      <div className="w-full overflow-hidden rounded-[10px] border border-[#E6DDCC] bg-white">
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="h-[320px] w-full object-cover object-center md:h-[340px] lg:h-[360px]"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="font-semibold text-[16px] md:text-[18px] text-slate-900">{member.name}</h3>
                      <span className="inline-flex items-center rounded-full bg-[#C9A227] px-4 py-1 text-[12px] font-semibold text-slate-900">
                        {member.role}
                      </span>
                      <div className="text-[13px] font-semibold text-slate-800">{member.experience}</div>
                      <div className="w-full">
                        <div className="text-[12px] font-semibold text-slate-700">Специализации:</div>
                        <ul className="mt-2 space-y-1 text-[13px] text-slate-700 list-disc list-inside text-center">
                          {member.specializations.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-[13px] text-slate-600 leading-relaxed space-y-2">
                        {member.description.map((paragraph, index) => (
                          <p key={`${member.name}-${index}`}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                    <div className="mt-auto w-full pt-5 flex justify-center">
                      <Button
                        asChild
                        size="lg"
                        className="w-full md:w-auto h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] text-[14px] text-slate-900 shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f] hover:shadow-[0_4px_12px_rgba(111,83,15,0.2)]"
                      >
                        <Link to={member.profileUrl}>Подробнее об адвокате</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="mt-8 text-center text-small text-muted-foreground">
              Сопровождение осуществляется командой специалистов. В зависимости от ситуации к сопровождению
              подключаются профильные специалисты.
            </p>
          </div>
        </section>

        {/* Экран 4: Этапы работы */}
        <section className="section">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                Как мы работаем: 6 этапов, чтобы защитить ваши права на жилье с минимальными потерями
              </h2>
            </div>
            <div className="section__content mx-auto w-full max-w-4xl">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="flex flex-col gap-4 border-b border-slate-200 py-6 last:border-b-0 sm:flex-row sm:gap-6"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-slate-50 text-lg font-semibold text-accent">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="font-semibold text-body-mobile md:text-body text-slate-900">{step.title}</h3>
                    <div>
                      <div className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">Что мы делаем</div>
                      <p className="text-small leading-relaxed text-muted-foreground">{step.action}</p>
                    </div>
                    <div>
                      <div className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">Результат для вас</div>
                      <p className="text-small leading-relaxed text-muted-foreground">{step.result}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="rounded-[12px] border border-[#D8C08B] bg-[#F6F1E6] shadow-[0_8px_20px_rgba(60,52,31,0.08)]">
                <CardContent className="p-6 text-center">
                  <p className="text-body-mobile md:text-body text-slate-900">
                    Если дело уже в суде — подключимся сразу. Проанализируем материалы, укажем, что можно усилить, и
                    начнем действовать.
                  </p>
                </CardContent>
              </Card>
              <Card className="rounded-[12px] border border-[#D8C08B] bg-[#F6F1E6] shadow-[0_8px_20px_rgba(60,52,31,0.08)]">
                <CardContent className="p-6 text-center">
                  <p className="text-body-mobile md:text-body text-slate-900">
                    Если еще не дошло до суда — подготовим сильную позицию заранее. Часто этого достаточно, чтобы
                    решить вопрос без заседаний.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8 flex flex-col items-center gap-3 text-center">
              <Button
                size="lg"
                className="w-full sm:w-[360px] h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] text-[14px] text-slate-900 shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f] hover:shadow-[0_4px_12px_rgba(111,83,15,0.2)]"
                onClick={() => openQuickQuestionModal({ topic: "Жилищные споры" })}
              >
                Получить индивидуальный план действий
              </Button>
              <p className="text-small text-slate-600">
                Мы проанализируем вашу ситуацию и покажем, как действовать дальше — без обязательств
              </p>
            </div>
          </div>
        </section>

        {/* Экран 5: Отзывы */}
        <section className="section bg-muted/30">
          <div className="container">
            <div>
              <div className="section__header max-w-3xl">
                <h3 className="font-serif text-h3-mobile md:text-h3 font-semibold">Отзывы клиентов</h3>
              </div>
              <div className="section__content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sharedReviews.slice(0, 6).map((review) => (
                  <Card key={review.id} className="h-full">
                    <CardContent className="pt-6 h-full flex flex-col">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-1 text-accent">
                          {Array.from({ length: review.rating }).map((_, index) => (
                            <Star key={`${review.id}-${index}`} className="h-4 w-4 fill-current" />
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
              <YandexRatingWidget />
            </div>
          </div>
        </section>

        {/* Экран 6: Большой продающий блок + аккордеон */}
        <section className="section">
          <div className="container">
            <div className="section__header max-w-4xl !mb-4 md:!mb-5">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                Жилищные споры: как защитить права на жилье и получить справедливый результат — без лишнего стресса?
              </h2>
            </div>
            <Card className="border-border">
              <CardContent className="pt-6 space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Если вы столкнулись с жилищным спором — главное сейчас: <strong>не терять время</strong>. В таких
                  делах быстро теряются доказательства, усложняются регистрационные вопросы и растут риски по жилью и
                  расходам.
                </p>
                <p>
                  Мы не обещаем невозможного. Но мы помогаем понять перспективы, обозначить реальные риски и строим
                  стратегию, которая работает именно в вашей ситуации.
                </p>
              </CardContent>
            </Card>

            <Accordion type="single" collapsible className="section__content mt-8 space-y-4">
              {salesAccordion.map((item, index) => (
                <AccordionItem
                  key={item.title}
                  value={`sales-${index}`}
                  className="relative overflow-hidden rounded-xl border border-slate-200 px-6 transition-all hover:border-[#C9A227]/80 data-[state=open]:border-[#C9A227] before:absolute before:inset-y-3 before:left-0 before:w-1 before:rounded-full before:bg-transparent before:content-[''] before:transition-colors hover:before:bg-[#C9A227]/70 data-[state=open]:before:bg-[#C9A227]"
                >
                  <AccordionTrigger className="family-accordion-trigger py-4 text-left hover:no-underline hover:text-slate-900 data-[state=open]:text-[#b8911f]">
                    {item.title}
                  </AccordionTrigger>
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
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                FAQ — Частые вопросы о жилищных спорах
              </h2>
            </div>
            <Accordion type="single" collapsible className="section__content space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  value={`faq-${index}`}
                  className="relative overflow-hidden rounded-xl border border-slate-200 px-6 transition-all hover:border-[#C9A227]/80 data-[state=open]:border-[#C9A227] before:absolute before:inset-y-3 before:left-0 before:w-1 before:rounded-full before:bg-transparent before:content-[''] before:transition-colors hover:before:bg-[#C9A227]/70 data-[state=open]:before:bg-[#C9A227]"
                >
                  <AccordionTrigger className="family-accordion-trigger py-4 text-left hover:no-underline hover:text-slate-900 data-[state=open]:text-[#b8911f]">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-8 text-center space-y-4">
              <p className="text-muted-foreground">
                Не нашли свой вопрос? Позвоните нам — подскажем, как действовать дальше.
              </p>
              <Button
                size="lg"
                className="w-full sm:w-auto border border-[#b8911f] bg-accent text-primary shadow-[0_8px_18px_rgba(201,162,39,0.35)] hover:border-[#a8831a] hover:bg-[#c09a23] active:bg-[#a9851d] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                onClick={() => openQuickQuestionModal({ topic: "Жилищные споры" })}
              >
                Получить оценку перспектив
              </Button>
            </div>
          </div>
        </section>

        {/* Экран 8: Финальная форма */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_520px] lg:items-start lg:gap-14">
              <div className="max-w-2xl space-y-6">
                <div className="section__header max-w-2xl !mb-0">
                  <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                    Получите оценку перспектив по жилищному спору
                  </h2>
                  <p className="text-muted-foreground">
                    Позвоните нам — адвокат по жилищным вопросам расскажет, как действовать дальше.
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-small font-semibold text-slate-900">Или напишите нам напрямую:</p>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://t.me/profzashita_consult_bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Написать в Telegram"
                      className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#229ED9] text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#1d8fc6] md:h-[56px] md:w-[56px]"
                    >
                      <TelegramIcon
                        size={30}
                        className="h-[30px] w-[30px] translate-y-[-1px]"
                      />
                    </a>
                    <a
                      href={`mailto:${SITE.email}`}
                      aria-label="Написать на email"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-accent shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#C9A227] hover:text-[#b8911f] md:h-14 md:w-14"
                    >
                      <Mail className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
              <Card className="w-full rounded-[16px] border border-[#E5E7EB] bg-[#F8FAFC] shadow-[0_18px_40px_rgba(15,23,42,0.08)] lg:max-w-[520px] lg:justify-self-end">
                <CardContent className="p-7 md:p-8">
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">Телефон для консультации:</div>
                    <a href={`tel:${SITE.phoneRaw}`} className="text-[18px] font-semibold text-slate-900 hover:text-accent">
                      {SITE.phone}
                    </a>
                    <Button
                      asChild
                      size="lg"
                      className="h-12 w-full rounded-[12px] border border-[#b8911f] bg-[#C9A227] text-[14px] text-white shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f] hover:shadow-[0_4px_12px_rgba(111,83,15,0.2)]"
                    >
                      <a href={`tel:${SITE.phoneRaw}`}>Свяжитесь с нами</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
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
                        <h3 className="font-normal mb-1">Адрес</h3>
                        <p className="text-accent font-normal">
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

export default VyseleniePage;
