# Design Language

A React component library and browsable design-language guide built with Shadcn conventions and Tailwind CSS.

The visual system combines Tenstorrent-inspired editorial neo-industrial structure with restrained neo-brutalist accents: technical-catalogue clarity, a page-wide drafting grid, warm paper-and-ink foundations, categorical saturated color, quiet borders, and confident typography.

Color is categorical rather than ambient: utility blue carries navigation and primary action, signal yellow marks selected or high-attention moments, alert coral marks urgency, status green communicates healthy state, and lavender is reserved for rare expressive moments. Most surfaces remain neutral so those colors keep their meaning. Components preserve visible focus, semantic intent, and readable light/dark contrast.

## Run the guide

```bash
npm install
npm run dev
```

The guide includes:

- design principles;
- semantic color tokens;
- typography and spacing foundations;
- searchable component navigation;
- live light/dark previews;
- minimal TypeScript examples;
- do/avoid guidance;
- accessibility checklists.

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
src/guide/          # Browsable design guide
src/styles.css      # Semantic tokens and Tailwind theme
src/index.ts        # Package entry point
src/App.tsx         # Guide application shell
```

## License

MIT
