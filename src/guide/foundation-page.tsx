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
  ["Background", "--background", "bg-background", "Primary canvas"],
  ["Foreground", "--foreground", "bg-foreground", "Primary text and high-contrast surfaces"],
  ["Primary", "--primary", "bg-primary", "Actions and selected state"],
  ["Secondary", "--secondary", "bg-secondary", "Quiet controls and grouped metadata"],
  ["Muted", "--muted", "bg-muted", "Supporting surfaces"],
  ["Destructive", "--destructive", "bg-destructive", "Irreversible or dangerous actions"],
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
      <PageHeader chapter="Foundation / 00" title="Design language" description="A practical system for building technical products that feel engineered, legible, and open. Start here before choosing components." eyebrow="Read time / 4 min" />
      <section className="py-16 sm:py-24">
        <SectionHeading index="01" title="Editorial neo-industrialism" description="Our visual posture combines technical-catalogue clarity with editorial pacing. It is material rather than ethereal, direct rather than promotional." />
        <div className="grid gap-px border-x border-b bg-border lg:grid-cols-3">
          {[['Industrial, not corporate','Show systems as things people configure, inspect, and own.'],['Editorial, not templated','Let content change the rhythm. Not every idea belongs in an equal card.'],['Modernist, not sterile','Use alignment and restraint while keeping technical culture visible.']].map(([title, copy], index) => (
            <article key={title} className="min-h-56 bg-background p-7"><span className="font-mono text-[10px] text-primary">0{index + 1}</span><h3 className="mt-16 text-xl font-semibold tracking-tight">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p></article>
          ))}
        </div>
      </section>
      <section className="border-y bg-foreground px-6 py-16 text-background sm:px-10 sm:py-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-background/55">Core idea</p>
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
      <PageHeader chapter="Foundation / 02" title="Color" description="A restrained industrial palette: near-black, white, cool material neutrals, and one controlled spectral accent." />
      <section className="py-14">
        <div className="grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {colors.map(([name, token, className, purpose]) => <article key={token} className="bg-background p-4"><div className={`h-32 border ${className}`} /><div className="mt-4 flex items-start justify-between gap-4"><div><h2 className="font-medium">{name}</h2><p className="mt-1 text-xs leading-5 text-muted-foreground">{purpose}</p></div><code className="font-mono text-[10px] text-primary">{token}</code></div></article>)}
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
