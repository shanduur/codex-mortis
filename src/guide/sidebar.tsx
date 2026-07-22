import { Search, X } from "lucide-react";

import * as UI from "@/components";
import { cn } from "@/lib/utils";
import type { GuideEntry, GuideGroup } from "./registry";

type NavigationSection = {
  label: GuideGroup;
  entries: GuideEntry[];
};

type SidebarProps = {
  activeId: string;
  sections: NavigationSection[];
  query: string;
  onQueryChange: (query: string) => void;
};

function NavigationItem({
  entry,
  active,
  index,
}: {
  entry: GuideEntry;
  active: boolean;
  index: number;
}) {
  return (
    <UI.ListItem>
      <UI.Link
        href={entry.path}
        aria-current={active ? "page" : undefined}
        className={cn(
          "group grid min-h-10 grid-cols-[1.6rem_1fr_auto] items-center gap-2 rounded-md border border-transparent px-2 py-1.5 text-sm font-medium no-underline transition-colors hover:border-border hover:bg-muted",
          active && "border-primary bg-primary text-primary-foreground",
        )}
      >
        <UI.Text as="span" className="font-mono text-[10px] opacity-65">
          {String(index + 1).padStart(2, "0")}
        </UI.Text>
        <UI.Text as="span" className="truncate">
          {entry.name}
        </UI.Text>
        {entry.status ? (
          <UI.Badge
            variant={active ? "secondary" : "outline"}
            className="px-1.5 py-0 text-[8px]"
          >
            {entry.status}
          </UI.Badge>
        ) : null}
      </UI.Link>
    </UI.ListItem>
  );
}

function NavigationGroup({
  label,
  entries,
  activeId,
}: NavigationSection & { activeId: string }) {
  return (
    <UI.Stack gap="3" className="mt-6">
      <UI.Text className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
        {label}
      </UI.Text>
      <UI.List
        aria-label={label === "Components" ? "Component catalogue" : undefined}
        className="grid list-none gap-px pl-0"
      >
        {entries.map((entry, index) => (
          <NavigationItem
            key={entry.id}
            entry={entry}
            active={entry.id === activeId}
            index={index}
          />
        ))}
      </UI.List>
    </UI.Stack>
  );
}

export function Sidebar({
  activeId,
  sections,
  query,
  onQueryChange,
}: SidebarProps) {
  const activeGroup =
    sections.find((section) =>
      section.entries.some((entry) => entry.id === activeId),
    )?.label ?? "Getting started";
  const visibleSections = query
    ? sections.filter((section) => section.entries.length > 0)
    : sections.filter((section) => section.label === activeGroup);

  return (
    <UI.Sidebar className="p-0 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
      <UI.Stack gap="4" className="h-full p-5 lg:p-6">
        <UI.Link href="/" className="flex items-center gap-3 no-underline">
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
              System guide / v0.3
            </UI.Text>
          </UI.Stack>
        </UI.Link>

        <UI.Stack
          gap="4"
          className="mt-6"
          role="navigation"
          aria-label="Guide navigation"
        >
          <UI.Stack gap="4" className="relative">
            <UI.Icon
              className="pointer-events-none absolute left-3 top-3 z-10 size-4"
              aria-hidden
            >
              <Search />
            </UI.Icon>
            <UI.Input
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              aria-label="Search documentation"
              placeholder="Search documentation"
              className="pl-9 pr-9"
            />
            {query ? (
              <UI.Button
                type="button"
                size="icon"
                variant="ghost"
                aria-label="Clear search"
                onClick={() => onQueryChange("")}
                className="absolute right-1 top-1"
              >
                <X />
              </UI.Button>
            ) : null}
          </UI.Stack>

          {!query ? (
            <UI.Stack gap="3" className="mt-4">
              <UI.Text className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                Sections
              </UI.Text>
              <UI.List className="grid list-none gap-1 pl-0">
                {sections.map((section) => {
                  const entry = section.entries[0];
                  return entry ? (
                    <UI.ListItem key={section.label}>
                      <UI.Link
                        href={entry.path}
                        aria-current={
                          section.label === activeGroup ? "location" : undefined
                        }
                        className={cn(
                          "block rounded-md px-2 py-1.5 text-sm no-underline hover:bg-muted",
                          section.label === activeGroup &&
                            "bg-muted font-semibold text-primary",
                        )}
                      >
                        {section.label}
                      </UI.Link>
                    </UI.ListItem>
                  ) : null;
                })}
              </UI.List>
            </UI.Stack>
          ) : null}

          <UI.Stack gap="4">
            {visibleSections.map((section) => (
              <NavigationGroup
                key={section.label}
                label={section.label}
                entries={section.entries}
                activeId={activeId}
              />
            ))}
            {visibleSections.length === 0 ? (
              <UI.Card className="py-4 shadow-none">
                <UI.CardContent className="px-4">
                  <UI.Text tone="muted">
                    No documentation matches “{query}”.
                  </UI.Text>
                </UI.CardContent>
              </UI.Card>
            ) : null}
          </UI.Stack>
        </UI.Stack>
      </UI.Stack>
    </UI.Sidebar>
  );
}
