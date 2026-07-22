import { Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { GuideEntry } from "./registry";

type SidebarProps = {
  activeId: string;
  foundations: GuideEntry[];
  components: GuideEntry[];
  query: string;
  onQueryChange: (query: string) => void;
  onNavigate: (id: string) => void;
};

function NavigationGroup({
  label,
  entries,
  activeId,
  onNavigate,
  listLabel,
}: {
  label: string;
  entries: GuideEntry[];
  activeId: string;
  onNavigate: (id: string) => void;
  listLabel?: string;
}) {
  return (
    <section className="mt-8">
      <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
        {label}
      </p>
      <ul className="grid gap-px" aria-label={listLabel}>
        {entries.map((entry, index) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              onClick={() => onNavigate(entry.id)}
              className={cn(
                "group grid min-h-11 grid-cols-[1.6rem_1fr_auto] items-center gap-2 rounded-md border border-transparent px-2 py-2 text-sm font-medium transition-colors hover:border-border hover:bg-muted",
                activeId === entry.id &&
                  "border-primary bg-primary text-primary-foreground",
              )}
            >
              <span className="font-mono text-[10px] opacity-65">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{entry.name}</span>
              {entry.status && (
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                  {entry.status}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Sidebar({
  activeId,
  foundations,
  components,
  query,
  onQueryChange,
  onNavigate,
}: SidebarProps) {
  return (
    <aside className="border-b bg-card text-card-foreground lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col p-5 lg:p-6">
        <a
          href="#introduction"
          onClick={() => onNavigate("introduction")}
          className="flex items-center gap-3"
        >
          <span className="grid size-10 place-items-center rounded-md border bg-primary font-mono text-xs font-bold text-primary-foreground">
            DL
          </span>
          <span>
            <strong className="block text-sm">Design language</strong>
            <span className="font-mono text-[10px] uppercase tracking-wider opacity-65">
              Reference / v0.2
            </span>
          </span>
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
              className="h-11 w-full rounded-md border bg-background pl-9 pr-9 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear filter"
                onClick={() => onQueryChange("")}
                className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
          <div className="hidden lg:block">
            <NavigationGroup
              label="Foundations"
              entries={foundations}
              activeId={activeId}
              onNavigate={onNavigate}
            />
            <NavigationGroup
              label={`Components / ${components.length}`}
              entries={components}
              activeId={activeId}
              onNavigate={onNavigate}
              listLabel="Component catalogue"
            />
          </div>
          <div
            className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden"
            aria-label="Component catalogue"
          >
            {[...foundations, ...components].map((entry) => (
              <a
                key={entry.id}
                href={`#${entry.id}`}
                onClick={() => onNavigate(entry.id)}
                className={cn(
                  "shrink-0 rounded-md border bg-background px-3 py-2 text-xs font-medium text-foreground",
                  activeId === entry.id &&
                    "border-primary bg-primary text-primary-foreground",
                )}
              >
                {entry.name}
              </a>
            ))}
          </div>
        </nav>

        <div className="mt-auto hidden border-t pt-5 font-mono text-[10px] uppercase leading-5 tracking-wider text-muted-foreground lg:block">
          React / Shadcn / Tailwind
          <br />
          Built as inspectable code.
        </div>
      </div>
    </aside>
  );
}
