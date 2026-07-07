import type { Metadata } from "next";
import { Briefcase, Heart, TrendingUp, Users } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import CareerForm from "@/components/forms/CareerForm";
import RevealOnScroll from "@/components/animations/RevealOnScroll";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the VedaEdutech team as a teacher, coordinator, or professional. Explore open positions and apply today.",
  alternates: { canonical: "/career" },
};

const perks = [
  { icon: Heart, title: "Meaningful Work", description: "Directly impact the lives of students across underserved communities every day." },
  { icon: TrendingUp, title: "Growth Opportunities", description: "Structured career paths from center coordinator to regional leadership roles." },
  { icon: Users, title: "Collaborative Culture", description: "Work alongside passionate educators and technologists who care about outcomes." },
  { icon: Briefcase, title: "Training & Development", description: "Ongoing professional development, teaching certifications, and skill workshops." },
];

export default function CareerPage() {
  return (
    <>
      <PageHero
        eyebrow="Join Our Team"
        title="Build Your Career With Purpose"
        description="We're always looking for passionate educators, coordinators, and professionals to join the VedaEdutech mission."
      />

      <section className="container-page py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p, i) => (
            <RevealOnScroll key={p.title} delay={i * 0.08}>
              <div className="card-premium h-full text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-purple/10 text-brand-purple">
                  <p.icon size={24} />
                </div>
                <h3 className="font-display font-bold text-navy-dark">{p.title}</h3>
                <p className="mt-2 text-sm text-navy-dark/60">{p.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.2} className="mx-auto mt-16 max-w-xl">
          <div className="card-premium">
            <h2 className="mb-1 font-display text-2xl font-bold text-navy-dark">Apply Now</h2>
            <p className="mb-6 text-sm text-navy-dark/60">Upload your resume and tell us why you'd be a great fit.</p>
            <CareerForm />
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
}
