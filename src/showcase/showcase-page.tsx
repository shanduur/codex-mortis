import {
  cloneElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  BarChart as EChartsBarSeries,
  CandlestickChart as EChartsCandlestickSeries,
  LineChart as EChartsLineSeries,
  PieChart as EChartsPieSeries,
} from "echarts/charts";
import {
  AriaComponent,
  GraphicComponent,
  GridComponent,
  TooltipComponent,
} from "echarts/components";
import {
  init,
  use as registerEChartsModules,
  type EChartsCoreOption,
} from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  Box,
  Check,
  ChevronRight,
  Cloud,
  Container as ContainerIcon,
  Cpu,
  CreditCard,
  Database,
  Download,
  Gauge,
  Globe2,
  Layers3,
  LockKeyhole,
  Moon,
  Network,
  Plus,
  RefreshCw,
  Search,
  Server,
  Settings,
  ShieldCheck,
  SquareTerminal,
  Sun,
  Trash2,
  TrendingUp,
  Users,
  WalletCards,
  X,
} from "lucide-react";

import * as UI from "@/components";
import { guideHref } from "@/guide/paths";
import { cn } from "@/lib/utils";

registerEChartsModules([
  EChartsLineSeries,
  EChartsBarSeries,
  EChartsPieSeries,
  EChartsCandlestickSeries,
  GridComponent,
  TooltipComponent,
  GraphicComponent,
  AriaComponent,
  SVGRenderer,
]);

const demoLinks = [
  ["Landing", "/showcase/landing/"],
  ["Login", "/showcase/login/"],
  ["Dashboard", "/showcase/dashboard/"],
  ["Cloud", "/showcase/cloud/"],
  ["VMs", "/showcase/cloud/virtual-machines/"],
  ["Containers", "/showcase/cloud/containers/"],
  ["Billing", "/showcase/billing/"],
  ["Settings", "/showcase/settings/"],
  ["Markets", "/showcase/markets/"],
] as const;

const vmRows = [
  [
    "atlas-prod-01",
    "fra-1",
    "Ubuntu 24.04",
    "4 / 16 GB",
    "185.42.18.12",
    "Running",
    "$86",
  ],
  [
    "atlas-prod-02",
    "fra-1",
    "Ubuntu 24.04",
    "4 / 16 GB",
    "185.42.18.13",
    "Running",
    "$86",
  ],
  [
    "metrics-01",
    "hel-1",
    "Talos 1.10",
    "8 / 32 GB",
    "65.21.44.90",
    "Maintenance",
    "$164",
  ],
  [
    "preview-07",
    "lhr-1",
    "Debian 13",
    "2 / 4 GB",
    "51.140.88.7",
    "Stopped",
    "$22",
  ],
] as const;

const workloadRows = [
  [
    "api-gateway",
    "ghcr.io/axiom/gateway:2.8.4",
    "8 / 8",
    "Healthy",
    "42%",
    "61%",
    "0",
  ],
  [
    "event-worker",
    "ghcr.io/axiom/worker:7.1.0",
    "11 / 12",
    "Progressing",
    "68%",
    "74%",
    "2",
  ],
  [
    "search-index",
    "ghcr.io/axiom/search:1.4.2",
    "4 / 6",
    "Degraded",
    "91%",
    "88%",
    "19",
  ],
  [
    "web-console",
    "ghcr.io/axiom/web:5.9.1",
    "6 / 6",
    "Healthy",
    "21%",
    "46%",
    "0",
  ],
] as const;

const invoices = [
  ["INV-2026-071", "Jul 2026", "$18,420.12", "Open"],
  ["INV-2026-061", "Jun 2026", "$17,904.80", "Paid"],
  ["INV-2026-051", "May 2026", "$16,611.44", "Paid"],
  ["INV-2026-041", "Apr 2026", "$15,982.07", "Paid"],
] as const;

const marketRows = [
  ["NOVA", "Nova Systems", "$184.62", "+4.72%"],
  ["ORBT", "Orbit Works", "$71.20", "+1.18%"],
  ["PLSM", "Plasma Energy", "$42.18", "−2.07%"],
  ["CIRR", "Cirrus Data", "$96.04", "+0.36%"],
  ["AXIS", "Axis Index ETF", "$311.77", "−0.84%"],
] as const;

const demoCards = [
  [
    "Public",
    "Landing page",
    "A technical product story from hero to pricing.",
    "/showcase/landing/",
    Globe2,
  ],
  [
    "Authentication",
    "Login",
    "Secure access, SSO, recovery, and service status.",
    "/showcase/login/",
    LockKeyhole,
  ],
  [
    "Operations",
    "Dashboard",
    "Spend, workload health, incidents, and activity.",
    "/showcase/dashboard/",
    Gauge,
  ],
  [
    "Infrastructure",
    "Cloud console",
    "Regional inventory, topology, quotas, and networks.",
    "/showcase/cloud/",
    Cloud,
  ],
  [
    "Compute",
    "Virtual machines",
    "Fleet state and detailed machine configuration.",
    "/showcase/cloud/virtual-machines/",
    Server,
  ],
  [
    "Workloads",
    "Containers",
    "Deployments, replicas, rollouts, events, and logs.",
    "/showcase/cloud/containers/",
    ContainerIcon,
  ],
  [
    "Finance",
    "Billing",
    "Spend forecasts, service usage, budgets, and invoices.",
    "/showcase/billing/",
    CreditCard,
  ],
  [
    "Administration",
    "Settings",
    "Members, access policy, tokens, and audit state.",
    "/showcase/settings/",
    Settings,
  ],
  [
    "Markets",
    "Trading terminal",
    "Watchlists, pricing, order depth, and portfolio data.",
    "/showcase/markets/",
    TrendingUp,
  ],
] as const;

function AppLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <UI.Link href={guideHref(href)} className={cn("no-underline", className)}>
      {children}
    </UI.Link>
  );
}

function FictionalNotice({
  compact = false,
  banner = false,
}: {
  compact?: boolean;
  banner?: boolean;
}) {
  return (
    <div
      role="note"
      className={cn(
        "border border-foreground bg-signal-yellow/20 px-4 py-3 font-mono text-xs",
        compact && "py-2",
        banner && "border-x-0 border-t-0 bg-signal-yellow/35 py-2 text-center",
      )}
    >
      <strong>STATIC SHOWCASE</strong> — All organizations, infrastructure,
      prices, invoices, and orders are fictional demonstration data. No
      transaction or remote operation occurs.
    </div>
  );
}

function ShowcaseBar({
  dark,
  onThemeChange,
}: {
  dark: boolean;
  onThemeChange: () => void;
}) {
  return (
    <>
      <FictionalNotice banner />
      <header className="sticky top-0 z-50 flex min-h-12 flex-wrap items-center justify-between gap-3 border-b border-foreground bg-background px-4 py-2 shadow-sm">
        <AppLink
          href="/showcase/"
          className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.12em]"
        >
          <ArrowLeft className="size-4" /> Back to Codex Mortis
        </AppLink>
        <nav
          aria-label="Showcase demos"
          className="hidden items-center gap-1 xl:flex"
        >
          {demoLinks.map(([label, href]) => (
            <AppLink
              key={href}
              href={href}
              className="border border-transparent px-2 py-1 text-xs text-muted-foreground hover:border-foreground hover:bg-signal-yellow/20 hover:text-foreground"
            >
              {label}
            </AppLink>
          ))}
        </nav>
        <UI.Button
          variant="outline"
          size="icon"
          aria-label={dark ? "Use light theme" : "Use dark theme"}
          onClick={onThemeChange}
        >
          {dark ? <Sun /> : <Moon />}
        </UI.Button>
      </header>
    </>
  );
}

const consoleLinks = [
  ["Overview", "/showcase/dashboard/", Gauge],
  ["Cloud", "/showcase/cloud/", Cloud],
  ["Virtual machines", "/showcase/cloud/virtual-machines/", Server],
  ["Containers", "/showcase/cloud/containers/", ContainerIcon],
  ["Billing", "/showcase/billing/", CreditCard],
  ["Settings", "/showcase/settings/", Settings],
] as const;

