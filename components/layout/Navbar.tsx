"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, LogIn } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { mainNav } from "@/lib/nav-data";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isDashboard = pathname?.startsWith("/dashboard");
  if (isDashboard) return null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="container-page">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500",
            scrolled ? "glass shadow-glass" : "bg-transparent"
          )}
        >
          <Logo size="sm" />

          <nav className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.mega && setMegaOpen(item.label)}
                onMouseLeave={() => item.mega && setMegaOpen(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-navy-dark/80 transition-colors hover:bg-navy/5 hover:text-navy-dark",
                    pathname === item.href && "bg-navy/5 text-navy-dark"
                  )}
                >
                  {item.label}
                  {item.mega && <ChevronDown size={14} />}
                </Link>

                <AnimatePresence>
                  {item.mega && megaOpen === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 top-full mt-2 w-[480px] -translate-x-1/2 rounded-2xl border border-navy/5 bg-white p-6 shadow-premium"
                    >
                      <div className="grid grid-cols-2 gap-6">
                        {item.mega.map((col) => (
                          <div key={col.heading}>
                            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-amber-600">
                              {col.heading}
                            </p>
                            <ul className="space-y-2">
                              {col.links.map((l) => (
                                <li key={l.href}>
                                  <Link
                                    href={l.href}
                                    className="text-sm font-medium text-navy-dark/70 transition-colors hover:text-teal"
                                  >
                                    {l.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/login/student" className="btn-outline !px-5 !py-2.5 !text-xs">
              <LogIn size={14} className="mr-1.5" /> Login
            </Link>
            <Link href="/admissions" className="btn-accent !px-5 !py-2.5 !text-xs">
              Apply Now
            </Link>
          </div>

          <button
            className="rounded-full p-2 text-navy-dark lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="container-page overflow-hidden lg:hidden"
          >
            <div className="mt-2 space-y-1 rounded-2xl glass p-4">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-xl px-4 py-3 text-sm font-semibold text-navy-dark hover:bg-navy/5"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 flex gap-2 px-2">
                <Link href="/login/student" className="btn-outline flex-1 !py-2.5 !text-xs">
                  Login
                </Link>
                <Link href="/admissions" className="btn-accent flex-1 !py-2.5 !text-xs">
                  Apply Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
