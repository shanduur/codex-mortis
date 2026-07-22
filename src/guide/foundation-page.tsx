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
  const postures = [
    [
      "Sharp, not softened",
      "Use square corners, visible structure, and hard offset depth instead of polished softness.",
      "border-t-utility-blue",
    ],
    [
      "Editorial, not templated",
      "Let content change the rhythm. Not every idea belongs in an equal card.",
      "border-t-alert-coral",
    ],
    [
      "Colorful, not decorative",
      "Give every saturated color a stable role instead of scattering rainbow accents.",
      "border-t-status-green",
    ],
  ];

  return (
    <UI.Stack gap="12">
      <PageHeader
        chapter="Foundation / 00"
        title="Codex Mortis"
        description="A living codex for technical interfaces: measured, legible, enduring, and explicit about the structures beneath the surface."
        eyebrow="Read time / 4 min"
      />

      <UI.Grid
        gap="4"
        className="items-stretch lg:grid-cols-[minmax(0,1.8fr)_minmax(17rem,1fr)]"
      >
        <UI.Card className="h-full overflow-hidden border-foreground/20 bg-white p-2 shadow-none">
          <UI.Image
            src={guideHref("/codex-mortis.webp")}
            alt="The Codex Mortis brand plate"
            width={1536}
            height={1024}
            loading="eager"
            className="aspect-[3/2] h-full w-full rounded-sm object-contain lg:aspect-auto"
          />
        </UI.Card>

        <UI.Card className="border-0 bg-code px-2 py-6 text-code-foreground hard-shadow sm:px-4">
          <UI.CardHeader>
            <UI.Badge className="w-fit bg-signal-yellow text-secondary-foreground">
              Core idea
            </UI.Badge>
          </UI.CardHeader>
          <UI.CardContent>
            <UI.Text className="max-w-5xl text-balance text-3xl font-medium leading-tight tracking-[-0.04em]">
              The interface should expose how the product works—not hide it
              behind generic futurism.
            </UI.Text>
          </UI.CardContent>
        </UI.Card>
      </UI.Grid>

      <UI.Stack gap="8" className="py-8 sm:py-12">
        <SectionHeading
          index="01"
          title="Editorial neubrutalism"
          description="Technical-catalogue clarity and disciplined alignment lead the system. Square geometry, dark outlines, zero-blur offset shadows, and categorical color make structure explicit without sacrificing reading rhythm."
        />
        <UI.Grid columns={3} gap="6">
          {postures.map(([title, copy, color], index) => (
            <UI.Card key={title} className={`min-h-56 border-t-4 ${color}`}>
              <UI.CardHeader>
                <UI.Badge variant="outline" className="w-fit">
                  0{index + 1}
                </UI.Badge>
                <UI.Heading level={3} className="mt-8 text-xl">
                  {title}
                </UI.Heading>
              </UI.CardHeader>
              <UI.CardContent>
                <UI.Text tone="muted">{copy}</UI.Text>
              </UI.CardContent>
            </UI.Card>
          ))}
        </UI.Grid>
      </UI.Stack>

      <UI.Stack gap="8" className="py-8 sm:py-12">
        <SectionHeading
          index="02"
          title="Build product UI"
          description="Move from system decisions to complete product experiences with implementation-ready components, reusable interface patterns, and content guidance."
        />
        <UI.Grid columns={3} gap="4">
          {[
            {
              title: "Components",
              copy: "Browse 66 stable building blocks with live examples, usage guidance, accessibility notes, and source code.",
              href: "/components/",
              action: "Explore components",
            },
            {
              title: "UI patterns",
              copy: "Compose components into forms, navigation, loading, messaging, disclosure, onboarding, and resilient data experiences.",
              href: "/patterns/",
              action: "Browse UI patterns",
            },
            {
              title: "Content guidelines",
              copy: "Write clear interface text with shared rules for voice, tone, grammar, labels, instructions, errors, and formatted data.",
              href: "/guidelines/",
              action: "Read content guidance",
            },
          ].map((item) => (
            <UI.Card key={item.title} className="min-h-64 shadow-none">
              <UI.CardHeader>
                <UI.Heading level={3}>{item.title}</UI.Heading>
              </UI.CardHeader>
              <UI.CardContent className="flex flex-1 flex-col gap-6">
                <UI.Text tone="muted">{item.copy}</UI.Text>
                <UI.Button asChild variant="outline" className="mt-auto w-fit">
                  <UI.Link href={guideHref(item.href)} className="no-underline">
                    {item.action}
                    <ArrowRight />
                  </UI.Link>
                </UI.Button>
              </UI.CardContent>
            </UI.Card>
          ))}
        </UI.Grid>
      </UI.Stack>

      <UI.Stack gap="8" className="py-8 sm:py-12">
        <SectionHeading
          index="03"
          title="Shared foundations"
          description="Ground every product surface in the same visual language, accessibility expectations, and contribution model before choosing a component."
        />
        <UI.Grid columns={3} gap="4">
          {[
            {
              title: "Foundations",
              copy: "Principles, tokens, color, typography, spacing, layout, iconography, motion, and elevation.",
              href: "/foundations/",
              action: "Explore foundations",
            },
            {
              title: "Accessibility",
              copy: "Keyboard, focus, screen-reader, contrast, and motion requirements built into planning and review.",
              href: "/accessibility/",
              action: "Read accessibility guidance",
            },
            {
              title: "Contributing",
              copy: "A shared path for proposing, designing, implementing, documenting, and releasing system changes.",
              href: "/contributing/",
              action: "Contribute to the system",
            },
          ].map((item) => (
            <UI.Card key={item.title} className="min-h-60 shadow-none">
              <UI.CardHeader>
                <UI.Heading level={3}>{item.title}</UI.Heading>
              </UI.CardHeader>
              <UI.CardContent className="flex flex-1 flex-col gap-6">
                <UI.Text tone="muted">{item.copy}</UI.Text>
                <UI.Link
                  href={guideHref(item.href)}
                  className="mt-auto inline-flex items-center gap-2"
                >
                  {item.action}
                  <ArrowRight />
                </UI.Link>
              </UI.CardContent>
            </UI.Card>
          ))}
        </UI.Grid>
      </UI.Stack>
    </UI.Stack>
  );
}

function PrinciplesPage() {
  return (
    <UI.Stack gap="12">
      <PageHeader
        chapter="Foundation / 01"
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
        chapter="Foundation / 02"
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
        chapter="Foundation / 03"
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
        chapter="Foundation / 04"
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
