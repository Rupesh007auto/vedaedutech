"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface StudentRecord {
  _id: string;
  name: string;
  email: string;
  studentClass?: string;
}

export default function TeacherStudentsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["teacher-students"],
    queryFn: async () => {
      const res = await fetch("/api/users?role=student");
      const json = await res.json();
      return (json.data || []) as StudentRecord[];
    },
  });

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-navy-dark">My Students</h1>
      {isLoading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin text-navy/30" size={28} /></div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-navy/5 bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-navy/10 text-xs uppercase tracking-wide text-navy-dark/40">
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Class</th>
              </tr>
            </thead>
            <tbody>
              {(data || []).map((s) => (
                <tr key={s._id} className="border-b border-navy/5 last:border-0">
                  <td className="px-5 py-3 font-medium text-navy-dark">{s.name}</td>
                  <td className="px-5 py-3 text-navy-dark/60">{s.email}</td>
                  <td className="px-5 py-3 text-navy-dark/60">{s.studentClass || "-"}</td>
                </tr>
              ))}
              {(data || []).length === 0 && (
                <tr><td colSpan={3} className="px-5 py-10 text-center text-navy-dark/40">No students found yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
