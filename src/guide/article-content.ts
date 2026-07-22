export type ArticleGuidance = {
  overview: string;
  principles: string[];
  practice: string[];
  checklist: string[];
  principlesTitle?: string;
  practiceTitle?: string;
};

const sharedChecklist = [
  "The page has one clear purpose and a visible next step.",
  "Keyboard, screen-reader, zoom, and reduced-motion behavior are verified.",
  "Language, states, and responsive behavior are documented before release.",
];

function createArticleGuidance(
  overview: string,
  principle: string,
  practice: string,
): ArticleGuidance {
  return {
    overview,
    principles: [
      principle,
      "Prefer semantic system contracts over local values or one-off behavior.",
      "Document ownership, exceptions, and expected behavior before adoption.",
    ],
    practice: [
      practice,
      "Verify the result in both themes, at narrow widths, and without a pointer.",
      "Connect the decision to related foundations, components, and patterns.",
    ],
    checklist: sharedChecklist,
  };
}

export const articleGuidance: Record<string, ArticleGuidance> = {
  "getting-started": {
    overview:
      "Start with a real product problem, then adopt the smallest stable layer that solves it. The system is a shared contract between design, content, and engineering—not a gallery of preferred styles.",
    principles: [
      "Use foundations before inventing local values.",
      "Prefer stable components and documented patterns over custom assemblies.",
      "Record exceptions so they can inform the system instead of becoming hidden forks.",
    ],
    practice: [
      "Install the package and global semantic stylesheet.",
      "Build one representative workflow in both themes and at narrow width.",
      "Run accessibility and package checks before expanding adoption.",
    ],
    checklist: sharedChecklist,
  },
  installation: {
    overview:
      "The package ships source-owned React components, semantic CSS tokens, and TypeScript declarations. Consumers import components from the package root and load the stylesheet once at the application boundary.",
    principles: [
      "Keep React and React DOM compatible with the declared peer range.",
      "Load the system stylesheet before product overrides.",
      "Override semantic tokens rather than component internals.",
    ],
    practice: [
      "Install @shanduur/codex-mortis and its peer dependencies.",
      "Import @shanduur/codex-mortis/styles.css in the application entry.",
      "Render a Button and Dialog to verify CSS, focus behavior, and portals.",
    ],
    checklist: [
      "The application has a single React runtime.",
      "Global styles load once and survive production bundling.",
      "Type declarations resolve from the package export map.",
    ],
  },
  "component-status": {
    overview:
      "Status communicates whether a component is safe to adopt, what support consumers can expect, and whether migrations are likely. It describes maturity—not visual completeness.",
    principles: [
      "Stable means exported, documented, tested, and supported.",
      "Draft means the API or behavior may still change.",
      "Deprecated components name a supported replacement and migration window.",
    ],
    practice: [
      "Review status before introducing a component to a long-lived workflow.",
      "Track accessibility, API, and documentation readiness independently.",
      "Change status only with evidence from tests and real usage.",
    ],
    checklist: [
      "Public exports and declarations exist.",
      "Keyboard behavior and guide examples are covered by tests.",
      "Ownership and migration expectations are visible.",
    ],
  },
  "design-resources": {
    overview:
      "Design resources and production components should describe the same decisions. Names, variants, spacing, and states must map cleanly so handoff is verification rather than translation.",
    principles: [
      "Use semantic names shared with code.",
      "Represent loading, empty, error, and disabled states in design artifacts.",
      "Treat responsive behavior as part of the component contract.",
    ],
    practice: [
      "Start from approved primitives and templates.",
      "Annotate behavior that a static frame cannot communicate.",
      "Compare implementation and design at representative breakpoints.",
    ],
    checklist: sharedChecklist,
  },
  foundations: {
    overview:
      "Foundations are the stable decisions beneath every component and pattern: color, type, space, layout, motion, elevation, and symbols. They make independent work feel like one product.",
    principles: [
      "Name decisions by purpose rather than raw appearance.",
      "Keep the default canvas and surfaces neutral.",
      "Change foundations through tokens so components move together.",
    ],
    practice: [
      "Choose semantic tokens before writing utility classes.",
      "Check light, dark, compact, and narrow contexts.",
      "Document intent and failure modes alongside values.",
    ],
    checklist: sharedChecklist,
  },
  layout: {
    overview:
      "Layout creates reading order, relationships, and responsive behavior. Use containers, grids, and stacks to express information architecture before adding decoration.",
    principles: [
      "Constrain long-form reading width while allowing technical examples to expand.",
      "Use a predictable spacing rhythm and align to shared edges.",
      "Reflow content instead of shrinking it below a usable measure.",
    ],
    practice: [
      "Start with one column and introduce columns only when relationships require them.",
      "Keep primary actions close to the content they affect.",
      "Test at content-driven breakpoints, not device labels.",
    ],
    checklist: [
      "Reading order remains logical without CSS.",
      "No control or text is clipped at 320 CSS pixels.",
      "Zoom to 200% preserves access to all content.",
    ],
  },
  iconography: {
    overview:
      "Icons accelerate recognition but rarely carry enough context alone. Use one consistent stroke family, a limited size scale, and accessible text whenever meaning is not already visible.",
    principles: [
      "Use icons for actions and concepts that have a stable mental model.",
      "Keep decorative icons hidden from assistive technology.",
      "Give icon-only controls an explicit accessible name.",
    ],
    practice: [
      "Align icons optically with adjacent type.",
      "Use currentColor so icons follow semantic foreground tokens.",
      "Prefer a text label when an icon needs explanation.",
    ],
    checklist: [
      "Every icon-only control has a useful name.",
      "Status is not communicated by icon shape alone.",
      "Icons remain legible in high-contrast modes.",
    ],
  },
  motion: {
    overview:
      "Motion should explain state change, preserve spatial context, or confirm causality. It must never delay routine work or become the only way information is communicated.",
    principles: [
      "Animate state transitions, not decoration.",
      "Keep frequent interactions fast and interruptible.",
      "Respect prefers-reduced-motion with a meaningful static alternative.",
    ],
    practice: [
      "Use opacity and transforms before layout-heavy properties.",
      "Keep focus movement synchronized with visual movement.",
      "Remove parallax, large zooms, and nonessential loops under reduced motion.",
    ],
    checklist: [
      "The workflow remains understandable with animations disabled.",
      "No flashing content violates safety thresholds.",
      "Animation does not trap input or delay dismissal.",
    ],
  },
  elevation: {
    overview:
      "Elevation communicates containment and temporary layering. In this system, borders, neutral surface shifts, and restrained shadows establish hierarchy before depth effects.",
    principles: [
      "Use elevation to explain overlap or modality.",
      "Keep permanent page structure visually quieter than transient overlays.",
      "Avoid stacking several elevated surfaces without clear ownership.",
    ],
    practice: [
      "Use cards for owned content surfaces.",
      "Use overlay and popover tokens for floating content.",
      "Verify shadows and borders separately in dark mode.",
    ],
    checklist: [
      "Layer order matches keyboard and reading order.",
      "Modal content remains distinguishable without shadows.",
      "Nested surfaces do not create accidental visual noise.",
    ],
  },
  "design-tokens": {
    overview:
      "Tokens turn visual decisions into durable semantic contracts. Components consume roles such as primary, muted, destructive, card, and ring instead of hard-coded palette values.",
    principles: [
      "Name tokens by intent and scope.",
      "Separate categorical accents from neutral structure.",
      "Provide explicit light and dark values instead of assuming inversion.",
    ],
    practice: [
      "Change a semantic token and inspect every dependent component.",
      "Keep primitive palette values internal to the theme layer.",
      "Document aliases, foreground pairings, and accessibility constraints.",
    ],
    checklist: [
      "Token names remain meaningful when the palette changes.",
      "Foreground and background pairs meet contrast requirements.",
      "No component introduces an undocumented raw color.",
    ],
  },
  guidelines: {
    overview:
      "Product language is interface design. It names actions, explains consequences, helps recovery, and sets expectations with the same care as layout and interaction.",
    principles: [
      "Lead with what the person needs to know or do.",
      "Use familiar, concrete words and active voice.",
      "Match detail and tone to consequence.",
    ],
    practice: [
      "Write the heading, primary action, and error recovery as one conversation.",
      "Remove words that repeat visible context.",
      "Test labels with realistic data and localization expansion.",
    ],
    checklist: sharedChecklist,
  },
  "voice-and-tone": {
    overview:
      "The voice is direct, calm, practical, and technically credible. Tone adapts to the moment: concise during routine work, reassuring during failure, and explicit before irreversible action.",
    principles: [
      "Sound like a capable collaborator, not a marketing campaign.",
      "Acknowledge problems without blame or false cheerfulness.",
      "Use urgency only when the situation is genuinely urgent.",
    ],
    practice: [
      "State what happened, what it affects, and what to do next.",
      "Prefer “Save changes” to vague actions such as “Continue.”",
      "Keep celebratory language proportional to the accomplishment.",
    ],
    checklist: sharedChecklist,
  },
  writing: {
    overview:
      "Good interface writing reduces the amount a person must infer. Organize content around decisions, front-load distinctions, and make the next action visible.",
    principles: [
      "Use sentence case for headings, labels, and actions.",
      "Keep one idea per paragraph and one action per button.",
      "Put conditions before instructions when they change the outcome.",
    ],
    practice: [
      "Draft with real names, values, and constraints.",
      "Read copy in the rendered interface rather than a document alone.",
      "Cut introductory phrases that delay the useful information.",
    ],
    checklist: sharedChecklist,
  },
  "ui-text": {
    overview:
      "UI text should make controls and outcomes predictable. Labels name the object or action; help text adds only information needed before acting; errors explain recovery.",
    principles: [
      "Start action labels with a specific verb.",
      "Keep field labels persistent instead of relying on placeholders.",
      "Name destructive actions explicitly.",
    ],
    practice: [
      "Write buttons as the action the system will perform.",
      "Place constraints and formats next to the relevant field.",
      "For errors, describe the problem and a concrete correction.",
    ],
    checklist: [
      "Labels remain clear when read out of visual context.",
      "Links describe their destination rather than saying “click here.”",
      "Success and error messages identify the affected object.",
    ],
  },
  grammar: {
    overview:
      "Consistent mechanics reduce visual noise and make product language easier to scan. Use sentence case, plain punctuation, and terminology that stays stable across surfaces.",
    principles: [
      "Use sentence case except for proper nouns and code identifiers.",
      "Avoid terminal punctuation in short labels and buttons.",
      "Use contractions when they make language more natural, not less precise.",
    ],
    practice: [
      "Keep product terms in a shared glossary.",
      "Use parallel grammar in lists and grouped actions.",
      "Write numerals for measurable values and interface limits.",
    ],
    checklist: sharedChecklist,
  },
  "formatting-data": {
    overview:
      "Dates, numbers, units, and code need formats that support comparison and localization. Display values for the reader’s context while preserving precision where decisions depend on it.",
    principles: [
      "Use locale-aware date and number formatting.",
      "Include units and time zones when ambiguity changes meaning.",
      "Use monospace for identifiers and code, not ordinary prose.",
    ],
    practice: [
      "Pair relative time with an exact value when precision matters.",
      "Align comparable numeric values consistently in tables.",
      "Allow identifiers to be copied without decorative characters.",
    ],
    checklist: sharedChecklist,
  },
  patterns: {
    overview:
      "Patterns combine components, content, and behavior to solve recurring interface problems. Use them when the workflow matters more than any single primitive.",
    principles: [
      "Start from user intent and consequence.",
      "Define loading, empty, error, success, and permission states together.",
      "Keep component responsibilities clear inside the composition.",
    ],
    practice: [
      "Map the task before selecting components.",
      "Use progressive disclosure to control complexity.",
      "Test the complete keyboard and recovery path.",
    ],
    checklist: sharedChecklist,
  },
  "data-display": {
    overview:
      "Data displays help people scan, compare, inspect, and act. Choose the simplest representation that preserves the relationships needed for the task.",
    principles: [
      "Put the most decision-relevant fields first.",
      "Use alignment, labels, and whitespace before decorative color.",
      "Keep actions associated with the row or object they affect.",
    ],
    practice: [
      "Use tables for comparison across consistent fields.",
      "Use description lists for one object’s attributes.",
      "Provide sorting, filtering, and pagination only when scale requires them.",
    ],
    checklist: sharedChecklist,
  },
  "degraded-experiences": {
    overview:
      "A degraded experience preserves orientation and useful action when data, permissions, connectivity, or dependent services are unavailable.",
    principles: [
      "Keep unaffected work available.",
      "Distinguish temporary failure from missing permission or absent data.",
      "Explain whether retrying is safe and whether work was preserved.",
    ],
    practice: [
      "Show the last known trustworthy state when appropriate.",
      "Offer retry, diagnostics, or an alternate path.",
      "Avoid replacing an entire page for a local dependency failure.",
    ],
    checklist: sharedChecklist,
  },
  "empty-states": {
    overview:
      "An empty state explains why expected content is absent and what can happen next. It is product guidance, not decorative filler.",
    principles: [
      "Differentiate first use, no results, cleared data, and unavailable data.",
      "Keep the message specific to the current scope.",
      "Offer one primary next step when action is possible.",
    ],
    practice: [
      "Use EmptyState for meaningful empty regions, not every blank cell.",
      "Preserve filters or search terms in no-result states.",
      "Do not promise content the person lacks permission to create.",
    ],
    checklist: sharedChecklist,
  },
  "feature-onboarding": {
    overview:
      "Onboarding introduces capability at the moment it becomes useful. It should help someone complete real work rather than tour every available feature.",
    principles: [
      "Teach in context and let the person act immediately.",
      "Prioritize the smallest path to first value.",
      "Make guidance dismissible and recoverable.",
    ],
    practice: [
      "Use an empty state, inline hint, or short checklist before a modal tour.",
      "Remember completion without blocking future discovery.",
      "Measure task success, not tooltip impressions.",
    ],
    checklist: sharedChecklist,
  },
  "forms-pattern": {
    overview:
      "A form should support one clear task, ask only for information required at that point, and make review and recovery straightforward.",
    principlesTitle: "Anatomy",
    principles: [
      "Use a persistent title and short purpose statement.",
      "Group related fields with FormSection and Fieldset.",
      "Place the primary submit action after the fields it affects.",
    ],
    practiceTitle: "Validation",
    practice: [
      "Validate when input can be meaningfully evaluated, not on every keystroke.",
      "Show field errors beside controls and summarize submission failures at the top.",
      "Preserve entered values and move focus to the error summary after failure.",
    ],
    checklist: [
      "Every control has a persistent programmatic label.",
      "Required, optional, format, and consequence are clear before submission.",
      "Keyboard submission, error recovery, and successful completion are tested.",
    ],
  },
  "loading-pattern": {
    overview:
      "Loading feedback should preserve context, set a reasonable expectation, and prevent duplicate work. Choose feedback based on duration and whether layout is known.",
    principles: [
      "Avoid indicators for work that completes without perceptible delay.",
      "Use skeletons only when the final structure is predictable.",
      "Keep existing trustworthy content visible during background refreshes.",
    ],
    practice: [
      "Use Spinner for compact indeterminate work.",
      "Use Progress when completion can be measured.",
      "Disable only actions that would conflict with the pending operation.",
    ],
    checklist: sharedChecklist,
  },
  "navigation-pattern": {
    overview:
      "Navigation communicates location, available destinations, and hierarchy. Its labels and URLs should remain predictable across sessions and entry points.",
    principles: [
      "Use links for destinations and buttons for in-place actions.",
      "Keep primary destinations stable and visibly selected.",
      "Give every meaningful page a direct, durable URL.",
    ],
    practice: [
      "Use breadcrumbs for hierarchy, not browsing history.",
      "Use tabs only for peer views within one page context.",
      "Preserve browser back, forward, reload, and open-in-new-tab behavior.",
    ],
    checklist: sharedChecklist,
  },
  "notification-messaging": {
    overview:
      "Notifications communicate outcomes and changes outside the immediate control context. Match persistence and interruption to urgency and recoverability.",
    principles: [
      "Keep inline feedback closest to the affected content.",
      "Use banners for page- or system-level conditions.",
      "Reserve transient toasts for noncritical confirmations.",
    ],
    practice: [
      "State the affected object and outcome.",
      "Provide a recovery action when one exists.",
      "Do not rely on color or disappearance timing alone.",
    ],
    checklist: sharedChecklist,
  },
  "progressive-disclosure": {
    overview:
      "Progressive disclosure keeps the primary task readable while making advanced or conditional information available when needed.",
    principles: [
      "Do not hide information required for a safe decision.",
      "Use disclosure labels that describe the hidden content.",
      "Preserve state when opening and closing supporting regions.",
    ],
    practice: [
      "Use Accordion for independently useful sections.",
      "Use Collapsible for one optional supporting region.",
      "Use Dialog or Drawer only when focus must move into a distinct task.",
    ],
    checklist: sharedChecklist,
  },
  "saving-pattern": {
    overview:
      "Saving behavior must make persistence, pending work, conflict, and failure visible. People should know whether it is safe to leave or retry.",
    principles: [
      "Choose explicit save or autosave based on consequence and latency.",
      "Never show success before durable persistence is confirmed.",
      "Preserve recoverable local work after failure.",
    ],
    practice: [
      "Show pending and saved states near the edited object.",
      "Prevent duplicate conflicting submissions, not unrelated actions.",
      "Explain conflicts and provide a review path.",
    ],
    checklist: sharedChecklist,
  },
  scenarios: {
    overview:
      "Scenario patterns coordinate a complete task across components and states. They define intent, decision points, confirmation, feedback, and recovery.",
    principles: [
      "Keep the object and consequence visible throughout the task.",
      "Make reversible actions easy and irreversible actions deliberate.",
      "Preserve browser and keyboard conventions.",
    ],
    practice: [
      "Model the happy path and recovery paths together.",
      "Use consistent action labels across entry points.",
      "Return focus and orientation after completion or cancellation.",
    ],
    checklist: sharedChecklist,
  },
  "create-and-edit": {
    overview:
      "Create and edit workflows should make scope, required information, persistence, and cancellation predictable while protecting entered work.",
    principles: [
      "Use the same field language across create, view, and edit contexts.",
      "Separate required setup from optional refinement.",
      "Warn before discarding meaningful unsaved changes.",
    ],
    practice: [
      "Use a dedicated page for long or linkable work.",
      "Use a dialog for short focused edits with limited context.",
      "After success, return to a useful view of the affected object.",
    ],
    checklist: sharedChecklist,
  },
  "copy-scenario": {
    overview:
      "Copying creates a new object from an existing one. Make the source, duplicated scope, new identity, and post-copy destination explicit.",
    principles: [
      "Do not copy secrets, permissions, or environment-specific values silently.",
      "Give the new object a distinguishable default name.",
      "Explain fields that must be reviewed before use.",
    ],
    practice: [
      "Use a short confirmation when all copied values are safe.",
      "Use a review form when values require adjustment.",
      "Open the new object after success and identify it as a copy.",
    ],
    checklist: sharedChecklist,
  },
  "delete-scenario": {
    overview:
      "Deletion patterns scale friction with consequence. Reversible, low-impact deletion should stay quick; permanent or cascading deletion needs explicit context and confirmation.",
    principles: [
      "Name the object and downstream effect.",
      "Offer undo or soft deletion when feasible.",
      "Do not use color as the only destructive signal.",
    ],
    practice: [
      "Use a confirmation dialog for consequential deletion.",
      "Require typed confirmation only for exceptional irreversible risk.",
      "Return focus to a logical surviving location after completion.",
    ],
    checklist: sharedChecklist,
  },
  "filter-scenario": {
    overview:
      "Filtering narrows a known dataset while preserving the person’s sense of scope. Active constraints must remain visible and easy to remove.",
    principles: [
      "Use labels that match the data vocabulary.",
      "Show active filters near results.",
      "Distinguish zero matching results from an empty dataset.",
    ],
    practice: [
      "Apply simple filters immediately when latency is low.",
      "Use an explicit Apply action for expensive or multi-step queries.",
      "Encode shareable filter state in the URL when useful.",
    ],
    checklist: sharedChecklist,
  },
  "search-scenario": {
    overview:
      "Search accepts an open-ended query and helps people understand, refine, and act on ranked results. It should tolerate realistic variation without hiding scope.",
    principles: [
      "Label the searchable scope.",
      "Preserve the query on the results page.",
      "Offer useful recovery for misspellings and no results.",
    ],
    practice: [
      "Submit on Enter and provide a named submit control when needed.",
      "Use Combobox only when suggestions help before submission.",
      "Represent query and refinement state in durable URLs.",
    ],
    checklist: sharedChecklist,
  },
  accessibility: {
    overview:
      "Accessibility is a product-quality requirement across design, content, code, and testing. Build equivalent paths from the start rather than adapting a finished interface.",
    principles: [
      "Use semantic HTML and native behavior before custom abstractions.",
      "Provide perceivable names, states, instructions, and feedback.",
      "Support keyboard, assistive technology, zoom, contrast, and reduced motion.",
    ],
    practice: [
      "Include accessibility acceptance criteria in design and engineering work.",
      "Test with keyboard and at least one screen reader.",
      "Automate repeatable checks but retain manual review.",
    ],
    checklist: sharedChecklist,
  },
  "keyboard-navigation": {
    overview:
      "Every interactive task must be reachable and operable with a keyboard. Follow platform conventions so people can transfer knowledge between products.",
    principles: [
      "Tab moves between controls; arrow keys move within composite widgets.",
      "Enter or Space activates according to native control behavior.",
      "Escape dismisses temporary layers and restores focus.",
    ],
    practice: [
      "Use native buttons and links whenever possible.",
      "Implement roving focus for menus, tabs, and grouped composite controls.",
      "Test the complete task without touching a pointer.",
    ],
    checklist: sharedChecklist,
  },
  "focus-management": {
    overview:
      "Focus tells keyboard and assistive-technology users where interaction will happen next. It must remain visible, logical, and synchronized with dynamic content.",
    principles: [
      "Never remove focus indicators without an equivalent replacement.",
      "Move focus only when context changes enough to require it.",
      "Return focus after closing dialogs, drawers, and menus.",
    ],
    practice: [
      "Move focus to error summaries after failed form submission.",
      "Focus the dialog title or first meaningful control on open.",
      "Do not trap focus outside modal contexts.",
    ],
    checklist: sharedChecklist,
  },
  "screen-readers": {
    overview:
      "Screen readers depend on document structure and the accessibility tree. Names, roles, states, relationships, and live feedback should describe the same interface visible on screen.",
    principles: [
      "Use headings and landmarks to expose page structure.",
      "Associate labels, descriptions, errors, and controls programmatically.",
      "Announce important asynchronous outcomes without stealing focus.",
    ],
    practice: [
      "Inspect the accessibility tree before adding ARIA.",
      "Use aria-live sparingly for status updates.",
      "Hide decorative icons while retaining meaningful visible text.",
    ],
    checklist: sharedChecklist,
  },
  "color-contrast": {
    overview:
      "Color supports hierarchy and state but cannot carry meaning alone. Foreground and background pairs must remain readable across themes, states, and user contrast settings.",
    principles: [
      "Pair hue with text, shape, position, or iconography.",
      "Meet contrast requirements for text and essential control boundaries.",
      "Test interactive states, not only default tokens.",
    ],
    practice: [
      "Use semantic foreground tokens paired with their surfaces.",
      "Check muted text, placeholders, disabled states, and focus rings.",
      "Verify categorical accents in both light and dark themes.",
    ],
    checklist: sharedChecklist,
  },
  "accessible-motion": {
    overview:
      "Motion can clarify change but may create vestibular, cognitive, or attention barriers. Offer a stable experience that preserves meaning when motion is reduced.",
    principles: [
      "Respect prefers-reduced-motion automatically.",
      "Avoid large spatial movement, parallax, and continuous animation.",
      "Do not require precise timing to read or operate content.",
    ],
    practice: [
      "Replace movement with immediate state changes or subtle fades.",
      "Pause nonessential animated media.",
      "Keep loading and progress information available without animation.",
    ],
    checklist: sharedChecklist,
  },
  "accessibility-checklists": {
    overview:
      "Checklists make shared expectations repeatable, but they do not replace testing with disabled people. Use them at design review, implementation, and release—not only at the end.",
    principles: [
      "Review structure, keyboard, focus, names, states, contrast, zoom, and motion.",
      "Test realistic content and error conditions.",
      "Record known limitations with ownership and remediation plans.",
    ],
    practice: [
      "Run automated rules in CI.",
      "Perform keyboard and screen-reader smoke tests on changed workflows.",
      "Include accessibility in component and pattern acceptance criteria.",
    ],
    checklist: sharedChecklist,
  },
  components: {
    overview:
      "Components are reusable contracts for structure, behavior, styling, and accessibility. Choose one by semantic responsibility, then compose it through documented patterns.",
    principles: [
      "Prefer the narrowest component that owns the required behavior.",
      "Use variants by intent rather than appearance.",
      "Keep product-specific data and orchestration outside primitives.",
    ],
    practice: [
      "Review status, usage, accessibility, and examples before adoption.",
      "Import from the package root and use semantic tokens for customization.",
      "Contribute missing behavior to the source instead of forking a replica.",
    ],
    checklist: sharedChecklist,
  },
  contributing: {
    overview:
      "The design system is shared infrastructure. Contributions should solve demonstrated recurring needs while preserving coherent APIs, accessibility, documentation, and package quality.",
    principles: [
      "Start with evidence from product work.",
      "Prefer extending an existing primitive or pattern over adding overlap.",
      "Document trade-offs and migration impact.",
    ],
    practice: [
      "Open a proposal with problem, constraints, and alternatives.",
      "Develop behavior through failing tests and real guide examples.",
      "Verify package output and representative browser interactions.",
    ],
    checklist: sharedChecklist,
  },
  "contributing-design": {
    overview:
      "Design contributions define a reusable decision, not a single polished screen. Show the system-level need, responsive behavior, states, content, and accessibility implications.",
    principles: [
      "Ground proposals in multiple product cases.",
      "Use existing foundations and name intentional exceptions.",
      "Design complete behavior, including failure and empty states.",
    ],
    practice: [
      "Compare extension, composition, and new-component options.",
      "Prototype with real content and constrained layouts.",
      "Review with design, content, accessibility, and engineering partners.",
    ],
    checklist: sharedChecklist,
  },
  "contributing-code": {
    overview:
      "Code contributions ship accessible owned source with stable exports, tests, documentation, and declarations. The guide must demonstrate the same implementation consumers receive.",
    principles: [
      "Use native semantics and Radix only where behavior warrants it.",
      "Write a failing behavior test before production code.",
      "Keep public APIs small, typed, and composable.",
    ],
    practice: [
      "Add source under src/components/ui and export it from the barrel.",
      "Cover pointer, keyboard, focus, disabled, and error behavior.",
      "Run lint, tests, app build, library build, and package inspection.",
    ],
    checklist: sharedChecklist,
  },
  "contributing-documentation": {
    overview:
      "Documentation explains when, why, and how to use the system. It must describe real behavior, use real package exports, and make limitations visible.",
    principles: [
      "Lead with the decision the reader needs to make.",
      "Use original prose grounded in this system’s semantics.",
      "Keep examples minimal but production-realistic.",
    ],
    practice: [
      "Document anatomy, variants, usage, accessibility, and related patterns.",
      "Verify every claim against code and rendered behavior.",
      "Use standard links so each page can be shared and opened directly.",
    ],
    checklist: sharedChecklist,
  },
  "react-setup": createArticleGuidance(
    "React setup establishes the package, stylesheet, and provider boundary once so product code can consume components without hidden configuration.",
    "Keep React runtime, portals, and theme ownership at the application boundary.",
    "Configure aliases and styles, then render an interactive overlay as the integration check.",
  ),
  typescript: createArticleGuidance(
    "TypeScript turns component APIs and token names into discoverable contracts while preserving normal React composition.",
    "Expose useful public types without leaking implementation-only dependencies.",
    "Type representative controlled and uncontrolled examples and verify declaration output.",
  ),
  "browser-support": createArticleGuidance(
    "Browser support defines the platform capabilities consumers can rely on and the degradation policy when a capability is unavailable.",
    "Base support decisions on user reach and tested behavior rather than novelty.",
    "Maintain a tested browser matrix and record intentional fallbacks beside affected features.",
  ),
  testing: createArticleGuidance(
    "System testing combines semantics, interaction, rendering, declarations, and package verification instead of treating screenshots as sufficient evidence.",
    "Test public behavior and user outcomes rather than private component structure.",
    "Cover keyboard and focus behavior first, then build and inspect the packed artifact.",
  ),
  migration: createArticleGuidance(
    "Migration guidance lets products adopt changed contracts incrementally without silent visual or behavioral forks.",
    "Deprecate before removal and name the supported replacement.",
    "Provide before-and-after code, a compatibility window, and a verification checklist.",
  ),
  "responsive-design": createArticleGuidance(
    "Responsive design preserves hierarchy and task completion as available space, input method, and text size change.",
    "Adapt composition from content pressure instead of targeting named devices.",
    "Test narrow containers, long translated copy, zoom, and touch targets together.",
  ),
  primitives: createArticleGuidance(
    "Primitives are installable low-level contracts that let themes and components resolve the same visual decisions consistently.",
    "Consume semantic aliases in product code and reserve raw scales for system construction.",
    "Start with the semantic token layer and inspect its resolved value in each theme.",
  ),
  "color-tokens": createArticleGuidance(
    "Color tokens separate categorical intent such as action, selection, warning, and success from palette implementation.",
    "Name color by role and interaction state rather than by hue.",
    "Map every alias across light and dark themes and verify contrast in context.",
  ),
  "size-and-space": createArticleGuidance(
    "Size and spacing tokens create predictable rhythm while allowing components to respond to density and content.",
    "Use a constrained scale and let component anatomy determine token choice.",
    "Measure gaps by relationship, then verify wrapping and target sizes at zoom.",
  ),
  "typography-tokens": createArticleGuidance(
    "Typography tokens encode readable hierarchy through family, size, weight, line height, and tracking contracts.",
    "Choose a text role before choosing a visual value.",
    "Apply roles to realistic long and short content across viewport sizes.",
  ),
  "motion-tokens": createArticleGuidance(
    "Motion tokens standardize duration and easing while keeping transitions purposeful and removable.",
    "Motion must explain change, preserve orientation, or confirm causality.",
    "Pair every transition with reduced-motion behavior and interruption testing.",
  ),
  "token-naming": createArticleGuidance(
    "Token names describe stable design intent so implementations may evolve without forcing product-level renaming.",
    "Move from namespace to category, concept, property, variant, and state consistently.",
    "Review names in real component code and reject aliases tied only to current appearance.",
  ),
  themes: createArticleGuidance(
    "Themes resolve the same semantic contract into mode-appropriate surfaces, text, borders, and categorical accents.",
    "Treat dark mode as an explicit system instead of mechanically inverting values.",
    "Audit nested surfaces, focus, code, disabled states, and system preference startup.",
  ),
  "token-migration": createArticleGuidance(
    "Token migration replaces deprecated aliases without changing product meaning or leaving hard-coded fallback values.",
    "Publish alias replacements and removal timing with the deprecation.",
    "Search consumers, apply codemods where safe, and visually compare representative workflows.",
  ),
  "form-content": createArticleGuidance(
    "Form content helps people understand what to provide, why it is needed, and how to recover when a value is rejected.",
    "Use persistent labels and put requirements before submission.",
    "Write labels, help, examples, and validation together for one realistic task.",
  ),
  "error-content": createArticleGuidance(
    "Error language explains what failed, what remains safe, and the next action without blaming the person.",
    "Be specific, proportionate, and recovery-oriented.",
    "Place field guidance near the cause and summarize blocking errors at submission.",
  ),
  "notification-content": createArticleGuidance(
    "Notification content communicates completion, change, or risk at a prominence matching its consequence and urgency.",
    "Lead with the outcome and avoid redundant status language.",
    "Choose inline, banner, toast, or dialog delivery before drafting the message.",
  ),
  localization: createArticleGuidance(
    "Localization prepares structure and language for translation, regional formats, bidirectional text, and culturally variable expectations.",
    "Do not concatenate fragments or encode grammar in layout.",
    "Test expanded copy, locale-aware data, and right-to-left reading order.",
  ),
  "inclusive-language": createArticleGuidance(
    "Inclusive language respects people, avoids hidden assumptions, and keeps identity relevant only when it serves the task.",
    "Use person-centered terms and plain language without euphemistic ambiguity.",
    "Review examples, defaults, names, and demographic choices with affected perspectives.",
  ),
  "errors-and-recovery": createArticleGuidance(
    "Error and recovery patterns preserve context, work, and a clear route forward across validation, permissions, connectivity, and system failure.",
    "Prevent errors where possible and make destructive consequences reversible.",
    "Map failure points, retained state, retry behavior, escalation, and offline handling.",
  ),
  "semantic-html": createArticleGuidance(
    "Semantic HTML supplies robust names, roles, relationships, and native interaction before ARIA or custom scripting is considered.",
    "Use the native element whose behavior matches the interaction.",
    "Inspect the accessibility tree and operate the complete task with a keyboard.",
  ),
  "text-resizing": createArticleGuidance(
    "Text resizing guidance keeps content readable and controls operable at browser zoom and increased text settings without clipping or loss.",
    "Allow reflow and avoid fixed dimensions around user-facing text.",
    "Test at 200 percent zoom, narrow width, and with long localized labels.",
  ),
  "images-alt-text": createArticleGuidance(
    "Alternative text communicates an image’s purpose in context while decorative imagery remains silent to assistive technology.",
    "Describe the information or action, not the pixels or file type.",
    "Decide whether the image is informative, functional, complex, or decorative before writing text.",
  ),
  announcements: createArticleGuidance(
    "Announcements expose meaningful asynchronous changes without stealing focus or repeating every visual update.",
    "Use live regions sparingly and match politeness to urgency.",
    "Test loading completion, validation, saved state, and new content with a screen reader.",
  ),
  "accessibility-testing": createArticleGuidance(
    "Accessibility testing combines automated rules with keyboard, zoom, contrast, and assistive-technology review of complete workflows.",
    "Automation finds classes of defects but cannot establish usability.",
    "Define a repeatable manual script and record browser and assistive-technology coverage.",
  ),
  "accessibility-tools": createArticleGuidance(
    "Accessibility tools support annotation, inspection, scanning, and review but remain evidence sources rather than substitutes for judgment.",
    "Choose tools for a known question and understand their blind spots.",
    "Run linting and browser scans, then manually verify semantics and task completion.",
  ),
  icons: createArticleGuidance(
    "The icon library provides a shared symbol vocabulary aligned with component sizing, stroke weight, and product meaning.",
    "Prefer familiar symbols and pair ambiguity with visible text.",
    "Search by intent, inspect nearby symbols, and test the choice in its final control.",
  ),
  "icon-catalog": createArticleGuidance(
    "The icon catalog organizes symbols by concept and exposes names that map directly to supported React imports.",
    "One canonical icon should represent each recurring system concept.",
    "Browse by task, compare candidates at intended size, and verify package availability.",
  ),
  "icon-usage": createArticleGuidance(
    "Icon usage guidance keeps symbols consistently sized, aligned, spaced, and paired with labels across controls and content.",
    "Use icons to reinforce meaning rather than replace necessary language.",
    "Align to the text optical center and use component-owned sizing tokens.",
  ),
  "icon-accessibility": createArticleGuidance(
    "Icon accessibility distinguishes decorative marks from meaningful images and icon-only controls that require accessible names.",
    "Hide decoration and name the interactive control rather than the glyph.",
    "Inspect accessible names and test icon-only controls with speech and keyboard input.",
  ),
  "propose-component": createArticleGuidance(
    "A component proposal demonstrates a recurring cross-product need, a coherent contract, and why existing primitives cannot solve it well.",
    "Expand the system only when reuse and ownership justify long-term support.",
    "Bring product evidence, anatomy, states, API direction, accessibility, and alternatives.",
  ),
  "quality-checklist": createArticleGuidance(
    "The contribution quality checklist turns design-system acceptance into visible evidence across design, code, content, accessibility, and release readiness.",
    "A component is complete only when consumers can adopt and verify it.",
    "Review exports, declarations, examples, interactions, themes, responsive behavior, and migration impact.",
  ),
  "release-process": {
    overview:
      "A release moves a verified system change into consumer workflows with clear compatibility, migration, and ownership expectations.",
    principles: [
      "Use semantic versioning based on consumer impact.",
      "Publish migration guidance with breaking changes.",
      "Keep release notes focused on adoption decisions.",
    ],
    practice: [
      "Verify declarations and the packed artifact from a clean checkout.",
      "Test representative consumers before publishing.",
      "Announce deprecations before removals and provide replacements.",
    ],
    checklist: sharedChecklist,
  },
};

export const defaultArticleGuidance: ArticleGuidance = {
  overview:
    "This guidance turns a recurring design-system concern into shared decisions that can be applied, reviewed, and improved across products.",
  principles: [
    "Start from user intent and product consequence.",
    "Prefer existing semantic foundations and accessible components.",
    "Document exceptions and validate them with realistic content.",
  ],
  practice: [
    "Apply the guidance to one representative workflow.",
    "Review behavior across themes, viewport sizes, and input methods.",
    "Share evidence and improvements with the system owners.",
  ],
  checklist: sharedChecklist,
};
