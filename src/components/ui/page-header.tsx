import * as React from "react";
import { cn } from "@/lib/utils";
import { Heading } from "./heading";

type PageHeaderProps = React.ComponentProps<"div"> & {
  title: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  actions?: React.ReactNode;
};
export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div
      data-slot="page-header"
      className={cn(
        "grid gap-6 border-b pb-8 sm:grid-cols-[1fr_auto] sm:items-end",
        className,
      )}
      {...props}
    >
      <div>
        {eyebrow && (
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {eyebrow}
          </p>
        )}
        <Heading level={1}>{title}</Heading>
        {description && (
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
