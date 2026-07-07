"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function StatCard({
  label,
  value,
  icon: Icon,
  accent = "text-teal",
  bg = "bg-teal/10",
}: {
  label: string;
  value: number | string;
  icon: LucideIcon;
  accent?: string;
  bg?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-navy/5 bg-white p-6 shadow-[0_2px_12px_rgba(18,41,75,0.04)]"
    >
      <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${bg} ${accent}`}>
        <Icon size={20} />
      </div>
      <p className="font-display text-2xl font-extrabold text-navy-dark">{value}</p>
      <p className="mt-1 text-xs font-medium text-navy-dark/50">{label}</p>
    </motion.div>
  );
}
