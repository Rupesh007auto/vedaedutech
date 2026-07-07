"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Pencil, X, Loader2 } from "lucide-react";

interface Course {
  _id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  mode: string;
  fee: number;
  featured: boolean;
  isActive: boolean;
}

const emptyForm = { title: "", category: "smart-classes", description: "", duration: "", mode: "Hybrid", fee: 0, featured: false };

export default function CourseManager() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Course | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-courses"],
    queryFn: async () => {
      const res = await fetch("/api/courses?category=");
      const json = await res.json();
      return (json.data || []) as Course[];
    },
  });

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (course: Course) => {
    setEditing(course);
    setForm({ ...course, category: course.category });
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) {
        await fetch(`/api/courses/${editing._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, syllabus: [] }),
        });
      }
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this course?")) return;
    await fetch(`/api/courses/${id}`, { method: "DELETE" });
    queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-navy-dark">Manage Courses</h2>
        <button onClick={openCreate} className="btn-primary !px-4 !py-2.5 !text-xs">
          <Plus size={15} className="mr-1.5" /> Add Course
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin text-navy/30" size={28} /></div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(data || []).map((course) => (
            <div key={course._id} className="rounded-2xl border border-navy/5 bg-white p-5 shadow-[0_2px_12px_rgba(18,41,75,0.04)]">
              <div className="flex items-start justify-between">
                <h3 className="font-display font-bold text-navy-dark">{course.title}</h3>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(course)} className="rounded-lg p-1.5 text-navy-dark/40 hover:bg-navy/5 hover:text-navy-dark"><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(course._id)} className="rounded-lg p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600"><Trash2 size={14} /></button>
                </div>
              </div>
              <p className="mt-2 line-clamp-2 text-xs text-navy-dark/50">{course.description}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-navy-dark/60">
                <span>{course.duration}</span>
                <span className="font-bold">₹{course.fee.toLocaleString("en-IN")}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-dark/60 p-4 backdrop-blur-sm" onClick={() => setModalOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg rounded-3xl bg-white p-7">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-navy-dark">{editing ? "Edit Course" : "New Course"}</h3>
              <button onClick={() => setModalOpen(false)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <input className="input-field" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <textarea className="input-field" rows={3} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <div className="grid grid-cols-2 gap-4">
                <input className="input-field" placeholder="Duration (e.g. 3 Months)" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
                <input className="input-field" type="number" placeholder="Fee" value={form.fee} onChange={(e) => setForm({ ...form, fee: Number(e.target.value) })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <select className="input-field" value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}>
                  <option>Online</option><option>Offline</option><option>Hybrid</option>
                </select>
                <label className="flex items-center gap-2 text-sm text-navy-dark/70">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured
                </label>
              </div>
              <button onClick={handleSave} disabled={saving} className="btn-accent w-full">
                {saving ? <Loader2 size={18} className="animate-spin" /> : editing ? "Save Changes" : "Create Course"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
