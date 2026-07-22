import { useEffect, useState } from "react"
import { ArrowUpRight, Check, Component, Moon, Sparkles, Sun } from "lucide-react"

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

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark")

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    localStorage.setItem("theme", dark ? "dark" : "light")
  }, [dark])

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,color-mix(in_oklch,var(--primary)_12%,transparent),transparent_32rem)]">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <div className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm"><Component className="size-4" /></div>
            <div><p className="text-sm font-semibold leading-none">Design Language</p><p className="mt-1 text-xs text-muted-foreground">React primitives</p></div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="hidden sm:inline-flex">v0.1.0</Badge>
            <Button variant="ghost" size="icon" aria-label={dark ? "Use light theme" : "Use dark theme"} onClick={() => setDark((value) => !value)}>{dark ? <Sun /> : <Moon />}</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <section className="max-w-3xl">
          <Badge className="mb-5"><Sparkles /> A small, sharp foundation</Badge>
          <h1 className="text-balance text-5xl font-semibold tracking-[-0.045em] sm:text-7xl">One language for every interface.</h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">Accessible React components, expressive design tokens, and sensible defaults—built on Shadcn patterns, Radix primitives, and Tailwind CSS.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg">Explore components <ArrowUpRight /></Button>
            <Dialog>
              <DialogTrigger asChild><Button size="lg" variant="outline">Quick start</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Install the library</DialogTitle><DialogDescription>Import the theme once, then compose components wherever you need them.</DialogDescription></DialogHeader>
                <pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm"><code>npm install @shanduur/design-language</code></pre>
                <DialogFooter><DialogClose asChild><Button>Got it</Button></DialogClose></DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        <section className="mt-20 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader><div className="flex items-center justify-between gap-4"><div><CardTitle>Component playground</CardTitle><CardDescription className="mt-1.5">Variants that remain coherent across themes.</CardDescription></div><Badge variant="secondary">Interactive</Badge></div></CardHeader>
            <CardContent className="space-y-7">
              <div><p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Buttons</p><div className="flex flex-wrap gap-2"><Button>Primary</Button><Button variant="secondary">Secondary</Button><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button><Button variant="destructive">Delete</Button></div></div>
              <div><p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Status</p><div className="flex flex-wrap gap-2"><Badge>Ready</Badge><Badge variant="secondary">Draft</Badge><Badge variant="outline">Queued</Badge><Badge variant="destructive">Blocked</Badge></div></div>
              <Alert><Check /><AlertTitle>Everything is in sync</AlertTitle><AlertDescription>Your tokens and components share the same semantic color system.</AlertDescription></Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Request access</CardTitle><CardDescription>Form controls use consistent focus and error language.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <label className="grid gap-2 text-sm font-medium">Work email<Input type="email" placeholder="you@example.com" /></label>
              <label className="grid gap-2 text-sm font-medium">How will you use it?<Textarea placeholder="Tell us about your product…" /></label>
            </CardContent>
            <CardFooter className="justify-between border-t pt-6"><span className="text-xs text-muted-foreground">Usually replies in one day.</span><Button>Send request</Button></CardFooter>
          </Card>
        </section>

        <section className="mt-20 border-y py-12">
          <div className="grid gap-8 sm:grid-cols-3">
            {[['7','primitives'],['2','color modes'],['0','runtime styles']].map(([value, label]) => <div key={label}><p className="text-4xl font-semibold tracking-tight">{value}</p><p className="mt-1 text-sm text-muted-foreground">{label}</p></div>)}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
