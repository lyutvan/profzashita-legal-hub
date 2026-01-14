import { SITE } from "@/config/site";
import { audienceServices, getCategoriesForAudience } from "@/data/services-audiences";
import { teamMembers } from "@/data/team";
import { sharedReviews } from "@/data/shared-reviews";

export interface CriminalServiceEntry {
  title: string;
  slug: string;
  path: string;
  category: string;
  description?: string;
}

export interface CriminalPlanStep {
  title: string;
  description: string;
}

export interface CriminalCaseItem {
  situation: string;
  actions: string;
  result: string;
}

export interface CriminalPriceFormat {
  title: string;
  description: string;
}

export interface CriminalWhyUsItem {
  title: string;
  description: string;
  icon: "shield" | "clock" | "trend" | "users" | "award" | "check";
}

export interface CriminalTeamCard {
  slug: string;
  name: string;
  role: string;
  experience?: string;
  bullets: string[];
  photo?: string;
}

export interface CriminalFaqItem {
  question: string;
  answer: string;
}

export interface CriminalServicePageData {
  entry: CriminalServiceEntry;
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  breadcrumbs: Array<{ label: string; path?: string }>;
  breadcrumbSchema: Array<{ name: string; url: string }>;
  categoryLabel: string;
  categoryAnchor?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBenefits: string[];
  offer24: string[];
  offer48: string[];
  triggers: string[];
  planSteps: CriminalPlanStep[];
  included: string[];
  cases: CriminalCaseItem[];
  practiceNote: string;
  practiceHighlights: string[];
  priceNote: string;
  priceFactors: string[];
  priceFormats: CriminalPriceFormat[];
  whyUs: CriminalWhyUsItem[];
  team: CriminalTeamCard[];
  reviews: Array<{ name: string; date: string; text: string; rating: number }>;
  faqs: CriminalFaqItem[];
  disclaimer: string;
}

const formatCategoryTitle = (value: string) => {
  return value.replace(/\s*\(Глава[^)]*\)/gi, "").trim();
};

const parseServiceTitle = (title: string) => {
  const match = title.match(/^(.*)\(ст\.?\s*([0-9.]+)\s*УК РФ\)\s*$/i);
  if (match) {
    return {
      serviceName: match[1].trim(),
      articleNumber: match[2]
    };
  }
  return { serviceName: title.trim(), articleNumber: "" };
};

const clampMetaDescription = (text: string) => {
  const min = 140;
  const max = 160;
  if (text.length > max) {
    return `${text.slice(0, max - 1).replace(/[\s,.;-]+$/g, "")}.`;
  }
  if (text.length < min) {
    const additions = [
      " Помогаем на стадиях проверки, следствия и суда.",
      " Работаем конфиденциально и по договору."
    ];
    let updated = text;
    for (const add of additions) {
      if (updated.length >= min) break;
      updated += add;
    }
    if (updated.length > max) {
      return `${updated.slice(0, max - 1).replace(/[\s,.;-]+$/g, "")}.`;
    }
    return updated;
  }
  return text;
};

const buildMetaDescription = (serviceName: string, articleNumber: string) => {
  const namePart = articleNumber
    ? `по статье ${articleNumber} УК РФ (${serviceName.toLowerCase()})`
    : `по делу ${serviceName.toLowerCase()}`;
  const base = `Адвокат ${namePart} в Москве: срочное подключение, стратегия защиты, участие в следствии и суде.`;
  return clampMetaDescription(base);
};

const baseHeroBenefits = [
  "Срочное подключение и защита на стадии проверки",
  "Стратегия защиты с учетом практики следствия и суда",
  "Контроль процессуальных сроков и доказательств",
  "Участие в следственных действиях и судах",
  "Конфиденциальность и работа по договору"
];

const baseOffer24 = [
  "Свяжемся и оценим риски по материалам дела",
  "Подготовим первичную позицию и линию защиты",
  "Подадим ходатайства и обеспечим допуск к делу",
  "Согласуем план действий и приоритеты"
];

const baseOffer48 = [
  "Организуем участие в ключевых следственных действиях",
  "Соберем документы и доказательства для защиты",
  "Оценим перспективы переквалификации и смягчения",
  "Определим стратегию по мере пресечения"
];

