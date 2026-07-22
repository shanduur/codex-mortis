import * as React from "react";
import { cn } from "@/lib/utils";
export function Link({ className, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      data-slot="link"
      className={cn(
        "font-medium text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:text-primary focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      {...props}
    />
  );
}
