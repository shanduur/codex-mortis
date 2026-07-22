import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "./button";

describe("Button", () => {
  it("renders accessible button content", () => {
    render(<Button>Save changes</Button>);
    expect(
      screen.getByRole("button", { name: "Save changes" }),
    ).toBeInTheDocument();
  });

  it("uses sharp corners and physical hard-shadow interaction states", () => {
    render(<Button>Deploy</Button>);
    expect(screen.getByRole("button", { name: "Deploy" })).toHaveClass(
      "rounded-none",
      "shadow-sm",
      "hover:-translate-x-px",
      "hover:-translate-y-px",
      "active:translate-x-[3px]",
      "active:translate-y-[3px]",
      "active:shadow-none",
    );
  });

  it("supports semantic variants and disabled state", () => {
    render(
      <Button variant="destructive" disabled>
        Delete
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("bg-destructive");
  });
});
