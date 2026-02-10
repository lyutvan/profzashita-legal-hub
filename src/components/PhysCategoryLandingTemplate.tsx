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
  Landmark,
  CreditCard,
  AlertTriangle,
  TrendingDown,
  Gavel,
  Pin,
  X,
  Check,
  FileX,
  LogOut,
  Wallet,
  FileWarning,
  MessageSquare,
  Zap,
  Landmark as LandmarkIcon,
  ScrollText,
  UserCheck,
  Timer
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
import { cases as casesData } from "@/data/cases";
import { sharedReviews } from "@/data/shared-reviews";
import { teamMembers } from "@/data/team";
import { getServiceHeroImage } from "@/lib/serviceCardImages";
import { useQuickQuestionModal } from "@/components/QuickQuestionModalProvider";
import TelegramIcon from "@/components/icons/TelegramIcon";
import type { PhysServicePageData } from "@/data/phys-service-content";

type LeadFormProps = {
  formId: string;
  submitLabel: string;
  placeholder?: string;
  footerNote: string;
  topic: string;
  onSuccess?: () => void;
  submitTextClassName?: string;
};

const LeadForm = (_props: LeadFormProps) => null;

type PhysCategoryLandingTemplateProps = {
  data: PhysServicePageData;
};

const CATEGORY_ICONS = [Scale, Home, Building2, Users, MessageCircle, Shield, FileSearch, Landmark, HelpCircle] as const;

