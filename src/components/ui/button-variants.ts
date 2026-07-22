import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm border-2 border-foreground text-sm font-bold transition-[color,background-color,box-shadow,transform] outline-none shadow-[4px_4px_0_0_var(--shadow-color)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--shadow-color)] focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:translate-x-1 active:translate-y-1 active:shadow-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary",
        destructive: "bg-destructive text-white hover:bg-destructive",
        outline: "bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary",
        ghost: "border-transparent bg-transparent shadow-none hover:translate-x-0 hover:translate-y-0 hover:border-foreground hover:bg-accent hover:shadow-none hover:text-accent-foreground",
        link: "border-transparent text-foreground shadow-none underline decoration-2 underline-offset-4 hover:translate-x-0 hover:translate-y-0 hover:bg-primary hover:shadow-none",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-6",
        icon: "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
)
