import type { AudienceService } from "@/data/services-audiences";
import { audienceServices, getCategoriesForAudience } from "@/data/services-audiences";
import { teamMembers } from "@/data/team";
import { physReviews } from "@/data/phys-reviews";
import { SITE } from "@/config/site";

export interface PhysServiceEntry {
  title: string;
  slug: string;
  path: string;
  category: string;
  description?: string;
  heroServiceName?: string;
  isCategory?: boolean;
}

export interface PhysScenario {
  title: string;
  highlightStep?: number;
}

export interface PhysPlanStep {
  title: string;
  description: string;
}

export interface PhysPriceFormat {
  title: string;
  description: string;
}

export interface PhysCaseItem {
  situation: string;
  actions: string;
  result: string;
}

export interface PhysTeamCard {
  slug: string;
  name: string;
  role: string;
  experience?: string;
  bullets: string[];
  photo?: string;
}

export interface PhysFaqItem {
  question: string;
  answer: string;
}

export interface PhysServicePageData {
  entry: PhysServiceEntry;
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  breadcrumbs: Array<{ label: string; path?: string }>;
  breadcrumbSchema: Array<{ name: string; url: string }>;
  categoryLabel: string;
  categoryPath?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBenefits: string[];
  scenarios: PhysScenario[];
  planSteps: PhysPlanStep[];
  planBeforeCourt: string[];
  planInCourt: string[];
  timingFactors: string[];
  documents: string[];
  priceFactors: string[];
  priceFormats: PhysPriceFormat[];
  priceExcludes: string[];
  mistakes: string[];
  urgent: string[];
  cases: PhysCaseItem[];
  team: PhysTeamCard[];
  reviews: Array<{ name: string; date: string; text: string; rating: number }>;
  faqs: PhysFaqItem[];
  desiredResults: string[];
}

const CATEGORY_SLUG_OVERRIDES: Record<string, string> = {
  "Семейные споры": "semeynye-spory",
  "Жилищные споры": "zhilishchnye-spory",
  "Наследственные дела": "nasledstvo",
  "Защита прав потребителей": "zashchita-prav-potrebitelya",
  "ДТП, страхование, вред здоровью": "dtp-strahovye-spory",
  "Трудовые споры": "trudovye-spory",
  "Банкротство": "bankrotstvo-fiz-lits"
};

const CATEGORY_TITLE_OVERRIDES: Record<string, string> = {
  "ДТП, страхование, вред здоровью": "ДТП и страховые споры",
  "Банкротство": "Банкротство физических лиц"
};

const CATEGORY_HERO_NAME_OVERRIDES: Record<string, string> = {
  "Семейные споры": "семейным спорам",
  "Жилищные споры": "жилищным спорам",
  "Ущерб имуществу": "ущербу имуществу",
  "Наследственные дела": "наследственным делам",
  "Взыскание долгов и договорные споры": "взысканию долгов и договорным спорам",
  "Защита прав потребителей": "защите прав потребителей",
  "ДТП, страхование, вред здоровью": "ДТП и страховым спорам",
  "Трудовые споры": "трудовым спорам",
  "Банковские и кредитные споры": "банковским и кредитным спорам",
  "Исполнительное производство": "исполнительному производству",
  "Земельные споры": "земельным спорам",
  "Административные споры": "административным спорам",
  "Банкротство": "банкротству физических лиц",
  "Документы и судебное сопровождение": "документам и судебному сопровождению"
};

const CATEGORY_TEAM: Record<string, string[]> = {
  "Семейные споры": ["vaskovsky", "kalabekov"],
  "Жилищные споры": ["vaskovsky", "ryzhenko"],
  "Ущерб имуществу": ["kalabekov", "ryzhenko"],
  "Наследственные дела": ["vaskovsky", "kalabekov"],
  "Взыскание долгов и договорные споры": ["ryzhenko", "sotnikov"],
  "Защита прав потребителей": ["kalabekov", "ryzhenko"],
  "ДТП, страхование, вред здоровью": ["vaskovsky", "ryzhenko"],
  "Трудовые споры": ["ryzhenko", "vaskovsky"],
  "Банковские и кредитные споры": ["ryzhenko", "sotnikov"],
  "Исполнительное производство": ["ryzhenko"],
  "Земельные споры": ["sotnikov", "ryzhenko"],
  "Административные споры": ["vaskovsky", "ryzhenko"],
  "Банкротство": ["lyutikov", "ryzhenko"],
  "Документы и судебное сопровождение": ["ryzhenko", "sotnikov"]
};

const baseHeroBenefits = [
  "Понимание перспектив, рисков и сильных сторон позиции",
  "Пошаговый план действий с реальными сроками",
  "Подготовка доказательств и процессуальных документов",
  "Переговоры и защита интересов в суде",
  "Контроль исполнения решения до результата"
];

