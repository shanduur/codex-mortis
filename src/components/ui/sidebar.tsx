import * as React from "react";
import { cn } from "@/lib/utils";
export function Sidebar({
  className,
  ...props
}: React.ComponentProps<"aside">) {
  return (
    <aside
      data-slot="sidebar"
      className={cn("border-r bg-card p-4 text-card-foreground", className)}
      {...props}
    />
  );
}
