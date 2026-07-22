import * as React from "react";

import { cn } from "@/lib/utils";

type TriggerProps = {
  onClick?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
};

type PopoverProps = React.ComponentProps<"div"> & {
  trigger: React.ReactElement<Record<string, unknown>>;
};

export function Popover({
  trigger,
  children,
  className,
  ...props
}: PopoverProps) {
  const [open, setOpen] = React.useState(false);
  const id = React.useId();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerProps = trigger.props as TriggerProps;

  React.useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  const triggerElement = React.cloneElement(trigger, {
    "aria-haspopup": "dialog",
    "aria-expanded": open,
    "aria-controls": id,
    onClick: (event: React.MouseEvent) => {
      triggerProps.onClick?.(event);
      if (!event.defaultPrevented) setOpen((value) => !value);
    },
    onKeyDown: (event: React.KeyboardEvent) => {
      triggerProps.onKeyDown?.(event);
      if (event.key === "Escape") setOpen(false);
    },
  });

  return (
    <div
      ref={rootRef}
      data-slot="popover"
      className={cn("relative inline-block", className)}
      {...props}
    >
      {triggerElement}
      {open && (
        <div
          id={id}
          role="dialog"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              setOpen(false);
            }
          }}
          className="absolute left-0 top-full z-50 mt-2 w-72 rounded-md border bg-popover p-4 text-sm text-popover-foreground shadow-lg"
        >
          {children}
        </div>
      )}
    </div>
  );
}
