"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, Bell } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { adminNav, teacherNav, studentNav, sharedNav, type NavItem } from "@/lib/dashboard-nav";
import { cn } from "@/lib/utils";

const navByRole: Record<string, NavItem[]> = {
  admin: adminNav,
  teacher: teacherNav,
  student: studentNav,
};

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const role = session?.user?.role || "student";
  const nav = navByRole[role] || [];

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-6 py-6">
        <Logo size="sm" />
        <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-navy-dark/60 transition-colors hover:bg-navy/5 hover:text-navy-dark",
              pathname === item.href && "bg-navy text-white hover:bg-navy hover:text-white"
            )}
          >
            <item.icon size={18} /> {item.label}
          </Link>
        ))}

        <div className="my-4 border-t border-navy/10" />

        {sharedNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-navy-dark/60 transition-colors hover:bg-navy/5 hover:text-navy-dark",
              pathname === item.href && "bg-navy text-white hover:bg-navy hover:text-white"
            )}
          >
            <item.icon size={18} /> {item.label}
          </Link>
        ))}
      </nav>

      <div className="px-4 pb-6">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface-muted">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-navy/5 bg-white lg:block">
        {SidebarContent}
      </aside>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-navy-dark/50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "tween" }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white lg:hidden"
            >
              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-navy/5 bg-white/80 px-6 py-4 backdrop-blur-xl">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <p className="hidden font-display text-sm font-bold text-navy-dark lg:block">
            Welcome back, {session?.user?.name || "there"}
          </p>
          <div className="flex items-center gap-4">
            <button className="relative text-navy-dark/50 hover:text-navy-dark">
              <Bell size={20} />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-brand-orange" />
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy font-display text-xs font-bold text-white">
              {session?.user?.name?.charAt(0) || "U"}
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
