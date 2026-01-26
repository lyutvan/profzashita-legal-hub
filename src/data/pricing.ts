/**
 * Единый справочник цен на услуги
 * Связь с услугой по slug страницы
 */

export interface ServicePrice {
  slug: string; // URL-slug страницы услуги
  priceFrom?: number; // Цена "от X ₽", если указана
  priceNote?: string; // Дополнительная пометка под ценой
}

/**
 * Справочник цен для всех услуг
 * Если для услуги нет записи или не указана priceFrom - выводится "по договоренности"
 */
export const servicePricing: ServicePrice[] = [
  // ============= УСЛУГИ ДЛЯ БИЗНЕСА =============
  
  // Арбитражные споры
  {
    slug: '/services/biz/arbitrazhnye-spory',
    priceFrom: 50000,
    priceNote: 'Точная стоимость определяется после анализа ситуации'
  },
  
  // Банкротство и субсидиарная ответственность
  {
    slug: '/services/biz/bankrotstvo-subsidiarnaya-otvetstvennost',
    priceFrom: 100000,
    priceNote: 'Точная стоимость зависит от сложности дела'
  },
  
  // Договорная работа и претензии
  {
    slug: '/services/biz/dogovornaya-rabota-pretensii',
    priceFrom: 15000,
    priceNote: 'Стоимость зависит от объема работ'
  },
  
  // Экономические преступления
  {
    slug: '/services/biz/ekonomicheskie-prestupleniya',
    priceFrom: 150000,
    priceNote: 'Точная стоимость определяется после анализа дела'
  },
  
  // Интеллектуальная собственность
  {
    slug: '/services/biz/intellektualnaya-sobstvennost',
    priceFrom: 30000,
    priceNote: 'Стоимость зависит от вида объекта и объема работ'
  },
  
  // Корпоративные споры
  {
    slug: '/services/biz/korporativnye-spory',
    priceFrom: 80000,
    priceNote: 'Точная стоимость определяется после анализа ситуации'
  },
  
  // Налоговые споры и проверки
  {
    slug: '/services/biz/nalogovye-spory-proverki',
    priceFrom: 60000,
    priceNote: 'Стоимость зависит от сложности спора'
  },
  
  // Регистрация и ликвидация компаний
  {
    slug: '/services/biz/registratsiya-likvidatsiya-kompaniy',
    priceFrom: 20000,
    priceNote: 'Стоимость зависит от организационной формы'
  },
  
  // Взыскание дебиторской задолженности
  {
    slug: '/services/biz/vzyskanie-debitorskoy-zadolzhennosti',
    priceFrom: 25000,
    priceNote: 'Точная стоимость определяется после оценки задолженности'
  },
  
  // Защита от рейдерских захватов
  {
    slug: '/services/biz/zashchita-ot-rejderskikh-zakhvatov',
    priceFrom: 200000,
    priceNote: 'Стоимость зависит от сложности ситуации и масштаба угрозы'
  },
  
  // ============= УСЛУГИ ДЛЯ ФИЗИЧЕСКИХ ЛИЦ =============
  
  // Взыскание алиментов
  {
    slug: '/services/phys/alimenty',
    priceFrom: 15000,
    priceNote: 'Точная стоимость определяется после анализа ситуации'
  },
  
  // ДТП и страховые споры
  {
    slug: '/services/phys/dtp',
    priceFrom: 20000,
    priceNote: 'Стоимость зависит от сложности дела'
  },
  
  // Наследственные споры
  {
    slug: '/services/phys/nasledstvo',
    priceFrom: 30000,
    priceNote: 'Точная стоимость определяется после анализа наследственного дела'
  },
  
  // Защита прав потребителей
  {
    slug: '/services/phys/potrebiteli',
    priceFrom: 10000,
    priceNote: 'Стоимость зависит от категории спора'
  },
  
  // Расторжение брака и раздел имущества
  {
    slug: '/services/phys/razvod',
    priceFrom: 25000,
    priceNote: 'Точная стоимость зависит от сложности дела и наличия споров'
  },
  
  // Трудовые споры
  {
    slug: '/services/phys/trudovye-spory',
    priceFrom: 15000,
    priceNote: 'Стоимость зависит от категории спора'
  },
  
  // Жилищные споры
  {
    slug: '/services/phys/zhilishchnye-spory',
    priceFrom: 20000,
    priceNote: 'Точная стоимость определяется после анализа ситуации'
  },
  
  // Уголовные дела
  {
    slug: '/services/phys/ugolovnye',
    priceFrom: 150000,
    priceNote: 'Точная стоимость зависит от тяжести преступления и стадии процесса'
  }
];

/**
 * Получить цену для услуги по slug
 */
export const getPriceBySlug = (slug: string): ServicePrice | null => {
  return servicePricing.find(price => price.slug === slug) || null;
};

/**
 * Форматировать цену в читаемый вид с пробелами
 */
export const formatPrice = (price: number): string => {
  return price.toLocaleString('ru-RU');
};
