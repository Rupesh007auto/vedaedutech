"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Pencil, X, Loader2, Eye } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";
import RichTextEditor from "@/components/dashboard/RichTextEditor";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  status: "draft" | "published";
  views: number;
}

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  coverImage: "",
  category: "General",
  status: "draft" as "draft" | "published",
};

export default function BlogManager() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Blog | null>(null);
const [form, setForm] = useState<Omit<Blog, "_id" | "slug" | "views">>(emptyForm);
  const [saving, setSaving] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-blogs"],
    queryFn: async () => {
      const res = await fetch("/api/blog?status=all");
      const json = await res.json();
      return (json.data || []) as Blog[];
    },
  });

  const { startUpload, isUploading } = useUploadThing("blogCoverImage", {
    onClientUploadComplete: (res) => {
      if (res?.[0]?.url) setForm((f) => ({ ...f, coverImage: res[0].url }));
    },
  });

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (blog: Blog) => {
  setEditing(blog);

  setForm({
    title: blog.title,
    excerpt: blog.excerpt,
    content: blog.content,
    coverImage: blog.coverImage,
    category: blog.category,
    status: blog.status,
  });

  setModalOpen(true);
};

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) {
        await fetch(`/api/blog/${editing._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, author: "VedaEdutech Team", tags: [] }),
        });
      }
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-navy-dark">Manage Blog</h2>
        <button onClick={openCreate} className="btn-primary !px-4 !py-2.5 !text-xs">
          <Plus size={15} className="mr-1.5" /> New Post
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin text-navy/30" size={28} /></div>
      ) : (
        <div className="space-y-3">
          {(data || []).map((blog) => (
            <div key={blog._id} className="flex items-center justify-between rounded-2xl border border-navy/5 bg-white p-5">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-navy-dark">{blog.title}</h3>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${blog.status === "published" ? "bg-brand-green/10 text-brand-green" : "bg-navy/5 text-navy-dark/50"}`}>
                    {blog.status}
                  </span>
                </div>
                <p className="mt-1 flex items-center gap-3 text-xs text-navy-dark/50">
                  <Eye size={12} /> {blog.views} views &middot; {blog.category}
                </p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(blog)} className="rounded-lg p-2 text-navy-dark/40 hover:bg-navy/5 hover:text-navy-dark"><Pencil size={15} /></button>
                <button onClick={() => handleDelete(blog._id)} className="rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600"><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-dark/60 p-4 backdrop-blur-sm overflow-y-auto py-10" onClick={() => setModalOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl rounded-3xl bg-white p-7">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-navy-dark">{editing ? "Edit Post" : "New Post"}</h3>
              <button onClick={() => setModalOpen(false)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <input className="input-field" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <textarea className="input-field" rows={2} placeholder="Short excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
              <div className="grid grid-cols-2 gap-4">
                <input className="input-field" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-navy/15 px-4 py-3 text-xs text-navy-dark/60 hover:border-teal">
                  {isUploading ? <Loader2 size={14} className="animate-spin" /> : form.coverImage ? "Cover uploaded ✓" : "Upload Cover Image"}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) startUpload([file]);
                  }} />
                </label>
              </div>
              <RichTextEditor value={form.content} onChange={(val) => setForm({ ...form, content: val })} />
              <div className="flex items-center gap-4">
                <select className="input-field !w-auto" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
                <button onClick={handleSave} disabled={saving} className="btn-accent flex-1">
                  {saving ? <Loader2 size={18} className="animate-spin" /> : editing ? "Save Changes" : "Create Post"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
