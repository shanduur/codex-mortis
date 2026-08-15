import { execFileSync } from "node:child_process";
import { rm, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = path.join(root, "src/guide/registry.ts");
const generatedRoots = [
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
];

const cacheDirectory = path.join(root, "node_modules/.tmp");
const modulePath = path.join(cacheDirectory, "registry.js");
await mkdir(cacheDirectory, { recursive: true });
execFileSync(path.join(root, "node_modules/.bin/tsc"), [
  "--ignoreConfig",
  "--target",
  "es2022",
  "--module",
  "esnext",
  "--outDir",
  cacheDirectory,
  registryPath,
]);
const { guideEntries } = await import(
  `${pathToFileURL(modulePath).href}?generated=${Date.now()}`
);

for (const directory of generatedRoots) {
  await rm(path.join(root, directory), { recursive: true, force: true });
}

const generatedFiles = [];
for (const entry of guideEntries) {
  const directory =
    entry.path === "/" ? root : path.join(root, entry.path.replace(/^\//, ""));
  await mkdir(directory, { recursive: true });
  const outputPath = path.join(directory, "index.html");
  await writeFile(outputPath, pageTemplate(entry));
  generatedFiles.push(outputPath);
}
execFileSync(
  path.join(root, "node_modules/.bin/prettier"),
  ["--write", ...generatedFiles],
  { stdio: "ignore" },
);

console.log(`Generated ${guideEntries.length} independent HTML page entries.`);

function pageTemplate(entry) {
  const title = escapeHtml(
    entry.path === "/" ? "Codex Mortis" : `${entry.name} · Codex Mortis`,
  );
  const description = escapeHtml(entry.description);
  const pageId = escapeHtml(entry.id);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/logo.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${description}" />
    <meta name="theme-color" content="#0b0b10" />
    <title>${title}</title>
    <style>
      html,
      body {
        background-color: #f7f3ea;
        color-scheme: light;
      }
      html.dark,
      html.dark body {
        background-color: #0b0b10;
        color-scheme: dark;
      }
    </style>
    <script>
      const dark = localStorage.getItem("theme") === "dark";
      document.documentElement.classList.toggle("dark", dark);
      const themeColor = document.querySelector('meta[name="theme-color"]');
      themeColor?.setAttribute("content", dark ? "#0b0b10" : "#f7f3ea");
    </script>
  </head>
  <body data-page-id="${pageId}">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
