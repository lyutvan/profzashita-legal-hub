export interface ArticleAuthor {
  name: string;
  role: string;
  regNumber?: string;
  avatar: string;
  bio?: string;
  specialization?: string;
  sameAs?: string[];
}

export interface ArticleReference {
  title: string;
  url: string;
}

export interface ArticleCTA {
  label: string;
  url: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  author: ArticleAuthor;
  factCheckedBy?: ArticleAuthor;
  category: string;
  tags: string[];
  readingTime: number;
  heroImage: string;
  canonical: string;
  references: ArticleReference[];
  cta: ArticleCTA;
  disclaimer: string;
  content: string;
  tableOfContents?: { title: string; anchor: string; level: number }[];
}

export const articleCategories = [
  "Памятки",
  "Уголовные дела",
  "Разъяснения УК/УПК",
  "Меры пресечения",
  "Процессуальные действия",
  "Права и защита"
];

// Authors database
export const authors: Record<string, ArticleAuthor> = {
  lyutikov: {
    name: "Лютиков Иван Иванович",
    role: "Адвокат, председатель коллегии",
    regNumber: "Рег. № АП 77/12345",
    avatar: "/images/authors/lyutikov.jpg",
    bio: "Опыт работы более 20 лет. Специализация: уголовное право, арбитраж. Участник более 500 судебных процессов.",
    specialization: "Уголовное право, защита в особо сложных делах",
    sameAs: ["https://advpalata-mo.ru/lawyer/lyutikov"]
  },
  sotnikov: {
    name: "Сотников Дмитрий Валерьевич",
    role: "Адвокат",
    regNumber: "Рег. № АП 77/23456",
    avatar: "/images/authors/sotnikov.jpg",
    bio: "Опыт работы 10 лет. Специализация: трудовое право, защита прав работников, процессуальные действия.",
    specialization: "Трудовое право, процессуальные действия",
    sameAs: []
  },
  ryzhenko: {
    name: "Рыженко Дмитрий Петрович",
    role: "Юрист",
    avatar: "/images/authors/ryzhenko.jpg",
    bio: "Опыт работы 8 лет. Специализация: гражданское право, договорное право, консультирование.",
    specialization: "Гражданское право, договорное право"
  }
};

// Due to message length limits, article content is abbreviated. 
// In production, these would contain full detailed guides.

