import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "VedaEdutech's privacy policy explaining how we collect, use, and protect your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" description="Last updated: July 2026" />
      <section className="container-page prose prose-slate max-w-3xl py-20">
        <div className="space-y-8 text-navy-dark/70">
          <div>
            <h2 className="font-display text-xl font-bold text-navy-dark">1. Information We Collect</h2>
            <p className="mt-3 leading-relaxed">
              We collect information you provide directly to us, including name, email, phone
              number, and address when you submit admission, franchise, career, or contact forms.
              We also collect account information for registered students, teachers, and
              administrators.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy-dark">2. How We Use Your Information</h2>
            <p className="mt-3 leading-relaxed">
              Information is used to process admissions, respond to enquiries, manage franchise
              applications, evaluate job applications, and improve our services. We do not sell
              your personal information to third parties.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy-dark">3. Data Security</h2>
            <p className="mt-3 leading-relaxed">
              We implement industry-standard security measures, including password hashing and
              secure authentication, to protect your data from unauthorized access.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy-dark">4. Cookies</h2>
            <p className="mt-3 leading-relaxed">
              Our website uses session cookies to manage authentication and improve your
              browsing experience. You can control cookie preferences through your browser settings.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy-dark">5. Contact Us</h2>
            <p className="mt-3 leading-relaxed">
              For questions about this policy, contact us at info@vedavaag.com or +91 40 4018 8140.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
