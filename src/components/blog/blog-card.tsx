import Image from "next/image";
import Link from "next/link";
import { Badge } from "./tag";
import { ArrowUpRight } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

type Props = {
  post: {
    title: string;
    excerpt: string;
    coverImage: string;
    date: string;
    slug: string;
    tags: string[];
    author: string;
  };
  featured?: boolean;
};

export function BlogCard({ post, featured = false }: Props) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5",
        featured && "md:col-span-2 lg:flex-row",
      )}
    >
      <div className="relative h-60 w-full overflow-hidden lg:h-auto lg:max-h-full lg:min-w-[320px]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={featured}
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div>
          <h3 className="font-heading text-2xl font-semibold">{post.title}</h3>
          <p className="mt-2 text-sm text-neutral-300">{post.excerpt}</p>
        </div>
        <div className="mt-auto flex items-center justify-between text-xs text-neutral-400">
          <span>{post.author}</span>
          <span>{formatDate(post.date)}</span>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="flex items-center gap-2 text-sm font-semibold text-secondary transition hover:gap-3"
        >
          Read post
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}
