import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ComponentPage } from "./component-page";
import { componentEntries } from "./registry";

describe("component guide coverage", () => {
  it.each(componentEntries)("renders a live $name guide", (entry) => {
    render(<ComponentPage id={entry.id} />);

    expect(
      screen.getByRole("heading", { name: entry.name }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(`${entry.name} component examples`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(
          `import \\{ .*${entry.name.replaceAll(" ", "").split(/(?=[A-Z])/)[0]}`,
          "i",
        ),
      ),
    ).toBeInTheDocument();
  });
});
