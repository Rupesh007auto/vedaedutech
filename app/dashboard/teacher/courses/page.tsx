"use client";

import { useQuery } from "@tanstack/react-query";
import { Clock, IndianRupee } from "lucide-react";
import { seedCourses } from "@/lib/site-content";

export default function TeacherCoursesPage() {
  const { data: courses = seedCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await fetch("/api/courses");
      const json = await res.json();
      return json.success && json.data.length > 0 ? json.data : seedCourses;
    },
  });

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-navy-dark">My Courses</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.slice(0, 3).map((c: { title: string; description: string; duration: string; fee: number }) => (
          <div key={c.title} className="rounded-2xl border border-navy/5 bg-white p-6 shadow-[0_2px_12px_rgba(18,41,75,0.04)]">
            <h3 className="font-display font-bold text-navy-dark">{c.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm text-navy-dark/60">{c.description}</p>
            <div className="mt-4 flex items-center justify-between border-t border-navy/5 pt-4 text-xs text-navy-dark/50">
              <span className="flex items-center gap-1"><Clock size={13} /> {c.duration}</span>
              <span className="flex items-center gap-0.5 font-bold text-navy-dark"><IndianRupee size={13} /> {c.fee.toLocaleString("en-IN")}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
