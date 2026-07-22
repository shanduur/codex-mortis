export type GuideGroup =
  | "Getting started"
  | "Foundations"
  | "Primitives"
  | "Guidelines"
  | "UI patterns"
  | "Scenario patterns"
  | "Components"
  | "Accessibility"
  | "Icons"
  | "Contributing"
  | "Showcase";

export type GuideEntry = {
  id: string;
  name: string;
  description: string;
  group: GuideGroup;
  path: string;
  status?: "Stable" | "Draft";
};

const foundationDefinitions: Omit<GuideEntry, "path">[] = [
  {
    id: "introduction",
    name: "Introduction",
    description: "Purpose and design posture",
    group: "Foundations",
  },
  {
    id: "principles",
    name: "Principles",
    description: "Rules behind the visual language",
    group: "Foundations",
  },
  {
    id: "colors",
    name: "Color",
    description: "Semantic color tokens",
    group: "Foundations",
  },
  {
    id: "typography",
    name: "Typography",
    description: "Editorial scale and technical detail",
    group: "Foundations",
  },
  {
    id: "spacing",
    name: "Spacing",
    description: "Rhythm, density, and alignment",
    group: "Foundations",
  },
];

const componentDefinitions: Omit<GuideEntry, "path">[] = [
  {
    id: "accordion",
    name: "Accordion",
    description: "Reveal related content sections",
    group: "Components",
    status: "Stable",
  },
  {
    id: "alert",
    name: "Alert",
    description: "Communicate important state",
    group: "Components",
    status: "Stable",
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Represent a person or entity",
    group: "Components",
    status: "Stable",
  },
  {
    id: "badge",
    name: "Badge",
    description: "Label status or metadata",
    group: "Components",
    status: "Stable",
  },
  {
    id: "banner",
    name: "Banner",
    description: "Announce page-level information",
    group: "Components",
    status: "Stable",
  },
  {
    id: "breadcrumb",
    name: "Breadcrumb",
    description: "Show the current location",
    group: "Components",
    status: "Stable",
  },
  {
    id: "button",
    name: "Button",
    description: "Trigger an action",
    group: "Components",
    status: "Stable",
  },
  {
    id: "button-group",
    name: "Button Group",
    description: "Group related actions",
    group: "Components",
    status: "Stable",
  },
  {
    id: "card",
    name: "Card",
    description: "Group related information",
    group: "Components",
    status: "Stable",
  },
  {
    id: "checkbox",
    name: "Checkbox",
    description: "Select one or more options",
    group: "Components",
    status: "Stable",
  },
  {
    id: "collapsible",
    name: "Collapsible",
    description: "Show or hide supporting content",
    group: "Components",
    status: "Stable",
  },
  {
    id: "combobox",
    name: "Combobox",
    description: "Search and select an option",
    group: "Components",
    status: "Stable",
  },
  {
    id: "container",
    name: "Container",
    description: "Constrain page content width",
    group: "Components",
    status: "Stable",
  },
  {
    id: "date-picker",
    name: "Date Picker",
    description: "Select a calendar date",
    group: "Components",
    status: "Stable",
  },
  {
    id: "description-list",
    name: "Description List",
    description: "Pair terms with descriptions",
    group: "Components",
    status: "Stable",
  },
  {
    id: "dialog",
    name: "Dialog",
    description: "Focus a short task",
    group: "Components",
    status: "Stable",
  },
  {
    id: "divider",
    name: "Divider",
    description: "Separate related content",
    group: "Components",
    status: "Stable",
  },
  {
    id: "drawer",
    name: "Drawer",
    description: "Open a task from the screen edge",
    group: "Components",
    status: "Stable",
  },
  {
    id: "empty-state",
    name: "Empty State",
    description: "Explain an area without content",
    group: "Components",
    status: "Stable",
  },
  {
    id: "fieldset",
    name: "Fieldset",
    description: "Group related form controls",
    group: "Components",
    status: "Stable",
  },
  {
    id: "file-upload",
    name: "File Upload",
    description: "Select files for upload",
    group: "Components",
    status: "Stable",
  },
  {
    id: "form",
    name: "Form",
    description: "Collect and submit structured data",
    group: "Components",
    status: "Stable",
  },
  {
    id: "form-error-summary",
    name: "Form Error Summary",
    description: "Summarize validation problems",
    group: "Components",
    status: "Stable",
  },
  {
    id: "form-field",
    name: "Form Field",
    description: "Connect labels, controls, and help",
    group: "Components",
    status: "Stable",
  },
  {
    id: "form-section",
    name: "Form Section",
    description: "Organize related form fields",
    group: "Components",
    status: "Stable",
  },
  {
    id: "grid",
    name: "Grid",
    description: "Arrange content in columns",
    group: "Components",
    status: "Stable",
  },
  {
    id: "header",
    name: "Header",
    description: "Introduce a page or region",
    group: "Components",
    status: "Stable",
  },
  {
    id: "heading",
    name: "Heading",
    description: "Name a content section",
    group: "Components",
    status: "Stable",
  },
  {
    id: "icon",
    name: "Icon",
    description: "Display a symbolic visual",
    group: "Components",
    status: "Stable",
  },
  {
    id: "image",
    name: "Image",
    description: "Present responsive visual content",
    group: "Components",
    status: "Stable",
  },
  {
    id: "input",
    name: "Input",
    description: "Collect a short value",
    group: "Components",
    status: "Stable",
  },
  {
    id: "input-group",
    name: "Input Group",
    description: "Combine an input with adjacent controls",
    group: "Components",
    status: "Stable",
  },
  {
    id: "link",
    name: "Link",
    description: "Navigate to another location",
    group: "Components",
    status: "Stable",
  },
  {
    id: "list",
    name: "List",
    description: "Present related items",
    group: "Components",
    status: "Stable",
  },
  {
    id: "main",
    name: "Main",
    description: "Identify the primary page content",
    group: "Components",
    status: "Stable",
  },
  {
    id: "menu",
    name: "Menu",
    description: "Offer a compact set of actions",
    group: "Components",
    status: "Stable",
  },
  {
    id: "navigation-menu",
    name: "Navigation Menu",
    description: "Navigate between major destinations",
    group: "Components",
    status: "Stable",
  },
  {
    id: "number-input",
    name: "Number Input",
    description: "Collect a numeric value",
    group: "Components",
    status: "Stable",
  },
  {
    id: "page",
    name: "Page",
    description: "Compose a complete application page",
    group: "Components",
    status: "Stable",
  },
  {
    id: "page-header",
    name: "Page Header",
    description: "Introduce page context and actions",
    group: "Components",
    status: "Stable",
  },
  {
    id: "pagination",
    name: "Pagination",
    description: "Move through paged content",
    group: "Components",
    status: "Stable",
  },
  {
    id: "popover",
    name: "Popover",
    description: "Show contextual interactive content",
    group: "Components",
    status: "Stable",
  },
  {
    id: "progress",
    name: "Progress",
    description: "Show task completion",
    group: "Components",
    status: "Stable",
  },
  {
    id: "prose",
    name: "Prose",
    description: "Style long-form content",
    group: "Components",
    status: "Stable",
  },
  {
    id: "radio-group",
    name: "Radio Group",
    description: "Choose one option from a set",
    group: "Components",
    status: "Stable",
  },
  {
    id: "select",
    name: "Select",
    description: "Choose an option from a list",
    group: "Components",
    status: "Stable",
  },
  {
    id: "sidebar",
    name: "Sidebar",
    description: "Provide secondary navigation",
    group: "Components",
    status: "Stable",
  },
  {
    id: "skeleton",
    name: "Skeleton",
    description: "Represent loading content",
    group: "Components",
    status: "Stable",
  },
  {
    id: "skip-link",
    name: "Skip Link",
    description: "Bypass repeated navigation",
    group: "Components",
    status: "Stable",
  },
  {
    id: "slider",
    name: "Slider",
    description: "Choose a value from a range",
    group: "Components",
    status: "Stable",
  },
  {
    id: "spinner",
    name: "Spinner",
    description: "Indicate indeterminate activity",
    group: "Components",
    status: "Stable",
  },
  {
    id: "stack",
    name: "Stack",
    description: "Arrange children with consistent space",
    group: "Components",
    status: "Stable",
  },
  {
    id: "stat",
    name: "Stat",
    description: "Highlight a key measurement",
    group: "Components",
    status: "Stable",
  },
  {
    id: "status-indicator",
    name: "Status Indicator",
    description: "Pair a state marker with a label",
    group: "Components",
    status: "Stable",
  },
  {
    id: "stepper",
    name: "Stepper",
    description: "Show progress through ordered steps",
    group: "Components",
    status: "Stable",
  },
  {
    id: "switch",
    name: "Switch",
    description: "Toggle an immediate setting",
    group: "Components",
    status: "Stable",
  },
  {
    id: "table",
    name: "Table",
    description: "Display structured tabular data",
    group: "Components",
    status: "Stable",
  },
  {
    id: "table-of-contents",
    name: "Table of Contents",
    description: "Navigate long-form sections",
    group: "Components",
    status: "Stable",
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Switch between related views",
    group: "Components",
    status: "Stable",
  },
  {
    id: "text",
    name: "Text",
    description: "Render semantic body text",
    group: "Components",
    status: "Stable",
  },
  {
    id: "textarea",
    name: "Textarea",
    description: "Collect longer text",
    group: "Components",
    status: "Stable",
  },
  {
    id: "time-picker",
    name: "Time Picker",
    description: "Select a time",
    group: "Components",
    status: "Stable",
  },
  {
    id: "toast",
    name: "Toast",
    description: "Report transient feedback",
    group: "Components",
    status: "Stable",
  },
  {
    id: "toggle",
    name: "Toggle",
    description: "Switch a pressed state",
    group: "Components",
    status: "Stable",
  },
  {
    id: "toggle-group",
    name: "Toggle Group",
    description: "Choose one or more pressed options",
    group: "Components",
    status: "Stable",
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Describe an element on hover or focus",
    group: "Components",
    status: "Stable",
  },
];

