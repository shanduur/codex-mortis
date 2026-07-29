import { describe, expect, it } from "vitest";

import { codexMortisClerkAppearance } from "../index";

describe("codexMortisClerkAppearance", () => {
  it("maps Clerk colors and typography to Codex Mortis semantic tokens", () => {
    expect(codexMortisClerkAppearance.variables).toMatchObject({
      colorPrimary: "var(--primary)",
      colorPrimaryForeground: "var(--primary-foreground)",
      colorDanger: "var(--destructive)",
      colorSuccess: "var(--status-green)",
      colorWarning: "var(--signal-yellow)",
      colorForeground: "var(--foreground)",
      colorMuted: "var(--muted)",
      colorMutedForeground: "var(--muted-foreground)",
      colorBackground: "var(--card)",
      colorInput: "var(--background)",
      colorInputForeground: "var(--foreground)",
      colorRing: "var(--ring)",
      colorBorder: "var(--border)",
      fontFamily: "var(--font-sans)",
      fontFamilyButtons: "var(--font-sans)",
      borderRadius: "var(--radius)",
    });
  });

  it("gives authentication cards, controls, and account menus the same material treatment", () => {
    expect(codexMortisClerkAppearance.elements).toMatchObject({
      rootBox: expect.stringContaining("w-full"),
      card: expect.stringContaining("rounded-none"),
      formFieldInput: expect.stringContaining("border-input"),
      formButtonPrimary: expect.stringContaining("bg-primary"),
      socialButtonsBlockButton: expect.stringContaining("rounded-none"),
      userButtonAvatarBox: expect.stringContaining("rounded-none"),
      userButtonPopoverCard: expect.stringContaining("rounded-none"),
      userButtonPopoverActionButton: expect.stringContaining("hover:bg-accent"),
    });
  });

  it("keeps monochrome social provider icons legible in dark mode", () => {
    expect(codexMortisClerkAppearance.elements).toMatchObject({
      socialButtonsProviderIcon__apple: expect.stringContaining("dark:invert"),
      socialButtonsProviderIcon__github: expect.stringContaining("dark:invert"),
    });
  });
});
