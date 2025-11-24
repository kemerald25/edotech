"use client";

import { ResourceItem } from "@/types/content";
import { useMemo, useState } from "react";
import { Search, BookOpen, Database, GraduationCap, Sparkles } from "lucide-react";
import Link from "next/link";

type Props = {
  items: ResourceItem[];
};

const categoryIcons = {
  Docs: BookOpen,
  Data: Database,
  Tutorial: GraduationCap,
};

export function ResourceLibrary({ items }: Props) {
  const categories = useMemo(
    () => ["All", ...new Set(items.map((item) => item.category))],
    [items],
  );
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase();
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      const matchesQuery =
        item.title.toLowerCase().includes(normalized) ||
        item.description.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [items, query, activeCategory]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <label className="flex w-full items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300 md:max-w-sm">
          <Search className="size-4" />
          <input
            type="search"
            placeholder="Search docs, datasets, tutorials"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm transition focus-ring focus-visible:ring-offset-0 ${
                activeCategory === category
                  ? "border-secondary/60 bg-secondary/10 text-secondary"
                  : "border-white/10 text-white hover:border-secondary/30"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((item) => {
          const Icon = categoryIcons[item.category as keyof typeof categoryIcons] ?? Sparkles;
          const isExternal = item.link.startsWith("http");
          return (
            <article
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-secondary/60"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-2xl border border-secondary/30 bg-secondary/10 p-3 text-secondary">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-secondary/70">
                    {item.category}
                  </p>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </div>
              </div>
              <p className="mt-4 text-sm text-neutral-300">{item.description}</p>
              {item.contributor && (
                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-neutral-500">
                  Contributed by {item.contributor}
                </p>
              )}
              <Link
                href={item.link}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className="mt-6 inline-flex items-center text-sm font-semibold text-secondary transition hover:gap-1"
              >
                Access resource →
              </Link>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-neutral-400">
          No resources found. Adjust your filters or submit a new one below.
        </div>
      )}
    </div>
  );
}


