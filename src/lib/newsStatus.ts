import type { NewsItem } from "@/data/news";

export type EffectiveNewsCategory = NewsItem["category"];

const parseLocalDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number);
  if (!year || !month || !day) return null;

  return new Date(year, month - 1, day);
};

const todayLocal = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export const getEffectiveNewsCategory = (
  item: NewsItem,
  currentDate: Date = todayLocal()
): EffectiveNewsCategory => {
  if (item.category === "article") return "article";

  const endDate = parseLocalDate(item.eventEndDate ?? item.date);
  if (!endDate) return item.category;

  return endDate < currentDate ? "past-event" : "event";
};
