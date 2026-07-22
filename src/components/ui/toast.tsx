import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
type ToastProps = React.ComponentProps<"div"> & {
  title: string;
  description?: React.ReactNode;
  onDismiss?: () => void;
};
export function Toast({
  title,
  description,
  onDismiss,
  className,
  ...props
}: ToastProps) {
  return (
    <div
      data-slot="toast"
      role="status"
      aria-label={title}
      className={cn(
        "flex w-full max-w-sm items-start gap-4 rounded-lg border bg-popover p-4 text-popover-foreground shadow-lg",
        className,
      )}
      {...props}
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{title}</p>
        {description && (
          <div className="mt-1 text-sm text-muted-foreground">{description}</div>
        )}
      </div>
      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          className="rounded-md p-1 hover:bg-muted"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
