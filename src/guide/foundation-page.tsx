import { ArrowRight, Check } from "lucide-react"

import { CodeBlock } from "./code-block"
import { PageHeader } from "./page-header"

const principles = [
  ["Show native evidence", "Prefer real interfaces, repositories, specifications, and physical detail over decorative technology metaphors."],
  ["Structure follows engineering", "Expose meaningful layers. Do not compress hardware, software, APIs, and community into one vague platform box."],
  ["Use space with confidence", "Create hierarchy with scale, alignment, and intentional emptiness before adding another card or divider."],
  ["Openness is behavior", "Make source, documentation, contribution paths, and system boundaries visible in the interface."],
  ["Motion reveals state", "Transitions should feel measured, mechanical, and useful—never bouncy or ornamental."],
]

const colors = [
  ["Paper", "--background", "bg-background", "Warm technical canvas"],
  ["Ink", "--foreground", "bg-foreground", "Text, structure, and hard shadows"],
  ["Signal yellow", "--signal-yellow", "bg-signal-yellow", "Primary action and selected state"],
  ["Utility blue", "--utility-blue", "bg-utility-blue", "Navigation, information, and links"],
  ["Alert coral", "--alert-coral", "bg-alert-coral", "Warnings and urgent editorial emphasis"],
  ["Status green", "--status-green", "bg-status-green", "Success and healthy system state"],
  ["Play lavender", "--play-lavender", "bg-play-lavender", "Rare expressive or experimental moments"],
  ["Muted", "--muted", "bg-muted", "Supporting surfaces and disabled state"],
]

