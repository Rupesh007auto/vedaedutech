"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Youtube, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import Logo from "@/components/ui/Logo";
import NewsletterForm from "@/components/forms/NewsletterForm";
import { mainNav } from "@/lib/nav-data";

const socials = [
  { icon: Facebook, href: "https://facebook.com/vedaedutech", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/vedaedutech", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@vedaedutech", label: "YouTube" },
  { icon: Linkedin, href: "https://linkedin.com/company/vedaedutech", label: "LinkedIn" },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/dashboard")) return null;

  return (
    <footer className="relative overflow-hidden bg-navy-dark pt-20 text-white">
      <div className="pointer-events-none absolute inset-0 bg-hero-gradient opacity-40" />
      <div className="container-page relative">
        <div className="grid grid-cols-1 gap-12 pb-16 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="light" size="md" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Empowering learners across India with technology-driven education, smart
              classrooms, and community-first learning centers — a Vedavaag Systems Ltd initiative.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:-translate-y-1 hover:bg-amber hover:text-navy-dark"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-display text-sm font-bold uppercase tracking-wider text-amber">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {mainNav.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/60 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-display text-sm font-bold uppercase tracking-wider text-amber">
              Get In Touch
            </h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-teal-light" />
                HITEC City, Hyderabad, Telangana, India
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-teal-light" />
                +91 40 4018 8140
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-teal-light" />
                info@vedavaag.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-display text-sm font-bold uppercase tracking-wider text-amber">
              Stay Updated
            </h4>
            <p className="mb-4 text-sm text-white/60">
              Get admission updates, scholarship news, and CSP center announcements.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} VedaEdutech, a Vedavaag Systems Ltd company. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
