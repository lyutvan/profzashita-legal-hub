import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://prof-zashita.ru";
const today = new Date().toISOString().slice(0, 10);

const rootDir = process.cwd();
const sitemapPath = path.join(rootDir, "public", "sitemap.xml");
const servicesDataPath = path.join(rootDir, "src", "data", "services-audiences.ts");
const physContentPath = path.join(rootDir, "src", "data", "phys-service-content.ts");

const readFileSafe = (filePath) => {
  if (!fs.existsSync(filePath)) return "";
  return fs.readFileSync(filePath, "utf8");
};

const extractSection = (content, startMarker, endMarker) => {
  const start = content.indexOf(startMarker);
  if (start === -1) return "";
  const end = content.indexOf(endMarker, start);
  return content.slice(start, end === -1 ? content.length : end);
};

const unique = (items) => Array.from(new Set(items));

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

const extractCategoryOverrides = (content) => {
  const result = new Map();
  const blockMatch = content.match(/const CATEGORY_SLUG_OVERRIDES[^=]*=\s*\{([\s\S]*?)\n\};/);
  if (!blockMatch) return result;
  const block = blockMatch[1];
  const pairRegex = /"([^"]+)"\s*:\s*"([^"]+)"/g;
  let match;
  while ((match = pairRegex.exec(block))) {
    result.set(match[1], match[2]);
  }
  return result;
};

const collectPhysPaths = () => {
  const servicesData = readFileSafe(servicesDataPath);
  const physSection = extractSection(servicesData, "ФИЗИЧЕСКИМ ЛИЦАМ", "ЮРИДИЧЕСКИМ ЛИЦАМ");
  const pathMatches = [...physSection.matchAll(/path:\s*'([^']+)'/g)].map((m) => m[1]);
  const physPaths = unique(pathMatches.filter((p) => p.startsWith("/services/phys/")));
  const categoryMatches = [...physSection.matchAll(/category:\s*'([^']+)'/g)].map((m) => m[1]);
  const categories = unique(categoryMatches.filter(Boolean));

  const overrides = extractCategoryOverrides(readFileSafe(physContentPath));
  const categoryPaths = categories.map((title) => {
    const slug = overrides.get(title) ?? slugify(title);
    return `/services/phys/${slug}`;
  });

  return {
    physIndex: "/services/phys",
    physPaths,
    categoryPaths: unique(categoryPaths)
  };
};

const collectCriminalPaths = () => {
  const servicesData = readFileSafe(servicesDataPath);
  const criminalSection = extractSection(servicesData, "УГОЛОВНЫЕ ДЕЛА", "ФИЗИЧЕСКИМ ЛИЦАМ");
  const pathMatches = [...criminalSection.matchAll(/path:\s*'([^']+)'/g)].map((m) => m[1]);
  const criminalPaths = unique(pathMatches.filter((p) => p.startsWith("/services/criminal/")));
  return {
    criminalIndex: "/services/criminal",
    criminalPaths
  };
};

const collectBizPaths = () => {
  const servicesData = readFileSafe(servicesDataPath);
  const bizSection = extractSection(servicesData, "ЮРИДИЧЕСКИМ ЛИЦАМ", "Функции для работы с данными");
  const pathMatches = [...bizSection.matchAll(/path:\s*'([^']+)'/g)].map((m) => m[1]);
  const bizPaths = unique(pathMatches.filter((p) => p.startsWith("/services/biz/")));
  return {
    bizIndex: "/services/biz",
    bizPaths
  };
};

const readExistingSitemap = () => {
  const xml = readFileSafe(sitemapPath);
  const items = [];
  const blocks = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)];
  for (const block of blocks) {
    const text = block[1];
    const loc = text.match(/<loc>([^<]+)<\/loc>/)?.[1];
    if (!loc) continue;
    const priority = text.match(/<priority>([^<]+)<\/priority>/)?.[1];
    const changefreq = text.match(/<changefreq>([^<]+)<\/changefreq>/)?.[1];
    items.push({ loc, priority, changefreq });
  }
  return items;
};

const buildSitemap = () => {
  const { physIndex, physPaths, categoryPaths } = collectPhysPaths();
  const { criminalIndex, criminalPaths } = collectCriminalPaths();
  const { bizIndex, bizPaths } = collectBizPaths();
  const existingItems = readExistingSitemap();
  const physBase = `${SITE_URL}${physIndex}`;
  const criminalBase = `${SITE_URL}${criminalIndex}`;
  const bizBase = `${SITE_URL}${bizIndex}`;

  const preserved = existingItems.filter(
    (item) =>
      !item.loc.startsWith(physBase) &&
      !item.loc.startsWith(criminalBase) &&
      !item.loc.startsWith(bizBase)
  );
  const physUrlSet = new Set([physIndex, ...categoryPaths, ...physPaths]);
  const physUrls = Array.from(physUrlSet).sort();
  const criminalUrlSet = new Set([criminalIndex, ...criminalPaths]);
  const criminalUrls = Array.from(criminalUrlSet).sort();
  const bizUrlSet = new Set([bizIndex, ...bizPaths]);
  const bizUrls = Array.from(bizUrlSet).sort();

  const physItems = physUrls.map((pathItem) => {
    const loc = `${SITE_URL}${pathItem}`;
    const isIndex = pathItem === physIndex;
    const isCategory = categoryPaths.includes(pathItem);
    return {
      loc,
      priority: isIndex ? "0.9" : isCategory ? "0.75" : "0.7",
      changefreq: isIndex ? "weekly" : "monthly"
    };
  });

  const criminalItems = criminalUrls.map((pathItem) => {
    const loc = `${SITE_URL}${pathItem}`;
    const isIndex = pathItem === criminalIndex;
    return {
      loc,
      priority: isIndex ? "0.9" : "0.7",
      changefreq: isIndex ? "weekly" : "monthly"
    };
  });

  const bizItems = bizUrls.map((pathItem) => {
    const loc = `${SITE_URL}${pathItem}`;
    const isIndex = pathItem === bizIndex;
    return {
      loc,
      priority: isIndex ? "0.9" : "0.7",
      changefreq: isIndex ? "weekly" : "monthly"
    };
  });

  const items = [...preserved, ...physItems, ...criminalItems, ...bizItems];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  ];

  for (const item of items) {
    xml.push("  <url>");
    xml.push(`    <loc>${item.loc}</loc>`);
    xml.push(`    <lastmod>${today}</lastmod>`);
    if (item.changefreq) xml.push(`    <changefreq>${item.changefreq}</changefreq>`);
    if (item.priority) xml.push(`    <priority>${item.priority}</priority>`);
    xml.push("  </url>");
  }

  xml.push("</urlset>");

  fs.writeFileSync(sitemapPath, xml.join("\n"));
};

buildSitemap();
