import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <input type={type} data-slot="input" className={cn("flex h-10 w-full min-w-0 rounded-sm border-2 border-input bg-card px-3 py-1 text-base transition-[color,box-shadow,transform] outline-none placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:border-ring focus-visible:shadow-[4px_4px_0_0_var(--ring)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className)} {...props} />
}

export { Input }
