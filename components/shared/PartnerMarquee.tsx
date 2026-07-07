"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Building2, GraduationCap, BookOpen, Landmark, School, Award } from "lucide-react";

const partners = [
  { name: "Vedavaag Systems Ltd", icon: Building2 },
  { name: "CSP Haryana Network", icon: Landmark },
  { name: "CSP Uttar Pradesh", icon: School },
  { name: "CSP Bihar Network", icon: GraduationCap },
  { name: "VedaEdutech Academy", icon: BookOpen },
  { name: "Community Partners", icon: Award },
];

export default function PartnerMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      const width = track.scrollWidth / 2;
      gsap.to(track, {
        x: -width,
        duration: 22,
        ease: "none",
        repeat: -1,
      });
    }, track);

    return () => ctx.revert();
  }, []);

  const doubled = [...partners, ...partners];

  return (
    <div className="overflow-hidden border-y border-navy/5 bg-white py-8">
      <div ref={trackRef} className="flex w-max items-center gap-16">
        {doubled.map((p, i) => (
          <div key={`${p.name}-${i}`} className="flex shrink-0 items-center gap-3 text-navy-dark/40">
            <p.icon size={22} />
            <span className="whitespace-nowrap font-display text-sm font-bold uppercase tracking-wide">
              {p.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
