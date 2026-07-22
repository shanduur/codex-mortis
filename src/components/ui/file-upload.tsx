import * as React from "react";
import { cn } from "@/lib/utils";
export function FileUpload({
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "type">) {
  return (
    <input
      data-slot="file-upload"
      type="file"
      className={cn(
        "block w-full rounded-md border border-dashed border-input bg-card p-3 text-sm file:mr-3 file:rounded-md file:border file:border-primary file:bg-primary file:px-3 file:py-2 file:text-primary-foreground",
        className,
      )}
      {...props}
    />
  );
}