const baseScenarios = [
  "Получили иск, повестку или претензию и не знаете, что делать",
  "Сроки поджимают, важно не пропустить обязательные действия",
  "Нужно собрать документы и доказательства для суда",
  "Партнер или оппонент уклоняется от переговоров",
  "Нужна оценка перспектив и разумный план действий",
  "Есть риск ухудшения позиции, если тянуть время"
];

const basePlanSteps: PhysPlanStep[] = [
  {
    title: "Диагностика ситуации",
    description: "Разбираем документы, факты и цели. Определяем, что возможно юридически и процессуально."
  },
  {
    title: "Стратегия и план",
    description: "Фиксируем план действий, сроки, риски и тактику переговоров/суда."
  },
  {
    title: "Подготовка документов",
    description: "Готовим претензии, иски, ходатайства, отзывы и доказательственную базу."
  },
  {
    title: "Досудебная работа",
    description: "Пробуем решить вопрос без суда, фиксируем позицию, усиливаем доказательства."
  },
  {
    title: "Судебное представительство",
    description: "Ведем процесс, заявляем ходатайства, защищаем интересы на каждом заседании."
  },
  {
    title: "Исполнение решения",
    description: "Контролируем получение денег/решения и работу приставов при необходимости."
  }
];

const basePlanBeforeCourt = [
  "Оценим перспективы и подскажем сильную позицию",
  "Подготовим претензию и переговорную стратегию",
  "Соберем доказательства, чтобы улучшить исход"
];

const basePlanInCourt = [
  "Вступим в процесс с готовой позицией и доказательствами",
  "Подготовим отзывы, ходатайства, экспертизы",
  "При необходимости обжалуем решение"
];

const baseTimingFactors = [
  "Сложность спора и количество участников",
  "Стадия дела и объём документов",
  "Необходимость экспертиз и запросов",
  "Нагрузка суда и сроки назначений",
  "Готовность сторон к досудебному урегулированию"
];

const baseDocuments = [
  "Паспорт и контактные данные сторон",
  "Договоры, соглашения, переписка",
  "Платежные документы, чеки, квитанции",
  "Документы на имущество (если применимо)",
  "Решения, постановления, уведомления (если есть)",
  "Справки, выписки и акты",
  "Доверенность для представительства"
];

const basePriceFactors = [
  "Сложность и объем документов",
  "Стадия и срочность обращения",
  "Количество участников и заседаний",
  "Необходимость экспертиз и выездов",
  "Необходимость сопровождения исполнения"
];

const basePriceFormats: PhysPriceFormat[] = [
  {
    title: "Разовая задача",
    description: "Консультация, подготовка претензии/иска, проверка документов."
  },
  {
    title: "Ведение дела",
    description: "Полное сопровождение от анализа до решения и исполнения."
  },
  {
    title: "Срочная помощь",
    description: "Быстрый старт, оперативные документы и приоритетная связь."
  }
];

const basePriceExcludes = [
  "Госпошлины, нотариальные расходы",
  "Экспертизы, оценка, услуги специалистов",
  "Почтовые и курьерские расходы",
  "Расходы на перевод и заверение документов"
];

const baseMistakes = [
  "Пропуск процессуальных сроков и уведомлений",
  "Самостоятельные переговоры без фиксации позиции",
  "Неполный пакет документов и доказательств",
  "Подписание невыгодных соглашений без анализа",
  "Ошибки в расчетах суммы требований",
  "Ожидание «само решится» при наличии рисков"
];

const baseUrgent = [
  "Скоро заседание или срок подачи документов",
  "Есть риск обеспечительных мер или ареста",
  "Получено постановление/уведомление с короткими сроками",
  "Контрагент выводит активы или скрывается"
];

const baseCases: PhysCaseItem[] = [
  {
    situation: "Клиент обратился после получения иска, требовалось быстро собрать позицию.",
    actions: "Собрали документы, подготовили отзыв и ходатайства, выстроили доказательства.",
    result: "Суд учел аргументы и снизил размер требований."
  },
  {
    situation: "Нужно было взыскать деньги по договору без затяжных споров.",
    actions: "Подготовили претензию, провели переговоры, зафиксировали условия.",
    result: "Дело завершено досудебно с выплатой основной суммы."
  }
];

