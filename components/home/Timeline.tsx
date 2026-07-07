"use client";

import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { timeline } from "@/lib/site-content";

export default function Timeline() {
  return (
    <section className="container-page py-24">
      <RevealOnScroll className="mx-auto max-w-2xl text-center">
        <span className="section-eyebrow">Our Journey</span>
        <h2 className="mt-4 font-display text-3xl font-extrabold text-navy-dark sm:text-4xl">
          From One Center to a Movement
        </h2>
      </RevealOnScroll>

      <div className="relative mx-auto mt-16 max-w-3xl">
        <div className="absolute left-4 top-0 h-full w-0.5 bg-navy/10 sm:left-1/2" />
        {timeline.map((item, i) => (
          <RevealOnScroll
            key={item.year}
            delay={i * 0.1}
            direction={i % 2 === 0 ? "left" : "right"}
            className={`relative mb-10 flex flex-col sm:flex-row ${i % 2 === 0 ? "" : "sm:flex-row-reverse"}`}
          >
            <div className="absolute left-4 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full bg-amber ring-4 ring-amber/20 sm:left-1/2" />
            <div className={`w-full pl-12 sm:w-1/2 sm:pl-0 ${i % 2 === 0 ? "sm:pr-10 sm:text-right" : "sm:pl-10"}`}>
              <span className="font-display text-2xl font-extrabold text-amber-600">{item.year}</span>
              <h3 className="mt-1 font-display text-lg font-bold text-navy-dark">{item.title}</h3>
              <p className="mt-2 text-sm text-navy-dark/60">{item.description}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
