import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { articleGuidance } from "./article-content";
import { ArticlePage } from "./article-page";
import { documentationEntries } from "./registry";

const articleEntries = documentationEntries.filter(
  (entry) => entry.group !== "Showcase",
);

describe("style-guide article coverage", () => {
  it("provides authored guidance for every documentation page", () => {
    const missing = articleEntries
      .map((entry) => entry.id)
      .filter((id) => !articleGuidance[id]);

    expect(missing).toEqual([]);
  });

  it.each(articleEntries)("renders the $name article", (entry) => {
    render(<ArticlePage id={entry.id} />);

    expect(
      screen.getByRole("heading", { name: entry.name }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Overview" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Checklist" }),
    ).toBeInTheDocument();
  });
});