const baseTriggers = [
  "Вас вызвали на допрос или очную ставку",
  "Проходит обыск, выемка или задержание",
  "Избрана мера пресечения или грозит арест",
  "Возбуждено уголовное дело или проводится проверка",
  "Есть риск переквалификации на более тяжкую статью",
  "Нужна защита в суде или обжалование решения",
  "Требуется срочный выезд адвоката",
  "Нужно подготовить позицию для объяснений"
];

const basePlanSteps: CriminalPlanStep[] = [
  {
    title: "Экстренная оценка ситуации",
    description: "Изучаем вводные данные, оцениваем риски, формируем первичную защитную позицию."
  },
  {
    title: "Работа на стадии проверки",
    description: "Готовим объяснения, ходатайства, фиксируем доказательства и минимизируем риски возбуждения дела."
  },
  {
    title: "Защита на следствии",
    description: "Участвуем в допросах, экспертизах, следственных действиях, собираем доказательственную базу."
  },
  {
    title: "Судебная защита",
    description: "Представляем позицию в суде, заявляем ходатайства, добиваемся смягчения или прекращения."
  },
  {
    title: "Обжалование",
    description: "Готовим апелляцию/кассацию, корректируем стратегию с учетом судебной практики."
  }
];

const baseIncluded = [
  "Выезд адвоката и участие в следственных действиях",
  "Анализ материалов, постановлений, протоколов",
  "Подготовка ходатайств, жалоб, заявлений",
  "Защита на допросах, очных ставках, экспертизах",
  "Построение стратегии защиты и переговоров",
  "Контроль сроков и фиксация процессуальных нарушений",
  "Подготовка к суду и участие в заседаниях"
];

const basePracticeHighlights = [
  "Оперативное подключение и защита при задержании",
  "Работа с доказательствами и экспертизами",
  "Тактика переговоров и процессуальная защита",
  "Снижение рисков более тяжкой квалификации"
];

const basePriceFactors = [
  "Стадия дела и срочность подключения",
  "Объем материалов и количество эпизодов",
  "Необходимость выездов и экспертиз",
  "Количество следственных действий и заседаний",
  "Сложность переговоров и процессуальных рисков"
];

const basePriceFormats: CriminalPriceFormat[] = [
  {
    title: "Разовая задача",
    description: "Экстренное подключение, подготовка ходатайств, участие в конкретном действии."
  },
  {
    title: "Ведение дела",
    description: "Полное сопровождение от проверки до суда и обжалования."
  },
  {
    title: "Срочная защита",
    description: "Приоритетный выезд, ежедневная коммуникация, ускоренная подготовка позиции."
  }
];

const baseWhyUs: CriminalWhyUsItem[] = [
  {
    title: "Опыт с 2005 года",
    description: "Ведем сложные уголовные дела и знаем практику следствия и суда.",
    icon: "shield"
  },
  {
    title: "Работаем 24/7",
    description: "Срочные подключения и выезды, когда время критично.",
    icon: "clock"
  },
  {
    title: "Результативные стратегии",
    description: "Строим защиту на фактах, экспертизах и процессуальной точности.",
    icon: "trend"
  },
  {
    title: "Команда специалистов",
    description: "Собираем профильных экспертов под конкретную статью.",
    icon: "users"
  },
  {
    title: "Премиальный сервис",
    description: "Четкая коммуникация, конфиденциальность, контроль сроков.",
    icon: "award"
  },
  {
    title: "Прозрачность",
    description: "Договор, понятный объем работ и регулярная отчетность.",
    icon: "check"
  }
];

const buildFaqs = (serviceName: string, articleNumber: string): CriminalFaqItem[] => {
  const name = serviceName.toLowerCase();
  const articlePart = articleNumber ? ` по статье ${articleNumber} УК РФ` : "";
  return [
    {
      question: `Когда нужен адвокат${articlePart}?`,
      answer: "Чем раньше вы подключите защиту, тем больше возможностей повлиять на позицию следствия и суд."
    },
    {
      question: `Можно ли изменить квалификацию${articlePart}?`,
      answer: "Возможность переквалификации зависит от доказательств и тактики защиты. Мы оцениваем риски и предлагаем сценарии."
    },
    {
      question: "Что делать при задержании или обыске?",
      answer: "Важно сохранять спокойствие, не давать лишних объяснений и сразу обеспечить допуск адвоката."
    },
    {
      question: "Как формируется стратегия защиты?",
      answer: "Мы анализируем материалы дела, экспертизы и процессуальные документы, после чего согласуем план действий."
    },
    {
      question: `Сколько времени занимает защита${articlePart}?`,
      answer: "Сроки зависят от стадии дела, количества эпизодов и загруженности суда. Точные сроки фиксируем после анализа материалов."
    },
    {
      question: `Можно ли добиться прекращения дела${articlePart}?`,
      answer: "В некоторых случаях возможно прекращение или смягчение, если есть основания и правильно выстроена защита."
    }
  ];
};

