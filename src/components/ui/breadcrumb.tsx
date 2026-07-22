import * as React from "react";
import { ChevronRight } from "lucide-react";
type BreadcrumbItem = { label: React.ReactNode; href?: string };
type BreadcrumbProps = React.ComponentProps<"nav"> & {
  items: BreadcrumbItem[];
};
export function Breadcrumb({ items, className, ...props }: BreadcrumbProps) {
  return (
    <nav
      data-slot="breadcrumb"
      aria-label="Breadcrumb"
      className={className}
      {...props}
    >
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRight aria-hidden="true" className="size-3.5" />
            )}
            {item.href ? (
              <a href={item.href} className="hover:text-foreground">
                {item.label}
              </a>
            ) : (
              <span aria-current="page" className="text-foreground">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
