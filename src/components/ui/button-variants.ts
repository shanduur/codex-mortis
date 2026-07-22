import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none border-2 border-foreground text-sm font-semibold shadow-sm transition-[color,background-color,border-color,box-shadow,transform] outline-none hover:-translate-x-px hover:-translate-y-px hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90",
        outline:
          "bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        ghost:
          "border-transparent bg-transparent shadow-none hover:translate-x-0 hover:translate-y-0 hover:bg-accent hover:shadow-none hover:text-accent-foreground active:translate-x-0 active:translate-y-0",
        link: "border-transparent text-foreground shadow-none underline underline-offset-4 hover:translate-x-0 hover:translate-y-0 hover:bg-transparent hover:shadow-none active:translate-x-0 active:translate-y-0",
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
);
