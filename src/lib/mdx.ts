import { mdxComponents } from "@/components/mdx/mdx-components";
import { BlogFrontmatter, BlogPost } from "@/types/content";
import fs from "fs/promises";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { formatDate, getReadingTime } from "./utils";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

async function readPostFile(slug: string) {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  return fs.readFile(fullPath, "utf-8");
}

export async function getAllPosts(): Promise<BlogFrontmatter[]> {
  const files = await fs.readdir(BLOG_DIR);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const fileContent = await fs.readFile(path.join(BLOG_DIR, file), "utf-8");
        const { data } = matter(fileContent);
        const slug = file.replace(/\.mdx$/, "");
        return {
          ...(data as BlogFrontmatter),
          slug,
          date: formatDate(data.date),
        };
      }),
  );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getPost(slug: string): Promise<BlogPost> {
  const source = await readPostFile(slug);
  const { content: plain } = matter(source);
  const readingTime = getReadingTime(plain);

  const mdx = await compileMDX<BlogFrontmatter>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: { className: "text-secondary" },
            },
          ],
        ],
      },
    },
  });

  const allPosts = await getAllPosts();
  const related = allPosts
    .filter(
      (post) =>
        post.slug !== slug &&
        post.tags.some((tag) => mdx.frontmatter.tags.includes(tag)),
    )
    .slice(0, 3);

  return {
    ...mdx.frontmatter,
    slug,
    readingTime,
    content: mdx.content,
    related,
  };
}

export async function getFeaturedPosts(limit = 3) {
  const posts = await getAllPosts();
  return posts.filter((post) => post.featured).slice(0, limit);
}

export async function getTags() {
  const posts = await getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}

