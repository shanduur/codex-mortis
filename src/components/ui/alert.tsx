import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertVariants = cva("relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-sm border-2 px-4 py-3 text-sm shadow-[4px_4px_0_0_var(--shadow-color)] has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3", {
  variants: { variant: { default: "bg-secondary text-secondary-foreground", destructive: "bg-destructive text-white [&>svg]:text-current [&_[data-slot=alert-description]]:text-white/85" } },
  defaultVariants: { variant: "default" },
})
function Alert({ className, variant, ...props }: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) { return <div role="alert" data-slot="alert" className={cn(alertVariants({ variant }), className)} {...props} /> }
function AlertTitle({ className, ...props }: React.ComponentProps<"div">) { return <div data-slot="alert-title" className={cn("col-start-2 font-medium leading-none", className)} {...props} /> }
function AlertDescription({ className, ...props }: React.ComponentProps<"div">) { return <div data-slot="alert-description" className={cn("col-start-2 text-sm text-muted-foreground [&_p]:leading-relaxed", className)} {...props} /> }
export { Alert, AlertTitle, AlertDescription }
