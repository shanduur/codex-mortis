# Design Language

A publishable React component library and semantic styling foundation built with Shadcn conventions, Radix UI primitives, Tailwind CSS v4, and TypeScript.

## What is included

- Semantic OKLCH color tokens with light and dark themes
- Accessible `Button`, `Badge`, `Input`, `Textarea`, `Card`, `Alert`, and `Dialog` primitives
- Variant composition with `class-variance-authority`
- Class merging via `clsx` and `tailwind-merge`
- A Vite showcase app for visual development
- ESM library output and generated TypeScript declarations
- Vitest + Testing Library checks and GitHub Actions CI
- `components.json` aliases compatible with the Shadcn CLI

## Development

```bash
npm install
npm run dev
```

Open the local Vite URL to browse the component showcase.

```bash
npm run check
```

`check` runs linting, unit tests, the showcase build, and the distributable library build.

## Consuming the library

```tsx
import { Button, Card, CardContent } from "@shanduur/design-language"
import "@shanduur/design-language/styles.css"
```

```tsx
<Card>
  <CardContent>
    <Button>Continue</Button>
  </CardContent>
</Card>
```

Add the `dark` class to an ancestor (usually `<html>`) to activate dark mode. All public colors are semantic CSS custom properties, so a product can override the palette without changing component code.

## Adding Shadcn components

The repository is configured for the Shadcn CLI:

```bash
npx shadcn@latest add tooltip
```

Review generated files before committing so they preserve this library's exports and token vocabulary, then export the component from `src/components/index.ts`.

## Structure

```text
src/
├── components/ui/   # Public React primitives
├── lib/utils.ts     # Shared class-name utility
├── styles.css       # Design tokens and Tailwind theme bridge
├── index.ts         # Package entry point
└── App.tsx          # Development showcase
```

## License

MIT