const baseFaqs: PhysFaqItem[] = [
  {
    question: "С чего начать обращение?",
    answer: "Коротко опишите ситуацию и пришлите ключевые документы — мы оценим перспективы и предложим план."
  },
  {
    question: "Можно ли решить вопрос без суда?",
    answer: "Во многих случаях — да. Мы оцениваем досудебные варианты и фиксируем позицию."
  },
  {
    question: "Сколько времени занимает работа?",
    answer: "Срок зависит от стадии дела, объёма документов и сложности. Скажем ориентир после анализа."
  },
  {
    question: "Как формируется стоимость?",
    answer: "Цена зависит от сложности, срочности и объёма работ. Предложим формат: разово или под ключ."
  },
  {
    question: "Нужно ли личное присутствие?",
    answer: "Не всегда. Часть вопросов решается дистанционно, в суде можем представлять по доверенности."
  },
  {
    question: "Что нужно подготовить заранее?",
    answer: "Документы по делу, переписку, расчёты и подтверждение ваших требований."
  }
];

const baseDesiredResults = [
  "Понять перспективы и риски",
  "Получить план действий",
  "Подготовить документы и доказательства",
  "Достичь решения через суд или переговоры",
  "Довести до исполнения результата"
];

interface PhysCategoryContent {
  heroSubtitle: string;
  benefits: string[];
  scenarios: string[];
  planSteps: PhysPlanStep[];
  planBeforeCourt: string[];
  planInCourt: string[];
  timingFactors: string[];
  documents: string[];
  priceFactors: string[];
  priceFormats: PhysPriceFormat[];
  priceExcludes: string[];
  mistakes: string[];
  urgent: string[];
  cases: PhysCaseItem[];
  faqs: PhysFaqItem[];
  desiredResults: string[];
}

