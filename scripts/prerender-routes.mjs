import fs from "node:fs";
import path from "node:path";
import { createServer } from "vite";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const sitemapPath = path.join(distDir, "sitemap.xml");
const manifestPath = path.join(distDir, ".vite", "manifest.json");
const siteUrl = "https://prof-zashita.ru";
const appPlaceholder = "<!--app-html-->";
const headPlaceholder = "<!--ssr-head-->";

const normalizePath = (value) => {
  const pathname = new URL(value, siteUrl).pathname;
  return pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
};

const getRoutes = () => {
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => normalizePath(match[1]))
    .filter((route, index, list) => list.indexOf(route) === index);

  if (!routes.includes("/")) routes.unshift("/");
  return routes;
};

const getOutputPath = (route) => {
  if (route === "/") return path.join(distDir, "index.html");
  return path.join(distDir, route.slice(1), "index.html");
};

const getAssetMap = () => {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  return new Map(
    Object.entries(manifest)
      .filter(([source]) => source.startsWith("src/assets/"))
      .map(([source, entry]) => [`/${source}`, `/${entry.file}`]),
  );
};

const replaceSourceAssetUrls = (html, assetMap) => {
  let output = html;
  for (const [source, built] of assetMap) {
    output = output.split(source).join(built);
  }
  return output;
};

const renderRoute = (template, route, rendered, assetMap) => {
  if (!template.includes(appPlaceholder) || !template.includes(headPlaceholder)) {
    throw new Error("The HTML template is missing prerender placeholders.");
  }

  return replaceSourceAssetUrls(template
    .replace(headPlaceholder, rendered.head)
    .replace(appPlaceholder, rendered.appHtml), assetMap);
};

const vite = await createServer({
  root: rootDir,
  appType: "custom",
  server: { middlewareMode: true, hmr: false },
  logLevel: "error",
});

try {
  const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
  const template = fs.readFileSync(path.join(distDir, "index.html"), "utf8");
  const assetMap = getAssetMap();
  const routes = getRoutes();

  for (const route of routes) {
    const rendered = await render(route);
    const target = getOutputPath(route);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, renderRoute(template, route, rendered, assetMap));
  }

  console.log(`Prerendered ${routes.length} canonical routes.`);
} finally {
  await vite.close();
}