export const foundationEntries: GuideEntry[] = foundationDefinitions.map(
  (entry) => ({
    ...entry,
    path:
      entry.id === "introduction"
        ? "/"
        : `/foundations/${entry.id === "colors" ? "color" : entry.id}/`,
  }),
);

export const componentEntries: GuideEntry[] = componentDefinitions.map(
  (entry) => ({
    ...entry,
    path: `/components/${entry.id}/`,
  }),
);

type DocumentationDefinition = readonly [
  id: string,
  name: string,
  description: string,
  slug?: string,
];

function createDocumentationEntries(
  group: GuideGroup,
  base: string,
  definitions: DocumentationDefinition[],
): GuideEntry[] {
  return definitions.map(([id, name, description, slug = id]) => ({
    id,
    name,
    description,
    group,
    path: slug ? `/${base}/${slug}/` : `/${base}/`,
  }));
}

export const gettingStartedEntries = createDocumentationEntries(
  "Getting started",
  "getting-started",
  [
    [
      "getting-started",
      "Getting started",
      "Adopt the design system in product work",
      "",
    ],
    ["installation", "Installation", "Install styles, components, and peers"],
    [
      "component-status",
      "Component status",
      "Understand support, maturity, and ownership",
    ],
    [
      "design-resources",
      "Design resources",
      "Move between design files and production code",
    ],
    ["react-setup", "React setup", "Configure imports, styles, and providers"],
    ["typescript", "TypeScript", "Use component and token types safely"],
    [
      "browser-support",
      "Browser support",
      "Define supported platform behavior",
    ],
    [
      "testing",
      "Testing",
      "Verify semantics, interaction, and visual behavior",
    ],
    [
      "migration",
      "Migration",
      "Adopt system changes without breaking products",
    ],
  ],
);

