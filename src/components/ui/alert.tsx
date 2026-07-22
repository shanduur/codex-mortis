import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertVariants = cva("relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-md border px-4 py-3 text-sm shadow-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3", {
  variants: { variant: { default: "border-primary/45 bg-accent text-accent-foreground", destructive: "border-destructive/55 bg-destructive/12 text-foreground [&>svg]:text-destructive [&_[data-slot=alert-description]]:text-muted-foreground" } },
  defaultVariants: { variant: "default" },
})
function Alert({ className, variant, ...props }: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) { return <div role="alert" data-slot="alert" className={cn(alertVariants({ variant }), className)} {...props} /> }
function AlertTitle({ className, ...props }: React.ComponentProps<"div">) { return <div data-slot="alert-title" className={cn("col-start-2 font-medium leading-none", className)} {...props} /> }
function AlertDescription({ className, ...props }: React.ComponentProps<"div">) { return <div data-slot="alert-description" className={cn("col-start-2 text-sm text-muted-foreground [&_p]:leading-relaxed", className)} {...props} /> }
export { Alert, AlertTitle, AlertDescription }
