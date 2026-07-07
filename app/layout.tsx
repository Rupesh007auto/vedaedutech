import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/ui/LoadingScreen";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.vedaedutech.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VedaEdutech — Technology-Driven Education Across India",
    template: "%s | VedaEdutech",
  },
  description:
    "VedaEdutech, a Vedavaag Systems Ltd initiative, delivers smart classrooms, skill-based courses, and community learning centers (CSP) across Haryana, UP, and Bihar.",
  keywords: [
    "VedaEdutech",
    "Vedavaag Systems",
    "smart classes India",
    "CSP center education",
    "online courses India",
    "franchise education India",
  ],
  authors: [{ name: "VedaEdutech" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "VedaEdutech",
    title: "VedaEdutech — Technology-Driven Education Across India",
    description:
      "Smart classrooms, skill-based courses, and community learning centers across India.",
    images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630, alt: "VedaEdutech" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VedaEdutech — Technology-Driven Education Across India",
    description:
      "Smart classrooms, skill-based courses, and community learning centers across India.",
    images: ["/images/og-cover.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "VedaEdutech",
              url: siteUrl,
              logo: `${siteUrl}/images/logo.png`,
              sameAs: [
                "https://facebook.com/vedaedutech",
                "https://instagram.com/vedaedutech",
                "https://linkedin.com/company/vedaedutech",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Hyderabad",
                addressRegion: "Telangana",
                addressCountry: "IN",
              },
            }),
          }}
        />
        <Providers>
          <LoadingScreen />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </Providers>
      </body>
    </html>
  );
}
