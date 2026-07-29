/**
 * Clerk appearance values backed by Codex Mortis semantic tokens.
 *
 * Apply this object to ClerkProvider so authentication forms, account menus,
 * and avatars follow the same light and dark theme as the component library.
 */
export const codexMortisClerkAppearance = {
  variables: {
    colorPrimary: "var(--primary)",
    colorPrimaryForeground: "var(--primary-foreground)",
    colorDanger: "var(--destructive)",
    colorSuccess: "var(--status-green)",
    colorWarning: "var(--signal-yellow)",
    colorNeutral: "var(--foreground)",
    colorForeground: "var(--foreground)",
    colorMuted: "var(--muted)",
    colorMutedForeground: "var(--muted-foreground)",
    colorBackground: "var(--card)",
    colorInput: "var(--background)",
    colorInputForeground: "var(--foreground)",
    colorRing: "var(--ring)",
    colorBorder: "var(--border)",
    colorShadow: "var(--shadow-color)",
    fontFamily: "var(--font-sans)",
    fontFamilyButtons: "var(--font-sans)",
    borderRadius: "var(--radius)",
  },
  elements: {
    rootBox: "w-full",
    cardBox: "w-full max-w-md shadow-none",
    card: "w-full rounded-none border border-border bg-card text-card-foreground shadow-md",
    headerTitle:
      "font-sans text-2xl font-semibold tracking-tight text-foreground",
    headerSubtitle: "text-muted-foreground",
    socialButtonsBlockButton:
      "rounded-none border-border bg-background text-foreground shadow-none hover:bg-accent hover:text-accent-foreground",
    socialButtonsProviderIcon__apple: "dark:invert",
    socialButtonsProviderIcon__github: "dark:invert",
    socialButtonsBlockButtonText: "font-medium",
    dividerLine: "bg-border",
    dividerText:
      "font-mono text-xs uppercase tracking-wider text-muted-foreground",
    formFieldLabel:
      "font-mono text-xs font-medium uppercase tracking-wider text-foreground",
    formFieldInput:
      "rounded-none border-input bg-background text-foreground shadow-none focus:border-ring focus:ring-ring",
    formFieldAction: "font-medium text-primary hover:text-primary/80",
    formButtonPrimary:
      "rounded-none bg-primary font-medium normal-case text-primary-foreground shadow-sm hover:bg-primary/90",
    footerActionText: "text-muted-foreground",
    footerActionLink: "font-medium text-primary hover:text-primary/80",
    identityPreview: "rounded-none border border-border bg-muted",
    identityPreviewEditButton: "text-primary hover:text-primary/80",
    userButtonTrigger: "rounded-none focus:shadow-none",
    userButtonAvatarBox: "rounded-none border border-border",
    userButtonPopoverCard:
      "rounded-none border border-border bg-popover text-popover-foreground shadow-md",
    userButtonPopoverActionButton:
      "rounded-none text-foreground hover:bg-accent hover:text-accent-foreground",
    userButtonPopoverFooter: "border-t border-border bg-muted",
  },
} as const;

export type CodexMortisClerkAppearance = typeof codexMortisClerkAppearance;
