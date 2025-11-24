import { cn } from "@/lib/utils";
import { Info, Lightbulb, ShieldCheck } from "lucide-react";
import { ReactNode } from "react";

const icons = {
  info: Info,
  idea: Lightbulb,
  success: ShieldCheck,
};

type Props = {
  type?: keyof typeof icons;
  children: ReactNode;
};

export default function Callout({ type = "info", children }: Props) {
  const Icon = icons[type] ?? icons.info;

  return (
    <div
      className={cn(
        "mt-6 flex gap-3 rounded-2xl border p-4 text-sm",
        type === "info" && "border-primary/30 bg-primary/10",
        type === "idea" && "border-secondary/40 bg-secondary/5",
        type === "success" && "border-green-400/60 bg-green-400/10",
      )}
    >
      <Icon className="mt-1 size-4 flex-shrink-0" />
      <div className="space-y-1">{children}</div>
    </div>
  );
}

