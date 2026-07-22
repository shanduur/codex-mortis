import * as React from "react";
import { cn } from "@/lib/utils";
type FormError = { href: string; message: string };
type FormErrorSummaryProps = React.ComponentProps<"div"> & {
  title?: string;
  errors: FormError[];
};
export function FormErrorSummary({
  title = "There is a problem",
  errors,
  className,
  ...props
}: FormErrorSummaryProps) {
  if (errors.length === 0) return null;
  return (
    <div
      data-slot="form-error-summary"
      role="alert"
      tabIndex={-1}
      className={cn(
        "rounded-md border border-destructive/50 bg-destructive/10 p-4",
        className,
      )}
      {...props}
    >
      <h2 className="font-medium">{title}</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5">
        {errors.map((error) => (
          <li key={`${error.href}-${error.message}`}>
            <a
              className="text-sm font-medium underline underline-offset-4"
              href={error.href}
            >
              {error.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
