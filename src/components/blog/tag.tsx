import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-widest text-neutral-300",
        className,
      )}
      {...props}
    />
  );
}

