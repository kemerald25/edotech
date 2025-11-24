import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function GlowCard({ children, className }: Props) {
  return (
    <div
      className={cn(
        "glass-panel relative overflow-hidden border border-white/10 bg-white/5 p-6",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

