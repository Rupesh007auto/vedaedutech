"use client";

import { useQuery } from "@tanstack/react-query";
import { Clock, IndianRupee } from "lucide-react";
import { seedCourses } from "@/lib/site-content";

export default function StudentCoursesPage() {
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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {courses.slice(0, 2).map((c: { title: string; description: string; duration: string; fee: number }) => (
          <div key={c.title} className="rounded-2xl border border-navy/5 bg-white p-6 shadow-[0_2px_12px_rgba(18,41,75,0.04)]">
            <h3 className="font-display font-bold text-navy-dark">{c.title}</h3>
            <p className="mt-2 text-sm text-navy-dark/60">{c.description}</p>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-navy/5">
              <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-teal to-teal-light" />
            </div>
            <p className="mt-2 text-xs text-navy-dark/50">60% Complete</p>
          </div>
        ))}
      </div>
    </div>
  );
}
