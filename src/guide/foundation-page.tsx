import { ArrowRight, Check } from "lucide-react";

import * as UI from "@/components";
import { CodeBlock } from "./code-block";
import { PageHeader } from "./page-header";
import { guideHref } from "./paths";

const principles = [
  [
    "Show native evidence",
    "Prefer real interfaces, repositories, specifications, and physical detail over decorative technology metaphors.",
  ],
  [
    "Structure follows engineering",
    "Expose meaningful layers. Do not compress hardware, software, APIs, and community into one vague platform box.",
  ],
  [
    "Use space with confidence",
    "Create hierarchy with scale, alignment, and intentional emptiness before adding another card or divider.",
  ],
  [
    "Openness is behavior",
    "Make source, documentation, contribution paths, and system boundaries visible in the interface.",
  ],
  [
    "Motion reveals state",
    "Transitions should feel measured, mechanical, and useful—never bouncy or ornamental.",
  ],
];

const colors = [
  [
    "Paper",
    "--background",
    "bg-background",
    "Drafting canvas and default page background",
  ],
  [
    "Ink",
    "--foreground",
    "bg-foreground",
    "Primary text and high-contrast structure",
  ],
  [
    "Signal yellow",
    "--signal-yellow",
    "bg-signal-yellow",
    "Selected and high-attention moments",
  ],
  [
    "Utility blue",
    "--utility-blue",
    "bg-utility-blue",
    "Primary actions, active navigation, information, and links",
  ],
  [
    "Alert coral",
    "--alert-coral",
    "bg-alert-coral",
    "Warnings, destructive actions, and error states",
  ],
  [
    "Status green",
    "--status-green",
    "bg-status-green",
    "Success, operational, and healthy system states",
  ],
  [
    "Play lavender",
    "--play-lavender",
    "bg-play-lavender",
    "Rare expressive or experimental moments",
  ],
  [
    "Muted",
    "--muted",
    "bg-muted",
    "Subordinate surfaces, quiet fills, and disabled states",
  ],
];

function SectionHeading({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description: string;
}) {
  return (
    <UI.Grid
      columns={2}
      gap="8"
      className="items-end border-b pb-8 lg:grid-cols-[minmax(0,1fr)_24rem]"
    >
      <UI.Heading level={2} className="tracking-[-0.035em]">
        {title}
      </UI.Heading>
      <UI.Card className="gap-3 border-l-4 border-l-primary py-4 shadow-none">
        <UI.CardHeader className="px-4">
          <UI.Badge variant="outline" className="w-fit">
            {index}
          </UI.Badge>
        </UI.CardHeader>
        <UI.CardContent className="px-4">
          <UI.Text tone="muted">{description}</UI.Text>
        </UI.CardContent>
      </UI.Card>
    </UI.Grid>
  );
}

