import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiдлябизнеса.рф";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/club/", "/unlock", "/preview/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
