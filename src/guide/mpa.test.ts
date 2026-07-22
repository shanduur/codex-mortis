import { describe, expect, it } from "vitest";

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
});
