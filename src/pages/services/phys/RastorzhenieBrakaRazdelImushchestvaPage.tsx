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

const RastorzhenieBrakaRazdelImushchestvaPage = () => {
  const [isLeadOpen, setIsLeadOpen] = useState(false);
  const canonical = new URL("/services/phys/razvod-razdel-imushchestva", SITE.url).toString();
  const landingDialogClassName =
    "!w-[calc(100%-32px)] !max-w-[640px] !rounded-[20px] bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.18)] border border-slate-200";

  const trustItems = [
    "Конфиденциально",
    "15+ лет практики",
    "Работаем в Москве и Московской области",
    "150+ дел по расторжению брака и разделу имущества"
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

  const teamMembers = [
    {
      name: "Лядова Юлия Сергеевна",
      role: "Адвокат",
      experience: "Стаж 18 лет",
      photo: "/images/team/lyadova-yuliya.jpg",
      specializations: ["Семейные споры", "Договорные и имущественные споры", "Интеллектуальная собственность"],
      description: [
        "Помогает урегулировать семейные конфликты, сопровождает договорные и имущественные споры, защищает интересы клиентов в вопросах интеллектуальной собственности. В работе делает акцент на точной правовой позиции, сборе доказательств и понятной стратегии для клиента.",
        "Ведет дела на досудебной стадии и в суде, готовит процессуальные документы, участвует в переговорах и добивается исполнения решений."
      ]
    },
    {
      name: "Калабеков Эльдар Султан-Муратович",
      role: "Адвокат",
      experience: "Стаж 8 лет",
      photo: kalabekovImg,
      specializations: [
        "Гражданское и семейное право",
        "Семейные и наследственные споры",
        "Защита прав потребителей",
        "Обязательственное право и взыскания"
      ],
      description: [
        "Сфокусирован на семейных вопросах и на защите потребителей: от возврата средств до сопровождения наследственных дел. Внимателен к деталям договоров и коммуникации с контрагентами, помогает клиентам быстро вернуть деньги и закрыть конфликт.",
        "Работает с доказательствами, готовит претензии, сопровождает в суде и контролирует исполнение решений."
      ]
    },
    {
      name: "Васьковский Михаил Михайлович",
      role: "Адвокат",
      experience: "Стаж 15 лет",
      photo: vaskovskyImg,
      specializations: ["Семейные споры и раздел имущества", "Наследственные дела", "Административные дела", "Страховые споры"],
      description: [
        "Работает с конфликтами, где важна доказательная база и чувствительный контекст: семейные споры, наследство, отношения с государственными органами и страховыми. Выстраивает стратегию так, чтобы сохранить баланс интересов и избежать эскалации.",
        "Ведет переговоры, готовит документы, сопровождает клиента в судах и на внесудебных этапах."
      ]
    }
  ];

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

  const cases = [
    {
      title: "Расторжение брака, спор о детях и разделе имущества",
      situation: "Супруги с ребенком 7 лет не смогли договориться о месте жительства и разделе квартиры в ипотеке.",
      task: "Расторгнуть брак, закрепить проживание ребенка с матерью и добиться справедливого раздела имущества и долгов.",
      actions: "Собрали доказательства условий проживания, подготовили иск и ходатайства, провели переговоры по имуществу, представили позицию в суде.",
      result: "Суд определил место жительства ребенка, утвердил порядок общения и разделил имущество с учетом интересов клиента."
    },
    {
      title: "Уклонение от алиментов и сокрытие доходов",
      situation: "Бывший супруг не выплачивал алименты и скрывал реальные доходы.",
      task: "Взыскать задолженность и установить регулярные выплаты.",
      actions: "Собрали сведения о доходах, подготовили расчет задолженности, подали иск и сопровождали исполнительное производство.",
      result: "Алименты назначены в твердой сумме, задолженность взыскана."
    }
  ];

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
    { name: "Расторжение брака и раздел имущества", url: canonical }
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
    <div className="min-h-screen flex flex-col">
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
              background: "linear-gradient(180deg, rgba(5,12,28,0.9) 0%, rgba(11,31,58,0.75) 55%, rgba(11,31,58,0.4) 100%)"
            }}
          />
          <div className="container relative z-10">
            <Breadcrumbs
              items={[
                { label: "Услуги", path: "/uslugi" },
                { label: "Физлицам", path: "/services/phys" },
                { label: "Расторжение брака и раздел имущества" }
              ]}
            />
            <div className="max-w-4xl mt-6 space-y-5">
              <h1 className="font-serif text-h1-mobile md:text-h1 font-bold">
                Адвокаты по семейным делам: берем на себя переговоры, документы и суды
              </h1>
              <ul className="space-y-2 text-body-mobile md:text-body text-white/85">
                <li>Расторжение брака с детьми и споры об опеке</li>
                <li>Раздел имущества: квартиры, ипотека, бизнес, вклады и долги</li>
                <li>Представительство в суде и переговоры</li>
                <li>Работаем по договору, фиксируем объем работ</li>
              </ul>
              <p className="lead text-white/90">
                Оценим перспективы, риски и возможный результат по вашей ситуации
              </p>
              <Button
                size="lg"
                className="w-full sm:w-auto bg-accent text-primary shadow-[0_8px_18px_rgba(201,162,39,0.35)] hover:bg-[#c09a23] active:bg-[#a9851d] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary/40"
                onClick={() => setIsLeadOpen(true)}
              >
                Получить первичную оценку за 15 минут
              </Button>
              <div className="flex flex-wrap items-center gap-y-2 text-small text-white/75">
                {trustItems.map((item, index) => (
                  <span
                    key={item}
                    className={`flex items-center ${index > 0 ? "before:content-['•'] before:mx-2 before:text-white/50" : ""}`}
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
                        onClick={() => setIsLeadOpen(true)}
                      >
                        Получить консультацию
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
                  <CardContent className="p-6 h-full flex flex-col items-center text-center gap-4">
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
                    <div className="text-[13px] text-slate-600 leading-relaxed space-y-2">
                      {member.description.map((paragraph, index) => (
                        <p key={`${member.name}-${index}`}>{paragraph}</p>
                      ))}
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
                Как мы работаем: 6 этапов, чтобы вы вышли из ситуации с минимальными потерями
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
                  <p className="font-semibold text-body-mobile md:text-body text-slate-900">
                    Если дело уже в суде — мы входим в процесс сразу…
                  </p>
                </CardContent>
              </Card>
              <Card className="rounded-[12px] border border-[#D8C08B] bg-[#F6F1E6] shadow-[0_8px_20px_rgba(60,52,31,0.08)]">
                <CardContent className="p-6 text-center">
                  <p className="font-semibold text-body-mobile md:text-body text-slate-900">
                    Если ещё не дошло до суда — подготовим сильную позицию заранее…
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

            <div className="mt-12">
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
            <div className="section__header max-w-4xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                Расторжение брака и раздел имущества: как получить справедливый результат — без потерь и стресса?
              </h2>
            </div>
            <Card className="border-border">
              <CardContent className="pt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  В семейных спорах время работает против тех, кто откладывает решение: активы можно вывести,
                  переписать или спрятать, а позиция по детям становится слабее без четких доказательств.
                </p>
                <p>
                  Мы не обещаем невозможного — оцениваем перспективы честно, фиксируем объем работ и берем на себя
                  переговоры, документы и суд, чтобы вы получили максимально справедливый результат в рамках закона.
                </p>
              </CardContent>
            </Card>

            <Accordion type="single" collapsible className="section__content mt-8 space-y-4">
              {salesAccordion.map((item, index) => (
                <AccordionItem key={item.title} value={`sales-${index}`} className="border rounded-xl px-6">
                  <AccordionTrigger className="text-left hover:no-underline py-4">
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
                <AccordionItem key={item.question} value={`faq-${index}`} className="border rounded-xl px-6">
                  <AccordionTrigger className="text-left hover:no-underline py-4">
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
                Не нашли свой вопрос? Оставьте заявку и мы оценим вашу ситуацию
              </p>
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
                Оставьте контакты — адвокат по семейным спорам свяжется и расскажет, как действовать дальше.
              </p>
            </div>
            <Card className="border-border max-w-3xl">
              <CardContent className="pt-6">
                <LeadForm
                  formId="lead-final"
                  submitLabel="Оценить перспективы"
                  placeholder="Например: «Хочу расторгнуть брак, есть ребенок 5 лет, спор о квартире»"
                  footerNote="Перезвоним в течение 15–20 минут в рабочее время"
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

export default RastorzhenieBrakaRazdelImushchestvaPage;