const defaultDisclaimer = "Результат зависит от фактических обстоятельств дела, позиции следствия и суда, а также полноты предоставленных материалов.";

const DEFAULT_TEAM_SLUGS = ["lyutikov", "sotnikov"];

const getTeamByCategory = (): CriminalTeamCard[] => {
  return DEFAULT_TEAM_SLUGS
    .map((slug) => teamMembers.find((member) => member.slug === slug))
    .filter((member): member is NonNullable<typeof member> => Boolean(member))
    .map((member) => ({
      slug: member.slug,
      name: member.name,
      role: member.role,
      experience: member.experienceText,
      bullets: member.specializations.slice(0, 4),
      photo: member.photo
    }));
};

const getCategoryAnchor = (category: string) => {
  const categories = getCategoriesForAudience("criminal");
  const formatted = formatCategoryTitle(category).toLowerCase();
  const match = categories.find((item) => item.title.toLowerCase() === formatted);
  return match?.slug;
};

const legacySlugMap: Record<string, string> = {
  "statya-105": "advokat-po-ubiystvo-105",
  "statya-109": "advokat-po-prichinenie-smerti-po-neostorozhnosti-109",
  "statya-110": "advokat-po-dovedenie-do-samoubiystva-110",
  "statya-111": "advokat-po-umyshlennoe-prichinenie-tyazhkogo-vreda-zdorovyu-111",
  "statya-112": "advokat-po-umyshlennoe-prichinenie-sredney-tyazhesti-vreda-zdorovyu-112",
  "statya-115": "advokat-po-umyshlennoe-prichinenie-legkogo-vreda-zdorovyu-115",
  "statya-116": "advokat-po-poboi-116",
  "statya-119": "advokat-po-ugroza-ubiystvom-ili-prichineniem-tyazhkogo-vreda-zdorovyu-119",
  "statya-126": "advokat-po-pohishchenie-cheloveka-126",
  "statya-127": "advokat-po-nezakonnoe-lishenie-svobody-127",
  "statya-128-1": "advokat-po-kleveta-128-1",
  "statya-131": "advokat-po-iznasilovanie-131",
  "statya-132": "advokat-po-nasilstvennye-deystviya-seksualnogo-haraktera-132",
  "statya-135": "advokat-po-razvratnye-deystviya-135",
  "statya-158": "advokat-po-krazha-158",
  "statya-159": "advokat-po-moshennichestvo-159",
  "statya-160": "advokat-po-prisvoenie-ili-rastrata-160",
  "statya-161": "advokat-po-grabezh-161",
  "statya-162": "advokat-po-razboy-162",
  "statya-163": "advokat-po-vymogatelstvo-163",
  "statya-167": "advokat-po-umyshlennoe-unichtozhenie-ili-povrezhdenie-imushchestva-167",
  "statya-171": "advokat-po-nezakonnoe-predprinimatelstvo-171",
  "statya-172": "advokat-po-nezakonnaya-bankovskaya-deyatelnost-172",
  "statya-174": "advokat-po-legalizatsiya-otmyvanie-denezhnyh-sredstv-174",
  "statya-175": "advokat-po-priobretenie-ili-sbyt-imushchestva-zavedomo-dobytogo-prestupnym-putem-175",
  "statya-205": "advokat-po-terroristicheskiy-akt-205",
  "statya-205-1": "advokat-po-sodeystvie-terroristicheskoy-deyatelnosti-205-1",
  "statya-205-2": "advokat-po-publichnye-prizyvy-k-osushchestvleniyu-terroristicheskoy-deyatelnosti-205-2",
  "statya-205-4": "advokat-po-organizatsiya-terroristicheskogo-soobshchestva-205-4",
  "statya-212": "advokat-po-massovye-besporyadki-212",
  "statya-213": "advokat-po-huliganstvo-213",
  "statya-222": "advokat-po-nezakonnyy-oborot-oruzhiya-222",
  "statya-223": "advokat-po-nezakonnoe-izgotovlenie-oruzhiya-223",
  "statya-228": "advokat-po-nezakonnyy-oborot-narkotikov-228",
  "statya-228-1": "advokat-po-nezakonnye-proizvodstvo-i-sbyt-narkotikov-228-1",
  "statya-234": "advokat-po-nezakonnyy-oborot-silnodeystvuyushchih-veshchestv-234",
  "statya-290": "advokat-po-poluchenie-vzyatki-290",
  "statya-291": "advokat-po-dacha-vzyatki-291",
  "statya-291-1": "advokat-po-posrednichestvo-vo-vzyatochnichestve-291-1",
  "statya-293": "advokat-po-halatnost-293",
  "statya-317": "advokat-po-posyagatelstvo-na-zhizn-sotrudnika-pravoohranitelnogo-organa-317",
  "statya-318": "advokat-po-primenenie-nasiliya-v-otnoshenii-predstavitelya-vlasti-318",
  "statya-322-1": "advokat-po-organizatsiya-nezakonnoy-migratsii-322-1",
  "statya-327": "advokat-po-poddelka-dokumentov-327",
  "statya-330": "advokat-po-samoupravstvo-330"
};

