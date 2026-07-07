"use client";

import { useSession } from "next-auth/react";
import { BookOpen, Users, ClipboardCheck, Calendar } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";

export default function TeacherOverviewPage() {
  const { data: session } = useSession();

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-navy-dark">
        Welcome, {session?.user?.name || "Teacher"}
      </h1>
      <p className="mt-1 text-sm text-navy-dark/50">Here's an overview of your teaching activity.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Assigned Courses" value={3} icon={BookOpen} accent="text-teal" bg="bg-teal/10" />
        <StatCard label="Total Students" value={86} icon={Users} accent="text-amber-600" bg="bg-amber/10" />
        <StatCard label="Assessments Graded" value={124} icon={ClipboardCheck} accent="text-brand-green" bg="bg-brand-green/10" />
        <StatCard label="Classes This Week" value={12} icon={Calendar} accent="text-brand-purple" bg="bg-brand-purple/10" />
      </div>

      <div className="mt-8 rounded-2xl border border-navy/5 bg-white p-6 shadow-[0_2px_12px_rgba(18,41,75,0.04)]">
        <h2 className="mb-4 font-display font-bold text-navy-dark">This Week's Schedule</h2>
        <ul className="divide-y divide-navy/5">
          {[
            { day: "Monday", time: "10:00 AM - 11:30 AM", subject: "Smart Class Foundation - Batch A" },
            { day: "Wednesday", time: "2:00 PM - 3:30 PM", subject: "Spoken English Mastery - Batch C" },
            { day: "Friday", time: "11:00 AM - 12:30 PM", subject: "K-12 Curriculum Support - Class 10" },
          ].map((s) => (
            <li key={s.day} className="flex items-center justify-between py-3 text-sm">
              <span className="font-semibold text-navy-dark">{s.day}</span>
              <span className="text-navy-dark/60">{s.subject}</span>
              <span className="text-navy-dark/40">{s.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
