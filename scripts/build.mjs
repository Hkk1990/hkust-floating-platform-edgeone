import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "dist");
const excluded = new Set([
  ".git",
  ".gitignore",
  "dist",
  "edgeone.json",
  "package.json",
  "package-lock.json",
  "README.md",
  "scripts"
]);

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

for (const entry of readdirSync(root, { withFileTypes: true })) {
  if (excluded.has(entry.name)) continue;
  cpSync(resolve(root, entry.name), resolve(output, entry.name), {
    recursive: true
  });
}

const extraHead = '<link rel="stylesheet" href="./mobility-control.css?v=20260809-3"/>';
const extraBody = '<script src="./mobility-control.js?v=20260809-3" defer></script>';

for (const htmlName of ["index.html", "404.html"]) {
  const htmlPath = resolve(output, htmlName);
  const html = readFileSync(htmlPath, "utf8")
    .replace(/<link rel="preload" as="image"[^>]*\/>/g, "")
    .replaceAll("<img ", '<img loading="lazy" decoding="async" ')
    .replace("</head>", `${extraHead}</head>`)
    .replace("</body>", `${extraBody}</body>`);
  writeFileSync(htmlPath, html, "utf8");
}

console.log("EdgeOne static output generated in dist/");
