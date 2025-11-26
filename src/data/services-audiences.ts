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
    title: 'Преступления против жизни и здоровья (Глава 16 УК РФ)',
    slug: 'chapter-16',
    path: '/services/phys/chapter-16',
    audience: 'phys',
    priority: 1,
    category: 'Уголовные дела'
  },
  {
    title: 'Расторжение брака и раздел имущества',
    slug: 'razvod-razdel-imushchestva',
    path: '/services/phys/razvod-razdel-imushchestva',
    audience: 'phys',
    priority: 2,
    category: 'Семейные споры'
  },
  {
    title: 'Алименты',
    slug: 'alimenty',
    path: '/services/phys/alimenty',
    audience: 'phys',
    priority: 3,
    category: 'Семейные споры'
  },
  {
    title: 'Место жительства и порядок общения с ребенком',
    slug: 'mesto-zhitelstva-poryadok-obshcheniya',
    path: '/services/phys/mesto-zhitelstva-poryadok-obshcheniya',
    audience: 'phys',
    priority: 4,
    category: 'Семейные споры'
  },
  {
    title: 'Жилищные споры',
    slug: 'zhilishchnye-spory',
    path: '/services/phys/zhilishchnye-spory',
    audience: 'phys',
    priority: 5,
    category: 'Гражданские дела'
  },
  {
    title: 'Наследство',
    slug: 'nasledstvo',
    path: '/services/phys/nasledstvo',
    audience: 'phys',
    priority: 6,
    category: 'Гражданские дела'
  },
  {
    title: 'Защита прав потребителей',
    slug: 'zashchita-prav-potrebitelya',
    path: '/services/phys/zashchita-prav-potrebitelya',
    audience: 'phys',
    priority: 7,
    category: 'Гражданские дела'
  },
  {
    title: 'Помощь при ДТП',
    slug: 'dtp-strahovye-spory',
    path: '/services/phys/dtp-strahovye-spory',
    audience: 'phys',
    priority: 8,
    category: 'Гражданские дела'
  },
  {
    title: 'Трудовые споры',
    slug: 'trudovye-spory',
    path: '/services/phys/trudovye-spory',
    audience: 'phys',
    priority: 9,
    category: 'Гражданские дела'
  },
  {
    title: 'Банкротство физических лиц',
    slug: 'bankrotstvo-fiz-lits',
    path: '/services/phys/bankrotstvo-fiz-lits',
    audience: 'phys',
    priority: 10,
    category: 'Гражданские дела'
  },

  // ========== ЮРИДИЧЕСКИМ ЛИЦАМ ==========
  {
    title: 'Арбитражные споры',
    slug: 'arbitrazhnye-spory',
    path: '/services/biz/arbitrazhnye-spory',
    audience: 'biz',
    priority: 1,
    category: 'Судебное представительство'
  },
  {
    title: 'Договорная работа и претензии',
    slug: 'dogovornaya-rabota-pretensii',
    path: '/services/biz/dogovornaya-rabota-pretensii',
    audience: 'biz',
    priority: 2,
    category: 'Договорная работа'
  },
  {
    title: 'Налоговые споры и проверки',
    slug: 'nalogovye-spory-proverki',
    path: '/services/biz/nalogovye-spory-proverki',
    audience: 'biz',
    priority: 3,
    category: 'Налоговое право'
  },
  {
    title: 'Взыскание дебиторской задолженности',
    slug: 'vzyskanie-debitorskoy-zadolzhennosti',
    path: '/services/biz/vzyskanie-debitorskoy-zadolzhennosti',
    audience: 'biz',
    priority: 4,
    category: 'Исполнительное производство'
  },
  {
    title: 'Банкротство и субсидиарная ответственность',
    slug: 'bankrotstvo-subsidiarnaya-otvetstvennost',
    path: '/services/biz/bankrotstvo-subsidiarnaya-otvetstvennost',
    audience: 'biz',
    priority: 5,
    category: 'Банкротство'
  },
  {
    title: 'Корпоративные споры',
    slug: 'korporativnye-spory',
    path: '/services/biz/korporativnye-spory',
    audience: 'biz',
    priority: 6,
    category: 'Корпоративное право'
  },
  {
    title: 'Защита от рейдерских захватов',
    slug: 'zashchita-ot-rejderskikh-zakhvatov',
    path: '/services/biz/zashchita-ot-rejderskikh-zakhvatov',
    audience: 'biz',
    priority: 7,
    category: 'Корпоративное право'
  },
  {
    title: 'Регистрация и ликвидация компаний',
    slug: 'registratsiya-likvidatsiya-kompaniy',
    path: '/services/biz/registratsiya-likvidatsiya-kompaniy',
    audience: 'biz',
    priority: 8,
    category: 'Корпоративное право'
  },
  {
    title: 'Интеллектуальная собственность',
    slug: 'intellektualnaya-sobstvennost',
    path: '/services/biz/intellektualnaya-sobstvennost',
    audience: 'biz',
    priority: 9,
    category: 'Интеллектуальная собственность'
  },
  {
    title: 'Экономические преступления',
    slug: 'ekonomicheskie-prestupleniya',
    path: '/services/biz/ekonomicheskie-prestupleniya',
    audience: 'biz',
    priority: 10,
    category: 'Уголовная защита бизнеса'
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
