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
    description: `Оказываем квалифицированную помощь (защиту) в правоохранительных органах, судах всех инстанций и госучреждениях.
Представляем защиту и юридическую помощь на стадии доследственной проверки, предварительного следствия и дознания, в судах: первой, апелляционной и кассационной судебной инстанции.
Имеем большой опыт в расследовании дел общеуголовной и экономической направленности (ст.ст. 105, 111, 112, 158, 159, 160, 161, 162, 163, 166, 167, 171, 172, 173.1, 174, 175, 196, 197, 199, 205, 209, 210, 222, 223, 228, 228.1, 264, 264.1, 290, 291, 317, 318, 330, 338 УК РФ). Отлично знаем правоохранительную и судебную систему изнутри, в связи с чем основываясь на следственной и судебной практике находим оптимальные пути защиты своего доверителя.
Профессиональный и индивидуальный подход к каждому делу, дорожим своей репутацией и работаем только на результат.
Чем раньше Вы обратитесь к нам, тем больше шансов на положительный исход вашего дела. Без пафоса, мы профессионалы в уголовном праве и обязательно Вам поможем.`
  }
};
