import * as React from "react";
import { cn } from "@/lib/utils";
type DividerProps = React.ComponentProps<"hr"> & {
  orientation?: "horizontal" | "vertical";
};
export function Divider({
  className,
  orientation = "horizontal",
  ...props
}: DividerProps) {
  return (
    <hr
      data-slot="divider"
      aria-orientation={orientation}
      className={cn(
        "shrink-0 border-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full min-h-6 w-px",
        className,
      )}
      {...props}
    />
  );
}
