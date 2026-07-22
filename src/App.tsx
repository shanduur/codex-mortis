import { useEffect, useMemo, useState } from "react";
import { Code2, Moon, Sun } from "lucide-react";

import * as UI from "@/components";
import { ArticlePage } from "@/guide/article-page";
import { ComponentPage } from "@/guide/component-page";
import { FoundationPage } from "@/guide/foundation-page";
import { guidePathname } from "@/guide/paths";
import {
  componentEntries,
  foundationEntries,
  guideEntries,
  navigationSections,
} from "@/guide/registry";
import { Sidebar } from "@/guide/sidebar";

function getInitialPage() {
  const pathname = guidePathname(window.location.pathname);
  return (
    guideEntries.find((entry) => entry.path === pathname)?.id ?? "introduction"
  );
}

function App() {
  const activeId = getInitialPage();
  const [query, setQuery] = useState("");
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const filteredSections = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return navigationSections;
    return navigationSections
      .map((section) => ({
        ...section,
        entries: section.entries.filter((entry) =>
          `${entry.name} ${entry.description} ${entry.group}`
            .toLowerCase()
            .includes(normalizedQuery),
        ),
      }))
      .filter((section) => section.entries.length > 0);
  }, [query]);

  const isComponent = componentEntries.some((entry) => entry.id === activeId);
  const isFoundation = foundationEntries.some((entry) => entry.id === activeId);
  return (
    <UI.Page className="bg-transparent lg:grid lg:grid-cols-[19rem_minmax(0,1fr)]">
      <UI.SkipLink href="#content">Skip to content</UI.SkipLink>
      <Sidebar
        activeId={activeId}
        sections={filteredSections}
        query={query}
        onQueryChange={setQuery}
      />

      <UI.Stack gap="1" className="min-w-0">
        <UI.Header className="sticky top-0 z-40 flex h-16 items-center justify-end px-5 py-0 sm:px-8">
          <UI.Stack direction="horizontal" gap="1">
            <UI.Button asChild variant="ghost" size="sm">
              <UI.Link
                href="https://github.com/shanduur/design-language"
                aria-label="Open repository"
                className="no-underline"
              >
                <Code2 />
                <UI.Text as="span" className="hidden sm:inline">
                  Source
                </UI.Text>
              </UI.Link>
            </UI.Button>
            <UI.Button
              variant="ghost"
              size="icon"
              aria-label={dark ? "Use light theme" : "Use dark theme"}
              onClick={() => setDark((value) => !value)}
            >
              {dark ? <Sun /> : <Moon />}
            </UI.Button>
          </UI.Stack>
        </UI.Header>

        <UI.Main id="content" tabIndex={-1} className="py-0">
          <UI.Container
            size="lg"
            className="max-w-[84rem] px-5 sm:px-8 lg:px-12 xl:px-16"
          >
            {isComponent ? (
              <ComponentPage id={activeId} />
            ) : isFoundation ? (
              <FoundationPage id={activeId} />
            ) : (
              <ArticlePage id={activeId} />
            )}
          </UI.Container>
        </UI.Main>

        <UI.Card className="mt-16 rounded-none border-x-0 border-b-0 shadow-none">
          <UI.CardContent>
            <UI.Grid columns={2} gap="6">
              <UI.Text
                tone="muted"
                className="font-mono text-[10px] uppercase tracking-[0.16em]"
              >
                React / Shadcn / Tailwind CSS
              </UI.Text>
              <UI.Text
                tone="muted"
                className="font-mono text-[10px] uppercase tracking-[0.16em] sm:text-right"
              >
                Inspectable. Extensible. Owned.
              </UI.Text>
            </UI.Grid>
          </UI.CardContent>
        </UI.Card>
      </UI.Stack>
    </UI.Page>
  );
}

export default App;
