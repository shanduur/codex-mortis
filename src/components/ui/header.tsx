import * as React from "react";
import { cn } from "@/lib/utils";
export function Header({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="header"
      className={cn("border-b bg-card px-4 py-4 sm:px-6", className)}
      {...props}
    />
  );
}
