import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { articleGuidance } from "./article-content";
import { ArticlePage } from "./article-page";
import { documentationEntries } from "./registry";

describe("style-guide article coverage", () => {
  it("provides authored guidance for every documentation page", () => {
    const missing = documentationEntries
      .map((entry) => entry.id)
      .filter((id) => !articleGuidance[id]);

    expect(missing).toEqual([]);
  });

  it.each(documentationEntries)("renders the $name article", (entry) => {
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
