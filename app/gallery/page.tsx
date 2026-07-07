import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore moments from VedaEdutech classrooms, CSP centers, events, and student achievements across India.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Moments"
        title="Life at VedaEdutech"
        description="A glimpse into our classrooms, community centers, events, and the students we're proud to serve."
      />
      <GalleryGrid />
    </>
  );
}
