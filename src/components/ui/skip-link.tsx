import * as React from "react";
import { cn } from "@/lib/utils";
export function SkipLink({ className, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      data-slot="skip-link"
      className={cn(
        "fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:translate-y-0",
        className,
      )}
      {...props}
    />
  );
}
