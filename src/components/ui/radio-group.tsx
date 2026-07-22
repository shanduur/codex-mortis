import * as React from "react";
import { cn } from "@/lib/utils";
type RadioOption = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};
type RadioGroupProps = React.ComponentProps<"div"> & {
  name: string;
  label: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};
export function RadioGroup({
  name,
  label,
  options,
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: RadioGroupProps) {
  return (
    <div
      data-slot="radio-group"
      role="radiogroup"
      aria-label={label}
      className={cn("grid gap-3", className)}
      {...props}
    >
      {options.map((option) => (
        <label key={option.value} className="flex items-center gap-3 text-sm">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === undefined ? undefined : value === option.value}
            defaultChecked={
              value === undefined ? defaultValue === option.value : undefined
            }
            disabled={option.disabled}
            onChange={() => onValueChange?.(option.value)}
            className="size-4 accent-primary"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
