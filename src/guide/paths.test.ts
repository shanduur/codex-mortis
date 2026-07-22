import { describe, expect, it } from "vitest";

import { guideHref, guidePathname } from "./paths";

describe("guide deployment paths", () => {
  it("keeps root-hosted guide paths unchanged", () => {
    expect(guideHref("/components/button/", "/")).toBe("/components/button/");
    expect(guidePathname("/components/button/", "/")).toBe(
      "/components/button/",
    );
  });

  it("prefixes links and resolves pages below a GitHub Pages project base", () => {
    expect(guideHref("/", "/codex-mortis/")).toBe("/codex-mortis/");
    expect(guideHref("/components/button/", "/codex-mortis/")).toBe(
      "/codex-mortis/components/button/",
    );
    expect(
      guidePathname(
        "/codex-mortis/components/button/index.html",
        "/codex-mortis/",
      ),
    ).toBe("/components/button/");
  });
});
