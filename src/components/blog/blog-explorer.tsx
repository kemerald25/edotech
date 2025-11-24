"use client";

import { BlogFrontmatter } from "@/types/content";
import { useMemo, useState } from "react";
import { BlogCard } from "./blog-card";
import { Badge } from "./tag";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

type Props = {
  posts: BlogFrontmatter[];
  tags: string[];
};

const PAGE_SIZE = 6;

export function BlogExplorer({ posts, tags }: Props) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [limit, setLimit] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase();
    return posts.filter((post) => {
      const matchesQuery =
        post.title.toLowerCase().includes(normalized) ||
        post.excerpt.toLowerCase().includes(normalized);
      const matchesTag = activeTag ? post.tags.includes(activeTag) : true;
      return matchesQuery && matchesTag;
    });
  }, [posts, query, activeTag]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <label className="flex w-full items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300 md:max-w-sm">
          <Search className="size-4" />
          <input
            type="search"
            placeholder="Search articles"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <Badge
            className={!activeTag ? "bg-secondary/10 text-secondary" : ""}
            onClick={() => {
              setActiveTag(null);
              setLimit(PAGE_SIZE);
            }}
          >
            All
          </Badge>
          {tags.map((tag) => (
            <Badge
              key={tag}
              className={activeTag === tag ? "bg-secondary/10 text-secondary" : ""}
              onClick={() => {
                setActiveTag(tag === activeTag ? null : tag);
                setLimit(PAGE_SIZE);
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.slice(0, limit).map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      {filtered.length > limit && (
        <div className="flex justify-center">
          <Button variant="ghost" onClick={() => setLimit((prev) => prev + PAGE_SIZE)}>
            Load more
          </Button>
        </div>
      )}
      {filtered.length === 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-neutral-400">
          No posts match this search yet. Try another tag.
        </div>
      )}
    </div>
  );
}

