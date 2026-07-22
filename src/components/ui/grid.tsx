import * as React from "react";
import { cn } from "@/lib/utils";

type GridProps = React.ComponentProps<"div"> & {
  columns?: 1 | 2 | 3 | 4;
  gap?: "2" | "4" | "6" | "8";
};
const columns = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};
const gaps = { "2": "gap-2", "4": "gap-4", "6": "gap-6", "8": "gap-8" };
export function Grid({
  className,
  columns: count = 1,
  gap = "4",
  ...props
}: GridProps) {
  return (
    <div
      data-slot="grid"
      className={cn("grid", columns[count], gaps[gap], className)}
      {...props}
    />
  );
}
