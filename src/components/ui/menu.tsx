import * as React from "react";
import { MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

type MenuItem = {
  label: string;
  onSelect: () => void;
  disabled?: boolean;
  destructive?: boolean;
};

type MenuProps = React.ComponentProps<"div"> & {
  label: string;
  items: MenuItem[];
};

export function Menu({ label, items, className, ...props }: MenuProps) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const itemRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const focusFirstOnOpenRef = React.useRef(false);

  React.useLayoutEffect(() => {
    if (open && focusFirstOnOpenRef.current) {
      focusFirstOnOpenRef.current = false;
      itemRefs.current.find((button) => button && !button.disabled)?.focus();
    }
  }, [open]);

  React.useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  function focusItem(index: number) {
    const enabledItems = items
      .map((item, itemIndex) => ({ item, itemIndex }))
      .filter(({ item }) => !item.disabled);
    if (!enabledItems.length) return;

    const normalizedIndex = (index + enabledItems.length) % enabledItems.length;
    itemRefs.current[enabledItems[normalizedIndex].itemIndex]?.focus();
  }

  function openAndFocusFirst() {
    focusFirstOnOpenRef.current = true;
    setOpen(true);
  }

  function handleMenuKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const enabledButtons = itemRefs.current.filter(
      (button): button is HTMLButtonElement =>
        Boolean(button && !button.disabled),
    );
    const currentIndex = enabledButtons.indexOf(
      document.activeElement as HTMLButtonElement,
    );

    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      focusItem(currentIndex + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      focusItem(currentIndex - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusItem(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusItem(-1);
    }
  }

  return (
    <div
      ref={rootRef}
      data-slot="menu"
      className={cn("relative inline-block", className)}
      {...props}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            event.preventDefault();
            setOpen(false);
          } else if (event.key === "ArrowDown") {
            event.preventDefault();
            openAndFocusFirst();
          }
        }}
        className="inline-flex h-9 items-center gap-2 rounded-md border bg-card px-3 text-sm font-medium shadow-sm"
      >
        {label}
        <MoreHorizontal aria-hidden="true" className="size-4" />
      </button>
      {open && (
        <div
          role="menu"
          onKeyDown={handleMenuKeyDown}
          className="absolute left-0 top-full z-50 mt-1 min-w-40 rounded-md border bg-popover p-1 text-popover-foreground shadow-lg"
        >
          {items.map((item, index) => (
            <button
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              key={item.label}
              type="button"
              role="menuitem"
              tabIndex={-1}
              disabled={item.disabled}
              onClick={() => {
                item.onSelect();
                setOpen(false);
                triggerRef.current?.focus();
              }}
              className={cn(
                "block w-full rounded-sm px-3 py-2 text-left text-sm hover:bg-accent focus:bg-accent focus:outline-none disabled:opacity-50",
                item.destructive && "text-destructive",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
