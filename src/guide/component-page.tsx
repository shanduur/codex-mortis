import { CircleAlert, Info, Server, Terminal } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Textarea,
} from "@/components"
import { CodeBlock } from "./code-block"
import { PageHeader } from "./page-header"
import { componentEntries } from "./registry"

const componentCopy: Record<string, { guidance: string; code: string; doThis: string; avoid: string }> = {
  button: {
    guidance: "Choose a variant by intent, not appearance.",
    code: `import { Button } from "@shanduur/design-language"\n\nexport function DeployAction() {\n  return <Button>Deploy system</Button>\n}`,
    doThis: "Use a verb that describes the result: Deploy system.",
    avoid: "Do not use vague labels such as Continue when the outcome is known.",
  },
  badge: {
    guidance: "Use badges for compact metadata, not primary actions.",
    code: `import { Badge } from "@shanduur/design-language"\n\n<Badge variant="secondary">In review</Badge>`,
    doThis: "Keep labels short and use sentence case.",
    avoid: "Do not turn every piece of supporting text into a badge.",
  },
  input: {
    guidance: "Every input needs a visible label and a clear expected format.",
    code: `import { Input } from "@shanduur/design-language"\n\n<label className="grid gap-2">\n  System name\n  <Input name="systemName" placeholder="compute-01" />\n</label>`,
    doThis: "Place persistent instructions near the field.",
    avoid: "Do not use placeholder text as the only label.",
  },
  textarea: {
    guidance: "Use a textarea when the expected answer is more than one line.",
    code: `import { Textarea } from "@shanduur/design-language"\n\n<label className="grid gap-2">\n  Change summary\n  <Textarea name="summary" />\n</label>`,
    doThis: "Explain what a useful answer contains.",
    avoid: "Do not use a tall textarea for a short identifier.",
  },
  card: {
    guidance: "Cards group related content; they do not replace page hierarchy.",
    code: `import { Card, CardContent, CardHeader, CardTitle } from "@shanduur/design-language"\n\n<Card>\n  <CardHeader><CardTitle>System status</CardTitle></CardHeader>\n  <CardContent>All services operational.</CardContent>\n</Card>`,
    doThis: "Give the card one clear subject.",
    avoid: "Do not put every page section inside an equal-looking card.",
  },
  alert: {
    guidance: "Alerts communicate state that deserves attention in context.",
    code: `import { Alert, AlertDescription, AlertTitle } from "@shanduur/design-language"\n\n<Alert>\n  <AlertTitle>Restart required</AlertTitle>\n  <AlertDescription>Apply the new kernel after the workload finishes.</AlertDescription>\n</Alert>`,
    doThis: "Describe the state and the next useful action.",
    avoid: "Do not use destructive styling for neutral information.",
  },
  dialog: {
    guidance: "Dialogs focus a short, interruptive task without changing context.",
    code: `import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@shanduur/design-language"\n\n<Dialog>\n  <DialogTrigger asChild><Button>Rename</Button></DialogTrigger>\n  <DialogContent><DialogTitle>Rename system</DialogTitle></DialogContent>\n</Dialog>`,
    doThis: "Keep the task focused and provide a clear way to close it.",
    avoid: "Do not place long, multi-step workflows inside a dialog.",
  },
}

