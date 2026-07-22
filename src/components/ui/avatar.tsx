import * as React from "react";
import { cn } from "@/lib/utils";
type AvatarProps = React.ComponentProps<"span"> & {
  src?: string;
  alt: string;
  fallback: React.ReactNode;
  size?: "sm" | "md" | "lg";
};
const sizes = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-14 text-base",
};
export function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  className,
  ...props
}: AvatarProps) {
  const [failed, setFailed] = React.useState(!src);
  return (
    <span
      data-slot="avatar"
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-none border bg-muted font-medium shadow-xs",
        sizes[size],
        className,
      )}
      {...props}
    >
      {!failed && (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="size-full object-cover"
        />
      )}
      {failed && <span aria-label={alt}>{fallback}</span>}
    </span>
  );
}
