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
    expect(guideHref("/", "/design-language/")).toBe("/design-language/");
    expect(guideHref("/components/button/", "/design-language/")).toBe(
      "/design-language/components/button/",
    );
    expect(
      guidePathname(
        "/design-language/components/button/index.html",
        "/design-language/",
      ),
    ).toBe("/components/button/");
  });
});
