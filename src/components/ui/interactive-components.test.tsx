import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  Accordion,
  Avatar,
  Banner,
  Breadcrumb,
  Button,
  ButtonGroup,
  Collapsible,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
  Menu,
  NavigationMenu,
  Pagination,
  Popover,
  Progress,
  Skeleton,
  SkipLink,
  Spinner,
  StatusIndicator,
  Stepper,
  Tabs,
  Toast,
  Toggle,
  ToggleGroup,
  Tooltip,
} from "../index";

describe("interactive and feedback components", () => {
  it("supports disclosure and contextual overlays", () => {
    render(
      <>
        <Accordion
          items={[
            { id: "one", title: "Requirements", content: "Node 22 or newer." },
          ]}
        />
        <Collapsible trigger="Advanced settings">Debug logging</Collapsible>
        <Popover trigger={<Button>Show details</Button>}>
          Contextual details
        </Popover>
        <Menu
          label="Actions"
          items={[
            { label: "Rename", onSelect: vi.fn() },
            { label: "Delete", onSelect: vi.fn() },
          ]}
        />
        <Tooltip content="Copy identifier">
          <button>Copy</button>
        </Tooltip>
      </>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Requirements" }));
    expect(screen.getByText("Node 22 or newer.")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Advanced settings" }));
    expect(screen.getByText("Debug logging")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Show details" }));
    expect(screen.getByText("Contextual details")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Actions" }));
    expect(screen.getByRole("menuitem", { name: "Rename" })).toBeVisible();
    fireEvent.focus(screen.getByRole("button", { name: "Copy" }));
    expect(screen.getByRole("tooltip")).toHaveTextContent("Copy identifier");
  });

  it("opens a drawer and switches tabs", () => {
    render(
      <>
        <Drawer>
          <DrawerTrigger asChild>
            <Button>Open filters</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerTitle>Filters</DrawerTitle>
            <DrawerDescription>Limit visible systems.</DrawerDescription>
          </DrawerContent>
        </Drawer>
        <Tabs
          defaultValue="overview"
          items={[
            { value: "overview", label: "Overview", content: "Overview panel" },
            { value: "events", label: "Events", content: "Events panel" },
          ]}
        />
      </>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open filters" }));
    const drawer = screen.getByRole("dialog", { name: "Filters" });
    expect(drawer).toBeVisible();
    expect(drawer).toHaveClass("content-start");
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    fireEvent.click(screen.getByRole("tab", { name: "Events" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Events panel");
  });

  it("supports keyboard navigation for composite controls", () => {
    render(
      <>
        <Menu
          label="Actions"
          items={[
            { label: "Rename", onSelect: vi.fn() },
            { label: "Delete", onSelect: vi.fn() },
          ]}
        />
        <Tabs
          defaultValue="overview"
          items={[
            { value: "overview", label: "Overview", content: "Overview panel" },
            { value: "events", label: "Events", content: "Events panel" },
          ]}
        />
        <Popover trigger={<Button>Show details</Button>}>
          Contextual details
        </Popover>
        <Tooltip content="Copy identifier">
          <button>Copy</button>
        </Tooltip>
      </>,
    );

    const menuTrigger = screen.getByRole("button", { name: "Actions" });
    menuTrigger.focus();
    fireEvent.keyDown(menuTrigger, { key: "ArrowDown" });
    expect(screen.getByRole("menuitem", { name: "Rename" })).toHaveFocus();
    fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(menuTrigger).toHaveFocus();
    fireEvent.click(menuTrigger);
    fireEvent.keyDown(menuTrigger, { key: "Escape" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    const overview = screen.getByRole("tab", { name: "Overview" });
    overview.focus();
    fireEvent.keyDown(overview, { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: "Events" })).toHaveFocus();
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Events panel");

    fireEvent.click(screen.getByRole("button", { name: "Show details" }));
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(screen.queryByText("Contextual details")).not.toBeInTheDocument();

    const tooltipTrigger = screen.getByRole("button", { name: "Copy" });
    fireEvent.focus(tooltipTrigger);
    expect(screen.getByRole("tooltip")).toBeVisible();
    fireEvent.keyDown(tooltipTrigger, { key: "Escape" });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("renders navigation and progress semantics", () => {
    render(
      <>
        <SkipLink href="#content">Skip to content</SkipLink>
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Systems" }]}
        />
        <NavigationMenu
          items={[
            { label: "Products", href: "/products" },
            { label: "Docs", href: "/docs" },
          ]}
        />
        <Pagination
          page={2}
          totalPages={5}
          getHref={(page) => `/systems?page=${page}`}
        />
        <Progress value={40} aria-label="Upload progress" />
        <Spinner label="Loading systems" />
        <Skeleton label="Loading card" />
        <StatusIndicator status="operational">Operational</StatusIndicator>
        <Stepper currentStep={2} steps={["Configure", "Review", "Deploy"]} />
      </>,
    );

    expect(
      screen.getByRole("link", { name: "Skip to content" }),
    ).toHaveAttribute("href", "#content");
    expect(
      screen.getByRole("navigation", { name: "Breadcrumb" }),
    ).toHaveTextContent("HomeSystems");
    expect(
      screen.getByRole("navigation", { name: "Primary" }),
    ).toHaveTextContent("ProductsDocs");
    expect(
      screen.getByRole("navigation", { name: "Pagination" }),
    ).toHaveTextContent("Previous234Next");
    expect(
      screen.getByRole("progressbar", { name: "Upload progress" }),
    ).toHaveAttribute("value", "40");
    expect(
      screen.getByRole("status", { name: "Loading systems" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: "Operational" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Review")).toHaveAttribute("aria-current", "step");
  });

  it("handles toggles, avatar fallback, and dismissible feedback", () => {
    const onDismiss = vi.fn();
    render(
      <>
        <Avatar src="/missing.png" alt="Ada Lovelace" fallback="AL" />
        <Banner title="Maintenance scheduled">Saturday at 10:00 UTC.</Banner>
        <ButtonGroup aria-label="View density">
          <Button>Comfortable</Button>
          <Button>Compact</Button>
        </ButtonGroup>
        <Toggle aria-label="Pin system">Pin</Toggle>
        <ToggleGroup
          aria-label="Alignment"
          type="single"
          defaultValue="left"
          items={[
            { value: "left", label: "Left" },
            { value: "right", label: "Right" },
          ]}
        />
        <Toast
          title="System saved"
          description="The new configuration is active."
          onDismiss={onDismiss}
        />
      </>,
    );

    fireEvent.error(screen.getByRole("img", { name: "Ada Lovelace" }));
    expect(screen.getByText("AL")).toBeVisible();
    expect(
      screen.getByRole("status", { name: "Maintenance scheduled" }),
    ).toHaveTextContent("Maintenance scheduled");
    fireEvent.click(screen.getByRole("button", { name: "Pin system" }));
    expect(screen.getByRole("button", { name: "Pin system" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    fireEvent.click(screen.getByRole("button", { name: "Right" }));
    expect(screen.getByRole("button", { name: "Right" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    const toast = screen.getByRole("status", { name: "System saved" });
    fireEvent.click(within(toast).getByRole("button", { name: "Dismiss" }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });
});
