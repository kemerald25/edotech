import { getAllPosts } from "@/lib/mdx";
import { siteConfig } from "@/lib/utils";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/about", "/teams", "/programs", "/partners", "/blog", "/resources", "/join"].map(
    (route) => ({
      url: `${siteConfig.url}${route || "/"}`,
      lastModified: new Date().toISOString(),
    }),
  );

  const posts = await getAllPosts();

  return [
    ...routes,
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.date).toISOString(),
    })),
  ];
}

