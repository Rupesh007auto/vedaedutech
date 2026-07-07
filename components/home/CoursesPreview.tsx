"use client";

import Link from "next/link";
import { ArrowRight, Clock, IndianRupee } from "lucide-react";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { seedCourses } from "@/lib/site-content";

export default function CoursesPreview() {
  const featured = seedCourses.filter((c) => c.featured);

  return (
    <section className="bg-surface-muted py-24">
      <div className="container-page">
        <RevealOnScroll className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="section-eyebrow">Our Programs</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-navy-dark sm:text-4xl">
              Popular Courses This Term
            </h2>
          </div>
          <Link href="/courses" className="btn-outline shrink-0">
            View All Courses <ArrowRight size={16} className="ml-2" />
          </Link>
        </RevealOnScroll>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((course, i) => (
            <RevealOnScroll key={course.title} delay={i * 0.1}>
              <div className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_2px_20px_rgba(18,41,75,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-premium">
                <div className="relative h-44 bg-gradient-to-br from-navy to-navy-light">
                  <div className="absolute inset-0 flex items-center justify-center bg-hero-gradient opacity-60" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-navy">
                    {course.mode}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-bold text-navy-dark">{course.title}</h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm text-navy-dark/60">{course.description}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-navy/5 pt-4 text-sm">
                    <span className="flex items-center gap-1.5 text-navy-dark/50">
                      <Clock size={14} /> {course.duration}
                    </span>
                    <span className="flex items-center gap-0.5 font-bold text-navy-dark">
                      <IndianRupee size={14} /> {course.fee.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
