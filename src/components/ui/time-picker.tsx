import * as React from "react";
import { cn } from "@/lib/utils";
export function TimePicker({
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "type">) {
  return (
    <input
      data-slot="time-picker"
      type="time"
      className={cn(
        "h-10 rounded-md border border-input bg-card px-3 text-sm shadow-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20",
        className,
      )}
      {...props}
    />
  );
}
