import { NextResponse } from "next/server";
import {
  getAllBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "@/lib/data-store";

export async function GET() {
  const posts = getAllBlogPosts();
  return NextResponse.json({ success: true, posts });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, excerpt, content, author, authorRole, coverImage, tags, featured, published } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: "Title and content are required" },
        { status: 400 },
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newPost = createBlogPost({
      title,
      slug: slug || `post-${Date.now()}`,
      excerpt: excerpt || title,
      content,
      author: author || "Volunteer Writer",
      authorRole: authorRole || "Community Contributor",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readingTime: `${Math.max(1, Math.ceil(content.split(" ").length / 200))} min read`,
      coverImage: coverImage || "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
      tags: tags || ["community"],
      featured: Boolean(featured),
      published: published !== false,
    });

    return NextResponse.json({ success: true, post: newPost });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ success: false, error: "Post ID required" }, { status: 400 });
    }
    const updated = updateBlogPost(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, post: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Post ID required" }, { status: 400 });
    }
    const ok = deleteBlogPost(id);
    return NextResponse.json({ success: ok });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