export const additionalFoundationEntries = createDocumentationEntries(
  "Foundations",
  "foundations",
  [
    [
      "foundations",
      "Foundations",
      "Shared decisions beneath every interface",
      "",
    ],
    ["layout", "Layout", "Responsive containers, grids, and composition"],
    [
      "responsive-design",
      "Responsive design",
      "Adapt hierarchy and interaction across available space",
    ],
    ["iconography", "Iconography", "Symbols, sizing, and accessible labels"],
    ["motion", "Motion", "Purposeful transitions and reduced-motion behavior"],
    ["elevation", "Elevation", "Surface hierarchy without decorative depth"],
    [
      "design-tokens",
      "Design tokens",
      "Semantic contracts for visual decisions",
    ],
  ],
);

export const primitiveEntries = createDocumentationEntries(
  "Primitives",
  "primitives",
  [
    [
      "primitives",
      "Primitives",
      "Use installable tokens as system contracts",
      "",
    ],
    ["color-tokens", "Color tokens", "Map raw values to semantic color roles"],
    [
      "size-and-space",
      "Size and space",
      "Apply shared dimensions and spacing scales",
    ],
    [
      "typography-tokens",
      "Typography tokens",
      "Encode type families, sizes, weights, and leading",
    ],
    ["motion-tokens", "Motion tokens", "Standardize duration and easing"],
    [
      "token-naming",
      "Token naming",
      "Name decisions by purpose instead of appearance",
    ],
    ["themes", "Themes", "Resolve semantic tokens across color modes"],
    [
      "token-migration",
      "Token migration",
      "Replace deprecated values predictably",
      "migration",
    ],
  ],
);

