import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import BlogList from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on education technology, exam preparation, and community learning from the VedaEdutech team.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="VedaEdutech Blog"
        title="Insights, Tips & Stories"
        description="Practical advice and updates from our educators, program leads, and community partners."
      />
      <BlogList />
    </>
  );
}
