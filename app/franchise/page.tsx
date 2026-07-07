import type { Metadata } from "next";
import { TrendingUp, ShieldCheck, BookOpenCheck, Users2 } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import FranchiseForm from "@/components/forms/FranchiseForm";
import RevealOnScroll from "@/components/animations/RevealOnScroll";

export const metadata: Metadata = {
  title: "Franchise Opportunities",
  description: "Partner with VedaEdutech to launch your own education center. Ready curriculum, teacher training, and marketing support included.",
  alternates: { canonical: "/franchise" },
};

const benefits = [
  { icon: BookOpenCheck, title: "Ready-Made Curriculum", description: "Access our complete K-12 and skills curriculum from day one — no content development needed." },
  { icon: Users2, title: "Teacher Training Support", description: "We train your teaching staff on our methodology, smart classroom tools, and assessment systems." },
  { icon: TrendingUp, title: "Marketing & Enrollment Support", description: "Get local marketing materials, digital campaigns, and admission counseling scripts." },
  { icon: ShieldCheck, title: "Operational Guidance", description: "Ongoing support for center setup, compliance, and day-to-day operations from our regional team." },
];

export default function FranchisePage() {
  return (
    <>
      <PageHero
        eyebrow="Franchise With Us"
        title="Bring VedaEdutech to Your City"
        description="Join 320+ successful franchise partners delivering quality education while building a sustainable local business."
      />

      <section className="container-page py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {benefits.map((b, i) => (
            <RevealOnScroll key={b.title} delay={i * 0.08}>
              <div className="card-premium flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber/10 text-amber-600">
                  <b.icon size={22} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-navy-dark">{b.title}</h3>
                  <p className="mt-1.5 text-sm text-navy-dark/60">{b.description}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.2} className="mx-auto mt-16 max-w-xl">
          <div className="card-premium">
            <h2 className="mb-1 font-display text-2xl font-bold text-navy-dark">Apply for a Franchise</h2>
            <p className="mb-6 text-sm text-navy-dark/60">Tell us about yourself and our team will reach out with next steps.</p>
            <FranchiseForm />
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
}