const PhysCategoryLandingTemplate = ({ data }: PhysCategoryLandingTemplateProps) => {
  const { openQuickQuestionModal } = useQuickQuestionModal();
  const isDebtContractsCategory = data.entry.slug === "vzyskanie-dolgov-i-dogovornye-spory";
  const isConsumerProtectionCategory = data.entry.slug === "zashchita-prav-potrebitelya";
  const isNasledstvennyeCategory = data.categoryLabel === "Наследственные дела";
  const isBankrotstvoMerged = data.entry.slug === "bankrotstvo-fiz-lits";
  const isTrudovyeCategory = data.entry.slug === "trudovye-spory";
  const isCallOnlyCta = isDebtContractsCategory || isConsumerProtectionCategory || isNasledstvennyeCategory;
  const callHref = "tel:+74950040196";
  const handleCallClick = () => {
    window.location.href = callHref;
  };
  const handleCallLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isConsumerProtectionCategory) {
      event.stopPropagation();
    }
  };
  const yandexOrgId = "244880896695";
  const isFamilyOrHousing =
    data.categoryLabel === "Семейные споры" || data.categoryLabel === "Жилищные споры";

  const heroImage = getServiceHeroImage(data.entry.path, "phys");
  const ogImage = heroImage.startsWith("http") ? heroImage : `${SITE.url}${heroImage.replace(/^\//, "")}`;
  const heroOverlayBackground = isTrudovyeCategory
    ? "linear-gradient(180deg, rgba(5,12,28,0.95) 0%, rgba(8,24,46,0.85) 60%, rgba(8,24,46,0.6) 100%)"
    : isBankrotstvoMerged
      ? "linear-gradient(180deg, rgba(4,10,24,0.96) 0%, rgba(8,22,44,0.86) 60%, rgba(8,22,44,0.68) 100%)"
      : "linear-gradient(180deg, rgba(5,12,28,0.9) 0%, rgba(11,31,58,0.75) 55%, rgba(11,31,58,0.4) 100%)";

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

  const consumerSituationCards = [
    { title: "Возврат денег за товар", description: "Срывы сроков, брак, отказ в возврате", path: data.entry.path },
    { title: "Некачественная услуга", description: "Работы выполнены плохо или не выполнены", path: data.entry.path },
    { title: "Срыв сроков ремонта", description: "Ремонт задержан или затянут без причин", path: data.entry.path },
    { title: "Отказ в гарантии", description: "Продавец/сервис не принимает претензию", path: data.entry.path },
    { title: "Спор с продавцом/маркетплейсом", description: "Возвраты, обмены, защита прав онлайн", path: data.entry.path },
    { title: "Неустойка и штраф по ЗоЗПП", description: "Рассчитаем и взыщем по закону", path: data.entry.path },
    { title: "Компенсация морального вреда", description: "Соберем доказательства и обоснуем сумму", path: data.entry.path },
    { title: "Возврат оплаты за услуги", description: "Расторжение и возврат средств", path: data.entry.path }
  ];
  const bankrotstvoSituations = [
    {
      title: "Кредиты и займы, которые стало невозможно платить",
      description: "Если ежемесячные платежи превышают доход, а долги только растут",
      icon: CreditCard
    },
    {
      title: "Просрочки, штрафы, коллекторы",
      description: "Когда постоянные звонки и давление мешают нормально жить",
      icon: AlertTriangle
    },
    {
      title: "Несколько кредитов в разных банках",
      description: "Потребительские кредиты, кредитные карты, МФО",
      icon: Landmark
    },
    {
      title: "Поручительство или долги по чужим обязательствам",
      description: "Когда ответственность легла на вас, а платить нечем",
      icon: Users
    },
    {
      title: "Снижение дохода или потеря работы",
      description: "Если финансовая ситуация изменилась, а обязательства остались",
      icon: TrendingDown
    },
    {
      title: "Риск суда, ареста счетов или имущества",
      description: "Когда есть риск суда, ареста счетов или имущества и требуется законное решение",
      icon: Gavel
    }
  ];
  const bankrotstvoProcessSteps = [
    {
      title: "Консультация и анализ ситуации",
      description:
        "Мы изучаем вашу финансовую ситуацию, долги и обязательства, оцениваем риски и возможные варианты решения."
    },
    {
      title: "Подготовка документов",
      description: "Подготавливаем все необходимые документы для начала процедуры банкротства."
    },
    {
      title: "Подача заявления в суд",
      description: "Представляем ваши интересы в суде и сопровождаем процедуру на всех стадиях рассмотрения дела."
    },
    {
      title: "Прохождение процедуры банкротства",
      description:
        "Берем на себя взаимодействие с кредиторами, финансовым управляющим и контролируем ход дела."
    },
    {
      title: "Завершение процедуры и результат",
      description:
        "После завершения процедуры долги списываются в рамках закона, а вы получаете финансовое облегчение."
    }
  ];
  const bankrotstvoEffectsLeft = [
    {
      title: "Фиксация задолженности",
      description: "Долги перестают расти: прекращается начисление штрафов, пеней и процентов"
    },
    {
      title: "Приостановка исполнительных производств",
      description: "Исполнительные действия и взыскания приостанавливаются в рамках процедуры"
    },
    {
      title: "Прекращение давления со стороны кредиторов",
      description: "Общение с банками и коллекторами происходит в установленном законом порядке"
    },
    {
      title: "Контроль всех судебных дел",
      description: "Судебные споры по долгам рассматриваются в рамках процедуры банкротства"
    }
  ];
  const bankrotstvoEffectsRight = [
    {
      title: "Временные ограничения на кредиты",
      description: "В течение 5 лет необходимо сообщать о факте банкротства при обращении за кредитами"
    },
    {
      title: "Ограничения на руководящие должности",
      description: "В течение 3 лет действуют ограничения на участие в управлении юридическими лицами"
    },
    {
      title: "Ограничения на повторное банкротство",
      description: "В течение 5 лет после процедуры вы не можете снова подавать на банкротство"
    }
  ];
  const bankrotstvoStillPossible = [
    "Открывать ИП и устраиваться на работу",
    "Получать доход и распоряжаться им в рамках закона",
    "Выезжать за границу",
    "Пользоваться имуществом, не подлежащим реализации",
    "Продавать и приобретать недвижимость, автомобиль и т.д.",
    "Взять новые кредиты и займы"
  ];
  const bankrotstvoWhyUs = [
    {
      title: "Сопровождение «под ключ»",
      description:
        "Мы берем на себя всю процедуру — от анализа ситуации и сбора документов до завершения дела и решения суда",
      icon: Shield
    },
    {
      title: "Команда профильных юристов",
      description:
        "Над делом работает команда специалистов, а не один юрист. Это снижает риски и повышает устойчивость позиции в суде",
      icon: Users
    },
    {
      title: "Фиксация условий в договоре",
      description:
        "Сроки, этапы и объем работ фиксируются в договоре. Вы заранее понимаете, за что и на каких условиях работаете с нами",
      icon: FileSearch
    },
    {
      title: "Прозрачная договорная стоимость",
      description:
        "Стоимость рассчитывается исходя из вашей ситуации — без навязанных услуг и скрытых доплат. Возможны скидки для различных категорий граждан",
      icon: Scale
    },
    {
      title: "Удобные условия оплаты",
      description:
        "Возможна рассрочка, поэтапная или помесячная оплата. По стоимости сориентируем уже при первом разговоре",
      icon: CreditCard
    },
    {
      title: "Минимум вашего участия",
      description:
        "Мы берем общение с кредиторами и процессуальные действия на себя. Вам не нужно разбираться в процедуре и ходить по судам",
      icon: MessageCircle
    }
  ];
  const trudovyeSituations = [
    {
      title: "Незаконное увольнение",
      description: "Если уволили без основания или с нарушением процедуры",
      icon: FileX
    },
    {
      title: "Принуждение к увольнению «по собственному»",
      description: "Когда оказывают давление, угрожают или создают невыносимые условия",
      icon: LogOut
    },
    {
      title: "Невыплата заработной платы",
      description: "Задержки, долги по зарплате, премиям, отпускным или компенсациям",
      icon: Wallet
    },
    {
      title: "Нарушения при сокращении",
      description: "Не выплатили положенные суммы или нарушили порядок сокращения",
      icon: Users
    },
    {
      title: "Дисциплинарные взыскания и выговоры",
      description: "Незаконные штрафы, взыскания, попытки «задокументировать» увольнение",
      icon: FileWarning
    },
    {
      title: "Другие трудовые конфликты с работодателем",
      description: "Когда вы понимаете, что ваши права нарушены, но не знаете, как действовать",
      icon: MessageSquare
    }
  ];
  const trudovyeWorkSteps = [
    "Анализируем вашу ситуацию и объясняем возможные варианты развития дела",
    "Берем на себя взаимодействие с работодателем и его представителями",
    "Представляем ваши интересы в переговорах и в суде",
    "Сопровождаем дело до принятия и исполнения решения"
  ];
  const trudovyeOutcomes = [
    "Оспорить незаконное увольнение и восстановиться на работе",
    "Взыскать задолженность по заработной плате, компенсации и иные выплаты",
    "Прекратить давление со стороны работодателя и зафиксировать правовую позицию",
    "Защитить свои интересы в суде при рассмотрении трудового спора"
  ];
  const trudovyeProcessSteps = [
    {
      title: "Консультация и анализ ситуации",
      description:
        "Мы изучаем документы, обстоятельства и позицию работодателя, чтобы определить возможные варианты защиты и выбрать оптимальную стратегию в вашем случае"
    },
    {
      title: "Формирование правовой позиции и подготовка документов",
      description:
        "Готовим необходимые документы: претензии, обращения, иски, объяснения и доказательства, которые усиливают вашу позицию в споре"
    },
    {
      title: "Досудебное урегулирование и переговоры",
      description:
        "При необходимости взаимодействуем с работодателем и его представителями, фиксируем позицию и пытаемся решить спор без суда, если это возможно и выгодно для вас"
    },
    {
      title: "Судебная защита",
      description:
        "Представляем ваши интересы в суде, заявляем ходатайства, формируем и представляем доказательства, сопровождаем дело на всех стадиях рассмотрения"
    },
    {
      title: "Контроль исполнения решения",
      description:
        "Сопровождаем дело до фактического восстановления ваших прав — получения выплат, компенсаций или иных результатов, предусмотренных законом"
    }
  ];
  const trudovyeWhyUs = [
    {
      title: "Работаем против сильной стороны",
      description:
        "Умеем вести дела, где работодатель давит, затягивает выплаты и прикрывается службой безопасности, юристами и внутренними регламентами",
      icon: Zap
    },
    {
      title: "Судебная практика по конфликтам высокой сложности",
      description:
        "Берем споры с высокой ценой ошибки, доказательственными рисками и активным сопротивлением со стороны работодателя",
      icon: LandmarkIcon
    },
    {
      title: "Опыт в резонансных делах",
      description:
        "Участвовали в конфликтах, которые доходили до суда и имели последствия, а не заканчивались формальными решениями",
      icon: ScrollText
    },
    {
      title: "Индивидуальная стратегия",
      description:
        "Каждое дело разбираем индивидуально и выстраиваем позицию под конкретную ситуацию, а не под универсальные схемы",
      icon: UserCheck
    },
    {
      title: "Команда коллегии под задачу",
      description: "Над делом работает команда адвокатов и юристов с разной специализацией",
      icon: Users
    },
    {
      title: "Быстрый старт без потери времени",
      description:
        "Подключаемся срочно, фиксируем нарушения и не даем работодателю сформировать удобную для себя позицию",
      icon: Timer
    }
  ];
  const extractCaseNumber = (...sources: Array<string | undefined>) => {
    for (const source of sources) {
      if (!source) continue;
      const match = source.match(/№\s*([A-Za-zА-Яа-я0-9-\/]+)/);
      if (match) return `№ ${match[1]}`;
    }
    return null;
  };
  const extractDebtAmount = (...sources: Array<string | undefined>) => {
    for (const source of sources) {
      if (!source) continue;
      const match = source.match(/(\d[\d\s.,]*\s*(?:млн|тыс)?\s*(?:руб\.?|₽))/i);
      if (match) return match[1].replace(/\s+/g, " ").trim();
    }
    return null;
  };
  const shortenText = (text: string, max = 150) => {
    if (text.length <= max) return text;
    const cut = text.slice(0, max);
    const lastSpace = cut.lastIndexOf(" ");
    return `${cut.slice(0, lastSpace > 80 ? lastSpace : max).trim()}…`;
  };

  const renderedSituationCards = isConsumerProtectionCategory
    ? consumerSituationCards
    : isNasledstvennyeCategory && situationCards.length < 8
      ? [
          ...situationCards,
          {
            title: "Другая ситуация — нужна помощь",
            description: "Разберем и подскажем, как действовать",
            path: data.entry.path
          }
        ].slice(0, 8)
      : situationCards.slice(0, 8);

  const salesWhatWeDo = Array.from(
    new Set([
      ...data.planBeforeCourt.slice(0, 3),
      ...data.planInCourt.slice(0, 3),
      ...data.planSteps.slice(0, 2).map((step) => step.title)
    ])
  ).slice(0, 6);

  const categoryCaseMatchers: Record<string, (caseCategory: string, caseTitle: string) => boolean> = {
    "Защита прав потребителей": (cat, title) => /потребител/i.test(cat) || /потребител/i.test(title),
    "ДТП и страховые споры": (cat, title) => /дтп|страхов/i.test(cat) || /дтп|страхов/i.test(title),
    "Ущерб имуществу": (cat, title) => /ущерб|залив|поврежден/i.test(cat) || /ущерб|залив|поврежден/i.test(title),
    "Наследственные дела": (cat, title) => /наслед/i.test(cat) || /наслед/i.test(title),
    "Взыскание долгов и договорные споры": (cat, title) => /долг|задолж|договор/i.test(cat) || /долг|задолж|договор/i.test(title),
    "Трудовые споры": (cat, title) => /труд/i.test(cat) || /труд/i.test(title),
    "Банковские и кредитные споры": (cat, title) => /кредит|банк/i.test(cat) || /кредит|банк/i.test(title),
    "Банкротство и кредитные споры": (cat, title) =>
      /банкрот|кредит|банк/i.test(cat) || /банкрот|кредит|банк/i.test(title),
    "Исполнительное производство": (cat, title) => /исполнител/i.test(cat) || /исполнител/i.test(title),
    "Земельные споры": (cat, title) => /земел/i.test(cat) || /земел/i.test(title),
    "Административные споры": (cat, title) => /административ/i.test(cat) || /административ/i.test(title),
    "Банкротство физических лиц": (cat, title) => /банкрот/i.test(cat) || /банкрот/i.test(title),
    "Документы и судебное сопровождение": (cat, title) =>
      /документ|судеб/i.test(cat) || /документ|судеб/i.test(title)
  };

  const matchedCases = casesData.filter((caseItem) => {
    const matcher = categoryCaseMatchers[data.categoryLabel];
    if (!matcher) return false;
    return matcher(caseItem.category, caseItem.title);
  });

  const resolvedCases = (matchedCases.length > 0 ? matchedCases : []).slice(0, 2).map((caseItem) => ({
    title: caseItem.title,
    situation: caseItem.task,
    task: "Добиться результата и защитить интересы клиента.",
    actions: caseItem.actions,
    result: caseItem.result,
    decisionPreview: caseItem.decisionPreview,
    decisionUrl: caseItem.decisionUrl,
    slug: caseItem.slug
  }));

  const cases = (resolvedCases.length > 0
    ? resolvedCases
    : data.cases.slice(0, 2).map((item, index) => {
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
      }));

  const bankrotstvoMatchedCases = useMemo(() => {
    if (!isBankrotstvoMerged) return [];
    return matchedCases.filter((caseItem) => /банкрот/i.test(caseItem.category) || /банкрот/i.test(caseItem.title));
  }, [isBankrotstvoMerged, matchedCases]);

  const bankrotstvoShowcaseCases = useMemo(() => {
    if (!isBankrotstvoMerged) return [];
    return bankrotstvoMatchedCases.slice(0, 3).map((caseItem) => ({
      title: caseItem.title,
      caseNumber: extractCaseNumber(caseItem.task, caseItem.result),
      debtAmount: extractDebtAmount(caseItem.task, caseItem.result),
      result: shortenText(caseItem.result),
      scanUrl: caseItem.decisionPreview ?? caseItem.documents?.[0],
      caseUrl: caseItem.slug ? `/cases/${caseItem.slug}` : "/keisy"
    }));
  }, [isBankrotstvoMerged, bankrotstvoMatchedCases]);
  const bankrotstvoCasesLayout =
    bankrotstvoShowcaseCases.length >= 3
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
      : "grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr justify-items-center max-w-[760px] mx-auto";
  const trudovyeShowcaseCases = useMemo(() => {
    if (!isTrudovyeCategory) return [];
    return matchedCases.slice(0, 3).map((caseItem) => ({
      title: caseItem.title,
      situation: caseItem.task,
      actions: caseItem.actions,
      result: caseItem.result,
      scanUrl: caseItem.decisionPreview ?? caseItem.documents?.[0],
      caseUrl: caseItem.slug ? `/cases/${caseItem.slug}` : "/keisy"
    }));
  }, [isTrudovyeCategory, matchedCases]);
  const trudovyeCasesLayout =
    trudovyeShowcaseCases.length >= 3
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
      : "grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr justify-items-center max-w-[760px] mx-auto";

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
  const bankrotstvoFaqItems = [
    {
      question: "Можно ли сохранить единственное жильё?",
      answer:
        "В большинстве случаев единственное жильё сохраняется, однако всё зависит от конкретной ситуации. На консультации мы оцениваем риски и сразу объясняем, какие варианты возможны именно в вашем случае."
    },
    {
      question: "Сколько длится процедура банкротства?",
      answer:
        "Сроки процедуры зависят от конкретной ситуации, объёма долгов и особенностей дела. В среднем процесс занимает от 6 месяцев и проходит в установленном законом порядке. На консультации мы даём оценку по срокам и объясняем, от чего они зависят."
    },
    {
      question: "С чего начать обращение?",
      answer:
        "Первый шаг — консультация, на которой мы изучаем вашу ситуацию: долги, доходы, имущество, ограничения. После этого объясняем возможные варианты, риски и порядок дальнейших действий."
    },
    {
      question: "Можно ли решить вопрос без суда?",
      answer:
        "Процедура банкротства физического лица проводится в судебном порядке. Однако ваше личное участие в процессе, как правило, минимально — основные действия и взаимодействие с судом мы берём на себя. Все шаги заранее объясняются."
    },
    {
      question: "Сколько времени занимает работа юристов по делу?",
      answer:
        "Юристы сопровождают дело на всех этапах процедуры — от первичной консультации до её завершения. Сроки работы зависят от сложности ситуации, но клиент всегда понимает, на каком этапе находится его дело. Мы поддерживаем связь и информируем о ходе процесса."
    },
    {
      question: "Как формируется стоимость услуг?",
      answer:
        "Стоимость зависит от объёма работы, сложности ситуации и выбранного формата сопровождения. После анализа вашей ситуации мы озвучиваем условия и фиксируем их в договоре."
    },
    {
      question: "Нужно ли личное присутствие в суде?",
      answer:
        "В большинстве случаев личное присутствие клиента не требуется. Мы представляем ваши интересы по доверенности и берём на себя участие в судебных заседаниях. Если потребуется ваше участие, об этом заранее сообщается и объясняется причина."
    }
  ];
  const trudovyeFaqItems = [
    {
      question: "Можно ли сохранить работу, если увольнение незаконное?",
      answer:
        "Да, в ряде случаев возможно оспорить увольнение и восстановиться на работе. Перспектива зависит от оснований увольнения, документов и соблюдения процедуры со стороны работодателя. Эти моменты мы оцениваем на консультации."
    },
    {
      question: "Что делать, если не выплачивают зарплату или компенсации?",
      answer:
        "Задержки и невыплаты заработной платы, отпускных и компенсаций можно взыскивать в законном порядке. Важно зафиксировать факт нарушения и правильно выстроить дальнейшие действия — от претензии до суда."
    },
    {
      question: "Обязательно ли сразу обращаться в суд?",
      answer:
        "Нет. В некоторых ситуациях спор можно попытаться урегулировать в досудебном порядке. Мы оцениваем, какой путь будет наиболее безопасным и эффективным именно в вашей ситуации."
    },
    {
      question: "Нужно ли мое личное присутствие?",
      answer:
        "Не всегда. Часть действий и процессов мы можем взять на себя. Необходимость личного участия зависит от стадии спора и конкретных обстоятельств дела."
    },
    {
      question: "Сколько времени занимает трудовой спор?",
      answer:
        "Сроки зависят от сложности ситуации, позиции работодателя и выбранного способа защиты. На консультации мы объясняем возможные этапы и ориентировочные сроки."
    },
    {
      question: "Как формируется стоимость услуг?",
      answer:
        "Стоимость зависит от объема работы, сложности ситуации и выбранного формата сопровождения. После анализа вашей ситуации мы озвучиваем условия и фиксируем их в договоре."
    },
    {
      question: "Что делать, если я не уверен(а), нарушены ли мои права?",
      answer:
        "Это частая ситуация. На консультации мы разберем документы и обстоятельства дела и подскажем, есть ли основания для защиты и какие варианты действий возможны."
    }
  ];
  const trudovyeFaqQuestions = [
    "Можно ли сохранить работу, если увольнение незаконное?",
    "Что делать, если не выплачивают зарплату или компенсации?",
    "Обязательно ли сразу обращаться в суд?",
    "Нужно ли мое личное присутствие?",
    "Сколько времени занимает трудовой спор?",
    "Как формируется стоимость услуг?",
    "Что делать, если я не уверен(а), нарушены ли мои права?"
  ];
  const faqItems = useMemo(() => data.faqs.slice(0, 7), [data.faqs]);
  const resolvedFaqItems = useMemo(() => {
    if (isBankrotstvoMerged) return bankrotstvoFaqItems;
    if (isTrudovyeCategory) return trudovyeFaqItems;
    return faqItems.map((item, index) => ({
      ...item,
      question: trudovyeFaqQuestions[index] ?? item.question
    }));
  }, [bankrotstvoFaqItems, faqItems, isBankrotstvoMerged, isTrudovyeCategory, trudovyeFaqItems]);
  const teamOverrideSlugs = useMemo(() => {
    if (isBankrotstvoMerged) {
      return ["lyutikov", "ryzhenko"];
    }
    if (isTrudovyeCategory) {
      return ["ryzhenko", "sotnikov"];
    }
    if (isConsumerProtectionCategory) {
      return ["ryzhenko", "vaskovsky", "sotnikov"];
    }
    return null;
  }, [isBankrotstvoMerged, isConsumerProtectionCategory]);

  const resolvedTeam = useMemo(() => {
    if (teamOverrideSlugs) {
      const membersBySlug = new Map(teamMembers.map((member) => [member.slug, member]));
      const override = teamOverrideSlugs
        .map((slug) => membersBySlug.get(slug))
        .filter(Boolean)
        .map((member) => ({
          slug: member!.slug,
          name: member!.name,
          role: member!.role,
          experience: member!.experienceText,
          bullets: (member!.specializations ?? []).slice(0, 4),
          photo: member!.photo
        }));
      if (override.length > 0) return override;
    }
    if (!isDebtContractsCategory && !isConsumerProtectionCategory) return data.team;
    if (data.team.length >= 3) return data.team.slice(0, 3);

    const existing = new Set(data.team.map((member) => member.slug));
    const hasDebtContractFocus = (member: typeof teamMembers[number]) => {
      const fields = [
        ...(member.specializations ?? []),
        ...(member.practice ?? []),
        ...(member.competencies ?? [])
      ]
        .join(" ")
        .toLowerCase();
      return isConsumerProtectionCategory
        ? /потребител/.test(fields)
        : /долг|взыск|договор|обязательств/.test(fields);
    };

    const extra = teamMembers.find((member) => !existing.has(member.slug) && hasDebtContractFocus(member));
    if (!extra) return data.team;

    return [
      ...data.team,
      {
        slug: extra.slug,
        name: extra.name,
        role: extra.role,
        experience: extra.experienceText,
        bullets: extra.specializations.slice(0, 4),
        photo: extra.photo
      }
    ].slice(0, 3);
  }, [data.team, isConsumerProtectionCategory, isDebtContractsCategory, teamOverrideSlugs]);

  const bankrotstvoTeamCards = useMemo(() => {
    if (!isBankrotstvoMerged) return [];
    const membersBySlug = new Map(teamMembers.map((member) => [member.slug, member]));
    const cards = [
      {
        slug: "lyutikov",
        badge: "Адвокат",
        roleTitle: "Председатель коллегии",
        experience: "Стаж 26 лет",
        bullets: [
          "Контролирует стратегию ведения дел о банкротстве физических лиц",
          "Участвует в сложных и спорных ситуациях",
          "Представляет интересы клиентов в судах"
        ],
        cta: "Подробнее об адвокате"
      },
      {
        slug: "ryzhenko",
        badge: "Юрист",
        roleTitle: "Помощник председателя коллегии",
        experience: "Стаж 23 года",
        bullets: [
          "Подготавливает документы для процедуры банкротства",
          "Формирует правовую позицию клиента",
          "Сопровождает дело на всех этапах процедуры"
        ],
        cta: "Подробнее о юристе"
      }
    ];

    return cards
      .map((card) => {
        const member = membersBySlug.get(card.slug);
        if (!member) return null;
        return {
          ...card,
          name: member.name,
          photo: member.photo
        };
      })
      .filter(Boolean) as Array<{
      slug: string;
      badge: string;
      roleTitle: string;
      experience: string;
      bullets: string[];
      cta: string;
      name: string;
      photo: string;
    }>;
  }, [isBankrotstvoMerged]);

  const trudovyeTeamCards = useMemo(() => {
    if (!isTrudovyeCategory) return [];
    const membersBySlug = new Map(teamMembers.map((member) => [member.slug, member]));
    const cards = [
      {
        slug: "ryzhenko",
        badge: "Юрист",
        roleTitle: "Помощник председателя коллегии",
        experience: "Стаж 23 года",
        bullets: [
          "Анализирует ситуацию и подготавливает документы",
          "Формирует правовую позицию клиента",
          "Сопровождает дело на всех этапах, представляет интересы работников в переговорах и суде"
        ],
        cta: "Подробнее о юристе"
      },
      {
        slug: "sotnikov",
        badge: "Адвокат",
        roleTitle: "Адвокат коллегии",
        experience: "Стаж 15 лет",
        bullets: [
          "Представляет интересы работников в трудовых спорах",
          "Участвует в переговорах с работодателями и судебных разбирательствах"
        ],
        cta: "Подробнее об адвокате"
      }
    ];

    return cards
      .map((card) => {
        const member = membersBySlug.get(card.slug);
        if (!member) return null;
        return {
          ...card,
          name: member.name,
          photo: member.photo
        };
      })
      .filter(Boolean) as Array<{
      slug: string;
      badge: string;
      roleTitle: string;
      experience: string;
      bullets: string[];
      cta: string;
      name: string;
      photo: string;
    }>;
  }, [isTrudovyeCategory]);

  const isTwoTeamLayout = resolvedTeam.length === 2;
  const teamGridClassName = isTwoTeamLayout
    ? "section__content grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr max-w-4xl mx-auto justify-items-center"
    : "section__content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr";

  const teamCardClassName = isTwoTeamLayout
    ? "h-full w-full max-w-[360px] rounded-[12px] border border-[#C9A227] bg-white shadow-[0_8px_20px_rgba(60,52,31,0.08)]"
    : "h-full rounded-[12px] border border-[#C9A227] bg-white shadow-[0_8px_20px_rgba(60,52,31,0.08)]";

  const bankrotstvoReviews = [
    {
      id: "br-1",
      name: "Алексей К.",
      rating: 5,
      date: "",
      text: "Долги по кредитам стали неподъемными, постоянно звонили банки и коллекторы. На консультации все объяснили, рассказали про риски и последствия. Процедуру адвокат сопровождал полностью, мне было понятно, что происходит на каждом этапе."
    },
    {
      id: "br-2",
      name: "Елена М.",
      rating: 5,
      date: "",
      text: "Обратилась после потери работы — платить по займам было просто нечем. Адвокат помог разобраться, объяснил какие варианты есть, и честно рассказал о последствиях банкротства."
    },
    {
      id: "br-3",
      name: "Дмитрий С.",
      rating: 5,
      date: "",
      text: "Было несколько кредитов и микрозаймов, ситуация получилась запутанная. Очень переживал за свое имущество. На консультации все объяснили простым языком, сопровождали до завершения процедуры. Остался доволен."
    },
    {
      id: "br-4",
      name: "Мария Л.",
      rating: 5,
      date: "",
      text: "Долго думала и сомневалась, стоит ли начинать банкротство, было много страхов. В Профзащите адвокат ничего не скрывал, сразу рассказал и про плюсы, и про ограничения. Работали спокойно и профессионально, всегда были на связи."
    },
    {
      id: "br-5",
      name: "Сергей В.",
      rating: 5,
      date: "",
      text: "Обратился из-за долгов после неудачного бизнеса. Быстро и честно оценили ситуацию. Процедуру сопровождали до самого конца, документы подготовили быстро. Спасибо!"
    },
    {
      id: "br-6",
      name: "Наталья Г.",
      rating: 5,
      date: "",
      text: "У меня была сложная ситуация с кредитами и просрочками, даже уже были исполнительные производства. Состояние было ужасное, не понимала что делать. Юрист взял все на себя, объяснил порядок действий и дальнейшие шаги. Были всегда на связи, поэтому вся процедура прошла спокойно и без нервов."
    }
  ];
  const trudovyeReviews = [
    {
      id: "tr-1",
      name: "Константин Г.",
      rating: 5,
      date: "",
      text:
        "Уволили без объяснений причин, сказали «хочешь подавай в суд». На консультации объяснили все нюансы, разработали стратегию, я все подтвердил. Дальше делом занимались юристы, меня почти не дергали. В итоге восстановили мои права. Спасибо за спокойную и понятную работу."
    },
    {
      id: "tr-2",
      name: "Марина К.",
      rating: 5,
      date: "",
      text:
        "Работодатель несколько месяцев задерживал зарплату, на обращения не реагировал. Юрист оценил ситуацию, подготовили документы и довели дело до результата. Деньги выплатили полностью. Понравилось, что все объясняли простым языком, было понятно."
    },
    {
      id: "tr-3",
      name: "Сергей М.",
      rating: 5,
      date: "",
      text:
        "Меня вынуждали уволиться «по собственному», я не хотел, но говорили, что иначе будет хуже. Очень переживал. Юрист помог зафиксировать нарушения, объяснил риски и дальнейшие шаги. В итоге вопрос решился в мою пользу. Остался доволен работой и подходом."
    },
    {
      id: "tr-4",
      name: "Любовь В.",
      rating: 5,
      date: "",
      text:
        "Боялась идти против работодателя, компания крупная. Юристы сразу сказали, на что могу рассчитывать и какие есть варианты. Все прошло спокойно, без лишних эмоций. Получила хорошую компенсацию. Спасибо!"
    },
    {
      id: "tr-5",
      name: "Алексей А.",
      rating: 5,
      date: "",
      text:
        "Был конфликт с работодателем, дело дошло до суда. Представляли мои интересы полностью, держали в курсе всех этапов. Результатом доволен, помогли защитить мои права, благодарю за профессиональную работу."
    },
    {
      id: "tr-6",
      name: "Елена С.",
      rating: 5,
      date: "",
      text:
        "Обратилась сначала просто за консультацией, долго думала, но в итоге решила вести дело с юристами. Все объяснили понятным языком. Сопровождали до конца, всегда были на связи. Спасибо за поддержку в сложной ситуации."
    }
  ];
  const reviews = (isBankrotstvoMerged
    ? bankrotstvoReviews
    : isTrudovyeCategory
      ? trudovyeReviews
      : data.reviews.length > 0
        ? data.reviews
        : sharedReviews).slice(0, 6);

  const shouldShowCases = cases.length > 0 && !isBankrotstvoMerged && !isTrudovyeCategory;

  return (
    <div className="min-h-screen flex flex-col category-landing-page family-landing-page">
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

      <main
        className={`flex-1 services-page${isBankrotstvoMerged ? " bankrotstvo-compact" : ""}${
          isTrudovyeCategory ? " trudovye-compact" : ""
        }`}
      >
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
            background: heroOverlayBackground
            }}
          />
          <div className="container relative z-10">
            <Breadcrumbs items={data.breadcrumbs} />
            {isBankrotstvoMerged ? (
              <div className="mt-6 max-w-[980px] md:max-w-[1100px] space-y-5 text-left">
                <h1 className="category-hero-title font-serif font-bold text-accent text-[clamp(28px,3.1vw,44px)] leading-[1.1] md:whitespace-nowrap">
                  Банкротство физических лиц под ключ
                </h1>
                <div className="space-y-2 text-white/90 text-base md:text-lg leading-relaxed">
                  <p>Помогаем законно избавиться от кредитов, займов и долгов</p>
                  <p>без давления со стороны банков и коллекторов</p>
                </div>
                <ul className="pl-6 list-disc space-y-2 text-white/90 text-base md:text-lg leading-relaxed marker:text-white">
                  <li>Работаем строго в рамках закона</li>
                  <li>Сопровождаем процедуру от консультации до решения суда</li>
                  <li>Берем на себя общение с кредиторами и коллекторами</li>
                </ul>
                <p className="text-small md:text-[15px] text-white/80">
                  Разберем ситуацию и сориентируем по стоимости{" "}
                  <span className="text-accent font-semibold">при первом звонке</span>
                </p>
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-accent text-white shadow-[0_8px_18px_rgba(201,162,39,0.35)] hover:bg-[#c09a23] active:bg-[#a9851d] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary/40"
                  onClick={() => openQuickQuestionModal({ topic: data.heroTitle })}
                >
                  Получить консультацию по банкротству
                </Button>
                <p className="text-small text-white/70 md:whitespace-nowrap">
                  <span className="text-accent font-semibold">ФЗ-№127</span> • Работаем в Москве и Московской области •{" "}
                  <span className="text-accent font-semibold">Гибкая система оплаты</span> • Скидки и рассрочка платежа
                </p>
              </div>
            ) : isTrudovyeCategory ? (
              <div className="mt-6 max-w-[980px] md:max-w-[1100px] space-y-5 text-left">
                <h1 className="category-hero-title font-serif font-bold text-accent text-[clamp(26px,2.7vw,40px)] leading-[1.1] md:whitespace-nowrap">
                  Защита работников в трудовых спорах с работодателем
                </h1>
                <p className="text-white/90 text-base md:text-lg leading-relaxed">
                  Помогаем законно отстоять ваши права — при незаконном увольнении, невыплате зарплаты и давлении со
                  стороны работодателя
                </p>
                <ul className="pl-6 list-disc space-y-2 text-white/90 text-base md:text-lg leading-relaxed marker:text-white">
                  <li>
                    Разбираем ситуацию и оцениваем перспективы{" "}
                    <span className="text-accent font-semibold">до обращения в суд</span>
                  </li>
                  <li>Берем на себя переговоры с работодателем и подготовку документов</li>
                  <li>Представляем интересы работника в суде и контролируем процесс до результата</li>
                </ul>
                <p className="text-small md:text-[15px] text-white/80">
                  Разберем ситуацию и сориентируем по стоимости{" "}
                  <span className="text-accent font-semibold">при первом звонке</span>
                </p>
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-accent text-white shadow-[0_8px_18px_rgba(201,162,39,0.35)] hover:bg-[#c09a23] active:bg-[#a9851d] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary/40"
                  onClick={() => openQuickQuestionModal({ topic: data.heroTitle })}
                >
                  Получить консультацию по трудовому спору
                </Button>
                <p className="text-small text-white/70 md:whitespace-nowrap">
                  <span className="text-accent font-semibold">Конфиденциально</span> • Работаем в Москве и Московской
                  области • <span className="text-accent font-semibold">Гибкая система оплаты</span> • Практика по
                  трудовым спорам
                </p>
              </div>
            ) : (
              <div className="max-w-4xl mt-6 space-y-5">
                <h1 className="category-hero-title font-serif text-h1-mobile md:text-h1 font-bold text-accent">
                  {data.heroTitle}
                </h1>
                <ul className="category-hero-benefits pl-6 list-disc space-y-2 text-white/90 text-base md:text-lg leading-relaxed marker:text-white/80">
                  {data.heroBenefits.slice(0, 6).map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
                <p className="lead text-white/90">{data.heroSubtitle}</p>
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-accent text-primary shadow-[0_8px_18px_rgba(201,162,39,0.35)] hover:bg-[#c09a23] active:bg-[#a9851d] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary/40"
                  onClick={isCallOnlyCta ? handleCallClick : () => openQuickQuestionModal({ topic: data.heroTitle })}
                >
                  Получить консультацию
                </Button>
                <div className="category-hero-trust flex flex-nowrap items-center gap-y-2 text-small text-white/80 overflow-x-auto md:overflow-visible">
                  {trustItems.map((item, index) => (
                    <span
                      key={item.id}
                      className={`category-hero-trust-item flex items-center whitespace-nowrap ${
                        index > 0 ? "before:content-['•'] before:mx-2 before:text-white/50" : ""
                      }`}
                    >
                      {item.accent && isFamilyOrHousing ? (
                        <>
                          <span className="category-hero-trust-accent">{item.accent}</span>{" "}
                          {item.label}
                        </>
                      ) : (
                        <>
                          {item.accent ? `${item.accent} ${item.label}` : item.label}
                        </>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Экран 2: Каталог услуг */}
        <section className="section">
          <div className="container">
            {!isBankrotstvoMerged && !isTrudovyeCategory && (
              <div className="section__header max-w-3xl mx-auto text-center pt-2 md:pt-4 mb-6 md:mb-7">
                <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                  {data.categoryLabel === "Наследственные дела"
                    ? "Помогаем в любых вопросах по наследственным делам"
                    : isConsumerProtectionCategory
                      ? "Помогаем по всем вопросам защиты прав потребителей"
                      : `Помогаем по направлению «${data.categoryLabel}»`}
                </h2>
                <p className="text-muted-foreground">Выберите вашу ситуацию — подскажем, как действовать:</p>
              </div>
            )}
            {isBankrotstvoMerged ? (
              <div className="section__content">
                <div className="section__header max-w-3xl mx-auto text-center">
                  <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                    С какими ситуациями по долгам мы работаем
                  </h2>
                  <p className="text-body-mobile md:text-body text-muted-foreground">
                    Мы сопровождаем процедуру банкротства физических лиц в самых распространенных и сложных долговых ситуациях
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  {bankrotstvoSituations.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Card
                        key={item.title}
                        className="h-full rounded-[14px] border border-[#E6DDCC] bg-[#F8F4EA] shadow-[0_6px_14px_rgba(60,52,31,0.08)]"
                      >
                        <CardContent className="p-6 h-full flex flex-col items-center text-center gap-3">
                          <div className="h-14 w-14 rounded-full border border-[#D8C08B] bg-white flex items-center justify-center">
                            <Icon className="h-7 w-7 text-accent" strokeWidth={1.6} />
                          </div>
                          <h3 className="text-[15px] md:text-[16px] font-semibold text-slate-900">
                            {item.title}
                          </h3>
                          <p className="text-[13px] md:text-[14px] text-slate-600 leading-relaxed">
                            {item.description}
                          </p>
                          <Button
                            asChild
                            size="lg"
                            className="mt-auto h-10 rounded-[10px] border border-[#b8911f] bg-[#C9A227] px-5 text-[13px] text-white shadow-[0_4px_10px_rgba(111,83,15,0.2)] hover:border-[#a8831a] hover:bg-[#b8911f]"
                          >
                            <a href={callHref}>Получить консультацию</a>
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                <p className="mt-8 text-center text-small text-muted-foreground">
                  В зависимости от ситуации по банкротству меняется объем работы и условия сопровождения.
                  Подробнее о стоимости и условиях оплаты вы сможете узнать на консультации.
                </p>
              </div>
            ) : isTrudovyeCategory ? (
              <div className="section__content">
                <div className="section__header max-w-3xl mx-auto text-center">
                  <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                    С какими трудовыми спорами к нам обращаются чаще всего
                  </h2>
                  <p className="text-body-mobile md:text-body text-muted-foreground">
                    Если вы столкнулись с одной из этих ситуаций — разберемся и подскажем законный путь решения
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  {trudovyeSituations.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Card
                        key={item.title}
                        className="h-full rounded-[14px] border border-[#E6DDCC] bg-[#F8F4EA] shadow-[0_6px_14px_rgba(60,52,31,0.08)]"
                      >
                        <CardContent className="p-6 h-full flex flex-col items-center text-center gap-3">
                          <div className="h-14 w-14 rounded-full border border-[#D8C08B] bg-white flex items-center justify-center">
                            <Icon className="h-7 w-7 text-accent" strokeWidth={1.6} />
                          </div>
                          <h3 className="text-[15px] md:text-[16px] font-semibold text-slate-900">
                            {item.title}
                          </h3>
                          <p className="text-[13px] md:text-[14px] text-slate-600 leading-relaxed">
                            {item.description}
                          </p>
                          <Button
                            asChild
                            size="lg"
                            className="mt-auto h-10 rounded-[10px] border border-[#b8911f] bg-[#C9A227] px-5 text-[13px] text-white shadow-[0_4px_10px_rgba(111,83,15,0.2)] hover:border-[#a8831a] hover:bg-[#b8911f]"
                          >
                            <a href={callHref}>Получить консультацию</a>
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                <p className="mt-8 text-center text-small text-muted-foreground">
                  Если ваша ситуация отличается — мы разберем ее на консультации и ответим на все ваши вопросы
                </p>
              </div>
            ) : (
              <div className="section__content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
                {renderedSituationCards.map((card, index) => {
                  const Icon = CATEGORY_ICONS[index % CATEGORY_ICONS.length];
                  return (
                    <Card
                      key={card.title}
                      className={`h-full rounded-[12px] border border-[#D8C08B] bg-[#F6F1E6] shadow-[0_8px_20px_rgba(60,52,31,0.08)] ${
                        isNasledstvennyeCategory || isConsumerProtectionCategory ? "cursor-pointer" : ""
                      }`}
                      onClick={
                        isNasledstvennyeCategory
                          ? handleCallClick
                          : isConsumerProtectionCategory
                          ? () => openQuickQuestionModal({ topic: `${data.categoryLabel}: ${card.title}` })
                          : undefined
                      }
                    >
                      <CardContent className="p-5 md:p-6 pt-5 md:pt-6 h-full flex flex-col items-center text-center gap-3">
                        <Icon className="h-12 w-12 text-[#111827]" strokeWidth={2} />
                        <h3 className="font-semibold text-[16px] md:text-[17px] text-slate-900">{card.title}</h3>
                        <p className="text-[13px] md:text-[14px] text-slate-600 leading-relaxed flex-1">
                          {card.description ?? "Подготовим документы и защитим позицию в переговорах и суде"}
                        </p>
                        <Button
                          asChild={isCallOnlyCta}
                          size="lg"
                          className="mt-2 h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] px-6 text-[14px] text-slate-900 shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f] hover:shadow-[0_4px_12px_rgba(111,83,15,0.2)]"
                          onClick={
                            isCallOnlyCta
                              ? undefined
                              : isNasledstvennyeCategory
                              ? () => openQuickQuestionModal({ topic: `${data.categoryLabel}: ${card.title}` })
                              : undefined
                          }
                        >
                          {isCallOnlyCta ? (
                            <a href={callHref} onClick={handleCallLinkClick}>
                              Получить консультацию
                            </a>
                          ) : isNasledstvennyeCategory ? (
                            "Получить консультацию"
                          ) : (
                            <Link to={card.path}>Получить консультацию</Link>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
            {!isBankrotstvoMerged && !isTrudovyeCategory && (
              <div className="mt-7 md:mt-8 rounded-[12px] border border-[#D8C08B] bg-[#F7F2E8] p-6 text-center shadow-[0_6px_16px_rgba(60,52,31,0.08)]">
                <p className="font-semibold text-body-mobile md:text-body text-slate-900">
                  Каждая неделя без четкой позиции — это риск потерять время, деньги и сильную переговорную позицию.
                </p>
                <p className="mt-2 text-[14px] md:text-[15px] text-slate-600 font-medium">
                  Чем раньше вы фиксируете факты и стратегию, тем выше шанс решить вопрос в вашу пользу.
                </p>
              </div>
            )}
          </div>
        </section>

        {isTrudovyeCategory && (
          <section className="section">
            <div className="container">
              <div className="section__header max-w-3xl mx-auto text-center">
                <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                  Мы защищаем работников в трудовых спорах
                </h2>
                <p className="text-body-mobile md:text-body text-muted-foreground">
                  Когда работодатель нарушает ваши права, важно действовать юридически точно и без лишних рисков.
                </p>
                <p className="text-body-mobile md:text-body text-muted-foreground">
                  Мы берем на себя юридическую часть конфликта и сопровождаем вас, чтобы вы понимали, что происходит
                  на каждом этапе.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-[16px] md:text-[18px] font-semibold text-slate-900 text-center">
                    Что мы делаем
                  </h3>
                  <ul className="mt-5 space-y-3 text-[13px] md:text-[14px] text-slate-700">
                    {trudovyeWorkSteps.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-0.5 h-5 w-5 rounded border border-[#D8C08B] bg-[#F7F2E8] flex items-center justify-center">
                          <Check className="h-3 w-3 text-accent" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[16px] md:text-[18px] font-semibold text-slate-900 text-center">
                    Что вы можете получить
                  </h3>
                  <ul className="mt-5 space-y-3 text-[13px] md:text-[14px] text-slate-700">
                    {trudovyeOutcomes.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-0.5 h-5 w-5 rounded border border-[#D8C08B] bg-[#F7F2E8] flex items-center justify-center">
                          <Check className="h-3 w-3 text-accent" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-8 text-center text-small text-muted-foreground">
                Каждый трудовой спор индивидуален.
                <br />
                Мы сначала анализируем документы и обстоятельства, и только после этого предлагаем возможные варианты
                действий.
              </div>
              <div className="mt-6 flex justify-center">
                <Button
                  size="lg"
                  className="w-full sm:w-auto border border-[#b8911f] bg-[#C9A227] text-white shadow-[0_8px_18px_rgba(201,162,39,0.35)] hover:border-[#a8831a] hover:bg-[#c09a23] active:bg-[#a9851d] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  onClick={isCallOnlyCta ? handleCallClick : () => openQuickQuestionModal({ topic: data.heroTitle })}
                >
                  Обсудить свою ситуацию
                </Button>
              </div>
            </div>
          </section>
        )}

        {isTrudovyeCategory && (
          <section className="section">
            <div className="container">
              <div className="section__header max-w-3xl mx-auto text-center">
                <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                  5 шагов для решения трудового спора
                </h2>
                <p className="text-body-mobile md:text-body text-muted-foreground">
                  Каждое дело начинаем с анализа ситуации и выстраиваем защиту с учетом реальных рисков, позиции
                  работодателя и судебной практики
                </p>
              </div>
              <div className="mt-8 border-t border-[#E6DDCC]">
                {trudovyeProcessSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="flex items-start gap-4 md:gap-6 py-6 md:py-7 border-b border-[#E6DDCC]"
                  >
                    <div className="h-12 w-12 rounded-full border border-[#D8C08B] bg-[#F7F2E8] flex items-center justify-center text-[14px] font-semibold text-slate-900">
                      {index + 1}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-[15px] md:text-[16px] font-semibold text-slate-900">{step.title}</h3>
                      <p className="text-[13px] md:text-[14px] text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {isTrudovyeCategory && (
          <section className="section">
            <div className="container">
              <div className="section__header max-w-3xl mx-auto text-center">
                <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                  Почему нам доверяют в трудовых спорах
                </h2>
                <p className="text-body-mobile md:text-body text-muted-foreground">
                  Работаем системно: стратегия, доказательства, переговоры и суд.
                  <br />
                  Подключаем команду коллегии под вашу задачу
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trudovyeWhyUs.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="text-center px-4 md:px-5">
                      <div className="mx-auto h-14 w-14 flex items-center justify-center">
                        <Icon className="h-10 w-10 text-accent" strokeWidth={1.6} />
                      </div>
                      <h3 className="mt-4 text-[15px] md:text-[16px] font-semibold text-slate-900">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[13px] md:text-[14px] text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-10 text-center text-small text-muted-foreground">
                Готовы обсудить вашу ситуацию и условия сопровождения?
              </div>
              <div className="mt-6 flex justify-center">
                <Button
                  size="lg"
                  className="w-full sm:w-auto border border-[#b8911f] bg-[#C9A227] text-white shadow-[0_8px_18px_rgba(201,162,39,0.35)] hover:border-[#a8831a] hover:bg-[#c09a23] active:bg-[#a9851d] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  onClick={isCallOnlyCta ? handleCallClick : () => openQuickQuestionModal({ topic: data.heroTitle })}
                >
                  Обсудить мою ситуацию с адвокатом
                </Button>
              </div>
            </div>
          </section>
        )}

        {isTrudovyeCategory && trudovyeShowcaseCases.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="section__header max-w-3xl mx-auto text-center">
                <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                  Кейсы из практики по трудовым спорам
                </h2>
                <p className="text-body-mobile md:text-body text-muted-foreground">
                  Мы не раскрываем персональные данные клиентов. Публикация осуществляется с согласия клиентов
                </p>
              </div>
              <div className={`mt-8 ${trudovyeCasesLayout}`}>
                {trudovyeShowcaseCases.map((caseItem, index) => (
                  <Link
                    key={`${caseItem.title}-${index}`}
                    to={caseItem.caseUrl}
                    className={`block h-full text-inherit no-underline ${
                      trudovyeShowcaseCases.length < 3 ? "w-full max-w-[360px]" : ""
                    }`}
                  >
                    <Card className="h-full rounded-[14px] border border-[#D8C08B] bg-[#F8F4EA] shadow-[0_6px_16px_rgba(60,52,31,0.08)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(60,52,31,0.12)]">
                      <CardContent className="p-6 h-full flex flex-col">
                        <div className="flex justify-center">
                          <div className="h-24 w-24 md:h-28 md:w-28 border border-[#D8C08B] bg-white text-[11px] text-slate-500 flex items-center justify-center text-center leading-tight overflow-hidden">
                            {caseItem.scanUrl ? (
                              <img
                                src={caseItem.scanUrl}
                                alt={`Скан решения: ${caseItem.title}`}
                                className="h-full w-full object-contain"
                                loading="lazy"
                              />
                            ) : (
                              <>
                                Скан
                                <br />
                                решения
                              </>
                            )}
                          </div>
                        </div>
                        <h3 className="mt-4 text-[15px] font-semibold text-slate-900">{caseItem.title}</h3>
                        <div className="mt-4 text-[13px] text-slate-700">
                          <div className="text-slate-500">Ситуация:</div>
                          <div className="font-semibold text-slate-900">{caseItem.situation}</div>
                        </div>
                        <div className="mt-3 text-[13px] text-slate-700">
                          <div className="text-slate-500">Что сделали:</div>
                          <div className="font-semibold text-slate-900">{caseItem.actions}</div>
                        </div>
                        <div className="mt-3 text-[13px] text-slate-700">
                          <div className="text-slate-500">Результат:</div>
                          <div className="font-semibold text-slate-900">{caseItem.result}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              <div className="mt-8 text-center text-small text-muted-foreground">
                Ваша ситуация может быть похожей. Давайте обсудим ваш случай на консультации
              </div>
              <div className="mt-6 flex justify-center">
                <Button
                  size="lg"
                  className="h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] px-6 text-[14px] text-white shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f] hover:shadow-[0_4px_12px_rgba(111,83,15,0.2)]"
                  onClick={() => openQuickQuestionModal({ topic: data.heroTitle })}
                >
                  Получить консультацию по трудовому спору
                </Button>
              </div>
            </div>
          </section>
        )}

        {isBankrotstvoMerged && (
          <section className="section">
            <div className="container">
              <div className="section__header max-w-3xl mx-auto text-center">
                <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                  Как проходит процедура банкротства с нашим сопровождением
                </h2>
                <p className="text-body-mobile md:text-body text-muted-foreground">
                  Мы берем на себя юридическую часть процедуры и сопровождаем вас на каждом этапе — от первой консультации
                  до завершения дела в суде
                </p>
              </div>
              <div className="mt-8 border-t border-[#E6DDCC]">
                {bankrotstvoProcessSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="flex items-start gap-4 md:gap-6 py-6 md:py-7 border-b border-[#E6DDCC]"
                  >
                    <div className="h-12 w-12 rounded-full border border-[#D8C08B] bg-[#F7F2E8] flex items-center justify-center text-[14px] font-semibold text-slate-900">
                      {index + 1}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-[15px] md:text-[16px] font-semibold text-slate-900">{step.title}</h3>
                      <p className="text-[13px] md:text-[14px] text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center text-small text-muted-foreground">
                <p>Конкретный порядок работы и условия определяются после анализа ситуации.</p>
                <p>Оставьте заявку на консультацию, адвокат свяжется с вами и подробно ответит на ваши вопросы.</p>
              </div>
              <div className="mt-6 flex justify-center">
                <Button
                  size="lg"
                  className="h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] px-6 text-[14px] text-white shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f] hover:shadow-[0_4px_12px_rgba(111,83,15,0.2)]"
                  onClick={() => openQuickQuestionModal({ topic: data.heroTitle })}
                >
                  Получить консультацию по банкротству
                </Button>
              </div>
            </div>
          </section>
        )}

        {isBankrotstvoMerged && (
          <section className="section">
            <div className="container">
              <div className="section__header max-w-3xl mx-auto text-center">
                <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                  Что важно знать о последствиях банкротства физических лиц
                </h2>
                <p className="text-body-mobile md:text-body text-muted-foreground">
                  Мы заранее рассказываем о юридических последствиях процедуры, чтобы вы принимали решение осознанно и
                  без неприятных сюрпризов
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="rounded-[14px] border border-[#D8C08B] bg-white shadow-[0_6px_16px_rgba(60,52,31,0.08)]">
                  <CardContent className="p-6 md:p-7">
                    <h3 className="text-[15px] md:text-[16px] font-semibold text-slate-900 text-center">
                      Что меняется после начала процедуры
                    </h3>
                    <div className="mt-6 space-y-4">
                      {bankrotstvoEffectsLeft.map((item) => (
                        <div key={item.title} className="flex gap-3">
                          <span className="mt-1 h-7 w-7 rounded-full border border-[#D8C08B] bg-[#F7F2E8] flex items-center justify-center">
                            <Pin className="h-4 w-4 text-accent" />
                          </span>
                          <div>
                            <p className="text-[14px] md:text-[15px] font-semibold text-slate-900">{item.title}</p>
                            <p className="text-[13px] md:text-[14px] text-slate-600 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card className="rounded-[14px] border border-[#D8C08B] bg-white shadow-[0_6px_16px_rgba(60,52,31,0.08)]">
                  <CardContent className="p-6 md:p-7">
                    <h3 className="text-[15px] md:text-[16px] font-semibold text-slate-900 text-center">
                      Основные последствия банкротства
                    </h3>
                    <div className="mt-6 space-y-4">
                      {bankrotstvoEffectsRight.map((item) => (
                        <div key={item.title} className="flex gap-3">
                          <span className="mt-1 h-7 w-7 rounded-full border border-[#D8C08B] bg-[#F7F2E8] flex items-center justify-center">
                            <X className="h-4 w-4 text-accent" />
                          </span>
                          <div>
                            <p className="text-[14px] md:text-[15px] font-semibold text-slate-900">{item.title}</p>
                            <p className="text-[13px] md:text-[14px] text-slate-600 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-10 text-center">
                <h3 className="text-[15px] md:text-[16px] font-semibold text-slate-900">
                  Что по-прежнему будет можно:
                </h3>
                <ul className="mt-5 max-w-2xl mx-auto space-y-2 text-left text-[13px] md:text-[14px] text-slate-700">
                  {bankrotstvoStillPossible.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-0.5 h-5 w-5 rounded border border-[#D8C08B] bg-white flex items-center justify-center">
                        <Check className="h-3 w-3 text-accent" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 text-center text-small text-muted-foreground">
                <p>Конкретные последствия и ограничения зависят от вашей ситуации.</p>
                <p>На консультации мы подробно объясняем, что будет применимо именно в вашем случае.</p>
              </div>
              <div className="mt-6 flex justify-center">
                <Button
                  size="lg"
                  className="h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] px-6 text-[14px] text-white shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f] hover:shadow-[0_4px_12px_rgba(111,83,15,0.2)]"
                  onClick={() => openQuickQuestionModal({ topic: data.heroTitle })}
                >
                  Оценить мою ситуацию
                </Button>
              </div>
            </div>
          </section>
        )}

        {isBankrotstvoMerged && (
          <section className="section">
            <div className="container">
              <div className="section__header max-w-3xl mx-auto text-center">
                <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Почему выбирают нас</h2>
                <p className="text-body-mobile md:text-body text-muted-foreground">
                  Юридическое сопровождение банкротства с понятными условиями и прозрачной оплатой
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bankrotstvoWhyUs.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="text-center px-4 md:px-5">
                      <div className="mx-auto h-14 w-14 flex items-center justify-center">
                        <Icon className="h-10 w-10 text-accent" strokeWidth={1.6} />
                      </div>
                      <h3 className="mt-4 text-[15px] md:text-[16px] font-semibold text-slate-900">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[13px] md:text-[14px] text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-10 text-center text-small text-muted-foreground">
                Готовы обсудить вашу ситуацию и условия сопровождения?
              </div>
              <div className="mt-6 flex justify-center">
                <Button
                  size="lg"
                  className="h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] px-6 text-[14px] text-white shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f] hover:shadow-[0_4px_12px_rgba(111,83,15,0.2)]"
                  onClick={() => openQuickQuestionModal({ topic: data.heroTitle })}
                >
                  Получить консультацию по банкротству
                </Button>
              </div>
            </div>
          </section>
        )}

        {isBankrotstvoMerged && bankrotstvoShowcaseCases.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="section__header max-w-3xl mx-auto text-center">
                <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                  Кейсы из практики по банкротству физических лиц
                </h2>
                <p className="text-body-mobile md:text-body text-muted-foreground">
                  Мы не раскрываем персональные данные клиентов. Публикация осуществляется с согласия клиентов
                </p>
              </div>
              <div className={`mt-8 ${bankrotstvoCasesLayout}`}>
                {bankrotstvoShowcaseCases.map((caseItem, index) => (
                  <Link
                    key={caseItem.title ?? caseItem.fallbackId ?? index}
                    to={caseItem.caseUrl}
                    className={`block h-full text-inherit no-underline ${
                      bankrotstvoShowcaseCases.length < 3 ? "w-full max-w-[360px]" : ""
                    }`}
                  >
                    <Card className="h-full rounded-[14px] border border-[#D8C08B] bg-[#F8F4EA] shadow-[0_6px_16px_rgba(60,52,31,0.08)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(60,52,31,0.12)]">
                      <CardContent className="p-6 h-full flex flex-col">
                        <div className="flex items-start justify-between gap-4">
                          <div className="text-xs text-slate-500">
                            № дела
                            <div className="mt-1 text-[13px] font-semibold text-slate-900">
                              {caseItem.caseNumber ?? "Не раскрывается"}
                            </div>
                          </div>
                          <div className="h-24 w-24 md:h-28 md:w-28 border border-[#D8C08B] bg-white text-[11px] text-slate-500 flex items-center justify-center text-center leading-tight overflow-hidden">
                            {caseItem.scanUrl ? (
                              <img
                                src={caseItem.scanUrl}
                                alt={`Скан решения: ${caseItem.title}`}
                                className="h-full w-full object-contain"
                                loading="lazy"
                              />
                            ) : (
                              <>
                                Скан
                                <br />
                                решения
                              </>
                            )}
                          </div>
                        </div>
                        <h3 className="mt-4 text-[15px] font-semibold text-slate-900">{caseItem.title}</h3>
                        <div className="mt-4 text-[13px] text-slate-700">
                          <div className="text-slate-500">Сумма долга:</div>
                          <div className="font-semibold text-slate-900">
                            {caseItem.debtAmount ?? "Не раскрывается"}
                          </div>
                        </div>
                        <div className="mt-3 text-[13px] text-slate-700">
                          <div className="text-slate-500">Результат:</div>
                          <div className="font-semibold text-slate-900">{caseItem.result}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              <div className="mt-8 text-center text-small text-muted-foreground">
                Ваша ситуация может быть похожей. Давайте обсудим ваш случай на консультации
              </div>
              <div className="mt-6 flex justify-center">
                <Button
                  size="lg"
                  className="h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] px-6 text-[14px] text-white shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f] hover:shadow-[0_4px_12px_rgba(111,83,15,0.2)]"
                  onClick={() => openQuickQuestionModal({ topic: data.heroTitle })}
                >
                  Получить консультацию по банкротству
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Экран 3: Команда */}
        {resolvedTeam.length > 0 && (
          <section className="section bg-muted/30">
            <div className="container">
              <div className="section__header max-w-3xl mx-auto text-center">
                {isBankrotstvoMerged ? (
                  <>
                    <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                      Кто будет сопровождать ваше дело о банкротстве
                    </h2>
                    <p className="text-muted-foreground">
                      Процедура банкротства физических лиц сопровождается профильными юристами и адвокатами коллегии
                    </p>
                  </>
                ) : isTrudovyeCategory ? (
                  <>
                    <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Кто будет заниматься вашим делом</h2>
                    <p className="text-muted-foreground">
                      Вашу ситуацию рассматривают и сопровождают адвокаты и юристы с опытом ведения трудовых споров
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Кто ведет ваши дела</h2>
                    <p className="text-muted-foreground">
                      Вашим делом занимаются практикующие адвокаты с опытом именно в этой категории споров
                    </p>
                  </>
                )}
              </div>
              {isBankrotstvoMerged ? (
                <div
                  className={
                    bankrotstvoTeamCards.length > 2
                      ? "section__content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
                      : "section__content grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr justify-items-center max-w-[760px] mx-auto"
                  }
                >
                  {bankrotstvoTeamCards.map((card) => (
                    <Card
                      key={card.slug}
                      className="h-full rounded-[14px] border border-[#D8C08B] bg-white shadow-[0_10px_24px_rgba(60,52,31,0.08)]"
                    >
                      <CardContent className="p-6 h-full flex flex-col items-center text-center">
                        <div className="w-full overflow-hidden rounded-[12px] border border-[#E6DDCC] bg-white">
                          <img
                            src={card.photo}
                            alt={card.name}
                            className="h-[320px] w-full object-cover object-center md:h-[340px] lg:h-[360px]"
                            loading="lazy"
                          />
                        </div>
                        <h3 className="mt-5 text-[16px] md:text-[18px] font-semibold text-slate-900">
                          {card.name}
                        </h3>
                        <span className="mt-2 inline-flex items-center rounded-full bg-[#C9A227] px-4 py-1 text-[12px] font-semibold text-white">
                          {card.badge}
                        </span>
                        <div className="mt-3 text-[13px] font-semibold text-slate-800">{card.roleTitle}</div>
                        <div className="mt-2 text-[13px] text-slate-700">{card.experience}</div>
                        <ul className="mt-4 space-y-2 text-[13px] text-slate-700 text-left list-disc list-inside">
                          {card.bullets.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        <div className="mt-auto w-full pt-6 flex justify-center">
                          <Button
                            asChild
                            size="lg"
                            className="h-12 w-full rounded-[12px] border border-[#b8911f] bg-[#C9A227] px-6 text-[14px] text-white shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f] hover:shadow-[0_4px_12px_rgba(111,83,15,0.2)]"
                          >
                            <Link to={`/team/${card.slug}`}>{card.cta}</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : isTrudovyeCategory ? (
                <div className="section__content grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr justify-items-center max-w-[760px] mx-auto">
                  {trudovyeTeamCards.map((card) => (
                    <Card
                      key={card.slug}
                      className="h-full rounded-[14px] border border-[#D8C08B] bg-white shadow-[0_10px_24px_rgba(60,52,31,0.08)]"
                    >
                      <CardContent className="p-6 h-full flex flex-col items-center text-center">
                        <div className="w-full overflow-hidden rounded-[12px] border border-[#E6DDCC] bg-white">
                          <img
                            src={card.photo}
                            alt={card.name}
                            className="h-[320px] w-full object-cover object-center md:h-[340px] lg:h-[360px]"
                            loading="lazy"
                          />
                        </div>
                        <h3 className="mt-5 text-[16px] md:text-[18px] font-semibold text-slate-900">
                          {card.name}
                        </h3>
                        <span className="mt-2 inline-flex items-center rounded-full bg-[#C9A227] px-4 py-1 text-[12px] font-semibold text-white">
                          {card.badge}
                        </span>
                        <div className="mt-3 text-[13px] font-semibold text-slate-800">{card.roleTitle}</div>
                        <div className="mt-2 text-[13px] text-slate-700">{card.experience}</div>
                        <ul className="mt-4 space-y-2 text-[13px] text-slate-700 text-left list-disc list-inside">
                          {card.bullets.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        <div className="mt-auto w-full pt-6 flex justify-center">
                          <Button
                            asChild
                            size="lg"
                            className="h-12 w-full rounded-[12px] border border-[#b8911f] bg-[#C9A227] px-6 text-[14px] text-white shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f] hover:shadow-[0_4px_12px_rgba(111,83,15,0.2)]"
                          >
                            <Link to={`/team/${card.slug}`}>{card.cta}</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className={teamGridClassName}>
                  {resolvedTeam.map((member) => (
                    <Card
                      key={member.slug}
                      className={teamCardClassName}
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
                          <span className="inline-flex items-center rounded-full bg-[#C9A227] px-4 py-1 text-[12px] font-semibold text-white">
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
                            className={`w-full md:w-auto h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] text-[14px] ${
                              isBankrotstvoMerged || isTrudovyeCategory ? "text-white" : "text-slate-900"
                            } shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f] hover:shadow-[0_4px_12px_rgba(111,83,15,0.2)]`}
                          >
                            <Link to={`/team/${member.slug}`}>Подробнее об адвокате</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              {isBankrotstvoMerged || isTrudovyeCategory ? (
                <p className="mt-8 text-center text-small text-muted-foreground">
                  Сопровождение осуществляется командой специалистов. В зависимости от ситуации к сопровождению
                  подключаются профильные специалисты.
                </p>
              ) : (
                <p className="mt-8 text-center text-small text-muted-foreground">
                  Все наши юристы проходят ежегодную аттестацию и имеют доступ к базе судебной практики
                </p>
              )}
            </div>
          </section>
        )}


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
                  {cases.map((caseItem) => {
                    const decisionPreview = caseItem.decisionPreview;
                    const hasDecision = Boolean(decisionPreview);
                    return (
                      <Card
                        key={caseItem.title}
                        className="h-full border border-slate-200 bg-white shadow-[0_10px_25px_rgba(15,23,42,0.06)] transition-all hover:border-[#C9A227] hover:shadow-[0_16px_40px_rgba(201,162,39,0.18)]"
                      >
                        <CardContent className="pt-6 h-full">
                          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
                            <div className="flex-1">
                              <h3 className="font-semibold text-body-mobile md:text-body text-slate-900">{caseItem.title}</h3>
                              <div className="mt-4 space-y-3 text-small text-muted-foreground leading-relaxed">
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
                              {!hasDecision && (
                                <div className="mt-6">
                                  <Button
                                    asChild
                                    size="lg"
                                    variant="outline"
                                    className="h-11 w-full rounded-[12px] border-[#C9A227] text-slate-900 hover:border-[#b8911f] hover:bg-[#F4E7C2]"
                                  >
                                    <Link to={caseItem.slug ? `/cases/${caseItem.slug}` : "/keisy"}>
                                      Смотреть кейсы
                                    </Link>
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
                                      <Link to={caseItem.slug ? `/cases/${caseItem.slug}` : "/keisy"}>
                                        Смотреть кейсы
                                      </Link>
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
              </>
            )}

            <div className={shouldShowCases ? "mt-12" : undefined}>
              <div className="section__header max-w-3xl text-center mx-auto">
                <h3 className="font-serif text-h3-mobile md:text-h3 font-semibold">Отзывы клиентов</h3>
                {isBankrotstvoMerged && (
                  <p className="mt-2 text-muted-foreground">
                    Мы не раскрываем персональные данные клиентов. Отзывы публикуются с их согласия
                  </p>
                )}
              </div>
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
              <div className="section__content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {reviews.map((review, reviewIndex) => (
                  <Card key={`${review.name}-${reviewIndex}`} className="h-full">
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
              <div className="mt-8 flex justify-center">
                <Button
                  size="lg"
                  className={`w-full sm:w-auto bg-accent ${
                    isBankrotstvoMerged || isTrudovyeCategory ? "text-white" : "text-primary"
                  } shadow-[0_8px_18px_rgba(201,162,39,0.35)] hover:bg-[#c09a23] active:bg-[#a9851d] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white`}
                  onClick={isCallOnlyCta ? handleCallClick : () => openQuickQuestionModal({ topic: data.categoryLabel })}
                >
                  {isBankrotstvoMerged ? "Получить консультацию по банкротству" : "Обсудить с адвокатом свою ситуацию"}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {!isBankrotstvoMerged && !isTrudovyeCategory && (
          <>
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
          </>
        )}

        {/* Экран 7: FAQ */}
        <section className="section bg-muted/30">
          <div className="container">
            <div className="section__header max-w-4xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">FAQ — Частые вопросы</h2>
            </div>
            <Accordion type="single" collapsible className="section__content space-y-4">
              {resolvedFaqItems.map((item, index) => (
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
              <p className="text-muted-foreground">Не нашли свой вопрос? Оставьте заявку и мы оценим вашу ситуацию</p>
              <Button
                size="lg"
                className={`w-full sm:w-auto border border-[#b8911f] bg-accent ${
                  isBankrotstvoMerged || isTrudovyeCategory ? "text-white" : "text-primary"
                } shadow-[0_8px_18px_rgba(201,162,39,0.35)] hover:border-[#a8831a] hover:bg-[#c09a23] active:bg-[#a9851d] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
                onClick={isCallOnlyCta ? handleCallClick : () => openQuickQuestionModal({ topic: data.heroTitle })}
              >
                Получить оценку перспектив
              </Button>
            </div>
          </div>
        </section>

        {/* Экран 8: Финальная форма */}
        <section className="section" id="final-cta">
          <div className="container">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_520px] lg:items-start lg:gap-14">
              <div className="max-w-2xl space-y-6">
                <div className="section__header max-w-2xl !mb-0">
                  {isTrudovyeCategory ? (
                    <>
                      <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                        Обсудите вашу ситуацию с адвокатом по трудовым спорам
                      </h2>
                      <p className="text-muted-foreground">
                        Оставьте контакты — адвокат по трудовым спорам свяжется с вами, уточнит детали ситуации и
                        подскажет возможные варианты действий
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                        Получите консультацию по банкротству физических лиц
                      </h2>
                      <p className="text-muted-foreground">
                        Позвоните нам — адвокат по банкротству физических лиц ответит на вопросы, уточнит детали и
                        предложит варианты действий
                      </p>
                    </>
                  )}
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
                    <div className="text-sm text-muted-foreground">
                      Телефон для консультации:
                    </div>
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
                        <p className="category-contact-address text-accent font-normal">
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
