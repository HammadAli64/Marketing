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

/** No static demo items — nav lists come from the CMS API only. */
export function navFallbackServices(): NavShellService[] {
  return [];
}

export function navFallbackProjects(): NavShellProject[] {
  return [];
}
