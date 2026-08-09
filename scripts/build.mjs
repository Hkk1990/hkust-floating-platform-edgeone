import { cpSync, mkdirSync, readdirSync, rmSync } from "node:fs";
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

console.log("EdgeOne static output generated in dist/");
