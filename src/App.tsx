import { useEffect, useMemo, useState } from "react";
import { Code2, Menu, Moon, Sun } from "lucide-react";

import * as UI from "@/components";
import { ArticlePage } from "@/guide/article-page";
import { ComponentPage } from "@/guide/component-page";
import { FoundationPage } from "@/guide/foundation-page";
import { guideHref, guidePathname } from "@/guide/paths";
import {
  componentEntries,
  foundationEntries,
  guideEntries,
  navigationSections,
  showcaseEntries,
} from "@/guide/registry";
import { Sidebar } from "@/guide/sidebar";
import { ShowcaseIndex, ShowcasePage } from "@/showcase/showcase-page";

function getInitialPage() {
  const pathname = guidePathname(window.location.pathname);
  return (
    guideEntries.find((entry) => entry.path === pathname)?.id ?? "introduction"
  );
}

function App() {
  const activeId = getInitialPage();
  const [query, setQuery] = useState("");
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", dark ? "#0b0b10" : "#f7f3ea");
  }, [dark]);

  const filteredSections = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const guideSections = navigationSections.filter(
      (section) => section.label !== "Showcase",
    );
    if (!normalizedQuery) return guideSections;
    return guideSections
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
  const isShowcase = showcaseEntries.some((entry) => entry.id === activeId);

  if (isShowcase && activeId !== "showcase") {
    return (
      <ShowcasePage
        id={activeId}
        dark={dark}
        onThemeChange={() => setDark((value) => !value)}
      />
    );
  }

  return (
    <UI.Page className="bg-transparent lg:grid lg:grid-cols-[19rem_minmax(0,1fr)]">
      <UI.SkipLink href="#content">Skip to content</UI.SkipLink>
      <Sidebar
        activeId={activeId}
        sections={filteredSections}
        query={query}
        onQueryChange={setQuery}
        className="hidden lg:block"
      />

      <UI.Stack gap="1" className="min-w-0">
        <UI.Header className="sticky top-0 z-40 flex h-16 items-center justify-between px-5 py-0 sm:px-8">
          <UI.Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Open guide navigation"
            className="lg:hidden"
            onClick={() => setMobileNavigationOpen(true)}
          >
            <Menu />
          </UI.Button>
          <UI.Stack direction="horizontal" gap="1" className="ml-auto">
            <UI.Button asChild variant="default" size="sm">
              <UI.Link
                href={guideHref("/showcase/")}
                aria-current={activeId === "showcase" ? "page" : undefined}
                className="no-underline"
              >
                Showcase
              </UI.Link>
            </UI.Button>
            <UI.Button asChild variant="ghost" size="sm">
              <UI.Link
                href="https://github.com/shanduur/codex-mortis"
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

        <UI.Drawer
          open={mobileNavigationOpen}
          onOpenChange={setMobileNavigationOpen}
        >
          <UI.DrawerContent className="left-0 right-auto max-w-[20rem] border-l-0 border-r p-0">
            <UI.DrawerHeader className="sr-only">
              <UI.DrawerTitle>Guide navigation</UI.DrawerTitle>
              <UI.DrawerDescription>
                Search and browse Codex Mortis documentation.
              </UI.DrawerDescription>
            </UI.DrawerHeader>
            <Sidebar
              activeId={activeId}
              sections={filteredSections}
              query={query}
              onQueryChange={setQuery}
              className="h-full overflow-y-auto border-0"
            />
          </UI.DrawerContent>
        </UI.Drawer>

        <UI.Main id="content" tabIndex={-1} className="py-0">
          <UI.Container
            size="lg"
            className="max-w-[84rem] px-5 sm:px-8 lg:px-12 xl:px-16"
          >
            {activeId === "showcase" ? (
              <ShowcaseIndex />
            ) : isComponent ? (
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
