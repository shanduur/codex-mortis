# Design Language

A React component library and full multi-page design/style guide built with Shadcn conventions and Tailwind CSS.

The visual system combines Tenstorrent-inspired editorial neo-industrial structure with restrained neo-brutalist accents: technical-catalogue clarity, a page-wide drafting grid, warm paper-and-ink foundations, categorical saturated color, quiet borders, and confident typography.

Color is categorical rather than ambient: utility blue carries primary actions, active navigation, information, and links; signal yellow marks selected or high-attention moments; alert coral identifies warnings, destructive actions, and errors; status green communicates success and healthy state; and lavender is reserved for rare expressive moments. Most surfaces remain neutral so those colors keep their meaning. Components preserve visible focus, semantic intent, and readable light/dark contrast.

The guide dogfoods the public library for its own shell and documentation layout. Only large headings sit directly on the drafting-grid canvas; supporting copy and metadata live on owned component surfaces.

The documentation is a true Vite multi-page site rather than an SPA. Its 149 canonical routes build to separate HTML documents and navigate with standard links, so direct loads, reloads, back/forward navigation, open-in-new-tab, and copied URLs use native browser behavior.

## Run the guide

```bash
npm install
npm run dev
```

The guide includes:

- design principles;
- color, typography, spacing, layout, iconography, motion, elevation, and design-token foundations;
- voice, tone, writing, UI text, grammar, and data-formatting guidelines;
- reusable UI and scenario patterns;
- searchable component navigation;
- live light/dark previews;
- minimal TypeScript examples;
- do/avoid guidance;
- keyboard, focus, screen-reader, contrast, and motion accessibility guidance;
- design, code, documentation, and release contribution guidance.

See [`docs/information-architecture.md`](./docs/information-architecture.md) for the route contract and content architecture.

## Components

The package currently contains **66 stable components**, each with a searchable guide page, live source-component preview, usage example, and accessibility guidance.

- **Actions and selection:** Button, Button Group, Checkbox, Radio Group, Select, Switch, Toggle, Toggle Group
- **Disclosure and overlays:** Accordion, Collapsible, Dialog, Drawer, Menu, Popover, Tabs, Toast, Tooltip
- **Forms:** Combobox, Date Picker, Fieldset, File Upload, Form, Form Error Summary, Form Field, Form Section, Input, Input Group, Number Input, Slider, Textarea, Time Picker
- **Feedback and status:** Alert, Banner, Empty State, Progress, Skeleton, Spinner, Status Indicator, Stepper
- **Navigation:** Breadcrumb, Link, Navigation Menu, Pagination, Sidebar, Skip Link, Table of Contents
- **Content and data:** Avatar, Badge, Card, Description List, Icon, Image, List, Prose, Stat, Table, Text
- **Layout and page structure:** Container, Divider, Grid, Header, Heading, Main, Page, Page Header, Stack

## Use the library

```tsx
import { Button, Card, CardContent } from "@shanduur/design-language";
import "@shanduur/design-language/styles.css";

export function Example() {
  return (
    <Card>
      <CardContent>
        <Button>Deploy system</Button>
      </CardContent>
    </Card>
  );
}
```

Add the `dark` class to an ancestor—normally `<html>`—to activate dark mode.

## Quality checks

```bash
npm run check
```

This runs Prettier verification, Oxlint, the comprehensive Vitest suite, the guide build, declaration generation, and the distributable ESM library build.

## Add a Shadcn component

```bash
npx shadcn@latest add tooltip
```

Then export it from `src/components/index.ts`, document it in the guide registry and component page, and add behavior tests. See [`AGENTS.md`](./AGENTS.md) for the complete contribution workflow and coding standards.

## Project structure

```text
src/components/ui/  # Public owned components
src/guide/          # Guide registry, articles, patterns, and reference pages
scripts/            # Deterministic multi-page HTML generation
docs/               # Architecture and contribution decisions
src/styles.css      # Semantic tokens and Tailwind theme
src/index.ts        # Package entry point
src/App.tsx         # Shared shell mounted independently by every document
```

## License

MIT
