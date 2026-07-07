import type { Metadata } from "next";
import { Target, Eye, Award } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import Timeline from "@/components/home/Timeline";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CTASection from "@/components/shared/CTASection";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about VedaEdutech's mission to deliver technology-driven education across India, and our parent company Vedavaag Systems Ltd.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About VedaEdutech"
        title="Building India's Most Accessible Education Network"
        description="A Vedavaag Systems Ltd initiative committed to bringing quality, technology-driven learning to every student, regardless of location."
      />

      <section className="container-page py-24">
        <div className="grid gap-10 md:grid-cols-2">
          <RevealOnScroll>
            <div className="card-premium h-full">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal/10 text-teal">
                <Target size={26} />
              </div>
              <h3 className="font-display text-xl font-bold text-navy-dark">Our Mission</h3>
              <p className="mt-3 leading-relaxed text-navy-dark/60">
                To close India&apos;s education access gap by combining smart classroom
                technology with community-rooted learning centers, ensuring every student —
                urban or rural — receives a quality education.
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <div className="card-premium h-full">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber/10 text-amber-600">
                <Eye size={26} />
              </div>
              <h3 className="font-display text-xl font-bold text-navy-dark">Our Vision</h3>
              <p className="mt-3 leading-relaxed text-navy-dark/60">
                To become India&apos;s most trusted network of community learning centers,
                empowering one million students with future-ready skills and knowledge by 2030.
              </p>
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll className="mx-auto mt-20 max-w-3xl text-center">
          <span className="section-eyebrow">Parent Company</span>
          <h2 className="mt-4 font-display text-2xl font-extrabold text-navy-dark sm:text-3xl">
            Backed by Vedavaag Systems Ltd
          </h2>
          <p className="mt-4 leading-relaxed text-navy-dark/60">
            VedaEdutech operates under Vedavaag Systems Ltd, a technology and services company
            focused on building scalable solutions for underserved communities across India.
            This backing gives our education network the operational rigor, technology
            infrastructure, and long-term stability needed to serve students reliably for
            years to come.
          </p>
        </RevealOnScroll>
      </section>

      <Timeline />
      <WhyChooseUs />

      <section className="container-page pb-4">
        <RevealOnScroll className="grid grid-cols-1 gap-6 rounded-3xl bg-surface-muted p-10 sm:grid-cols-3">
          <div className="flex items-center gap-4">
            <Award className="shrink-0 text-amber-600" size={32} />
            <div>
              <p className="font-display text-lg font-bold text-navy-dark">Recognized Curriculum</p>
              <p className="text-sm text-navy-dark/60">Board-aligned academics</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Award className="shrink-0 text-amber-600" size={32} />
            <div>
              <p className="font-display text-lg font-bold text-navy-dark">Trained Educators</p>
              <p className="text-sm text-navy-dark/60">280+ local teaching staff</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Award className="shrink-0 text-amber-600" size={32} />
            <div>
              <p className="font-display text-lg font-bold text-navy-dark">3-State Presence</p>
              <p className="text-sm text-navy-dark/60">Haryana, UP & Bihar</p>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <CTASection />
    </>
  );
}
