import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Star,
  Phone,
  Mail,
  MapPin,
  Home,
  Shield,
  Scale,
  FileSearch,
  Building2,
  Landmark,
  Users,
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BreadcrumbSchema, FAQPageSchema, JsonLd } from "@/components/JsonLd";
import LandingConsultationForm from "@/components/LandingConsultationForm";
import { toast } from "@/hooks/use-toast";
import { submitToWebhook } from "@/lib/webhook";
import { isPhoneValid, normalizePhone } from "@/lib/phone";
import { SITE } from "@/config/site";
import { sharedReviews } from "@/data/shared-reviews";

import lawyerConsultationBg from "@/assets/legal/lawyer-consultation-bg.webp";
import vaskovskyImg from "@/assets/team/vaskovsky.jpg";
import kalabekovImg from "@/assets/team/kalabekov.jpg";

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

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {submitLabel}
      </Button>

      <p className="text-small text-muted-foreground text-center">{footerNote}</p>
    </form>
  );
};

const UshcherbImushchestvuPage = () => {
  const [isLeadOpen, setIsLeadOpen] = useState(false);
  const canonical = new URL("/services/phys/ushcherb-imushchestvu", SITE.url).toString();
  const landingDialogClassName =
    "!w-[calc(100%-32px)] !max-w-[640px] !rounded-[20px] bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.18)] border border-slate-200";

  const trustItems = [
    "Конфиденциально",
    "15+ лет практики",
    "Работаем в Москве и Московской области",
    "Фиксируем объём работ по договору"
  ];

  const popularServices = [
    {
      title: "Залив квартиры",
      description: "Зафиксируем ущерб, подготовим претензию и доведём дело до компенсации",
      href: "/services/phys/zaliv-kvartiry",
      icon: Home
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
      icon: FileSearch
    },
    {
      title: "Претензия и иск",
      description: "Подготовим сильные документы и выстроим стратегию взыскания",
      href: "/services/phys/vozmeshchenie-ushcherba",
      icon: Shield
    },
    {
      title: "Ущерб от соседей, УК и подрядчиков",
      description: "Зафиксируем ответственность и добьёмся возмещения расходов",
      href: "/services/phys/spory-s-uk-tszh",
      icon: Building2
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
      href: "/services/phys/ushcherb-imushchestvu",
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
      specializations: ["Ущерб имуществу", "Договорные и имущественные споры", "Судебная защита"],
      description: [
        "Сопровождает споры о возмещении ущерба: от залива квартиры до конфликтов с подрядчиками и управляющими компаниями. Делает акцент на доказательной базе, расчётах и стратегии, которая выдерживает проверку в суде.",
        "Ведёт дела на досудебной стадии и в суде, готовит процессуальные документы, участвует в переговорах и добивается исполнения решений."
      ]
    },
    {
      name: "Калабеков Эльдар Султан-Муратович",
      role: "Адвокат",
      experience: "Стаж 8 лет",
      profileUrl: "/team/kalabekov",
      photo: kalabekovImg,
      specializations: [
        "Взыскание ущерба и расходов",
        "Споры с управляющими компаниями",
        "Защита прав потребителей",
        "Досудебное урегулирование"
      ],
      description: [
        "Сфокусирован на взыскании ущерба и работе с организациями: УК, подрядчиками и контрагентами. Внимателен к документам, актам и переписке, помогает собрать доказательства и усилить позицию до суда.",
        "Работает с доказательствами, готовит претензии, сопровождает в суде и контролирует исполнение решений."
      ]
    },
    {
      name: "Васьковский Михаил Михайлович",
      role: "Адвокат",
      experience: "Стаж 15 лет",
      profileUrl: "/team/vaskovsky",
      photo: vaskovskyImg,
      specializations: ["Ущерб имуществу", "Наследственные дела", "Административные дела", "Страховые споры"],
      description: [
        "Работает с конфликтами, где важны точные расчёты, экспертизы и документы. Выстраивает стратегию так, чтобы защитить интересы клиента и закрепить результат документально.",
        "Ведёт переговоры, готовит документы, сопровождает клиента в судах и на внесудебных этапах."
      ]
    }
  ];

  const steps = [
    {
      title: "Диагностика ситуации",
      action: "Разбираем обстоятельства, документы, акты, переписку и оцениваем доказательственную базу.",
      result: "Понимаете перспективы, риски и что важно сделать в первую очередь."
    },
    {
      title: "Стратегия и план действий",
      action: "Определяем правильный способ защиты права: претензия, переговоры, иск, экспертиза.",
      result: "Получаете понятный план действий и прогноз результата."
    },
    {
      title: "Подготовка документов",
      action: "Готовим претензии, расчёты ущерба, иски, ходатайства и запросы по делу.",
      result: "Документы соответствуют требованиям и усиливают позицию в суде и переговорах."
    },
    {
      title: "Досудебная работа",
      action: "Ведём переговоры, фиксируем позицию, направляем требования виновным лицам и организациям.",
      result: "Шанс решить вопрос быстрее и на выгодных условиях без затяжных заседаний."
    },
    {
      title: "Судебное представительство",
      action: "Представляем интересы в суде, заявляем ходатайства, работаем с экспертизами и доказательствами.",
      result: "Ваши права защищены профессионально и последовательно."
    },
    {
      title: "Исполнение решения",
      action: "Контролируем исполнение, работаем с приставами и документально закрепляем результат.",
      result: "Решение начинает работать в вашу пользу и приводит к реальной компенсации."
    }
  ];

  const cases: Array<{
    title: string;
    situation: string;
    task: string;
    actions: string;
    result: string;
  }> = [];

  const faqItems = [
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
      question: "Можно ли решить вопрос без суда?",
      answer:
        "Да, если у вас сильная позиция и грамотно оформленные документы. Часто претензия и переговоры с расчётами позволяют договориться без заседаний."
    },
    {
      question: "Кто отвечает за ущерб: сосед, УК или подрядчик?",
      answer:
        "Ответственность зависит от причины ущерба и документов. Мы анализируем ситуацию, определяем ответственных лиц и выстраиваем стратегию взыскания."
    },
    {
      question: "Сколько времени занимает взыскание ущерба?",
      answer:
        "Срок зависит от сложности дела, позиции второй стороны и необходимости экспертизы. Мы показываем реалистичный сценарий и держим под контролем ключевые сроки."
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
          Анализируем документы, фиксируем позицию, готовим претензии и иски, ведём переговоры,
          работаем с оценкой ущерба и представляем ваши интересы в суде.
        </p>
      )
    },
    {
      title: "Когда лучше действовать — и почему сроки важны",
      content: (
        <p className="text-small text-muted-foreground leading-relaxed">
          В делах об ущербе важно действовать быстро: акты, фиксация причин и доказательства со временем
          теряются, а переговорная позиция ослабевает. Чем раньше вы начинаете, тем проще добиться
          компенсации.
        </p>
      )
    },
    {
      title: "Какие документы нужны",
      content: (
        <p className="text-small text-muted-foreground leading-relaxed">
          Акт о заливе или ином ущербе, фото и видео, переписка, квитанции, сметы и чеки, договоры,
          экспертные заключения и любые документы, которые подтверждают причину и размер ущерба.
        </p>
      )
    },
    {
      title: "Сколько это стоит?",
      content: (
        <p className="text-small text-muted-foreground leading-relaxed">
          Стоимость зависит от сложности ситуации, объёма доказательств и стадии процесса. После
          первичной оценки фиксируем объём работ и условия сотрудничества в договоре.
        </p>
      )
    },
    {
      title: "Типичные ошибки — и как их избежать",
      content: (
        <p className="text-small text-muted-foreground leading-relaxed">
          Частые ошибки — затягивание фиксации ущерба, слабые расчёты, отсутствие актов и претензий,
          а также попытки договориться без документального закрепления позиций. Мы строим стратегию
          так, чтобы эти риски были под контролем.
        </p>
      )
    },
    {
      title: "Что вы получаете?",
      content: (
        <p className="text-small text-muted-foreground leading-relaxed">
          Понятный план действий, сильную доказательную базу, подготовленные документы и сопровождение
          до результата — от претензии до исполнения решения суда.
        </p>
      )
    }
  ];

  const breadcrumbItems = [
    { name: "Главная", url: SITE.url },
    { name: "Услуги", url: new URL("/uslugi", SITE.url).toString() },
    { name: "Физлицам", url: new URL("/services/phys", SITE.url).toString() },
    { name: "Ущерб имуществу", url: canonical }
  ];

  const legalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${canonical}#service`,
    name: "Ущерб имуществу",
    serviceType: "Ущерб имуществу",
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

  const shouldShowCases = cases.length > 0;
  const reviews = sharedReviews.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Ущерб имуществу — взыскание ущерба и расходов | Профзащита</title>
        <meta
          name="description"
          content="Ущерб имуществу: заливы, повреждения, некачественные работы. Взыскиваем ущерб и расходы на восстановление. Москва и МО."
        />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        <meta property="og:title" content="Ущерб имуществу — взыскание ущерба и расходов | Профзащита" />
        <meta
          property="og:description"
          content="Ущерб имуществу: заливы, повреждения, некачественные работы. Взыскиваем ущерб и расходы на восстановление. Москва и МО."
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

      <Dialog open={isLeadOpen} onOpenChange={setIsLeadOpen}>
        <DialogContent className={landingDialogClassName}>
          <DialogHeader className="space-y-2 text-center">
            <DialogTitle>Быстрый вопрос юристу</DialogTitle>
            <DialogDescription>
              Оставьте свои контакты, и мы свяжемся с вами в ближайшее время
            </DialogDescription>
          </DialogHeader>
          <LandingConsultationForm onSuccess={() => setIsLeadOpen(false)} />
        </DialogContent>
      </Dialog>

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
                { label: "Ущерб имуществу" }
              ]}
            />
            <div className="max-w-4xl mt-6 space-y-5">
              <h1 className="font-serif text-h1-mobile md:text-h1 font-bold">Ущерб имуществу</h1>
              <ul className="pl-6 list-disc space-y-2 text-white/90 text-base md:text-lg leading-relaxed marker:text-white/80">
                <li>Залив квартиры: оценка, претензия и иск</li>
                <li>Ущерб от соседей, УК и подрядчиков</li>
                <li>Возмещение стоимости ремонта и имущества</li>
                <li>Неустойка, штраф и дополнительные взыскания (если применимо)</li>
                <li>Судебная экспертиза и оценка ущерба</li>
                <li>Досудебное урегулирование и переговоры</li>
                <li>Ведение дела в суде под ключ</li>
                <li>Исполнение решения суда</li>
              </ul>
              <p className="lead text-white/90">
                Взыскиваем ущерб и расходы на восстановление: заливы, повреждения, некачественные работы и ответственность
                виновных лиц. Подготовим доказательства и добьёмся компенсации.
              </p>
              <Button
                size="lg"
                className="w-full sm:w-auto bg-accent text-primary shadow-[0_8px_18px_rgba(201,162,39,0.35)] hover:bg-[#c09a23] active:bg-[#a9851d] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary/40"
                onClick={() => setIsLeadOpen(true)}
              >
                Получить консультацию
              </Button>
              <div className="flex flex-wrap items-center gap-y-2 text-small text-white/75">
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
                        <Link to={card.href}>Перейти к услуге</Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="mt-7 md:mt-8 rounded-[12px] border border-[#D8C08B] bg-[#F7F2E8] p-6 text-center shadow-[0_6px_16px_rgba(60,52,31,0.08)]">
              <p className="font-semibold text-body-mobile md:text-body text-slate-900">
                В делах об ущербе промедление почти всегда снижает шансы на полную компенсацию.
              </p>
              <p className="mt-2 text-[14px] md:text-[15px] text-slate-600 font-medium">
                Чем раньше вы фиксируете ущерб и позицию, тем проще добиться справедливого результата.
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
                Вашим делом занимаются практикующие адвокаты с опытом во взыскании ущерба и имущественных спорах
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
              Все наши юристы проходят ежегодную аттестацию и имеют доступ к базе судебной практики
            </p>
          </div>
        </section>

        {/* Экран 4: Этапы работы */}
        <section className="section">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                Как мы работаем: 6 этапов, чтобы взыскать ущерб и закрепить результат
              </h2>
            </div>
            <div className="section__content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {steps.map((step, index) => (
                <Card key={step.title} className="h-full">
                  <CardContent className="pt-6 h-full flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-accent/10 text-accent flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <h3 className="font-semibold text-body-mobile md:text-body">{step.title}</h3>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Что мы делаем</div>
                      <p className="text-small text-muted-foreground leading-relaxed">{step.action}</p>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Результат для вас</div>
                      <p className="text-small text-muted-foreground leading-relaxed">{step.result}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                    добиться компенсации без затяжных заседаний.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8 flex flex-col items-center gap-3 text-center">
              <Button
                size="lg"
                className="w-full sm:w-[360px] h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] text-[14px] text-slate-900 shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f] hover:shadow-[0_4px_12px_rgba(111,83,15,0.2)]"
                onClick={() => setIsLeadOpen(true)}
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
              <>
                <div className="section__header max-w-3xl">
                  <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Кейсы</h2>
                  <p className="text-muted-foreground">
                    Мы не раскрываем персональные данные клиентов — примеры основаны на реальных делах
                  </p>
                </div>
                <div className="section__content grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {cases.map((caseItem) => (
                    <Card key={caseItem.title} className="h-full">
                      <CardContent className="pt-6 h-full flex flex-col gap-4">
                        <h3 className="font-semibold text-body-mobile md:text-body">{caseItem.title}</h3>
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
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            <div className={shouldShowCases ? "mt-12" : undefined}>
              <div className="section__header max-w-3xl">
                <h3 className="font-serif text-h3-mobile md:text-h3 font-semibold">Отзывы клиентов</h3>
              </div>
              <div className="section__content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <Button asChild size="lg" className="px-6">
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
        </section>

        {/* Экран 6: Большой продающий блок + аккордеон */}
        <section className="section">
          <div className="container">
            <div className="section__header max-w-4xl !mb-4 md:!mb-5">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                Ущерб имуществу: как получить справедливую компенсацию — без лишнего стресса и потерь?
              </h2>
            </div>
            <Card className="border-border">
              <CardContent className="pt-6 space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  В делах об ущербе критично быстро зафиксировать факт, причину и размер убытков. Любая пауза может
                  привести к потере доказательств, спорам о суммах и снижению шансов на полную компенсацию.
                </p>
                <p>
                  Мы не обещаем невозможного, но помогаем выстроить сильную позицию: собрать доказательства, подготовить
                  документы и довести дело до реального результата.
                </p>
              </CardContent>
            </Card>

            <Accordion type="single" collapsible className="section__content mt-8 space-y-4">
              {salesAccordion.map((item, index) => (
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
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">FAQ — Частые вопросы о взыскании ущерба</h2>
            </div>
            <Accordion type="single" collapsible className="section__content space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={item.question} value={`faq-${index}`} className="border rounded-xl px-6">
                  <AccordionTrigger className="text-left hover:no-underline py-4">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-8 text-center space-y-4">
              <p className="text-muted-foreground">Не нашли свой вопрос? Оставьте заявку и мы оценим вашу ситуацию</p>
              <Button size="lg" onClick={() => setIsLeadOpen(true)}>
                Получить оценку перспектив
              </Button>
            </div>
          </div>
        </section>

        {/* Экран 8: Финальная форма */}
        <section className="section">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Получите оценку перспектив по вашей ситуации</h2>
              <p className="text-muted-foreground">
                Оставьте контакты — адвокат по имущественным спорам свяжется и расскажет, как действовать дальше.
              </p>
            </div>
            <Card className="border-border max-w-3xl">
              <CardContent className="pt-6">
                <LeadForm
                  formId="lead-final"
                  submitLabel="Оценить перспективы"
                  placeholder="Например: «После залива УК отказывается компенсировать ремонт и испорченную технику»"
                  footerNote="Перезвоним в течение 15–20 минут в рабочее время"
                  topic="Ущерб имуществу"
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
                        <p className="text-muted-foreground">
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

export default UshcherbImushchestvuPage;