const CATEGORY_CONTENT: Record<string, Partial<PhysCategoryContent>> = {
  "Семейные споры": {
    heroSubtitle: "Помогаем пройти семейный спор до суда или в суде: защитить права, договориться о детях и имуществе.",
    scenarios: [
      "Развод при наличии детей и споров",
      "Нужны алименты или изменение их размера",
      "Спор о месте жительства ребенка",
      "Порядок общения с ребенком не определен",
      "Раздел совместно нажитого имущества",
      "Оспаривание отцовства/материнства",
      "Лишение или ограничение родительских прав"
    ],
    documents: [
      "Свидетельство о браке/разводе",
      "Свидетельства о рождении детей",
      "Справки о доходах, расходов на детей",
      "Документы на имущество и кредиты",
      "Переписка и соглашения между супругами"
    ],
    cases: [
      {
        situation: "Развод с спором о детях и разделе имущества.",
        actions: "Подготовили позицию, соглашение по детям, доказательства по имуществу.",
        result: "Решение суда с защитой интересов клиента и ребенка."
      },
      {
        situation: "Уклонение от алиментов и сокрытие доходов.",
        actions: "Собрали доказательства, подготовили расчет задолженности, взыскали через суд.",
        result: "Назначены алименты и взыскана задолженность."
      }
    ],
    faqs: [
      {
        question: "Можно ли развестись без согласия второй стороны?",
        answer: "Да. Суд расторгнет брак при отсутствии совместной жизни, даже если супруг против."
      },
      {
        question: "Как определить место жительства ребенка?",
        answer: "Суд оценивает условия и интересы ребенка. Важно подготовить доказательства."
      },
      {
        question: "Можно ли установить порядок общения?",
        answer: "Да, порядок общения определяется судом и фиксируется решением."
      }
    ],
    desiredResults: [
      "Безопасно пройти развод",
      "Защитить интересы детей",
      "Разделить имущество по закону",
      "Обеспечить выплаты алиментов",
      "Закрепить порядок общения"
    ]
  },
  "Жилищные споры": {
    heroSubtitle: "Защищаем право на жилье и доли: от досудебного урегулирования до суда и исполнения.",
    scenarios: [
      "Нужно выселить или снять с регистрации",
      "Спор по порядку пользования квартирой",
      "Споры с УК/ТСЖ по начислениям",
      "Оспаривание приватизации",
      "Залив квартиры или ущерб от соседей",
      "Споры по соцнайму"
    ],
    documents: [
      "Документы на жилье (ЕГРН, договоры)",
      "Справки о регистрации",
      "Квитанции и начисления ЖКУ",
      "Акты обследования/заливов",
      "Переписка с УК/ТСЖ"
    ],
    cases: [
      {
        situation: "Выселение с сохранением прав зарегистрированных лиц.",
        actions: "Подготовили доказательства, иск и представили в суде.",
        result: "Суд удовлетворил требования клиента."
      },
      {
        situation: "Спор по задолженности ЖКУ и перерасчету.",
        actions: "Собрали документы, оспорили начисления, подготовили иск.",
        result: "Сумма задолженности снижена, перерасчет проведен."
      }
    ],
    faqs: [
      {
        question: "Можно ли выписать человека без его согласия?",
        answer: "В ряде случаев — да, через суд. Нужны доказательства оснований."
      },
      {
        question: "Какой суд рассматривает жилищные споры?",
        answer: "Обычно суд общей юрисдикции по месту нахождения жилья."
      }
    ]
  },
  "Ущерб имуществу": {
    heroSubtitle: "Помогаем взыскать ущерб и расходы: фиксируем ущерб, готовим расчеты и добиваемся компенсации.",
    scenarios: [
      "Залив квартиры и спор по оценке ущерба",
      "Ущерб от работ/ремонта подрядчика",
      "Соседи или УК отказываются возмещать вред",
      "Нужна независимая экспертиза",
      "Страховая не покрывает ущерб полностью"
    ],
    documents: [
      "Акты о происшествии и осмотрах",
      "Фото/видео повреждений",
      "Сметы, чеки, счета на ремонт",
      "Договоры и переписка с виновной стороной"
    ],
    cases: [
      {
        situation: "Залив квартиры с отказом в компенсации.",
        actions: "Зафиксировали ущерб, собрали чеки, подготовили иск.",
        result: "Взыскана полная сумма ущерба и расходы."
      },
      {
        situation: "Некачественный ремонт и скрытые дефекты.",
        actions: "Организовали экспертизу, подготовили претензию и иск.",
        result: "Суд обязал компенсировать устранение дефектов."
      }
    ],
    faqs: [
      {
        question: "Как правильно зафиксировать ущерб?",
        answer: "Важно составить акт, сделать фото и привлечь эксперта. Мы подскажем нужный порядок."
      },
      {
        question: "Можно ли взыскать моральный вред?",
        answer: "Да, если есть основания и доказательства, суд может взыскать компенсацию."
      }
    ],
    desiredResults: [
      "Получить полную компенсацию ущерба",
      "Вернуть расходы на ремонт",
      "Взыскать убытки и моральный вред",
      "Закрыть вопрос без затяжного суда"
    ]
  },
  "Наследственные дела": {
    heroSubtitle: "Сопровождаем наследственные споры: сроки, доли, документы, суд.",
    scenarios: [
      "Пропущен срок принятия наследства",
      "Спор между наследниками о долях",
      "Нужно признать право собственности",
      "Оспаривание завещания",
      "Признание недостойного наследника"
    ],
    documents: [
      "Свидетельство о смерти",
      "Документы о родстве",
      "Завещание (если есть)",
      "Документы на имущество (ЕГРН, ПТС)",
      "Отказы/уведомления нотариуса"
    ],
    cases: [
      {
        situation: "Пропущен срок принятия наследства.",
        actions: "Подготовили документы и иск о восстановлении срока.",
        result: "Срок восстановлен, наследство оформлено."
      },
      {
        situation: "Спор о долях между наследниками.",
        actions: "Собрали доказательства, провели переговоры и суд.",
        result: "Доли закреплены в судебном порядке."
      }
    ],
    faqs: [
      {
        question: "Можно ли восстановить срок принятия наследства?",
        answer: "Да, через суд при наличии уважительных причин."
      },
      {
        question: "Что делать, если нет документов на имущество?",
        answer: "Собираем подтверждения и признаем право собственности в суде."
      }
    ],
    desiredResults: [
      "Восстановить срок",
      "Закрепить долю в наследстве",
      "Оспорить завещание",
      "Оформить право собственности",
      "Урегулировать спор между наследниками"
    ]
  },
  "Взыскание долгов и договорные споры": {
    heroSubtitle: "Помогаем взыскать долги, расторгнуть договор и компенсировать убытки.",
    scenarios: [
      "Долг по расписке не возвращают",
      "Неисполнение договора и просрочка",
      "Нужно расторгнуть договор услуг",
      "Неосновательное обогащение",
      "Оспаривание штрафов/неустойки",
      "Взыскание арендных платежей"
    ],
    documents: [
      "Договор/расписка и приложения",
      "Переписка и уведомления",
      "Платежные документы",
      "Акты выполненных работ/услуг",
      "Расчет задолженности/неустойки"
    ],
    cases: [
      {
        situation: "Долг по расписке без добровольного возврата.",
        actions: "Подготовили претензию, иск, обеспечили доказательства.",
        result: "Суд взыскал долг и проценты."
      },
      {
        situation: "Расторжение договора услуг с возвратом средств.",
        actions: "Зафиксировали нарушения, подготовили претензию и иск.",
        result: "Возврат денежных средств и компенсация."
      }
    ],
    faqs: [
      {
        question: "Нужна ли претензия перед судом?",
        answer: "В большинстве договорных споров — да. Мы проверим обязательный порядок."
      },
      {
        question: "Можно ли взыскать проценты и неустойку?",
        answer: "Да, если есть правовые основания и корректный расчет."
      }
    ],
    desiredResults: [
      "Взыскать основной долг",
      "Получить проценты/неустойку",
      "Расторгнуть договор без потерь",
      "Возместить убытки"
    ]
  },
  "Защита прав потребителей": {
    heroSubtitle: "Защищаем интересы потребителей: возвраты, неустойки, компенсации.",
    scenarios: [
      "Некачественные товары или услуги",
      "Просрочка ремонта или изготовления",
      "Отказ в возврате денег",
      "Заниженная компенсация/неустойка",
      "Нужна претензия по ЗоЗПП"
    ],
    documents: [
      "Договор, чек, квитанции",
      "Претензии и ответы",
      "Переписка с исполнителем",
      "Экспертизы и акты"
    ],
    cases: [
      {
        situation: "Отказ в возврате денег за услугу.",
        actions: "Подготовили претензию, расчет неустойки, иск.",
        result: "Взыскана стоимость и штраф."
      },
      {
        situation: "Затяжной ремонт с нарушением сроков.",
        actions: "Собрали доказательства, подали иск по ЗоЗПП.",
        result: "Компенсированы убытки и неустойка."
      }
    ],
    faqs: [
      {
        question: "Можно ли взыскать штраф по ЗоЗПП?",
        answer: "Да, при удовлетворении требований потребителя суд взыскивает штраф."
      },
      {
        question: "Нужна ли экспертиза?",
        answer: "Иногда необходима. Мы подскажем, когда это усиливает позицию."
      }
    ]
  },
  "ДТП, страхование, вред здоровью": {
    heroSubtitle: "Помогаем получить страховую выплату и компенсации за вред здоровью.",
    scenarios: [
      "Страховая отказала в выплате",
      "Занижена сумма ущерба",
      "Нужно взыскать ущерб с виновника",
      "Компенсация вреда здоровью",
      "Возмещение утраченного заработка",
      "Спор по ОСАГО/КАСКО"
    ],
    documents: [
      "Справки и постановления ГИБДД",
      "Страховой полис и заявления",
      "Экспертиза и оценка ущерба",
      "Документы о лечении и расходах",
      "Справки о доходах и утрате заработка"
    ],
    cases: [
      {
        situation: "Заниженная выплата по ОСАГО.",
        actions: "Провели независимую экспертизу, подготовили претензию и иск.",
        result: "Выплата увеличена, взыскана неустойка."
      },
      {
        situation: "Вред здоровью после ДТП.",
        actions: "Собрали меддокументы, расчет ущерба, доказали расходы.",
        result: "Компенсация лечения и утраченного заработка."
      }
    ],
    faqs: [
      {
        question: "Можно ли взыскать ущерб сверх страховки?",
        answer: "Да, с виновника ДТП при недостаточной выплате."
      },
      {
        question: "Что влияет на размер компенсации здоровью?",
        answer: "Степень вреда, расходы на лечение, утраченный заработок."
      }
    ],
    desiredResults: [
      "Получить полную страховую выплату",
      "Компенсировать лечение и утраченный доход",
      "Взыскать ущерб с виновника",
      "Закрыть спор без затяжек"
    ]
  },
  "Трудовые споры": {
    heroSubtitle: "Защищаем права работников: увольнение, зарплаты, дисциплинарные меры.",
    scenarios: [
      "Незаконное увольнение",
      "Задержка зарплаты или компенсаций",
      "Дисциплинарные взыскания",
      "Травмы на работе",
      "Нарушение условий трудового договора"
    ],
    documents: [
      "Трудовой договор и допсоглашения",
      "Приказы, уведомления работодателя",
      "Справки о доходах и расчетные листки",
      "Медицинские документы (при травме)",
      "Переписка с работодателем"
    ],
    cases: [
      {
        situation: "Незаконное увольнение с отказом в выплатах.",
        actions: "Подготовили иск, доказали нарушения процедуры.",
        result: "Восстановление и выплата компенсаций."
      },
      {
        situation: "Задержка заработной платы.",
        actions: "Подготовили претензию и иск, расчет задолженности.",
        result: "Задолженность взыскана полностью."
      }
    ],
    faqs: [
      {
        question: "Какие сроки по трудовым спорам?",
        answer: "Сроки короткие — важно не пропустить. Мы уточним по вашей ситуации."
      },
      {
        question: "Можно ли получить компенсацию за вынужденный прогул?",
        answer: "Да, при восстановлении на работе суд присуждает компенсацию."
      }
    ]
  },
  "Банковские и кредитные споры": {
    heroSubtitle: "Помогаем снизить санкции и защититься от необоснованных требований банка.",
    scenarios: [
      "Завышенные штрафы и пени",
      "Оспаривание судебного приказа",
      "Рассрочка или отсрочка исполнения решения",
      "Споры по кредитному договору",
      "Исполнительная надпись нотариуса"
    ],
    documents: [
      "Кредитный договор и график платежей",
      "Уведомления и требования банка",
      "Судебные документы (если есть)",
      "Платежные документы и выписки"
    ],
    cases: [
      {
        situation: "Завышенные штрафы по кредиту.",
        actions: "Собрали расчет, подготовили возражения и ходатайства.",
        result: "Неустойка снижена судом."
      },
      {
        situation: "Судебный приказ без уведомления.",
        actions: "Подготовили заявление об отмене, восстановили срок.",
        result: "Приказ отменен, дело рассмотрено по существу."
      }
    ],
    faqs: [
      {
        question: "Можно ли отменить судебный приказ?",
        answer: "Да, если соблюсти срок и правильно оформить заявление."
      },
      {
        question: "Как снизить неустойку банка?",
        answer: "Суд может снизить неустойку при наличии оснований."
      }
    ]
  },
  "Исполнительное производство": {
    heroSubtitle: "Контролируем исполнение решений суда и защищаем от незаконных взысканий.",
    scenarios: [
      "Приставы бездействуют",
      "Арест счетов или имущества",
      "Оспаривание удержаний",
      "Нужно снять ограничения/запреты",
      "Сопровождение исполнения решения"
    ],
    documents: [
      "Исполнительный лист",
      "Постановления приставов",
      "Сведения об имуществе и счетах",
      "Переписка с ФССП"
    ],
    cases: [
      {
        situation: "Бездействие приставов по взысканию долга.",
        actions: "Подготовили жалобы и заявления, инициировали меры.",
        result: "Взыскание возобновлено."
      },
      {
        situation: "Незаконные удержания со счета.",
        actions: "Оспорили постановления и вернули удержанные суммы.",
        result: "Удержания отменены."
      }
    ],
    faqs: [
      {
        question: "Куда жаловаться на приставов?",
        answer: "Вышестоящему приставу, суд или прокуратуру. Поможем выбрать путь."
      },
      {
        question: "Можно ли снять арест со счета?",
        answer: "Да, если арест незаконен или превышает требования."
      }
    ]
  },
  "Земельные споры": {
    heroSubtitle: "Разрешаем земельные споры: границы, доли, права собственности.",
    scenarios: [
      "Спор о границах участка",
      "Оспаривание межевания",
      "Выдел доли в натуре",
      "Порядок пользования участком",
      "Признание права собственности"
    ],
    documents: [
      "Правоустанавливающие документы на участок",
      "Кадастровые выписки",
      "Планы межевания и схемы",
      "Переписка с соседями/органами"
    ],
    cases: [
      {
        situation: "Спор с соседом по границам участка.",
        actions: "Провели анализ кадастра, подготовили иск.",
        result: "Границы участка определены судом."
      },
      {
        situation: "Выдел доли в натуре.",
        actions: "Организовали экспертизу, подготовили документы.",
        result: "Доля выделена и зарегистрирована."
      }
    ],
    faqs: [
      {
        question: "Нужна ли экспертиза по границам?",
        answer: "Часто да, она помогает закрепить позицию в суде."
      },
      {
        question: "Сколько длится земельный спор?",
        answer: "Зависит от экспертиз и количества участников. Оценим срок после анализа."
      }
    ]
  },
  "Административные споры": {
    heroSubtitle: "Оспариваем решения и действия госорганов, защищаем ваши права.",
    scenarios: [
      "Оспаривание постановления",
      "Действия/бездействие органов власти",
      "Налоговые решения и штрафы",
      "Нужно подать административный иск",
      "Срочная жалоба"
    ],
    documents: [
      "Постановления и уведомления",
      "Переписка с органами",
      "Доказательства нарушений",
      "Справки и выписки"
    ],
    cases: [
      {
        situation: "Оспаривание штрафа госоргана.",
        actions: "Подготовили жалобу и административный иск.",
        result: "Постановление отменено."
      },
      {
        situation: "Бездействие должностного лица.",
        actions: "Собрали доказательства, подготовили иск.",
        result: "Суд обязал орган устранить нарушение."
      }
    ],
    faqs: [
      {
        question: "Есть ли сроки на обжалование?",
        answer: "Да, сроки короткие. Важно не затянуть с обращением."
      },
      {
        question: "Можно ли подать жалобу без суда?",
        answer: "Иногда возможно административное обжалование. Мы оценим формат."
      }
    ]
  },
  "Банкротство": {
    heroSubtitle: "Проводим процедуру банкротства физлиц с защитой имущества и законным списанием долгов.",
    scenarios: [
      "Долги превышают 500 тыс. рублей",
      "Просрочка платежей более 3 месяцев",
      "Аресты и взыскания от приставов",
      "Несколько кредиторов и нагрузка по платежам",
      "Нужно списать долги законным способом"
    ],
    documents: [
      "Паспорт, ИНН, СНИЛС",
      "Справки о доходах и задолженностях",
      "Договоры с кредиторами",
      "Документы на имущество",
      "Сведения о счетах и операциях"
    ],
    cases: [
      {
        situation: "Несколько кредитов и длительная просрочка.",
        actions: "Подготовили заявление, собрали документы, сопровождали процедуру.",
        result: "Долги списаны по итогам процедуры."
      },
      {
        situation: "Риск потери имущества.",
        actions: "Выстроили стратегию защиты активов и доказательств.",
        result: "Сохранено единственное жилье, долги списаны."
      }
    ],
    faqs: [
      {
        question: "Можно ли сохранить единственное жилье?",
        answer: "Да, в большинстве случаев единственное жилье не включается в конкурсную массу."
      },
      {
        question: "Сколько длится банкротство?",
        answer: "Обычно от 6 месяцев, срок зависит от объема долгов и имущества."
      }
    ],
    desiredResults: [
      "Законно списать долги",
      "Защитить имущество",
      "Остановить взыскания",
      "Получить контроль над процедурой"
    ]
  },
  "Документы и судебное сопровождение": {
    heroSubtitle: "Готовим процессуальные документы и сопровождаем дело на любой стадии.",
    scenarios: [
      "Нужна досудебная претензия",
      "Подготовка жалобы или заявления",
      "Составление иска",
      "Возражения и отзывы",
      "Апелляция или кассация",
      "Обращение в Верховный суд"
    ],
    planSteps: [
      {
        title: "Анализ вводных",
        description: "Разбираем ситуацию, определяем нужный документ и сроки."
      },
      {
        title: "Проект документа",
        description: "Готовим текст с учетом практики и доказательств."
      },
      {
        title: "Усиление позиции",
        description: "Добавляем ссылки, расчеты и доказательства."
      },
      {
        title: "Согласование",
        description: "Уточняем детали и финализируем документ."
      },
      {
        title: "Подача и сопровождение",
        description: "При необходимости подаем и контролируем движение."
      }
    ],
    faqs: [
      {
        question: "Нужно ли соблюдать досудебный порядок?",
        answer: "В некоторых делах это обязательно. Мы проверим требования и сроки."
      },
      {
        question: "Можно ли исправить документ после подачи?",
        answer: "Да, но важно сделать это правильно и вовремя, чтобы не потерять сроки."
      }
    ]
  }
};

