import * as React from "react";
import { cn } from "@/lib/utils";
export function Prose({
  className,
  ...props
}: React.ComponentProps<"article">) {
  return (
    <article
      data-slot="prose"
      className={cn(
        "max-w-3xl space-y-5 text-base leading-7 text-foreground [&_h2]:mt-10 [&_h2]:text-3xl [&_h2]:font-medium [&_h3]:mt-8 [&_h3]:text-xl [&_p]:text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
