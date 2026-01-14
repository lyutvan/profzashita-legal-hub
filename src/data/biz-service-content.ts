import { SITE } from "@/config/site";
import { audienceServices, getCategoriesForAudience } from "@/data/services-audiences";
import { teamMembers } from "@/data/team";
import { sharedReviews } from "@/data/shared-reviews";

export interface BizServiceEntry {
  title: string;
  slug: string;
  path: string;
  category: string;
  description?: string;
}

export interface BizPlanStep {
  title: string;
  description: string;
}

export interface BizCaseItem {
  situation: string;
  actions: string;
  result: string;
}

export interface BizWhyUsItem {
  title: string;
  description: string;
  icon: "shield" | "clock" | "trend" | "users" | "award" | "check";
}

export interface BizTeamCard {
  slug: string;
  name: string;
  role: string;
  experience?: string;
  bullets: string[];
  photo?: string;
}

export interface BizFaqItem {
  question: string;
  answer: string;
}

export interface BizServicePageData {
  entry: BizServiceEntry;
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  breadcrumbs: Array<{ label: string; path?: string }>;
  breadcrumbSchema: Array<{ name: string; url: string }>;
  categoryLabel: string;
  categoryAnchor?: string;
  heroTitle: string;
  heroSubtitle: string;
  whoFits: string[];
  outcomes: string[];
  risks: string[];
  steps: BizPlanStep[];
  included: string[];
  timing: string;
  priceNote: string;
  cases: BizCaseItem[];
  practiceNote: string;
  practiceHighlights: string[];
  whyUs: BizWhyUsItem[];
  team: BizTeamCard[];
  reviews: Array<{ name: string; date: string; text: string; rating: number }>;
  faqs: BizFaqItem[];
  disclaimer: string;
}

interface BizCategoryContent {
  heroSubtitle?: string;
  whoFits?: string[];
  outcomes?: string[];
  risks?: string[];
  steps?: BizPlanStep[];
  included?: string[];
  timing?: string;
  practiceHighlights?: string[];
  faqs?: BizFaqItem[];
}

const mergeUnique = (base: string[], extra?: string[]) => {
  if (!extra) return [...base];
  const merged = [...extra, ...base];
  return Array.from(new Set(merged));
};

