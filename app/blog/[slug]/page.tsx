import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import { seedBlogs } from "@/lib/blog-seed";
import { formatDate } from "@/lib/utils";
import RevealOnScroll from "@/components/animations/RevealOnScroll";

interface BlogDoc {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: string;
  tags: string[];
  createdAt: string;
}

async function getBlog(slug: string): Promise<BlogDoc | null> {
  try {
    await dbConnect();
    const blog = await Blog.findOne({ slug, status: "published" }).lean();
    if (blog) return JSON.parse(JSON.stringify(blog));
  } catch {
    // fall through to seed data below
  }
  const seeded = seedBlogs.find((b) => b.slug === slug);
  return seeded ? { ...seeded, createdAt: new Date().toISOString() } : null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blog = await getBlog(params.slug);
  if (!blog) return { title: "Article Not Found" };
  return {
    title: blog.title,
    description: blog.excerpt,
    alternates: { canonical: `/blog/${blog.slug}` },
    openGraph: { images: [blog.coverImage] },
  };
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug);
  if (!blog) notFound();

  return (
    <article className="pb-24 pt-40">
      <div className="container-page">
        <RevealOnScroll className="mx-auto max-w-3xl">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal">
            <ArrowLeft size={15} /> Back to Blog
          </Link>
          <span className="section-eyebrow">{blog.category}</span>
          <h1 className="mt-4 font-display text-3xl font-extrabold text-navy-dark sm:text-4xl">{blog.title}</h1>
          <div className="mt-5 flex items-center gap-5 text-sm text-navy-dark/50">
            <span className="flex items-center gap-1.5"><User size={14} /> {blog.author}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {formatDate(blog.createdAt)}</span>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl">
          <Image src={blog.coverImage} alt={blog.title} width={1200} height={600} className="w-full object-cover" priority />
        </RevealOnScroll>

        <RevealOnScroll delay={0.15} className="mx-auto mt-10 max-w-3xl">
          <div className="quill-content text-navy-dark/80" dangerouslySetInnerHTML={{ __html: blog.content }} />
          {blog.tags?.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2 border-t border-navy/10 pt-6">
              {blog.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-navy-dark/60">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </RevealOnScroll>
      </div>
    </article>
  );
}
