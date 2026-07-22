import * as React from "react";
import { cn } from "@/lib/utils";
type TocItem = { href: string; label: string; level?: 2 | 3 };
type TableOfContentsProps = React.ComponentProps<"nav"> & { items: TocItem[] };
export function TableOfContents({
  items,
  className,
  ...props
}: TableOfContentsProps) {
  return (
    <nav
      data-slot="table-of-contents"
      aria-label="Table of contents"
      className={cn("border-l pl-4", className)}
      {...props}
    >
      <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        On this page
      </p>
      <ul className="grid gap-2">
        {items.map((item) => (
          <li key={item.href} className={item.level === 3 ? "pl-4" : undefined}>
            <a
              className="text-sm text-muted-foreground hover:text-foreground"
              href={item.href}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
