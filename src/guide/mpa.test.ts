import { describe, expect, it } from "vitest";

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
      expect(source.indexOf("localStorage.getItem"), path).toBeLessThan(
        source.indexOf('src="/src/main.tsx"'),
      );
    }
  });
});
