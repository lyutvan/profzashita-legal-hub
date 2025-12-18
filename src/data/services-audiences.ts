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
    title: 'Убийство (ст. 105 УК РФ)',
    slug: 'statya-105',
    path: '/services/criminal/statya-105',
    audience: 'criminal',
    priority: 1,
    category: 'Преступления против жизни и здоровья (Глава 16 УК РФ)',
    description: 'Защита по статье 105 УК РФ — убийство'
  },
  {
    title: 'Причинение смерти по неосторожности (ст. 109 УК РФ)',
    slug: 'statya-109',
    path: '/services/criminal/statya-109',
    audience: 'criminal',
    priority: 2,
    category: 'Преступления против жизни и здоровья (Глава 16 УК РФ)',
    description: 'Защита по статье 109 УК РФ — причинение смерти по неосторожности'
  },
  {
    title: 'Доведение до самоубийства (ст. 110 УК РФ)',
    slug: 'statya-110',
    path: '/services/criminal/statya-110',
    audience: 'criminal',
    priority: 3,
    category: 'Преступления против жизни и здоровья (Глава 16 УК РФ)',
    description: 'Защита по статье 110 УК РФ — доведение до самоубийства'
  },
  {
    title: 'Умышленное причинение тяжкого вреда здоровью (ст. 111 УК РФ)',
    slug: 'statya-111',
    path: '/services/criminal/statya-111',
    audience: 'criminal',
    priority: 4,
    category: 'Преступления против жизни и здоровья (Глава 16 УК РФ)',
    description: 'Защита по статье 111 УК РФ — умышленное причинение тяжкого вреда здоровью'
  },
  {
    title: 'Умышленное причинение средней тяжести вреда здоровью (ст. 112 УК РФ)',
    slug: 'statya-112',
    path: '/services/criminal/statya-112',
    audience: 'criminal',
    priority: 5,
    category: 'Преступления против жизни и здоровья (Глава 16 УК РФ)',
    description: 'Защита по статье 112 УК РФ — умышленное причинение средней тяжести вреда здоровью'
  },
  {
    title: 'Умышленное причинение легкого вреда здоровью (ст. 115 УК РФ)',
    slug: 'statya-115',
    path: '/services/criminal/statya-115',
    audience: 'criminal',
    priority: 6,
    category: 'Преступления против жизни и здоровья (Глава 16 УК РФ)',
    description: 'Защита по статье 115 УК РФ — умышленное причинение легкого вреда здоровью'
  },
  {
    title: 'Побои (ст. 116 УК РФ)',
    slug: 'statya-116',
    path: '/services/criminal/statya-116',
    audience: 'criminal',
    priority: 7,
    category: 'Преступления против жизни и здоровья (Глава 16 УК РФ)',
    description: 'Защита по статье 116 УК РФ — побои'
  },
  {
    title: 'Угроза убийством или причинением тяжкого вреда здоровью (ст. 119 УК РФ)',
    slug: 'statya-119',
    path: '/services/criminal/statya-119',
    audience: 'criminal',
    priority: 8,
    category: 'Преступления против жизни и здоровья (Глава 16 УК РФ)',
    description: 'Защита по статье 119 УК РФ — угроза убийством или причинением тяжкого вреда здоровью'
  },
  
  // Глава 17 - Преступления против свободы, чести и достоинства личности
  {
    title: 'Похищение человека (ст. 126 УК РФ)',
    slug: 'statya-126',
    path: '/services/criminal/statya-126',
    audience: 'criminal',
    priority: 9,
    category: 'Преступления против свободы, чести и достоинства (Глава 17 УК РФ)',
    description: 'Защита по статье 126 УК РФ — похищение человека'
  },
  {
    title: 'Незаконное лишение свободы (ст. 127 УК РФ)',
    slug: 'statya-127',
    path: '/services/criminal/statya-127',
    audience: 'criminal',
    priority: 10,
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
  {
    title: 'Применение насилия в отношении представителя власти (ст. 318 УК РФ)',
    slug: 'statya-318',
    path: '/services/criminal/statya-318',
    audience: 'criminal',
    priority: 41,
    category: 'Преступления против порядка управления (Глава 32 УК РФ)',
    description: 'Защита по статье 318 УК РФ — применение насилия в отношении представителя власти'
  },
  {
    title: 'Организация незаконной миграции (ст. 322.1 УК РФ)',
    slug: 'statya-322-1',
    path: '/services/criminal/statya-322-1',
    audience: 'criminal',
    priority: 42,
    category: 'Преступления против порядка управления (Глава 32 УК РФ)',
    description: 'Защита по статье 322.1 УК РФ — организация незаконной миграции'
  },
  {
    title: 'Подделка документов (ст. 327 УК РФ)',
    slug: 'statya-327',
    path: '/services/criminal/statya-327',
    audience: 'criminal',
    priority: 43,
    category: 'Преступления против порядка управления (Глава 32 УК РФ)',
    description: 'Защита по статье 327 УК РФ — подделка, изготовление или сбыт поддельных документов'
  },
  {
    title: 'Самоуправство (ст. 330 УК РФ)',
    slug: 'statya-330',
    path: '/services/criminal/statya-330',
    audience: 'criminal',
    priority: 44,
    category: 'Преступления против порядка управления (Глава 32 УК РФ)',
    description: 'Защита по статье 330 УК РФ — самоуправство'
  },

  // ========== ФИЗИЧЕСКИМ ЛИЦАМ ==========
  {
    title: 'Расторжение брака',
    slug: 'razvod',
    path: '/services/phys/razvod',
    audience: 'phys',
    priority: 2,
    category: 'Семейные споры'
  },
  {
    title: 'Взыскание алиментов, изменение размера алиментов, задолженность по алиментам',
    slug: 'alimenty',
    path: '/services/phys/alimenty',
    audience: 'phys',
    priority: 3,
    category: 'Семейные споры'
  },
  {
    title: 'Определение места жительства ребёнка',
    slug: 'mesto-zhitelstva-rebenka',
    path: '/services/phys/mesto-zhitelstva-rebenka',
    audience: 'phys',
    priority: 4,
    category: 'Семейные споры'
  },
  {
    title: 'Определение порядка общения с ребёнком / участие в воспитании',
    slug: 'poryadok-obshcheniya-s-rebenkom',
    path: '/services/phys/poryadok-obshcheniya-s-rebenkom',
    audience: 'phys',
    priority: 4.5,
    category: 'Семейные споры',
    description: 'Определение порядка общения и участия в воспитании ребёнка: подготовка документов и представительство в суде.'
  },
  {
    title: 'Ограничение и лишение родительских прав',
    slug: 'lishenie-roditelskih-prav',
    path: '/services/phys/lishenie-roditelskih-prav',
    audience: 'phys',
    priority: 4.6,
    category: 'Семейные споры',
    description: 'Подготовка и ведение дел об ограничении или лишении родительских прав, защита интересов ребёнка и родителя.'
  },
  {
    title: 'Установление и оспаривание отцовства / материнства',
    slug: 'otcovstvo-materinstvo',
    path: '/services/phys/otcovstvo-materinstvo',
    audience: 'phys',
    priority: 4.7,
    category: 'Семейные споры',
    description: 'Сопровождение дел об установлении или оспаривании отцовства/материнства, экспертизы и представительство в суде.'
  },
  {
    title: 'Раздел совместно нажитого имущества супругов',
    slug: 'razdel-imushchestva-suprugov',
    path: '/services/phys/razdel-imushchestva-suprugov',
    audience: 'phys',
    priority: 4.8,
    category: 'Семейные споры',
    description: 'Раздел имущества супругов: переговоры, соглашения, судебное представительство и защита долей.'
  },
  {
    title: 'Брачный договор: составление, изменение, оспаривание',
    slug: 'brachnyj-dogovor',
    path: '/services/phys/brachnyj-dogovor',
    audience: 'phys',
    priority: 4.9,
    category: 'Семейные споры',
    description: 'Подготовка брачного договора, внесение изменений и оспаривание условий в суде.'
  },
  {
    title: 'Устранение препятствий во вселении',
    slug: 'ustranenie-prepyatstviy-vo-vselenii',
    path: '/services/phys/ustranenie-prepyatstviy-vo-vselenii',
    audience: 'phys',
    priority: 5.0,
    category: 'Семейные споры',
    description: 'Защита права проживания: устранение препятствий во вселении и пользовании жилым помещением в рамках семейного конфликта.'
  },
  {
    title: 'Выселение',
    slug: 'vyselenie',
    path: '/services/phys/vyselenie',
    audience: 'phys',
    priority: 5,
    category: 'Жилищные споры'
  },
  {
    title: 'Снятие с регистрационного учёта',
    slug: 'snyatie-s-registracionnogo-ucheta',
    path: '/services/phys/snyatie-s-registracionnogo-ucheta',
    audience: 'phys',
    priority: 6,
    category: 'Жилищные споры'
  },
  {
    title: 'Определение порядка пользования жилым помещением (квартира/комната)',
    slug: 'poryadok-polzovaniya-zhilym-pomeshcheniem',
    path: '/services/phys/poryadok-polzovaniya-zhilym-pomeshcheniem',
    audience: 'phys',
    priority: 6.1,
    category: 'Жилищные споры',
    description: 'Определение порядка пользования квартирой или комнатой: закрепление правил проживания и долей пользования, судебное представительство.'
  },
  {
    title: 'Взыскание задолженности по ЖКУ, перерасчёт начислений',
    slug: 'zadolzhennost-zhku-pereraschet',
    path: '/services/phys/zadolzhennost-zhku-pereraschet',
    audience: 'phys',
    priority: 6.2,
    category: 'Жилищные споры',
    description: 'Взыскание/оспаривание задолженности по коммунальным платежам, перерасчёт начислений, подготовка претензий и исков.'
  },
  {
    title: 'Споры с управляющей компанией (УК/ТСЖ)',
    slug: 'spory-s-uk-tszh',
    path: '/services/phys/spory-s-uk-tszh',
    audience: 'phys',
    priority: 6.3,
    category: 'Жилищные споры',
    description: 'Споры с УК/ТСЖ: качество услуг, начисления, заливы, акты, претензии и представительство в суде.'
  },
  {
    title: 'Оспаривание приватизации',
    slug: 'osparivanie-privatizacii',
    path: '/services/phys/osparivanie-privatizacii',
    audience: 'phys',
    priority: 6.4,
    category: 'Жилищные споры',
    description: 'Оспаривание приватизации: анализ документов, подготовка исков, защита прав проживающих и собственников.'
  },
  {
    title: 'Споры по договору социального найма (соцнайм)',
    slug: 'spory-socnajem',
    path: '/services/phys/spory-socnajem',
    audience: 'phys',
    priority: 6.5,
    category: 'Жилищные споры',
    description: 'Споры по соцнайму: признание прав пользования, изменения условий, выселение/вселение, сопровождение в суде.'
  },
  {
    title: 'Устранение препятствий в пользовании жилым помещением',
    slug: 'ustranenie-prepyatstviy-v-polzovanii-zhilym-pomeshcheniem',
    path: '/services/phys/ustranenie-prepyatstviy-v-polzovanii-zhilym-pomeshcheniem',
    audience: 'phys',
    priority: 6.6,
    category: 'Жилищные споры',
    description: 'Устранение препятствий в пользовании жильём: доступ в квартиру, смена замков, определение порядка пользования и защита прав.'
  },
  {
    title: 'Залив квартиры: взыскание ущерба',
    slug: 'zaliv-kvartiry',
    path: '/services/phys/zaliv-kvartiry',
    audience: 'phys',
    priority: 7,
    category: 'Ущерб имуществу'
  },
  {
    title: 'Взыскание убытков и расходов',
    slug: 'vzyskanie-ubytkov',
    path: '/services/phys/vzyskanie-ubytkov',
    audience: 'phys',
    priority: 8,
    category: 'Ущерб имуществу'
  },
  {
    title: 'Возмещение ущерба от действий третьих лиц',
    slug: 'vozmeshchenie-ushcherba',
    path: '/services/phys/vozmeshchenie-ushcherba',
    audience: 'phys',
    priority: 9,
    category: 'Ущерб имуществу'
  },
  {
    title: 'Вступление в наследство, оформление наследственных прав',
    slug: 'vstuplenie-v-nasledstvo',
    path: '/services/phys/vstuplenie-v-nasledstvo',
    audience: 'phys',
    priority: 10,
    category: 'Наследственные дела'
  },
  {
    title: 'Фактическое принятие наследства',
    slug: 'fakticheskoe-prinyatie-nasledstva',
    path: '/services/phys/fakticheskoe-prinyatie-nasledstva',
    audience: 'phys',
    priority: 11,
    category: 'Наследственные дела'
  },
  {
    title: 'Восстановление срока принятия наследства',
    slug: 'vosstanovlenie-sroka-nasledstva',
    path: '/services/phys/vosstanovlenie-sroka-nasledstva',
    audience: 'phys',
    priority: 12,
    category: 'Наследственные дела'
  },
  {
    title: 'Раздел наследственного имущества',
    slug: 'razdel-nasledstvennogo-imushchestva',
    path: '/services/phys/razdel-nasledstvennogo-imushchestva',
    audience: 'phys',
    priority: 12.1,
    category: 'Наследственные дела',
    description: 'Раздел наследственного имущества между наследниками: подготовка соглашения, судебное представительство и защита долей.'
  },
  {
    title: 'Признание недостойным наследником',
    slug: 'nedostoynyy-naslednik',
    path: '/services/phys/nedostoynyy-naslednik',
    audience: 'phys',
    priority: 12.2,
    category: 'Наследственные дела',
    description: 'Сопровождение дел о признании наследника недостойным: сбор доказательств, подготовка иска и представительство в суде.'
  },
  {
    title: 'Признание права собственности в порядке наследования',
    slug: 'pravo-sobstvennosti-v-poryadke-nasledovaniya',
    path: '/services/phys/pravo-sobstvennosti-v-poryadke-nasledovaniya',
    audience: 'phys',
    priority: 12.3,
    category: 'Наследственные дела',
    description: 'Признание права собственности на наследственное имущество через суд при отсутствии документов или споре между наследниками.'
  },
  {
    title: 'Оспаривание завещания',
    slug: 'osparivanie-zaveshchaniya',
    path: '/services/phys/osparivanie-zaveshchaniya',
    audience: 'phys',
    priority: 12.4,
    category: 'Наследственные дела',
    description: 'Оспаривание завещания: анализ оснований (недееспособность, заблуждение, давление), сбор доказательств, подготовка иска и представительство в суде.'
  },
 
  // Взыскание долгов и договорные споры
  {
    title: 'Взыскание денежных средств по распискам',
    slug: 'vzyskanie-po-raspiskam',
    path: '/services/phys/vzyskanie-po-raspiskam',
    audience: 'phys',
    priority: 11,
    category: 'Взыскание долгов и договорные споры'
  },
  {
    title: 'Взыскание задолженности по договорам (поставка, подряд, услуги, аренда, займ)',
    slug: 'vzyskanie-po-dogovoram',
    path: '/services/phys/vzyskanie-po-dogovoram',
    audience: 'phys',
    priority: 12,
    category: 'Взыскание долгов и договорные споры'
  },
  {
    title: 'Расторжение договора оказания услуг',
    slug: 'rastorzhenie-dogovora-uslug',
    path: '/services/phys/rastorzhenie-dogovora-uslug',
    audience: 'phys',
    priority: 13,
    category: 'Взыскание долгов и договорные споры'
  },
  {
    title: 'Признание договора недействительным (купля-продажа, мена и др.)',
    slug: 'priznanie-dogovora-nedeystvitelnym',
    path: '/services/phys/priznanie-dogovora-nedeystvitelnym',
    audience: 'phys',
    priority: 13.1,
    category: 'Взыскание долгов и договорные споры',
    description: 'Оспаривание сделок и признание договоров недействительными: анализ оснований, подготовка иска и защита интересов в суде.'
  },
  {
    title: 'Признание договора незаключённым (купля-продажа / услуги)',
    slug: 'priznanie-dogovora-nezaklyuchennym',
    path: '/services/phys/priznanie-dogovora-nezaklyuchennym',
    audience: 'phys',
    priority: 13.2,
    category: 'Взыскание долгов и договорные споры',
    description: 'Признание договора незаключённым: отсутствие согласованных условий, доказательства и судебное сопровождение.'
  },
  {
    title: 'Отказ от исполнения договора (услуги / купля-продажа)',
    slug: 'otkaz-ot-ispolneniya-dogovora',
    path: '/services/phys/otkaz-ot-ispolneniya-dogovora',
    audience: 'phys',
    priority: 13.3,
    category: 'Взыскание долгов и договорные споры',
    description: 'Подготовка правомерного отказа от договора, претензии, возврат денежных средств и защита прав в суде.'
  },
  {
    title: 'Неосновательное обогащение',
    slug: 'neosnovatelnoe-obogashchenie',
    path: '/services/phys/neosnovatelnoe-obogashchenie',
    audience: 'phys',
    priority: 13.4,
    category: 'Взыскание долгов и договорные споры',
    description: 'Взыскание неосновательного обогащения: расчёт суммы, подготовка претензии/иска и представительство в суде.'
  },
  {
    title: 'Взыскание арендных платежей',
    slug: 'vzyskanie-arendnyh-platezhey',
    path: '/services/phys/vzyskanie-arendnyh-platezhey',
    audience: 'phys',
    priority: 13.5,
    category: 'Взыскание долгов и договорные споры',
    description: 'Взыскание задолженности по аренде: претензионная работа, расчёт долга и судебное взыскание.'
  },
  {
    title: 'Оспаривание штрафов, пеней, неустоек (снижение, проверка расчётов)',
    slug: 'osparivanie-neustoyki-shtrafov-peney',
    path: '/services/phys/osparivanie-neustoyki-shtrafov-peney',
    audience: 'phys',
    priority: 13.6,
    category: 'Взыскание долгов и договорные споры',
    description: 'Проверка расчётов и снижение неустойки/штрафов/пеней, подготовка возражений и представительство в суде.'
  },

  // Защита прав потребителей
  {
    title: 'Возврат денежных средств за товар/услугу, отказ от договора',
    slug: 'vozvrat-denezhnyh-sredstv-zozpp',
    path: '/services/phys/vozvrat-denezhnyh-sredstv-zozpp',
    audience: 'phys',
    priority: 14.0,
    category: 'Защита прав потребителей',
    description: 'Подготовка претензии и сопровождение возврата денежных средств за товар или услугу, оформление отказа от договора и защита интересов в суде.'
  },
  {
    title: 'Споры о некачественных товарах и услугах',
    slug: 'spory-nekachestvennye-tovary-uslugi',
    path: '/services/phys/spory-nekachestvennye-tovary-uslugi',
    audience: 'phys',
    priority: 14.1,
    category: 'Защита прав потребителей',
    description: 'Споры по качеству товаров и услуг: экспертиза, претензионная работа, взыскание стоимости, обмен/ремонт, судебное представительство.'
  },
  {
    title: 'Неустойка за нарушение сроков изготовления / ремонта',
    slug: 'neustoyka-sroki-izgotovleniya-remonta',
    path: '/services/phys/neustoyka-sroki-izgotovleniya-remonta',
    audience: 'phys',
    priority: 14.2,
    category: 'Защита прав потребителей',
    description: 'Взыскание неустойки за нарушение сроков изготовления товара, выполнения гарантийного ремонта или иных сроков по договору и закону.'
  },
  {
    title: 'Неустойка за нарушение сроков выполнения работ (ремонт, отделка)',
    slug: 'neustoyka-sroki-vypolneniya-rabot',
    path: '/services/phys/neustoyka-sroki-vypolneniya-rabot',
    audience: 'phys',
    priority: 14.3,
    category: 'Защита прав потребителей',
    description: 'Взыскание неустойки при просрочке выполнения работ (ремонт/отделка), подготовка претензий, расчётов и защита в суде.'
  },
  {
    title: 'Споры о некачественном ремонте / некачественных работах',
    slug: 'spory-nekachestvennyy-remont-raboty',
    path: '/services/phys/spory-nekachestvennyy-remont-raboty',
    audience: 'phys',
    priority: 14.4,
    category: 'Защита прав потребителей',
    description: 'Споры по некачественному ремонту и работам: фиксация недостатков, экспертиза, требования об устранении, уменьшении цены или возврате денег.'
  },
  {
    title: 'Взыскание убытков, компенсация морального вреда, штраф по ЗоЗПП',
    slug: 'ubytki-moralnyy-vred-shtraf-zozpp',
    path: '/services/phys/ubytki-moralnyy-vred-shtraf-zozpp',
    audience: 'phys',
    priority: 14.5,
    category: 'Защита прав потребителей',
    description: 'Взыскание убытков, компенсации морального вреда и штрафа по Закону о защите прав потребителей при наличии оснований, включая судебные расходы.'
  },

  // ДТП, страхование, вред здоровью
  {
    title: 'Возмещение ущерба при ДТП',
    slug: 'vozmeshchenie-ushcherba-dtp',
    path: '/services/phys/vozmeshchenie-ushcherba-dtp',
    audience: 'phys',
    priority: 15.0,
    category: 'ДТП, страхование, вред здоровью',
    description: 'Взыскание ущерба при ДТП: оценка убытков, претензии, переговоры и судебное представительство.'
  },
  {
    title: 'Взыскание страхового возмещения по ОСАГО',
    slug: 'vzyskanie-strahovogo-vozmeshcheniya-osago',
    path: '/services/phys/vzyskanie-strahovogo-vozmeshcheniya-osago',
    audience: 'phys',
    priority: 15.1,
    category: 'ДТП, страхование, вред здоровью',
    description: 'Взыскание страхового возмещения по ОСАГО: подготовка документов, оспаривание отказов и заниженных выплат.'
  },
  {
    title: 'Взыскание страхового возмещения по КАСКО',
    slug: 'vzyskanie-strahovogo-vozmeshcheniya-kasko',
    path: '/services/phys/vzyskanie-strahovogo-vozmeshcheniya-kasko',
    audience: 'phys',
    priority: 15.2,
    category: 'ДТП, страхование, вред здоровью',
    description: 'Сопровождение споров по КАСКО: получение выплаты, оспаривание отказов страховщика и защита интересов в суде.'
  },
  {
    title: 'Взыскание ущерба с виновника ДТП (по фактическим убыткам)',
    slug: 'vzyskanie-ushcherba-s-vinovnika-dtp',
    path: '/services/phys/vzyskanie-ushcherba-s-vinovnika-dtp',
    audience: 'phys',
    priority: 15.3,
    category: 'ДТП, страхование, вред здоровью',
    description: 'Взыскание ущерба с виновника ДТП сверх страховой выплаты: фактические убытки, экспертиза, суд и исполнительное производство.'
  },
  {
    title: 'Споры при отказе страховщика / занижении выплаты',
    slug: 'spory-otkaz-strahovshchika-zanizhenie-vyplaty',
    path: '/services/phys/spory-otkaz-strahovshchika-zanizhenie-vyplaty',
    audience: 'phys',
    priority: 15.4,
    category: 'ДТП, страхование, вред здоровью',
    description: 'Оспаривание отказа страховщика и заниженных выплат: анализ оснований, контррасчёт, претензии и судебная защита.'
  },
  {
    title: 'Компенсация вреда здоровью, включая утраченный заработок',
    slug: 'kompensaciya-vreda-zdorovyu-utrachennyy-zarabotok',
    path: '/services/phys/kompensaciya-vreda-zdorovyu-utrachennyy-zarabotok',
    audience: 'phys',
    priority: 15.5,
    category: 'ДТП, страхование, вред здоровью',
    description: 'Взыскание компенсации вреда здоровью после ДТП: расходы на лечение, реабилитацию, утраченный заработок, моральный вред.'
  },

  // Трудовые споры
  {
    title: 'Оспаривание увольнения, восстановление на работе',
    slug: 'osparivanie-uvolneniya-vosstanovlenie',
    path: '/services/phys/osparivanie-uvolneniya-vosstanovlenie',
    audience: 'phys',
    priority: 16.0,
    category: 'Трудовые споры',
    description: 'Оспаривание увольнения и восстановление на работе: анализ оснований, подготовка документов и представительство в суде.'
  },
  {
    title: 'Взыскание заработка за время вынужденного прогула',
    slug: 'zarabotok-za-vynuzhdennyy-progul',
    path: '/services/phys/zarabotok-za-vynuzhdennyy-progul',
    audience: 'phys',
    priority: 16.1,
    category: 'Трудовые споры',
    description: 'Взыскание среднего заработка за время вынужденного прогула при незаконном увольнении или отстранении от работы.'
  },
  {
    title: 'Взыскание задолженности по зарплате и компенсаций',
    slug: 'zadolzhennost-po-zarplate-i-kompensacii',
    path: '/services/phys/zadolzhennost-po-zarplate-i-kompensacii',
    audience: 'phys',
    priority: 16.2,
    category: 'Трудовые споры',
    description: 'Взыскание задолженности по заработной плате, компенсации за задержку выплат, отпускные и иные выплаты, предусмотренные законом.'
  },
  {
    title: 'Оспаривание дисциплинарных взысканий',
    slug: 'osparivanie-disciplinarnyh-vzyskaniy',
    path: '/services/phys/osparivanie-disciplinarnyh-vzyskaniy',
    audience: 'phys',
    priority: 16.3,
    category: 'Трудовые споры',
    description: 'Оспаривание выговоров и иных дисциплинарных взысканий: проверка процедуры, подготовка возражений и защита в суде.'
  },
  {
    title: 'Компенсации за травмы и увечья, полученные на работе',
    slug: 'kompensacii-za-travmy-na-rabote',
    path: '/services/phys/kompensacii-za-travmy-na-rabote',
    audience: 'phys',
    priority: 16.4,
    category: 'Трудовые споры',
    description: 'Взыскание компенсаций за производственные травмы и увечья: расходы на лечение, утраченный заработок, моральный вред, взаимодействие с работодателем и страховщиком.'
  },

  // Банковские и кредитные споры
  {
    title: 'Оспаривание штрафов, пеней, неустоек',
    slug: 'osparivanie-shtrafov-peney-neustoyek-kredit',
    path: '/services/phys/osparivanie-shtrafov-peney-neustoyek-kredit',
    audience: 'phys',
    priority: 17.0,
    category: 'Банковские и кредитные споры',
    description: 'Проверка расчётов банка, подготовка возражений и снижение штрафов/пеней/неустоек по кредитным обязательствам.'
  },
  {
    title: 'Отсрочка / рассрочка исполнения решения суда',
    slug: 'otsrochka-rassrochka-ispolneniya-resheniya',
    path: '/services/phys/otsrochka-rassrochka-ispolneniya-resheniya',
    audience: 'phys',
    priority: 17.1,
    category: 'Банковские и кредитные споры',
    description: 'Подготовка заявления об отсрочке/рассрочке исполнения решения суда: обоснование, документы, представительство в суде.'
  },
  {
    title: 'Отмена судебных приказов, восстановление сроков обжалования',
    slug: 'otmena-sudebnogo-prikaza-vosstanovlenie-srokov',
    path: '/services/phys/otmena-sudebnogo-prikaza-vosstanovlenie-srokov',
    audience: 'phys',
    priority: 17.2,
    category: 'Банковские и кредитные споры',
    description: 'Отмена судебного приказа и восстановление сроков: подготовка возражений/заявлений и защита интересов должника.'
  },
  {
    title: 'Оспаривание исполнительной надписи нотариуса',
    slug: 'osparivanie-ispolnitelnoy-nadpisi-notariusa',
    path: '/services/phys/osparivanie-ispolnitelnoy-nadpisi-notariusa',
    audience: 'phys',
    priority: 17.3,
    category: 'Банковские и кредитные споры',
    description: 'Оспаривание исполнительной надписи нотариуса: анализ оснований, обеспечительные меры и судебное сопровождение.'
  },
  {
    title: 'Споры с банками по задолженности/условиям договора',
    slug: 'spory-s-bankami-po-zadolzhennosti',
    path: '/services/phys/spory-s-bankami-po-zadolzhennosti',
    audience: 'phys',
    priority: 17.4,
    category: 'Банковские и кредитные споры',
    description: 'Разбор условий кредитного договора, переговоры, претензии и судебная защита при спорах с банком по задолженности.'
  },

  // Исполнительное производство (приставы)
  {
    title: 'Обжалование действий/бездействия судебных приставов',
    slug: 'obzhalovanie-deystviy-pristavov',
    path: '/services/phys/obzhalovanie-deystviy-pristavov',
    audience: 'phys',
    priority: 18.0,
    category: 'Исполнительное производство',
    description: 'Обжалование действий/бездействия приставов: жалобы, заявления в суд и защита прав должника/взыскателя.'
  },
  {
    title: 'Снятие арестов/ограничений, отмена запретов',
    slug: 'snyatie-arestov-ogranicheniy-otmena-zapretov',
    path: '/services/phys/snyatie-arestov-ogranicheniy-otmena-zapretov',
    audience: 'phys',
    priority: 18.1,
    category: 'Исполнительное производство',
    description: 'Снятие арестов и ограничений (счета/имущество), отмена запретов: подготовка документов и сопровождение.'
  },
  {
    title: 'Оспаривание незаконных взысканий, корректировка удержаний',
    slug: 'osparivanie-nezakonnyh-vzyskaniy-uderzhaniy',
    path: '/services/phys/osparivanie-nezakonnyh-vzyskaniy-uderzhaniy',
    audience: 'phys',
    priority: 18.2,
    category: 'Исполнительное производство',
    description: 'Оспаривание незаконных списаний и удержаний, корректировка процента удержаний, защита прожиточного минимума.'
  },
  {
    title: 'Сопровождение исполнения решения суда',
    slug: 'soprovozhdenie-ispolneniya-resheniya-suda',
    path: '/services/phys/soprovozhdenie-ispolneniya-resheniya-suda',
    audience: 'phys',
    priority: 18.3,
    category: 'Исполнительное производство',
    description: 'Полное сопровождение исполнительного производства: взаимодействие с приставами, контроль сроков и результатов взыскания.'
  },

  // Земельные споры
  {
    title: 'Оспаривание межевания',
    slug: 'osparivanie-mezhevaniya',
    path: '/services/phys/osparivanie-mezhevaniya',
    audience: 'phys',
    priority: 19.0,
    category: 'Земельные споры',
    description: 'Оспаривание результатов межевания: анализ документов, сбор доказательств и судебное сопровождение.'
  },
  {
    title: 'Определение границ земельного участка',
    slug: 'opredelenie-granic-zemelnogo-uchastka',
    path: '/services/phys/opredelenie-granic-zemelnogo-uchastka',
    audience: 'phys',
    priority: 19.1,
    category: 'Земельные споры',
    description: 'Установление/определение границ участка: подготовка позиции, экспертизы и представительство в суде.'
  },
  {
    title: 'Определение порядка пользования земельным участком',
    slug: 'poryadok-polzovaniya-zemelnym-uchastkom',
    path: '/services/phys/poryadok-polzovaniya-zemelnym-uchastkom',
    audience: 'phys',
    priority: 19.2,
    category: 'Земельные споры',
    description: 'Определение порядка пользования участком между сособственниками: соглашение или судебное решение.'
  },
  {
    title: 'Выдел доли в натуре',
    slug: 'vydel-doli-v-nature',
    path: '/services/phys/vydel-doli-v-nature',
    audience: 'phys',
    priority: 19.3,
    category: 'Земельные споры',
    description: 'Выдел доли в натуре: подготовка документов, экспертизы, сопровождение переговоров и суда.'
  },
  {
    title: 'Признание / оспаривание права собственности на земельный участок',
    slug: 'pravo-sobstvennosti-na-zemelnyy-uchastok',
    path: '/services/phys/pravo-sobstvennosti-na-zemelnyy-uchastok',
    audience: 'phys',
    priority: 19.4,
    category: 'Земельные споры',
    description: 'Признание или оспаривание права собственности на участок: подготовка исков и представительство в суде.'
  },
  {
    title: 'Оспаривание кадастровой стоимости',
    slug: 'osparivanie-kadastrovoy-stoimosti',
    path: '/services/phys/osparivanie-kadastrovoy-stoimosti',
    audience: 'phys',
    priority: 19.5,
    category: 'Земельные споры',
    description: 'Оспаривание кадастровой стоимости: анализ отчётов, подготовка документов и сопровождение процедуры/суда.'
  },
  {
    title: 'Споры с соседями по границам/проезду',
    slug: 'spory-s-sosedyami-po-granicam-proezdu',
    path: '/services/phys/spory-s-sosedyami-po-granicam-proezdu',
    audience: 'phys',
    priority: 19.6,
    category: 'Земельные споры',
    description: 'Споры с соседями по границам, сервитуту и проезду: фиксация нарушений, экспертизы, суд.'
  },

  // Административные споры
  {
    title: 'Оспаривание решений, действий/бездействия органов власти',
    slug: 'osparivanie-deystviy-organov-vlasti',
    path: '/services/phys/osparivanie-deystviy-organov-vlasti',
    audience: 'phys',
    priority: 20.0,
    category: 'Административные споры',
    description: 'Оспаривание решений и действий органов власти: жалобы, административные иски и судебное сопровождение.'
  },
  {
    title: 'Оспаривание действий/решений налоговых органов',
    slug: 'osparivanie-resheniy-nalogovyh-organov',
    path: '/services/phys/osparivanie-resheniy-nalogovyh-organov',
    audience: 'phys',
    priority: 20.1,
    category: 'Административные споры',
    description: 'Оспаривание решений налоговых органов: подготовка жалоб/возражений и представительство в суде.'
  },
  {
    title: 'Оспаривание бездействия должностных лиц',
    slug: 'osparivanie-bezdeystviya-dolzhnostnyh-lic',
    path: '/services/phys/osparivanie-bezdeystviya-dolzhnostnyh-lic',
    audience: 'phys',
    priority: 20.2,
    category: 'Административные споры',
    description: 'Оспаривание бездействия должностных лиц: фиксация нарушений, жалобы и административные иски.'
  },
  {
    title: 'Оспаривание постановлений по делам об административных правонарушениях',
    slug: 'osparivanie-postanovleniy-po-administrativnym',
    path: '/services/phys/osparivanie-postanovleniy-po-administrativnym',
    audience: 'phys',
    priority: 20.3,
    category: 'Административные споры',
    description: 'Оспаривание постановлений по КоАП РФ (штрафы и др.): подготовка жалоб и судебная защита.'
  },

  // Банкротство
  {
    title: 'Включение в реестр требований кредиторов',
    slug: 'vklyuchenie-v-reestr-trebovaniy-kreditorov',
    path: '/services/phys/vklyuchenie-v-reestr-trebovaniy-kreditorov',
    audience: 'phys',
    priority: 21.0,
    category: 'Банкротство',
    description: 'Подготовка заявления о включении в реестр требований кредиторов, сбор доказательств и сопровождение в арбитражном суде.'
  },
  {
    title: 'Заявления и возражения в рамках дела о банкротстве',
    slug: 'zayavleniya-vozrazheniya-v-bankrotstve',
    path: '/services/phys/zayavleniya-vozrazheniya-v-bankrotstve',
    audience: 'phys',
    priority: 21.1,
    category: 'Банкротство',
    description: 'Подготовка процессуальных заявлений и возражений в банкротном деле, участие в заседаниях и защита интересов.'
  },

  // Документы и судебное сопровождение
  {
    title: 'Досудебная претензия',
    slug: 'dosudebnaya-pretenziya',
    path: '/services/phys/dosudebnaya-pretenziya',
    audience: 'phys',
    priority: 22.0,
    category: 'Документы и судебное сопровождение',
    description: 'Подготовка досудебной претензии: формирование позиции, расчёт требований и направление контрагенту.'
  },
  {
    title: 'Жалоба, заявление',
    slug: 'zhaloba-zayavlenie',
    path: '/services/phys/zhaloba-zayavlenie',
    audience: 'phys',
    priority: 22.1,
    category: 'Документы и судебное сопровождение',
    description: 'Подготовка жалоб и заявлений в органы и суды: правильная форма, доказательства и контроль подачи.'
  },
  {
    title: 'Исковое заявление / административное исковое заявление',
    slug: 'iskovoe-administrativnoe-iskovoe-zayavlenie',
    path: '/services/phys/iskovoe-administrativnoe-iskovoe-zayavlenie',
    audience: 'phys',
    priority: 22.2,
    category: 'Документы и судебное сопровождение',
    description: 'Подготовка исковых и административных исковых заявлений: требования, приложения, расчёты и стратегия.'
  },
  {
    title: 'Ходатайства, возражения, отзывы',
    slug: 'hodataystva-vozrazheniya-otzyvy',
    path: '/services/phys/hodataystva-vozrazheniya-otzyvy',
    audience: 'phys',
    priority: 22.3,
    category: 'Документы и судебное сопровождение',
    description: 'Подготовка ходатайств, возражений и отзывов: процессуальные документы для усиления позиции в деле.'
  },
  {
    title: 'Апелляционная и кассационная жалоба',
    slug: 'apellyacionnaya-kassacionnaya-zhaloba',
    path: '/services/phys/apellyacionnaya-kassacionnaya-zhaloba',
    audience: 'phys',
    priority: 22.4,
    category: 'Документы и судебное сопровождение',
    description: 'Подготовка апелляционных и кассационных жалоб: анализ решения, основания, сроки и сопровождение.'
  },
  {
    title: 'Жалоба в Верховный Суд РФ',
    slug: 'zhaloba-v-verhovnyy-sud-rf',
    path: '/services/phys/zhaloba-v-verhovnyy-sud-rf',
    audience: 'phys',
    priority: 22.5,
    category: 'Документы и судебное сопровождение',
    description: 'Подготовка жалобы в Верховный Суд РФ: формирование правовых доводов и комплект документов.'
  },
  {
    title: 'Частная жалоба',
    slug: 'chastnaya-zhaloba',
    path: '/services/phys/chastnaya-zhaloba',
    audience: 'phys',
    priority: 22.6,
    category: 'Документы и судебное сопровождение',
    description: 'Подготовка частной жалобы на определения суда: основания, сроки, подача и сопровождение.'
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

export const getServiceBySlug = (slug: string) => {
  return audienceServices.find((service) => service.slug === slug);
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
    description: `Оказываем юридическую помощь гражданам и представляем интересы клиентов в судах всех инстанций и государственных органах. Мы — команда профессионалов с практическим опытом ведения дел различной сложности. Формируем правовую позицию на основе анализа документов и актуальной судебной практики, готовим процессуальные документы и сопровождаем дело на всех этапах — от первичной консультации и досудебного урегулирования до фактического исполнения судебного акта. Мы поможем вам разобраться в ситуации, возьмём дело в работу и сделаем всё возможное, чтобы решить вашу проблему и добиться максимально возможного результата в рамках закона. Работаем по договору: фиксируем объём работ, соблюдаем конфиденциальность и адвокатскую тайну, даём понятный план действий и контролируем сроки на каждом этапе.`
  },
  biz: {
    title: 'Юридическим лицам',
    subtitle: 'Корпоративное обслуживание бизнеса',
    description: `Оказываем правовое сопровождение бизнеса и представляем интересы юридических лиц в судах, во взаимоотношениях с контрагентами и при взаимодействии с государственными органами. Работаем системно — от профилактики рисков и договорной работы до ведения споров и исполнения судебных актов.
Нам доверяют благодаря профессиональной команде с практическим опытом ведения корпоративных и коммерческих споров, сильной судебной практике в арбитражных судах и судах общей юрисдикции, комплексному подходу (анализ рисков, выработка стратегии, подготовка документов, переговоры и представительство в суде), а также строгому соблюдению конфиденциальности и профессиональных стандартов.
Мы выстраиваем понятную коммуникацию с клиентом: фиксируем сроки и этапы, формируем план действий и регулярно информируем о ходе работы.`
  },
  criminal: {
    title: 'Уголовные дела',
    subtitle: 'Защита по уголовным статьям',
    description: `Оказываем квалифицированную помощь (защиту) в правоохранительных органах, судах всех инстанций и госучреждениях.
Представляем защиту и юридическую помощь на стадии доследственной проверки, предварительного следствия и дознания, в судах: первой, апелляционной и кассационной судебной инстанции.
Имеем большой опыт в расследовании дел общеуголовной и экономической направленности (ст.ст. 105, 111, 112, 158, 159, 160, 161, 162, 163, 166, 167, 171, 172, 173.1, 174, 175, 196, 197, 199, 205, 209, 210, 222, 223, 228, 228.1, 264, 264.1, 290, 291, 317, 318, 330, 338 УК РФ). Отлично знаем правоохранительную и судебную систему изнутри, в связи с чем основываясь на следственной и судебной практике находим оптимальные пути защиты своего доверителя.
Профессиональный и индивидуальный подход к каждому делу, дорожим своей репутацией и работаем только на результат.
Чем раньше Вы обратитесь к нам, тем больше шансов на положительный исход вашего дела. Без пафоса, мы профессионалы в уголовном праве и обязательно Вам поможем.`
  }
};
