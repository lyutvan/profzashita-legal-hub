import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Star,
  Phone,
  Mail,
  MapPin,
  HeartHandshake,
  House,
  HandCoins,
  Users,
  MessageCircle,
  Shield,
  FileSearch,
  HelpCircle
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
import { cases as casesData } from "@/data/cases";
import { teamMembers as allTeamMembers } from "@/data/team";
import { useLocation } from "react-router-dom";
import { useQuickQuestionModal } from "@/components/QuickQuestionModalProvider";
import TelegramIcon from "@/components/icons/TelegramIcon";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import MaxIcon from "@/components/icons/MaxIcon";

import lawyerConsultationBg from "@/assets/legal/lawyer-consultation-bg.webp";

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
        topic: "Расторжение брака и раздел имущества",
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
    <form onSubmit={handleSubmit} className="space-y-5">
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
        className="h-12 w-full rounded-[12px] border border-[#b8911f] bg-[#C9A227] text-[15px] font-semibold text-slate-900 shadow-[0_6px_16px_rgba(111,83,15,0.28)] hover:border-[#a8831a] hover:bg-[#b8911f]"
        disabled={isSubmitting}
      >
        {submitLabel}
      </Button>

      <p className="text-small text-muted-foreground text-center">{footerNote}</p>
    </form>
  );
};

