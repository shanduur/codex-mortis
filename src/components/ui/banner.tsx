import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
type BannerProps = React.ComponentProps<"div"> & {
  title: React.ReactNode;
  onDismiss?: () => void;
  tone?: "info" | "warning" | "critical";
};
const tones = {
  info: "border-primary/45 bg-accent",
  warning: "border-secondary bg-secondary/25",
  critical: "border-destructive/50 bg-destructive/10",
};
export function Banner({
  title,
  onDismiss,
  tone = "info",
  className,
  children,
  ...props
}: BannerProps) {
  const accessibleTitle = typeof title === "string" ? title : undefined;
  return (
    <div
      data-slot="banner"
      role="status"
      aria-label={accessibleTitle}
      className={cn(
        "flex items-start gap-4 border-y px-4 py-3",
        tones[tone],
        className,
      )}
      {...props}
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{title}</p>
        {children && (
          <div className="mt-1 text-sm text-muted-foreground">{children}</div>
        )}
      </div>
      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          className="rounded-md p-1 hover:bg-background/50"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
