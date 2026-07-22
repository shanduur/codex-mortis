import * as React from "react";
import { cn } from "@/lib/utils";
type IconProps = React.ComponentProps<"span"> & { label?: string };
export function Icon({ label, className, ...props }: IconProps) {
  return (
    <span
      data-slot="icon"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(
        "inline-flex size-5 items-center justify-center [&_svg]:size-full",
        className,
      )}
      {...props}
    />
  );
}
