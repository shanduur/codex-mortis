import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

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

  it("composes with lazy-loaded links without losing behavior", async () => {
    const handleClick = vi.fn();
    const LazyLink = React.lazy(async () => ({
      default: React.forwardRef<HTMLAnchorElement, React.ComponentProps<"a">>(
        function LazyLink(props, ref) {
          return <a ref={ref} {...props} />;
        },
      ),
    }));

    render(
      <React.Suspense fallback="Loading action…">
        <Button asChild onClick={handleClick}>
          <LazyLink
            href="/components/"
            onClick={(event) => event.preventDefault()}
          >
            Explore components
          </LazyLink>
        </Button>
      </React.Suspense>,
    );

    const link = await screen.findByRole("link", { name: "Explore components" });
    expect(link).toHaveAttribute("href", "/components/");
    expect(link).toHaveAttribute("data-slot", "button");
    expect(link).toHaveClass("rounded-none", "bg-primary");

    fireEvent.click(link);
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
