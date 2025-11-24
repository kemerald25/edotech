import { Badge } from "@/components/blog/tag";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAllPosts, getPost } from "@/lib/mdx";
import { formatDate, siteConfig } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params) {
  const post = await getPost(params.slug).catch(() => null);
  if (!post) return {};
  const url = `${siteConfig.url}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      url,
    },
    alternates: { canonical: url },
  };
}

export default async function BlogDetail({ params }: Params) {
  const post = await getPost(params.slug).catch(() => null);
  if (!post) return notFound();

  const shareUrl = encodeURIComponent(`${siteConfig.url}/blog/${post.slug}`);

  return (
    <article className="mx-auto max-w-3xl space-y-8 px-6 py-16">
      <div className="space-y-4 text-center">
        <Badge className="mx-auto">{post.tags[0]}</Badge>
        <h1 className="font-heading text-4xl font-semibold">{post.title}</h1>
        <p className="text-neutral-300">{post.excerpt}</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-400">
          <span>{post.author}</span>
          <span>{formatDate(post.date)}</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
      <Image
        src={post.coverImage}
        alt={post.title}
        width={1200}
        height={630}
        className="rounded-3xl border border-white/10"
      />
      <div className="prose prose-invert prose-headings:font-heading prose-a:text-secondary">
        {post.content}
      </div>
      <div className="flex flex-wrap gap-3">
        <a
          href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(post.title)}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-white/10 px-4 py-2 text-sm"
        >
          Share on X
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${encodeURIComponent(post.title)}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-white/10 px-4 py-2 text-sm"
        >
          Share on LinkedIn
        </a>
      </div>

      {post.related.length > 0 && (
        <section className="space-y-6">
          <SectionHeading
            eyebrow="Related"
            title="More reads"
            description="Posts sharing similar tags"
          />
          <div className="space-y-4">
            {post.related.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:border-secondary/50"
              >
                <div>
                  <p className="text-lg font-semibold">{related.title}</p>
                  <p className="text-sm text-neutral-400">{related.excerpt}</p>
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-secondary/80">
                  Read
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

