"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { stats } from "@/lib/site-content";
import AnimatedCounter from "@/components/animations/AnimatedCounter";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-dark pb-28 pt-40">
      <div className="pointer-events-none absolute inset-0 bg-hero-gradient" />
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-20" />

      <motion.div
        className="pointer-events-none absolute -left-20 top-32 h-72 w-72 rounded-full bg-brand-purple/20 blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-10 top-10 h-96 w-96 rounded-full bg-teal/20 blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-amber backdrop-blur-xl"
          >
            <Sparkles size={14} /> A Vedavaag Systems Ltd Initiative
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl"
          >
            Technology-Driven Education for{" "}
            <span className="bg-gradient-to-r from-amber via-brand-orange to-amber bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x">
              Every Corner of India
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-lg text-white/60"
          >
            Smart classrooms, community learning centers, and skill-based courses reaching
            45,000+ students across Haryana, Uttar Pradesh, and Bihar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/admissions" className="btn-accent group">
              Start Your Admission
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/about" className="btn-outline !border-white/20 !bg-white/5 !text-white hover:!bg-white hover:!text-navy-dark">
              <PlayCircle size={16} className="mr-2" /> Learn Our Story
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:grid-cols-4"
        >
          {stats.map((s) => (
            <AnimatedCounter key={s.label} end={s.end} suffix={s.suffix} label={s.label} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
