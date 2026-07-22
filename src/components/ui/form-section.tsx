import * as React from "react";
import { cn } from "@/lib/utils";
type FormSectionProps = React.ComponentProps<"section"> & {
  title: React.ReactNode;
  description?: React.ReactNode;
};
export function FormSection({
  title,
  description,
  className,
  children,
  ...props
}: FormSectionProps) {
  const id = React.useId();
  return (
    <section
      data-slot="form-section"
      role="group"
      aria-labelledby={id}
      className={cn("grid gap-6 border-b pb-8", className)}
      {...props}
    >
      <div>
        <h2 id={id} className="text-xl font-medium">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}
