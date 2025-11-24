import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  actions?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  actions,
}: Props) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl space-y-3",
        align === "center" && "text-center",
      )}
    >
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.35em] text-secondary/80">
          {eyebrow}
        </p>
      )}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div
          className={cn("space-y-3", align === "center" && "w-full text-center")}
        >
          <h2 className="font-heading text-3xl font-semibold md:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="text-base text-neutral-300">{description}</p>
          )}
        </div>
        {actions && <div className="flex-shrink-0">{actions}</div>}
      </div>
    </div>
  );
}

