import { Search, X } from "lucide-react";

import * as UI from "@/components";
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
    <UI.Stack gap="3" className="mt-8">
      <UI.Text className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
        {label}
      </UI.Text>
      <UI.List className="grid list-none gap-px pl-0" aria-label={listLabel}>
        {entries.map((entry, index) => (
          <UI.ListItem key={entry.id}>
            <UI.Link
              href={`#${entry.id}`}
              onClick={() => onNavigate(entry.id)}
              aria-current={activeId === entry.id ? "page" : undefined}
              className={cn(
                "group grid min-h-11 grid-cols-[1.6rem_1fr_auto] items-center gap-2 rounded-md border border-transparent px-2 py-2 text-sm font-medium no-underline transition-colors hover:border-border hover:bg-muted",
                activeId === entry.id &&
                  "border-primary bg-primary text-primary-foreground",
              )}
            >
              <UI.Text as="span" className="font-mono text-[10px] opacity-65">
                {String(index + 1).padStart(2, "0")}
              </UI.Text>
              <UI.Text as="span" className="font-medium">
                {entry.name}
              </UI.Text>
              {entry.status && (
                <UI.Badge
                  variant={activeId === entry.id ? "secondary" : "outline"}
                  className="text-[9px]"
                >
                  {entry.status}
                </UI.Badge>
              )}
            </UI.Link>
          </UI.ListItem>
        ))}
      </UI.List>
    </UI.Stack>
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
    <UI.Sidebar className="border-b bg-card p-0 text-card-foreground lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:border-b-0 lg:border-r">
      <UI.Stack className="h-full p-5 lg:p-6">
        <UI.Link
          href="#introduction"
          onClick={() => onNavigate("introduction")}
          className="flex items-center gap-3 no-underline"
        >
          <UI.Badge className="grid size-10 place-items-center rounded-md p-0 font-mono text-xs font-bold">
            DL
          </UI.Badge>
          <UI.Stack gap="1">
            <UI.Text as="span" className="font-semibold">
              Design language
            </UI.Text>
            <UI.Text
              as="span"
              tone="muted"
              className="font-mono text-[10px] uppercase tracking-wider"
            >
              Reference / v0.2
            </UI.Text>
          </UI.Stack>
        </UI.Link>

        <UI.Stack
          role="navigation"
          aria-label="Guide navigation"
          className="mt-6 lg:mt-10"
        >
          <UI.Stack className="relative">
            <UI.Icon className="pointer-events-none absolute left-3 top-3 z-10 size-4">
              <Search />
            </UI.Icon>
            <UI.Input
              type="search"
              aria-label="Filter components"
              placeholder="Filter components"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              className="pl-9 pr-9"
            />
            {query && (
              <UI.Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Clear filter"
                onClick={() => onQueryChange("")}
                className="absolute right-1 top-1 size-8"
              >
                <X className="size-3.5" />
              </UI.Button>
            )}
          </UI.Stack>

          <UI.Stack className="hidden lg:flex">
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
          </UI.Stack>

          <UI.Stack
            direction="horizontal"
            className="mt-4 overflow-x-auto pb-1 lg:hidden"
            aria-label="Component catalogue"
          >
            {[...foundations, ...components].map((entry) => (
              <UI.Link
                key={entry.id}
                href={`#${entry.id}`}
                onClick={() => onNavigate(entry.id)}
                aria-current={activeId === entry.id ? "page" : undefined}
                className={cn(
                  "shrink-0 rounded-md border bg-background px-3 py-2 text-xs font-medium text-foreground no-underline",
                  activeId === entry.id &&
                    "border-primary bg-primary text-primary-foreground",
                )}
              >
                {entry.name}
              </UI.Link>
            ))}
          </UI.Stack>
        </UI.Stack>

        <UI.Card className="mt-auto hidden gap-2 py-4 shadow-none lg:flex">
          <UI.CardContent>
            <UI.Text
              tone="muted"
              className="font-mono text-[10px] uppercase leading-5 tracking-wider"
            >
              React / Shadcn / Tailwind
            </UI.Text>
            <UI.Text
              tone="muted"
              className="font-mono text-[10px] uppercase leading-5 tracking-wider"
            >
              Built as inspectable code.
            </UI.Text>
          </UI.CardContent>
        </UI.Card>
      </UI.Stack>
    </UI.Sidebar>
  );
}
