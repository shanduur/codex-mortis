import * as React from "react";

import { cn } from "@/lib/utils";

type TabItem = {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
};

type TabsProps = React.ComponentProps<"div"> & {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: TabsProps) {
  const [internal, setInternal] = React.useState(
    defaultValue ?? items[0]?.value,
  );
  const baseId = React.useId();
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const active = value ?? internal;
  const current = items.find((item) => item.value === active);

  function select(next: string) {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  }

  function moveFocus(currentIndex: number, direction: 1 | -1) {
    const enabledIndexes = items
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => !item.disabled)
      .map(({ index }) => index);
    const enabledPosition = enabledIndexes.indexOf(currentIndex);
    const nextPosition =
      (enabledPosition + direction + enabledIndexes.length) %
      enabledIndexes.length;
    const nextIndex = enabledIndexes[nextPosition];
    select(items[nextIndex].value);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div data-slot="tabs" className={className} {...props}>
      <div role="tablist" className="flex border-b">
        {items.map((item, index) => {
          const selected = item.value === active;
          const tabId = `${baseId}-${item.value}-tab`;
          const panelId = `${baseId}-${item.value}-panel`;

          return (
            <button
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              key={item.value}
              id={tabId}
              type="button"
              role="tab"
              aria-controls={panelId}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              onClick={() => select(item.value)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  moveFocus(index, 1);
                } else if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  moveFocus(index, -1);
                } else if (event.key === "Home") {
                  event.preventDefault();
                  const first = items.findIndex(
                    (candidate) => !candidate.disabled,
                  );
                  select(items[first].value);
                  tabRefs.current[first]?.focus();
                } else if (event.key === "End") {
                  event.preventDefault();
                  const last = items.findLastIndex(
                    (candidate) => !candidate.disabled,
                  );
                  select(items[last].value);
                  tabRefs.current[last]?.focus();
                }
              }}
              className={cn(
                "border-b-2 border-transparent px-4 py-3 text-sm text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selected && "border-primary text-foreground",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {current && (
        <div
          id={`${baseId}-${current.value}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-${current.value}-tab`}
          tabIndex={0}
          className="py-5 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {current.content}
        </div>
      )}
    </div>
  );
}
