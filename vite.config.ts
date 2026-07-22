import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const root = path.dirname(fileURLToPath(import.meta.url));
const pageRoots = [
  "getting-started",
  "foundations",
  "primitives",
  "guidelines",
  "patterns",
  "scenarios",
  "components",
  "accessibility",
  "icons",
  "contributing",
  "showcase",
];

function collectHtmlEntries(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectHtmlEntries(entryPath);
    return entry.name === "index.html" ? [entryPath] : [];
  });
}

const htmlEntries = [
  path.join(root, "index.html"),
  ...pageRoots.flatMap((directory) =>
    collectHtmlEntries(path.join(root, directory)),
  ),
];

export default defineConfig({
  base: process.env.BASE_PATH ?? "/",
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(root, "./src") } },
  build: {
    outDir: "demo-dist",
    rollupOptions: { input: htmlEntries },
  },
});
