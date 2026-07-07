import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.vedaedutech.in";

  const staticRoutes = [
    "",
    "/about",
    "/courses",
    "/admissions",
    "/franchise",
    "/csp",
    "/gallery",
    "/blog",
    "/career",
    "/contact",
    "/privacy-policy",
    "/terms",
  ];

  return staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}
