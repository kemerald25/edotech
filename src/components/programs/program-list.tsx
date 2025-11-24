"use client";

import { Program } from "@/types/content";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMemo, useState } from "react";

type Props = {
  items: Program[];
};

const baseClasses =
  "rounded-full border px-4 py-2 text-sm transition focus-ring focus-visible:ring-offset-0";

export function ProgramList({ items }: Props) {
  const categories = useMemo(
    () => ["All", ...new Set(items.map((program) => program.category))],
    [items],
  );
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    if (activeCategory === "All") return items;
    return items.filter((program) => program.category === activeCategory);
  }, [items, activeCategory]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`${baseClasses} ${
              activeCategory === category
                ? "border-secondary/60 bg-secondary/10 text-secondary"
                : "border-white/10 text-white hover:border-secondary/30"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((program) => (
          <article
            key={program.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-secondary/60"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-secondary/80">
              {program.category}
            </p>
            <h3 className="mt-3 text-2xl font-semibold">{program.title}</h3>
            <p className="text-neutral-300">{program.description}</p>
            <div className="mt-4 flex items-center justify-between text-sm text-neutral-400">
              <span>{program.nextEvent}</span>
              <Button variant="ghost" asChild size="sm">
                <Link href={program.cta}>Register</Link>
              </Button>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-neutral-300">
          No programs match this filter yet. Check back soon.
        </div>
      )}
    </div>
  );
}


