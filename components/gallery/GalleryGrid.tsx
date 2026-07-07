"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { seedGallery } from "@/lib/gallery-seed";

interface GalleryItem {
  _id?: string;
  title: string;
  category: string;
  imageUrl: string;
}

const CATEGORIES = ["All", "Campus", "Events", "Classroom", "CSP Centers", "Achievements"];

async function fetchGallery(): Promise<GalleryItem[]> {
  try {
    const res = await fetch("/api/gallery");
    const json = await res.json();
    if (json.success && json.data.length > 0) return json.data;
    return seedGallery;
  } catch {
    return seedGallery;
  }
}

export default function GalleryGrid() {
  const [category, setCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { data: items = seedGallery } = useQuery({ queryKey: ["gallery"], queryFn: fetchGallery });

  const filtered = useMemo(
    () => (category === "All" ? items : items.filter((i) => i.category === category)),
    [items, category]
  );

  return (
    <section className="container-page py-24">
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              category === c ? "bg-navy text-white" : "bg-navy/5 text-navy-dark/70 hover:bg-navy/10"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {filtered.map((item, i) => (
          <RevealOnScroll key={item.title + i} delay={(i % 6) * 0.05} className="mb-5 break-inside-avoid">
            <button
              onClick={() => setLightboxIndex(i)}
              className="group relative block w-full overflow-hidden rounded-2xl"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={500}
                height={350}
                className="w-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="font-display text-sm font-semibold text-white">{item.title}</p>
              </div>
            </button>
          </RevealOnScroll>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-dark/90 p-4 backdrop-blur-sm"
            onClick={() => setLightboxIndex(null)}
          >
            <button className="absolute right-6 top-6 text-white/70 hover:text-white" onClick={() => setLightboxIndex(null)}>
              <X size={28} />
            </button>
            <button
              className="absolute left-4 text-white/70 hover:text-white sm:left-8"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((idx) => (idx! - 1 + filtered.length) % filtered.length);
              }}
            >
              <ChevronLeft size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[80vh] max-w-3xl"
            >
              <Image
                src={filtered[lightboxIndex].imageUrl}
                alt={filtered[lightboxIndex].title}
                width={900}
                height={600}
                className="max-h-[70vh] w-auto rounded-2xl object-contain"
              />
              <p className="mt-4 text-center font-display text-white">{filtered[lightboxIndex].title}</p>
            </motion.div>
            <button
              className="absolute right-4 text-white/70 hover:text-white sm:right-8"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((idx) => (idx! + 1) % filtered.length);
              }}
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
