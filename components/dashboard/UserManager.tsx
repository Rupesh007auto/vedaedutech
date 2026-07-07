"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, X, Loader2, ShieldOff, ShieldCheck } from "lucide-react";

interface UserRecord {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  isActive: boolean;
  studentClass?: string;
  subject?: string;
}

export default function UserManager({ role }: { role: "teacher" | "student" }) {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", studentClass: "", subject: "" });

  const { data, isLoading } = useQuery({
    queryKey: ["admin-users", role],
    queryFn: async () => {
      const res = await fetch(`/api/users?role=${role}`);
      const json = await res.json();
      return (json.data || []) as UserRecord[];
    },
  });

  const handleCreate = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "Failed to create user");
      queryClient.invalidateQueries({ queryKey: ["admin-users", role] });
      setModalOpen(false);
      setForm({ name: "", email: "", phone: "", password: "", studentClass: "", subject: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (user: UserRecord) => {
    await fetch(`/api/users/${user._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !user.isActive }),
    });
    queryClient.invalidateQueries({ queryKey: ["admin-users", role] });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this account permanently?")) return;
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    queryClient.invalidateQueries({ queryKey: ["admin-users", role] });
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-navy-dark capitalize">Manage {role}s</h2>
        <button onClick={() => setModalOpen(true)} className="btn-primary !px-4 !py-2.5 !text-xs">
          <Plus size={15} className="mr-1.5" /> Add {role}
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin text-navy/30" size={28} /></div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-navy/5 bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-navy/10 text-xs uppercase tracking-wide text-navy-dark/40">
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Phone</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(data || []).map((user) => (
                <tr key={user._id} className="border-b border-navy/5 last:border-0">
                  <td className="px-5 py-3 font-medium text-navy-dark">{user.name}</td>
                  <td className="px-5 py-3 text-navy-dark/60">{user.email}</td>
                  <td className="px-5 py-3 text-navy-dark/60">{user.phone || "-"}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${user.isActive ? "bg-brand-green/10 text-brand-green" : "bg-red-50 text-red-500"}`}>
                      {user.isActive ? "Active" : "Deactivated"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => toggleActive(user)} className="rounded-lg p-2 text-navy-dark/40 hover:bg-navy/5" title={user.isActive ? "Deactivate" : "Activate"}>
                      {user.isActive ? <ShieldOff size={15} /> : <ShieldCheck size={15} />}
                    </button>
                    <button onClick={() => handleDelete(user._id)} className="rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600">
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-dark/60 p-4 backdrop-blur-sm" onClick={() => setModalOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-3xl bg-white p-7">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-navy-dark capitalize">Add {role}</h3>
              <button onClick={() => setModalOpen(false)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <input className="input-field" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input className="input-field" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input className="input-field" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <input className="input-field" type="password" placeholder="Temporary password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              {role === "student" && (
                <input className="input-field" placeholder="Class (e.g. 8)" value={form.studentClass} onChange={(e) => setForm({ ...form, studentClass: e.target.value })} />
              )}
              {role === "teacher" && (
                <input className="input-field" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
              )}
              {error && <p className="error-text">{error}</p>}
              <button onClick={handleCreate} disabled={saving} className="btn-accent w-full">
                {saving ? <Loader2 size={18} className="animate-spin" /> : `Create ${role} Account`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
