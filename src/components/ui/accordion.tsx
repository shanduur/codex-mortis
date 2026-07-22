import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
type AccordionItem = {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
};
type AccordionProps = React.ComponentProps<"div"> & {
  items: AccordionItem[];
  defaultOpen?: string[];
  multiple?: boolean;
};
export function Accordion({
  items,
  defaultOpen = [],
  multiple = false,
  className,
  ...props
}: AccordionProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const toggle = (id: string) =>
    setOpen((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : multiple
          ? [...current, id]
          : [id],
    );
  return (
    <div
      data-slot="accordion"
      className={cn("divide-y rounded-lg border bg-card", className)}
      {...props}
    >
      {items.map((item) => {
        const expanded = open.includes(item.id);
        const panelId = `${item.id}-panel`;
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={panelId}
              disabled={item.disabled}
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium disabled:opacity-50"
            >
              {item.title}
              <ChevronDown
                className={cn(
                  "size-4 transition-transform",
                  expanded && "rotate-180",
                )}
              />
            </button>
            <div
              id={panelId}
              hidden={!expanded}
              className="px-5 pb-5 text-sm text-muted-foreground"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
