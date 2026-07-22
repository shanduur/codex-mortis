import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
type CollapsibleProps = React.ComponentProps<"div"> & {
  trigger: React.ReactNode;
  defaultOpen?: boolean;
};
export function Collapsible({
  trigger,
  defaultOpen = false,
  className,
  children,
  ...props
}: CollapsibleProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const id = React.useId();
  return (
    <div
      data-slot="collapsible"
      className={cn("rounded-md border bg-card", className)}
      {...props}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium"
      >
        {trigger}
        <ChevronDown
          className={cn("size-4 transition-transform", open && "rotate-180")}
        />
      </button>
      <div
        id={id}
        hidden={!open}
        className="border-t px-4 py-3 text-sm text-muted-foreground"
      >
        {children}
      </div>
    </div>
  );
}