function IntroductionPage() {
  const productPaths = [
    {
      title: "Components",
      copy: "66 stable building blocks with live examples, usage guidance, accessibility notes, and source code.",
      href: "/components/",
    },
    {
      title: "UI patterns",
      copy: "Compose components into forms, navigation, loading, messaging, disclosure, onboarding, and resilient data experiences.",
      href: "/patterns/",
    },
    {
      title: "Content guidelines",
      copy: "Shared rules for voice, tone, labels, instructions, errors, and formatted data.",
      href: "/guidelines/",
    },
  ];
  const sharedPaths = [
    {
      title: "Foundations",
      copy: "Principles, tokens, color, typography, spacing, layout, iconography, motion, and elevation.",
      href: "/foundations/",
    },
    {
      title: "Accessibility",
      copy: "Keyboard, focus, screen-reader, contrast, and motion requirements built into planning and review.",
      href: "/accessibility/",
    },
    {
      title: "Contributing",
      copy: "Propose, design, implement, document, and release system changes.",
      href: "/contributing/",
    },
  ];
  return (
    <UI.Stack gap="12" className="pb-8">
      <UI.Grid
        role="region"
        aria-labelledby="introduction-title"
        className="grid items-center gap-8 border-b py-10 sm:py-14 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]"
      >
        <UI.Card className="gap-6 border-0 p-6 shadow-none">
          <UI.Heading
            id="introduction-title"
            level={1}
            className="text-4xl leading-[1.05] tracking-[-0.05em] sm:text-5xl 2xl:text-6xl"
          >
            Codex Mortis
          </UI.Heading>
          <UI.Text
            tone="muted"
            className="max-w-[38ch] text-lg leading-relaxed"
          >
            A living codex for technical interfaces. Square geometry, clear
            structure, and components you own.
          </UI.Text>
          <UI.Button asChild className="w-fit">
            <UI.Link href={guideHref("/components/")} className="no-underline">
              Explore components <ArrowRight />
            </UI.Link>
          </UI.Button>
        </UI.Card>
        <UI.Image
          src={guideHref("/codex-mortis.webp")}
          srcSet={`${guideHref("/codex-mortis-640.webp")} 640w, ${guideHref("/codex-mortis-960.webp")} 960w, ${guideHref("/codex-mortis.webp")} 1536w`}
          sizes="(min-width: 1536px) 580px, (min-width: 1280px) calc((100vw - 464px) * 0.535), (min-width: 1024px) calc(100vw - 400px), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
          fetchPriority="high"
          alt="The Codex Mortis brand plate"
          width={1536}
          height={1024}
          loading="eager"
          className="aspect-[3/2] w-full border border-foreground/20 bg-white p-3 object-contain"
        />
      </UI.Grid>
      <UI.Card
        role="region"
        aria-labelledby="postures-title"
        className="grid gap-8 border-0 p-6 shadow-none lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]"
      >
        <UI.Stack gap="4">
          <UI.Heading id="postures-title" level={2}>
            Editorial neubrutalism
          </UI.Heading>
          <UI.Text tone="muted" className="max-w-[45ch]">
            The interface should expose how the product works, not hide it
            behind generic futurism.
          </UI.Text>
        </UI.Stack>
        <UI.List className="ml-0 list-none gap-6 border-l-4 border-primary pl-6">
          {[
            [
              "Sharp, not softened",
              "Square corners, visible structure, and hard offset depth instead of polished softness.",
            ],
            [
              "Editorial, not templated",
              "Let content change the rhythm. Not every idea belongs in an equal card.",
            ],
            [
              "Colorful, not decorative",
              "Give every saturated color a stable role instead of scattering rainbow accents.",
            ],
          ].map(([title, copy]) => (
            <UI.ListItem key={title} className="grid gap-2">
              <UI.Text className="text-lg font-medium">{title}</UI.Text>
              <UI.Text
                tone="muted"
                className="max-w-[55ch] text-sm leading-relaxed"
              >
                {copy}
              </UI.Text>
            </UI.ListItem>
          ))}
        </UI.List>
      </UI.Card>
      <UI.Grid
        role="region"
        aria-labelledby="product-paths-title"
        className="grid gap-6 border-t pt-10"
      >
        <UI.Heading id="product-paths-title" level={2}>
          Build product UI
        </UI.Heading>
        <UI.Grid
          role="navigation"
          aria-labelledby="product-paths-title"
          className="grid gap-4 md:grid-cols-2"
        >
          {productPaths.map((item, index) => (
            <UI.Link
              key={item.title}
              href={guideHref(item.href)}
              className={`group grid content-start gap-4 border p-6 text-foreground no-underline transition-colors hover:bg-accent focus-visible:bg-accent ${index === 0 ? "bg-accent md:row-span-2 md:justify-between md:p-8" : "bg-card"}`}
            >
              <UI.Text
                as="span"
                className="flex items-center justify-between gap-4 text-xl font-medium"
              >
                {item.title}
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 shrink-0 transition-transform group-hover:translate-x-1"
                />
              </UI.Text>
              <UI.Text
                as="span"
                className="max-w-[45ch] text-sm leading-relaxed text-muted-foreground"
              >
                {item.copy}
              </UI.Text>
            </UI.Link>
          ))}
        </UI.Grid>
      </UI.Grid>
      <UI.Grid
        role="region"
        aria-labelledby="shared-foundations-title"
        className="grid gap-6 border-t pt-10"
      >
        <UI.Heading id="shared-foundations-title" level={2}>
          Shared foundations
        </UI.Heading>
        <UI.Card
          role="navigation"
          aria-labelledby="shared-foundations-title"
          className="gap-0 divide-y border-x-0 py-0 shadow-none"
        >
          {sharedPaths.map((item) => (
            <UI.Link
              key={item.title}
              href={guideHref(item.href)}
              className="grid items-start gap-3 px-2 py-6 text-foreground no-underline transition-colors hover:bg-accent focus-visible:bg-accent sm:grid-cols-[10rem_minmax(0,1fr)_auto]"
            >
              <UI.Text as="span" className="text-lg font-medium">
                {item.title}
              </UI.Text>
              <UI.Text
                as="span"
                className="max-w-[55ch] text-sm leading-relaxed text-muted-foreground"
              >
                {item.copy}
              </UI.Text>
              <ArrowRight
                aria-hidden="true"
                className="hidden size-5 sm:block"
              />
            </UI.Link>
          ))}
        </UI.Card>
      </UI.Grid>
    </UI.Stack>
  );
}

