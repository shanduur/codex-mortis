import * as React from "react";
import { cn } from "@/lib/utils";
export function Page({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page"
      className={cn("min-h-screen bg-background text-foreground", className)}
      {...props}
    />
  );
}
