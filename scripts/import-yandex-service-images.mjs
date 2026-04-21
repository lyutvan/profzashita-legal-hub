import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";

const projectRoot = process.cwd();
const defaultSourceDir = "/Users/lyutvan/Desktop/фото";
const defaultOutputDir = path.join(projectRoot, "public", "images", "yandex-services");
const defaultExportDir = path.join(projectRoot, "exports", "yandex-business");
const defaultBaseUrl = "https://prof-zashita.ru/";
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"]);

const getArgValue = (flag, fallback) => {
  const index = process.argv.indexOf(flag);
  if (index === -1) return fallback;
  return process.argv[index + 1] ?? fallback;
};

const sourceDir = path.resolve(getArgValue("--src", defaultSourceDir));
const outputDir = path.resolve(getArgValue("--out", defaultOutputDir));
const exportDir = path.resolve(getArgValue("--export-dir", defaultExportDir));
const baseUrl = getArgValue("--base-url", defaultBaseUrl);

const toPublicUrl = (fileName) =>
  new URL(`images/yandex-services/${fileName}`, baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`).href;

const escapeCsv = (value) => `"${String(value).replaceAll('"', '""')}"`;

const ensureEmptyDirectory = async (dirPath) => {
  await fs.mkdir(dirPath, { recursive: true });
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  await Promise.all(
    entries.map((entry) =>
      fs.rm(path.join(dirPath, entry.name), { recursive: true, force: true })
    )
  );
};

const optimizeToJpeg = (inputPath, outputPath) => {
  const result = spawnSync(
    "sips",
    ["-s", "format", "jpeg", "-s", "formatOptions", "85", "-Z", "1600", inputPath, "--out", outputPath],
    { encoding: "utf8" }
  );

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || `sips failed for ${inputPath}`);
  }
};

const sourceEntries = await fs.readdir(sourceDir, { withFileTypes: true });
const imageFiles = sourceEntries
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name)
  .filter((fileName) => imageExtensions.has(path.extname(fileName).toLowerCase()))
  .sort((left, right) => left.localeCompare(right, "ru"));

if (imageFiles.length === 0) {
  throw new Error(`В папке ${sourceDir} не найдено изображений.`);
}

await ensureEmptyDirectory(outputDir);
await ensureEmptyDirectory(exportDir);

const rows = [];

for (const [index, sourceFileName] of imageFiles.entries()) {
  const outputFileName = `service-${String(index + 1).padStart(2, "0")}.jpg`;
  const inputPath = path.join(sourceDir, sourceFileName);
  const outputPath = path.join(outputDir, outputFileName);
  optimizeToJpeg(inputPath, outputPath);

  rows.push({
    originalFile: sourceFileName,
    publicFile: outputFileName,
    directUrl: toPublicUrl(outputFileName)
  });
}

const csv = [
  "original_file,public_file,direct_url",
  ...rows.map((row) =>
    [row.originalFile, row.publicFile, row.directUrl].map(escapeCsv).join(",")
  )
].join("\n");

const txt = rows.map((row) => row.directUrl).join("\n");
const json = JSON.stringify(rows, null, 2);

await fs.writeFile(path.join(exportDir, "services-images.csv"), `${csv}\n`, "utf8");
await fs.writeFile(path.join(exportDir, "services-images.txt"), `${txt}\n`, "utf8");
await fs.writeFile(path.join(exportDir, "services-images.json"), `${json}\n`, "utf8");

console.log(`Imported ${rows.length} image(s) from ${sourceDir}`);
console.log(`Public directory: ${outputDir}`);
console.log(`CSV: ${path.join(exportDir, "services-images.csv")}`);
console.log(`TXT: ${path.join(exportDir, "services-images.txt")}`);