function ConsoleShell({
  id,
  dark,
  onThemeChange,
  title,
  eyebrow,
  action,
  children,
}: {
  id: string;
  dark: boolean;
  onThemeChange: () => void;
  title: string;
  eyebrow: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <UI.Page className="min-h-screen bg-transparent">
      <UI.SkipLink href="#showcase-content">
        Skip to showcase content
      </UI.SkipLink>
      <ShowcaseBar dark={dark} onThemeChange={onThemeChange} />
      <div className="lg:grid lg:min-h-[calc(100vh-3rem)] lg:grid-cols-[15rem_minmax(0,1fr)]">
        <aside className="border-b border-foreground bg-card p-4 lg:border-b-0 lg:border-r">
          <div className="mb-6 flex items-center gap-3 border border-foreground bg-primary p-3 text-primary-foreground shadow-sm">
            <SquareTerminal className="size-5" />
            <div>
              <p className="font-semibold">Axiom Cloud</p>
              <p className="font-mono text-[10px] uppercase tracking-wider opacity-80">
                Production
              </p>
            </div>
          </div>
          <nav aria-label="Axiom Cloud">
            <ul className="space-y-1">
              {consoleLinks.map(([label, href, Icon]) => {
                const active =
                  id ===
                  (
                    {
                      "/showcase/dashboard/": "showcase-dashboard",
                      "/showcase/cloud/": "showcase-cloud",
                      "/showcase/cloud/virtual-machines/":
                        "showcase-virtual-machines",
                      "/showcase/cloud/containers/": "showcase-containers",
                      "/showcase/billing/": "showcase-billing",
                      "/showcase/settings/": "showcase-settings",
                    } as Record<string, string>
                  )[href];
                return (
                  <li key={href}>
                    <AppLink
                      href={href}
                      className={cn(
                        "flex items-center gap-3 border border-transparent px-3 py-2 text-sm hover:border-foreground hover:bg-muted",
                        active &&
                          "border-foreground bg-signal-yellow text-secondary-foreground shadow-sm",
                      )}
                    >
                      <Icon className="size-4" /> {label}
                    </AppLink>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-8 border-t pt-4 text-xs text-muted-foreground">
            <p className="font-mono uppercase tracking-wider">Organization</p>
            <p className="mt-2 font-medium text-foreground">Northstar Labs</p>
            <p>platform-production</p>
          </div>
        </aside>
        <div className="min-w-0">
          <div className="flex min-h-14 items-center justify-between gap-4 border-b bg-card px-5 py-3">
            <label className="relative block w-full max-w-md">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <UI.Input
                aria-label="Search Axiom Cloud"
                placeholder="Search resources or run a command"
                className="pl-9 shadow-none"
              />
            </label>
            <UI.Badge variant="outline" className="hidden sm:inline-flex">
              FRA-1 · Healthy
            </UI.Badge>
          </div>
          <UI.Main
            id="showcase-content"
            tabIndex={-1}
            className="px-4 py-8 sm:px-7 lg:px-10"
          >
            <div className="mx-auto max-w-[96rem]">
              <UI.PageHeader
                className="mb-8"
                eyebrow={eyebrow}
                title={title}
                description="Northstar Labs · platform-production"
                actions={action}
              />
              {children}
            </div>
          </UI.Main>
        </div>
      </div>
    </UI.Page>
  );
}

function MetricGrid({
  items,
}: {
  items: readonly (readonly [string, string, string, string?])[];
}) {
  return (
    <UI.Grid columns={4} gap="4" className="mb-6">
      {items.map(([label, value, description, tone]) => (
        <UI.Stat
          key={label}
          label={label}
          value={value}
          description={description}
          className={cn("p-5 shadow-sm", tone)}
        />
      ))}
    </UI.Grid>
  );
}

function SectionCard({
  title,
  description,
  action,
  children,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <UI.Card className={cn("min-w-0", className)}>
      <UI.CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <UI.CardTitle>{title}</UI.CardTitle>
          {description && (
            <UI.CardDescription>{description}</UI.CardDescription>
          )}
        </div>
        {action}
      </UI.CardHeader>
      <UI.CardContent>{children}</UI.CardContent>
    </UI.Card>
  );
}

function Status({ children }: { children: string }) {
  const style =
    children === "Running" || children === "Healthy" || children === "Paid"
      ? "bg-status-green text-secondary-foreground"
      : children === "Stopped" ||
          children === "Degraded" ||
          children === "Failed"
        ? "bg-alert-coral text-secondary-foreground"
        : "bg-signal-yellow text-secondary-foreground";
  return (
    <UI.Badge className={cn("border-foreground", style)}>{children}</UI.Badge>
  );
}

function SimpleTable({
  caption,
  headers,
  rows,
  firstColumnHeader = true,
}: {
  caption: string;
  headers: readonly string[];
  rows: readonly (readonly ReactNode[])[];
  firstColumnHeader?: boolean;
}) {
  return (
    <UI.Table>
      <UI.TableCaption>{caption}</UI.TableCaption>
      <UI.TableHeader>
        <UI.TableRow>
          {headers.map((header, index) => (
            <UI.TableHead key={`${header}-${index}`}>{header}</UI.TableHead>
          ))}
        </UI.TableRow>
      </UI.TableHeader>
      <UI.TableBody>
        {rows.map((row, rowIndex) => (
          <UI.TableRow key={`${String(row[0])}-${rowIndex}`}>
            {row.map((cell, index) =>
              index === 0 && firstColumnHeader ? (
                <UI.TableHead
                  scope="row"
                  key={index}
                  className="font-mono text-xs"
                >
                  {cell}
                </UI.TableHead>
              ) : (
                <UI.TableCell key={index}>{cell}</UI.TableCell>
              ),
            )}
          </UI.TableRow>
        ))}
      </UI.TableBody>
    </UI.Table>
  );
}

type DemoToast = {
  tone: "info" | "warning" | "error";
  title: string;
  description: string;
};

type DemoToastEntry = DemoToast & { id: number };

let nextDemoToastId = 0;

function useDemoToasts() {
  const [toasts, setToasts] = useState<DemoToastEntry[]>([]);
  const pushToast = useCallback((toast: DemoToast) => {
    const entry = { ...toast, id: ++nextDemoToastId };
    setToasts((current) => [...current, entry].slice(-5));
  }, []);
  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  return { toasts, pushToast, dismissToast };
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: DemoToastEntry;
  onDismiss: () => void;
}) {
  const [remaining, setRemaining] = useState(100);
  const dismissRef = useRef(onDismiss);
  dismissRef.current = onDismiss;

  useEffect(() => {
    const startedAt = Date.now();
    setRemaining(100);
    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      setRemaining(Math.max(0, 100 - (elapsed / 4500) * 100));
    }, 100);
    const timeout = window.setTimeout(() => dismissRef.current(), 4500);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [toast]);

  return (
    <UI.Toast
      title={`${toast.tone.toUpperCase()} · ${toast.title}`}
      description={
        <>
          <span className="block">{toast.description}</span>
          <UI.Progress
            aria-label="Time remaining before notification closes"
            value={remaining}
            className="mt-3 h-1.5"
          />
        </>
      }
      role={toast.tone === "info" ? "status" : "alert"}
      onDismiss={onDismiss}
      className={cn(
        "border-2 bg-card/95 shadow-lg backdrop-blur-xl",
        toast.tone === "info" && "border-primary",
        toast.tone === "warning" && "border-signal-yellow",
        toast.tone === "error" && "border-alert-coral",
      )}
    />
  );
}

function ToastRegion({
  toasts,
  onDismiss,
}: {
  toasts: DemoToastEntry[];
  onDismiss: (id: number) => void;
}) {
  if (toasts.length === 0) return null;
  return (
    <div
      aria-label="Resource notifications"
      className="fixed bottom-5 right-5 z-[70] flex w-[calc(100%-2.5rem)] max-w-sm flex-col gap-3"
    >
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={() => onDismiss(toast.id)}
        />
      ))}
    </div>
  );
}

function ShowcaseOverlayAction({
  kind = "dialog",
  title,
  description,
  trigger,
  confirmLabel = "Continue",
  children,
  onConfirm,
}: {
  kind?: "dialog" | "drawer";
  title: string;
  description: string;
  trigger: ReactElement<React.ComponentProps<"button">>;
  confirmLabel?: string;
  children?: ReactNode;
  onConfirm?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const Root = kind === "drawer" ? UI.Drawer : UI.Dialog;
  const Content = kind === "drawer" ? UI.DrawerContent : UI.DialogContent;
  const Header = kind === "drawer" ? UI.DrawerHeader : UI.DialogHeader;
  const Title = kind === "drawer" ? UI.DrawerTitle : UI.DialogTitle;
  const Description =
    kind === "drawer" ? UI.DrawerDescription : UI.DialogDescription;
  const Footer = kind === "drawer" ? UI.DrawerFooter : UI.DialogFooter;

  return (
    <Root open={open} onOpenChange={setOpen}>
      {cloneElement(trigger, { onClick: () => setOpen(true) })}
      <Content>
        <Header>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Header>
        {children}
        <Footer>
          <UI.Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </UI.Button>
          <UI.Button
            type="button"
            onClick={() => {
              onConfirm?.();
              setOpen(false);
            }}
          >
            {confirmLabel}
          </UI.Button>
        </Footer>
      </Content>
    </Root>
  );
}

function CreateOverlay({
  type,
  trigger,
  onComplete,
}: {
  type: "resource" | "virtual-machine" | "workload";
  trigger: ReactElement<React.ComponentProps<"button">>;
  onComplete?: () => void;
}) {
  const copy = {
    resource: {
      title: "Create cloud resource",
      description:
        "Choose the resource family and region for this fictional environment.",
      name: "production-resource",
      label: "Resource type",
      value: "Virtual machine",
    },
    "virtual-machine": {
      title: "Create virtual machine",
      description:
        "Configure a fictional machine before reviewing its monthly estimate.",
      name: "atlas-prod-03",
      label: "Machine image",
      value: "Ubuntu 24.04 LTS",
    },
    workload: {
      title: "Deploy container workload",
      description:
        "Define an image and replica target for the static platform-production namespace.",
      name: "new-service",
      label: "Container image",
      value: "ghcr.io/axiom/service:1.0.0",
    },
  }[type];

  return (
    <ShowcaseOverlayAction
      kind="drawer"
      title={copy.title}
      description={copy.description}
      trigger={trigger}
      confirmLabel="Review configuration"
      onConfirm={onComplete}
    >
      <div className="space-y-5 border-y py-5">
        <UI.FormField label="Name" id={`${type}-name`}>
          <UI.Input id={`${type}-name`} defaultValue={copy.name} />
        </UI.FormField>
        <UI.FormField label={copy.label} id={`${type}-kind`}>
          <UI.Input id={`${type}-kind`} defaultValue={copy.value} />
        </UI.FormField>
        <UI.FormField label="Region" id={`${type}-region`}>
          <UI.Input id={`${type}-region`} defaultValue="fra-1" />
        </UI.FormField>
      </div>
    </ShowcaseOverlayAction>
  );
}

function FeedbackAction({
  trigger,
  toast,
  onComplete,
}: {
  trigger: ReactElement<React.ComponentProps<"button">>;
  toast: DemoToast;
  onComplete: (toast: DemoToast) => void;
}) {
  return cloneElement(trigger, { onClick: () => onComplete(toast) });
}

function ResourceActionDialog({
  resource,
  action,
  description,
  tone,
  trigger,
  slider,
  onComplete,
}: {
  resource: string;
  action: string;
  description: string;
  tone: DemoToast["tone"];
  trigger: ReactElement<React.ComponentProps<"button">>;
  slider?: { min: number; max: number; initial: number };
  onComplete: (toast: DemoToast) => void;
}) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [value, setValue] = useState(slider?.initial ?? 0);
  const presentParticiple =
    {
      Stop: "Stopping",
      Rebuild: "Rebuilding",
      Delete: "Deleting",
      Restart: "Restarting",
      Scale: "Scaling",
    }[action] ?? `${action}ing`;

  function runAction() {
    setPending(true);
    window.setTimeout(() => {
      const sliderDescription = slider ? ` Desired replicas: ${value}.` : "";
      onComplete({
        tone,
        title: `${action} request for ${resource}`,
        description:
          tone === "error"
            ? `The static environment rejected this ${action.toLowerCase()} request; no resource was changed.`
            : `The fictional control plane accepted the request.${sliderDescription}`,
      });
      setPending(false);
      setOpen(false);
    }, 650);
  }

  return (
    <UI.Dialog open={open} onOpenChange={setOpen}>
      {cloneElement(trigger, { onClick: () => setOpen(true) })}
      <UI.DialogContent>
        <UI.DialogHeader>
          <UI.DialogTitle>
            {action} {resource}
          </UI.DialogTitle>
          <UI.DialogDescription>{description}</UI.DialogDescription>
        </UI.DialogHeader>
        <div className="border bg-muted/35 p-4">
          <p className="font-mono text-xs text-muted-foreground">RESOURCE</p>
          <p className="mt-1 font-semibold">{resource}</p>
          {slider && (
            <label className="mt-5 block text-sm font-medium">
              Desired replicas: <strong>{value}</strong>
              <UI.Slider
                aria-label={`${resource} desired replicas`}
                className="mt-3"
                min={slider.min}
                max={slider.max}
                value={value}
                onChange={(event) =>
                  setValue(Number(event.currentTarget.value))
                }
              />
            </label>
          )}
        </div>
        <UI.DialogFooter>
          <UI.DialogClose asChild>
            <UI.Button type="button" variant="outline" disabled={pending}>
              Cancel
            </UI.Button>
          </UI.DialogClose>
          <UI.Button
            type="button"
            variant={tone === "error" ? "destructive" : "default"}
            onClick={runAction}
            disabled={pending}
          >
            {pending ? (
              <>
                <UI.Spinner label={`${presentParticiple} ${resource}`} />
                {presentParticiple}…
              </>
            ) : (
              `${action} ${resource}`
            )}
          </UI.Button>
        </UI.DialogFooter>
      </UI.DialogContent>
    </UI.Dialog>
  );
}

