import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import CoursesExplorer from "@/components/courses/CoursesExplorer";
import CTASection from "@/components/shared/CTASection";

export const metadata: Metadata = {
  title: "Courses",
  description: "Browse VedaEdutech's full catalog of smart class programs, K-12 support, spoken English, computer basics, and skill-development courses.",
  alternates: { canonical: "/courses" },
};

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Explore Programs"
        title="Courses Designed for Every Learner"
        description="From foundational academics to job-ready skills, find the right program for your goals."
      />
      <CoursesExplorer />
      <CTASection />
    </>
  );
}