function PrinciplesPage() {
  return (
    <UI.Stack gap="12">
      <PageHeader
        title="Principles"
        description="Principles keep the system coherent when no exact component or pattern exists yet."
      />
      <UI.Stack gap="4">
        {principles.map(([title, copy], index) => (
          <UI.Card key={title} className="shadow-none">
            <UI.CardContent className="grid gap-5 sm:grid-cols-[4rem_1fr_1fr] sm:items-start">
              <UI.Badge variant="outline" className="w-fit">
                P{index + 1}
              </UI.Badge>
              <UI.Heading level={2} className="text-xl">
                {title}
              </UI.Heading>
              <UI.Text tone="muted">{copy}</UI.Text>
            </UI.CardContent>
          </UI.Card>
        ))}
      </UI.Stack>
      <UI.Stack gap="8" className="py-8 sm:py-12">
        <SectionHeading
          index="Rule"
          title="Avoid generic futurism"
          description="Do not use glowing brains, particle clouds, random gradients, glassmorphism, or abstract AI humanoids. Concrete information is more credible."
        />
      </UI.Stack>
    </UI.Stack>
  );
}

function ColorsPage() {
  return (
    <UI.Stack gap="12">
      <PageHeader
        title="Color"
        description="A warm paper-and-ink foundation with categorical saturated accents. Color carries meaning; it is never ambient decoration."
      />

      <UI.Stack gap="6" className="py-6">
        <UI.Heading level={2}>Color is categorical, not ambient.</UI.Heading>
        <UI.Card className="max-w-3xl border-l-4 border-l-primary py-4 shadow-none">
          <UI.CardContent>
            <UI.Text tone="muted">
              Most of the interface stays paper, ink, and muted neutral.
              Saturated color identifies an action, selection, warning, or
              system state; it does not decorate empty space.
            </UI.Text>
          </UI.CardContent>
        </UI.Card>
        <UI.Grid columns={3} gap="6">
          {colors.map(([name, token, className, purpose], index) => (
            <UI.Card key={token}>
              <UI.CardContent>
                <UI.Badge
                  aria-hidden
                  className={`h-28 w-full items-start justify-start rounded-md border p-3 ${className}`}
                >
                  <UI.Badge variant="outline" className="bg-card">
                    0{index + 1}
                  </UI.Badge>
                </UI.Badge>
              </UI.CardContent>
              <UI.CardHeader>
                <UI.Heading level={3} className="text-lg">
                  {name}
                </UI.Heading>
                <UI.Badge variant="outline" className="w-fit">
                  {token}
                </UI.Badge>
                <UI.Text tone="muted">{purpose}</UI.Text>
              </UI.CardHeader>
            </UI.Card>
          ))}
        </UI.Grid>
      </UI.Stack>

      <UI.Stack gap="6" className="border-t py-10">
        <UI.Heading level={2}>Use semantic tokens</UI.Heading>
        <UI.Grid columns={2} gap="8">
          <UI.Card className="h-fit border-l-4 border-l-primary shadow-none">
            <UI.CardContent>
              <UI.Text tone="muted">
                A semantic class explains intent and follows theme changes. A
                raw color utility only describes appearance. For example,
                <UI.Badge variant="outline" className="mx-2">
                  bg-primary
                </UI.Badge>
                maps to utility blue because primary actions use blue.
              </UI.Text>
            </UI.CardContent>
          </UI.Card>
          <CodeBlock label="Preferred">{`// Good: intent survives a theme change\n<Button className="bg-primary">Deploy</Button>\n\n// Avoid: appearance is hard-coded\n<Button className="bg-blue-600">Deploy</Button>`}</CodeBlock>
        </UI.Grid>
      </UI.Stack>
    </UI.Stack>
  );
}

