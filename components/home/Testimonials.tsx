"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { testimonials } from "@/lib/site-content";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative overflow-hidden bg-navy-dark py-24">
      <div className="pointer-events-none absolute inset-0 bg-hero-gradient opacity-40" />
      <div className="container-page relative">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow !bg-white/10 !text-amber">Testimonials</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl">
            Stories From Our Community
          </h2>
        </RevealOnScroll>

        <div className="mx-auto mt-14 max-w-2xl">
          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
            <Quote className="absolute left-8 top-8 text-white/10" size={48} />
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="relative text-center"
              >
                <div className="mb-5 flex justify-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-amber text-amber" />
                  ))}
                </div>
                <p className="text-lg leading-relaxed text-white/85">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-6 font-display font-bold text-white">{t.name}</p>
                <p className="text-sm text-white/50">{t.role}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button onClick={prev} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10" aria-label="Previous">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-amber" : "w-2 bg-white/20"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={next} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10" aria-label="Next">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
