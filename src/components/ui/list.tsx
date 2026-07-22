import * as React from "react";
import { cn } from "@/lib/utils";
type ListProps = React.HTMLAttributes<HTMLElement> & { ordered?: boolean };
export function List({ ordered = false, className, ...props }: ListProps) {
  const Component = ordered ? "ol" : "ul";
  return (
    <Component
      data-slot="list"
      className={cn(
        "ml-5 grid gap-2 text-sm leading-6",
        ordered ? "list-decimal" : "list-disc",
        className,
      )}
      {...props}
    />
  );
}
export function ListItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li data-slot="list-item" className={cn("pl-1", className)} {...props} />
  );
}
