import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const servicesPath = path.join(rootDir, "src", "data", "services-audiences.ts");
const physContentPath = path.join(rootDir, "src", "data", "phys-service-content.ts");
const sitemapPath = path.join(rootDir, "public", "sitemap.xml");
const physTemplatePath = path.join(rootDir, "src", "components", "PhysServiceTemplate.tsx");
const physPagePath = path.join(rootDir, "src", "pages", "services", "PhysPage.tsx");

const SITE_URL = "https://prof-zashita.ru";

const readFileSafe = (filePath) => {
  if (!fs.existsSync(filePath)) return "";
  return fs.readFileSync(filePath, "utf8");
};

const extractPhysSection = (content) => {
  const start = content.indexOf("ФИЗИЧЕСКИМ ЛИЦАМ");
  if (start === -1) return "";
  const end = content.indexOf("ЮРИДИЧЕСКИМ ЛИЦАМ", start);
  return content.slice(start, end === -1 ? content.length : end);
};

const extractMap = (content, name) => {
  const blockMatch = content.match(new RegExp(`const ${name}[^=]*=\\s*\\{([\\s\\S]*?)\\n\\};`));
  if (!blockMatch) return new Map();
  const block = blockMatch[1];
  const pairRegex = /"([^"]+)"\s*:\s*"([^"]+)"/g;
  const map = new Map();
  let match;
  while ((match = pairRegex.exec(block))) {
    map.set(match[1], match[2]);
  }
  return map;
};

const translitMap = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i", й: "y",
  к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f",
  х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya"
};

const slugify = (value) => {
  const normalized = value.replace(/\u00ad/g, "").replace(/\u00a0/g, " ");
  const key = normalized.trim().toLowerCase();
  return key
    .split("")
    .map((char) => {
      if (Object.prototype.hasOwnProperty.call(translitMap, char)) return translitMap[char];
      if (/[a-z0-9]/.test(char)) return char;
      if ([" ", "_", "-", "–", "—", "‑"].includes(char)) return "-";
      return "-";
    })
    .join("")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

const clampMetaDescription = (text) => {
  const min = 140;
  const max = 160;
  if (text.length > max) {
    return `${text.slice(0, max - 1).replace(/[,\s.;-]+$/g, "")}.`;
  }
  if (text.length < min) {
    const additions = [
      " Работаем по договору и соблюдаем конфиденциальность.",
      " Помогаем на досудебной и судебной стадиях."
    ];
    let updated = text;
    for (const add of additions) {
      if (updated.length >= min) break;
      updated += add;
    }
    if (updated.length > max) {
      return `${updated.slice(0, max - 1).replace(/[,\s.;-]+$/g, "")}.`;
    }
    return updated;
  }
  return text;
};

const buildMetaDescription = (serviceName) => {
  const base = `Адвокат по ${serviceName} в Москве: оценка перспектив, план действий и сопровождение дела на всех стадиях.`;
  return clampMetaDescription(base);
};

const parseServices = () => {
  const content = readFileSafe(servicesPath);
  const physSection = extractPhysSection(content);
  const blocks = [...physSection.matchAll(/\{[\s\S]*?audience:\s*'phys'[\s\S]*?\}/g)];
  return blocks.map((block) => {
    const text = block[0];
    const title = text.match(/title:\s*'([^']+)'/)?.[1];
    const pathValue = text.match(/path:\s*'([^']+)'/)?.[1];
    const category = text.match(/category:\s*'([^']+)'/)?.[1];
    if (!title || !pathValue) return null;
    return { title, path: pathValue, category };
  }).filter(Boolean);
};

const buildUrls = () => {
  const services = parseServices();
  const categories = Array.from(new Set(services.map((item) => item.category).filter(Boolean)));
  const slugOverrides = extractMap(readFileSafe(physContentPath), "CATEGORY_SLUG_OVERRIDES");
  const heroOverrides = extractMap(readFileSafe(physContentPath), "CATEGORY_HERO_NAME_OVERRIDES");

  const categoryPages = categories.map((category) => {
    const slug = slugOverrides.get(category) ?? slugify(category);
    const pathValue = `/services/phys/${slug}`;
    const heroServiceName = heroOverrides.get(category) ?? category.toLowerCase();
    return {
      title: category,
      path: pathValue,
      heroServiceName,
      isCategory: true
    };
  }).filter((item) => item.path);

  const servicePages = services.map((service) => ({
    title: service.title,
    path: service.path,
    heroServiceName: service.title.toLowerCase(),
    isCategory: false
  }));

  return [{ title: "Физическим лицам", path: "/services/phys", heroServiceName: "физическим лицам", isCategory: true }, ...categoryPages, ...servicePages];
};

const buildReport = () => {
  const pages = buildUrls();
  const sitemapXml = readFileSafe(sitemapPath);
  const sitemapLocs = new Set([...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));

  const titles = new Map();
  const descriptions = new Map();
  const canonicals = new Map();
  const list = [];
  const missingInSitemap = [];

  for (const page of pages) {
    const metaTitle = `Адвокат по ${page.heroServiceName} в Москве — Профзащита`;
    const metaDescription = buildMetaDescription(page.heroServiceName);
    const canonical = `${SITE_URL}${page.path}`;
    const inSitemap = sitemapLocs.has(canonical);

    if (!titles.has(metaTitle)) titles.set(metaTitle, []);
    titles.get(metaTitle).push(page.path);
    if (!descriptions.has(metaDescription)) descriptions.set(metaDescription, []);
    descriptions.get(metaDescription).push(page.path);
    if (!canonicals.has(canonical)) canonicals.set(canonical, []);
    canonicals.get(canonical).push(page.path);

    if (!inSitemap) missingInSitemap.push(canonical);

    list.push({
      url: canonical,
      inSitemap,
      metaTitle,
      metaDescription,
      canonical
    });
  }

  const duplicateTitles = Array.from(titles.entries()).filter(([, pages]) => pages.length > 1);
  const duplicateDescriptions = Array.from(descriptions.entries()).filter(([, pages]) => pages.length > 1);
  const duplicateCanonicals = Array.from(canonicals.entries()).filter(([, pages]) => pages.length > 1);

  const robotsTemplate = readFileSafe(physTemplatePath);
  const robotsPhysPage = readFileSafe(physPagePath);
  const robotsMetaPresent =
    robotsTemplate.includes('name="robots"') && robotsPhysPage.includes('name="robots"');

  return {
    list,
    duplicateTitles,
    duplicateDescriptions,
    duplicateCanonicals,
    missingInSitemap,
    robotsMetaPresent
  };
};

const report = buildReport();

console.log("URLS:");
for (const item of report.list) {
  console.log(`${item.inSitemap ? "[OK]" : "[MISSING]"} ${item.url}`);
}

console.log("\nMISSING IN SITEMAP:", report.missingInSitemap.length);
if (report.missingInSitemap.length) {
  for (const url of report.missingInSitemap) {
    console.log(`- ${url}`);
  }
}

console.log("\nDUPLICATE TITLES:", report.duplicateTitles.length);
console.log("DUPLICATE DESCRIPTIONS:", report.duplicateDescriptions.length);
console.log("DUPLICATE CANONICALS:", report.duplicateCanonicals.length);
console.log("ROBOTS META PRESENT:", report.robotsMetaPresent ? "yes" : "no");
