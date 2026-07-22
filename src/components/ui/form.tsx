import * as React from "react";
import { cn } from "@/lib/utils";
export function Form({ className, ...props }: React.ComponentProps<"form">) {
  return (
    <form data-slot="form" className={cn("grid gap-8", className)} {...props} />
  );
}