const RastorzhenieBrakaRazdelImushchestvaPage = () => {
  const { openQuickQuestionModal } = useQuickQuestionModal();
  const callHref = "tel:+74950040196";
  const contactsHref = "/kontakty";
  const whatsappUrl = "https://wa.me/74950040196";
  const location = useLocation();
  const isFamilyCategory = location.pathname.includes("/services/phys/semeynye-spory");
  const pageBreadcrumbLabel = isFamilyCategory ? "Семейные споры" : "Расторжение брака и раздел имущества";
  const canonical = new URL("/services/phys/razvod-razdel-imushchestva", SITE.url).toString();

  const trustItems = [
    { id: "confidential", label: "Конфиденциально" },
    { id: "experience", label: "15+ лет практики" },
    { id: "region", label: "Работаем в Москве и Московской области" },
    {
      id: "cases",
      label: "150+ дел по расторжению брака и разделу имущества"
    }
  ];

  const situations = [
    {
      title: "Расторжение брака без лишних нервов",
      description: "Подготовим документы, представим интересы в суде",
      icon: HeartHandshake
    },
    {
      title: "Раздел совместно нажитого имущества",
      description: "Защитим ваши права на квартиру, автомобиль и сбережения",
      icon: House
    },
    {
      title: "Взыскание алиментов",
      description: "Поможем получить долг и установить выплаты через суд",
      icon: HandCoins
    },
    {
      title: "Определение места жительства ребенка",
      description: "Разберем, как законно оформить проживание ребенка",
      icon: Users
    },
    {
      title: "Определение порядка общения с ребенком",
      description: "Поможем установить законный порядок встреч с учетом интересов ребенка",
      icon: MessageCircle
    },
    {
      title: "Ограничение или лишение родительских прав",
      description: "Действуем в интересах ребенка",
      icon: Shield
    },
    {
      title: "Оспаривание отцовства/материнства",
      description: "Юридически оспорим или подтвердим родственную связь",
      icon: FileSearch
    },
    {
      title: "Другая ситуация — нужна помощь",
      description: "Разберем и подскажем, как действовать",
      icon: HelpCircle
    }
  ];

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

  const baseLyutikov = buildTeamMember("lyutikov");
  const baseRyzhenko = buildTeamMember("ryzhenko");
  const baseLyadova = buildTeamMember("yulia-lyadova");

  const teamMembers = [
    baseLyutikov && {
      ...baseLyutikov,
      specializations: [
        "Семейные споры и раздел имущества",
        "Споры о детях и порядке общения",
        "Судебная стратегия и переговоры",
        "Защита интересов в суде"
      ],
      description: [
        "Контролирует стратегию ведения семейных дел и участвует в сложных переговорах.",
        "Представляет интересы клиентов в судах и добивается закрепления позиции по детям и имуществу."
      ]
    },
    baseRyzhenko && {
      ...baseRyzhenko,
      specializations: [
        "Подготовка исков и документов",
        "Переговоры и медиация",
        "Раздел имущества супругов",
        "Досудебное урегулирование"
      ],
      description: [
        "Готовит процессуальные документы и выстраивает правовую позицию в семейных спорах.",
        "Сопровождает переговоры и помогает закрепить условия соглашений."
      ]
    },
    baseLyadova && {
      ...baseLyadova,
      specializations: [
        "Семейные споры и алименты",
        "Раздел имущества и долей",
        "Имущественные требования",
        "Судебное сопровождение"
      ],
      description: [
        "Сопровождает семейные конфликты: от алиментов до раздела имущества и долей.",
        "Фокус на доказательствах и понятной стратегии для клиента."
      ]
    }
  ].filter(Boolean) as PageTeamMember[];

  const steps = [
    {
      title: "Диагностика ситуации",
      action: "Разбираем факты, документы, позиции сторон и риски по детям и имуществу.",
      result: "Понимаете перспективы, возможные сценарии и слабые места."
    },
    {
      title: "Стратегия и план действий",
      action: "Формируем правовую позицию, определяем цель и последовательность шагов.",
      result: "Получаете понятный план и прогноз результата."
    },
    {
      title: "Подготовка документов",
      action: "Готовим иски, заявления, соглашения, запросы и доказательственную базу.",
      result: "Документы соответствуют требованиям суда и снижают риск отказа."
    },
    {
      title: "Досудебная работа",
      action: "Ведем переговоры, фиксируем позицию, готовим и согласуем условия.",
      result: "Шанс решить вопрос быстрее и на выгодных условиях."
    },
    {
      title: "Судебное представительство",
      action: "Представляем интересы в суде, заявляем ходатайства, защищаем позицию.",
      result: "Ваши права защищены профессионально на каждом заседании."
    },
    {
      title: "Исполнение решения",
      action: "Контролируем исполнение, работаем с приставами и оформляем результаты.",
      result: "Решение суда работает в вашу пользу и закрепляется документально."
    }
  ];

  const cases = casesData
    .filter((caseItem) => caseItem.category === "Семейное право")
    .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime());

  const yandexOrgId = "244880896695";

  const familyReviews = [
    {
      id: "family-1",
      name: "Екатерина М.",
      rating: 5,
      date: "18.11.2025",
      text: "Сопровождали расторжение брака и спор о порядке общения с ребенком. Подготовили позицию и документы так, что вторая сторона пошла на соглашение без затягивания."
    },
    {
      id: "family-2",
      name: "Андрей К.",
      rating: 5,
      date: "02.11.2025",
      text: "Помогли грамотно разделить квартиру в ипотеке и долги. Всё разложили по шагам, объяснили риски и держали в курсе по каждому заседанию."
    },
    {
      id: "family-3",
      name: "Ольга С.",
      rating: 5,
      date: "25.10.2025",
      text: "Бывший супруг скрывал доходы, алименты не платил. Адвокат собрал доказательства, сделал расчеты и добился решения в твердой сумме."
    },
    {
      id: "family-4",
      name: "Дмитрий В.",
      rating: 5,
      date: "11.10.2025",
      text: "Обратился на стадии переговоров по разделу имущества. Подготовили соглашение, где учли интересы детей и мои вложения, избежали суда."
    },
    {
      id: "family-5",
      name: "Марина Л.",
      rating: 5,
      date: "29.09.2025",
      text: "Сложный спор о месте жительства ребенка. Команда спокойно и уверенно выстроила стратегию, помогла собрать нужные документы и доказательства."
    },
    {
      id: "family-6",
      name: "Сергей Н.",
      rating: 5,
      date: "12.09.2025",
      text: "Получил четкий план действий по брачному договору и разделу бизнеса. Без лишних обещаний, но по факту — сильная позиция и понятный результат."
    }
  ];

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

  const faqItems = [
    {
      question: "Можно ли расторгнуть брак без согласия второго супруга?",
      answer: "Да, через суд. Суд оценивает фактическое прекращение семейной жизни и принимает решение даже при несогласии второй стороны."
    },
    {
      question: "Можно ли одновременно решить вопросы о детях и разделе имущества?",
      answer: "Да. В одном процессе можно заявить требования о детях, алиментах и разделе имущества, либо разделить на несколько дел по стратегии."
    },
    {
      question: "Как суд делит совместно нажитое имущество?",
      answer: "В общем случае поровну, но суд учитывает интересы детей, вклад сторон и обстоятельства приобретения имущества."
    },
    {
      question: "Сколько длится процесс расторжения брака и раздела имущества?",
      answer: "Срок зависит от сложности и позиции сторон. В среднем от 2–3 месяцев, при споре о детях и активах — дольше."
    },
    {
      question: "Можно ли решить вопрос без суда?",
      answer: "Да, через нотариальное соглашение. Мы готовим документы и фиксируем условия, чтобы избежать рисков в будущем."
    },
    {
      question: "Нужно ли ваше присутствие в суде?",
      answer: "Не обязательно. Мы можем представлять интересы по доверенности, а вы присутствуете только при необходимости."
    }
  ];

  const salesAccordion = [
    {
      title: "Что мы делаем",
      content: (
        <ul className="list-disc list-inside space-y-2 text-small text-muted-foreground">
          <li>Анализируем ситуацию, цели и риски</li>
          <li>Готовим документы и доказательства</li>
          <li>Ведем переговоры и фиксируем договоренности</li>
          <li>Представляем интересы в суде</li>
          <li>Контролируем исполнение решения</li>
        </ul>
      )
    },
    {
      title: "Когда лучше действовать — и почему сроки важны",
      content: (
        <p className="text-small text-muted-foreground leading-relaxed">
          В семейных спорах время влияет на доказательства, позицию по детям и имущество. Чем раньше вы
          сформируете правовую позицию, тем больше возможностей договориться или защитить свою долю.
        </p>
      )
    },
    {
      title: "Какие документы нужны",
      content: (
        <ul className="list-disc list-inside space-y-2 text-small text-muted-foreground">
          <li>Паспорт и свидетельство о браке</li>
          <li>Свидетельства о рождении детей</li>
          <li>Документы на имущество и кредиты</li>
          <li>Справки о доходах и расходах</li>
          <li>Переписка, соглашения, подтверждения расходов</li>
        </ul>
      )
    },
    {
      title: "Сколько это стоит?",
      content: (
        <p className="text-small text-muted-foreground leading-relaxed">
          Стоимость зависит от объема спора, количества имущества, наличия вопросов о детях и стадии процесса.
          После первичной оценки фиксируем объем работ и стоимость в договоре.
        </p>
      )
    },
    {
      title: "Типичные ошибки — и как их избежать",
      content: (
        <ul className="list-disc list-inside space-y-2 text-small text-muted-foreground">
          <li>Затягивать обращение и терять доказательства</li>
          <li>Опираться на устные договоренности без фиксации</li>
          <li>Подписывать соглашения без правовой проверки</li>
          <li>Пытаться скрыть имущество или доходы</li>
          <li>Не учитывать процессуальные сроки и подсудность</li>
        </ul>
      )
    },
    {
      title: "Что вы получаете?",
      content: (
        <ul className="list-disc list-inside space-y-2 text-small text-muted-foreground">
          <li>Понятный план и прогноз возможного результата</li>
          <li>Системную защиту ваших интересов и интересов ребенка</li>
          <li>Профессиональные документы и доказательную базу</li>
          <li>Снижение рисков по имуществу и срокам</li>
        </ul>
      )
    }
  ];

  const breadcrumbItems = [
    { name: "Главная", url: SITE.url },
    { name: "Услуги", url: new URL("/uslugi", SITE.url).toString() },
    { name: "Физлицам", url: new URL("/services/phys", SITE.url).toString() },
    { name: pageBreadcrumbLabel, url: canonical }
  ];

  const legalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${canonical}#service`,
    "name": "Расторжение брака и раздел имущества",
    "serviceType": "Расторжение брака и раздел имущества",
    "url": canonical,
    "inLanguage": "ru-RU",
    "areaServed": SITE.areaServed,
    "telephone": SITE.phone,
    "email": SITE.email,
    "provider": {
      "@type": "Organization",
      "@id": `${SITE.url}#organization`,
      "name": SITE.name,
      "url": SITE.url,
      "telephone": SITE.phone,
      "email": SITE.email,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": SITE.address.country,
        "addressLocality": SITE.address.city,
        "streetAddress": SITE.address.street,
        "postalCode": SITE.address.postal
      },
      "areaServed": SITE.areaServed
    }
  };

  return (
    <div className="min-h-screen flex flex-col family-landing-page">
      <Helmet>
        <title>Расторжение брака и раздел имущества — адвокаты по семейным делам | Профзащита</title>
        <meta
          name="description"
          content="Переговоры, документы и суды по расторжению брака и разделу имущества. Москва и МО. Первичная оценка за 15 минут."
        />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        <meta property="og:title" content="Расторжение брака и раздел имущества — адвокаты по семейным делам | Профзащита" />
        <meta
          property="og:description"
          content="Переговоры, документы и суды по расторжению брака и разделу имущества. Москва и МО. Первичная оценка за 15 минут."
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
              background: "linear-gradient(180deg, rgba(5,12,28,0.9) 0%, rgba(11,31,58,0.75) 55%, rgba(11,31,58,0.4) 100%)"
            }}
          />
          <div className="container relative z-10">
            <Breadcrumbs
              items={[
                { label: "Услуги", path: "/uslugi" },
                { label: "Физлицам", path: "/services/phys" },
                { label: pageBreadcrumbLabel }
              ]}
            />
            <div className="max-w-4xl mt-6 space-y-5">
              <h1 className="font-serif text-h1-mobile md:text-h1 font-bold text-accent">
                Адвокаты по семейным делам: берем на себя переговоры, документы и суды
              </h1>
              <ul className="pl-6 list-disc space-y-2 text-white/90 text-base md:text-lg leading-relaxed marker:text-white/80">
                <li>Расторжение брака с детьми и споры об опеке</li>
                <li>Раздел имущества: квартиры, ипотека, бизнес, вклады и долги</li>
                <li>Представительство в суде и переговоры</li>
                <li>Работаем по договору, фиксируем объем работ</li>
              </ul>
              <p className="lead text-white/90">
                Оценим перспективы, риски и возможный результат по вашей ситуации
              </p>
              {isFamilyCategory ? (
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-accent text-primary shadow-[0_8px_18px_rgba(201,162,39,0.35)] hover:bg-[#c09a23] active:bg-[#a9851d] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary/40"
                >
                  <Link to={contactsHref}>Получить первичную оценку за 15 минут</Link>
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-accent text-primary shadow-[0_8px_18px_rgba(201,162,39,0.35)] hover:bg-[#c09a23] active:bg-[#a9851d] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary/40"
                  onClick={() => openQuickQuestionModal({ topic: "Расторжение брака и раздел имущества" })}
                >
                  Получить первичную оценку за 15 минут
                </Button>
              )}
              <div className="flex flex-wrap items-center gap-y-2 text-small text-white/75 lg:flex-nowrap lg:whitespace-nowrap">
                {trustItems.map((item, index) => (
                  <span
                    key={item.id}
                    className={`flex items-center ${index > 0 ? "before:content-['•'] before:mx-2 before:text-white/50" : ""}`}
                  >
                    {item.label}
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
                Помогаем в любых семейных вопросах
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
                      <h3 className="font-semibold text-[16px] md:text-[17px] text-slate-900">
                        {card.title}
                      </h3>
                      <p className="text-[13px] md:text-[14px] text-slate-600 leading-relaxed flex-1">
                        {card.description}
                      </p>
                      <Button
                        size="lg"
                        className="mt-2 h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] px-6 text-[14px] text-slate-900 shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f] hover:shadow-[0_4px_12px_rgba(111,83,15,0.2)]"
                        asChild
                      >
                        {isFamilyCategory ? (
                          <Link to={contactsHref}>Получить консультацию</Link>
                        ) : (
                          <a href={callHref}>Получить консультацию</a>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="mt-7 md:mt-8 rounded-[12px] border border-[#D8C08B] bg-[#F7F2E8] p-6 text-center shadow-[0_6px_16px_rgba(60,52,31,0.08)]">
              <p className="font-semibold text-body-mobile md:text-body text-slate-900">
                Каждая неделя без четкой позиции — это риск потерять квартиру, контакт с ребенком или деньги.
              </p>
              <p className="mt-2 text-[14px] md:text-[15px] text-slate-600 font-medium">
                В 70% случаев клиенты обращаются слишком поздно — когда позиция уже ослаблена!
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
                Вашим делом занимаются практикующие адвокаты с опытом в семейных спорах
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
                      <h3 className="font-semibold text-[16px] md:text-[18px] text-slate-900">
                        {member.name}
                      </h3>
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
                    Если дело уже в суде — мы входим в процесс сразу. Просто пришлите материалы — мы проанализируем,
                    что можно изменить, и начнём действовать.
                  </p>
                </CardContent>
              </Card>
              <Card className="rounded-[12px] border border-[#D8C08B] bg-[#F6F1E6] shadow-[0_8px_20px_rgba(60,52,31,0.08)]">
                <CardContent className="p-6 text-center">
                  <p className="text-body-mobile md:text-body text-slate-900">
                    Если ещё не дошло до суда — подготовим сильную позицию заранее. Часто этого достаточно, чтобы
                    вторая сторона пошла на уступки — без зала суда.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8 flex flex-col items-center gap-3 text-center">
              <Button
                size="lg"
                className="w-full sm:w-[360px] h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] text-[14px] text-slate-900 shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f] hover:shadow-[0_4px_12px_rgba(111,83,15,0.2)]"
                onClick={() =>
                  openQuickQuestionModal({
                    topic: "Расторжение брака и раздел имущества",
                    forceForm: isFamilyCategory
                  })
                }
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
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Кейсы</h2>
              <p className="text-muted-foreground">
                Мы не раскрываем персональные данные клиентов — примеры основаны на реальных делах
              </p>
            </div>
            <div className="section__content grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cases.map((caseItem) => {
                const decisionPreview = caseItem.decisionPreview ?? caseItem.documents?.[0];
                const hasDecision = Boolean(decisionPreview);
                return (
                  <Card
                    key={caseItem.slug}
                    className="h-full border border-slate-200 bg-white shadow-[0_10px_25px_rgba(15,23,42,0.06)] transition-all hover:border-[#C9A227] hover:shadow-[0_16px_40px_rgba(201,162,39,0.18)]"
                  >
                    <CardContent className="pt-6 h-full">
                      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
                        <div className="flex-1">
                          <h3 className="font-semibold text-body-mobile md:text-body text-slate-900">{caseItem.title}</h3>
                          <div className="mt-4 space-y-3 text-small text-muted-foreground leading-relaxed">
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
                          {!hasDecision && (
                            <div className="mt-6">
                              <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="h-11 w-full rounded-[12px] border-[#C9A227] text-slate-900 hover:border-[#b8911f] hover:bg-[#F4E7C2]"
                              >
                                <Link to={`/cases/${caseItem.slug}`}>Подробнее о кейсе</Link>
                              </Button>
                            </div>
                          )}
                        </div>
                        {hasDecision && (
                          <div className="w-full lg:w-[52%] lg:max-w-[600px]">
                            <div className="rounded-[12px] border border-[#E6DDCC] bg-[#F8F4EA] p-4">
                              <div className="text-sm font-semibold text-slate-900">Решение суда</div>
                              <div className="mt-3 rounded-[10px] border border-[#E6DDCC] bg-white p-2">
                                <img
                                  src={decisionPreview}
                                  alt={`Решение суда: ${caseItem.title}`}
                                  className="max-h-[640px] w-full object-contain"
                                  loading="lazy"
                                />
                              </div>
                              <div className="mt-4">
                                <Button
                                  asChild
                                  size="lg"
                                  variant="outline"
                                  className="h-11 w-full rounded-[12px] border-[#C9A227] text-slate-900 hover:border-[#b8911f] hover:bg-[#F4E7C2]"
                                >
                                  <Link to={`/cases/${caseItem.slug}`}>Подробнее о кейсе</Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="mt-12">
              {isFamilyCategory ? (
                <>
                  <div className="section__header max-w-3xl text-center mx-auto">
                    <h3 className="font-serif text-h3-mobile md:text-h3 font-semibold">Отзывы клиентов</h3>
                  </div>
                  <YandexRatingWidget />
                  <div className="section__content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {familyReviews.map((review) => (
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
                  <div className="mt-8 flex justify-center">
                    <Button
                      asChild
                      size="lg"
                      className="w-full sm:w-auto bg-accent text-primary shadow-[0_8px_18px_rgba(201,162,39,0.35)] hover:bg-[#c09a23] active:bg-[#a9851d] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    >
                      <Link to={contactsHref}>Обсудить с адвокатом свою ситуацию</Link>
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="section__header max-w-3xl">
                    <h3 className="font-serif text-h3-mobile md:text-h3 font-semibold">Отзывы клиентов</h3>
                  </div>
                  <div className="section__content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {familyReviews.map((review) => (
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
                </>
              )}
            </div>
          </div>
        </section>

        {/* Экран 6: Большой продающий блок + аккордеон */}
        <section className="section">
          <div className="container">
            <div className="section__header max-w-4xl !mb-4 md:!mb-5">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                Расторжение брака и раздел имущества: как получить справедливый результат — без потерь и стресса?
              </h2>
            </div>
            <Card className="border-border">
              <CardContent className="pt-6 space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Если вы столкнулись с разводом, спором о детях или разделом имущества — главное сейчас:{" "}
                  <strong>не терять время</strong>. В Москве и области такие дела развиваются быстро. А каждая
                  неделя без четкой позиции — это риск потерять квартиру, контакт с ребенком или деньги.
                </p>
                <p>
                  Мы не обещаем невозможного. Но мы помогаем объяснить перспективы, обозначить реальные риски, и строим
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
                FAQ — Частые вопросы о расторжении брака и разделе имущества
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
                  <AccordionContent className="text-muted-foreground pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-8 text-center space-y-4">
              <p className="text-muted-foreground">
                Не нашли свой вопрос? Позвоните нам — подскажем, как действовать дальше.
              </p>
              {isFamilyCategory ? (
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto border border-[#b8911f] bg-accent text-primary shadow-[0_8px_18px_rgba(201,162,39,0.35)] hover:border-[#a8831a] hover:bg-[#c09a23] active:bg-[#a9851d] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Link to={contactsHref}>Получить оценку перспектив</Link>
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="w-full sm:w-auto border border-[#b8911f] bg-accent text-primary shadow-[0_8px_18px_rgba(201,162,39,0.35)] hover:border-[#a8831a] hover:bg-[#c09a23] active:bg-[#a9851d] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  onClick={() => openQuickQuestionModal({ topic: "Расторжение брака и раздел имущества" })}
                >
                  Получить оценку перспектив
                </Button>
              )}
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
                    Позвоните нам — адвокат по семейным спорам уточнит детали ситуации и предложит варианты
                    действий.
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
                      {isFamilyCategory ? (
                        <Link to={contactsHref}>Свяжитесь с нами</Link>
                      ) : (
                        <a href={`tel:${SITE.phoneRaw}`}>Свяжитесь с нами</a>
                      )}
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
                        <p className="text-accent">
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

export default RastorzhenieBrakaRazdelImushchestvaPage;