function ComponentExample({ id }: { id: string }) {
  switch (id) {
    case "button":
      return <div className="flex flex-wrap items-center gap-3"><Button>Deploy system</Button><Button variant="secondary">Save draft</Button><Button variant="outline">Inspect</Button><Button variant="ghost">Cancel</Button><Button variant="destructive">Delete</Button><Button disabled>Unavailable</Button></div>
    case "badge":
      return <div className="flex flex-wrap gap-3"><Badge>Active</Badge><Badge variant="secondary">In review</Badge><Badge variant="outline">Queued</Badge><Badge variant="destructive">Failed</Badge></div>
    case "input":
      return <div className="grid max-w-md gap-6"><label className="grid gap-2 text-sm font-medium">System name<Input placeholder="compute-01" /></label><label className="grid gap-2 text-sm font-medium text-muted-foreground">Read-only value<Input value="mesh-4x4" readOnly /></label><label className="grid gap-2 text-sm font-medium text-muted-foreground">Unavailable<Input placeholder="No access" disabled /></label></div>
    case "textarea":
      return <label className="grid max-w-lg gap-2 text-sm font-medium">Change summary<Textarea placeholder="Describe what changed and why…" /><span className="text-xs font-normal text-muted-foreground">Include expected impact and rollback notes.</span></label>
    case "card":
      return <div className="grid gap-4 sm:grid-cols-2"><Card className="rounded-none"><CardHeader><Server className="size-5 text-primary" /><CardTitle className="mt-8">System status</CardTitle><CardDescription>Rack 04 / eastern zone</CardDescription></CardHeader><CardContent><p className="font-mono text-xs uppercase tracking-wider text-primary">Operational</p></CardContent><CardFooter className="border-t pt-6 text-xs text-muted-foreground">Updated 12 seconds ago</CardFooter></Card><Card className="rounded-none bg-foreground text-background"><CardHeader><Terminal className="size-5 text-primary" /><CardTitle className="mt-8">Compiler</CardTitle><CardDescription className="text-background/60">Toolchain / release</CardDescription></CardHeader><CardContent><code className="font-mono text-sm">forge --version 0.4.1</code></CardContent></Card></div>
    case "alert":
      return <div className="grid max-w-2xl gap-4"><Alert><Info /><AlertTitle>Restart required</AlertTitle><AlertDescription>Apply the new kernel after the workload finishes.</AlertDescription></Alert><Alert variant="destructive"><CircleAlert /><AlertTitle>Deployment failed</AlertTitle><AlertDescription>Inspect the build log before trying again.</AlertDescription></Alert></div>
    case "dialog":
      return <Dialog><DialogTrigger asChild><Button>Rename system</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Rename system</DialogTitle><DialogDescription>Names must be unique within this workspace.</DialogDescription></DialogHeader><label className="grid gap-2 text-sm font-medium">System name<Input defaultValue="compute-01" /></label><DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><DialogClose asChild><Button>Save name</Button></DialogClose></DialogFooter></DialogContent></Dialog>
    default:
      return null
  }
}

export function ComponentPage({ id }: { id: string }) {
  const entry = componentEntries.find((component) => component.id === id) ?? componentEntries[0]
  const copy = componentCopy[entry.id]

  return (
    <>
      <PageHeader chapter="Component / Stable" title={entry.name} description={`${entry.description}. ${copy.guidance}`} eyebrow="React / Shadcn" />
      <section className="py-14 sm:py-20">
        <div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-semibold">Preview</h2><span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Light + dark ready</span></div>
        <div aria-label={`${entry.name} component examples`} className="min-h-64 border bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] p-6 sm:grid sm:place-items-center sm:p-12">
          <div className="w-full bg-background p-6 sm:p-8"><ComponentExample id={entry.id} /></div>
        </div>
      </section>
      <section className="grid gap-8 border-t py-14 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,1fr)]">
        <div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">Start here</p><h2 className="mt-4 text-3xl font-semibold tracking-tight">Usage</h2><p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">Import from the package entry point. Compose with standard React props and use Tailwind utilities only for layout adjustments specific to the consuming screen.</p></div>
        <CodeBlock>{copy.code}</CodeBlock>
      </section>
      <section className="grid gap-px border bg-border sm:grid-cols-2">
        <article className="bg-background p-7"><p className="font-mono text-[10px] uppercase tracking-wider text-primary">Do</p><p className="mt-8 text-sm leading-6">{copy.doThis}</p></article>
        <article className="bg-background p-7"><p className="font-mono text-[10px] uppercase tracking-wider text-destructive">Avoid</p><p className="mt-8 text-sm leading-6">{copy.avoid}</p></article>
      </section>
      <section className="py-14"><h2 className="text-xl font-semibold">Accessibility checklist</h2><ul className="mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2"><li>• Works with keyboard input</li><li>• Keeps a visible focus indicator</li><li>• Uses labels that describe intent</li><li>• Does not rely on color alone</li></ul></section>
    </>
  )
}
