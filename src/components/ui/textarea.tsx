import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea data-slot="textarea" className={cn("flex min-h-24 w-full rounded-sm border-2 border-input bg-card px-3 py-2 text-base transition-[box-shadow,transform] outline-none placeholder:text-muted-foreground focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:border-ring focus-visible:shadow-[4px_4px_0_0_var(--ring)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className)} {...props} />
}

export { Textarea }
