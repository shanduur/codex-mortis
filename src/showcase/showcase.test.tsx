import { act, fireEvent, render, screen, within } from "@testing-library/react";
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
    const staticBanner = screen.getByRole("note");
    expect(staticBanner).toHaveTextContent("STATIC SHOWCASE");
    expect(staticBanner.nextElementSibling).toBe(
      screen.getAllByRole("banner")[0],
    );
    expect(
      screen.getByRole("img", { name: "Usage over 30 days" }),
    ).toHaveAttribute("data-chart-library", "echarts");
  });

  it.each([
    ["showcase-dashboard", "Create resource", "Create cloud resource"],
    ["showcase-cloud", "Create resource", "Create cloud resource"],
    ["showcase-virtual-machines", "Create VM", "Create virtual machine"],
    ["showcase-containers", "Deploy workload", "Deploy container workload"],
  ])("opens a creation overlay from %s", (id, trigger, title) => {
    render(<ShowcasePage id={id} dark={false} onThemeChange={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: trigger }));

    expect(screen.getByRole("dialog")).toHaveAccessibleName(title);
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
    const atlas = screen.getByRole("button", {
      name: /^atlas-prod-01fra-1/i,
    });
    expect(atlas).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByText("Machine configuration")[0]).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Delete atlas-prod-01" }),
    ).toBeInTheDocument();

    const secondMachine = screen.getByRole("button", {
      name: /^atlas-prod-02fra-1/i,
    });
    fireEvent.click(secondMachine);
    expect(secondMachine).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("button", { name: "Stop atlas-prod-02" }),
    ).toBeInTheDocument();
  });

  it("places workload details and per-object controls inside an accordion", () => {
    render(
      <ShowcasePage
        id="showcase-containers"
        dark={false}
        onThemeChange={vi.fn()}
      />,
    );

    const gateway = screen.getByRole("button", {
      name: /^api-gatewayghcr\.io/i,
    });
    expect(gateway).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("button", { name: "Scale api-gateway" }),
    ).toBeInTheDocument();

    const worker = screen.getByRole("button", {
      name: /^event-workerghcr\.io/i,
    });
    fireEvent.click(worker);
    expect(worker).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("button", { name: "Restart event-worker" }),
    ).toBeInTheDocument();
  });

  it("routes VM operations through per-resource dialogs and typed toasts", () => {
    vi.useFakeTimers();
    render(
      <ShowcasePage
        id="showcase-virtual-machines"
        dark={false}
        onThemeChange={vi.fn()}
      />,
    );

    for (const [trigger, action, tone] of [
      ["Stop atlas-prod-01", "Stop atlas-prod-01", "WARNING"],
      ["Rebuild atlas-prod-01", "Rebuild atlas-prod-01", "INFO"],
      ["Delete atlas-prod-01", "Delete atlas-prod-01", "ERROR"],
    ]) {
      fireEvent.click(screen.getByRole("button", { name: trigger }));
      expect(screen.getByRole("dialog")).toHaveAccessibleName(action);
      fireEvent.click(screen.getByRole("button", { name: action }));
      expect(screen.getByRole("status")).toBeInTheDocument();
      act(() => vi.advanceTimersByTime(650));
      const toastRole = tone === "INFO" ? "status" : "alert";
      expect(
        screen.getByRole(toastRole, { name: new RegExp(tone) }),
      ).toBeVisible();
      fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    }
    vi.useRealTimers();
  });

  it("autocloses frosted toasts with a visible countdown", () => {
    vi.useFakeTimers();
    render(
      <ShowcasePage
        id="showcase-virtual-machines"
        dark={false}
        onThemeChange={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Refresh" }));
    const toast = screen.getByRole("status", { name: /INFO/ });
    expect(toast).toHaveClass("bg-card/95", "backdrop-blur-xl");
    const countdown = screen.getByRole("progressbar", {
      name: "Time remaining before notification closes",
    });
    expect(countdown).toHaveValue(100);

    act(() => vi.advanceTimersByTime(2500));
    expect(Number(countdown.getAttribute("value"))).toBeLessThan(50);
    act(() => vi.advanceTimersByTime(2100));
    expect(
      screen.queryByRole("status", { name: /INFO/ }),
    ).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it("stacks at most five toasts and lets each one dismiss independently", () => {
    render(
      <ShowcasePage
        id="showcase-virtual-machines"
        dark={false}
        onThemeChange={vi.fn()}
      />,
    );

    const refresh = screen.getByRole("button", { name: "Refresh" });
    for (let index = 0; index < 6; index += 1) fireEvent.click(refresh);

    expect(
      screen.getAllByRole("status", { name: /Fleet refreshed/i }),
    ).toHaveLength(5);
    fireEvent.click(screen.getAllByRole("button", { name: "Dismiss" })[2]);
    expect(
      screen.getAllByRole("status", { name: /Fleet refreshed/i }),
    ).toHaveLength(4);
  });

  it("uses a slider and spinner before scaling a specific workload", () => {
    vi.useFakeTimers();
    render(
      <ShowcasePage
        id="showcase-containers"
        dark={false}
        onThemeChange={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Scale api-gateway" }));
    expect(screen.getByRole("dialog")).toHaveAccessibleName(
      "Scale api-gateway",
    );
    const slider = screen.getByRole("slider", {
      name: "api-gateway desired replicas",
    });
    fireEvent.change(slider, { target: { value: "12" } });
    expect(slider).toHaveValue("12");
    fireEvent.click(screen.getByRole("button", { name: "Scale api-gateway" }));
    expect(
      screen.getByRole("status", { name: "Scaling api-gateway" }),
    ).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(650));
    expect(screen.getByRole("status", { name: /INFO/ })).toHaveTextContent(
      "Desired replicas: 12",
    );
    vi.useRealTimers();
  });

  it("opens useful overlays from the public landing and login actions", () => {
    const landing = render(
      <ShowcasePage
        id="showcase-landing"
        dark={false}
        onThemeChange={vi.fn()}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: /Deploy in 60 seconds/i }),
    );
    expect(screen.getByRole("dialog")).toHaveAccessibleName(
      "Create virtual machine",
    );
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    fireEvent.click(
      screen.getByRole("button", { name: "Read the architecture" }),
    );
    expect(screen.getByRole("dialog")).toHaveAccessibleName(
      "Axiom Cloud architecture",
    );
    landing.unmount();

    render(
      <ShowcasePage id="showcase-login" dark={false} onThemeChange={vi.fn()} />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Organization SSO/i }));
    expect(screen.getByRole("dialog")).toHaveAccessibleName(
      "Organization SSO unavailable",
    );
  });

  it("updates dashboard range and exposes cloud maintenance details", () => {
    const dashboard = render(
      <ShowcasePage
        id="showcase-dashboard"
        dark={false}
        onThemeChange={vi.fn()}
      />,
    );
    fireEvent.click(
      screen.getByRole("button", { name: /Usage range: 30 days/i }),
    );
    expect(
      screen.getByRole("button", { name: /Usage range: 90 days/i }),
    ).toBeInTheDocument();
    dashboard.unmount();

    render(
      <ShowcasePage id="showcase-cloud" dark={false} onThemeChange={vi.fn()} />,
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Review affected resources" }),
    );
    expect(screen.getByRole("dialog")).toHaveAccessibleName(
      "Affected HEL-1 resources",
    );
  });

  it("wires billing and settings actions to feedback and overlays", () => {
    const billing = render(
      <ShowcasePage
        id="showcase-billing"
        dark={false}
        onThemeChange={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Export usage" }));
    expect(
      screen.getByRole("status", { name: /Usage export prepared/i }),
    ).toBeVisible();
    fireEvent.click(
      screen.getByRole("button", { name: "Update payment method" }),
    );
    expect(screen.getByRole("dialog")).toHaveAccessibleName(
      "Update payment method",
    );
    billing.unmount();

    render(
      <ShowcasePage
        id="showcase-settings"
        dark={false}
        onThemeChange={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Invite member" }));
    expect(screen.getByRole("dialog")).toHaveAccessibleName(
      "Invite organization member",
    );
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    fireEvent.click(
      screen.getByRole("button", { name: "Delete organization" }),
    );
    expect(screen.getByRole("dialog")).toHaveAccessibleName(
      "Delete Northstar Labs",
    );
  });

  it("makes market selection, range, side, portfolio, and order controls interactive", () => {
    render(<ShowcasePage id="showcase-markets" dark onThemeChange={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "Portfolio" }));
    expect(screen.getByRole("dialog")).toHaveAccessibleName("Paper portfolio");
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    fireEvent.click(screen.getByRole("button", { name: /ORBTOrbit Works/i }));
    expect(screen.getByRole("heading", { name: "ORBT" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "5D" }));
    expect(screen.getByRole("button", { name: "5D" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    fireEvent.click(screen.getByRole("button", { name: "Sell" }));
    expect(screen.getByRole("button", { name: "Sell" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    fireEvent.click(screen.getByRole("button", { name: "Review order" }));
    expect(screen.getByRole("dialog")).toHaveAccessibleName(
      "Review sell order",
    );
  });

  it("renders a clearly fictional trading workspace", () => {
    render(<ShowcasePage id="showcase-markets" dark onThemeChange={vi.fn()} />);

    expect(screen.getByRole("heading", { name: "NOVA" })).toBeInTheDocument();
    const candlestickChart = screen.getByRole("img", {
      name: "NOVA candlestick chart",
    });
    expect(candlestickChart).toHaveAttribute("data-chart-library", "echarts");
    expect(candlestickChart.tagName).toBe("DIV");
    expect(
      screen.getByRole("img", { name: "Portfolio allocation pie chart" }),
    ).toHaveAttribute("data-chart-library", "echarts");
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
    ).toHaveAttribute("data-chart-library", "echarts");
  });
});
