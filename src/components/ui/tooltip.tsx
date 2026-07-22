import * as React from "react";

import { cn } from "@/lib/utils";

type TooltipTriggerProps = {
  onBlur?: React.FocusEventHandler;
  onFocus?: React.FocusEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
};

type TooltipProps = React.ComponentProps<"span"> & {
  content: React.ReactNode;
  children: React.ReactElement<Record<string, unknown>>;
};

export function Tooltip({
  content,
  children,
  className,
  ...props
}: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const id = React.useId();
  const childProps = children.props as TooltipTriggerProps;
  const child = React.cloneElement(children, {
    "aria-describedby": open ? id : undefined,
    onFocus: (event: React.FocusEvent) => {
      childProps.onFocus?.(event);
      setOpen(true);
    },
    onBlur: (event: React.FocusEvent) => {
      childProps.onBlur?.(event);
      setOpen(false);
    },
    onMouseEnter: (event: React.MouseEvent) => {
      childProps.onMouseEnter?.(event);
      setOpen(true);
    },
    onMouseLeave: (event: React.MouseEvent) => {
      childProps.onMouseLeave?.(event);
      setOpen(false);
    },
    onKeyDown: (event: React.KeyboardEvent) => {
      childProps.onKeyDown?.(event);
      if (event.key === "Escape") setOpen(false);
    },
  });

  return (
    <span
      data-slot="tooltip"
      className={cn("relative inline-flex", className)}
      {...props}
    >
      {child}
      {open && (
        <span
          id={id}
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background shadow-lg"
        >
          {content}
        </span>
      )}
    </span>
  );
}
