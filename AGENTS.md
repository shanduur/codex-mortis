# AGENTS.md

## Project purpose

This repository contains Codex Mortis, a React component library and its design-system guide. The guide is the primary development surface: every public component should be browsable, explained, and demonstrated there.

The visual direction is **editorial neo-industrialism**: technical-catalogue clarity, editorial pacing, restrained color, strong alignment, and visible engineering detail.

The guide must dogfood the public library. Compose its shell, navigation, pages, typography, surfaces, and examples from components exported by `src/components/index.ts`; do not maintain parallel raw-HTML replicas.

## Core technologies

Keep the core deliberately small:

- **React** for components and state
- **Shadcn conventions** for owned component source and accessible primitives
- **Tailwind CSS** for styling and semantic tokens
- **TypeScript** for type safety
- **Vite** for development and library builds
- **Vitest + Testing Library** for behavior tests

Do not add a framework, router, CSS-in-JS library, state manager, or documentation platform unless the requirement cannot be met cleanly with the existing stack.

## Start here

```bash
npm install
npm run dev
```

Before committing:

```bash
npm run check
```

`npm run check` runs linting, tests, the guide build, and the package build.

## Repository map

```text
src/
├── components/
│   ├── index.ts              # Public component exports
│   └── ui/                   # Shadcn-style owned primitives
├── guide/
│   ├── component-page.tsx    # Component previews and guidance
│   ├── component-page.test.tsx # Guide coverage for every public component
│   ├── foundation-page.tsx   # Color, type, spacing, principles
│   ├── registry.ts           # Navigation and component catalogue data
│   ├── sidebar.tsx           # Guide navigation and filtering
│   ├── page-header.tsx       # Shared editorial page heading
│   └── code-block.tsx        # Code presentation
├── lib/utils.ts              # cn() class merger
├── App.tsx                   # Guide shell and hash navigation
├── index.ts                  # Package entry point
└── styles.css                # Tokens, Tailwind bridge, global styles
```

## Working rules

### 1. Begin with behavior

Use test-driven development for new behavior:

1. Add one failing test.
2. Run that test and confirm the expected failure.
3. Implement the smallest change that passes.
4. Run the focused test, then `npm run check`.
5. Refactor only while tests stay green.

Tests should describe user-visible behavior, not internal component structure.

### 2. Own component source

Shadcn components are source code, not a black-box package. It is acceptable to generate a starting point:

```bash
npx shadcn@latest add tooltip
```

Then review it. Keep naming, tokens, focus behavior, exports, and visual posture consistent with this repository.

### 3. Use semantic tokens

Prefer:

```tsx
<div className="border bg-background text-foreground" />
```

Avoid:

```tsx
<div className="border-zinc-300 bg-white text-zinc-950" />
```

Semantic tokens live in `src/styles.css` and support light/dark themes automatically. Add a token only when it expresses reusable meaning.

### 4. Keep components approachable

Code should be understandable to a junior React engineer:

- use explicit prop types;
- prefer small named components over clever abstraction;
- keep state close to where it is used;
- use standard React props and composition;
- avoid custom hooks unless logic is genuinely reused;
- explain non-obvious accessibility behavior with a short comment;
- do not hide simple markup behind configuration-heavy systems.

### 5. Preserve accessibility

Every public component must:

- work with keyboard navigation;
- keep a visible focus indicator;
- use semantic HTML where possible;
- have an accessible name;
- avoid communicating state by color alone;
- preserve Radix accessibility behavior when using a Shadcn primitive.

### 6. Extend the guide with every component

When adding a component:

1. Create `src/components/ui/<name>.tsx`.
2. Export it from `src/components/index.ts`.
3. Add metadata in `src/guide/registry.ts`.
4. Add a realistic preview, minimal usage example, and do/avoid guidance in `src/guide/component-page.tsx`.
5. Add behavior tests beside the component.
6. Check light, dark, desktop, and mobile presentations.

A component is not complete if it exists in the package but cannot be discovered in the guide.

## Visual standards

- Use hierarchy through scale, space, alignment, and contrast before adding containers.
- Only large display and section headings may sit directly on the drafting-grid canvas. Put metadata, descriptions, body copy, lists, and guidance on an owned surface such as Card, Header, Sidebar, Badge, or CodeBlock.
- Keep radii small and surfaces material.
- Keep the drafting grid on the page canvas; add local grids only when they explain or frame technical content.
- Keep most surfaces neutral. Use utility blue for primary actions, active navigation, information, and links; yellow for selected or high-attention moments; coral for warnings, destructive actions, and errors; green for success and healthy state; and lavender only for rare expressive moments.
- Prefer quiet one-pixel borders and soft elevation. Hard offset shadows are exceptional emphasis, not a component default.
- Use monospace for metadata, code, identifiers, and technical labels—not body copy.
- Prefer asymmetrical editorial layouts to repeated equal card grids.
- Avoid decorative gradients, glassmorphism, glowing AI imagery, fake metrics, and icon-filled feature tiles.
- Motion should clarify state and respect `prefers-reduced-motion`.

## Dependency policy

- Use the highest stable major version supported by the project.
- Review `npm outdated` before dependency changes.
- Keep React and React DOM as peer dependencies for the library and development dependencies for the guide.
- Prefer capabilities already present in React, Shadcn, and Tailwind before adding a package.
- Commit `package-lock.json` whenever dependencies change.

## Git conventions

- Use Conventional Commits: `feat`, `fix`, `docs`, `test`, or `refactor`.
- Do not commit generated `dist/` or `demo-dist/` output.
- Keep commits focused and leave `npm run check` green.
