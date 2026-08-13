import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "dist");
const textArrow = "\u2197\uFE0E";
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
  if (excluded.has(entry.name) || entry.name.startsWith("qa-") || entry.name === ".qa-server.pid") continue;
  cpSync(resolve(root, entry.name), resolve(output, entry.name), {
    recursive: true
  });
}

const assetVersion = "20260813-02";
const extraHead = `<link rel="stylesheet" href="./mobility-control.css?v=${assetVersion}"/><link rel="stylesheet" href="./site-enhancements.css?v=${assetVersion}"/>`;
const extraBody = `<script src="./mobility-control.js?v=${assetVersion}" defer></script><script src="./interaction-control.js?v=${assetVersion}" defer></script><script src="./site-enhancements.js?v=${assetVersion}" defer></script>`;
const intervalGuard = '<script id="mobility-interval-guard">(()=>{const original=window.setInterval;window.setInterval=function(handler,delay,...args){if(delay===7600)return 0;return original.call(window,handler,delay,...args)}})()</script>';

for (const htmlName of ["index.html", "404.html"]) {
  const htmlPath = resolve(output, htmlName);
  const html = readFileSync(htmlPath, "utf8")
    .replace(/<link rel="preload" as="image"[^>]*\/>/g, "")
    .replaceAll("platform-top.webp", "platform-water-only-v2.webp")
    .replaceAll("platform-float-unit.webp", "platform-float-unit-clean-v4.webp")
    .replaceAll("也是一台科研仪器", "也是一座科研设施")
    .replaceAll("避让行洪<br/><em>平台可移动", "避让行洪，<br/><em>平台可移动")
    .replaceAll("↗", textArrow)
    .replace("<head>", `<head>${intervalGuard}`)
    .replace("</head>", `${extraHead}</head>`)
    .replace("</body>", `${extraBody}</body>`);
  writeFileSync(htmlPath, html, "utf8");
}

const pageBundlePath = resolve(output, "_next/static/chunks/page-BsArb3My.js");
const autoToggleEffect = '(0,r.useEffect)(()=>{let e=window.setInterval(()=>t(e=>!e),7600);return()=>window.clearInterval(e)},[])';
const disabledAutoToggleEffect = '(0,r.useEffect)(()=>{},[])';
const pageBundle = readFileSync(pageBundlePath, "utf8");
if (!pageBundle.includes(autoToggleEffect)) {
  throw new Error("Expected mobility auto-toggle effect was not found.");
}
writeFileSync(
  pageBundlePath,
  pageBundle
    .replace(autoToggleEffect, disabledAutoToggleEffect)
    .replaceAll("platform-top.webp", "platform-water-only-v2.webp")
    .replaceAll("platform-float-unit.webp", "platform-float-unit-clean-v4.webp")
    .replaceAll("也是一台科研仪器", "也是一座科研设施")
    .replaceAll("children:[`避让行洪`,(0,i.jsx)(`br`,{})", "children:[`避让行洪，`,(0,i.jsx)(`br`,{})")
    .replaceAll("↗", textArrow),
  "utf8"
);

console.log("EdgeOne static output generated in dist/");
