import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
export const Drawer = Dialog;
export const DrawerTrigger = DialogTrigger;
export const DrawerClose = DialogClose;
export const DrawerHeader = DialogHeader;
export const DrawerFooter = DialogFooter;
export const DrawerTitle = DialogTitle;
export const DrawerDescription = DialogDescription;
export function DrawerContent({
  className,
  ...props
}: React.ComponentProps<typeof DialogContent>) {
  return (
    <DialogContent
      data-slot="drawer-content"
      className={cn(
        "left-auto right-0 top-0 h-full max-w-md content-start translate-x-0 translate-y-0 rounded-none border-y-0 border-r-0",
        className,
      )}
      {...props}
    />
  );
}
