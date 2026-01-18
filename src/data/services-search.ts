import { audienceServices, getCategoriesForAudience } from "@/data/services-audiences";
import { getPhysCategoryPagePath, getPhysServiceEntryBySlug } from "@/data/phys-service-content";

export type ServiceAudience = "phys" | "biz" | "criminal";

export interface ServiceSearchItem {
  id: string;
  title: string;
  slug: string;
  path: string;
  audience: ServiceAudience;
  category?: string;
  description?: string;
  keywords: string[];
  priority?: number;
  popular?: boolean;
  subtitle: string;
}

type BaseSearchItem = Omit<ServiceSearchItem, "subtitle">;

export const searchQuickChips = [
  "Развод",
  "Алименты",
  "Наследство",
  "Жилищные споры",
  "ДТП",
  "Защита прав потребителей",
  "Взыскание долга",
  "115-ФЗ",
  "Арбитраж",
  "159 УК"
];

const subtitleOverridesByPath: Record<string, string> = {
  "/services/phys/razvod-razdel-imushchestva": "Стратегия, документы, суд и защита интересов",
  "/services/phys/alimenty": "Назначение, изменение, взыскание задолженности",
  "/services/phys/nasledstvo": "Вступление, оспаривание, раздел наследства",
  "/services/phys/zhilishchnye-spory": "Выселение, выписка, доли и защита права",
  "/services/phys/dtp-strahovye-spory": "Возмещение ущерба, страховые выплаты, вред здоровью",
  "/services/phys/zashchita-prav-potrebitelya": "Возврат товара и денег, неустойка, штраф",
  "/services/phys/vzyskanie-po-raspiskam": "Подготовка претензий и исков, сопровождение суда",
  "/services/biz/razblokirovka-schyota-po-115-fz": "Снятие ограничений, коммуникация с банком",
  "/services/biz/arbitrazh-spory-postavka-podryad-uslugi-arenda": "Поставка, подряд, услуги, аренда, взыскание",
  "/services/biz/razrabotka-ekspertiza-dogovorov-postavka-podryad-uslugi-arenda": "Разработка, экспертиза и защита сделок",
  "/services/criminal/advokat-po-krazha-158": "Защита на стадии проверки, следствия, суда",
  "/services/criminal/advokat-po-moshennichestvo-159": "Стратегия защиты, работа с доказательствами",
  "/services/criminal/advokat-po-nezakonnyy-oborot-narkotikov-228": "Подключение адвоката и контроль процедуры"
};

const keywordOverridesBySlug: Record<string, string[]> = {
  "razvod-razdel-imushchestva": ["развод", "раздел имущества", "семейные споры"],
  "alimenty": ["алименты", "ребенок", "взыскание", "семья"],
  "nasledstvo": ["наследство", "завещание", "наследственные дела"],
  "zhilishchnye-spory": ["жилищные споры", "выселение", "выписка", "доли"],
  "dtp-strahovye-spory": ["дтп", "страхование", "осаго", "каско", "вред здоровью"],
  "zashchita-prav-potrebitelya": ["защита прав потребителей", "возврат", "некачественные услуги"],
  "vzyskanie-po-raspiskam": ["взыскание долга", "расписка", "долг"],
  "razblokirovka-schyota-po-115-fz": ["115-фз", "115 фз", "115фз", "блокировка счета", "комплаенс"],
  "arbitrazh-spory-postavka-podryad-uslugi-arenda": ["арбитраж", "взыскание", "поставка", "подряд", "услуги"],
  "razrabotka-ekspertiza-dogovorov-postavka-podryad-uslugi-arenda": ["договоры", "экспертиза", "сделки"],
  "advokat-po-krazha-158": ["158 ук", "кража"],
  "advokat-po-moshennichestvo-159": ["159 ук", "мошенничество"],
  "advokat-po-nezakonnyy-oborot-narkotikov-228": ["228 ук", "наркотики"]
};

const popularPaths = [
  "/services/phys/razvod-razdel-imushchestva",
  "/services/phys/alimenty",
  "/services/phys/nasledstvo",
  "/services/phys/zhilishchnye-spory",
  "/services/phys/dtp-strahovye-spory",
  "/services/phys/zashchita-prav-potrebitelya",
  "/services/phys/vzyskanie-po-raspiskam",
  "/services/biz/arbitrazh-spory-postavka-podryad-uslugi-arenda",
  "/services/biz/razblokirovka-schyota-po-115-fz",
  "/services/biz/razrabotka-ekspertiza-dogovorov-postavka-podryad-uslugi-arenda",
  "/services/criminal/advokat-po-krazha-158",
  "/services/criminal/advokat-po-moshennichestvo-159",
  "/services/criminal/advokat-po-nezakonnyy-oborot-narkotikov-228"
];

const popularPathSet = new Set(popularPaths);

const buildSubtitle = (item: BaseSearchItem) =>
  subtitleOverridesByPath[item.path] ?? item.description ?? item.category ?? "Услуга";

const buildSearchItem = (item: {
  title: string;
  slug: string;
  path: string;
  audience: ServiceAudience;
  category?: string;
  description?: string;
  priority?: number;
}): BaseSearchItem => ({
  id: `${item.audience}-${item.slug}`,
  title: item.title,
  slug: item.slug,
  path: item.path,
  audience: item.audience,
  category: item.category,
  description: item.description,
  keywords: keywordOverridesBySlug[item.slug] ?? [],
  priority: item.priority,
  popular: popularPathSet.has(item.path)
});

const baseServices = audienceServices.map((service) =>
  buildSearchItem({
    title: service.title,
    slug: service.slug,
    path: service.path,
    audience: service.audience,
    category: service.category,
    description: service.description,
    priority: service.priority
  })
);

const physCategoryServices = getCategoriesForAudience("phys")
  .map((category) => {
    const path = getPhysCategoryPagePath(category.title);
    if (!path) return null;
    const slug = path.replace("/services/phys/", "");
    const entry = getPhysServiceEntryBySlug(slug);
    return buildSearchItem({
      title: entry?.title ?? category.title,
      slug,
      path,
      audience: "phys",
      category: category.title,
      description: entry?.description,
      priority: category.priority
    });
  })
  .filter((item): item is BaseSearchItem => Boolean(item));

const dedupeByPath = (items: BaseSearchItem[]) => {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.path)) return false;
    seen.add(item.path);
    return true;
  });
};

export const serviceSearchItems = dedupeByPath([...physCategoryServices, ...baseServices]).map((item) => ({
  ...item,
  subtitle: buildSubtitle(item)
}));

export const popularServiceItems = popularPaths
  .map((path) => serviceSearchItems.find((item) => item.path === path))
  .filter((item): item is ServiceSearchItem => Boolean(item));