const clampMetaDescription = (text: string) => {
  const min = 140;
  const max = 160;
  if (text.length > max) {
    return `${text.slice(0, max - 1).replace(/[\s,.;-]+$/g, "")}.`;
  }
  if (text.length < min) {
    const additions = [
      " Работаем по договору и соблюдаем конфиденциальность.",
      " Подключаемся оперативно и ведем дело до результата."
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

const buildMetaDescription = (title: string) => {
  const base = `Юридическое сопровождение бизнеса: ${title}. Анализ рисков, документы и стратегия для защиты интересов компании в Москве.`;
  return clampMetaDescription(base);
};

const baseWhoFits = [
  "Собственникам и руководителям бизнеса",
  "Юридическим департаментам, которым нужен усиленный ресурс",
  "Финансовым директорам и бухгалтерии при росте рисков",
  "Компании с активными контрагентами и сложными договорами",
  "Проектам, где важны сроки и фиксируемые результаты",
  "Бизнесу, который хочет снизить риски до спора"
];

const baseOutcomes = [
  "Четкий план действий и правовая позиция",
  "Пакет документов под задачу",
  "Стратегия переговоров или судебной защиты",
  "Понятные сроки и контроль этапов",
  "Фиксация рисков и способов их минимизации"
];

const baseRisks = [
  "Потеря денег из-за слабых договоров или претензий",
  "Процессуальные ошибки и пропуск сроков",
  "Блокировка счетов или активов",
  "Доначисления и штрафы от контролирующих органов",
  "Конфликт участников и утрата контроля над бизнесом"
];

const baseSteps: BizPlanStep[] = [
  {
    title: "Бриф и вводные",
    description: "Уточняем задачу, контекст, сроки и желаемый результат."
  },
  {
    title: "Анализ документов",
    description: "Изучаем материалы и фиксируем риски, на которые нужно влиять в первую очередь."
  },
  {
    title: "Стратегия",
    description: "Формируем план действий, сценарии и требования к документам."
  },
  {
    title: "Подготовка решений",
    description: "Готовим договоры, претензии, процессуальные документы или переговорные позиции."
  },
  {
    title: "Реализация",
    description: "Ведем переговоры, сопровождение, суд или взаимодействие с органами."
  },
  {
    title: "Контроль результата",
    description: "Отслеживаем исполнение и корректируем действия при необходимости."
  }
];

const baseIncluded = [
  "Анализ документов и рисков",
  "Подготовка правовой позиции",
  "Проектирование и проверка документов",
  "Переговоры и взаимодействие с контрагентами",
  "Сопровождение в судах и госорганах",
  "Контроль сроков и отчетность по этапам"
];

const baseTiming =
  "Сроки зависят от объема документов, срочности и стадии спора. Предложим реалистичный график после анализа материалов.";

const basePracticeHighlights = [
  "Споры по договорам поставки и услуг",
  "Блокировка счетов и запросы банка",
  "Оспаривание доначислений и штрафов",
  "Корпоративные конфликты между участниками",
  "Взыскание задолженности и исполнение решения"
];

const baseWhyUs: BizWhyUsItem[] = [
  {
    title: "Опыт с 2005 года",
    description: "Сопровождаем бизнес в сложных переговорах и спорах.",
    icon: "shield"
  },
  {
    title: "Оперативное подключение",
    description: "Ставим задачу в работу сразу после брифа и документов.",
    icon: "clock"
  },
  {
    title: "Сильная стратегия",
    description: "Сочетаем судебную практику и переговорные техники.",
    icon: "trend"
  },
  {
    title: "Команда экспертов",
    description: "Подключаем специалистов под задачу и отрасль.",
    icon: "users"
  },
  {
    title: "Премиальный сервис",
    description: "Прозрачная коммуникация и контроль сроков.",
    icon: "award"
  },
  {
    title: "Прозрачность",
    description: "Договор, понятный объем работ и отчетность.",
    icon: "check"
  }
];

const baseFaqs: BizFaqItem[] = [
  {
    question: "Можно ли начать с экспресс-оценки?",
    answer: "Да. Сначала определим риски и предложим план действий с вариантами решения."
  },
  {
    question: "Как формируется стоимость?",
    answer: "Стоимость зависит от объема задач, срочности и стадии спора. Предложим формат работы после анализа вводных." 
  },
  {
    question: "Можно ли работать дистанционно?",
    answer: "Да, большинство задач можно вести онлайн. При необходимости подключаемся очно." 
  },
  {
    question: "Какие документы нужны на старте?",
    answer: "Базовые договоры, переписка, платежные документы и краткое описание ситуации." 
  },
  {
    question: "Вы предоставляете отчетность по этапам?",
    answer: "Да, фиксируем план и регулярно информируем о ходе работ." 
  },
  {
    question: "Можно ли заключить NDA?",
    answer: "Да, при необходимости оформим NDA и дополнительные условия конфиденциальности." 
  }
];

const CATEGORY_CONTENT: Record<string, BizCategoryContent> = {
  "Налоговые споры и проверки": {
    heroSubtitle:
      "Сопровождаем проверки и споры с ИФНС, выстраиваем позицию и защищаем интересы компании в суде.",
    risks: [
      "Доначисления, штрафы и блокировка счетов",
      "Ошибки в документах и доказательствах",
      "Пропуск сроков на ответы и обжалование",
      "Негативные выводы проверок",
      "Потеря управляемости процесса"
    ],
    practiceHighlights: [
      "Камеральные и выездные проверки",
      "Споры по НДС и вычетам",
      "Обжалование решений ИФНС",
      "Подготовка ответов на требования"
    ]
  },
  "Банкротство и субсидиарная ответственность": {
    heroSubtitle:
      "Защищаем бизнес и контролирующих лиц в банкротных процедурах, строим стратегию сохранения активов.",
    risks: [
      "Субсидиарная ответственность руководителя",
      "Оспаривание сделок и возврат активов",
      "Потеря контроля над процедурой",
      "Рост требований кредиторов",
      "Блокировка операций"
    ]
  },
  "Разблокировка счёта и 115‑ФЗ": {
    heroSubtitle:
      "Помогаем восстановить операции и выстроить комплаенс-позицию для стабильной работы бизнеса.",
    whoFits: [
      "Компании с блокировкой счетов",
      "Бизнесу после запроса банка по 115‑ФЗ",
      "Финансовым директорам, которым важна скорость"
    ],
    outcomes: [
      "Пакет документов и пояснений для банка",
      "Стратегия по восстановлению ДБО",
      "Снижение рисков повторных блокировок",
      "Коммуникация с банком и контроль сроков"
    ]
  },
  "Арбитражные споры (B2B)": {
    heroSubtitle:
      "Ведем арбитражные споры по договорам, убыткам и взысканию задолженности с опорой на доказательства.",
    outcomes: [
      "Процессуальная стратегия и пакет документов",
      "Защита в суде первой, апелляционной и кассационной инстанции",
      "Сбор доказательственной базы",
      "Контроль исполнения решения"
    ]
  },
  "Договоры и сделки": {
    heroSubtitle:
      "Структурируем сделки и договоры так, чтобы защищать бизнес и снижать риски исполнения.",
    outcomes: [
      "Доработанные договоры и протоколы разногласий",
      "Понятные условия ответственности",
      "Защита коммерческой тайны и интересов компании"
    ]
  },
  "Корпоративное право и конфликты собственников": {
    heroSubtitle:
      "Сопровождаем корпоративные изменения и конфликты, защищаем доли и управленческие решения.",
    outcomes: [
      "Проект корпоративных документов",
      "Стратегия защиты активов",
      "Пакет документов для ЕГРЮЛ",
      "Контроль рисков корпоративных споров"
    ]
  }
};

const CATEGORY_TEAM: Record<string, string[]> = {
  "Арбитражные споры (B2B)": ["lyutikov", "ryzhenko"],
  "Налоговые споры и проверки": ["lyutikov", "sotnikov"],
  "Банкротство и субсидиарная ответственность": ["lyutikov", "ryzhenko"],
  "Абонентское юридическое сопровождение бизнеса": ["ryzhenko", "sotnikov"],
  "Договоры и сделки": ["ryzhenko", "sotnikov"],
  "Разблокировка счёта и 115‑ФЗ": ["lyutikov", "sotnikov"],
  "Корпоративное право и конфликты собственников": ["lyutikov", "ryzhenko"],
  "Исполнительное производство и приставы": ["ryzhenko", "sotnikov"],
  "Госзакупки и ФАС": ["ryzhenko", "lyutikov"],
  "Интеллектуальная собственность и защита бренда": ["sotnikov", "ryzhenko"],
  "Трудовое право для работодателя": ["ryzhenko", "lyutikov"]
};

const defaultDisclaimer =
  "Результат зависит от обстоятельств дела, позиции суда и полноты предоставленных документов."
;

export const bizServicesList = audienceServices.filter(
  (service) => service.audience === "biz"
);

export const getBizServiceEntryBySlug = (slug: string): BizServiceEntry | undefined => {
  return bizServicesList.find((service) => service.slug === slug);
};

const getTeamByCategory = (category: string): BizTeamCard[] => {
  const slugs = CATEGORY_TEAM[category] ?? ["lyutikov", "ryzhenko"];
  return slugs
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
  const categories = getCategoriesForAudience("biz");
  const match = categories.find((item) => item.title === category);
  return match?.slug;
};

const getCategoryContent = (category: string): BizCategoryContent => {
  return CATEGORY_CONTENT[category] ?? {};
};

export const getBizServicePageData = (entry: BizServiceEntry): BizServicePageData => {
  const categoryContent = getCategoryContent(entry.category);
  const canonical = new URL(entry.path, SITE.url).toString();
  const categoryAnchor = getCategoryAnchor(entry.category);

  const heroTitle = entry.title;
  const heroSubtitle =
    categoryContent.heroSubtitle ??
    "Помогаем бизнесу снизить риски и получить практический результат — от анализа документов до внедрения решения.";

  const metaTitle = `${entry.title} — Профзащита`;
  const metaDescription = buildMetaDescription(entry.title);

  const breadcrumbs = [
    { label: "Услуги", path: "/uslugi" },
    { label: "Юридическим лицам", path: "/services/biz" }
  ];
  if (categoryAnchor) {
    breadcrumbs.push({ label: entry.category, path: `/services/biz#${categoryAnchor}` });
  }
  breadcrumbs.push({ label: entry.title });

  const breadcrumbSchema = [
    { name: "Главная", url: SITE.url },
    { name: "Услуги", url: new URL("/uslugi", SITE.url).toString() },
    { name: "Юридическим лицам", url: new URL("/services/biz", SITE.url).toString() },
    { name: entry.title, url: canonical }
  ];

  return {
    entry,
    metaTitle,
    metaDescription,
    canonical,
    breadcrumbs,
    breadcrumbSchema,
    categoryLabel: entry.category,
    categoryAnchor,
    heroTitle,
    heroSubtitle,
    whoFits: mergeUnique(baseWhoFits, categoryContent.whoFits).slice(0, 6),
    outcomes: mergeUnique(baseOutcomes, categoryContent.outcomes).slice(0, 6),
    risks: mergeUnique(baseRisks, categoryContent.risks).slice(0, 6),
    steps: categoryContent.steps ?? baseSteps,
    included: mergeUnique(baseIncluded, categoryContent.included).slice(0, 8),
    timing: categoryContent.timing ?? baseTiming,
    priceNote: "Стоимость определяется по договоренности после анализа материалов и объема работ.",
    cases: [],
    practiceNote: "Показываем типовые ситуации и подходы без раскрытия конфиденциальных данных клиентов.",
    practiceHighlights: mergeUnique(basePracticeHighlights, categoryContent.practiceHighlights).slice(0, 6),
    whyUs: baseWhyUs,
    team: getTeamByCategory(entry.category),
    reviews: sharedReviews.map((review) => ({
      name: review.name,
      date: review.date,
      text: review.text,
      rating: review.rating
    })),
    faqs: (categoryContent.faqs ?? baseFaqs).slice(0, 8),
    disclaimer: defaultDisclaimer
  };
};
