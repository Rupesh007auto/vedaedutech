"use client";

import { useSession } from "next-auth/react";
import { BookOpen, Award, TrendingUp, Calendar } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";

export default function StudentOverviewPage() {
  const { data: session } = useSession();

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-navy-dark">
        Welcome, {session?.user?.name || "Student"}
      </h1>
      <p className="mt-1 text-sm text-navy-dark/50">Keep up the great work! Here's your learning summary.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Enrolled Courses" value={2} icon={BookOpen} accent="text-teal" bg="bg-teal/10" />
        <StatCard label="Assessments Passed" value={14} icon={Award} accent="text-amber-600" bg="bg-amber/10" />
        <StatCard label="Attendance" value="92%" icon={TrendingUp} accent="text-brand-green" bg="bg-brand-green/10" />
        <StatCard label="Classes This Week" value={5} icon={Calendar} accent="text-brand-purple" bg="bg-brand-purple/10" />
      </div>

      <div className="mt-8 rounded-2xl border border-navy/5 bg-white p-6 shadow-[0_2px_12px_rgba(18,41,75,0.04)]">
        <h2 className="mb-4 font-display font-bold text-navy-dark">Upcoming Classes</h2>
        <ul className="divide-y divide-navy/5">
          {[
            { day: "Tomorrow", time: "10:00 AM", subject: "Smart Class Foundation - Mathematics" },
            { day: "Thursday", time: "2:00 PM", subject: "Spoken English Mastery - Speaking Practice" },
          ].map((s) => (
            <li key={s.subject} className="flex items-center justify-between py-3 text-sm">
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