const mergeUnique = (base: string[], extra?: string[]) => {
  if (!extra) return [...base];
  const merged = [...extra, ...base];
  return Array.from(new Set(merged));
};

const mergeFaqs = (base: PhysFaqItem[], extra?: PhysFaqItem[]) => {
  if (!extra) return [...base];
  const merged = [...extra, ...base];
  const seen = new Set<string>();
  return merged.filter((item) => {
    if (seen.has(item.question)) return false;
    seen.add(item.question);
    return true;
  });
};

const getCategoryContent = (category: string): PhysCategoryContent => {
  const override = CATEGORY_CONTENT[category] ?? {};
  return {
    heroSubtitle:
      override.heroSubtitle ??
      "Помогаем решить вопрос до суда или в суде, добиваясь результата в разумные сроки.",
    benefits: mergeUnique(baseHeroBenefits, override.benefits).slice(0, 5),
    scenarios: mergeUnique(baseScenarios, override.scenarios).slice(0, 10),
    planSteps: override.planSteps ?? basePlanSteps,
    planBeforeCourt: override.planBeforeCourt ?? basePlanBeforeCourt,
    planInCourt: override.planInCourt ?? basePlanInCourt,
    timingFactors: mergeUnique(baseTimingFactors, override.timingFactors).slice(0, 6),
    documents: mergeUnique(baseDocuments, override.documents).slice(0, 12),
    priceFactors: mergeUnique(basePriceFactors, override.priceFactors).slice(0, 6),
    priceFormats: override.priceFormats ?? basePriceFormats,
    priceExcludes: mergeUnique(basePriceExcludes, override.priceExcludes).slice(0, 6),
    mistakes: mergeUnique(baseMistakes, override.mistakes).slice(0, 8),
    urgent: mergeUnique(baseUrgent, override.urgent).slice(0, 5),
    cases: override.cases ?? baseCases,
    faqs: mergeFaqs(baseFaqs, override.faqs).slice(0, 12),
    desiredResults: mergeUnique(baseDesiredResults, override.desiredResults).slice(0, 6)
  };
};