function SectionHeading({ index, title, description }: { index: string; title: string; description: string }) {
  return (
    <div className="grid gap-5 border-b pb-8 lg:grid-cols-[8rem_1fr_1fr]">
      <span className="font-mono text-xs text-muted-foreground">{index}</span>
      <h2 className="text-3xl font-semibold tracking-[-0.035em]">{title}</h2>
      <p className="max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  )
}

function IntroductionPage() {
  return (
    <>
      <PageHeader chapter="Foundation / 00" title="Design language" description="An editorial neo-industrial system for technical products: calm, legible, open, and grounded in how the product actually works." eyebrow="Read time / 4 min" />
      <section className="py-16 sm:py-24">
        <SectionHeading index="01" title="Editorial neo-industrialism" description="Technical-catalogue clarity, disciplined alignment, and confident whitespace lead the system. Neo-brutalist color is an accent, not the default surface." />
        <div className="grid gap-5 py-8 lg:grid-cols-3">
          {[['Industrial, not corporate','Show systems as things people configure, inspect, and own.','bg-utility-blue'],['Editorial, not templated','Let content change the rhythm. Not every idea belongs in an equal card.','bg-alert-coral'],['Colorful, not decorative','Give every saturated color a stable role instead of scattering rainbow accents.','bg-status-green']].map(([title, copy, color], index) => (
            <article key={title} className="min-h-56 rounded-lg border bg-card p-7 shadow-sm"><span className={`block h-1.5 w-14 rounded-full ${color}`} /><span className="mt-6 block font-mono text-[10px] text-muted-foreground">0{index + 1}</span><h3 className="mt-10 text-xl font-semibold tracking-tight">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p></article>
          ))}
        </div>
      </section>
      <section className="rounded-xl bg-code px-6 py-16 text-code-foreground soft-shadow sm:px-10 sm:py-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-code-foreground/55"><span className="mr-3 inline-block size-2 rounded-full bg-signal-yellow" />Core idea</p>
        <p className="mt-12 max-w-5xl text-balance text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-6xl">The interface should expose how the product works—not hide it behind generic futurism.</p>
      </section>
      <section className="py-16 sm:py-24">
        <SectionHeading index="02" title="How to use this guide" description="Learn the foundations, choose a component by intent, copy the example, and adapt it with semantic tokens rather than hard-coded color values." />
        <ol className="mt-10 grid gap-px border bg-border sm:grid-cols-2">
          {["Read the foundations", "Browse a component", "Copy the smallest example", "Test keyboard and screen-reader behavior"].map((step, index) => <li key={step} className="flex min-h-24 items-center gap-4 bg-background p-5"><span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span><span className="text-sm font-medium">{step}</span><ArrowRight className="ml-auto size-4 text-muted-foreground" /></li>)}
        </ol>
      </section>
    </>
  )
}

function PrinciplesPage() {
  return (
    <>
      <PageHeader chapter="Foundation / 01" title="Principles" description="Principles keep the system coherent when no exact component or pattern exists yet." />
      <section className="divide-y border-x border-b">
        {principles.map(([title, copy], index) => <article key={title} className="grid gap-5 p-6 sm:grid-cols-[4rem_1fr_1fr] sm:p-8"><span className="font-mono text-xs text-primary">P{index + 1}</span><h2 className="text-xl font-semibold tracking-tight">{title}</h2><p className="text-sm leading-6 text-muted-foreground">{copy}</p></article>)}
      </section>
      <section className="py-16 sm:py-24"><SectionHeading index="Rule" title="Avoid generic futurism" description="Do not use glowing brains, particle clouds, random gradients, glassmorphism, or abstract AI humanoids. Concrete information is more credible." /></section>
    </>
  )
}

function ColorsPage() {
  return (
    <>
      <PageHeader chapter="Foundation / 02" title="Color" description="A warm paper-and-ink foundation with categorical saturated accents. Color carries meaning; it is never ambient decoration." />
      <section className="py-14">
        <h2 className="text-3xl font-medium tracking-tight">Color is categorical, not ambient.</h2>
        <p className="mb-8 mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Most of the interface stays paper, ink, and muted neutral. Saturated surfaces mark a selected destination, a primary action, or a state that deserves attention.</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {colors.map(([name, token, className, purpose], index) => <article key={token} className="rounded-lg border bg-card p-4 shadow-sm"><div className={`h-28 rounded-md border ${className}`}><span className="m-2 inline-block rounded-full border bg-card px-2 py-1 font-mono text-[10px] text-card-foreground">0{index + 1}</span></div><div className="mt-4 flex items-start justify-between gap-4"><div><h2 className="font-semibold">{name}</h2><p className="mt-1 text-xs leading-5 text-muted-foreground">{purpose}</p></div><code className="font-mono text-[10px] text-muted-foreground">{token}</code></div></article>)}
        </div>
      </section>
      <section className="grid gap-8 border-t py-14 lg:grid-cols-2">
        <div><h2 className="text-2xl font-semibold tracking-tight">Use semantic tokens</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">A semantic class explains intent and automatically follows theme changes. A raw violet utility only explains appearance.</p></div>
        <CodeBlock label="Preferred">{`// Good: intent survives a theme change\n<Button className="bg-primary">Deploy</Button>\n\n// Avoid: appearance is hard-coded\n<Button className="bg-violet-600">Deploy</Button>`}</CodeBlock>
      </section>
    </>
  )
}

function TypographyPage() {
  return (
    <>
      <PageHeader chapter="Foundation / 03" title="Typography" description="Hierarchy comes from scale, weight, position, and space—not a collection of decorative typefaces." />
      <section className="divide-y border-x border-b">
        <div className="grid gap-6 p-6 sm:p-10 lg:grid-cols-[9rem_1fr]"><span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Display / 80</span><p className="text-6xl font-semibold leading-[0.9] tracking-[-0.055em] sm:text-8xl">One system.</p></div>
        <div className="grid gap-6 p-6 sm:p-10 lg:grid-cols-[9rem_1fr]"><span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Heading / 36</span><p className="text-4xl font-semibold tracking-[-0.04em]">Compute for every scale.</p></div>
        <div className="grid gap-6 p-6 sm:p-10 lg:grid-cols-[9rem_1fr]"><span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Body / 16</span><p className="max-w-xl text-base leading-7">Use practical language. Describe the object, its state, and what the person can do next.</p></div>
        <div className="grid gap-6 p-6 sm:p-10 lg:grid-cols-[9rem_1fr]"><span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Metadata / 11</span><p className="font-mono text-[11px] uppercase tracking-[0.18em]">System / Active / Rev. 04</p></div>
      </section>
    </>
  )
}

function SpacingPage() {
  const spaces = [["1","4px"],["2","8px"],["3","12px"],["4","16px"],["6","24px"],["8","32px"],["12","48px"],["16","64px"]]
  return (
    <>
      <PageHeader chapter="Foundation / 04" title="Spacing" description="Use a four-pixel base for local precision and large editorial jumps to separate chapters." />
      <section className="border-x border-b p-6 sm:p-10">
        <div className="space-y-5">{spaces.map(([token, value]) => <div key={token} className="grid grid-cols-[3rem_4rem_1fr] items-center gap-4"><code className="font-mono text-xs text-primary">{token}</code><span className="font-mono text-[10px] text-muted-foreground">{value}</span><div className="h-3 bg-foreground" style={{ width: `min(100%, ${Number.parseInt(value) * 5}px)` }} /></div>)}</div>
      </section>
      <section className="grid gap-8 py-16 lg:grid-cols-2"><div><h2 className="text-2xl font-semibold">Two rhythms</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Components use compact 4–32px steps. Page chapters use 64–128px separation. This creates a technical local rhythm inside an editorial global rhythm.</p></div><ul className="space-y-3 text-sm">{["Align to meaningful edges", "Use proximity before borders", "Give one important idea enough empty space", "Do not wrap every section in a card"].map((rule) => <li key={rule} className="flex gap-3"><Check className="mt-0.5 size-4 text-primary" />{rule}</li>)}</ul></section>
    </>
  )
}

export function FoundationPage({ id }: { id: string }) {
  switch (id) {
    case "principles": return <PrinciplesPage />
    case "colors": return <ColorsPage />
    case "typography": return <TypographyPage />
    case "spacing": return <SpacingPage />
    default: return <IntroductionPage />
  }
}
