import { Search, X } from "lucide-react"

import { cn } from "@/lib/utils"
import type { GuideEntry } from "./registry"

type SidebarProps = {
  activeId: string
  foundations: GuideEntry[]
  components: GuideEntry[]
  query: string
  onQueryChange: (query: string) => void
  onNavigate: (id: string) => void
}

function NavigationGroup({ label, entries, activeId, onNavigate, listLabel }: { label: string; entries: GuideEntry[]; activeId: string; onNavigate: (id: string) => void; listLabel?: string }) {
  return (
    <section className="mt-8">
      <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">{label}</p>
      <ul className="grid gap-px" aria-label={listLabel}>
        {entries.map((entry, index) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              onClick={() => onNavigate(entry.id)}
              className={cn(
                "group grid min-h-11 grid-cols-[1.6rem_1fr_auto] items-center gap-2 border-2 border-transparent px-2 py-2 text-sm font-bold transition-[background-color,box-shadow,transform] hover:border-foreground hover:bg-card",
                activeId === entry.id && "border-foreground bg-secondary text-secondary-foreground shadow-[3px_3px_0_0_var(--shadow-color)]",
              )}
            >
              <span className="font-mono text-[10px] opacity-65">{String(index + 1).padStart(2, "0")}</span>
              <span>{entry.name}</span>
              {entry.status && <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{entry.status}</span>}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Sidebar({ activeId, foundations, components, query, onQueryChange, onNavigate }: SidebarProps) {
  return (
    <aside className="border-b-2 bg-signal-yellow text-primary-foreground lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r-2">
      <div className="flex h-full flex-col p-5 lg:p-6">
        <a href="#introduction" onClick={() => onNavigate("introduction")} className="flex items-center gap-3">
          <span className="grid size-10 place-items-center border-2 bg-utility-blue font-mono text-xs font-black shadow-[3px_3px_0_0_var(--shadow-color)]">DL</span>
          <span><strong className="block text-sm">Design language</strong><span className="font-mono text-[10px] uppercase tracking-wider opacity-65">Reference / v0.2</span></span>
        </a>

        <nav aria-label="Guide navigation" className="mt-6 lg:mt-10">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2" />
            <input
              type="search"
              aria-label="Filter components"
              placeholder="Filter components"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              className="h-11 w-full border-2 bg-card pl-9 pr-9 text-sm text-card-foreground shadow-[3px_3px_0_0_var(--shadow-color)] outline-none placeholder:text-muted-foreground focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[5px_5px_0_0_var(--shadow-color)]"
            />
            {query && <button type="button" aria-label="Clear filter" onClick={() => onQueryChange("")} className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center text-muted-foreground hover:text-foreground"><X className="size-3.5" /></button>}
          </div>
          <div className="hidden lg:block">
            <NavigationGroup label="Foundations" entries={foundations} activeId={activeId} onNavigate={onNavigate} />
            <NavigationGroup label={`Components / ${components.length}`} entries={components} activeId={activeId} onNavigate={onNavigate} listLabel="Component catalogue" />
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden" aria-label="Component catalogue">
            {[...foundations, ...components].map((entry) => <a key={entry.id} href={`#${entry.id}`} onClick={() => onNavigate(entry.id)} className={cn("shrink-0 border-2 bg-card px-3 py-2 text-xs font-bold text-card-foreground", activeId === entry.id && "bg-secondary text-secondary-foreground")}>{entry.name}</a>)}
          </div>
        </nav>

        <div className="mt-auto hidden border-t-2 pt-5 font-mono text-[10px] font-bold uppercase leading-5 tracking-wider lg:block">
          React / Shadcn / Tailwind<br />Built as inspectable code.
        </div>
      </div>
    </aside>
  )
}
