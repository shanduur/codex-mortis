import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import App from "./App";

describe("design language guide", () => {
  beforeEach(() => {
    window.location.hash = "";
    window.history.replaceState({}, "", "/");
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("provides keyboard-only access to navigation and page content", () => {
    render(<App />);

    const skipLink = screen.getByRole("link", { name: "Skip to content" });
    expect(skipLink).toHaveAttribute("href", "#content");
    expect(screen.getByRole("main")).toHaveAttribute("id", "content");
    expect(screen.getByRole("main")).toHaveAttribute("tabindex", "-1");

    fireEvent.keyDown(document, { key: "/" });
    const search = screen.getByRole("searchbox", {
      name: "Search documentation",
    });
    expect(search).toHaveFocus();

    fireEvent.change(search, { target: { value: "switch" } });
    fireEvent.keyDown(search, { key: "Escape" });
    expect(search).toHaveValue("");
    expect(search).toHaveFocus();
  });

  it("uses standard document links instead of hash navigation", () => {
    window.history.replaceState({}, "", "/components/");
    render(<App />);

    const catalogue = screen.getByRole("list", {
      name: "Component catalogue",
    });
    expect(
      within(catalogue).getByRole("link", { name: /^\d+ButtonStable$/i }),
    ).toHaveAttribute("href", "/components/button/");
  });

  it("renders a component from a directly loaded pathname", () => {
    window.history.replaceState({}, "", "/components/button/");

    render(<App />);

    expect(screen.getByRole("heading", { name: "Button" })).toBeInTheDocument();
    expect(
      screen.getByLabelText("Button component examples"),
    ).toBeInTheDocument();
  });

  it("exposes the full style-guide navigation as document links", () => {
    render(<App />);

    const navigation = screen.getByRole("navigation", {
      name: "Guide navigation",
    });
    expect(within(navigation).getByText("Guidelines")).toBeInTheDocument();
    expect(within(navigation).getByText("Primitives")).toBeInTheDocument();
    expect(
      within(navigation).getAllByText("UI patterns").length,
    ).toBeGreaterThan(0);
    expect(
      within(navigation).getAllByText("Accessibility").length,
    ).toBeGreaterThan(0);
    expect(
      within(navigation).getAllByText("Contributing").length,
    ).toBeGreaterThan(0);
    expect(within(navigation).getByText("Icons")).toBeInTheDocument();
    expect(
      within(navigation).getByRole("link", { name: "UI patterns" }),
    ).toHaveAttribute("href", "/patterns/");
  });

  it("renders a complete pattern article from its pathname", () => {
    window.history.replaceState({}, "", "/patterns/forms/");

    render(<App />);

    expect(screen.getByRole("heading", { name: "Forms" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Anatomy" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Validation" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/one clear task/i)).toBeInTheDocument();
  });

  it("provides a searchable icon catalog on its own document", () => {
    window.history.replaceState({}, "", "/icons/catalog/");
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Icon catalog" }),
    ).toBeInTheDocument();
    fireEvent.change(screen.getByRole("searchbox", { name: "Search icons" }), {
      target: { value: "trash" },
    });
    expect(screen.getByText("Trash 2")).toBeInTheDocument();
    expect(screen.queryByText("Search")).not.toBeInTheDocument();
  });

  it("uses the sidebar as the single guide navigation", () => {
    render(<App />);

    expect(
      screen.queryByRole("navigation", { name: "Primary guide sections" }),
    ).not.toBeInTheDocument();

    const navigation = screen.getByRole("navigation", {
      name: "Guide navigation",
    });
    expect(
      within(navigation).getByRole("link", { name: "Foundations" }),
    ).toHaveAttribute("href", "/foundations/");
    expect(
      within(navigation).getByRole("link", { name: "Components" }),
    ).toHaveAttribute("href", "/components/");
    expect(
      within(navigation).getByRole("link", { name: "UI patterns" }),
    ).toHaveAttribute("href", "/patterns/");
    expect(
      within(navigation).getByRole("link", { name: "Accessibility" }),
    ).toHaveAttribute("href", "/accessibility/");
  });

  it("opens with foundations and routes into the complete guide", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Design language" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Guide navigation" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Editorial neo-industrialism")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Neo-brutalist color is an accent, not the default surface/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Build product UI" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Shared foundations" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Explore components" }),
    ).toHaveAttribute("href", "/components/");
    expect(
      screen.getByRole("link", { name: "Read accessibility guidance" }),
    ).toHaveAttribute("href", "/accessibility/");
  });

  it("loads a component guide with examples and usage code", () => {
    window.history.replaceState({}, "", "/components/button/");
    render(<App />);

    expect(screen.getByRole("heading", { name: "Button" })).toBeInTheDocument();
    expect(
      screen.getByText("Choose a variant by intent, not appearance.", {
        exact: false,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Button component examples"),
    ).toBeInTheDocument();
    expect(screen.getByText(/import \{ Button \}/)).toBeInTheDocument();
  });

  it("documents a newly added interactive component with a live example", () => {
    window.history.replaceState({}, "", "/components/accordion/");
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Accordion" }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Accordion component examples"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Requirements" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/import \{ Accordion \}/)).toBeInTheDocument();
  });

  it("keeps supporting copy on owned surfaces", () => {
    render(<App />);

    expect(
      screen
        .getByText(/An editorial neo-industrial system for technical products/)
        .closest("[data-slot='card']"),
    ).not.toBeNull();
    expect(
      screen
        .getByText(/Technical-catalogue clarity, disciplined alignment/)
        .closest("[data-slot='card']"),
    ).not.toBeNull();
  });

  it("keeps the Core idea label readable on the dark editorial surface", () => {
    render(<App />);

    expect(screen.getByText("Core idea")).toHaveClass(
      "text-secondary-foreground",
    );
  });

  it("documents the actual semantic color roles", () => {
    window.history.replaceState({}, "", "/foundations/color/");
    render(<App />);

    expect(
      screen.getByText("Color is categorical, not ambient."),
    ).toBeInTheDocument();
    expect(
      screen
        .getByText(/Most of the interface stays paper, ink, and muted neutral/)
        .closest("[data-slot='card']"),
    ).not.toBeNull();
    expect(
      screen.getByText("Selected and high-attention moments"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Primary actions, active navigation, information, and links",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Warnings, destructive actions, and error states"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Success, operational, and healthy system states"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Rare expressive or experimental moments"),
    ).toBeInTheDocument();
  });

  it("filters the component catalogue by name", () => {
    render(<App />);

    fireEvent.change(
      screen.getByRole("searchbox", { name: "Search documentation" }),
      {
        target: { value: "dialog" },
      },
    );

    const catalogue = screen.getByRole("list", { name: "Component catalogue" });
    expect(
      within(catalogue).getByRole("link", { name: /Dialog/ }),
    ).toBeInTheDocument();
    expect(
      within(catalogue).queryByRole("link", { name: /Button/ }),
    ).not.toBeInTheDocument();
  });

  it("persists the selected color mode", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Use dark theme" }));

    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });
});
