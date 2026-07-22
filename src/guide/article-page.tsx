import { ArrowRight, Check } from "lucide-react";

import * as UI from "@/components";
import { articleGuidance, defaultArticleGuidance } from "./article-content";
import { IconCatalog } from "./icon-catalog";
import { PageHeader } from "./page-header";
import { guideHref } from "./paths";
import { guideEntries, navigationSections } from "./registry";

export function ArticlePage({ id }: { id: string }) {
  const entry = guideEntries.find((candidate) => candidate.id === id);
  if (!entry) return null;

  const guidance = articleGuidance[id] ?? defaultArticleGuidance;
  const section = navigationSections.find((candidate) =>
    candidate.entries.some((candidateEntry) => candidateEntry.id === id),
  );
  const sectionEntries = section?.entries ?? [];
  const currentIndex = sectionEntries.findIndex(
    (candidate) => candidate.id === id,
  );
  const relatedEntries = sectionEntries.filter(
    (candidate) => candidate.id !== id,
  );
  const isSectionOverview = currentIndex === 0 && relatedEntries.length > 0;
  const previous =
    currentIndex > 0 ? sectionEntries[currentIndex - 1] : undefined;
  const next =
    currentIndex >= 0 && currentIndex < sectionEntries.length - 1
      ? sectionEntries[currentIndex + 1]
      : undefined;
  const principlesTitle = guidance.principlesTitle ?? "Principles";
  const practiceTitle = guidance.practiceTitle ?? "Application";
  const tocItems = [
    { href: "#overview", label: "Overview" },
    ...(id === "icon-catalog"
      ? [{ href: "#catalog", label: "Available icons" }]
      : []),
    { href: "#principles", label: principlesTitle },
    { href: "#application", label: practiceTitle },
    { href: "#checklist", label: "Checklist" },
    ...(isSectionOverview
      ? [{ href: "#in-this-section", label: "In this section" }]
      : []),
  ];

  return (
    <UI.Stack gap="12">
      <PageHeader title={entry.name} description={entry.description} />

      <UI.Grid className="items-start gap-10 xl:grid-cols-[minmax(0,1fr)_16rem]">
        <UI.Stack gap="12" className="min-w-0">
          <UI.Stack id="overview" gap="4">
            <UI.Heading level={2}>Overview</UI.Heading>
            <UI.Card>
              <UI.CardContent>
                <UI.Text className="max-w-3xl text-base leading-7" tone="muted">
                  {guidance.overview}
                </UI.Text>
              </UI.CardContent>
            </UI.Card>
          </UI.Stack>

          {id === "icon-catalog" && <IconCatalog />}

          <GuidanceSection
            id="principles"
            title={principlesTitle}
            items={guidance.principles}
          />
          <GuidanceSection
            id="application"
            title={practiceTitle}
            items={guidance.practice}
          />
          <GuidanceSection
            id="checklist"
            title="Checklist"
            items={guidance.checklist}
            checklist
          />

          {isSectionOverview && (
            <UI.Stack id="in-this-section" gap="4">
              <UI.Heading level={2}>In this section</UI.Heading>
              <UI.Grid columns={2} gap="4">
                {relatedEntries.map((relatedEntry) => (
                  <UI.Card key={relatedEntry.id} className="h-full">
                    <UI.CardHeader>
                      <UI.Badge variant="outline" className="w-fit">
                        {relatedEntry.group}
                      </UI.Badge>
                      <UI.Heading level={3}>{relatedEntry.name}</UI.Heading>
                    </UI.CardHeader>
                    <UI.CardContent>
                      <UI.Text tone="muted">{relatedEntry.description}</UI.Text>
                    </UI.CardContent>
                    <UI.CardFooter>
                      <UI.Link
                        href={guideHref(relatedEntry.path)}
                        className="inline-flex items-center gap-2 font-semibold no-underline"
                      >
                        Read guidance
                        <UI.Icon className="size-4">
                          <ArrowRight />
                        </UI.Icon>
                      </UI.Link>
                    </UI.CardFooter>
                  </UI.Card>
                ))}
              </UI.Grid>
            </UI.Stack>
          )}

          {(previous || next) && (
            <UI.Grid columns={2} gap="4" aria-label="Adjacent guide pages">
              {previous ? (
                <AdjacentPage entry={previous} direction="Previous" />
              ) : (
                <UI.Stack aria-hidden />
              )}
              {next && (
                <AdjacentPage entry={next} direction="Next" align="right" />
              )}
            </UI.Grid>
          )}
        </UI.Stack>

        <UI.Card className="sticky top-24 hidden shadow-none xl:flex">
          <UI.CardContent>
            <UI.TableOfContents items={tocItems} className="border-l-0 pl-0" />
          </UI.CardContent>
        </UI.Card>
      </UI.Grid>
    </UI.Stack>
  );
}

function GuidanceSection({
  id,
  title,
  items,
  checklist = false,
}: {
  id: string;
  title: string;
  items: string[];
  checklist?: boolean;
}) {
  return (
    <UI.Stack id={id} gap="4">
      <UI.Heading level={2}>{title}</UI.Heading>
      <UI.Card>
        <UI.CardContent>
          <UI.List className="ml-0 grid list-none gap-4 pl-0">
            {items.map((item) => (
              <UI.ListItem
                key={item}
                className="grid grid-cols-[auto_1fr] items-start gap-3 border-b pb-4 last:border-b-0 last:pb-0"
              >
                <UI.Icon className="mt-1 size-4 text-status">
                  {checklist ? <Check /> : <ArrowRight />}
                </UI.Icon>
                <UI.Text>{item}</UI.Text>
              </UI.ListItem>
            ))}
          </UI.List>
        </UI.CardContent>
      </UI.Card>
    </UI.Stack>
  );
}

function AdjacentPage({
  entry,
  direction,
  align,
}: {
  entry: (typeof guideEntries)[number];
  direction: "Previous" | "Next";
  align?: "right";
}) {
  return (
    <UI.Card className={align === "right" ? "text-right" : undefined}>
      <UI.CardContent>
        <UI.Text
          tone="muted"
          className="font-mono text-[10px] uppercase tracking-widest"
        >
          {direction}
        </UI.Text>
        <UI.Link
          href={guideHref(entry.path)}
          className="mt-2 block text-base font-semibold no-underline"
        >
          {entry.name}
        </UI.Link>
      </UI.CardContent>
    </UI.Card>
  );
}
