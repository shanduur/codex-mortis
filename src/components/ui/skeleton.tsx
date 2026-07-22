import * as React from "react";
import { cn } from "@/lib/utils";
type SkeletonProps = React.ComponentProps<"div"> & { label?: string };
export function Skeleton({
  label = "Loading",
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      role="status"
      aria-label={label}
      className={cn("h-4 animate-pulse rounded bg-muted", className)}
      {...props}
    >
      <span className="sr-only">{label}</span>
    </div>
  );
}
