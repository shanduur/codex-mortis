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
   - Introduction
   - Getting started
   - Installation
   - Component status
   - Design resources
2. **Foundations**
   - Principles, color, typography, spacing
   - Layout, iconography, motion, elevation, design tokens
3. **Guidelines**
   - Voice and tone
   - Writing
   - UI text
   - Grammar and mechanics
   - Formatting data
4. **UI patterns**
   - Data display, degraded experiences, empty states
   - Feature onboarding, forms, loading, navigation
   - Notification messaging, progressive disclosure, saving
5. **Scenario patterns**
   - Create and edit, copy, delete, filter, search
6. **Components**
   - Component overview
   - All 66 stable component reference pages
7. **Accessibility**
   - Keyboard navigation, focus management, screen readers
   - Color contrast, accessible motion, review checklists
8. **Contributing**
   - Design, code, documentation, and release process

This mirrors Primer's distinction between foundations, reusable UI patterns, scenario-level guidance, component references, and accessibility without reproducing Primer's branded language or visual styling.

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

Tests enforce:

- unique canonical pathname routes;
- complete information-architecture groups;
- authored guidance for each non-component article;
- standard links and direct pathname rendering;
- a physical HTML entry for each route;
- guide composition from owned library components.
