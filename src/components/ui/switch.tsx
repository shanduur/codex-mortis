import * as React from "react";
import { cn } from "@/lib/utils";
export function Switch({
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "type" | "role">) {
  return (
    <input
      data-slot="switch"
      type="checkbox"
      role="switch"
      className={cn(
        "h-6 w-11 cursor-pointer appearance-none rounded-full border border-input bg-muted p-0.5 transition-colors before:block before:size-5 before:rounded-full before:bg-card before:shadow-sm before:transition-transform checked:border-primary checked:bg-primary checked:before:translate-x-5 focus-visible:ring-3 focus-visible:ring-ring/25",
        className,
      )}
      {...props}
    />
  );
}