export const physCategoryPagePaths = getCategoriesForAudience("phys").reduce<Record<string, string>>(
  (acc, category) => {
    const overrideSlug = CATEGORY_SLUG_OVERRIDES[category.title] ?? category.slug;
    acc[category.title] = `/services/phys/${overrideSlug}`;
    return acc;
  },
  {}
);

const buildCategoryPages = (): PhysServiceEntry[] => {
  return getCategoriesForAudience("phys").map((category) => {
    const overrideSlug = CATEGORY_SLUG_OVERRIDES[category.title] ?? category.slug;
    const title = CATEGORY_TITLE_OVERRIDES[category.title] ?? category.title;
    return {
      title,
      slug: overrideSlug,
      path: `/services/phys/${overrideSlug}`,
      category: category.title,
      heroServiceName: CATEGORY_HERO_NAME_OVERRIDES[category.title],
      isCategory: true
    };
  });
};

const categoryPages = buildCategoryPages();

export const getPhysCategoryPagePath = (categoryTitle: string) => {
  return physCategoryPagePaths[categoryTitle];
};

export const getPhysServiceEntryBySlug = (slug: string): PhysServiceEntry | undefined => {
  const fromServices = audienceServices.find(
    (item) => item.audience === "phys" && item.slug === slug
  );
  if (fromServices) {
    return {
      title: fromServices.title,
      slug: fromServices.slug,
      path: fromServices.path,
      category: fromServices.category ?? "Физические лица",
      description: fromServices.description
    };
  }

  return categoryPages.find((entry) => entry.slug === slug);
};

