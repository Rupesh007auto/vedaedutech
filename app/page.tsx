import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import PartnerMarquee from "@/components/shared/PartnerMarquee";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CoursesPreview from "@/components/home/CoursesPreview";
import Timeline from "@/components/home/Timeline";
import Testimonials from "@/components/home/Testimonials";
import FAQSection from "@/components/shared/FAQSection";
import CTASection from "@/components/shared/CTASection";

export const metadata: Metadata = {
  title: "Home",
  description:
    "VedaEdutech delivers smart classrooms, skill-based courses, and community learning centers across Haryana, UP, and Bihar.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <PartnerMarquee />
      <WhyChooseUs />
      <CoursesPreview />
      <Timeline />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </>
  );
}
