import path from "node:path";
import { describe, expect, it } from "vitest";

import { htmlEntries } from "../../vite.config";
import viteConfig from "../../vite.config.ts?raw";

import { guideEntries } from "./registry";

const pageSources = import.meta.glob<string>("/**/*.html", {
  query: "?raw",
  import: "default",
  eager: true,
});

describe("multi-page guide entries", () => {
  it("has a dedicated HTML document for every registered page", () => {
    const missing = guideEntries
      .map((entry) =>
        entry.path === "/" ? "/index.html" : `${entry.path}index.html`,
      )
      .filter((path) => !(path in pageSources));

    expect(missing).toEqual([]);
  });

  it("boots every page as an independent document entry", () => {
    for (const entry of guideEntries) {
      const path =
        entry.path === "/" ? "/index.html" : `${entry.path}index.html`;
      const source = pageSources[path];
      expect(source, path).toContain('src="/src/main.tsx"');
      expect(source, path).not.toContain("location.hash");
    }
  });

  it("keeps generated document metadata synchronized with the registry", () => {
    for (const entry of guideEntries) {
      const path =
        entry.path === "/" ? "/index.html" : `${entry.path}index.html`;
      const source = pageSources[path];
      const document = new DOMParser().parseFromString(source, "text/html");
      const title =
        entry.path === "/" ? "Codex Mortis" : `${entry.name} · Codex Mortis`;

      expect(document.title, path).toBe(title);
      expect(
        document
          .querySelector('meta[name="description"]')
          ?.getAttribute("content"),
        path,
      ).toBe(entry.description);
      expect(document.body.dataset.pageId, path).toBe(entry.id);
    }
  });

  it("includes every registered document in the production MPA inputs", () => {
    const productionPaths = htmlEntries
      .map(
        (entry) =>
          `/${path.relative(process.cwd(), entry).split(path.sep).join("/")}`,
      )
      .sort();
    const registeredPaths = guideEntries
      .map((entry) =>
        entry.path === "/" ? "/index.html" : `${entry.path}index.html`,
      )
      .sort();

    expect(productionPaths).toEqual(registeredPaths);
    expect(productionPaths).toHaveLength(159);
  });

  it("includes showcase documents in the production MPA inputs", () => {
    expect(viteConfig).toMatch(/pageRoots[\s\S]*["']showcase["']/);
  });

  it("paints the stored theme before application styles load", () => {
    for (const entry of guideEntries) {
      const path =
        entry.path === "/" ? "/index.html" : `${entry.path}index.html`;
      const source = pageSources[path];
      expect(source, path).toMatch(/html\.dark,\s*html\.dark body/);
      expect(source, path).toContain("background-color: #0b0b10");
      expect(source, path).toContain("background-color: #f7f3ea");
      expect(source, path).not.toContain("background: #0b0b10");
      expect(source, path).toMatch(
        /themeColor\?\.setAttribute\([\s\S]*"content",[\s\S]*dark \? "#0b0b10" : "#f7f3ea"/,
      );
      expect(source.indexOf("localStorage.getItem"), path).toBeLessThan(
        source.indexOf('src="/src/main.tsx"'),
      );
    }
  });
});
