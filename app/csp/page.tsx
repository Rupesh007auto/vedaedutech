import type { Metadata } from "next";
import { MapPin, Wifi, GraduationCap, HandHeart } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import CTASection from "@/components/shared/CTASection";

export const metadata: Metadata = {
  title: "CSP Centers",
  description: "Explore VedaEdutech's Community Service Provider (CSP) learning centers bringing quality education to underserved towns and villages.",
  alternates: { canonical: "/csp" },
};

const cspFeatures = [
  { icon: MapPin, title: "Local Presence", description: "Centers embedded within communities, reducing travel barriers for students and families." },
  { icon: Wifi, title: "Smart Classroom Tech", description: "Every CSP center is equipped with interactive smart boards and curated digital lesson content." },
  { icon: GraduationCap, title: "Certified Educators", description: "Local teachers trained and certified in the VedaEdutech teaching methodology." },
  { icon: HandHeart, title: "Community First", description: "Centers designed around each community's specific academic and skill-development needs." },
];

export default function CSPPage() {
  return (
    <>
      <PageHero
        eyebrow="CSP Network"
        title="Community Service Provider Centers"
        description="Our CSP model brings VedaEdutech's full curriculum and technology directly into towns and villages across Haryana, UP, and Bihar."
      />

      <section className="bg-navy-dark py-16">
        <div className="container-page grid grid-cols-2 gap-8 sm:grid-cols-4">
          <AnimatedCounter end={320} suffix="+" label="Active CSP Centers" />
          <AnimatedCounter end={3} label="States Covered" />
          <AnimatedCounter end={45000} suffix="+" label="Students Served" />
          <AnimatedCounter end={280} suffix="+" label="Local Educators" />
        </div>
      </section>

      <section className="container-page py-24">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">How CSP Works</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-navy-dark sm:text-4xl">
            Education Delivered Where It's Needed Most
          </h2>
          <p className="mt-4 text-navy-dark/60">
            Each CSP center operates as a hybrid of a community hub and a modern classroom,
            run by local partners and staffed by trained educators.
          </p>
        </RevealOnScroll>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {cspFeatures.map((f, i) => (
            <RevealOnScroll key={f.title} delay={i * 0.08}>
              <div className="card-premium flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                  <f.icon size={22} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-navy-dark">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-navy-dark/60">{f.description}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <CTASection
        title="Want a CSP Center in Your Area?"
        description="If you're passionate about education and community development, explore our franchise program to launch a CSP center."
        primaryLabel="Explore Franchise"
        primaryHref="/franchise"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
