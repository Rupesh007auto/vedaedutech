"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Clock, IndianRupee, BookOpen } from "lucide-react";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import CourseEnquiryForm from "@/components/forms/CourseEnquiryForm";
import { seedCourses } from "@/lib/site-content";

interface Course {
  _id?: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  mode: string;
  fee: number;
  syllabus: string[];
}

const CATEGORIES = [
  { value: "all", label: "All Courses" },
  { value: "smart-classes", label: "Smart Classes" },
  { value: "k12", label: "K-12 Support" },
  { value: "spoken-english", label: "Spoken English" },
  { value: "computer", label: "Computer Basics" },
  { value: "competitive", label: "Competitive Exams" },
  { value: "vocational", label: "Vocational" },
];

async function fetchCourses(): Promise<Course[]> {
  try {
    const res = await fetch("/api/courses");
    const json = await res.json();
    if (json.success && json.data.length > 0) return json.data;
    return seedCourses;
  } catch {
    return seedCourses;
  }
}

export default function CoursesExplorer() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [enquiryCourse, setEnquiryCourse] = useState<string | null>(null);

  const { data: courses = seedCourses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchCategory = category === "all" || c.category === category;
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [courses, category, search]);

  return (
    <section className="container-page py-24">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-dark/30" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="input-field pl-11"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                category === c.value ? "bg-navy text-white" : "bg-navy/5 text-navy-dark/70 hover:bg-navy/10"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-80 rounded-3xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-navy-dark/50">
          <BookOpen className="mx-auto mb-4" size={40} />
          No courses match your search. Try a different keyword or category.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course, i) => (
            <RevealOnScroll key={course.title} delay={(i % 3) * 0.08}>
              <div className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_2px_20px_rgba(18,41,75,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-premium">
                <div className="relative h-40 bg-gradient-to-br from-navy to-navy-light">
                  <div className="absolute inset-0 bg-hero-gradient opacity-60" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-navy">
                    {course.mode}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-bold text-navy-dark">{course.title}</h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm text-navy-dark/60">{course.description}</p>
                  <ul className="mt-4 space-y-1.5">
                    {course.syllabus.slice(0, 2).map((s) => (
                      <li key={s} className="flex items-center gap-2 text-xs text-navy-dark/50">
                        <span className="h-1 w-1 rounded-full bg-teal" /> {s}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center justify-between border-t border-navy/5 pt-4 text-sm">
                    <span className="flex items-center gap-1.5 text-navy-dark/50">
                      <Clock size={14} /> {course.duration}
                    </span>
                    <span className="flex items-center gap-0.5 font-bold text-navy-dark">
                      <IndianRupee size={14} /> {course.fee.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <button
                    onClick={() => setEnquiryCourse(course.title)}
                    className="btn-primary mt-4 w-full !py-2.5 !text-xs"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      )}

      {enquiryCourse && (
        <CourseEnquiryForm courseTitle={enquiryCourse} onClose={() => setEnquiryCourse(null)} />
      )}
    </section>
  );
}
