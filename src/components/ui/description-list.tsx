import * as React from "react";
import { cn } from "@/lib/utils";
export function DescriptionList({
  className,
  ...props
}: React.ComponentProps<"dl">) {
  return (
    <dl
      data-slot="description-list"
      className={cn(
        "grid gap-x-6 gap-y-3 sm:grid-cols-[minmax(8rem,0.35fr)_1fr]",
        className,
      )}
      {...props}
    />
  );
}
export function DescriptionTerm({
  className,
  ...props
}: React.ComponentProps<"dt">) {
  return (
    <dt
      data-slot="description-term"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  );
}
export function DescriptionDetails({
  className,
  ...props
}: React.ComponentProps<"dd">) {
  return (
    <dd
      data-slot="description-details"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
