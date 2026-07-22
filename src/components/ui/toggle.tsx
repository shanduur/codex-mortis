import * as React from "react";
import { cn } from "@/lib/utils";
type ToggleProps = Omit<React.ComponentProps<"button">, "onChange"> & {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
};
export function Toggle({
  pressed,
  defaultPressed = false,
  onPressedChange,
  className,
  onClick,
  ...props
}: ToggleProps) {
  const [internal, setInternal] = React.useState(defaultPressed);
  const active = pressed ?? internal;
  return (
    <button
      data-slot="toggle"
      type="button"
      aria-pressed={active}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium hover:bg-muted aria-pressed:border-primary aria-pressed:bg-accent",
        className,
      )}
      onClick={(event) => {
        if (pressed === undefined) setInternal(!active);
        onPressedChange?.(!active);
        onClick?.(event);
      }}
      {...props}
    />
  );
}
