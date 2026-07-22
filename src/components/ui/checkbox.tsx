import * as React from "react";
import { cn } from "@/lib/utils";
export function Checkbox({
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "type">) {
  return (
    <input
      data-slot="checkbox"
      type="checkbox"
      className={cn(
        "size-4 rounded-none border-2 border-input bg-card accent-primary shadow-xs focus-visible:ring-3 focus-visible:ring-ring/25",
        className,
      )}
      {...props}
    />
  );
}
