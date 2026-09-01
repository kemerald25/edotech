import { NextResponse } from "next/server";
import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} from "@/lib/data-store";

export async function GET() {
  try {
    const posts = getAllPosts();
    return NextResponse.json({ success: true, posts });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load posts";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      excerpt,
      content,
      author,
      authorRole,
      coverImage,
      tags,
      published,
      featured,
    } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: "Title and content are required" },
        { status: 400 }
      );
    }

    const post = createPost({
      title,
      excerpt: excerpt || "",
      content,
      author: author || "Volunteer Writer",
      authorRole: authorRole || "Community Contributor",
      coverImage: coverImage || "",
      tags: tags || [],
      published: published !== false,
      featured: !!featured,
    });

    return NextResponse.json({ success: true, post });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create post";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Post ID is required" }, { status: 400 });
    }

    const post = updatePost(id, updates);
    if (!post) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, post });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update post";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Post ID is required" }, { status: 400 });
    }

    const deleted = deletePost(id);
    return NextResponse.json({ success: deleted });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete post";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
