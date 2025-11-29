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
  {
    title: 'Присвоение или растрата (ст. 160 УК РФ)',
    slug: 'statya-160',
    path: '/services/criminal/statya-160',
    audience: 'criminal',
    priority: 16,
    category: 'Преступления против собственности (Глава 21 УК РФ)',
    description: 'Защита по статье 160 УК РФ — присвоение или растрата'
  },
  {
    title: 'Грабеж (ст. 161 УК РФ)',
    slug: 'statya-161',
    path: '/services/criminal/statya-161',
    audience: 'criminal',
    priority: 17,
    category: 'Преступления против собственности (Глава 21 УК РФ)',
    description: 'Защита по статье 161 УК РФ — грабеж'
  },
  {
    title: 'Разбой (ст. 162 УК РФ)',
    slug: 'statya-162',
    path: '/services/criminal/statya-162',
    audience: 'criminal',
    priority: 18,
    category: 'Преступления против собственности (Глава 21 УК РФ)',
    description: 'Защита по статье 162 УК РФ — разбой'
  },
  {
    title: 'Вымогательство (ст. 163 УК РФ)',
    slug: 'statya-163',
    path: '/services/criminal/statya-163',
    audience: 'criminal',
    priority: 19,
    category: 'Преступления против собственности (Глава 21 УК РФ)',
    description: 'Защита по статье 163 УК РФ — вымогательство'
  },
  {
    title: 'Умышленное уничтожение или повреждение имущества (ст. 167 УК РФ)',
    slug: 'statya-167',
    path: '/services/criminal/statya-167',
    audience: 'criminal',
    priority: 20,
    category: 'Преступления против собственности (Глава 21 УК РФ)',
    description: 'Защита по статье 167 УК РФ — умышленное уничтожение или повреждение имущества'
  },
  
  // Глава 22 - Преступления в сфере экономической деятельности
  {
    title: 'Незаконное предпринимательство (ст. 171 УК РФ)',
    slug: 'statya-171',
    path: '/services/criminal/statya-171',
    audience: 'criminal',
    priority: 21,
    category: 'Преступления в сфере экономической деятельности (Глава 22 УК РФ)',
    description: 'Защита по статье 171 УК РФ — незаконное предпринимательство'
  },
  {
    title: 'Незаконная банковская деятельность (ст. 172 УК РФ)',
    slug: 'statya-172',
    path: '/services/criminal/statya-172',
    audience: 'criminal',
    priority: 22,
    category: 'Преступления в сфере экономической деятельности (Глава 22 УК РФ)',
    description: 'Защита по статье 172 УК РФ — незаконная банковская деятельность'
  },
  {
    title: 'Легализация (отмывание) денежных средств (ст. 174 УК РФ)',
    slug: 'statya-174',
    path: '/services/criminal/statya-174',
    audience: 'criminal',
    priority: 23,
    category: 'Преступления в сфере экономической деятельности (Глава 22 УК РФ)',
    description: 'Защита по статье 174 УК РФ — легализация (отмывание) денежных средств'
  },
  {
    title: 'Приобретение или сбыт имущества, заведомо добытого преступным путем (ст. 175 УК РФ)',
    slug: 'statya-175',
    path: '/services/criminal/statya-175',
    audience: 'criminal',
    priority: 24,
    category: 'Преступления в сфере экономической деятельности (Глава 22 УК РФ)',
    description: 'Защита по статье 175 УК РФ — приобретение или сбыт имущества, заведомо добытого преступным путем'
  },
  
  // Глава 24 - Преступления против общественной безопасности
  {
    title: 'Террористический акт (ст. 205 УК РФ)',
    slug: 'statya-205',
    path: '/services/criminal/statya-205',
    audience: 'criminal',
    priority: 25,
    category: 'Преступления против общественной безопасности (Глава 24 УК РФ)',
    description: 'Защита по статье 205 УК РФ — террористический акт'
  },
  {
    title: 'Содействие террористической деятельности (ст. 205.1 УК РФ)',
    slug: 'statya-205-1',
    path: '/services/criminal/statya-205-1',
    audience: 'criminal',
    priority: 26,
    category: 'Преступления против общественной безопасности (Глава 24 УК РФ)',
    description: 'Защита по статье 205.1 УК РФ — содействие террористической деятельности'
  },
  {
    title: 'Публичные призывы к осуществлению террористической деятельности (ст. 205.2 УК РФ)',
    slug: 'statya-205-2',
    path: '/services/criminal/statya-205-2',
    audience: 'criminal',
    priority: 27,
    category: 'Преступления против общественной безопасности (Глава 24 УК РФ)',
    description: 'Защита по статье 205.2 УК РФ — публичные призывы к осуществлению террористической деятельности'
  },
  {
    title: 'Организация террористического сообщества (ст. 205.4 УК РФ)',
    slug: 'statya-205-4',
    path: '/services/criminal/statya-205-4',
    audience: 'criminal',
    priority: 28,
    category: 'Преступления против общественной безопасности (Глава 24 УК РФ)',
    description: 'Защита по статье 205.4 УК РФ — организация террористического сообщества'
  },
  {
    title: 'Массовые беспорядки (ст. 212 УК РФ)',
    slug: 'statya-212',
    path: '/services/criminal/statya-212',
    audience: 'criminal',
    priority: 29,
    category: 'Преступления против общественной безопасности (Глава 24 УК РФ)',
    description: 'Защита по статье 212 УК РФ — массовые беспорядки'
  },
  {
    title: 'Хулиганство (ст. 213 УК РФ)',
    slug: 'statya-213',
    path: '/services/criminal/statya-213',
    audience: 'criminal',
    priority: 30,
    category: 'Преступления против общественной безопасности (Глава 24 УК РФ)',
    description: 'Защита по статье 213 УК РФ — хулиганство'
  },
  {
    title: 'Незаконный оборот оружия (ст. 222 УК РФ)',
    slug: 'statya-222',
    path: '/services/criminal/statya-222',
    audience: 'criminal',
    priority: 31,
    category: 'Преступления против общественной безопасности (Глава 24 УК РФ)',
    description: 'Защита по статье 222 УК РФ — незаконные приобретение, передача, сбыт, хранение, перевозка или ношение оружия'
  },
  {
    title: 'Незаконное изготовление оружия (ст. 223 УК РФ)',
    slug: 'statya-223',
    path: '/services/criminal/statya-223',
    audience: 'criminal',
    priority: 32,
    category: 'Преступления против общественной безопасности (Глава 24 УК РФ)',
    description: 'Защита по статье 223 УК РФ — незаконное изготовление оружия'
  },
  
  // Глава 25 - Преступления против здоровья населения и общественной нравственности
  {
    title: 'Незаконный оборот наркотиков (ст. 228 УК РФ)',
    slug: 'statya-228',
    path: '/services/criminal/statya-228',
    audience: 'criminal',
    priority: 33,
    category: 'Преступления против здоровья населения (Глава 25 УК РФ)',
    description: 'Защита по статье 228 УК РФ — незаконные приобретение, хранение, перевозка наркотических средств'
  },
  {
    title: 'Незаконные производство и сбыт наркотиков (ст. 228.1 УК РФ)',
    slug: 'statya-228-1',
    path: '/services/criminal/statya-228-1',
    audience: 'criminal',
    priority: 34,
    category: 'Преступления против здоровья населения (Глава 25 УК РФ)',
    description: 'Защита по статье 228.1 УК РФ — незаконные производство, сбыт или пересылка наркотических средств'
  },
  {
    title: 'Незаконный оборот сильнодействующих веществ (ст. 234 УК РФ)',
    slug: 'statya-234',
    path: '/services/criminal/statya-234',
    audience: 'criminal',
    priority: 35,
    category: 'Преступления против здоровья населения (Глава 25 УК РФ)',
    description: 'Защита по статье 234 УК РФ — незаконный оборот сильнодействующих или ядовитых веществ'
  },
  
  // Глава 30 - Преступления против государственной власти, интересов государственной службы
  {
    title: 'Получение взятки (ст. 290 УК РФ)',
    slug: 'statya-290',
    path: '/services/criminal/statya-290',
    audience: 'criminal',
    priority: 36,
    category: 'Преступления против государственной власти (Глава 30 УК РФ)',
    description: 'Защита по статье 290 УК РФ — получение взятки'
  },
  {
    title: 'Дача взятки (ст. 291 УК РФ)',
    slug: 'statya-291',
    path: '/services/criminal/statya-291',
    audience: 'criminal',
    priority: 37,
    category: 'Преступления против государственной власти (Глава 30 УК РФ)',
    description: 'Защита по статье 291 УК РФ — дача взятки'
  },
  {
    title: 'Посредничество во взяточничестве (ст. 291.1 УК РФ)',
    slug: 'statya-291-1',
    path: '/services/criminal/statya-291-1',
    audience: 'criminal',
    priority: 38,
    category: 'Преступления против государственной власти (Глава 30 УК РФ)',
    description: 'Защита по статье 291.1 УК РФ — посредничество во взяточничестве'
  },
  {
    title: 'Халатность (ст. 293 УК РФ)',
    slug: 'statya-293',
    path: '/services/criminal/statya-293',
    audience: 'criminal',
    priority: 39,
    category: 'Преступления против государственной власти (Глава 30 УК РФ)',
    description: 'Защита по статье 293 УК РФ — халатность'
  },
  
  // Глава 32 - Преступления против порядка управления
  {
    title: 'Посягательство на жизнь сотрудника правоохранительного органа (ст. 317 УК РФ)',
    slug: 'statya-317',
    path: '/services/criminal/statya-317',
    audience: 'criminal',
    priority: 40,
    category: 'Преступления против порядка управления (Глава 32 УК РФ)',
    description: 'Защита по статье 317 УК РФ — посягательство на жизнь сотрудника правоохранительного органа'
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