export const guidelineEntries = createDocumentationEntries(
  "Guidelines",
  "guidelines",
  [
    [
      "guidelines",
      "Content guidelines",
      "Write product language with clarity",
      "",
    ],
    [
      "voice-and-tone",
      "Voice and tone",
      "Stay direct, calm, and technically credible",
    ],
    ["writing", "Writing", "Structure useful interface and documentation copy"],
    ["ui-text", "UI text", "Write labels, actions, help, and errors"],
    [
      "grammar",
      "Grammar and mechanics",
      "Apply consistent editorial conventions",
    ],
    [
      "formatting-data",
      "Formatting data",
      "Present dates, numbers, units, and code",
    ],
    [
      "form-content",
      "Form content",
      "Write labels, help, requirements, and validation",
    ],
    [
      "error-content",
      "Errors",
      "Explain failure and provide a recoverable next step",
      "errors",
    ],
    [
      "notification-content",
      "Notifications",
      "Write timely feedback at the right level of urgency",
      "notifications",
    ],
    [
      "localization",
      "Localization",
      "Design language that survives translation",
    ],
    [
      "inclusive-language",
      "Inclusive language",
      "Use respectful language without hidden assumptions",
    ],
  ],
);

export const patternEntries = createDocumentationEntries(
  "UI patterns",
  "patterns",
  [
    [
      "patterns",
      "UI patterns",
      "Compose components into repeatable experiences",
      "",
    ],
    ["data-display", "Data display", "Make dense information scannable"],
    [
      "degraded-experiences",
      "Degraded experiences",
      "Preserve understanding when systems fail",
    ],
    ["empty-states", "Empty states", "Explain absence and provide a next step"],
    [
      "feature-onboarding",
      "Feature onboarding",
      "Introduce capability in context",
    ],
    [
      "forms-pattern",
      "Forms",
      "Collect information with progressive clarity",
      "forms",
    ],
    [
      "loading-pattern",
      "Loading",
      "Communicate waiting and preserve layout",
      "loading",
    ],
    [
      "navigation-pattern",
      "Navigation",
      "Build predictable wayfinding and orientation",
      "navigation",
    ],
    [
      "notification-messaging",
      "Notification messaging",
      "Match feedback prominence to consequence",
    ],
    [
      "errors-and-recovery",
      "Errors and recovery",
      "Keep failures understandable, reversible, and actionable",
    ],
    [
      "progressive-disclosure",
      "Progressive disclosure",
      "Reveal complexity when it becomes relevant",
    ],
    [
      "saving-pattern",
      "Saving",
      "Make persistence and recovery explicit",
      "saving",
    ],
  ],
);

