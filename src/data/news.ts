export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: 'article' | 'event' | 'past-event';
  excerpt: string;
  content: string;
  image?: string;
}

export const newsItems: NewsItem[] = [
  {
    id: 'children-day-2025',
    title: 'Всероссийский день правовой помощи детям',
    date: '2025-11-20',
    category: 'past-event',
    excerpt: '20 ноября 2025 года с 10:00 до 17:00 в офисе коллегии была оказана бесплатная юридическая помощь детям-сиротам, приемным семьям, детям-инвалидам и их родителям.',
    content: 'В соответствии с решением Правительственной комиссии по вопросам реализации Федерального закона от 21.11.2011 № 324-ФЗ «О бесплатной юридической помощи в Российской Федерации» (протокол от 25.09.2013 № 2), с 2013 года во всех субъектах Российской Федерации ежегодно 20 ноября проводится Всероссийский день правовой помощи детям.',
    image: '/src/assets/news/legal-help-children-day.jpg'
  }
];
