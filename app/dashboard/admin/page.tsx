"use client";

import { useQuery } from "@tanstack/react-query";
import { Mail, GraduationCap, Handshake, Briefcase, BookOpen, Image as ImageIcon, Newspaper, Users } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import { formatDate } from "@/lib/utils";

interface Analytics {
  counts: Record<string, number>;
  recentContacts: { _id: string; name: string; subject: string; createdAt: string }[];
  recentAdmissions: { _id: string; studentName: string; courseInterested: string; createdAt: string }[];
}

export default function AdminOverviewPage() {
  const { data, isLoading } = useQuery<{ success: boolean; data: Analytics }>({
    queryKey: ["admin-analytics"],
    queryFn: async () => {
      const res = await fetch("/api/admin/analytics");
      return res.json();
    },
  });

  const counts = data?.data?.counts;

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-navy-dark">Admin Overview</h1>
      <p className="mt-1 text-sm text-navy-dark/50">A snapshot of everything happening across VedaEdutech.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <StatCard label="Total Enquiries" value={isLoading ? "-" : counts?.contacts ?? 0} icon={Mail} accent="text-teal" bg="bg-teal/10" />
        <StatCard label="Admissions" value={isLoading ? "-" : counts?.admissions ?? 0} icon={GraduationCap} accent="text-amber-600" bg="bg-amber/10" />
        <StatCard label="Franchise Leads" value={isLoading ? "-" : counts?.franchises ?? 0} icon={Handshake} accent="text-brand-purple" bg="bg-brand-purple/10" />
        <StatCard label="Career Applications" value={isLoading ? "-" : counts?.careers ?? 0} icon={Briefcase} accent="text-brand-orange" bg="bg-brand-orange/10" />
        <StatCard label="Active Courses" value={isLoading ? "-" : counts?.courses ?? 0} icon={BookOpen} accent="text-teal" bg="bg-teal/10" />
        <StatCard label="Gallery Items" value={isLoading ? "-" : counts?.gallery ?? 0} icon={ImageIcon} accent="text-brand-pink" bg="bg-brand-pink/10" />
        <StatCard label="Blog Posts" value={isLoading ? "-" : counts?.blogs ?? 0} icon={Newspaper} accent="text-navy" bg="bg-navy/10" />
        <StatCard label="Students & Teachers" value={isLoading ? "-" : (counts?.students ?? 0) + (counts?.teachers ?? 0)} icon={Users} accent="text-brand-green" bg="bg-brand-green/10" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-navy/5 bg-white p-6 shadow-[0_2px_12px_rgba(18,41,75,0.04)]">
          <h2 className="mb-4 font-display font-bold text-navy-dark">Recent Contact Enquiries</h2>
          {data?.data?.recentContacts?.length ? (
            <ul className="space-y-3">
              {data.data.recentContacts.map((c) => (
                <li key={c._id} className="flex items-center justify-between border-b border-navy/5 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-semibold text-navy-dark">{c.name}</p>
                    <p className="text-xs text-navy-dark/50">{c.subject}</p>
                  </div>
                  <span className="text-xs text-navy-dark/40">{formatDate(c.createdAt)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-navy-dark/40">No enquiries yet.</p>
          )}
        </div>

        <div className="rounded-2xl border border-navy/5 bg-white p-6 shadow-[0_2px_12px_rgba(18,41,75,0.04)]">
          <h2 className="mb-4 font-display font-bold text-navy-dark">Recent Admissions</h2>
          {data?.data?.recentAdmissions?.length ? (
            <ul className="space-y-3">
              {data.data.recentAdmissions.map((a) => (
                <li key={a._id} className="flex items-center justify-between border-b border-navy/5 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-semibold text-navy-dark">{a.studentName}</p>
                    <p className="text-xs text-navy-dark/50">{a.courseInterested}</p>
                  </div>
                  <span className="text-xs text-navy-dark/40">{formatDate(a.createdAt)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-navy-dark/40">No admissions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