export const scenarioEntries = createDocumentationEntries(
  "Scenario patterns",
  "scenarios",
  [
    [
      "scenarios",
      "Scenario patterns",
      "Solve common product tasks consistently",
      "",
    ],
    [
      "create-and-edit",
      "Create and edit",
      "Structure reversible authoring workflows",
    ],
    [
      "copy-scenario",
      "Copy",
      "Duplicate content without hiding consequences",
      "copy",
    ],
    [
      "delete-scenario",
      "Delete",
      "Confirm destructive intent proportionally",
      "delete",
    ],
    [
      "filter-scenario",
      "Filter",
      "Narrow datasets while preserving context",
      "filter",
    ],
    [
      "search-scenario",
      "Search",
      "Help people find and refine results",
      "search",
    ],
  ],
);

export const accessibilityEntries = createDocumentationEntries(
  "Accessibility",
  "accessibility",
  [
    [
      "accessibility",
      "Accessibility",
      "Build equivalent and robust experiences",
      "",
    ],
    [
      "keyboard-navigation",
      "Keyboard navigation",
      "Reach and operate every interaction without a pointer",
    ],
    [
      "focus-management",
      "Focus management",
      "Keep focus visible and predictable",
    ],
    [
      "screen-readers",
      "Screen readers",
      "Expose useful names, roles, and states",
    ],
    [
      "color-contrast",
      "Color and contrast",
      "Preserve meaning without relying on hue",
    ],
    [
      "accessible-motion",
      "Accessible motion",
      "Respect vestibular and attention needs",
    ],
    [
      "semantic-html",
      "Semantic HTML",
      "Start with native roles, names, and behavior",
    ],
    [
      "text-resizing",
      "Text resizing",
      "Preserve content and operation through reflow",
    ],
    [
      "images-alt-text",
      "Images and alternative text",
      "Describe purpose without duplicating nearby content",
      "images-and-alt-text",
    ],
    [
      "announcements",
      "Announcements",
      "Communicate asynchronous updates without moving focus",
    ],
    [
      "accessibility-testing",
      "Accessibility testing",
      "Combine automated checks with manual assistive-technology review",
      "testing",
    ],
    [
      "accessibility-tools",
      "Tools and resources",
      "Use annotations, browser tools, and CI scanning responsibly",
      "tools-and-resources",
    ],
    [
      "accessibility-checklists",
      "Accessibility checklists",
      "Review design, code, content, and testing",
      "checklists",
    ],
  ],
);

export const iconEntries = createDocumentationEntries("Icons", "icons", [
  [
    "icons",
    "Icon library",
    "Find and apply a consistent symbol vocabulary",
    "",
  ],
  [
    "icon-catalog",
    "Icon catalog",
    "Browse symbols by concept and product intent",
    "catalog",
  ],
  [
    "icon-usage",
    "Icon usage",
    "Choose, size, align, and pair symbols with text",
    "usage",
  ],
  [
    "icon-accessibility",
    "Icon accessibility",
    "Hide decoration and label meaningful controls",
    "accessibility",
  ],
]);

