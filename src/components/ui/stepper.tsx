import * as React from "react";
import { cn } from "@/lib/utils";
type StepperProps = React.ComponentProps<"ol"> & {
  steps: React.ReactNode[];
  currentStep: number;
};
export function Stepper({
  steps,
  currentStep,
  className,
  ...props
}: StepperProps) {
  return (
    <ol
      data-slot="stepper"
      className={cn("grid gap-3 sm:grid-flow-col sm:auto-cols-fr", className)}
      {...props}
    >
      {steps.map((step, index) => {
        const number = index + 1;
        return (
          <li
            key={index}
            aria-current={number === currentStep ? "step" : undefined}
            className="flex items-center gap-3 text-sm"
          >
            <span
              className={cn(
                "grid size-7 shrink-0 place-items-center rounded-none border font-mono text-xs shadow-xs",
                number <= currentStep &&
                  "border-primary bg-primary text-primary-foreground",
              )}
            >
              {number}
            </span>
            {step}
          </li>
        );
      })}
    </ol>
  );
}
