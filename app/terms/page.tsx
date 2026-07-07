import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing your use of VedaEdutech's website and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" description="Last updated: July 2026" />
      <section className="container-page max-w-3xl py-20">
        <div className="space-y-8 text-navy-dark/70">
          <div>
            <h2 className="font-display text-xl font-bold text-navy-dark">1. Acceptance of Terms</h2>
            <p className="mt-3 leading-relaxed">
              By accessing or using the VedaEdutech website and services, you agree to be bound
              by these Terms of Service and our Privacy Policy.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy-dark">2. Enrollment & Fees</h2>
            <p className="mt-3 leading-relaxed">
              Course enrollment is confirmed only after admission review and fee payment. Fees
              are non-transferable unless otherwise stated in a specific program's policy.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy-dark">3. Franchise Terms</h2>
            <p className="mt-3 leading-relaxed">
              Franchise partnerships are governed by a separate franchise agreement signed
              between the applicant and Vedavaag Systems Ltd, which supersedes any general
              statements made on this website.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy-dark">4. Account Responsibility</h2>
            <p className="mt-3 leading-relaxed">
              Users are responsible for maintaining the confidentiality of their login
              credentials and for all activity that occurs under their account.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy-dark">5. Limitation of Liability</h2>
            <p className="mt-3 leading-relaxed">
              VedaEdutech and Vedavaag Systems Ltd are not liable for indirect or consequential
              damages arising from use of this website, to the fullest extent permitted by law.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