type ChartPalette = {
  foreground: string;
  border: string;
  card: string;
  positive: string;
  negative: string;
  primary: string;
};

function readChartPalette(): ChartPalette {
  const styles = getComputedStyle(document.documentElement);
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const context = canvas.getContext("2d");
  const color = (name: string, fallback: string) => {
    const value = styles.getPropertyValue(name).trim() || fallback;
    if (!context) return fallback;
    context.clearRect(0, 0, 1, 1);
    context.fillStyle = value;
    context.fillRect(0, 0, 1, 1);
    const [red, green, blue, alpha] = context.getImageData(0, 0, 1, 1).data;
    return `rgba(${red}, ${green}, ${blue}, ${alpha / 255})`;
  };
  return {
    foreground: color("--foreground", "#181716"),
    border: color("--border", "#55514a"),
    card: color("--card", "#f7f3ea"),
    positive: color("--status-green", "#55b975"),
    negative: color("--alert-coral", "#ff6857"),
    primary: color("--primary", "#31afe4"),
  };
}

function EChart({
  label,
  buildOption,
  className,
}: {
  label: string;
  buildOption: (palette: ChartPalette) => EChartsCoreOption;
  className: string;
}) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = chartRef.current;
    if (!container) return;
    let chart: ReturnType<typeof init> | undefined;
    const renderWhenVisible = () => {
      if (container.clientWidth === 0 || container.clientHeight === 0) return;
      if (!chart) {
        chart = init(container, undefined, { renderer: "svg" });
        chart.setOption(buildOption(readChartPalette()));
      } else {
        chart.resize();
      }
    };
    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? undefined
        : new ResizeObserver(renderWhenVisible);
    resizeObserver?.observe(container);
    window.addEventListener("resize", renderWhenVisible);
    const frame = requestAnimationFrame(renderWhenVisible);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", renderWhenVisible);
      resizeObserver?.disconnect();
      chart?.dispose();
    };
  }, [buildOption]);

  return (
    <div
      ref={chartRef}
      role="img"
      aria-label={label}
      data-chart-library="echarts"
      className={className}
    />
  );
}

function MiniChart({
  positive = true,
  label = "Usage over the last 30 days",
}: {
  positive?: boolean;
  label?: string;
}) {
  const values = positive
    ? [18, 32, 27, 51, 44, 68, 61, 84, 78]
    : [79, 67, 72, 53, 60, 39, 45, 22, 30];
  return (
    <EChart
      label={label}
      className="h-40 w-full border bg-muted/35"
      buildOption={(palette) => ({
        animation: false,
        aria: { enabled: true, decal: { show: true } },
        grid: { left: 12, right: 12, top: 14, bottom: 14 },
        tooltip: { trigger: "axis" },
        xAxis: { type: "category", show: false, data: values.map((_, i) => i) },
        yAxis: { type: "value", show: false, min: 0, max: 100 },
        series: [
          {
            type: "line",
            data: values,
            showSymbol: false,
            smooth: 0.2,
            lineStyle: {
              color: positive ? palette.positive : palette.negative,
              width: 4,
            },
            areaStyle: {
              color: positive ? palette.positive : palette.negative,
              opacity: 0.12,
            },
          },
        ],
      })}
    />
  );
}

type PieSegment = {
  label: string;
  value: number;
  color: string;
};

