import * as React from "react";
import { cn } from "@/lib/utils";
export function Progress({
  className,
  max = 100,
  ...props
}: React.ComponentProps<"progress">) {
  return (
    <progress
      data-slot="progress"
      max={max}
      className={cn(
        "h-2 w-full overflow-hidden rounded-full accent-primary",
        className,
      )}
      {...props}
    />
  );
}
