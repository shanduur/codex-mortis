import * as React from "react";
import { cn } from "@/lib/utils";
export function Switch({
  className,
  onKeyDown,
  ...props
}: Omit<React.ComponentProps<"input">, "type" | "role">) {
  return (
    <input
      data-slot="switch"
      type="checkbox"
      role="switch"
      className={cn(
        "h-6 w-11 cursor-pointer appearance-none rounded-full border border-input bg-muted p-[2px] transition-colors before:block before:size-[18px] before:rounded-full before:bg-card before:shadow-sm before:transition-transform checked:border-primary checked:bg-primary checked:before:translate-x-5 focus-visible:ring-3 focus-visible:ring-ring/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 dark:before:bg-foreground",
        className,
      )}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented && event.key === "Enter") {
          event.preventDefault();
          event.currentTarget.click();
        }
      }}
      {...props}
    />
  );
}
