import * as React from "react";
import { cn } from "@/lib/utils";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};
const styles = {
  1: "text-4xl sm:text-5xl",
  2: "text-3xl sm:text-4xl",
  3: "text-2xl",
  4: "text-xl",
  5: "text-lg",
  6: "text-base",
};
export function Heading({ className, level = 2, ...props }: HeadingProps) {
  return React.createElement(`h${level}`, {
    "data-slot": "heading",
    className: cn("font-medium tracking-tight", styles[level], className),
    ...props,
  });
}
