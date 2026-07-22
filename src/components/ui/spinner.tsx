import * as React from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
type SpinnerProps = React.ComponentProps<"span"> & { label?: string };
export function Spinner({
  label = "Loading",
  className,
  ...props
}: SpinnerProps) {
  return (
    <span
      data-slot="spinner"
      role="status"
      aria-label={label}
      className={cn("inline-flex", className)}
      {...props}
    >
      <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />
      <span className="sr-only">{label}</span>
    </span>
  );
}
