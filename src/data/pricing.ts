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

  // Семейные споры
  {
    slug: '/services/phys/semeynye-spory',
    priceFrom: 25000,
    priceNote: 'Точная стоимость зависит от объема спора, вопросов о детях и состава имущества'
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

  // Выселение и связанные жилищные споры
  {
    slug: '/services/phys/vyselenie',
    priceFrom: 20000,
    priceNote: 'Точная стоимость зависит от сложности жилищного спора и объема документов'
  },

  // Наследственные дела
  {
    slug: '/services/phys/nasledstvennye-dela',
    priceFrom: 30000,
    priceNote: 'Точная стоимость определяется после анализа наследственного дела'
  },

  // Взыскание долгов и договорные споры
  {
    slug: '/services/phys/vzyskanie-dolgov-i-dogovornye-spory',
    priceFrom: 25000,
    priceNote: 'Стоимость зависит от суммы требований, количества документов и стадии спора'
  },

  // Защита прав потребителей
  {
    slug: '/services/phys/zashchita-prav-potrebitelya',
    priceFrom: 10000,
    priceNote: 'Стоимость зависит от категории спора и объема документов'
  },

  // ДТП и страховые споры
  {
    slug: '/services/phys/dtp-i-strahovye-spory',
    priceFrom: 20000,
    priceNote: 'Стоимость зависит от размера ущерба и стадии урегулирования'
  },

  // Банкротство физических лиц
  {
    slug: '/services/phys/bankrotstvo-fiz-lits',
    priceFrom: 120000,
    priceNote: 'Стоимость зависит от состава имущества, числа кредиторов и объема процедуры'
  },

  // Исполнительное производство
  {
    slug: '/services/phys/ispolnitelnoe-proizvodstvo',
    priceFrom: 30000,
    priceNote: 'Стоимость зависит от объема исполнительных действий и числа обжалований'
  },

  // Административные споры
  {
    slug: '/services/phys/administrativnye-spory',
    priceFrom: 35000,
    priceNote: 'Стоимость зависит от категории спора и стадии судебного обжалования'
  },

  // Документы и судебное сопровождение
  {
    slug: '/services/phys/dokumenty-i-sudebnoe-soprovozhdenie',
    priceFrom: 10000,
    priceNote: 'Стоимость зависит от вида документа и объема правовой позиции'
  },

  // Земельные споры
  {
    slug: '/services/phys/zemelnye-spory',
    priceFrom: 25000,
    priceNote: 'Стоимость зависит от предмета спора и объема доказательств'
  },
  
  // Уголовные дела
  {
    slug: '/services/phys/ugolovnye',
    priceFrom: 150000,
    priceNote: 'Точная стоимость зависит от тяжести преступления и стадии процесса'
  }
];

const normalizePriceSlug = (slug: string): string => {
  if (!slug) return "/";

  let normalized = slug.trim();

  if (/^https?:\/\//i.test(normalized)) {
    try {
      normalized = new URL(normalized).pathname;
    } catch {
      return normalized.replace(/\/+$/, "") || "/";
    }
  }

  return normalized.replace(/\/+$/, "") || "/";
};

const pricingRules: Array<Omit<ServicePrice, "slug"> & { matches: RegExp }> = [
  {
    matches: /^\/services\/phys\/(semeyn|razvod|aliment|reben|brak|otcov|mater)/,
    priceFrom: 25000,
    priceNote: "Точная стоимость зависит от объема спора, вопросов о детях и состава имущества"
  },
  {
    matches: /^\/services\/phys\/(vyselen|zhilish|kvartir|registr|zaliv|ushcherb|sobstven|vselen|zhkh|pereplan)/,
    priceFrom: 20000,
    priceNote: "Точная стоимость зависит от сложности жилищного спора и объема документов"
  },
  {
    matches: /^\/services\/phys\/(nasled|zavesh)/,
    priceFrom: 30000,
    priceNote: "Точная стоимость определяется после анализа наследственного дела"
  },
  {
    matches: /^\/services\/phys\/(vzyskanie-dolgov|dolg|raspisk|dogovor|arend|neosnovatel|debitor)/,
    priceFrom: 25000,
    priceNote: "Стоимость зависит от суммы требований, количества документов и стадии спора"
  },
  {
    matches: /^\/services\/phys\/(potrebit|vozvrat|neustoyk|tovar|uslug|moraln)/,
    priceFrom: 10000,
    priceNote: "Стоимость зависит от категории спора и объема документов"
  },
  {
    matches: /^\/services\/phys\/(dtp|osago|kasko|strakh)/,
    priceFrom: 20000,
    priceNote: "Стоимость зависит от размера ущерба и стадии урегулирования"
  },
  {
    matches: /^\/services\/phys\/(trud|uvol|zarplat|rabotodat|disciplin)/,
    priceFrom: 15000,
    priceNote: "Стоимость зависит от категории трудового спора и стадии дела"
  },
  {
    matches: /^\/services\/phys\/(bankrot|kredit)/,
    priceFrom: 120000,
    priceNote: "Стоимость зависит от состава имущества, числа кредиторов и объема процедуры"
  },
  {
    matches: /^\/services\/phys\/(ispoln|pristav|arest)/,
    priceFrom: 30000,
    priceNote: "Стоимость зависит от объема исполнительных действий и числа обжалований"
  },
  {
    matches: /^\/services\/phys\/(administr|obzhal|postanovlen)/,
    priceFrom: 35000,
    priceNote: "Стоимость зависит от категории спора и стадии судебного обжалования"
  },
  {
    matches: /^\/services\/phys\/(dokument|isk|zhalob|hodat|apelly|kassaci|vozraz|otzyv|zayavlen)/,
    priceFrom: 10000,
    priceNote: "Стоимость зависит от вида документа и объема правовой позиции"
  },
  {
    matches: /^\/services\/phys\/(zemeln|uchastok|mezh)/,
    priceFrom: 25000,
    priceNote: "Стоимость зависит от предмета спора и объема доказательств"
  },
  {
    matches: /^\/services\/phys\//,
    priceFrom: 10000,
    priceNote: "Окончательная стоимость зависит от сложности ситуации, объема документов и стадии спора"
  },
  {
    matches: /^\/services\/biz\//,
    priceFrom: 20000,
    priceNote: "Стоимость зависит от объема работ, срочности и стадии коммерческого спора"
  },
  {
    matches: /^\/services\/criminal\//,
    priceFrom: 80000,
    priceNote: "Стоимость зависит от статьи, стадии дела, числа эпизодов и объема материалов"
  }
];

/**
 * Получить цену для услуги по slug
 */
export const getPriceBySlug = (slug: string): ServicePrice | null => {
  const normalizedSlug = normalizePriceSlug(slug);
  const exactMatch = servicePricing.find((price) => normalizePriceSlug(price.slug) === normalizedSlug);

  if (exactMatch) {
    return exactMatch;
  }

  const fallbackMatch = pricingRules.find((rule) => rule.matches.test(normalizedSlug));

  if (fallbackMatch) {
    return {
      slug: normalizedSlug,
      priceFrom: fallbackMatch.priceFrom,
      priceNote: fallbackMatch.priceNote
    };
  }

  return null;
};

/**
 * Форматировать цену в читаемый вид с пробелами
 */
export const formatPrice = (price: number): string => {
  return price.toLocaleString('ru-RU');
};
