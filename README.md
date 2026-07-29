# Codex Mortis

![The Codex Mortis brand plate](./public/codex-mortis.webp)

An editorial React component library and full multi-page design-system codex built with Shadcn conventions and Tailwind CSS.

**Codex Mortis** treats interface design as an enduring body of measured knowledge: the visible component is only the surface; structure, semantics, accessibility, and behavior are its bones.

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
- keyboard-only guide navigation: the first `Tab` reveals “Skip to content”, `/` focuses documentation search, and `Escape` clears it while preserving focus;
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
import { Button, Card, CardContent } from "@shanduur/codex-mortis";
import "@shanduur/codex-mortis/styles.css";

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

### Style Clerk with Codex Mortis

Use the exported appearance preset at the provider boundary. It maps Clerk's forms,
buttons, cards, account menus, focus rings, and status colors to the same semantic
tokens as the component library, so the `dark` class updates Clerk automatically.
The preset has no Clerk runtime dependency.

```tsx
import { ClerkProvider } from "@clerk/clerk-react";
import { codexMortisClerkAppearance } from "@shanduur/codex-mortis";
import type { ReactNode } from "react";
import "@shanduur/codex-mortis/styles.css";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider appearance={codexMortisClerkAppearance} publishableKey="...">
      {children}
    </ClerkProvider>
  );
}
```

Keep product-specific sizing local by merging only the element being changed:

```tsx
<SignIn
  appearance={{
    ...codexMortisClerkAppearance,
    elements: {
      ...codexMortisClerkAppearance.elements,
      rootBox: `${codexMortisClerkAppearance.elements.rootBox} max-w-md`,
    },
  }}
/>
```

## Quality checks

```bash
npm run check
```

This runs Prettier verification, Oxlint, the comprehensive Vitest suite, the guide build, declaration generation, and the distributable ESM library build.

## Publishing and deployment

GitHub Actions owns both release artifacts:

- [`.github/workflows/publish-package.yml`](./.github/workflows/publish-package.yml) publishes `@shanduur/codex-mortis` to GitHub Packages whenever a GitHub Release is published. The release tag must match `package.json` (for example, tag `v0.1.0` for version `0.1.0`). The workflow authenticates with `GITHUB_TOKEN`; no repository npm token is required.
- [`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml) builds all 149 documents on every push to `main` and deploys `demo-dist/` with GitHub Pages’ artifact-based deployment. `BASE_PATH` makes assets, direct document loads, and guide links work below `/<repository>/`.

In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. Published packages are installed from `https://npm.pkg.github.com` using a GitHub token with `read:packages` permission.

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
