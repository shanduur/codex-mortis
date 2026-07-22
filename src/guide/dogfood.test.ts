import { describe, expect, it } from "vitest";

const guideCompositionSources = import.meta.glob<string>(
  [
    "../App.tsx",
    "./page-header.tsx",
    "./sidebar.tsx",
    "./foundation-page.tsx",
    "./article-page.tsx",
    "./icon-catalog.tsx",
    "./component-page.tsx",
  ],
  { eager: true, import: "default", query: "?raw" },
);

describe("guide dogfooding", () => {
  it("composes the website from owned components rather than intrinsic JSX", () => {
    const intrinsicElements = Object.entries(guideCompositionSources).flatMap(
      ([file, source]) => {
        const executableSource = source.replace(/`[^`]*`/gs, "");
        return [...executableSource.matchAll(/<([a-z][a-z0-9-]*)\b/g)]
          .filter((match) => match[1] !== "string")
          .map((match) => `${file}: <${match[1]}>`);
      },
    );

    expect(intrinsicElements).toEqual([]);
  });
});
