import * as React from "react";
import { cn } from "@/lib/utils";

type StackProps = React.ComponentProps<"div"> & {
  gap?: "1" | "2" | "3" | "4" | "6" | "8" | "12";
  direction?: "vertical" | "horizontal";
};
const gaps = {
  "1": "gap-1",
  "2": "gap-2",
  "3": "gap-3",
  "4": "gap-4",
  "6": "gap-6",
  "8": "gap-8",
  "12": "gap-12",
};
export function Stack({
  className,
  gap = "4",
  direction = "vertical",
  ...props
}: StackProps) {
  return (
    <div
      data-slot="stack"
      className={cn(
        "flex",
        direction === "vertical" ? "flex-col" : "flex-row items-center",
        gaps[gap],
        className,
      )}
      {...props}
    />
  );
}
