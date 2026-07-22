import * as React from "react";
import { cn } from "@/lib/utils";
type StatProps = React.ComponentProps<"div"> & {
  label: React.ReactNode;
  value: React.ReactNode;
  description?: React.ReactNode;
  trend?: React.ReactNode;
};
export function Stat({
  label,
  value,
  description,
  trend,
  className,
  ...props
}: StatProps) {
  const accessibleValue =
    typeof label === "string" &&
    (typeof value === "string" || typeof value === "number")
      ? `${label}: ${value}`
      : undefined;
  return (
    <div
      data-slot="stat"
      className={cn("rounded-lg border bg-card p-6", className)}
      {...props}
    >
      <p className="text-sm text-muted-foreground">{label}</p>
      <p
        aria-label={accessibleValue}
        className="mt-3 text-4xl font-medium tracking-tight"
      >
        {value}
      </p>
      {description && (
        <p className="mt-2 text-xs text-muted-foreground">{description}</p>
      )}
      {trend && <div className="mt-4 text-sm">{trend}</div>}
    </div>
  );
}
