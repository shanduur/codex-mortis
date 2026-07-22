import { useEffect, useMemo, useState } from "react";
import { Code2, Moon, Sun } from "lucide-react";

import * as UI from "@/components";
import { ComponentPage } from "@/guide/component-page";
import { FoundationPage } from "@/guide/foundation-page";
import {
  componentEntries,
  foundationEntries,
  isGuideEntry,
} from "@/guide/registry";
import { Sidebar } from "@/guide/sidebar";

function getInitialPage() {
  const id = window.location.hash.slice(1);
  return isGuideEntry(id) ? id : "introduction";
}

function App() {
  const [activeId, setActiveId] = useState(getInitialPage);
  const [query, setQuery] = useState("");
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    const handleHashChange = () => setActiveId(getInitialPage());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const filteredComponents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return componentEntries;
    return componentEntries.filter((entry) =>
      `${entry.name} ${entry.description}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query]);

  const isComponent = componentEntries.some((entry) => entry.id === activeId);

  function navigate(id: string) {
    setActiveId(id);
    window.scrollTo?.({ top: 0, behavior: "instant" });
  }

  return (
    <UI.Page className="bg-transparent lg:grid lg:grid-cols-[19rem_minmax(0,1fr)]">
      <Sidebar
        activeId={activeId}
        foundations={foundationEntries}
        components={filteredComponents}
        query={query}
        onQueryChange={setQuery}
        onNavigate={navigate}
      />

      <UI.Stack gap="1" className="min-w-0">
        <UI.Header className="sticky top-0 z-40 flex h-16 items-center justify-between px-5 py-0 sm:px-8">
          <UI.Stack direction="horizontal" gap="2">
            <UI.Badge variant="outline" className="hidden sm:inline-flex">
              Catalogue
            </UI.Badge>
            <UI.Badge variant="secondary">{activeId}</UI.Badge>
          </UI.Stack>
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

        <UI.Main id="content" className="py-0">
          <UI.Container
            size="lg"
            className="max-w-[84rem] px-5 sm:px-8 lg:px-12 xl:px-16"
          >
            {isComponent ? (
              <ComponentPage id={activeId} />
            ) : (
              <FoundationPage id={activeId} />
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
