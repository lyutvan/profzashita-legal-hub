// Конфигурация услуг по аудиториям (физлица / юрлица)

export interface AudienceService {
  title: string;
  slug: string;
  path: string;
  audience: 'phys' | 'biz' | 'criminal';
  priority: number; // Для сортировки топ-5
  category?: string; // Для группировки на категорийных страницах
  description?: string; // Описание услуги
}

export const audienceServices: AudienceService[] = [
  // ========== УГОЛОВНЫЕ ДЕЛА ==========
  {
    title: 'Причинение смерти по неосторожности (ст. 109 УК РФ)',
    slug: 'statya-109',
    path: '/services/criminal/statya-109',
    audience: 'criminal',
    priority: 1,
    category: 'Преступления против жизни и здоровья (Глава 16 УК РФ)',
    description: 'Защита по статье 109 УК РФ — причинение смерти по неосторожности'
  },
  {
    title: 'Доведение до самоубийства (ст. 110 УК РФ)',
    slug: 'statya-110',
    path: '/services/criminal/statya-110',
    audience: 'criminal',
    priority: 2,
    category: 'Преступления против жизни и здоровья (Глава 16 УК РФ)',
    description: 'Защита по статье 110 УК РФ — доведение до самоубийства'
  },
  {
    title: 'Умышленное причинение тяжкого вреда здоровью (ст. 111 УК РФ)',
    slug: 'statya-111',
    path: '/services/criminal/statya-111',
    audience: 'criminal',
    priority: 3,
    category: 'Преступления против жизни и здоровья (Глава 16 УК РФ)',
    description: 'Защита по статье 111 УК РФ — умышленное причинение тяжкого вреда здоровью'
  },
  {
    title: 'Умышленное причинение средней тяжести вреда здоровью (ст. 112 УК РФ)',
    slug: 'statya-112',
    path: '/services/criminal/statya-112',
    audience: 'criminal',
    priority: 4,
    category: 'Преступления против жизни и здоровья (Глава 16 УК РФ)',
    description: 'Защита по статье 112 УК РФ — умышленное причинение средней тяжести вреда здоровью'
  },
  {
    title: 'Умышленное причинение легкого вреда здоровью (ст. 115 УК РФ)',
    slug: 'statya-115',
    path: '/services/criminal/statya-115',
    audience: 'criminal',
    priority: 5,
    category: 'Преступления против жизни и здоровья (Глава 16 УК РФ)',
    description: 'Защита по статье 115 УК РФ — умышленное причинение легкого вреда здоровью'
  },
  {
    title: 'Побои (ст. 116 УК РФ)',
    slug: 'statya-116',
    path: '/services/criminal/statya-116',
    audience: 'criminal',
    priority: 6,
    category: 'Преступления против жизни и здоровья (Глава 16 УК РФ)',
    description: 'Защита по статье 116 УК РФ — побои'
  },
  {
    title: 'Угроза убийством или причинением тяжкого вреда здоровью (ст. 119 УК РФ)',
    slug: 'statya-119',
    path: '/services/criminal/statya-119',
    audience: 'criminal',
    priority: 7,
    category: 'Преступления против жизни и здоровья (Глава 16 УК РФ)',
    description: 'Защита по статье 119 УК РФ — угроза убийством или причинением тяжкого вреда здоровью'
  },
  
  // Глава 17 - Преступления против свободы, чести и достоинства личности
  {
    title: 'Похищение человека (ст. 126 УК РФ)',
    slug: 'statya-126',
    path: '/services/criminal/statya-126',
    audience: 'criminal',
    priority: 8,
    category: 'Преступления против свободы, чести и достоинства (Глава 17 УК РФ)',
    description: 'Защита по статье 126 УК РФ — похищение человека'
  },
  {
    title: 'Незаконное лишение свободы (ст. 127 УК РФ)',
    slug: 'statya-127',
    path: '/services/criminal/statya-127',
    audience: 'criminal',
    priority: 9,
    category: 'Преступления против свободы, чести и достоинства (Глава 17 УК РФ)',
    description: 'Защита по статье 127 УК РФ — незаконное лишение свободы'
  },
  {
    title: 'Клевета (ст. 128.1 УК РФ)',
    slug: 'statya-128-1',
    path: '/services/criminal/statya-128-1',
    audience: 'criminal',
    priority: 10,
    category: 'Преступления против свободы, чести и достоинства (Глава 17 УК РФ)',
    description: 'Защита по статье 128.1 УК РФ — клевета'
  },
  
  // Глава 18 - Преступления против половой неприкосновенности и половой свободы личности
  {
    title: 'Изнасилование (ст. 131 УК РФ)',
    slug: 'statya-131',
    path: '/services/criminal/statya-131',
    audience: 'criminal',
    priority: 11,
    category: 'Преступления против половой неприкосновенности (Глава 18 УК РФ)',
    description: 'Защита по статье 131 УК РФ — изнасилование'
  },
  {
    title: 'Насильственные действия сексуального характера (ст. 132 УК РФ)',
    slug: 'statya-132',
    path: '/services/criminal/statya-132',
    audience: 'criminal',
    priority: 12,
    category: 'Преступления против половой неприкосновенности (Глава 18 УК РФ)',
    description: 'Защита по статье 132 УК РФ — насильственные действия сексуального характера'
  },
  {
    title: 'Развратные действия (ст. 135 УК РФ)',
    slug: 'statya-135',
    path: '/services/criminal/statya-135',
    audience: 'criminal',
    priority: 13,
    category: 'Преступления против половой неприкосновенности (Глава 18 УК РФ)',
    description: 'Защита по статье 135 УК РФ — развратные действия'
  },
  
  // Глава 21 - Преступления против собственности
  {
    title: 'Кража (ст. 158 УК РФ)',
    slug: 'statya-158',
    path: '/services/criminal/statya-158',
    audience: 'criminal',
    priority: 14,
    category: 'Преступления против собственности (Глава 21 УК РФ)',
    description: 'Защита по статье 158 УК РФ — кража'
  },
  {
    title: 'Мошенничество (ст. 159 УК РФ)',
    slug: 'statya-159',
    path: '/services/criminal/statya-159',
    audience: 'criminal',
    priority: 15,
    category: 'Преступления против собственности (Глава 21 УК РФ)',
    description: 'Защита по статье 159 УК РФ — мошенничество'
  },

  // ========== ФИЗИЧЕСКИМ ЛИЦАМ ==========
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
export const getServicesByAudience = (audience: 'phys' | 'biz' | 'criminal') => {
  return audienceServices
    .filter(s => s.audience === audience)
    .sort((a, b) => a.priority - b.priority);
};

export const getTopServices = (audience: 'phys' | 'biz' | 'criminal', limit: number = 5) => {
  return getServicesByAudience(audience).slice(0, limit);
};

export const getServicesByCategory = (audience: 'phys' | 'biz' | 'criminal') => {
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
  },
  criminal: {
    title: 'Уголовные дела',
    subtitle: 'Защита по уголовным статьям',
    description: 'Профессиональная защита в уголовном процессе по различным составам преступлений'
  }
};
