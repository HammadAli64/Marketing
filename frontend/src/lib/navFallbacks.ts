import { PORTFOLIO_ITEMS, SERVICES } from "@/lib/constants";
import { unsplashForSeed } from "@/lib/placeholders";

/** Slim shapes for client nav — matches `CmsService` / `CmsProjectCard` from `cms.ts`. */
export type NavShellService = {
  title: string;
  slug: string;
  summary: string;
  bullets: string[];
  icon_image: null;
  cover_image: string | null;
};

export type NavShellProject = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  cover_image: string | null;
};

export function navFallbackServices(): NavShellService[] {
  return SERVICES.map((s) => ({
    title: s.title,
    slug: s.slug,
    summary: s.summary,
    bullets: [...s.bullets],
    icon_image: null,
    cover_image: unsplashForSeed(s.slug),
  }));
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function navFallbackProjects(): NavShellProject[] {
  return PORTFOLIO_ITEMS.map((p) => {
    const slug = slugify(p.title);
    return {
      title: p.title,
      slug,
      category: p.category,
      excerpt: p.description,
      cover_image: unsplashForSeed(slug),
    };
  });
}
