import * as React from "react";
import { cn } from "@/lib/utils";
type NavigationItem = {
  label: React.ReactNode;
  href: string;
  current?: boolean;
};
type NavigationMenuProps = React.ComponentProps<"nav"> & {
  items: NavigationItem[];
  label?: string;
};
export function NavigationMenu({
  items,
  label = "Primary",
  className,
  ...props
}: NavigationMenuProps) {
  return (
    <nav
      data-slot="navigation-menu"
      aria-label={label}
      className={className}
      {...props}
    >
      <ul className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => (
          <li key={`${item.href}-${index}`}>
            <a
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={cn(
                "block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
                item.current && "bg-accent text-foreground",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
