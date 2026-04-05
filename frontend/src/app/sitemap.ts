import type { MetadataRoute } from "next";
import { fetchBlogSlugs, fetchProjectSlugs, fetchServiceSlugs } from "@/lib/cms";

const base =
  process.env.NEXT_PUBLIC_SITE_URL || "https://helixprimesolutions.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const root = base.replace(/\/$/, "");
  const paths = ["", "/about", "/services", "/portfolio", "/blogs", "/contact"];
  const staticEntries: MetadataRoute.Sitemap = paths.map((path) => ({
    url: `${root}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const serviceSlugs = await fetchServiceSlugs();
  const serviceEntries: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${root}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const projectSlugs = await fetchProjectSlugs();
  const projectEntries: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${root}/portfolio/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogSlugs = await fetchBlogSlugs();
  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${root}/blogs/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.55,
  }));

  return [...staticEntries, ...serviceEntries, ...projectEntries, ...blogEntries];
}
