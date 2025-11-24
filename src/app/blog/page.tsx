import { BlogExplorer } from "@/components/blog/blog-explorer";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAllPosts, getTags } from "@/lib/mdx";

export const metadata = {
  title: "Blog",
  description:
    "File-based markdown blog with MDX components, tag filters, and search.",
};

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([getAllPosts(), getTags()]);

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-6 py-16">
      <section className="rounded-[32px] border border-white/10 bg-white/5 p-10">
        <h1 className="font-heading text-4xl font-semibold">
          Dispatches from Edo Tech Community
        </h1>
        <p className="mt-4 text-lg text-neutral-300">
          Markdown + MDX posts with reading-time estimates, related posts, and
          share buttons.
        </p>
      </section>

      <SectionHeading
        eyebrow="Archive"
        title="Browse by search or tag"
        description="Everything builds statically at deploy while keeping MDX flexibility."
      />
      <BlogExplorer posts={posts} tags={tags} />
    </div>
  );
}

