import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.vedaedutech.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/api/", "/login/", "/reset-password", "/forgot-password"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