export const contributingEntries = createDocumentationEntries(
  "Contributing",
  "contributing",
  [
    [
      "contributing",
      "Contributing",
      "Improve the system through shared ownership",
      "",
    ],
    [
      "contributing-design",
      "Design contributions",
      "Propose coherent visual decisions",
      "design",
    ],
    [
      "contributing-code",
      "Code contributions",
      "Ship tested accessible components",
      "code",
    ],
    [
      "contributing-documentation",
      "Documentation contributions",
      "Keep guidance practical and verifiable",
      "documentation",
    ],
    [
      "propose-component",
      "Propose a component",
      "Demonstrate a reusable need before expanding the system",
      "propose-a-component",
    ],
    [
      "quality-checklist",
      "Quality checklist",
      "Verify design, behavior, accessibility, and documentation",
    ],
    [
      "release-process",
      "Release process",
      "Move changes from proposal to adoption",
    ],
  ],
);

export const componentOverviewEntries = createDocumentationEntries(
  "Components",
  "components",
  [
    [
      "components",
      "Components",
      "Reusable building blocks and their contracts",
      "",
    ],
  ],
);

export const showcaseEntries = createDocumentationEntries(
  "Showcase",
  "showcase",
  [
    [
      "showcase",
      "Showcase",
      "Explore Codex Mortis in complete product contexts",
      "",
    ],
    [
      "showcase-landing",
      "Landing page",
      "Public cloud product marketing",
      "landing",
    ],
    ["showcase-login", "Login", "Secure cloud console authentication", "login"],
    [
      "showcase-dashboard",
      "Dashboard",
      "Account operations overview",
      "dashboard",
    ],
    [
      "showcase-cloud",
      "Cloud console",
      "Infrastructure control plane",
      "cloud",
    ],
    [
      "showcase-virtual-machines",
      "Virtual machines",
      "Compute fleet and machine configuration",
      "cloud/virtual-machines",
    ],
    [
      "showcase-containers",
      "Containers",
      "Workload health and rollout status",
      "cloud/containers",
    ],
    ["showcase-billing", "Billing", "Usage, budgets, and invoices", "billing"],
    [
      "showcase-settings",
      "Settings",
      "Organization administration",
      "settings",
    ],
    ["showcase-markets", "Markets", "Fictional trading workspace", "markets"],
  ],
);

const introductionEntry = foundationEntries.find(
  (entry) => entry.id === "introduction",
)!;
const coreFoundationEntries = foundationEntries.filter(
  (entry) => entry.id !== "introduction",
);

export const navigationSections = [
  {
    label: "Getting started",
    entries: [introductionEntry, ...gettingStartedEntries],
  },
  {
    label: "Foundations",
    entries: [...additionalFoundationEntries, ...coreFoundationEntries],
  },
  { label: "Primitives", entries: primitiveEntries },
  { label: "Guidelines", entries: guidelineEntries },
  { label: "UI patterns", entries: patternEntries },
  { label: "Scenario patterns", entries: scenarioEntries },
  {
    label: "Components",
    entries: [...componentOverviewEntries, ...componentEntries],
  },
  { label: "Accessibility", entries: accessibilityEntries },
  { label: "Icons", entries: iconEntries },
  { label: "Contributing", entries: contributingEntries },
  { label: "Showcase", entries: showcaseEntries },
] satisfies { label: GuideGroup; entries: GuideEntry[] }[];

export const documentationEntries = [
  ...gettingStartedEntries,
  ...additionalFoundationEntries,
  ...primitiveEntries,
  ...guidelineEntries,
  ...patternEntries,
  ...scenarioEntries,
  ...accessibilityEntries,
  ...iconEntries,
  ...contributingEntries,
  ...componentOverviewEntries,
  ...showcaseEntries,
];

export const guideEntries = [
  ...foundationEntries,
  ...documentationEntries,
  ...componentEntries,
];

export function isGuideEntry(id: string): boolean {
  return guideEntries.some((entry) => entry.id === id);
}
