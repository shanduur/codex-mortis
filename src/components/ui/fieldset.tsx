import * as React from "react";
import { cn } from "@/lib/utils";
type FieldsetProps = React.ComponentProps<"fieldset"> & {
  legend: React.ReactNode;
  description?: React.ReactNode;
};
export function Fieldset({
  legend,
  description,
  className,
  children,
  ...props
}: FieldsetProps) {
  return (
    <fieldset
      data-slot="fieldset"
      className={cn("grid gap-4 rounded-lg border p-5", className)}
      {...props}
    >
      <legend className="px-1 text-sm font-medium">{legend}</legend>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {children}
    </fieldset>
  );
}