export const getCriminalLegacyRedirect = (slug: string) => {
  return legacySlugMap[slug];
};

export const criminalServicesList = audienceServices.filter(
  (service) => service.audience === "criminal"
);

export const getCriminalServiceEntryBySlug = (slug: string): CriminalServiceEntry | undefined => {
  return criminalServicesList.find((service) => service.slug === slug);
};

export const getCriminalServicePageData = (entry: CriminalServiceEntry): CriminalServicePageData => {
  const { serviceName, articleNumber } = parseServiceTitle(entry.title);
  const canonical = new URL(entry.path, SITE.url).toString();
  const categoryLabel = formatCategoryTitle(entry.category ?? "Уголовные дела");
  const categoryAnchor = getCategoryAnchor(entry.category ?? "");

  const heroTitle = articleNumber
    ? `Адвокат по статье ${articleNumber} УК РФ — ${serviceName}`
    : `Адвокат по делу ${serviceName}`;

  const heroSubtitle =
    "Защищаем на стадии проверки, следствия и суда. Объясним риски, подготовим стратегию и поможем выстроить позицию с первых действий.";

  const metaTitle = articleNumber
    ? `Адвокат по статье ${articleNumber} УК РФ — ${serviceName} в Москве — Профзащита`
    : `Адвокат по делу ${serviceName} в Москве — Профзащита`;

  const metaDescription = buildMetaDescription(serviceName, articleNumber);

  const breadcrumbs = [
    { label: "Услуги", path: "/uslugi" },
    { label: "Уголовные дела", path: "/services/criminal" }
  ];
  if (categoryAnchor) {
    breadcrumbs.push({ label: categoryLabel, path: `/services/criminal#${categoryAnchor}` });
  }
  breadcrumbs.push({ label: entry.title });

  const breadcrumbSchema = [
    { name: "Главная", url: SITE.url },
    { name: "Услуги", url: new URL("/uslugi", SITE.url).toString() },
    { name: "Уголовные дела", url: new URL("/services/criminal", SITE.url).toString() },
    { name: entry.title, url: canonical }
  ];

  return {
    entry,
    metaTitle,
    metaDescription,
    canonical,
    breadcrumbs,
    breadcrumbSchema,
    categoryLabel,
    categoryAnchor,
    heroTitle,
    heroSubtitle,
    heroBenefits: baseHeroBenefits,
    offer24: baseOffer24,
    offer48: baseOffer48,
    triggers: baseTriggers,
    planSteps: basePlanSteps,
    included: baseIncluded,
    cases: [],
    practiceNote: "Показываем типовые ситуации без раскрытия персональных данных и фактов конкретных дел.",
    practiceHighlights: basePracticeHighlights,
    priceNote: "Стоимость защиты определяется по договоренности после анализа материалов.",
    priceFactors: basePriceFactors,
    priceFormats: basePriceFormats,
    whyUs: baseWhyUs,
    team: getTeamByCategory(),
    reviews: sharedReviews.map((review) => ({
      name: review.name,
      date: review.date,
      text: review.text,
      rating: review.rating
    })),
    faqs: buildFaqs(serviceName, articleNumber).slice(0, 8),
    disclaimer: defaultDisclaimer
  };
};
