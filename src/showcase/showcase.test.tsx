import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ShowcaseIndex, ShowcasePage } from "./showcase-page";

describe("Codex Mortis showcase", () => {
  it("catalogues every product context inside the website", () => {
    render(<ShowcaseIndex />);

    const catalogue = screen.getByRole("list", { name: "Showcase demos" });
    expect(within(catalogue).getAllByRole("link")).toHaveLength(9);
    expect(
      within(catalogue).getByRole("link", { name: /Cloud console/i }),
    ).toHaveAttribute("href", "/showcase/cloud/");
    expect(
      screen.getByText(/fictional demonstration data/i),
    ).toBeInTheDocument();
  });

  it("renders an immersive cloud dashboard with product navigation", () => {
    render(
      <ShowcasePage
        id="showcase-dashboard"
        dark={false}
        onThemeChange={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Operations dashboard" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Axiom Cloud" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Back to Codex Mortis" }),
    ).toHaveAttribute("href", "/showcase/");
    expect(screen.getByText("$18,420")).toBeInTheDocument();
    expect(screen.getAllByText("Healthy")[0]).toHaveClass("bg-status-green");
  });

  it("renders detailed virtual machine configuration", () => {
    render(
      <ShowcasePage
        id="showcase-virtual-machines"
        dark={false}
        onThemeChange={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Virtual machines" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("atlas-prod-01").length).toBeGreaterThan(0);
    expect(screen.getByText("Machine configuration")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Delete VM" }),
    ).toBeInTheDocument();
  });

  it("renders a clearly fictional trading workspace", () => {
    render(<ShowcasePage id="showcase-markets" dark onThemeChange={vi.fn()} />);

    expect(screen.getByRole("heading", { name: "NOVA" })).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "NOVA candlestick chart" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Portfolio allocation pie chart" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Order ticket")).toBeInTheDocument();
    expect(
      screen.getAllByText(/fictional.*no transaction/i).length,
    ).toBeGreaterThan(0);
  });

  it("uses an accessible service-allocation pie chart for billing", () => {
    render(
      <ShowcasePage
        id="showcase-billing"
        dark={false}
        onThemeChange={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("img", { name: "Cloud spend by service pie chart" }),
    ).toBeInTheDocument();
  });
});
