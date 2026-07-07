import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import RevealOnScroll from "@/components/animations/RevealOnScroll";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with VedaEdutech for admissions, franchise enquiries, or general questions. We're here to help.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const mapQuery = encodeURIComponent(process.env.NEXT_PUBLIC_MAP_QUERY || "HITEC City, Hyderabad");

  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="We'd Love to Hear From You"
        description="Whether it's admissions, franchise opportunities, or general questions — our team responds within 24 hours."
      />

      <section className="container-page py-24">
        <div className="grid gap-12 lg:grid-cols-5">
          <RevealOnScroll className="lg:col-span-2">
            <div className="space-y-6">
              <div className="card-premium flex items-start gap-4">
                <MapPin className="mt-1 shrink-0 text-teal" size={22} />
                <div>
                  <h3 className="font-display font-bold text-navy-dark">Head Office</h3>
                  <p className="mt-1 text-sm text-navy-dark/60">HITEC City, Hyderabad, Telangana, India</p>
                </div>
              </div>
              <div className="card-premium flex items-start gap-4">
                <Phone className="mt-1 shrink-0 text-teal" size={22} />
                <div>
                  <h3 className="font-display font-bold text-navy-dark">Phone</h3>
                  <p className="mt-1 text-sm text-navy-dark/60">+91 40 4018 8140</p>
                </div>
              </div>
              <div className="card-premium flex items-start gap-4">
                <Mail className="mt-1 shrink-0 text-teal" size={22} />
                <div>
                  <h3 className="font-display font-bold text-navy-dark">Email</h3>
                  <p className="mt-1 text-sm text-navy-dark/60">info@vedavaag.com</p>
                </div>
              </div>
              <div className="card-premium flex items-start gap-4">
                <Clock className="mt-1 shrink-0 text-teal" size={22} />
                <div>
                  <h3 className="font-display font-bold text-navy-dark">Office Hours</h3>
                  <p className="mt-1 text-sm text-navy-dark/60">Mon - Sat: 9:00 AM - 6:30 PM</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1} className="lg:col-span-3">
            <div className="card-premium">
              <h2 className="mb-6 font-display text-2xl font-bold text-navy-dark">Send Us a Message</h2>
              <ContactForm />
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={0.15} className="mt-14 overflow-hidden rounded-3xl shadow-premium">
          <iframe
            title="VedaEdutech Location"
            src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
            width="100%"
            height="400"
            loading="lazy"
            style={{ border: 0 }}
          />
        </RevealOnScroll>
      </section>
    </>
  );
}
