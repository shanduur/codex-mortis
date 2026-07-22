import * as React from "react";
import { cn } from "@/lib/utils";
type InputGroupProps = React.ComponentProps<"div"> & {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
};
export function InputGroup({
  prefix,
  suffix,
  children,
  className,
  ...props
}: InputGroupProps) {
  return (
    <div
      data-slot="input-group"
      className={cn(
        "flex items-stretch rounded-md border border-input bg-card shadow-sm focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/20 [&_[data-slot=input]]:border-0 [&_[data-slot=input]]:shadow-none [&_[data-slot=input]]:focus-visible:ring-0",
        className,
      )}
      {...props}
    >
      {prefix && (
        <span className="flex items-center border-r px-3 text-sm text-muted-foreground">
          {prefix}
        </span>
      )}
      <div className="min-w-0 flex-1">{children}</div>
      {suffix && (
        <span className="flex items-center border-l px-3 text-sm text-muted-foreground">
          {suffix}
        </span>
      )}
    </div>
  );
}
