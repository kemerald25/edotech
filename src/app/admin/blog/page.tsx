"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Tag,
  ExternalLink,
  X,
  Sparkles,
} from "lucide-react";
import { DynamicBlogPost } from "@/lib/data-store";
import { ImageUploader } from "@/components/admin/image-uploader";
import { useAdmin } from "../layout";

export default function BlogAdminPage() {
  const { can } = useAdmin();
  const [posts, setPosts] = useState<DynamicBlogPost[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<DynamicBlogPost | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Volunteer Writer");
  const [authorRole, setAuthorRole] = useState("Community Contributor");
  const [coverImage, setCoverImage] = useState("");
  const [tagInput, setTagInput] = useState("ai, civic-tech, community");
  const [published, setPublished] = useState(true);
  const [featured, setFeatured] = useState(false);

  const loadPosts = async () => {
    try {
      const res = await fetch("/api/admin/blog");
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleOpenCreate = () => {
    setEditingPost(null);
    setTitle("");
    setExcerpt("");
    setContent(`# Article Title\n\nWrite your community insights or research brief here...`);
    setAuthor("Volunteer Writer");
    setAuthorRole("Community Contributor");
    setCoverImage("https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80");
    setTagInput("innovation, labs, edo");
    setPublished(true);
    setFeatured(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post: DynamicBlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setAuthor(post.author);
    setAuthorRole(post.authorRole);
    setCoverImage(post.coverImage);
    setTagInput(post.tags.join(", "));
    setPublished(post.published);
    setFeatured(post.featured);
    setIsModalOpen(true);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const tags = tagInput
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    try {
      if (editingPost) {
        const res = await fetch("/api/admin/blog", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingPost.id,
            title,
            excerpt,
            content,
            author,
            authorRole,
            coverImage,
            tags,
            published,
            featured,
          }),
        });
        if (res.ok) setFeedback(`Article "${title}" updated.`);
      } else {
        const res = await fetch("/api/admin/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            excerpt,
            content,
            author,
            authorRole,
            coverImage,
            tags,
            published,
            featured,
          }),
        });
        if (res.ok) setFeedback(`Article "${title}" created and published!`);
      }

      setIsModalOpen(false);
      loadPosts();
      setTimeout(() => setFeedback(null), 3500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePost = async (id: string, name: string) => {
    if (!confirm(`Delete article "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/blog?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setFeedback(`Article "${name}" removed.`);
        loadPosts();
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary mb-2">
            <FileText className="size-3.5" />
            <span>Editorial Studio</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-white tracking-tight">
            Blog & Publications Studio
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Author and publish research deep dives, cohort highlights, and civic tech briefs directly to the community blog.
          </p>
        </div>

        {can("blog.create") && (
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-secondary hover:bg-secondary/90 px-4 py-2.5 text-xs font-bold text-black transition shadow-lg shadow-secondary/10 cursor-pointer"
          >
            <Plus className="size-4" />
            <span>Draft New Article</span>
          </button>
        )}
      </div>

      {feedback && (
        <div className="rounded-2xl border border-green-400/30 bg-green-500/10 p-4 flex items-center gap-3 text-sm text-green-200">
          <CheckCircle2 className="size-5 text-green-400 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4 flex flex-col justify-between relative overflow-hidden transition hover:border-white/20"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 2).map((t) => (
                    <span key={t} className="text-[10px] uppercase font-semibold text-secondary bg-secondary/10 px-2 py-0.5 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                  post.published ? "text-green-400 bg-green-400/10" : "text-yellow-400 bg-yellow-400/10"
                }`}>
                  {post.published ? "Live" : "Draft"}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white font-heading line-clamp-2">{post.title}</h3>
              <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed">{post.excerpt}</p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
              <div>
                <p className="text-white font-semibold">{post.author}</p>
                <p className="text-[11px] text-neutral-400">{post.date} · {post.readingTime}</p>
              </div>

              <div className="flex items-center gap-1.5">
                {can("blog.edit") && (
                  <button
                    onClick={() => handleOpenEdit(post)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 transition"
                    title="Edit article"
                  >
                    <Edit2 className="size-3.5" />
                  </button>
                )}
                {can("blog.delete") && (
                  <button
                    onClick={() => handleDeletePost(post.id, post.title)}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                    title="Delete article"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="rounded-3xl border border-white/10 bg-[#0E121E] w-full max-w-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white font-heading">
                  {editingPost ? "Edit Article" : "Draft New Article"}
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">Author articles with Markdown and rich typography.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-neutral-400 hover:text-white">
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSavePost} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Civic Labs are Reimagining Public Services"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white focus:border-secondary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1">
                  Excerpt Summary
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="A concise synopsis of the article..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white focus:border-secondary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white focus:border-secondary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1">
                    Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white focus:border-secondary focus:outline-none"
                  />
                </div>
              </div>

              <ImageUploader
                label="Article Cover Image"
                value={coverImage}
                onChange={setCoverImage}
                folder="blog"
                placeholder="https://res.cloudinary.com/..."
              />

              <div>
                <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1">
                  Article Content (Markdown supported)
                </label>
                <textarea
                  rows={8}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full font-mono rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white focus:border-secondary focus:outline-none leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="rounded border-white/20 bg-black text-secondary focus:ring-0"
                  />
                  <span>Publish Live on Website</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-medium text-neutral-300 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary/90 text-xs font-bold text-black shadow-lg shadow-secondary/10"
                >
                  {editingPost ? "Save Changes" : "Publish Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
