import { describe, expect, it } from "vitest";

import { componentEntries } from "./registry";

const requiredComponents = [
  "Accordion",
  "Alert",
  "Avatar",
  "Badge",
  "Banner",
  "Breadcrumb",
  "Button",
  "Button Group",
  "Card",
  "Checkbox",
  "Collapsible",
  "Combobox",
  "Container",
  "Date Picker",
  "Description List",
  "Dialog",
  "Divider",
  "Drawer",
  "Empty State",
  "Fieldset",
  "File Upload",
  "Form",
  "Form Error Summary",
  "Form Field",
  "Form Section",
  "Grid",
  "Header",
  "Heading",
  "Icon",
  "Image",
  "Input",
  "Input Group",
  "Link",
  "List",
  "Main",
  "Menu",
  "Navigation Menu",
  "Number Input",
  "Page",
  "Page Header",
  "Pagination",
  "Popover",
  "Progress",
  "Prose",
  "Radio Group",
  "Select",
  "Sidebar",
  "Skeleton",
  "Skip Link",
  "Slider",
  "Spinner",
  "Stack",
  "Stat",
  "Status Indicator",
  "Stepper",
  "Switch",
  "Table",
  "Table of Contents",
  "Tabs",
  "Text",
  "Textarea",
  "Time Picker",
  "Toast",
  "Toggle",
  "Toggle Group",
  "Tooltip",
];

describe("component catalogue", () => {
  it("contains every required component exactly once", () => {
    const names = componentEntries.map((entry) => entry.name);

    expect(names).toEqual(requiredComponents);
    expect(new Set(names).size).toBe(requiredComponents.length);
  });

  it("assigns a stable unique URL id to every component", () => {
    const ids = componentEntries.map((entry) => entry.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(componentEntries.every((entry) => entry.status === "Stable")).toBe(
      true,
    );
    expect(ids).toContain("button-group");
    expect(ids).toContain("form-error-summary");
    expect(ids).toContain("table-of-contents");
  });

  it("assigns every component a real multi-page URL", () => {
    expect(componentEntries.find((entry) => entry.id === "button")?.path).toBe(
      "/components/button/",
    );
    expect(
      componentEntries.every(
        (entry) =>
          entry.path.startsWith("/components/") &&
          entry.path.endsWith("/") &&
          !entry.path.includes("#"),
      ),
    ).toBe(true);
  });

  it("covers a full design-system information architecture", async () => {
    const { guideEntries, navigationSections } = await import("./registry");

    expect(navigationSections.map((section) => section.label)).toEqual([
      "Getting started",
      "Foundations",
      "Guidelines",
      "UI patterns",
      "Scenario patterns",
      "Components",
      "Accessibility",
      "Contributing",
    ]);
    expect(
      guideEntries.some((entry) => entry.path === "/patterns/forms/"),
    ).toBe(true);
    expect(
      guideEntries.some((entry) => entry.path === "/guidelines/ui-text/"),
    ).toBe(true);
    expect(
      guideEntries.some(
        (entry) => entry.path === "/accessibility/keyboard-navigation/",
      ),
    ).toBe(true);
    expect(
      guideEntries.some((entry) => entry.path === "/contributing/code/"),
    ).toBe(true);
  });
});
