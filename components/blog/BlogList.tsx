"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { seedBlogs } from "@/lib/blog-seed";
import { formatDate } from "@/lib/utils";

interface Blog {
  _id?: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: string;
  createdAt?: string;
}

async function fetchBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch("/api/blog");
    const json = await res.json();
    if (json.success && json.data.length > 0) return json.data;
    return seedBlogs as unknown as Blog[];
  } catch {
    return seedBlogs as unknown as Blog[];
  }
}

export default function BlogList() {
  const { data: blogs = seedBlogs as unknown as Blog[], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  if (isLoading) {
    return (
      <section className="container-page py-24">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton h-96 rounded-3xl" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-24">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, i) => (
          <RevealOnScroll key={blog.slug} delay={(i % 3) * 0.1}>
            <Link href={`/blog/${blog.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_2px_20px_rgba(18,41,75,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-premium">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-navy">
                  {blog.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-bold text-navy-dark line-clamp-2">{blog.title}</h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-navy-dark/60">{blog.excerpt}</p>
                <div className="mt-4 flex items-center justify-between border-t border-navy/5 pt-4 text-xs text-navy-dark/50">
                  <span className="flex items-center gap-1.5"><User size={13} /> {blog.author}</span>
                  {blog.createdAt && (
                    <span className="flex items-center gap-1.5"><Calendar size={13} /> {formatDate(blog.createdAt)}</span>
                  )}
                </div>
                <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-teal">
                  Read More <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
