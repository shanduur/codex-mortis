import * as React from "react";
import { cn } from "@/lib/utils";
type PaginationProps = React.ComponentProps<"nav"> & {
  page: number;
  totalPages: number;
  getHref: (page: number) => string;
};
export function Pagination({
  page,
  totalPages,
  getHref,
  className,
  ...props
}: PaginationProps) {
  const pages = Array.from({ length: Math.min(3, totalPages) }, (_, index) =>
    Math.min(Math.max(1, page - 0 + index), totalPages),
  ).filter((value, index, array) => array.indexOf(value) === index);
  return (
    <nav
      data-slot="pagination"
      aria-label="Pagination"
      className={className}
      {...props}
    >
      <ul className="flex items-center gap-1">
        <li>
          {page > 1 && (
            <a
              href={getHref(page - 1)}
              className="block rounded-md px-3 py-2 text-sm"
            >
              Previous
            </a>
          )}
        </li>
        {pages.map((number) => (
          <li key={number}>
            <a
              href={getHref(number)}
              aria-current={number === page ? "page" : undefined}
              className={cn(
                "grid size-9 place-items-center rounded-md text-sm",
                number === page
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted",
              )}
            >
              {number}
            </a>
          </li>
        ))}
        <li>
          {page < totalPages && (
            <a
              href={getHref(page + 1)}
              className="block rounded-md px-3 py-2 text-sm"
            >
              Next
            </a>
          )}
        </li>
      </ul>
    </nav>
  );
}
