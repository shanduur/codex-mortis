import * as React from "react";
import { cn } from "@/lib/utils";
export function Main({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="main"
      className={cn("min-w-0 py-8", className)}
      {...props}
    />
  );
}
