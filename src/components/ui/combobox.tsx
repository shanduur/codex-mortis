import * as React from "react";
import { cn } from "@/lib/utils";
type ComboboxOption = { value: string; label: string };
type ComboboxProps = Omit<React.ComponentProps<"input">, "list"> & {
  options: ComboboxOption[];
};
export function Combobox({ options, className, ...props }: ComboboxProps) {
  const id = React.useId();
  return (
    <>
      <input
        data-slot="combobox"
        role="combobox"
        aria-autocomplete="list"
        list={id}
        className={cn(
          "h-10 w-full rounded-md border border-input bg-card px-3 text-sm shadow-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20",
          className,
        )}
        {...props}
      />
      <datalist id={id}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </datalist>
    </>
  );
}
