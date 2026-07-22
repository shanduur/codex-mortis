import * as React from "react";
import { cn } from "@/lib/utils";
export function Image({
  className,
  loading = "lazy",
  ...props
}: React.ComponentProps<"img">) {
  return (
    <img
      data-slot="image"
      loading={loading}
      className={cn("max-w-full rounded-lg object-cover", className)}
      {...props}
    />
  );
}
