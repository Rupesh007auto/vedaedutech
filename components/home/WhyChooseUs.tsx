"use client";

import { Monitor, Building2, Target, HeartHandshake, Users, MessageSquare } from "lucide-react";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { whyChooseUs } from "@/lib/site-content";

const icons = { Monitor, Building2, Target, HeartHandshake, Users, MessageSquare };

export default function WhyChooseUs() {
  return (
    <section className="container-page py-24">
      <RevealOnScroll className="mx-auto max-w-2xl text-center">
        <span className="section-eyebrow">Why VedaEdutech</span>
        <h2 className="mt-4 font-display text-3xl font-extrabold text-navy-dark sm:text-4xl">
          Learning Built for Real Outcomes
        </h2>
        <p className="mt-4 text-navy-dark/60">
          We combine proven pedagogy with accessible technology to deliver measurable results
          for students, families, and communities.
        </p>
      </RevealOnScroll>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {whyChooseUs.map((item, i) => {
          const Icon = icons[item.icon as keyof typeof icons];
          return (
            <RevealOnScroll key={item.title} delay={i * 0.08}>
              <div className="card-premium group h-full">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal/10 to-navy/5 text-teal transition-colors group-hover:from-amber/20 group-hover:to-brand-orange/10 group-hover:text-amber-600">
                  <Icon size={26} />
                </div>
                <h3 className="font-display text-lg font-bold text-navy-dark">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-navy-dark/60">{item.description}</p>
              </div>
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
}
