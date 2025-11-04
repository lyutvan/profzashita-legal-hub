// Конфигурация услуг по аудиториям (физлица / юрлица)

export interface AudienceService {
  title: string;
  slug: string;
  path: string;
  audience: 'phys' | 'biz';
  priority: number; // Для сортировки топ-5
  category?: string; // Для группировки на категорийных страницах
}

export const audienceServices: AudienceService[] = [
  // ========== ФИЗИЧЕСКИМ ЛИЦАМ ==========
  {
    title: 'Задержание',
    slug: 'zaderzhanie',
    path: '/uslugi/ugolovnoye-delo/zaderzhanie',
    audience: 'phys',
    priority: 1,
    category: 'Уголовные дела'
  },
  {
    title: 'Обыск',
    slug: 'obysk',
    path: '/uslugi/ugolovnoye-delo/obysk',
    audience: 'phys',
    priority: 2,
    category: 'Уголовные дела'
  },
  {
    title: 'Допрос',
    slug: 'dopros',
    path: '/uslugi/ugolovnoye-delo/dopros',
    audience: 'phys',
    priority: 3,
    category: 'Уголовные дела'
  },
  {
    title: '228 УК РФ (Наркотики)',
    slug: '228-uk-rf',
    path: '/uslugi/ugolovnoye-delo/228-uk-rf',
    audience: 'phys',
    priority: 4,
    category: 'Уголовные дела'
  },
  {
    title: '159 УК РФ (Мошенничество)',
    slug: '159-uk-rf',
    path: '/uslugi/ugolovnoye-delo/159-uk-rf',
    audience: 'phys',
    priority: 5,
    category: 'Уголовные дела'
  },
  {
    title: 'Развод и раздел имущества',
    slug: 'razvod',
    path: '/uslugi/grazhdanskie-spory/razvod',
    audience: 'phys',
    priority: 6,
    category: 'Семейные споры'
  },
  {
    title: 'Алименты',
    slug: 'alimenty',
    path: '/uslugi/grazhdanskie-spory/alimenty',
    audience: 'phys',
    priority: 7,
    category: 'Семейные споры'
  },
  {
    title: 'Жилищные споры',
    slug: 'zhilishchnye-spory',
    path: '/uslugi/grazhdanskie-spory/zhilishchnye-spory',
    audience: 'phys',
    priority: 8,
    category: 'Гражданские дела'
  },
  {
    title: 'Наследство',
    slug: 'nasledstvo',
    path: '/uslugi/grazhdanskie-spory/nasledstvo',
    audience: 'phys',
    priority: 9,
    category: 'Гражданские дела'
  },
  {
    title: 'Трудовые споры',
    slug: 'trudovye-spory',
    path: '/uslugi/grazhdanskie-spory/trudovye-spory',
    audience: 'phys',
    priority: 10,
    category: 'Трудовые дела'
  },
  {
    title: 'Защита прав потребителей',
    slug: 'potrebiteli',
    path: '/uslugi/grazhdanskie-spory/potrebiteli',
    audience: 'phys',
    priority: 11,
    category: 'Гражданские дела'
  },
  {
    title: 'ДТП и страховые споры',
    slug: 'dtp',
    path: '/uslugi/grazhdanskie-spory/dtp',
    audience: 'phys',
    priority: 12,
    category: 'Гражданские дела'
  },

  // ========== ЮРИДИЧЕСКИМ ЛИЦАМ ==========
  {
    title: 'Арбитражные споры',
    slug: 'arbitrazh',
    path: '/uslugi/arbitrazh-biznes/arbitrazh',
    audience: 'biz',
    priority: 1,
    category: 'Судебная защита'
  },
  {
    title: 'Договорная работа и претензии',
    slug: 'dogovory',
    path: '/uslugi/arbitrazh-biznes/dogovory',
    audience: 'biz',
    priority: 2,
    category: 'Договорная работа'
  },
  {
    title: 'Налоговые споры и проверки',
    slug: 'nalogi',
    path: '/uslugi/arbitrazh-biznes/nalogi',
    audience: 'biz',
    priority: 3,
    category: 'Налоговое право'
  },
  {
    title: 'Взыскание дебиторской задолженности',
    slug: 'vzyskanie',
    path: '/uslugi/arbitrazh-biznes/vzyskanie',
    audience: 'biz',
    priority: 4,
    category: 'Взыскание долгов'
  },
  {
    title: 'Банкротство и субсидиарная ответственность',
    slug: 'bankrotstvo',
    path: '/uslugi/arbitrazh-biznes/bankrotstvo',
    audience: 'biz',
    priority: 5,
    category: 'Банкротство'
  },
  {
    title: 'Корпоративные споры',
    slug: 'korporativnye',
    path: '/uslugi/arbitrazh-biznes/korporativnye',
    audience: 'biz',
    priority: 6,
    category: 'Корпоративное право'
  },
  {
    title: 'Защита от рейдерских захватов',
    slug: 'rejderstvo',
    path: '/uslugi/arbitrazh-biznes/rejderstvo',
    audience: 'biz',
    priority: 7,
    category: 'Корпоративное право'
  },
  {
    title: 'Интеллектуальная собственность',
    slug: 'intellektualnaya',
    path: '/uslugi/arbitrazh-biznes/intellektualnaya',
    audience: 'biz',
    priority: 8,
    category: 'Интеллектуальная собственность'
  },
  {
    title: 'Экономические преступления',
    slug: 'ekonomicheskie',
    path: '/uslugi/arbitrazh-biznes/ekonomicheskie',
    audience: 'biz',
    priority: 9,
    category: 'Уголовная защита бизнеса'
  },
  {
    title: 'Регистрация и ликвидация компаний',
    slug: 'registraciya',
    path: '/uslugi/arbitrazh-biznes/registraciya',
    audience: 'biz',
    priority: 10,
    category: 'Корпоративное право'
  }
];

// Функции для работы с данными
export const getServicesByAudience = (audience: 'phys' | 'biz') => {
  return audienceServices
    .filter(s => s.audience === audience)
    .sort((a, b) => a.priority - b.priority);
};

export const getTopServices = (audience: 'phys' | 'biz', limit: number = 5) => {
  return getServicesByAudience(audience).slice(0, limit);
};

export const getServicesByCategory = (audience: 'phys' | 'biz') => {
  const services = getServicesByAudience(audience);
  const grouped: Record<string, AudienceService[]> = {};
  
  services.forEach(service => {
    const cat = service.category || 'Другое';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(service);
  });
  
  return grouped;
};

export const audienceConfig = {
  phys: {
    title: 'Физическим лицам',
    subtitle: 'Защита прав граждан и помощь в бытовых и уголовных делах',
    description: 'Оказываем юридическую помощь гражданам по уголовным, гражданским, семейным и трудовым делам'
  },
  biz: {
    title: 'Юридическим лицам',
    subtitle: 'Корпоративное обслуживание бизнеса',
    description: 'Правовое сопровождение бизнеса и защита интересов в судах'
  }
};
