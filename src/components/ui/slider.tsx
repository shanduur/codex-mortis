import * as React from "react";
import { cn } from "@/lib/utils";
export function Slider({
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "type">) {
  return (
    <input
      data-slot="slider"
      type="range"
      className={cn(
        "h-2 w-full cursor-pointer accent-primary focus-visible:ring-3 focus-visible:ring-ring/25",
        className,
      )}
      {...props}
    />
  );
}
