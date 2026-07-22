# RFD: Multi-page design-system guide

- **Status:** Accepted
- **Date:** 2026-07-22

## Summary

The documentation site follows the breadth and navigational model of a mature design system such as Primer while retaining this project's editorial neo-industrial visual language and original guidance. It is a static multi-page application (MPA), not a single-page application.

## Decision

Every registered guide route owns a physical `index.html` document and is built as an independent Vite HTML entry. React mounts the shared documentation shell on each document, but navigation uses ordinary anchors and performs normal document requests.

The route registry is the source of truth for page metadata, navigation, generated HTML entries, active state, search, and tests.

## Information architecture

1. **Getting started**
   - Introduction, installation, and component status
   - Design resources, React setup, TypeScript, browser support, testing, and migration
2. **Foundations**
   - Principles, color, typography, spacing, layout, and responsive design
   - Iconography, motion, elevation, and design-token concepts
3. **Primitives**
   - Color, size and space, typography, and motion tokens
   - Token naming, themes, and migration
4. **Guidelines**
   - Voice and tone, writing, UI text, grammar, and formatting data
   - Form content, errors, notifications, localization, and inclusive language
5. **UI patterns**
   - Data display, degraded experiences, empty states, and feature onboarding
   - Forms, loading, navigation, notifications, errors and recovery
   - Progressive disclosure and saving
6. **Scenario patterns**
   - Create and edit, copy, delete, filter, and search
7. **Components**
   - Component overview
   - All 66 stable component reference pages
8. **Accessibility**
   - Keyboard navigation, focus management, screen readers, and semantic HTML
   - Color contrast, text resizing, alternative text, announcements, and motion
   - Testing, tools and resources, and review checklists
9. **Icons**
   - Searchable catalog, usage guidance, and accessibility
10. **Contributing**
    - Design, code, documentation, component proposals, quality, and releases

This mirrors Primer's distinction between foundations, installable primitives, reusable UI patterns, scenario-level guidance, component references, icons, and accessibility without reproducing Primer's branded language or visual styling.

## Route contract

- The root introduction is `/`.
- Section indexes use `/<section>/`.
- Articles use `/<section>/<slug>/`.
- Component references use `/components/<component-id>/`.
- Every canonical route ends in `/`, except that web servers may normalize equivalent requests.
- The route is resolved from `window.location.pathname`; hashes do not select pages.
- Internal links are ordinary `href` values and must not intercept navigation.
- Every route maps to `<route>/index.html` in source and in `demo-dist`.
- Each HTML document owns its title, description, theme bootstrap, root mount, and module entry.
- Unknown paths resolve to the introduction only during unsupported direct source execution; deployed static hosting should serve its normal 404 response because no matching document exists.

## Non-SPA invariants

- No client-side router.
- No history API navigation.
- No `preventDefault` interception for guide links.
- No hash-based page selection.
- Browser reload, back, forward, copy-link, and open-in-new-tab behavior remain native.
- Search may filter the local navigation list but never changes the current document without following a link.

## Build and verification

`scripts/generate-pages.mjs` compiles the route registry and generates all HTML source entries before development and guide builds. `vite.config.ts` discovers every generated entry and passes them to Vite's multi-page build.

Root-hosted builds use `/` as their base. GitHub Pages sets `BASE_PATH=/<repository>/`; Vite prefixes assets and `src/guide/paths.ts` prefixes document links while stripping that deployment prefix before registry lookup. Canonical registry paths therefore remain host-independent, and every project-site deep link still resolves to its physical HTML document.

Tests enforce:

- unique canonical pathname routes;
- complete information-architecture groups;
- authored guidance for each non-component article;
- standard links and direct pathname rendering;
- a physical HTML entry for each route;
- guide composition from owned library components.
