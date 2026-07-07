"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { faqs } from "@/lib/site-content";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="container-page py-24">
      <RevealOnScroll className="mx-auto max-w-2xl text-center">
        <span className="section-eyebrow">FAQ</span>
        <h2 className="mt-4 font-display text-3xl font-extrabold text-navy-dark sm:text-4xl">
          Frequently Asked Questions
        </h2>
      </RevealOnScroll>

      <div className="mx-auto mt-12 max-w-2xl space-y-3">
        {faqs.map((faq, i) => (
          <RevealOnScroll key={faq.question} delay={i * 0.05}>
            <div className="overflow-hidden rounded-2xl border border-navy/8 bg-white">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-display text-sm font-bold text-navy-dark sm:text-base">{faq.question}</span>
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="shrink-0 text-amber-600">
                  <Plus size={20} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-navy-dark/60">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
