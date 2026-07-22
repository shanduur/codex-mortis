import { useEffect, useMemo, useState } from "react"
import { Code2, Moon, Sun } from "lucide-react"

import { Button } from "@/components"
import { ComponentPage } from "@/guide/component-page"
import { FoundationPage } from "@/guide/foundation-page"
import { componentEntries, foundationEntries, isGuideEntry } from "@/guide/registry"
import { Sidebar } from "@/guide/sidebar"

function getInitialPage() {
  const id = window.location.hash.slice(1)
  return isGuideEntry(id) ? id : "introduction"
}

function App() {
  const [activeId, setActiveId] = useState(getInitialPage)
  const [query, setQuery] = useState("")
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark")

  useEffect(() => {
    const handleHashChange = () => setActiveId(getInitialPage())
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    localStorage.setItem("theme", dark ? "dark" : "light")
  }, [dark])

  const filteredComponents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return componentEntries
    return componentEntries.filter((entry) => `${entry.name} ${entry.description}`.toLowerCase().includes(normalizedQuery))
  }, [query])

  const isComponent = componentEntries.some((entry) => entry.id === activeId)

  function navigate(id: string) {
    setActiveId(id)
    window.scrollTo?.({ top: 0, behavior: "instant" })
  }

  return (
    <div className="min-h-screen bg-background text-foreground lg:grid lg:grid-cols-[18rem_minmax(0,1fr)]">
      <Sidebar activeId={activeId} foundations={foundationEntries} components={filteredComponents} query={query} onQueryChange={setQuery} onNavigate={navigate} />

      <div className="min-w-0">
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-background/95 px-5 backdrop-blur-sm sm:px-8">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <span className="hidden sm:inline">Catalogue</span><span className="hidden sm:inline">/</span><span className="text-foreground">{activeId}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button asChild variant="ghost" size="sm"><a href="https://github.com/shanduur/design-language" aria-label="Open repository"><Code2 /> <span className="hidden sm:inline">Source</span></a></Button>
            <Button variant="ghost" size="icon" aria-label={dark ? "Use light theme" : "Use dark theme"} onClick={() => setDark((value) => !value)}>{dark ? <Sun /> : <Moon />}</Button>
          </div>
        </header>

        <main id="content" className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12 xl:px-16">
          {isComponent ? <ComponentPage id={activeId} /> : <FoundationPage id={activeId} />}
        </main>

        <footer className="mt-16 grid gap-6 border-t px-5 py-10 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:grid-cols-2 sm:px-8 lg:px-12 xl:px-16">
          <span>React / Shadcn / Tailwind CSS</span><span className="sm:text-right">Inspectable. Extensible. Owned.</span>
        </footer>
      </div>
    </div>
  )
}

export default App
