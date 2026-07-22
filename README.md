# Design Language

A React component library and browsable design-language guide built with Shadcn conventions and Tailwind CSS.

The visual system combines Tenstorrent-inspired editorial neo-industrial structure with colorful neo-brutalist expression: technical-catalogue clarity, warm paper-and-ink foundations, categorical saturated accents, strong borders, hard offset shadows, oversized typography, and selective asymmetry.

Color is categorical rather than ambient: signal yellow marks primary action and selection, utility blue carries navigation and information, alert coral marks urgency, status green communicates healthy state, and lavender is reserved for rare expressive moments. Components preserve visible focus, semantic intent, and readable light/dark contrast.

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

- Alert
- Badge
- Button
- Card
- Dialog
- Input
- Textarea

## Use the library

```tsx
import { Button, Card, CardContent } from "@shanduur/design-language"
import "@shanduur/design-language/styles.css"

export function Example() {
  return (
    <Card>
      <CardContent>
        <Button>Deploy system</Button>
      </CardContent>
    </Card>
  )
}
```

Add the `dark` class to an ancestor—normally `<html>`—to activate dark mode.

## Quality checks

```bash
npm run check
```

This runs Oxlint, Vitest, the guide build, and the distributable library build.

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