const getTeamByCategory = (category: string): PhysTeamCard[] => {
  const slugs = CATEGORY_TEAM[category] ?? [];
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

const getReviewsByCategory = (category: string) => {
  const sorted = [
    ...physReviews.filter((review) => review.tags.includes(category)),
    ...physReviews
  ];
  const unique = new Map(sorted.map((review) => [review.id, review]));
  return Array.from(unique.values()).slice(0, 6);
};

const normalizeHeroServiceName = (entry: PhysServiceEntry) => {
  return entry.heroServiceName ?? entry.title.toLowerCase();
};

export const getPhysServicePageData = (entry: PhysServiceEntry): PhysServicePageData => {
  const categoryContent = getCategoryContent(entry.category);
  const heroServiceName = normalizeHeroServiceName(entry);
  const canonical = new URL(entry.path, SITE.url).toString();

  const categoryPath = getPhysCategoryPagePath(entry.category);
  const breadcrumbs = [
    { label: "Услуги", path: "/uslugi" },
    { label: "Физическим лицам", path: "/services/phys" }
  ];
  if (!entry.isCategory && categoryPath) {
    breadcrumbs.push({ label: entry.category, path: categoryPath });
  }
  breadcrumbs.push({ label: entry.title });

  const breadcrumbSchema = [
    { name: "Главная", url: SITE.url },
    { name: "Услуги", url: new URL("/uslugi", SITE.url).toString() },
    { name: "Физическим лицам", url: new URL("/services/phys", SITE.url).toString() }
  ];
  if (!entry.isCategory && categoryPath) {
    breadcrumbSchema.push({ name: entry.category, url: new URL(categoryPath, SITE.url).toString() });
  }
  breadcrumbSchema.push({ name: entry.title, url: canonical });

  const metaTitle = `Адвокат по ${heroServiceName} в Москве — Профзащита`;
  const metaDescription =
    entry.description ??
    `Адвокат по ${heroServiceName} в Москве: оценка перспектив, план действий и сопровождение дела на всех этапах.`;

  const scenarios: PhysScenario[] = categoryContent.scenarios.map((title, index) => ({
    title,
    highlightStep: index % categoryContent.planSteps.length
  }));

  const reviews = getReviewsByCategory(entry.category).map((review) => ({
    name: review.name,
    date: review.date,
    text: review.text,
    rating: review.rating
  }));

  return {
    entry,
    metaTitle,
    metaDescription,
    canonical,
    breadcrumbs,
    breadcrumbSchema,
    categoryLabel: entry.isCategory ? entry.title : entry.category,
    categoryPath,
    heroTitle: `Адвокат по ${heroServiceName} в Москве`,
    heroSubtitle: categoryContent.heroSubtitle,
    heroBenefits: categoryContent.benefits,
    scenarios,
    planSteps: categoryContent.planSteps,
    planBeforeCourt: categoryContent.planBeforeCourt,
    planInCourt: categoryContent.planInCourt,
    timingFactors: categoryContent.timingFactors,
    documents: categoryContent.documents,
    priceFactors: categoryContent.priceFactors,
    priceFormats: categoryContent.priceFormats,
    priceExcludes: categoryContent.priceExcludes,
    mistakes: categoryContent.mistakes,
    urgent: categoryContent.urgent,
    cases: categoryContent.cases,
    team: getTeamByCategory(entry.category),
    reviews,
    faqs: categoryContent.faqs,
    desiredResults: categoryContent.desiredResults
  };
};

export const physServicesList = audienceServices.filter((item) => item.audience === "phys");