function PieChart({
  label,
  segments,
  compact = false,
}: {
  label: string;
  segments: PieSegment[];
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid items-center gap-5",
        compact ? "sm:grid-cols-[11rem_1fr]" : "sm:grid-cols-[14rem_1fr]",
      )}
    >
      <EChart
        label={label}
        className={cn(
          "mx-auto aspect-square w-full border bg-muted/35",
          compact ? "max-w-44" : "max-w-56",
        )}
        buildOption={(palette) => ({
          animation: false,
          aria: { enabled: true, decal: { show: true } },
          tooltip: {
            trigger: "item",
            valueFormatter: (value: unknown) => `${String(value)}%`,
          },
          graphic: [
            {
              type: "text",
              left: "center",
              top: "43%",
              style: {
                text: "TOTAL\n100%",
                fill: palette.foreground,
                font: "700 12px monospace",
                textAlign: "center",
                lineHeight: 17,
              },
            },
          ],
          series: [
            {
              type: "pie",
              radius: ["36%", "76%"],
              center: ["50%", "50%"],
              label: { show: false },
              emphasis: { disabled: true, scale: false },
              itemStyle: { borderColor: palette.foreground, borderWidth: 2 },
              data: segments.map((segment) => ({
                name: segment.label,
                value: segment.value,
                itemStyle: { color: segment.color },
              })),
            },
          ],
        })}
      />
      <ul className="space-y-2 text-sm" aria-label={`${label} legend`}>
        {segments.map((segment) => (
          <li
            key={segment.label}
            className="grid grid-cols-[1rem_1fr_auto] items-center gap-2 border-b pb-2"
          >
            <span
              aria-hidden="true"
              className="size-3 border border-foreground"
              style={{ backgroundColor: segment.color }}
            />
            <span>{segment.label}</span>
            <strong className="font-mono">{segment.value}%</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

const marketCandles = [
  [176.2, 177.7, 175.4, 177.1, 42],
  [177.1, 178.4, 176.5, 176.8, 31],
  [176.8, 179.2, 176.1, 178.7, 55],
  [178.7, 180.1, 177.9, 179.6, 48],
  [179.6, 180.0, 177.4, 178.2, 62],
  [178.2, 181.4, 177.8, 180.8, 73],
  [180.8, 182.3, 180.1, 181.7, 54],
  [181.7, 182.1, 179.8, 180.4, 46],
  [180.4, 183.2, 180.0, 182.8, 68],
  [182.8, 184.6, 182.2, 184.1, 81],
  [184.1, 184.8, 182.7, 183.3, 52],
  [183.3, 185.7, 182.9, 185.1, 77],
  [185.1, 186.1, 184.0, 184.4, 59],
  [184.4, 185.0, 182.5, 183.1, 66],
  [183.1, 184.9, 182.7, 184.5, 45],
  [184.5, 185.4, 183.8, 184.9, 38],
  [184.9, 185.2, 183.9, 184.2, 33],
  [184.2, 185.0, 183.7, 184.62, 41],
] as const;

function CandlestickChart({ symbol = "NOVA" }: { symbol?: string }) {
  const times = [
    "13:30",
    "13:45",
    "14:00",
    "14:15",
    "14:30",
    "14:45",
    "15:00",
    "15:15",
    "15:30",
    "15:45",
    "16:00",
    "16:15",
    "16:30",
    "16:45",
    "17:00",
    "17:15",
    "17:30",
    "17:45",
  ];
  return (
    <>
      <EChart
        label={`${symbol} candlestick chart`}
        className="h-80 w-full border bg-muted/35"
        buildOption={(palette) => ({
          animation: false,
          aria: { enabled: true, decal: { show: true } },
          tooltip: { trigger: "axis", axisPointer: { type: "cross" } },
          axisPointer: { link: [{ xAxisIndex: "all" }] },
          grid: [
            { left: 58, right: 62, top: 18, height: "62%" },
            { left: 58, right: 62, top: "76%", height: "15%" },
          ],
          xAxis: [
            {
              type: "category",
              data: times,
              boundaryGap: true,
              axisLine: { lineStyle: { color: palette.foreground } },
              axisLabel: { color: palette.foreground, interval: 3 },
              splitLine: { show: true, lineStyle: { color: palette.border } },
            },
            {
              type: "category",
              gridIndex: 1,
              data: times,
              boundaryGap: true,
              axisLine: { lineStyle: { color: palette.foreground } },
              axisLabel: { show: false },
            },
          ],
          yAxis: [
            {
              scale: true,
              position: "right",
              min: 172,
              max: 188,
              axisLabel: {
                color: palette.foreground,
                formatter: (value: number) => `$${value.toFixed(0)}`,
              },
              splitLine: { lineStyle: { color: palette.border } },
            },
            {
              scale: true,
              gridIndex: 1,
              position: "right",
              axisLabel: { show: false },
              splitLine: { show: false },
            },
          ],
          series: [
            {
              name: `${symbol} OHLC`,
              type: "candlestick",
              data: marketCandles.map(([open, high, low, close]) => [
                open,
                close,
                low,
                high,
              ]),
              itemStyle: {
                color: palette.positive,
                color0: palette.negative,
                borderColor: palette.positive,
                borderColor0: palette.negative,
              },
            },
            {
              name: "Volume",
              type: "bar",
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: marketCandles.map(([open, , , close, volume]) => ({
                value: volume,
                itemStyle: {
                  color: close >= open ? palette.positive : palette.negative,
                },
              })),
            },
          ],
        })}
      />
      <p id={`${symbol.toLowerCase()}-chart-summary`} className="sr-only">
        Interactive chart with eighteen 15-minute {symbol} open, high, low, and
        close candles plus volume. The deterministic fictional fixture rises
        from approximately 176 dollars to 184.62 dollars.
      </p>
    </>
  );
}

export function ShowcaseIndex() {
  return (
    <UI.Stack gap="8" className="py-10 sm:py-16">
      <UI.Stack gap="4" className="max-w-4xl">
        <UI.Text className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
          Product showcase / 01—09
        </UI.Text>
        <UI.Heading level={1} className="text-5xl sm:text-7xl">
          One system. Nine product contexts.
        </UI.Heading>
        <UI.Text tone="muted" className="max-w-3xl text-lg">
          A static, multi-page proof that Codex Mortis can carry public
          storytelling, dense infrastructure operations, administration, and
          financial data without losing its identity.
        </UI.Text>
      </UI.Stack>
      <FictionalNotice />
      <ul
        aria-label="Showcase demos"
        className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        {demoCards.map(([context, title, description, href, Icon], index) => (
          <li key={href}>
            <AppLink href={href} className="group block h-full">
              <UI.Card className="h-full transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-lg">
                <UI.CardHeader>
                  <div className="mb-5 flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center border border-foreground bg-signal-yellow text-secondary-foreground shadow-sm">
                      <Icon className="size-5" />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>
                  <UI.Text className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                    {context}
                  </UI.Text>
                  <UI.CardTitle className="text-2xl">{title}</UI.CardTitle>
                  <UI.CardDescription>{description}</UI.CardDescription>
                </UI.CardHeader>
                <UI.CardFooter className="mt-auto justify-between border-t pt-4 text-sm font-semibold">
                  Open demo <ChevronRight className="size-4" />
                </UI.CardFooter>
              </UI.Card>
            </AppLink>
          </li>
        ))}
      </ul>
    </UI.Stack>
  );
}

function PublicShell({
  dark,
  onThemeChange,
  children,
}: {
  dark: boolean;
  onThemeChange: () => void;
  children: ReactNode;
}) {
  return (
    <UI.Page className="min-h-screen bg-transparent">
      <UI.SkipLink href="#showcase-content">
        Skip to showcase content
      </UI.SkipLink>
      <ShowcaseBar dark={dark} onThemeChange={onThemeChange} />
      {children}
    </UI.Page>
  );
}

function LandingPage({
  dark,
  onThemeChange,
}: {
  dark: boolean;
  onThemeChange: () => void;
}) {
  return (
    <PublicShell dark={dark} onThemeChange={onThemeChange}>
      <header className="border-b bg-card">
        <UI.Container
          size="full"
          className="flex min-h-16 items-center justify-between gap-6 px-5"
        >
          <AppLink
            href="/showcase/landing/"
            className="flex items-center gap-3 font-semibold"
          >
            <span className="flex size-9 items-center justify-center border border-foreground bg-primary text-primary-foreground shadow-sm">
              <Cloud />
            </span>
            Axiom Cloud
          </AppLink>
          <nav
            aria-label="Axiom public"
            className="hidden items-center gap-6 md:flex"
          >
            {["Platform", "Solutions", "Pricing", "Developers"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </nav>
          <UI.Stack direction="horizontal" gap="2">
            <UI.Button asChild variant="ghost" size="sm">
              <AppLink href="/showcase/login/">Sign in</AppLink>
            </UI.Button>
            <UI.Button asChild size="sm">
              <AppLink href="/showcase/login/">Start building</AppLink>
            </UI.Button>
          </UI.Stack>
        </UI.Container>
      </header>
      <UI.Main id="showcase-content" tabIndex={-1}>
        <section className="border-b py-16 sm:py-24">
          <UI.Container
            size="full"
            className="grid items-center gap-12 px-5 lg:grid-cols-[1.1fr_.9fr]"
          >
            <div>
              <UI.Badge className="mb-6 border-foreground bg-status-green text-secondary-foreground">
                All systems operational
              </UI.Badge>
              <UI.Heading
                level={1}
                className="max-w-4xl text-6xl leading-[.9] sm:text-8xl"
              >
                Infrastructure without the fog.
              </UI.Heading>
              <UI.Text tone="muted" className="mt-7 max-w-2xl text-lg">
                Compute, containers, and networks with explicit controls,
                predictable pricing, and enough operational detail to make
                confident decisions.
              </UI.Text>
              <UI.Stack
                direction="horizontal"
                gap="3"
                className="mt-8 flex-wrap"
              >
                <CreateOverlay
                  type="virtual-machine"
                  trigger={
                    <UI.Button size="lg">
                      Deploy in 60 seconds <ArrowUpRight />
                    </UI.Button>
                  }
                />
                <ShowcaseOverlayAction
                  title="Axiom Cloud architecture"
                  description="Inspect the fictional request path represented by this product landing page."
                  confirmLabel="Understood"
                  trigger={
                    <UI.Button variant="outline" size="lg">
                      Read the architecture
                    </UI.Button>
                  }
                >
                  <div className="grid gap-3 border-y py-5 sm:grid-cols-3">
                    {[
                      ["01", "Edge", "TLS termination and traffic policy"],
                      ["02", "Control plane", "Desired state and identity"],
                      ["03", "Runtime", "Regional compute and containers"],
                    ].map(([step, title, detail]) => (
                      <div key={step} className="border p-4">
                        <span className="font-mono text-xs text-primary">
                          {step}
                        </span>
                        <p className="mt-4 font-semibold">{title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </ShowcaseOverlayAction>
              </UI.Stack>
            </div>
            <div className="border border-foreground bg-signal-yellow p-5 text-secondary-foreground shadow-xl">
              <div className="mb-4 flex items-center justify-between border-b border-foreground pb-3 font-mono text-xs">
                <span>PRODUCTION / FRA-1</span>
                <span>LIVE</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Compute", "42 VMs", Server],
                  ["Containers", "186 pods", ContainerIcon],
                  ["Networks", "7 VPCs", Network],
                  ["Storage", "18.4 TB", Database],
                ].map(([label, value, Icon]) => (
                  <div
                    key={String(label)}
                    className="border border-foreground bg-background p-4 text-foreground shadow-sm"
                  >
                    <Icon className="mb-6 size-5 text-primary" />
                    <p className="text-sm text-muted-foreground">
                      {label as string}
                    </p>
                    <p className="mt-1 text-2xl font-semibold">
                      {value as string}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </UI.Container>
        </section>
        <section id="platform" className="py-16">
          <UI.Container size="full" className="px-5">
            <UI.Heading level={2} className="mb-8 text-4xl">
              One control plane. Four foundations.
            </UI.Heading>
            <UI.Grid columns={4} gap="4">
              {[
                [
                  "Compute",
                  "Dedicated and shared CPU with transparent generations.",
                  Cpu,
                ],
                [
                  "Containers",
                  "Managed workloads with visible rollout state.",
                  Box,
                ],
                [
                  "Networking",
                  "Private networks, firewalls, and load balancing.",
                  Network,
                ],
                [
                  "Observability",
                  "Metrics, events, and logs without tool sprawl.",
                  Activity,
                ],
              ].map(([title, text, Icon]) => (
                <SectionCard key={String(title)} title={title as string}>
                  <Icon className="mb-6 size-7 text-primary" />
                  <UI.Text tone="muted">{text as string}</UI.Text>
                </SectionCard>
              ))}
            </UI.Grid>
          </UI.Container>
        </section>
        <section id="pricing" className="border-y bg-card py-16">
          <UI.Container size="full" className="px-5">
            <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
              <div>
                <UI.Text className="font-mono text-xs uppercase tracking-wider text-primary">
                  Predictable by design
                </UI.Text>
                <UI.Heading level={2} className="mt-3 text-4xl">
                  From commit to healthy deployment.
                </UI.Heading>
              </div>
              <ol className="grid gap-4 sm:grid-cols-3">
                {[
                  ["01", "Connect", "Bring a repository or container image."],
                  [
                    "02",
                    "Configure",
                    "Choose region, resources, and policies.",
                  ],
                  ["03", "Observe", "Follow rollout health and real usage."],
                ].map(([number, title, text]) => (
                  <li
                    key={number}
                    className="border border-foreground bg-background p-5 shadow-sm"
                  >
                    <span className="font-mono text-xs text-primary">
                      {number}
                    </span>
                    <h3 className="mt-8 text-xl font-semibold">{title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </UI.Container>
        </section>
      </UI.Main>
    </PublicShell>
  );
}

function LoginPage({
  dark,
  onThemeChange,
}: {
  dark: boolean;
  onThemeChange: () => void;
}) {
  return (
    <PublicShell dark={dark} onThemeChange={onThemeChange}>
      <UI.Main
        id="showcase-content"
        tabIndex={-1}
        className="grid min-h-[calc(100vh-3rem)] lg:grid-cols-2"
      >
        <section className="hidden border-r border-foreground bg-primary p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
          <div className="flex items-center gap-3 text-xl font-semibold">
            <span className="border border-current p-2">
              <Cloud />
            </span>
            Axiom Cloud
          </div>
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[.18em]">
              Secure control plane
            </p>
            <UI.Heading level={1} className="mt-5 text-6xl">
              Operate infrastructure with complete context.
            </UI.Heading>
            <p className="mt-6 text-lg opacity-80">
              Every deployment, policy, invoice, and incident in one explicit
              workspace.
            </p>
          </div>
          <div className="flex items-center gap-3 border border-current p-4">
            <Check className="size-5" />
            <span>All identity services operational</span>
          </div>
        </section>
        <section className="flex items-center justify-center p-5 sm:p-10">
          <div className="w-full max-w-md">
            <UI.Card className="shadow-xl">
              <UI.CardHeader>
                <UI.Text className="font-mono text-xs uppercase tracking-wider text-primary">
                  Northstar Labs
                </UI.Text>
                <UI.CardTitle className="text-3xl">
                  Sign in to Axiom
                </UI.CardTitle>
                <UI.CardDescription>
                  Use your organization identity to continue.
                </UI.CardDescription>
              </UI.CardHeader>
              <UI.CardContent>
                <form
                  onSubmit={(event) => event.preventDefault()}
                  className="space-y-5"
                >
                  <UI.FormField label="Work email" id="login-email">
                    <UI.Input
                      id="login-email"
                      type="email"
                      placeholder="you@company.com"
                      autoComplete="email"
                    />
                  </UI.FormField>
                  <UI.FormField label="Password" id="login-password">
                    <UI.Input
                      id="login-password"
                      type="password"
                      autoComplete="current-password"
                    />
                  </UI.FormField>
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2">
                      <UI.Checkbox aria-label="Remember this device" /> Remember
                      this device
                    </label>
                    <a href="#recovery" className="font-medium text-primary">
                      Forgot password?
                    </a>
                  </div>
                  <ShowcaseOverlayAction
                    title="Sign-in unavailable"
                    description="This static showcase has no identity provider or user accounts. No credentials were submitted."
                    confirmLabel="Return to sign in"
                    trigger={
                      <UI.Button type="submit" className="w-full">
                        Sign in <ArrowUpRight />
                      </UI.Button>
                    }
                  >
                    <UI.Alert className="border-alert-coral">
                      <AlertTriangle />
                      <UI.AlertTitle>Authentication is disabled</UI.AlertTitle>
                      <UI.AlertDescription>
                        Connect a real identity provider in a production
                        application.
                      </UI.AlertDescription>
                    </UI.Alert>
                  </ShowcaseOverlayAction>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="h-px flex-1 bg-border" />
                    OR CONTINUE WITH
                    <span className="h-px flex-1 bg-border" />
                  </div>
                  <ShowcaseOverlayAction
                    title="Organization SSO unavailable"
                    description="Northstar Labs is fictional, so there is no configured OIDC identity provider."
                    confirmLabel="Close"
                    trigger={
                      <UI.Button
                        type="button"
                        variant="outline"
                        className="w-full"
                      >
                        <ShieldCheck /> Organization SSO
                      </UI.Button>
                    }
                  >
                    <UI.Alert>
                      <AlertTriangle />
                      <UI.AlertTitle>No SSO connection</UI.AlertTitle>
                      <UI.AlertDescription>
                        This action intentionally stops before leaving the
                        showcase.
                      </UI.AlertDescription>
                    </UI.Alert>
                  </ShowcaseOverlayAction>
                </form>
              </UI.CardContent>
              <UI.CardFooter className="border-t text-sm text-muted-foreground">
                New to Axiom?{" "}
                <a href="#create" className="ml-1 font-medium text-primary">
                  Create an account
                </a>
              </UI.CardFooter>
            </UI.Card>
          </div>
        </section>
      </UI.Main>
    </PublicShell>
  );
}

function DashboardPage(props: {
  id: string;
  dark: boolean;
  onThemeChange: () => void;
}) {
  const [range, setRange] = useState("30 days");
  return (
    <ConsoleShell
      {...props}
      eyebrow="Account overview"
      title="Operations dashboard"
      action={
        <CreateOverlay
          type="resource"
          trigger={
            <UI.Button>
              <Plus /> Create resource
            </UI.Button>
          }
        />
      }
    >
      <MetricGrid
        items={[
          ["Monthly spend", "$18,420", "+8.2% against June"],
          ["Running workloads", "228", "42 VMs · 186 pods"],
          [
            "Active incidents",
            "2",
            "One requires attention",
            "border-alert-coral",
          ],
          ["Quota utilization", "68%", "Compute across all regions"],
        ]}
      />
      <UI.Grid columns={2} gap="6">
        <SectionCard
          title="Usage trend"
          description="Combined compute and container utilization"
          action={
            <UI.Button
              variant="ghost"
              size="sm"
              aria-label={`Usage range: ${range}. Change range`}
              onClick={() =>
                setRange((current) =>
                  current === "30 days"
                    ? "90 days"
                    : current === "90 days"
                      ? "1 year"
                      : "30 days",
                )
              }
            >
              {range}
            </UI.Button>
          }
        >
          <MiniChart label={`Usage over ${range}`} />
          <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">CPU average</p>
              <p className="font-semibold">61%</p>
            </div>
            <div>
              <p className="text-muted-foreground">Memory average</p>
              <p className="font-semibold">72%</p>
            </div>
            <div>
              <p className="text-muted-foreground">Egress</p>
              <p className="font-semibold">8.4 TB</p>
            </div>
          </div>
        </SectionCard>
        <SectionCard
          title="Regional health"
          description="Live service status by operating region"
        >
          <SimpleTable
            caption="Regional service health"
            headers={["Region", "Compute", "Containers", "Latency"]}
            rows={[
              [
                "fra-1",
                <Status key="fra-compute">Healthy</Status>,
                <Status key="fra-containers">Healthy</Status>,
                "12 ms",
              ],
              [
                "hel-1",
                <Status key="hel-compute">Maintenance</Status>,
                <Status key="hel-containers">Healthy</Status>,
                "18 ms",
              ],
              [
                "lhr-1",
                <Status key="lhr-compute">Healthy</Status>,
                <Status key="lhr-containers">Degraded</Status>,
                "24 ms",
              ],
            ]}
          />
        </SectionCard>
        <SectionCard
          title="Recent deployments"
          description="Last activity in platform-production"
          className="lg:col-span-2"
        >
          <SimpleTable
            caption="Recent deployment activity"
            headers={["Service", "Version", "Owner", "State", "Time"]}
            rows={[
              [
                "api-gateway",
                "2.8.4",
                "M. Urbanek",
                <Status key="api-health">Healthy</Status>,
                "8 min",
              ],
              [
                "event-worker",
                "7.1.0",
                "CI Release",
                <Status key="worker-health">Progressing</Status>,
                "14 min",
              ],
              [
                "search-index",
                "1.4.2",
                "A. Singh",
                <Status key="search-health">Degraded</Status>,
                "32 min",
              ],
            ]}
          />
        </SectionCard>
      </UI.Grid>
    </ConsoleShell>
  );
}

function CloudPage(props: {
  id: string;
  dark: boolean;
  onThemeChange: () => void;
}) {
  const resources = [
    ["Virtual machines", "42", Server],
    ["Container workloads", "31", ContainerIcon],
    ["Volumes", "68", Database],
    ["Private networks", "7", Network],
    ["Load balancers", "12", Layers3],
    ["Public addresses", "28", Globe2],
  ] as const;
  return (
    <ConsoleShell
      {...props}
      eyebrow="Infrastructure / Production"
      title="Cloud console"
      action={
        <CreateOverlay
          type="resource"
          trigger={
            <UI.Button>
              <Plus /> Create resource
            </UI.Button>
          }
        />
      }
    >
      <MetricGrid
        items={[
          ["Regions", "3", "FRA · HEL · LHR"],
          ["Resources", "188", "Across six resource types"],
          [
            "Open notices",
            "3",
            "One maintenance window",
            "border-signal-yellow",
          ],
          ["Availability", "99.98%", "Last 30 days", "border-status-green"],
        ]}
      />
      <UI.Grid columns={3} gap="6">
        <SectionCard
          title="Resource inventory"
          description="Production resources by type"
          className="lg:col-span-2"
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map(([label, count, Icon]) => (
              <div key={label} className="border bg-muted/30 p-4">
                <Icon className="size-5 text-primary" />
                <p className="mt-5 text-3xl font-semibold">{count}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Capacity" description="Regional quota consumption">
          <div className="space-y-6">
            {[
              ["Compute cores", 68],
              ["Block storage", 54],
              ["Public addresses", 82],
              ["Load balancers", 35],
            ].map(([label, value]) => (
              <div key={String(label)}>
                <div className="mb-2 flex justify-between text-sm">
                  <span>{label}</span>
                  <span>{value}%</span>
                </div>
                <UI.Progress
                  aria-label={`${label} quota`}
                  value={Number(value)}
                  className={
                    Number(value) > 80
                      ? "[&::-webkit-progress-value]:bg-signal-yellow"
                      : ""
                  }
                />
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard
          title="Infrastructure topology"
          description="Simplified production traffic flow"
          className="lg:col-span-2"
        >
          <div className="grid items-center gap-3 text-center sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <div className="border bg-signal-yellow/20 p-5">
              <Globe2 className="mx-auto mb-3" />
              Public edge
              <br />
              <strong>2 endpoints</strong>
            </div>
            <ChevronRight className="mx-auto rotate-90 sm:rotate-0" />
            <div className="border bg-primary/10 p-5">
              <Layers3 className="mx-auto mb-3" />
              Load balancers
              <br />
              <strong>12 active</strong>
            </div>
            <ChevronRight className="mx-auto rotate-90 sm:rotate-0" />
            <div className="border bg-status-green/15 p-5">
              <Server className="mx-auto mb-3" />
              Workloads
              <br />
              <strong>73 services</strong>
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Maintenance" description="Upcoming platform work">
          <UI.Alert>
            <AlertTriangle />
            <UI.AlertTitle>HEL-1 compute maintenance</UI.AlertTitle>
            <UI.AlertDescription>
              July 25, 01:00–03:00 UTC. Live migration is enabled for 6 affected
              VMs.
            </UI.AlertDescription>
          </UI.Alert>
          <ShowcaseOverlayAction
            title="Affected HEL-1 resources"
            description="Six fictional machines are eligible for live migration during the maintenance window."
            confirmLabel="Acknowledge maintenance"
            trigger={
              <UI.Button variant="outline" className="mt-4 w-full">
                Review affected resources
              </UI.Button>
            }
          >
            <SimpleTable
              caption="Resources affected by HEL-1 maintenance"
              headers={["Resource", "Current state", "Migration"]}
              rows={[
                ["metrics-01", "Maintenance", "Scheduled"],
                ["metrics-02", "Running", "Eligible"],
                ["telemetry-03", "Running", "Eligible"],
              ]}
            />
          </ShowcaseOverlayAction>
        </SectionCard>
      </UI.Grid>
    </ConsoleShell>
  );
}

function MachineFleetAccordion({
  onToast,
}: {
  onToast: (toast: DemoToast) => void;
}) {
  return (
    <UI.Accordion
      defaultOpen={[vmRows[0][0]]}
      items={vmRows.map(
        ([name, region, image, capacity, publicIp, state, estimate]) => ({
          id: name,
          title: (
            <span className="grid flex-1 items-center gap-2 sm:grid-cols-[1fr_1fr_auto]">
              <span>
                <span className="block font-mono">{name}</span>
                <span className="block text-xs font-normal text-muted-foreground">
                  {region} · {image}
                </span>
              </span>
              <span className="hidden text-sm font-normal text-muted-foreground sm:block">
                {capacity} · {publicIp}
              </span>
              <Status>{state}</Status>
            </span>
          ),
          content: (
            <div className="space-y-5 text-foreground">
              <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
                <div>
                  <MiniChart label={`${name} CPU utilization`} />
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {[
                      ["Capacity", capacity],
                      ["Public IP", publicIp],
                      ["Estimate", `${estimate} / month`],
                    ].map(([label, value]) => (
                      <div key={label} className="border p-3">
                        <p className="text-xs text-muted-foreground">{label}</p>
                        <p className="mt-1 font-medium">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border bg-muted/30 p-4">
                  <h3 className="font-semibold">Machine configuration</h3>
                  <dl className="mt-4 grid gap-3 text-sm">
                    <div>
                      <dt className="text-muted-foreground">Image</dt>
                      <dd>{image}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Network</dt>
                      <dd>production-vpc · web-production</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Backups</dt>
                      <dd>Daily · 14 retained</dd>
                    </div>
                  </dl>
                  <ShowcaseOverlayAction
                    kind="drawer"
                    title={`Edit ${name}`}
                    description="Review effective machine settings before applying a fictional configuration change."
                    trigger={
                      <UI.Button variant="outline" className="mt-4 w-full">
                        Edit {name}
                      </UI.Button>
                    }
                    confirmLabel="Save configuration"
                    onConfirm={() =>
                      onToast({
                        tone: "info",
                        title: `${name} configuration saved`,
                        description:
                          "The static showcase recorded the fictional configuration update.",
                      })
                    }
                  >
                    <div className="space-y-4 border-y py-5">
                      <UI.FormField label="Machine image" id={`${name}-image`}>
                        <UI.Input id={`${name}-image`} defaultValue={image} />
                      </UI.FormField>
                      <UI.FormField label="Capacity" id={`${name}-capacity`}>
                        <UI.Input
                          id={`${name}-capacity`}
                          defaultValue={capacity}
                        />
                      </UI.FormField>
                    </div>
                  </ShowcaseOverlayAction>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 border-t pt-4">
                <ResourceActionDialog
                  resource={name}
                  action="Stop"
                  description={`Stop ${name} and interrupt its traffic. Attached storage remains available.`}
                  tone="warning"
                  onComplete={onToast}
                  trigger={
                    <UI.Button variant="outline">
                      <X /> Stop {name}
                    </UI.Button>
                  }
                />
                <ResourceActionDialog
                  resource={name}
                  action="Rebuild"
                  description={`Reinstall ${image} on ${name}. Local disk changes will be discarded.`}
                  tone="info"
                  onComplete={onToast}
                  trigger={
                    <UI.Button variant="outline">
                      <RefreshCw /> Rebuild {name}
                    </UI.Button>
                  }
                />
                <ResourceActionDialog
                  resource={name}
                  action="Delete"
                  description={`Permanently remove ${name}. The static showcase will reject the final request.`}
                  tone="error"
                  onComplete={onToast}
                  trigger={
                    <UI.Button variant="destructive">
                      <Trash2 /> Delete {name}
                    </UI.Button>
                  }
                />
              </div>
            </div>
          ),
        }),
      )}
    />
  );
}

function WorkloadAccordion({
  onToast,
}: {
  onToast: (toast: DemoToast) => void;
}) {
  return (
    <UI.Accordion
      defaultOpen={[workloadRows[0][0]]}
      items={workloadRows.map(
        ([name, image, replicas, rollout, cpu, memory, restarts]) => ({
          id: name,
          title: (
            <span className="grid flex-1 items-center gap-2 sm:grid-cols-[1fr_1fr_auto]">
              <span>
                <span className="block font-mono">{name}</span>
                <span className="block truncate text-xs font-normal text-muted-foreground">
                  {image}
                </span>
              </span>
              <span className="hidden text-sm font-normal text-muted-foreground sm:block">
                {replicas} replicas · CPU {cpu}
              </span>
              <Status>{rollout}</Status>
            </span>
          ),
          content: (
            <div className="space-y-5 text-foreground">
              <div className="grid gap-3 sm:grid-cols-4">
                {[
                  ["Replicas", replicas],
                  ["CPU", cpu],
                  ["Memory", memory],
                  ["Restarts", restarts],
                ].map(([label, value]) => (
                  <div key={label} className="border p-3">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="mt-1 font-semibold">{value}</p>
                  </div>
                ))}
              </div>
              <UI.Progress
                aria-label={`${name} rollout progress`}
                value={
                  rollout === "Healthy"
                    ? 100
                    : rollout === "Progressing"
                      ? 92
                      : 67
                }
              />
              <div className="flex flex-wrap gap-3 border-t pt-4">
                <ResourceActionDialog
                  resource={name}
                  action="Restart"
                  description={`Restart ${name} one replica at a time while preserving availability.`}
                  tone="warning"
                  onComplete={onToast}
                  trigger={
                    <UI.Button variant="outline" size="sm">
                      <RefreshCw /> Restart {name}
                    </UI.Button>
                  }
                />
                <ResourceActionDialog
                  resource={name}
                  action="Scale"
                  description={`Choose a desired replica count for ${name}.`}
                  tone="info"
                  slider={{
                    min: 1,
                    max: 24,
                    initial: Number(replicas.split(" ")[0]),
                  }}
                  onComplete={onToast}
                  trigger={
                    <UI.Button variant="outline" size="sm">
                      Scale {name}
                    </UI.Button>
                  }
                />
                <FeedbackAction
                  onComplete={onToast}
                  toast={{
                    tone: "info",
                    title: `${name} logs exported`,
                    description:
                      "A fictional log bundle was prepared for this showcase workload.",
                  }}
                  trigger={
                    <UI.Button variant="ghost" size="sm">
                      <Download /> Export {name} logs
                    </UI.Button>
                  }
                />
              </div>
            </div>
          ),
        }),
      )}
    />
  );
}

function VirtualMachinesPage(props: {
  id: string;
  dark: boolean;
  onThemeChange: () => void;
}) {
  const { toasts, pushToast, dismissToast } = useDemoToasts();
  return (
    <>
      <ConsoleShell
        {...props}
        eyebrow="Compute / Fleet"
        title="Virtual machines"
        action={
          <CreateOverlay
            type="virtual-machine"
            trigger={
              <UI.Button>
                <Plus /> Create VM
              </UI.Button>
            }
          />
        }
      >
        <MetricGrid
          items={[
            ["Running", "39", "Across three regions", "border-status-green"],
            ["Stopped", "2", "Billing for storage only"],
            [
              "Maintenance",
              "1",
              "Live migration scheduled",
              "border-signal-yellow",
            ],
            ["Monthly estimate", "$3,844", "Compute and attached storage"],
          ]}
        />
        <SectionCard
          title="Compute fleet"
          description="Expand a machine to inspect its configuration and available operations."
          action={
            <FeedbackAction
              onComplete={pushToast}
              toast={{
                tone: "info",
                title: "Fleet refreshed",
                description:
                  "Fictional machine status was refreshed from the local fixture.",
              }}
              trigger={
                <UI.Button variant="outline" size="sm">
                  <RefreshCw /> Refresh
                </UI.Button>
              }
            />
          }
        >
          <MachineFleetAccordion onToast={pushToast} />
        </SectionCard>
      </ConsoleShell>
      <ToastRegion toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}

function ContainersPage(props: {
  id: string;
  dark: boolean;
  onThemeChange: () => void;
}) {
  const { toasts, pushToast, dismissToast } = useDemoToasts();
  return (
    <>
      <ConsoleShell
        {...props}
        eyebrow="Containers / platform-prod"
        title="Container workloads"
        action={
          <CreateOverlay
            type="workload"
            trigger={
              <UI.Button>
                <Plus /> Deploy workload
              </UI.Button>
            }
          />
        }
      >
        <MetricGrid
          items={[
            ["Healthy", "27", "87% of workloads", "border-status-green"],
            ["Progressing", "2", "Active rollouts", "border-signal-yellow"],
            ["Degraded", "1", "search-index", "border-alert-coral"],
            ["Running pods", "186", "11 nodes"],
          ]}
        />
        <SectionCard
          title="Workloads"
          description="Expand a workload to inspect rollout health and available operations."
        >
          <WorkloadAccordion onToast={pushToast} />
        </SectionCard>
      </ConsoleShell>
      <ToastRegion toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}

function BillingPage(props: {
  id: string;
  dark: boolean;
  onThemeChange: () => void;
}) {
  const { toasts, pushToast, dismissToast } = useDemoToasts();
  return (
    <>
      <ConsoleShell
        {...props}
        eyebrow="Finance / July 2026"
        title="Billing and usage"
        action={
          <FeedbackAction
            onComplete={pushToast}
            toast={{
              tone: "info",
              title: "Usage export prepared",
              description:
                "A fictional July usage CSV is ready for this static showcase.",
            }}
            trigger={
              <UI.Button variant="outline">
                <Download /> Export usage
              </UI.Button>
            }
          />
        }
      >
        <MetricGrid
          items={[
            ["Current spend", "$18,420", "July 1–22"],
            ["Forecast", "$25,880", "+6.4% against June"],
            ["Budget", "72%", "$36,000 monthly limit", "border-signal-yellow"],
            [
              "Savings",
              "$4,218",
              "Committed use this month",
              "border-status-green",
            ],
          ]}
        />
        <UI.Grid columns={2} gap="6">
          <SectionCard
            title="Cost trend"
            description="Daily gross usage after credits"
          >
            <MiniChart label="Cloud cost over the current month" />
            <div className="mt-4 flex justify-between text-sm">
              <span className="text-muted-foreground">Average daily cost</span>
              <strong>$837.28</strong>
            </div>
          </SectionCard>
          <SectionCard
            title="Budget threshold"
            description="$25,920 of $36,000 forecast"
          >
            <UI.Progress
              aria-label="Monthly budget forecast"
              value={72}
              className="h-5 [&::-webkit-progress-value]:bg-signal-yellow"
            />
            <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
              {[
                ["50%", "Notice"],
                ["80%", "Owners"],
                ["100%", "Escalate"],
              ].map(([value, label]) => (
                <div key={value} className="border p-3">
                  <strong>{value}</strong>
                  <p className="text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
            <UI.Alert className="mt-5">
              <AlertTriangle />
              <UI.AlertTitle>Forecast increased 6.4%</UI.AlertTitle>
              <UI.AlertDescription>
                Compute growth in platform-production accounts for most of the
                change.
              </UI.AlertDescription>
            </UI.Alert>
          </SectionCard>
          <SectionCard
            title="Usage by service"
            description="Current month before credits"
          >
            <PieChart
              label="Cloud spend by service pie chart"
              segments={[
                { label: "Compute", value: 64, color: "var(--utility-blue)" },
                {
                  label: "Containers",
                  value: 18,
                  color: "var(--signal-yellow)",
                },
                { label: "Storage", value: 11, color: "var(--play-lavender)" },
                { label: "Network", value: 7, color: "var(--status-green)" },
              ]}
            />
            <div className="mt-6">
              <SimpleTable
                caption="Cloud service charges"
                headers={["Service", "Usage", "Cost", "Change"]}
                rows={[
                  ["Compute", "91,402 vCPU hours", "$11,804", "+8.8%"],
                  ["Containers", "133,920 pod hours", "$3,402", "+4.2%"],
                  ["Storage", "18.4 TB month", "$1,944", "+1.1%"],
                  ["Network", "8.4 TB egress", "$1,270", "−2.3%"],
                ]}
              />
            </div>
          </SectionCard>
          <SectionCard
            title="Invoices"
            description="Northstar Labs · EUR billing"
          >
            <SimpleTable
              caption="Invoice history"
              headers={["Invoice", "Period", "Total", "State"]}
              rows={invoices.map((row) =>
                row.map((cell, index) =>
                  index === 3 ? <Status key={cell}>{cell}</Status> : cell,
                ),
              )}
            />
            <ShowcaseOverlayAction
              kind="drawer"
              title="Update payment method"
              description="Payment collection is disabled; these fictional details remain in the browser."
              confirmLabel="Save payment method"
              onConfirm={() =>
                pushToast({
                  tone: "warning",
                  title: "Payment method not submitted",
                  description:
                    "The static showcase cannot contact a payment provider.",
                })
              }
              trigger={
                <UI.Button variant="outline" className="mt-4">
                  <CreditCard /> Update payment method
                </UI.Button>
              }
            >
              <div className="space-y-4 border-y py-5">
                <UI.FormField label="Cardholder" id="billing-cardholder">
                  <UI.Input
                    id="billing-cardholder"
                    defaultValue="Northstar Labs"
                  />
                </UI.FormField>
                <UI.FormField label="Billing email" id="billing-email">
                  <UI.Input
                    id="billing-email"
                    defaultValue="finance@northstar.example"
                  />
                </UI.FormField>
              </div>
            </ShowcaseOverlayAction>
          </SectionCard>
        </UI.Grid>
      </ConsoleShell>
      <ToastRegion toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}

function SettingsPage(props: {
  id: string;
  dark: boolean;
  onThemeChange: () => void;
}) {
  const { toasts, pushToast, dismissToast } = useDemoToasts();
  return (
    <>
      <ConsoleShell
        {...props}
        eyebrow="Organization / Administration"
        title="Organization settings"
        action={
          <FeedbackAction
            onComplete={pushToast}
            toast={{
              tone: "info",
              title: "Organization settings saved",
              description:
                "The local showcase state now reflects the edited settings.",
            }}
            trigger={<UI.Button>Save changes</UI.Button>}
          />
        }
      >
        <UI.Grid columns={3} gap="6">
          <nav
            aria-label="Settings sections"
            className="h-fit border bg-card p-3 shadow-sm"
          >
            <ul className="space-y-1">
              {[
                "General",
                "Members and roles",
                "Authentication",
                "API tokens",
                "Notifications",
                "Audit log",
                "Danger zone",
              ].map((item, index) => (
                <li key={item}>
                  <a
                    href={`#settings-${index}`}
                    className={cn(
                      "block border px-3 py-2 text-sm",
                      index === 0
                        ? "border-foreground bg-signal-yellow text-secondary-foreground"
                        : "border-transparent hover:border-foreground hover:bg-muted",
                    )}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-6 lg:col-span-2">
            <SectionCard
              title="General"
              description="Organization identity and defaults"
            >
              <form
                className="grid gap-5 sm:grid-cols-2"
                onSubmit={(event) => event.preventDefault()}
              >
                <UI.FormField label="Organization name" id="org-name">
                  <UI.Input id="org-name" defaultValue="Northstar Labs" />
                </UI.FormField>
                <UI.FormField label="Organization slug" id="org-slug">
                  <UI.Input id="org-slug" defaultValue="northstar-labs" />
                </UI.FormField>
                <UI.FormField label="Support contact" id="support-contact">
                  <UI.Input
                    id="support-contact"
                    type="email"
                    defaultValue="platform@northstar.example"
                  />
                </UI.FormField>
                <UI.FormField label="Default region" id="default-region">
                  <UI.Input id="default-region" defaultValue="fra-1" />
                </UI.FormField>
              </form>
            </SectionCard>
            <SectionCard
              title="Members and roles"
              description="12 active members · 3 pending invitations"
              action={
                <ShowcaseOverlayAction
                  kind="drawer"
                  title="Invite organization member"
                  description="Compose a fictional invitation and choose the initial role."
                  confirmLabel="Send invitation"
                  onConfirm={() =>
                    pushToast({
                      tone: "info",
                      title: "Invitation prepared",
                      description:
                        "No email was sent from this static showcase.",
                    })
                  }
                  trigger={
                    <UI.Button variant="outline" size="sm">
                      <Users /> Invite member
                    </UI.Button>
                  }
                >
                  <div className="space-y-4 border-y py-5">
                    <UI.FormField label="Member email" id="invite-email">
                      <UI.Input
                        id="invite-email"
                        placeholder="member@example.com"
                      />
                    </UI.FormField>
                    <UI.FormField label="Initial role" id="invite-role">
                      <UI.Input id="invite-role" defaultValue="Developer" />
                    </UI.FormField>
                  </div>
                </ShowcaseOverlayAction>
              }
            >
              <SimpleTable
                caption="Organization members"
                headers={["Member", "Role", "MFA", "Last active"]}
                rows={[
                  [
                    "Mateusz Urbanek",
                    "Owner",
                    <Status key="mateusz-mfa">Healthy</Status>,
                    "Now",
                  ],
                  [
                    "Asha Singh",
                    "Administrator",
                    <Status key="asha-mfa">Healthy</Status>,
                    "18 min",
                  ],
                  ["Release automation", "Service account", "Token", "6 min"],
                ]}
              />
            </SectionCard>
            <SectionCard
              title="Authentication policy"
              description="Controls that apply to every interactive member"
            >
              <div className="divide-y border">
                {[
                  [
                    "Require multi-factor authentication",
                    "All interactive accounts must enroll a second factor.",
                    true,
                  ],
                  [
                    "Enforce organization SSO",
                    "Use the configured OIDC identity provider.",
                    true,
                  ],
                  [
                    "Allow password sign-in",
                    "Keep password access available as a recovery path.",
                    false,
                  ],
                ].map(([label, description, checked]) => (
                  <div
                    key={String(label)}
                    className="flex items-center justify-between gap-5 p-4"
                  >
                    <div>
                      <p className="font-medium">{label as string}</p>
                      <p className="text-sm text-muted-foreground">
                        {description as string}
                      </p>
                    </div>
                    <UI.Switch
                      aria-label={label as string}
                      defaultChecked={checked as boolean}
                    />
                  </div>
                ))}
              </div>
            </SectionCard>
            <SectionCard
              title="Danger zone"
              description="Deleting an organization permanently removes access to all resources."
              className="border-destructive"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-medium">Delete Northstar Labs</p>
                  <p className="text-sm text-muted-foreground">
                    Export invoices and audit records before continuing.
                  </p>
                </div>
                <ResourceActionDialog
                  resource="Northstar Labs"
                  action="Delete"
                  description="Permanently delete the organization and all fictional resources. This static showcase will reject the request."
                  tone="error"
                  onComplete={pushToast}
                  trigger={
                    <UI.Button variant="destructive">
                      <Trash2 /> Delete organization
                    </UI.Button>
                  }
                />
              </div>
            </SectionCard>
          </div>
        </UI.Grid>
      </ConsoleShell>
      <ToastRegion toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}

function MarketsPage({
  dark,
  onThemeChange,
}: {
  dark: boolean;
  onThemeChange: () => void;
}) {
  const [selectedSymbol, setSelectedSymbol] = useState("NOVA");
  const [selectedRange, setSelectedRange] = useState("1D");
  const [orderSide, setOrderSide] = useState<"Buy" | "Sell">("Buy");
  const { toasts, pushToast, dismissToast } = useDemoToasts();
  const selectedMarket =
    marketRows.find(([symbol]) => symbol === selectedSymbol) ?? marketRows[0];
  const [, selectedName, selectedPrice, selectedMove] = selectedMarket;

  return (
    <>
      <UI.Page className="min-h-screen bg-transparent">
        <UI.SkipLink href="#showcase-content">
          Skip to market workspace
        </UI.SkipLink>
        <ShowcaseBar dark={dark} onThemeChange={onThemeChange} />
        <header className="flex min-h-14 items-center justify-between gap-4 border-b bg-card px-4">
          <div className="flex items-center gap-3 font-semibold">
            <span className="border border-foreground bg-primary p-2 text-primary-foreground shadow-sm">
              <TrendingUp className="size-4" />
            </span>
            Vector Markets
          </div>
          <div className="hidden font-mono text-xs text-muted-foreground sm:block">
            MARKET OPEN · CLOSES 17:30 CET
          </div>
          <ShowcaseOverlayAction
            kind="drawer"
            title="Paper portfolio"
            description="Review the fictional holdings and available cash in this static account."
            confirmLabel="Done"
            trigger={
              <UI.Button size="sm">
                <WalletCards /> Portfolio
              </UI.Button>
            }
          >
            <SimpleTable
              caption="Paper portfolio summary"
              headers={["Holding", "Market value", "Return"]}
              rows={[
                ["NOVA", "$33,231.60", "+30.75%"],
                ["ORBT", "$22,784.00", "+4.03%"],
                ["AXIS", "$43,647.80", "+4.59%"],
                ["Cash", "$18,204.18", "—"],
              ]}
            />
          </ShowcaseOverlayAction>
        </header>
        <UI.Main id="showcase-content" tabIndex={-1} className="p-3 lg:p-4">
          <div className="grid gap-4 xl:grid-cols-[15rem_minmax(0,1fr)_20rem]">
            <SectionCard
              title="Watchlist"
              description="Core holdings"
              className="h-fit"
            >
              <div className="space-y-1">
                {marketRows.map(([symbol, name, price, move]) => (
                  <button
                    key={symbol}
                    type="button"
                    aria-pressed={symbol === selectedSymbol}
                    onClick={() => setSelectedSymbol(symbol)}
                    className={cn(
                      "grid w-full grid-cols-[1fr_auto] border p-3 text-left hover:border-foreground hover:bg-muted",
                      symbol === selectedSymbol &&
                        "border-foreground bg-signal-yellow/25 shadow-sm",
                    )}
                  >
                    <span>
                      <strong className="font-mono">{symbol}</strong>
                      <span className="block truncate text-xs text-muted-foreground">
                        {name}
                      </span>
                    </span>
                    <span className="text-right text-sm">
                      <strong>{price}</strong>
                      <span
                        className={cn(
                          "block text-xs",
                          move.startsWith("+")
                            ? "text-status-green"
                            : "text-alert-coral",
                        )}
                      >
                        {move}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </SectionCard>
            <div className="min-w-0 space-y-4">
              <SectionCard
                title={selectedSymbol}
                description={`${selectedName} · Fictional instrument · XNYS`}
                action={
                  <div className="text-right">
                    <p className="text-3xl font-semibold">{selectedPrice}</p>
                    <p
                      className={cn(
                        "font-mono text-sm",
                        selectedMove.startsWith("+")
                          ? "text-status-green"
                          : "text-alert-coral",
                      )}
                    >
                      {selectedMove}
                    </p>
                  </div>
                }
              >
                <UI.Heading level={1} className="sr-only">
                  {selectedSymbol}
                </UI.Heading>
                <div className="mb-4 flex flex-wrap gap-2">
                  {["1D", "5D", "1M", "6M", "YTD", "1Y"].map((range) => (
                    <UI.Button
                      key={range}
                      variant={range === selectedRange ? "default" : "outline"}
                      size="sm"
                      aria-pressed={range === selectedRange}
                      onClick={() => setSelectedRange(range)}
                    >
                      {range}
                    </UI.Button>
                  ))}
                </div>
                <CandlestickChart symbol={selectedSymbol} />
                <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {[
                    ["Open", "$176.42"],
                    ["High", "$186.11"],
                    ["Low", "$174.98"],
                    ["Volume", "8.42M"],
                    ["Mkt cap", "$42.8B"],
                    ["P/E", "31.4"],
                  ].map(([label, value]) => (
                    <div key={label} className="border p-3 text-sm">
                      <p className="text-muted-foreground">{label}</p>
                      <p className="font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              </SectionCard>
              <UI.Grid columns={2} gap="4">
                <SectionCard
                  title="Market depth"
                  description="Level II · delayed 15 minutes"
                >
                  <SimpleTable
                    caption="NOVA bid and ask depth"
                    headers={["Bid", "Size", "Ask", "Size"]}
                    rows={[
                      ["184.58", "1,240", "184.64", "980"],
                      ["184.54", "2,180", "184.68", "1,620"],
                      ["184.50", "3,440", "184.72", "2,240"],
                    ]}
                    firstColumnHeader={false}
                  />
                </SectionCard>
                <SectionCard
                  title="Recent trades"
                  description="Consolidated tape"
                >
                  <SimpleTable
                    caption="NOVA recent trades"
                    headers={["Time", "Price", "Size"]}
                    rows={[
                      ["14:42:18", "$184.62", "420"],
                      ["14:42:17", "$184.60", "180"],
                      ["14:42:14", "$184.58", "2,100"],
                      ["14:42:11", "$184.61", "640"],
                    ]}
                  />
                </SectionCard>
              </UI.Grid>
              <SectionCard
                title="Portfolio positions"
                description="Fictional paper account · $124,882 total"
              >
                <PieChart
                  compact
                  label="Portfolio allocation pie chart"
                  segments={[
                    { label: "NOVA", value: 32, color: "var(--utility-blue)" },
                    { label: "ORBT", value: 22, color: "var(--status-green)" },
                    { label: "AXIS", value: 36, color: "var(--play-lavender)" },
                    { label: "Cash", value: 10, color: "var(--signal-yellow)" },
                  ]}
                />
                <div className="mt-6">
                  <SimpleTable
                    caption="Paper portfolio positions"
                    headers={[
                      "Symbol",
                      "Quantity",
                      "Average",
                      "Market value",
                      "Return",
                    ]}
                    rows={[
                      ["NOVA", "180", "$141.20", "$33,231.60", "+30.75%"],
                      ["ORBT", "320", "$68.44", "$22,784.00", "+4.03%"],
                      ["AXIS", "140", "$298.10", "$43,647.80", "+4.59%"],
                    ]}
                  />
                </div>
              </SectionCard>
            </div>
            <div className="space-y-4">
              <SectionCard
                title="Order ticket"
                description={`${selectedSymbol} · paper account`}
              >
                <div className="grid grid-cols-2 gap-2">
                  <UI.Button
                    aria-pressed={orderSide === "Buy"}
                    variant={orderSide === "Buy" ? "default" : "outline"}
                    className={cn(
                      orderSide === "Buy" &&
                        "bg-status-green text-secondary-foreground",
                    )}
                    onClick={() => setOrderSide("Buy")}
                  >
                    Buy
                  </UI.Button>
                  <UI.Button
                    aria-pressed={orderSide === "Sell"}
                    variant={orderSide === "Sell" ? "destructive" : "outline"}
                    onClick={() => setOrderSide("Sell")}
                  >
                    Sell
                  </UI.Button>
                </div>
                <form
                  className="mt-5 space-y-4"
                  onSubmit={(event) => event.preventDefault()}
                >
                  <UI.FormField label="Order type" id="order-type">
                    <UI.Input id="order-type" defaultValue="Limit" />
                  </UI.FormField>
                  <UI.FormField label="Quantity" id="order-quantity">
                    <UI.Input
                      id="order-quantity"
                      type="number"
                      defaultValue="25"
                    />
                  </UI.FormField>
                  <UI.FormField label="Limit price" id="limit-price">
                    <UI.Input id="limit-price" defaultValue="$184.50" />
                  </UI.FormField>
                  <div className="border-y py-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Estimated value
                      </span>
                      <strong>$4,612.50</strong>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <span className="text-muted-foreground">
                        Available cash
                      </span>
                      <span>$18,204.18</span>
                    </div>
                  </div>
                  <ShowcaseOverlayAction
                    title={`Review ${orderSide.toLowerCase()} order`}
                    description={`${orderSide} 25 ${selectedSymbol} at a fictional limit price of $184.50.`}
                    confirmLabel="Submit paper order"
                    onConfirm={() =>
                      pushToast({
                        tone: "warning",
                        title: "Paper order not transmitted",
                        description:
                          "No brokerage is connected and no transaction occurred.",
                      })
                    }
                    trigger={
                      <UI.Button type="submit" className="w-full">
                        <Check /> Review order
                      </UI.Button>
                    }
                  >
                    <UI.Alert className="border-signal-yellow">
                      <AlertTriangle />
                      <UI.AlertTitle>
                        Static paper-trading preview
                      </UI.AlertTitle>
                      <UI.AlertDescription>
                        Confirming only demonstrates feedback and never places
                        an order.
                      </UI.AlertDescription>
                    </UI.Alert>
                  </ShowcaseOverlayAction>
                </form>
              </SectionCard>
            </div>
          </div>
        </UI.Main>
      </UI.Page>
      <ToastRegion toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}

export function ShowcasePage({
  id,
  dark,
  onThemeChange,
}: {
  id: string;
  dark: boolean;
  onThemeChange: () => void;
}) {
  const common = { id, dark, onThemeChange };
  switch (id) {
    case "showcase-landing":
      return <LandingPage dark={dark} onThemeChange={onThemeChange} />;
    case "showcase-login":
      return <LoginPage dark={dark} onThemeChange={onThemeChange} />;
    case "showcase-dashboard":
      return <DashboardPage {...common} />;
    case "showcase-cloud":
      return <CloudPage {...common} />;
    case "showcase-virtual-machines":
      return <VirtualMachinesPage {...common} />;
    case "showcase-containers":
      return <ContainersPage {...common} />;
    case "showcase-billing":
      return <BillingPage {...common} />;
    case "showcase-settings":
      return <SettingsPage {...common} />;
    case "showcase-markets":
      return <MarketsPage dark={dark} onThemeChange={onThemeChange} />;
    default:
      return <ShowcaseIndex />;
  }
}
