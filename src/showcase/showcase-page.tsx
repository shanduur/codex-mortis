import type { ReactNode } from "react";
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

function FictionalNotice({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "border border-foreground bg-signal-yellow/20 px-4 py-3 font-mono text-xs",
        compact && "py-2",
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
              <div className="mt-10">
                <FictionalNotice />
              </div>
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

function MiniChart({
  positive = true,
  label = "Usage over the last 30 days",
}: {
  positive?: boolean;
  label?: string;
}) {
  const points = positive
    ? "0,82 45,67 90,73 135,44 180,52 225,24 270,31 315,12 360,18"
    : "0,21 45,33 90,28 135,47 180,40 225,61 270,55 315,78 360,70";
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 360 100"
      className="h-40 w-full border bg-muted/35 p-4"
      preserveAspectRatio="none"
    >
      <path
        d="M0 25H360M0 50H360M0 75H360"
        stroke="currentColor"
        strokeOpacity=".12"
      />
      <polyline
        points={points}
        fill="none"
        stroke={positive ? "var(--status-green)" : "var(--alert-coral)"}
        strokeWidth="4"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

type PieSegment = {
  label: string;
  value: number;
  color: string;
};

function pointOnCircle(angle: number, radius: number) {
  const radians = ((angle - 90) * Math.PI) / 180;
  return {
    x: 100 + radius * Math.cos(radians),
    y: 100 + radius * Math.sin(radians),
  };
}

function pieSlicePath(start: number, end: number) {
  const startPoint = pointOnCircle(start, 82);
  const endPoint = pointOnCircle(end, 82);
  const largeArc = end - start > 180 ? 1 : 0;
  return `M 100 100 L ${startPoint.x} ${startPoint.y} A 82 82 0 ${largeArc} 1 ${endPoint.x} ${endPoint.y} Z`;
}

function PieChart({
  label,
  segments,
  compact = false,
}: {
  label: string;
  segments: PieSegment[];
  compact?: boolean;
}) {
  let cursor = 0;
  return (
    <div
      className={cn(
        "grid items-center gap-5",
        compact ? "sm:grid-cols-[11rem_1fr]" : "sm:grid-cols-[14rem_1fr]",
      )}
    >
      <svg
        role="img"
        aria-label={label}
        viewBox="0 0 200 200"
        className={cn(
          "mx-auto aspect-square w-full border bg-muted/35 p-3",
          compact ? "max-w-44" : "max-w-56",
        )}
      >
        <title>{label}</title>
        <desc>
          {segments
            .map(({ label: name, value }) => `${name} ${value}%`)
            .join(", ")}
        </desc>
        {segments.map((segment) => {
          const start = cursor * 3.6;
          cursor += segment.value;
          const end = cursor * 3.6;
          return (
            <path
              key={segment.label}
              d={pieSlicePath(start, end)}
              fill={segment.color}
              stroke="var(--foreground)"
              strokeWidth="2"
            />
          );
        })}
        <circle
          cx="100"
          cy="100"
          r="31"
          fill="var(--card)"
          stroke="var(--foreground)"
          strokeWidth="2"
        />
        <text
          x="100"
          y="96"
          textAnchor="middle"
          fill="currentColor"
          fontSize="11"
          fontFamily="var(--font-mono)"
        >
          TOTAL
        </text>
        <text
          x="100"
          y="113"
          textAnchor="middle"
          fill="currentColor"
          fontSize="14"
          fontWeight="700"
        >
          100%
        </text>
      </svg>
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

function CandlestickChart() {
  const chartTop = 20;
  const chartBottom = 222;
  const volumeTop = 247;
  const volumeBottom = 292;
  const minPrice = 174;
  const maxPrice = 188;
  const xStep = 37;
  const xStart = 73;
  const candleWidth = 17;
  const y = (price: number) =>
    chartTop +
    ((maxPrice - price) / (maxPrice - minPrice)) * (chartBottom - chartTop);
  const maxVolume = Math.max(...marketCandles.map((candle) => candle[4]));
  const gridPrices = [188, 184.5, 181, 177.5, 174];

  return (
    <svg
      role="img"
      aria-label="NOVA candlestick chart"
      viewBox="0 0 780 320"
      className="h-auto min-h-64 w-full border bg-muted/35"
    >
      <title>NOVA candlestick chart</title>
      <desc>
        Eighteen intraday open, high, low, and close candles with volume. NOVA
        rises from approximately 176 dollars to 184.62 dollars.
      </desc>
      {gridPrices.map((price) => (
        <g key={price}>
          <line
            x1="56"
            x2="750"
            y1={y(price)}
            y2={y(price)}
            stroke="currentColor"
            strokeOpacity=".14"
          />
          <text
            x="49"
            y={y(price) + 4}
            textAnchor="end"
            fill="currentColor"
            opacity=".68"
            fontSize="10"
            fontFamily="var(--font-mono)"
          >
            {price.toFixed(price % 1 ? 1 : 0)}
          </text>
        </g>
      ))}
      <line
        x1="56"
        x2="750"
        y1="235"
        y2="235"
        stroke="currentColor"
        strokeOpacity=".35"
      />
      {marketCandles.map(([open, high, low, close, volume], index) => {
        const x = xStart + index * xStep;
        const positive = close >= open;
        const color = positive ? "var(--status-green)" : "var(--alert-coral)";
        const bodyTop = y(Math.max(open, close));
        const bodyHeight = Math.max(3, Math.abs(y(open) - y(close)));
        const volumeHeight = (volume / maxVolume) * (volumeBottom - volumeTop);
        return (
          <g key={`${open}-${index}`}>
            <line
              x1={x}
              x2={x}
              y1={y(high)}
              y2={y(low)}
              stroke={color}
              strokeWidth="2"
            />
            <rect
              x={x - candleWidth / 2}
              y={bodyTop}
              width={candleWidth}
              height={bodyHeight}
              fill={positive ? color : "var(--card)"}
              stroke={color}
              strokeWidth="2"
            />
            <rect
              x={x - candleWidth / 2}
              y={volumeBottom - volumeHeight}
              width={candleWidth}
              height={volumeHeight}
              fill={color}
              opacity=".55"
            />
          </g>
        );
      })}
      {[
        [73, "09:30"],
        [258, "11:00"],
        [443, "12:30"],
        [628, "14:00"],
        [702, "14:45"],
      ].map(([x, time]) => (
        <text
          key={time}
          x={x}
          y="310"
          textAnchor="middle"
          fill="currentColor"
          opacity=".68"
          fontSize="10"
          fontFamily="var(--font-mono)"
        >
          {time}
        </text>
      ))}
      <text
        x="59"
        y="243"
        fill="currentColor"
        opacity=".68"
        fontSize="9"
        fontFamily="var(--font-mono)"
      >
        VOLUME
      </text>
    </svg>
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
                <UI.Button size="lg">
                  Deploy in 60 seconds <ArrowUpRight />
                </UI.Button>
                <UI.Button variant="outline" size="lg">
                  Read the architecture
                </UI.Button>
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
        <UI.Container size="full" className="px-5 py-10">
          <FictionalNotice />
        </UI.Container>
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
                  <UI.Button type="submit" className="w-full">
                    Sign in <ArrowUpRight />
                  </UI.Button>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="h-px flex-1 bg-border" />
                    OR CONTINUE WITH
                    <span className="h-px flex-1 bg-border" />
                  </div>
                  <UI.Button type="button" variant="outline" className="w-full">
                    <ShieldCheck /> Organization SSO
                  </UI.Button>
                </form>
              </UI.CardContent>
              <UI.CardFooter className="border-t text-sm text-muted-foreground">
                New to Axiom?{" "}
                <a href="#create" className="ml-1 font-medium text-primary">
                  Create an account
                </a>
              </UI.CardFooter>
            </UI.Card>
            <div className="mt-6">
              <FictionalNotice compact />
            </div>
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
  return (
    <ConsoleShell
      {...props}
      eyebrow="Account overview"
      title="Operations dashboard"
      action={
        <UI.Button>
          <Plus /> Create resource
        </UI.Button>
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
            <UI.Button variant="ghost" size="sm">
              30 days
            </UI.Button>
          }
        >
          <MiniChart />
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
        <UI.Button>
          <Plus /> Create resource
        </UI.Button>
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
          <UI.Button variant="outline" className="mt-4 w-full">
            Review affected resources
          </UI.Button>
        </SectionCard>
      </UI.Grid>
    </ConsoleShell>
  );
}

function VirtualMachinesPage(props: {
  id: string;
  dark: boolean;
  onThemeChange: () => void;
}) {
  return (
    <ConsoleShell
      {...props}
      eyebrow="Compute / Fleet"
      title="Virtual machines"
      action={
        <UI.Button>
          <Plus /> Create VM
        </UI.Button>
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
        description="Search, inspect, and operate virtual machines"
        action={
          <UI.Button variant="outline" size="sm">
            <RefreshCw /> Refresh
          </UI.Button>
        }
      >
        <SimpleTable
          caption="Virtual machine fleet"
          headers={[
            "Name",
            "Region",
            "Image",
            "vCPU / RAM",
            "Public IP",
            "State",
            "Estimate",
          ]}
          rows={vmRows.map((row) =>
            row.map((cell, index) =>
              index === 5 ? <Status key={cell}>{cell}</Status> : cell,
            ),
          )}
        />
      </SectionCard>
      <UI.Grid columns={3} gap="6" className="mt-6">
        <SectionCard
          title="atlas-prod-01"
          description="vm-7f1c · running in fra-1"
          className="lg:col-span-2"
          action={<Status>Running</Status>}
        >
          <MiniChart label="atlas-prod-01 CPU utilization" />
          <div className="mt-5 grid gap-4 sm:grid-cols-4">
            {[
              ["CPU", "58%"],
              ["Memory", "11.2 / 16 GB"],
              ["Disk", "84 / 160 GB"],
              ["Network", "214 Mbps"],
            ].map(([label, value]) => (
              <div key={label} className="border p-3">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="mt-1 font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard
          title="Machine configuration"
          description="Effective configuration"
        >
          <dl className="space-y-4 text-sm">
            {[
              ["Machine type", "Axiom C4"],
              ["Image", "Ubuntu 24.04 LTS"],
              ["Boot disk", "160 GB NVMe"],
              ["Network", "production-vpc"],
              ["Firewall", "web-production"],
              ["Backups", "Daily · 14 retained"],
            ].map(([term, value]) => (
              <div key={term} className="border-b pb-3">
                <dt className="text-muted-foreground">{term}</dt>
                <dd className="mt-1 font-medium">{value}</dd>
              </div>
            ))}
          </dl>
          <UI.Button variant="outline" className="mt-5 w-full">
            Edit configuration
          </UI.Button>
        </SectionCard>
      </UI.Grid>
      <SectionCard
        title="Danger zone"
        description="These operations can interrupt production traffic."
        className="mt-6 border-destructive"
        action={<AlertTriangle className="text-destructive" />}
      >
        <div className="flex flex-wrap gap-3">
          <UI.Button variant="outline">
            <X /> Stop VM
          </UI.Button>
          <UI.Button variant="outline">
            <RefreshCw /> Rebuild VM
          </UI.Button>
          <UI.Button variant="destructive">
            <Trash2 /> Delete VM
          </UI.Button>
        </div>
      </SectionCard>
    </ConsoleShell>
  );
}

function ContainersPage(props: {
  id: string;
  dark: boolean;
  onThemeChange: () => void;
}) {
  return (
    <ConsoleShell
      {...props}
      eyebrow="Containers / platform-prod"
      title="Container workloads"
      action={
        <UI.Button>
          <Plus /> Deploy workload
        </UI.Button>
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
        description="Namespace: platform-production"
      >
        <SimpleTable
          caption="Container workload health"
          headers={[
            "Workload",
            "Image",
            "Replicas",
            "Rollout",
            "CPU",
            "Memory",
            "Restarts",
          ]}
          rows={workloadRows.map((row) =>
            row.map((cell, index) =>
              index === 3 ? <Status key={cell}>{cell}</Status> : cell,
            ),
          )}
        />
      </SectionCard>
      <UI.Grid columns={2} gap="6" className="mt-6">
        <SectionCard
          title="api-gateway rollout"
          description="Revision 144 · ghcr.io/axiom/gateway:2.8.4"
          action={<Status>Healthy</Status>}
        >
          <div className="mb-5 flex items-center justify-between text-sm">
            <span>8 of 8 replicas available</span>
            <span className="font-mono">100%</span>
          </div>
          <UI.Progress aria-label="api-gateway rollout progress" value={100} />
          <ol className="mt-6 space-y-3">
            {[
              ["14:22:08", "Replica set reached desired availability."],
              ["14:21:42", "Traffic shifted to revision 144."],
              ["14:20:11", "Image pull completed on all nodes."],
            ].map(([time, text]) => (
              <li
                key={time}
                className="grid grid-cols-[5rem_1fr] border-l-4 border-status-green pl-3 text-sm"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {time}
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </SectionCard>
        <SectionCard
          title="Live logs"
          description="api-gateway-7ccf9 · last 60 seconds"
          action={
            <UI.Button variant="ghost" size="sm">
              <Download /> Export
            </UI.Button>
          }
        >
          <pre className="max-h-64 overflow-auto border bg-code p-4 font-mono text-xs leading-6 text-code-foreground">
            <code>{`20:42:11 INFO request completed status=200 latency=18ms\n20:42:12 INFO cache hit route=/v1/projects\n20:42:14 WARN upstream retry service=identity attempt=1\n20:42:14 INFO upstream recovered latency=92ms\n20:42:16 INFO request completed status=201 latency=44ms`}</code>
          </pre>
          <div className="mt-4 flex gap-3">
            <UI.Button variant="outline" size="sm">
              <RefreshCw /> Restart rollout
            </UI.Button>
            <UI.Button variant="outline" size="sm">
              Scale
            </UI.Button>
          </div>
        </SectionCard>
      </UI.Grid>
    </ConsoleShell>
  );
}

function BillingPage(props: {
  id: string;
  dark: boolean;
  onThemeChange: () => void;
}) {
  return (
    <ConsoleShell
      {...props}
      eyebrow="Finance / July 2026"
      title="Billing and usage"
      action={
        <UI.Button variant="outline">
          <Download /> Export usage
        </UI.Button>
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
              { label: "Containers", value: 18, color: "var(--signal-yellow)" },
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
          <UI.Button variant="outline" className="mt-4">
            <CreditCard /> Update payment method
          </UI.Button>
        </SectionCard>
      </UI.Grid>
    </ConsoleShell>
  );
}

function SettingsPage(props: {
  id: string;
  dark: boolean;
  onThemeChange: () => void;
}) {
  return (
    <ConsoleShell
      {...props}
      eyebrow="Organization / Administration"
      title="Organization settings"
      action={<UI.Button>Save changes</UI.Button>}
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
              <UI.Button variant="outline" size="sm">
                <Users /> Invite member
              </UI.Button>
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
              <UI.Button variant="destructive">
                <Trash2 /> Delete organization
              </UI.Button>
            </div>
          </SectionCard>
        </div>
      </UI.Grid>
    </ConsoleShell>
  );
}

function MarketsPage({
  dark,
  onThemeChange,
}: {
  dark: boolean;
  onThemeChange: () => void;
}) {
  return (
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
        <UI.Button size="sm">
          <WalletCards /> Portfolio
        </UI.Button>
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
                  className={cn(
                    "grid w-full grid-cols-[1fr_auto] border p-3 text-left hover:border-foreground hover:bg-muted",
                    symbol === "NOVA" &&
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
              title="NOVA"
              description="Nova Systems · Technology · XNYS"
              action={
                <div className="text-right">
                  <p className="text-3xl font-semibold">$184.62</p>
                  <p className="font-mono text-sm text-status-green">
                    +8.34 · +4.72%
                  </p>
                </div>
              }
            >
              <UI.Heading level={1} className="sr-only">
                NOVA
              </UI.Heading>
              <div className="mb-4 flex flex-wrap gap-2">
                {["1D", "5D", "1M", "6M", "YTD", "1Y"].map((range) => (
                  <UI.Button
                    key={range}
                    variant={range === "1D" ? "default" : "outline"}
                    size="sm"
                  >
                    {range}
                  </UI.Button>
                ))}
              </div>
              <CandlestickChart />
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
              description="NOVA · paper account"
            >
              <div className="grid grid-cols-2 gap-2">
                <UI.Button className="bg-status-green text-secondary-foreground">
                  Buy
                </UI.Button>
                <UI.Button variant="outline">Sell</UI.Button>
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
                <UI.Button type="submit" className="w-full">
                  <Check /> Review order
                </UI.Button>
              </form>
            </SectionCard>
            <FictionalNotice compact />
          </div>
        </div>
      </UI.Main>
    </UI.Page>
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
