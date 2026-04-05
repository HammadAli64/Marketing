import type { MetadataRoute } from "next";

const base =
  process.env.NEXT_PUBLIC_SITE_URL || "https://helixprimesolutions.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base.replace(/\/$/, "")}/sitemap.xml`,
  };
}
