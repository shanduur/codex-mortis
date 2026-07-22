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
        "h-3 w-full appearance-none overflow-hidden rounded-none border border-foreground bg-muted [&::-moz-progress-bar]:bg-primary [&::-webkit-progress-bar]:bg-muted [&::-webkit-progress-value]:bg-primary",
        className,
      )}
      {...props}
    />
  );
}