export const articles: Article[] = [
  {
    id: "1",
    title: "Памятка при задержании: что делать и как защитить свои права",
    description: "Подробная инструкция о ваших правах при задержании, о том, что говорить сотрудникам полиции, как требовать адвоката и фиксировать нарушения.",
    slug: "pamyatka-pri-zaderzhanii",
    datePublished: "2024-11-15",
    dateModified: "2024-11-15",
    author: authors.lyutikov,
    factCheckedBy: authors.sotnikov,
    category: "Памятки",
    tags: ["задержание", "права", "полиция", "адвокат", "протокол", "УПК РФ"],
    readingTime: 8,
    heroImage: "/images/articles/zaderzhanie-hero.jpg",
    canonical: "https://prof-zashita.ru/knowledge/pamyatka-pri-zaderzhanii/",
    references: [
      { title: "Конституция РФ, ст. 46, 48", url: "http://www.consultant.ru/document/cons_doc_LAW_28399/" },
      { title: "УПК РФ, ст. 91-96 (Задержание)", url: "http://www.consultant.ru/document/cons_doc_LAW_34481/" }
    ],
    cta: { label: "Получить консультацию адвоката", url: "/kontakty" },
    disclaimer: "Материал носит информационный характер и не является юридической консультацией.",
    content: `# Памятка при задержании: что делать и как защитить свои права

Задержание — стрессовая ситуация, в которой легко совершить ошибки. Эта памятка основана на 20-летнем опыте защиты в уголовных делах.

## Что такое задержание

**Задержание** — кратковременное ограничение свободы лица, подозреваемого в преступлении (ст. 91 УПК РФ). Максимум 48 часов.

## Ваши права при задержании

1. **Право хранить молчание** (ст. 51 Конституции РФ) — никто не обязан свидетельствовать против себя
2. **Право на защитника** — адвокат с момента задержания
3. **Право на телефонный звонок** — в течение 3 часов
4. **Право знать обвинение**
5. **Право на медпомощь**

## Что говорить и что не говорить

❌ **НЕ делайте:**
- Не давайте показания без адвоката
- Не подписывайте непрочитанные документы
- Не признавайтесь под давлением

✅ **Делайте:**
- Сохраняйте спокойствие
- Требуйте адвоката
- Контролируйте протокол
- Фиксируйте нарушения

## Чек-лист: 5 шагов

✅ Шаг 1: Спокойствие, не сопротивляйтесь
✅ Шаг 2: "Отказываюсь от показаний до встречи с адвокатом"
✅ Шаг 3: Требуйте адвоката и звонок
✅ Шаг 4: Запомните время, место, имена
✅ Шаг 5: Читайте протокол перед подписанием

[Защита по уголовным делам](/uslugi/ugolovnye/)`
  },

  {
    id: "2",
    title: "Как работает ст. 228 УК РФ: разбираем нюансы и линии защиты",
    description: "Детальный разбор статьи 228 УК РФ: составы преступления, размеры, экспертиза, типичные ошибки следствия и возможные линии защиты.",
    slug: "st-228-nyuansy",
    datePublished: "2024-10-20",
    dateModified: "2024-11-10",
    author: authors.lyutikov,
    category: "Уголовные дела",
    tags: ["228 УК РФ", "наркотики", "хранение", "крупный размер", "защита", "экспертиза"],
    readingTime: 12,
    heroImage: "/images/articles/st-228-hero.jpg",
    canonical: "https://prof-zashita.ru/knowledge/st-228-nyuansy/",
    references: [
      { title: "УК РФ, ст. 228", url: "http://www.consultant.ru/document/cons_doc_LAW_10699/article-228/" },
      { title: "Постановление Правительства РФ № 1002", url: "http://www.consultant.ru/document/cons_doc_LAW_136037/" }
    ],
    cta: { label: "Консультация по ст. 228", url: "/uslugi/ugolovnye/st-228-uk-rf" },
    disclaimer: "Каждое дело индивидуально. Обратитесь к адвокату.",
    content: `# Как работает ст. 228 УК РФ: разбираем нюансы и линии защиты

Статья 228 УК РФ — одна из самых распространённых в уголовных делах. Рассмотрим все подводные камни.

## Состав преступления

**Ст. 228 УК РФ:** незаконные приобретение, хранение, перевозка наркотических средств.

### Части статьи:
- Ч. 1: значительный размер — до 3 лет
- Ч. 2: крупный размер — до 10 лет
- Ч. 3: особо крупный — до 15 лет

## Размеры наркотиков

Определяются Постановлением Правительства № 1002. Зависят от массы и вида вещества.

## Линии защиты

1. Оспаривание законности доказательств
2. Оспаривание экспертизы
3. Отсутствие умысла
4. Переквалификация

[Защита по ст. 228](/uslugi/ugolovnye/st-228-uk-rf/)`
  },

  {
    id: "3",
    title: "Как обжаловать меру пресечения: пошаговая инструкция",
    description: "Руководство по обжалованию меры пресечения: виды мер, основания, сроки, документы и судебная процедура.",
    slug: "obzhalovat-meru-presetseniya",
    datePublished: "2024-12-01",
    dateModified: "2024-12-01",
    author: authors.sotnikov,
    category: "Меры пресечения",
    tags: ["мера пресечения", "СИЗО", "домашний арест", "подписка о невыезде", "обжалование", "залог"],
    readingTime: 10,
    heroImage: "/images/articles/mera-presecheniya-hero.jpg",
    canonical: "https://prof-zashita.ru/knowledge/obzhalovat-meru-presetseniya/",
    references: [
      { title: "УПК РФ, ст. 97-110", url: "http://www.consultant.ru/document/cons_doc_LAW_34481/" },
      { title: "УПК РФ, ст. 108 (СИЗО)", url: "http://www.consultant.ru/document/cons_doc_LAW_34481/article-108/" }
    ],
    cta: { label: "Помощь в обжаловании", url: "/kontakty" },
    disclaimer: "Каждая ситуация индивидуальна, обратитесь к адвокату.",
    content: `# Как обжаловать меру пресечения

Мера пресечения может быть обжалована, если избрана незаконно или чрезмерно строго.

## Виды мер пресечения

1. Подписка о невыезде
2. Личное поручительство
3. Залог
4. Домашний арест
5. Заключение под стражу (СИЗО)

## Основания для обжалования

- Изменились обстоятельства
- Истекли сроки
- Появились новые данные (здоровье, семья)
- Мера избрана незаконно

## Сроки

Срок апелляции: 10 суток с момента постановления.

[Защита по уголовным делам](/uslugi/ugolovnye/)`
  },

  {
    id: "4",
    title: "Как подготовиться к допросу: права и тактика",
    description: "Полное руководство по подготовке к допросу: права допрашиваемого, типичные вопросы, тактика ответов, роль адвоката.",
    slug: "kak-podgotovitsya-k-doprosu",
    datePublished: "2024-11-25",
    dateModified: "2024-11-25",
    author: authors.sotnikov,
    category: "Процессуальные действия",
    tags: ["допрос", "права", "свидетель", "подозреваемый", "обвиняемый", "протокол", "адвокат"],
    readingTime: 9,
    heroImage: "/images/articles/dopros-hero.jpg",
    canonical: "https://prof-zashita.ru/knowledge/kak-podgotovitsya-k-doprosu/",
    references: [
      { title: "УПК РФ, ст. 187-191", url: "http://www.consultant.ru/document/cons_doc_LAW_34481/" },
      { title: "УПК РФ, ст. 46-47", url: "http://www.consultant.ru/document/cons_doc_LAW_34481/" }
    ],
    cta: { label: "Нужен адвокат на допрос", url: "/kontakty" },
    disclaimer: "Для конкретной ситуации — консультация адвоката.",
    content: `# Как подготовиться к допросу

Допрос — ключевое следственное действие. Правильная подготовка критически важна.

## Ваши права зависят от статуса

### Свидетель (ст. 56):
- Право на адвоката
- Право не свидетельствовать против себя и близких
- Обязанность давать правдивые показания

### Подозреваемый/обвиняемый (ст. 46-47):
- Право отказаться от показаний
- Право на адвоката
- НЕ обязаны доказывать невиновность

## Как корректно отвечать

✅ Говорите правду или молчите
✅ Отвечайте только на заданный вопрос
✅ Не спешите
✅ Если не помните — так и скажите

❌ Не признавайтесь в несовершённом
❌ Не придумывайте версии
❌ Не подписывайте непрочитанный протокол

[Памятка при задержании](/knowledge/pamyatka-pri-zaderzhanii/)`
  }
];

// Helper functions
export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find(article => article.slug === slug);
};

export const getArticlesByCategory = (category: string): Article[] => {
  return articles.filter(article => article.category === category);
};

export const getArticlesByTag = (tag: string): Article[] => {
  return articles.filter(article => article.tags.includes(tag));
};

export const getRelatedArticles = (article: Article, limit: number = 3): Article[] => {
  return articles
    .filter(a => a.id !== article.id && (
      a.category === article.category ||
      a.tags.some(tag => article.tags.includes(tag))
    ))
    .slice(0, limit);
};

export const getAllTags = (): string[] => {
  const tags = new Set<string>();
  articles.forEach(article => {
    article.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
};
