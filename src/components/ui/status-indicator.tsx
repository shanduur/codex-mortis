import * as React from "react";
import { cn } from "@/lib/utils";
type StatusIndicatorProps = React.ComponentProps<"span"> & {
  status?: "operational" | "warning" | "critical" | "neutral";
};
const colors = {
  operational: "bg-status-green",
  warning: "bg-signal-yellow",
  critical: "bg-alert-coral",
  neutral: "bg-muted-foreground",
};
export function StatusIndicator({
  status = "neutral",
  className,
  children,
  ...props
}: StatusIndicatorProps) {
  const label = typeof children === "string" ? children : undefined;
  return (
    <span
      data-slot="status-indicator"
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center gap-2 text-sm", className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn("size-2 rounded-full", colors[status])}
      />
      {children}
    </span>
  );
}
