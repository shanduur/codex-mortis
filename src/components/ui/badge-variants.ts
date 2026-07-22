import { cva } from "class-variance-authority"

export const badgeVariants = cva("inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-sm border-2 px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wide whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-ring", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      destructive: "bg-destructive text-white",
      outline: "bg-background text-foreground",
    },
  },
  defaultVariants: { variant: "default" },
})
