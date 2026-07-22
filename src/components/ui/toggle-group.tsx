import * as React from "react";
import { cn } from "@/lib/utils";
type ToggleGroupItem = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};
type ToggleGroupProps = React.ComponentProps<"div"> & {
  items: ToggleGroupItem[];
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
};
export function ToggleGroup({
  items,
  type = "single",
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: ToggleGroupProps) {
  const initial = defaultValue ?? (type === "single" ? "" : []);
  const [internal, setInternal] = React.useState<string | string[]>(initial);
  const selected = value ?? internal;
  const isActive = (item: string) =>
    Array.isArray(selected) ? selected.includes(item) : selected === item;
  const choose = (item: string) => {
    const next =
      type === "single"
        ? selected === item
          ? ""
          : item
        : isActive(item)
          ? (selected as string[]).filter((value) => value !== item)
          : [...(selected as string[]), item];
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };
  return (
    <div
      data-slot="toggle-group"
      role="group"
      className={cn("inline-flex", className)}
      {...props}
    >
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          aria-pressed={isActive(item.value)}
          disabled={item.disabled}
          onClick={() => choose(item.value)}
          className="-ml-px first:ml-0 border px-3 py-2 text-sm first:rounded-l-md last:rounded-r-md hover:bg-muted aria-pressed:bg-accent disabled:opacity-50"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
