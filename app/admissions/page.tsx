import type { Metadata } from "next";
import { FileText, CheckCircle, CreditCard, GraduationCap } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import AdmissionForm from "@/components/forms/AdmissionForm";
import RevealOnScroll from "@/components/animations/RevealOnScroll";

export const metadata: Metadata = {
  title: "Admissions",
  description: "Apply for admission to VedaEdutech. Simple 4-step process from application to enrollment.",
  alternates: { canonical: "/admissions" },
};

const steps = [
  { icon: FileText, title: "Submit Application", description: "Fill out the admission form with student and parent details." },
  { icon: CheckCircle, title: "Counsellor Review", description: "Our admissions team reviews your application within 2 business days." },
  { icon: GraduationCap, title: "Placement Assessment", description: "A brief assessment helps us recommend the right course and class level." },
  { icon: CreditCard, title: "Confirm Enrollment", description: "Complete fee payment and receive your welcome kit and class schedule." },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions Open"
        title="Start Your Child's Learning Journey"
        description="Admissions for the current academic term are now open across all VedaEdutech centers. Apply in minutes."
      />

      <section className="container-page py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <RevealOnScroll key={s.title} delay={i * 0.08}>
              <div className="card-premium h-full text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white font-display font-bold">
                  {i + 1}
                </div>
                <s.icon className="mx-auto mb-3 text-teal" size={26} />
                <h3 className="font-display font-bold text-navy-dark">{s.title}</h3>
                <p className="mt-2 text-sm text-navy-dark/60">{s.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.2} className="mx-auto mt-16 max-w-2xl">
          <div className="card-premium">
            <h2 className="mb-1 font-display text-2xl font-bold text-navy-dark">Admission Application Form</h2>
            <p className="mb-6 text-sm text-navy-dark/60">Complete the form below and our admissions team will contact you shortly.</p>
            <AdmissionForm />
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
}
