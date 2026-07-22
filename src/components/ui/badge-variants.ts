import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-none border px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide whitespace-nowrap shadow-xs transition-[color,background-color,box-shadow,transform] focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-white",
        outline: "bg-card text-card-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);
