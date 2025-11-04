// Контент-календарь на 3 месяца для блога "Знания"

export interface ContentCalendarItem {
  date: string;
  topic: string;
  goal: string;
  keywords: string[];
  targetServicePage: string;
  author: string;
  status: "planned" | "in-progress" | "published";
}

export const contentCalendar: ContentCalendarItem[] = [
  // Декабрь 2024
  {
    date: "2024-12-05",
    topic: "Обыск: права и ошибки",
    goal: "Обучить клиентов правам при обыске, сформировать запросы 'что делать при обыске', 'права при обыске дома'",
    keywords: ["обыск", "следственные действия", "права", "понятые", "протокол обыска"],
    targetServicePage: "/uslugi/ugolovnye/",
    author: "Сотников Д.В.",
    status: "planned"
  },
  {
    date: "2024-12-18",
    topic: "Апелляция по уголовному делу: сроки и шансы",
    goal: "Объяснить, как работает апелляция, когда имеет смысл обжаловать, увеличить конверсию на услугу 'Апелляция'",
    keywords: ["апелляция", "обжалование приговора", "сроки апелляции", "апелляционная жалоба"],
    targetServicePage: "/uslugi/ugolovnye/apellyaciya/",
    author: "Лютиков И.И.",
    status: "planned"
  },
  
  // Январь 2025
  {
    date: "2025-01-10",
    topic: "Ст. 159 УК РФ (мошенничество): как работает на практике",
    goal: "Разъяснение состава мошенничества, типичные сценарии, защита. Привлечь запросы 'адвокат по мошенничеству', 'защита по 159 УК РФ'",
    keywords: ["159 УК РФ", "мошенничество", "обман", "крупный размер", "защита по мошенничеству"],
    targetServicePage: "/uslugi/ugolovnye/st-159-uk-rf/",
    author: "Лютиков И.И.",
    status: "planned"
  },
  {
    date: "2025-01-24",
    topic: "Залог как мера пресечения: как это работает",
    goal: "Объяснить механизм залога, когда его можно получить, какие суммы, процедура",
    keywords: ["залог", "мера пресечения", "освобождение под залог", "залог по уголовному делу"],
    targetServicePage: "/uslugi/ugolovnye/mera-presecheniya/",
    author: "Сотников Д.В.",
    status: "planned"
  },
  
  // Февраль 2025
  {
    date: "2025-02-07",
    topic: "Домашний арест: права, запреты, контроль",
    goal: "Разъяснение правил домашнего ареста, типичные нарушения, как обжаловать",
    keywords: ["домашний арест", "электронный браслет", "ограничения", "обжалование"],
    targetServicePage: "/uslugi/ugolovnye/domashniy-arest/",
    author: "Рыженко Д.П.",
    status: "planned"
  },
  {
    date: "2025-02-21",
    topic: "Как получить УДО (условно-досрочное освобождение)",
    goal: "Объяснить условия УДО, процедуру, судебную практику. Запросы 'УДО как получить', 'условно-досрочное освобождение адвокат'",
    keywords: ["УДО", "условно-досрочное освобождение", "сроки УДО", "ходатайство УДО"],
    targetServicePage: "/uslugi/ugolovnye/udo/",
    author: "Лютиков И.И.",
    status: "planned"
  },
  
  // Март 2025
  {
    date: "2025-03-07",
    topic: "Амнистия 2025: кто попадает и как проверить",
    goal: "Актуализация по амнистии, если будет принята. Разъяснить критерии, процедуру",
    keywords: ["амнистия", "амнистия 2025", "освобождение по амнистии", "кто попадает под амнистию"],
    targetServicePage: "/uslugi/ugolovnye/amnistiya/",
    author: "Лютиков И.И.",
    status: "planned"
  },
  {
    date: "2025-03-20",
    topic: "Защита в суде первой инстанции: стратегия и тактика",
    goal: "Объяснить, как строится защита на суде, роль адвоката, подготовка к процессу",
    keywords: ["защита в суде", "суд первой инстанции", "адвокат в суде", "судебная защита"],
    targetServicePage: "/uslugi/ugolovnye/",
    author: "Лютиков И.И.",
    status: "planned"
  }
];

// Функция для получения плана на текущий месяц
export const getCurrentMonthPlan = (): ContentCalendarItem[] => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  return contentCalendar.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
  });
};

// Функция для получения следующих запланированных статей
export const getUpcomingArticles = (limit: number = 3): ContentCalendarItem[] => {
  const now = new Date();
  return contentCalendar
    .filter(item => new Date(item.date) > now && item.status === "planned")
    .slice(0, limit);
};