function TypographyPage() {
  const specimens = [
    ["Display / 80", "One system.", "text-6xl sm:text-8xl leading-[0.9]"],
    ["Heading / 36", "Compute for every scale.", "text-4xl"],
    [
      "Body / 16",
      "Use practical language. Describe the object, its state, and what the person can do next.",
      "max-w-xl text-base leading-7",
    ],
    [
      "Metadata / 11",
      "System / Active / Rev. 04",
      "font-mono text-[11px] uppercase tracking-[0.18em]",
    ],
  ];

  return (
    <UI.Stack gap="8">
      <PageHeader
        title="Typography"
        description="Hierarchy comes from scale, weight, position, and space—not a collection of decorative typefaces."
      />
      <UI.Stack gap="4">
        {specimens.map(([label, sample, className]) => (
          <UI.Card key={label} className="shadow-none">
            <UI.CardContent className="grid gap-6 lg:grid-cols-[9rem_1fr]">
              <UI.Badge variant="outline" className="h-fit w-fit">
                {label}
              </UI.Badge>
              <UI.Text className={className}>{sample}</UI.Text>
            </UI.CardContent>
          </UI.Card>
        ))}
      </UI.Stack>
    </UI.Stack>
  );
}

function SpacingPage() {
  const spaces = [
    ["1", "4px"],
    ["2", "8px"],
    ["3", "12px"],
    ["4", "16px"],
    ["6", "24px"],
    ["8", "32px"],
    ["12", "48px"],
    ["16", "64px"],
  ];
  const rules = [
    "Align to meaningful edges",
    "Use proximity before borders",
    "Give one important idea enough empty space",
    "Do not wrap every section in a card",
  ];

  return (
    <UI.Stack gap="12">
      <PageHeader
        title="Spacing"
        description="Use a four-pixel base for local precision and large editorial jumps to separate chapters."
      />
      <UI.Card className="shadow-none">
        <UI.CardContent>
          <UI.Stack gap="6">
            {spaces.map(([token, value]) => (
              <UI.Grid
                key={token}
                className="grid-cols-[3rem_4rem_1fr] items-center"
              >
                <UI.Badge variant="outline">{token}</UI.Badge>
                <UI.Text as="span" tone="muted" className="font-mono text-xs">
                  {value}
                </UI.Text>
                <UI.Card
                  aria-hidden
                  className="h-3 border-0 bg-foreground py-0 shadow-none"
                  style={{
                    width: `min(100%, ${Number.parseInt(value) * 5}px)`,
                  }}
                />
              </UI.Grid>
            ))}
          </UI.Stack>
        </UI.CardContent>
      </UI.Card>
      <UI.Stack gap="6" className="py-8">
        <UI.Heading level={2}>Two rhythms</UI.Heading>
        <UI.Grid columns={2} gap="6">
          <UI.Card className="border-l-4 border-l-primary shadow-none">
            <UI.CardContent>
              <UI.Text tone="muted">
                Components use compact 4–32px steps. Page chapters use 64–128px
                separation. This creates a technical local rhythm inside an
                editorial global rhythm.
              </UI.Text>
            </UI.CardContent>
          </UI.Card>
          <UI.Card className="shadow-none">
            <UI.CardContent>
              <UI.List className="space-y-3">
                {rules.map((rule) => (
                  <UI.ListItem key={rule} className="flex gap-3">
                    <UI.Icon className="mt-0.5 text-primary" aria-hidden>
                      <Check />
                    </UI.Icon>
                    <UI.Text as="span">{rule}</UI.Text>
                  </UI.ListItem>
                ))}
              </UI.List>
            </UI.CardContent>
          </UI.Card>
        </UI.Grid>
      </UI.Stack>
    </UI.Stack>
  );
}

export function FoundationPage({ id }: { id: string }) {
  switch (id) {
    case "principles":
      return <PrinciplesPage />;
    case "colors":
      return <ColorsPage />;
    case "typography":
      return <TypographyPage />;
    case "spacing":
      return <SpacingPage />;
    default:
      return <IntroductionPage />;
  }
}
