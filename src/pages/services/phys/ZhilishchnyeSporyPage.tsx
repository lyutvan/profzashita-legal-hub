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
import { teamMembers as allTeamMembers } from "@/data/team";
import TelegramIcon from "@/components/icons/TelegramIcon";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import MaxIcon from "@/components/icons/MaxIcon";
import { useQuickQuestionModal } from "@/components/QuickQuestionModalProvider";

import lawyerConsultationBg from "@/assets/legal/lawyer-consultation-bg.webp";

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

const ZhilishchnyeSporyPage = () => {
  const { openQuickQuestionModal } = useQuickQuestionModal();
  const contactsHref = "/kontakty";
  const whatsappUrl = "https://wa.me/74950040196";
  const canonical = new URL("/services/phys/vyselenie", SITE.url).toString();

  const trustItems = [
    "Конфиденциально",
    "15+ лет практики",
    "Работаем в Москве и Московской области",
    "Системная работа с документами и доказательствами",
    "Фиксируем объём работ по договору"
  ];

  const popularServices = [
    { title: "Выселение", description: "Законно оформим выселение и закрепим результат", href: "/services/phys/vyselenie", icon: Home },
    {
      title: "Снятие с регистрационного учёта",
      description: "Поможем снять с регистрации через переговоры или суд",
      href: "/services/phys/snyatie-s-registracionnogo-ucheta",
      icon: FileSearch
    },
    {
      title: "Вселение",
      description: "Защитим право на вселение и проживание в жилом помещении",
      href: "/services/phys/spory-socnajem",
      icon: Users
    },
    {
      title: "Порядок пользования квартирой",
      description: "Закрепим понятные правила проживания и использования жилья",
      href: "/services/phys/poryadok-polzovaniya-zhilym-pomeshcheniem",
      icon: Scale
    },
    {
      title: "Споры с управляющей компанией",
      description: "Добьёмся исполнения обязанностей, перерасчётов и качества услуг",
      href: "/services/phys/spory-s-uk-tszh",
      icon: Building2
    },
    {
      title: "Залив квартиры / взыскание ущерба",
      description: "Зафиксируем ущерб и добьёмся компенсации расходов",
      href: "/services/phys/zaliv-kvartiry",
      icon: Shield
    },
    {
      title: "Перепланировки и споры по документам",
      description: "Проверим документы и выстроим безопасную правовую позицию",
      href: "/services/phys/osparivanie-privatizacii",
      icon: Landmark
    },
    {
      title: "Другая ситуация — нужна помощь",
      description: "Разберём и подскажем, как действовать",
      href: "/services/phys/vyselenie",
      icon: HelpCircle
    },
    {
      title: "Перепланировки и споры по документам",
      description: "Проверим документы и выстроим безопасную правовую позицию",
      href: "/services/phys/osparivanie-privatizacii",
      icon: Landmark
    },
    {
      title: "Взыскание ущерба",
      description: "Взыщем расходы на восстановление и стоимость повреждённого имущества",
      href: "/services/phys/vozmeshchenie-ushcherba",
      icon: Scale
    },
    {
      title: "Оценка и экспертиза",
      description: "Поможем с доказательствами, расчётами и судебной экспертизой",
      href: "/services/phys/vozmeshchenie-ushcherba",
      icon: Shield
    },
    {
      title: "Претензия и иск",
      description: "Подготовим сильные документы и выстроим стратегию взыскания",
      href: "/services/phys/vozmeshchenie-ushcherba",
      icon: FileSearch
    },
    {
      title: "Судебная защита под ключ",
      description: "Берём на себя переговоры, документы, суд и исполнение решения",
      href: "/services/phys/ispolnitelnoe-proizvodstvo",
      icon: Landmark
    },
    {
      title: "Переговоры и досудебное урегулирование",
      description: "Часто сильная позиция позволяет решить вопрос без заседаний",
      href: "/services/phys/vozmeshchenie-ushcherba",
      icon: Users
    },
    {
      title: "Другая ситуация — нужна помощь",
      description: "Разберём кейс и подскажем, как действовать дальше",
      href: "/services/phys/zhilishchnye-spory",
      icon: HelpCircle
    }
  ]
    .filter((item, index, arr) => arr.findIndex((entry) => entry.title === item.title) === index)
    .slice(0, 8);

  type PageTeamMember = {
    name: string;
    role: string;
    experience: string;
    profileUrl: string;
    photo: string;
    specializations: string[];
    description: string[];
  };

  const buildTeamMember = (slug: string): PageTeamMember | null => {
    const member = allTeamMembers.find((item) => item.slug === slug);
    if (!member) return null;
    const description = member.about
      ? member.about.split("\n\n").filter(Boolean).slice(0, 2)
      : (member.competencies ?? []).slice(0, 2);
    const safeDescription =
      description.length > 0 ? description : (member.specializations ?? []).slice(0, 2);
    return {
      name: member.name,
      role: member.role,
      experience: member.experienceText ?? "",
      profileUrl: `/team/${member.slug}`,
      photo: member.photo,
      specializations: (member.specializations ?? []).slice(0, 4),
      description: safeDescription
    };
  };

  const baseLyadova = buildTeamMember("yulia-lyadova");
  const baseRyzhenko = buildTeamMember("ryzhenko");
  const baseSotnikov = buildTeamMember("sotnikov");

  const teamMembers = [
    baseLyadova && {
      ...baseLyadova,
      specializations: [
        "Выселение и снятие с регистрационного учета",
        "Признание права пользования",
        "Споры по долям и раздел жилья",
        "Имущественные споры"
      ]
    },
    baseRyzhenko && {
      ...baseRyzhenko,
      specializations: [
        "Порядок пользования жилым помещением",
        "Споры с УК/ТСЖ/ЖСК",
        "Взыскание ущерба по жилью",
        "Досудебные переговоры"
      ]
    },
    baseSotnikov && {
      ...baseSotnikov,
      specializations: [
        "Оспаривание сделок с жильем",
        "Защита права собственности",
        "Судебное сопровождение",
        "Переговоры и медиация"
      ]
    }
  ].filter(Boolean) as PageTeamMember[];

  const steps = [
    {
      title: "Диагностика ситуации",
      action: "Разбираем факты, документы на жильё, регистрации, позиции сторон и ключевые риски.",
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
      action: "Ведём переговоры, фиксируем позицию, направляем требования в УК, ТСЖ и другим сторонам.",
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
        "Да, если у человека нет законного права пользования жильём. Важно правильно определить основание, способ защиты и собрать доказательства до подачи иска."
    },
    {
      question: "Как снять человека с регистрационного учёта?",
      answer:
        "Снятие с регистрации возможно добровольно или через суд. Суд оценивает основания проживания, документы и фактические обстоятельства. Мы помогаем подготовить позицию и пройти процесс до результата."
    },
    {
      question: "Как определить порядок пользования квартирой?",
      answer:
        "Порядок пользования можно закрепить соглашением или через суд. Суд учитывает доли, фактическое проживание и интересы сторон. Важно предложить рабочий и исполнимый вариант."
    },
    {
      question: "Что делать, если управляющая компания не выполняет обязанности?",
      answer:
        "Нужно зафиксировать нарушения, направить претензию и при необходимости обращаться в суд или контролирующие органы. Чем лучше собраны документы и акты, тем сильнее позиция."
    },
    {
      question: "Как взыскать ущерб после залива квартиры?",
      answer:
        "Сначала фиксируем факт залива, причину и ущерб, затем готовим претензию и расчёт. При отказе — подаём иск и сопровождаем дело до исполнения решения."
    },
    {
      question: "Можно ли оспорить сделки или доли в квартире?",
      answer:
        "Да, при наличии оснований: нарушение прав, давление, ошибки в оформлении или злоупотребления. Мы проверяем документы, оцениваем риски и предлагаем стратегию защиты."
    },
    {
      question: "Нужно ли лично присутствовать в суде?",
      answer:
        "Не всегда. Во многих случаях мы можем представлять ваши интересы по доверенности, а вы подключаетесь только когда это действительно необходимо."
    },
    {
      question: "Что делать сразу после залива квартиры?",
      answer:
        "Важно зафиксировать факт залива и ущерб: вызвать представителей УК, составить акт, сделать фото и видео, собрать документы и контакты свидетелей. Чем быстрее вы это сделаете, тем сильнее будет позиция."
    },
    {
      question: "Можно ли взыскать стоимость ремонта и повреждённого имущества?",
      answer:
        "Да, при правильно собранной доказательной базе и расчётах. Мы помогаем подтвердить размер ущерба, подготовить претензию и при необходимости подать иск."
    },
    {
      question: "Обязательна ли экспертиза?",
      answer:
        "Не всегда, но в спорных ситуациях экспертиза часто становится ключевым доказательством. Мы помогаем определить, когда она действительно нужна, и как использовать её правильно."
    },
    {
      question: "Кто отвечает за ущерб: сосед, УК или подрядчик?",
      answer:
        "Ответственность зависит от причины ущерба и документов. Мы анализируем ситуацию, определяем ответственных лиц и выстраиваем стратегию взыскания."
    },
    {
      question: "Что делать, если виновная сторона игнорирует претензию?",
      answer:
        "Тогда мы переходим к судебной защите: готовим иск, усиливаем доказательства и сопровождаем дело до исполнения решения."
    }
  ];

  const salesAccordion = [
    {
      title: "Что мы делаем",
      content: (
        <p className="text-small text-muted-foreground leading-relaxed">
          Анализируем документы, фиксируем позицию, готовим претензии и иски, ведём переговоры и
          представляем ваши интересы в суде на каждом этапе.
        </p>
      )
    },
    {
      title: "Когда лучше действовать — и почему сроки важны",
      content: (
        <p className="text-small text-muted-foreground leading-relaxed">
          В жилищных спорах важны сроки: можно пропустить исковую давность, потерять доказательства,
          а регистрационные и владельческие вопросы со временем усложняются. Чем раньше вы формируете
          позицию, тем больше вариантов для сильного результата.
        </p>
      )
    },
    {
      title: "Какие документы нужны",
      content: (
        <p className="text-small text-muted-foreground leading-relaxed">
          Правоустанавливающие документы, выписки ЕГРН, договоры, переписка, квитанции, акты,
          справки о регистрации и другие материалы, которые подтверждают вашу позицию.
        </p>
      )
    },
    {
      title: "Сколько это стоит?",
      content: (
        <p className="text-small text-muted-foreground leading-relaxed">
          Стоимость зависит от сложности и объёма работы. После первичной оценки фиксируем объём
          работ и условия сотрудничества в договоре.
        </p>
      )
    },
    {
      title: "Типичные ошибки — и как их избежать",
      content: (
        <p className="text-small text-muted-foreground leading-relaxed">
          Подача иска без доказательной базы, неверный способ защиты права, игнорирование
          претензионного порядка (если он нужен) и эмоциональные переговоры без фиксации позиций
          часто ослабляют дело. Мы строим стратегию так, чтобы эти риски были под контролем.
        </p>
      )
    },
    {
      title: "Что вы получаете?",
      content: (
        <p className="text-small text-muted-foreground leading-relaxed">
          Понятный план действий, сильную правовую позицию, подготовленные документы и сопровождение
          до результата — включая переговоры, суд и исполнение решения.
        </p>
      )
    }
  ];

  const breadcrumbItems = [
    { name: "Главная", url: SITE.url },
    { name: "Услуги", url: new URL("/uslugi", SITE.url).toString() },
    { name: "Физлицам", url: new URL("/services/phys", SITE.url).toString() },
    { name: "Жилищные споры и ущерб имуществу", url: canonical }
  ];

  const legalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${canonical}#service`,
    name: "Жилищные споры и ущерб имуществу",
    serviceType: "Жилищные споры и ущерб имуществу",
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

  const reviews = sharedReviews.slice(0, 6);
  const yandexOrgId = "244880896695";

  const YandexRatingWidget = () => (
    <div className="mt-6 flex justify-center">
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

  return (
    <div className="min-h-screen flex flex-col family-landing-page">
      <Helmet>
        <title>Жилищные споры и ущерб имуществу — адвокаты по жилищным вопросам | Профзащита</title>
        <meta
          name="description"
          content="Жилищные споры и ущерб имуществу: защита прав на жильё, собственность и регистрацию, взыскание ущерба. Москва и МО. Оценим перспективы и предложим понятный план действий."
        />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        <meta property="og:title" content="Жилищные споры и ущерб имуществу — адвокаты по жилищным вопросам | Профзащита" />
        <meta
          property="og:description"
          content="Жилищные споры и ущерб имуществу: защита прав на жильё, собственность и регистрацию, взыскание ущерба. Москва и МО. Оценим перспективы и предложим понятный план действий."
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
                Жилищные споры и ущерб имуществу
              </h1>
              <ul className="pl-6 list-disc space-y-2 text-white/90 text-base md:text-lg leading-relaxed marker:text-white/80">
                <li>Выселение и снятие с регистрационного учёта</li>
                <li>Вселение и порядок пользования жилым помещением</li>
                <li>Признание права пользования и собственности</li>
                <li>Доли, раздел квартиры и споры между родственниками</li>
                <li>Споры с УК, ТСЖ и ЖСК, начисления и качество услуг</li>
                <li>Залив квартиры, ущерб и взыскание расходов</li>
                <li>Перепланировки и споры по документам</li>
                <li>Судебная защита и исполнительное производство</li>
              </ul>
              <p className="lead text-white/90">
                Помогаем защитить права на жильё, собственность и регистрацию, а также взыскать ущерб и расходы на
                восстановление имущества. Оценим перспективы и предложим понятный план действий.
              </p>
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-accent text-primary shadow-[0_8px_18px_rgba(201,162,39,0.35)] hover:bg-[#c09a23] active:bg-[#a9851d] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary/40"
              >
                <Link to={contactsHref}>Получить консультацию</Link>
              </Button>
              <div className="flex flex-nowrap items-center gap-y-2 text-small text-white/75 overflow-x-auto md:overflow-visible">
                {trustItems.map((item, index) => (
                  <span
                    key={item}
                    className={`flex items-center whitespace-nowrap ${
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

        {/* Экран 2: Популярные услуги */}
        <section className="section">
          <div className="container">
            <div className="section__header max-w-3xl mx-auto text-center pt-2 md:pt-4 mb-6 md:mb-7">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Популярные услуги в категории</h2>
              <p className="text-muted-foreground">Выберите вашу ситуацию — подскажем, как действовать:</p>
            </div>
            <div className="section__content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
              {popularServices.map((card) => {
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
                        <Link to={contactsHref}>Получить консультацию</Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="mt-7 md:mt-8 rounded-[12px] border border-[#D8C08B] bg-[#F7F2E8] p-6 text-center shadow-[0_6px_16px_rgba(60,52,31,0.08)]">
              <p className="font-semibold text-body-mobile md:text-body text-slate-900">
                Каждая неделя без чёткой позиции — это риск потерять жильё, регистрацию или деньги.
              </p>
              <p className="mt-2 text-[14px] md:text-[15px] text-slate-600 font-medium">
                Чем раньше вы фиксируете факты и стратегию, тем выше шанс решить вопрос в вашу пользу.
              </p>
            </div>
          </div>
        </section>

        {/* Экран 3: Команда */}
        <section className="section bg-muted/30">
          <div className="container">
            <div className="section__header max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Кто ведёт ваши дела</h2>
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
                Как мы работаем: 6 этапов, чтобы защитить ваши права на жильё с минимальными потерями
              </h2>
            </div>
            <div className="section__content">
              <div className="divide-y divide-border/80 rounded-2xl border border-border/80 bg-white/90 shadow-[0_12px_28px_rgba(15,23,42,0.06)] overflow-hidden">
                {steps.map((step, index) => (
                  <div key={step.title} className="flex gap-4 md:gap-6 px-4 md:px-6 py-5 md:py-6">
                    <div className="h-11 w-11 md:h-12 md:w-12 shrink-0 rounded-full border border-accent/40 bg-accent/10 text-accent flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1 space-y-3">
                      <h3 className="font-semibold text-body-mobile md:text-body text-slate-900">{step.title}</h3>
                      <div>
                        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Что мы делаем</div>
                        <p className="text-small text-muted-foreground leading-relaxed">{step.action}</p>
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Результат для вас</div>
                        <p className="text-small text-muted-foreground leading-relaxed">{step.result}</p>
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
                    Если дело уже в суде — подключимся сразу. Проанализируем материалы, укажем, что можно усилить, и
                    начнём действовать.
                  </p>
                </CardContent>
              </Card>
              <Card className="rounded-[12px] border border-[#D8C08B] bg-[#F6F1E6] shadow-[0_8px_20px_rgba(60,52,31,0.08)]">
                <CardContent className="p-6 text-center">
                  <p className="text-body-mobile md:text-body text-slate-900">
                    Если ещё не дошло до суда — подготовим сильную позицию заранее. Часто этого достаточно, чтобы
                    решить вопрос без заседаний.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8 flex flex-col items-center gap-3 text-center">
              <Button
                size="lg"
                className="w-full sm:w-[360px] h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] text-[14px] text-slate-900 shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f] hover:shadow-[0_4px_12px_rgba(111,83,15,0.2)]"
                onClick={() => openQuickQuestionModal({ topic: "Жилищные споры", forceForm: true })}
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
              <div className="section__header max-w-3xl text-center mx-auto">
                <h3 className="font-serif text-h3-mobile md:text-h3 font-semibold">Отзывы клиентов</h3>
              </div>
              <YandexRatingWidget />
              <div className="section__content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {reviews.map((review) => (
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
              <div className="flex justify-center mt-8">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-accent text-primary shadow-[0_8px_18px_rgba(201,162,39,0.35)] hover:bg-[#c09a23] active:bg-[#a9851d] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  <Link to={contactsHref}>Обсудить с адвокатом свою ситуацию</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Экран 6: Большой продающий блок + аккордеон */}
        <section className="section">
          <div className="container">
            <div className="section__header max-w-4xl !mb-4 md:!mb-5">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                Жилищные споры: как получить справедливый результат — без потерь и лишнего стресса?
              </h2>
            </div>
            <Card className="border-border">
              <CardContent className="pt-6 space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  В жилищных спорах время почти всегда работает против того, кто откладывает решения. Чем дольше нет
                  чёткой позиции, тем выше риск потерять доказательства, усилить конфликт и усложнить путь к результату.
                </p>
                <p>
                  Мы не обещаем невозможного, но помогаем быстро понять перспективы, обозначить реальные риски и
                  выстроить стратегию, которая работает именно в вашей ситуации.
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
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">FAQ — Частые вопросы о жилищных спорах</h2>
            </div>
            <Accordion type="single" collapsible className="section__content space-y-4">
              {faqItems.slice(0, 6).map((item, index) => (
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
                asChild
                size="lg"
                className="w-full sm:w-auto bg-accent text-primary shadow-[0_8px_18px_rgba(201,162,39,0.35)] hover:bg-[#c09a23] active:bg-[#a9851d] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Link to={contactsHref}>Получить оценку перспектив</Link>
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
                    Получите оценку перспектив по вашей ситуации
                  </h2>
                  <p className="text-muted-foreground">
                    Позвоните нам — адвокат по жилищным спорам расскажет, как действовать дальше.
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
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Написать в WhatsApp"
                      className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-90 md:h-[56px] md:w-[56px]"
                    >
                      <WhatsAppIcon size={56} className="h-[52px] w-[52px] md:h-[56px] md:w-[56px]" />
                    </a>
                    <button
                      type="button"
                      aria-label="MAX"
                      className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-90 md:h-[56px] md:w-[56px]"
                    >
                      <MaxIcon size={56} className="h-[52px] w-[52px] md:h-[56px] md:w-[56px]" />
                    </button>
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
                      <Link to={contactsHref}>Свяжитесь с нами</Link>
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

export default ZhilishchnyeSporyPage;
