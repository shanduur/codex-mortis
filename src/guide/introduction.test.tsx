import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FoundationPage } from "./foundation-page";

describe("Introduction hierarchy", () => {
  it("provides a compact illustrated starting point and grouped document paths", () => {
    render(<FoundationPage id="introduction" />);
    const introduction = screen.getByRole("region", { name: "Codex Mortis" });
    expect(
      within(introduction).getByRole("link", { name: "Explore components" }),
    ).toHaveAttribute("href", "/components/");
    const brandPlate = within(introduction).getByRole("img", {
      name: "The Codex Mortis brand plate",
    });
    expect(brandPlate).toHaveAttribute("loading", "eager");
    expect(brandPlate).toHaveAttribute("fetchpriority", "high");
    expect(brandPlate).toHaveAttribute(
      "srcset",
      expect.stringContaining("640w"),
    );
    expect(brandPlate).toHaveAttribute("sizes");
    const productPaths = screen.getByRole("navigation", {
      name: "Build product UI",
    });
    expect(within(productPaths).getAllByRole("link")).toHaveLength(3);
    expect(
      within(productPaths).getByRole("link", { name: /Components/ }),
    ).toHaveAttribute("href", "/components/");
    const foundations = screen.getByRole("navigation", {
      name: "Shared foundations",
    });
    expect(within(foundations).getAllByRole("link")).toHaveLength(3);
    expect(
      within(foundations).getByRole("link", { name: /Accessibility/ }),
    ).toHaveAttribute("href", "/accessibility/");
    expect(screen.queryByText("Core idea")).not.toBeInTheDocument();
    expect(screen.queryByText("01")).not.toBeInTheDocument();
  });
});
