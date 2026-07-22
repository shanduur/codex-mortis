import * as React from "react";
import { cn } from "@/lib/utils";

type TextProps = React.HTMLAttributes<HTMLElement> & {
  as?: "p" | "span" | "div";
  tone?: "default" | "muted";
};
export function Text({
  as = "p",
  className,
  tone = "default",
  ...props
}: TextProps) {
  return React.createElement(as, {
    "data-slot": "text",
    className: cn(
      "text-sm leading-6",
      tone === "muted" && "text-muted-foreground",
      className,
    ),
    ...props,
  });
}
