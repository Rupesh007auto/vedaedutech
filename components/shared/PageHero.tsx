"use client";

import { motion } from "framer-motion";

export default function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-dark pb-20 pt-40">
      <div className="pointer-events-none absolute inset-0 bg-hero-gradient opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="container-page relative text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-eyebrow !bg-white/10 !text-amber"
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-4 max-w-2xl font-display text-4xl font-extrabold text-white sm:text-5xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-white/60"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
