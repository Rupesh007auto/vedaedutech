"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RevealOnScroll from "@/components/animations/RevealOnScroll";

export default function CTASection({
  title = "Ready to Begin Your Learning Journey?",
  description = "Join thousands of students already learning with VedaEdutech. Admissions are open for the current academic term.",
  primaryLabel = "Apply for Admission",
  primaryHref = "/admissions",
  secondaryLabel = "Talk to Us",
  secondaryHref = "/contact",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="container-page pb-24">
      <RevealOnScroll>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-navy to-navy-dark px-8 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute inset-0 bg-hero-gradient opacity-50" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/60">{description}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href={primaryHref} className="btn-accent group">
                {primaryLabel}
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href={secondaryHref} className="btn-outline !border-white/20 !bg-white/5 !text-white hover:!bg-white hover:!text-navy-dark">
                {secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
