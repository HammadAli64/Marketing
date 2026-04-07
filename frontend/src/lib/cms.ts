import { navFallbackProjects, navFallbackServices } from "@/lib/navFallbacks";

export function getServerApiBase(): string {
  return (
    process.env.CMS_API_URL?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
    "http://127.0.0.1:8000"
  );
}

function cmsFetchTimeoutMs(): number {
  const raw = process.env.CMS_FETCH_TIMEOUT_MS;
  if (raw === undefined || raw === "") return 8000;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? Math.min(n, 30000) : 8000;
}

/** In development, skip Next fetch cache so Django Admin edits show on refresh. Override with CMS_FETCH_CACHE=1. */
function cmsFetchUsesNoStore(): boolean {
  if (process.env.CMS_FETCH_NO_CACHE === "1") return true;
  if (process.env.CMS_FETCH_CACHE === "1") return false;
  return process.env.NODE_ENV === "development";
}

/**
 * CMS requests with a hard timeout so SSR does not hang when Django is slow or down
 * (falls back to static content instead of a long blank page).
 */
async function cmsFetch(
  url: string,
  init?: RequestInit & { next?: { revalidate?: number } }
): Promise<Response> {
  const ms = cmsFetchTimeoutMs();
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), ms);
  const { next, ...rest } = init ?? {};
  const noStore = cmsFetchUsesNoStore();
  try {
    return await fetch(url, {
      ...rest,
      signal: ctrl.signal,
      ...(noStore
        ? { cache: "no-store" as const }
        : { next: next ?? { revalidate: 60 } }),
    });
  } finally {
    clearTimeout(id);
  }
}

export type CmsHero = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  background_image: string | null;
  cta_primary_label: string;
  cta_primary_link: string;
  cta_secondary_label: string;
  cta_secondary_link: string;
};

export type CmsShowcase = {
  title: string;
  body: string;
  image: string | null;
  image_alt: string;
  image_on_right: boolean;
};
export type CmsStat = { value: string; label: string };

export type CmsTestimonial = {
  id: number;
  client_name: string;
  role_title: string;
  quote: string;
  stars: number;
};

export type CmsService = {
  title: string;
  slug: string;
  summary: string;
  bullets: string[];
  icon_image: string | null;
  cover_image: string | null;
};

export type CmsServiceDetail = {
  title: string;
  slug: string;
  summary: string;
  bullets: string[];
  icon_image: string | null;
  cover_image: string | null;
  hero_image: string | null;
  body_paragraphs: string[];
};

export type CmsProjectCard = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  cover_image: string | null;
};

export type CmsProjectDetail = CmsProjectCard & {
  body_paragraphs: string[];
  hero_image: string | null;
  gallery: { image: string | null; caption: string }[];
};

export type CmsAbout = {
  hero_title: string;
  hero_subtitle: string;
  hero_background_image: string | null;
  intro: string;
  mission_title: string;
  mission_body: string;
  images: { image: string | null; caption: string }[];
};

export type CmsBlogPostCard = {
  title: string;
  slug: string;
  description: string;
  bullets: string[];
  cover_image: string | null;
};

export type CmsBlogPostDetail = CmsBlogPostCard & {
  body_paragraphs: string[];
  published_at: string | null;
};

function servicesFromConstants(): CmsService[] {
  return navFallbackServices();
}

function normalizeServices(list: CmsService[]): CmsService[] {
  return list.map((s) => ({ ...s }));
}

export async function fetchServicesList(): Promise<CmsService[]> {
  try {
    const res = await cmsFetch(`${getServerApiBase()}/api/cms/services/`);
    if (!res.ok) throw new Error(String(res.status));
    const j = (await res.json()) as { services: CmsService[] };
    if (j.services?.length) {
      return normalizeServices(j.services);
    }
    return servicesFromConstants();
  } catch {
    return servicesFromConstants();
  }
}

export async function fetchServiceDetail(
  slug: string
): Promise<CmsServiceDetail | null> {
  const base = getServerApiBase();
  let slugInCms = false;
  try {
    const sr = await cmsFetch(`${base}/api/cms/services/slugs/`);
    if (sr.ok) {
      const j = (await sr.json()) as { slugs: string[] };
      slugInCms = (j.slugs ?? []).includes(slug);
    }
  } catch {
    slugInCms = false;
  }

  if (slugInCms) {
    try {
      const res = await cmsFetch(`${base}/api/cms/services/${slug}/`);
      if (res.ok) {
        const d = (await res.json()) as CmsServiceDetail;
        return {
          ...d,
          cover_image: d.cover_image,
          hero_image: d.hero_image || d.cover_image,
        };
      }
    } catch {
      /* timeout / network — use fallback */
    }
  }

  const list = servicesFromConstants();
  const s = list.find((x) => x.slug === slug);
  if (!s) return null;
  return {
    ...s,
    hero_image: s.cover_image,
    body_paragraphs: [s.summary],
  };
}

export async function fetchServiceSlugs(): Promise<string[]> {
  try {
    const res = await cmsFetch(`${getServerApiBase()}/api/cms/services/slugs/`);
    if (!res.ok) throw new Error(String(res.status));
    const j = (await res.json()) as { slugs: string[] };
    if (j.slugs?.length) return j.slugs;
  } catch {
    /* fallback */
  }
  return navFallbackServices().map((s) => s.slug);
}

function fallbackProjects(): CmsProjectCard[] {
  return navFallbackProjects();
}

export { navFallbackProjects, navFallbackServices };

export async function fetchProjectsList(): Promise<CmsProjectCard[]> {
  try {
    const res = await cmsFetch(`${getServerApiBase()}/api/cms/projects/`);
    if (!res.ok) throw new Error(String(res.status));
    const j = (await res.json()) as { projects: CmsProjectCard[] };
    if (j.projects?.length) {
      return j.projects.map((p) => ({ ...p }));
    }
    return fallbackProjects();
  } catch {
    return fallbackProjects();
  }
}

export async function fetchProjectDetail(
  slug: string
): Promise<CmsProjectDetail | null> {
  const base = getServerApiBase();
  let slugInCms = false;
  try {
    const sr = await cmsFetch(`${base}/api/cms/projects/slugs/`);
    if (sr.ok) {
      const j = (await sr.json()) as { slugs: string[] };
      slugInCms = (j.slugs ?? []).includes(slug);
    }
  } catch {
    slugInCms = false;
  }

  if (slugInCms) {
    try {
      const res = await cmsFetch(`${base}/api/cms/projects/${slug}/`);
      if (res.ok) {
        const d = (await res.json()) as CmsProjectDetail;
        return {
          ...d,
          cover_image: d.cover_image,
          hero_image: d.hero_image || d.cover_image,
        };
      }
    } catch {
      /* timeout / network */
    }
  }

  return null;
}

export async function fetchProjectSlugs(): Promise<string[]> {
  try {
    const res = await cmsFetch(`${getServerApiBase()}/api/cms/projects/slugs/`);
    if (!res.ok) throw new Error(String(res.status));
    const j = (await res.json()) as { slugs: string[] };
    if (j.slugs?.length) return j.slugs;
  } catch {
    /* use fallback */
  }
  return fallbackProjects().map((p) => p.slug);
}

function normalizeBlogCard(p: CmsBlogPostCard): CmsBlogPostCard {
  return {
    ...p,
    cover_image: p.cover_image,
    bullets: Array.isArray(p.bullets) ? p.bullets : [],
  };
}

export async function fetchBlogsList(query?: string): Promise<CmsBlogPostCard[]> {
  const base = getServerApiBase();
  const url = new URL(`${base}/api/cms/blogs/`);
  const q = query?.trim();
  if (q) url.searchParams.set("q", q);
  try {
    const res = await cmsFetch(url.toString());
    if (!res.ok) throw new Error(String(res.status));
    const j = (await res.json()) as { posts: CmsBlogPostCard[] };
    if (j.posts?.length) return j.posts.map(normalizeBlogCard);
  } catch {
    /* fallback */
  }
  return [];
}

export async function fetchBlogSlugs(): Promise<string[]> {
  try {
    const res = await cmsFetch(`${getServerApiBase()}/api/cms/blogs/slugs/`);
    if (!res.ok) throw new Error(String(res.status));
    const j = (await res.json()) as { slugs: string[] };
    if (j.slugs?.length) return j.slugs;
  } catch {
    /* fallback */
  }
  return [];
}

export async function fetchBlogDetail(
  slug: string
): Promise<CmsBlogPostDetail | null> {
  const base = getServerApiBase();
  let slugInCms = false;
  try {
    const sr = await cmsFetch(`${base}/api/cms/blogs/slugs/`);
    if (sr.ok) {
      const j = (await sr.json()) as { slugs: string[] };
      slugInCms = (j.slugs ?? []).includes(slug);
    }
  } catch {
    slugInCms = false;
  }

  if (slugInCms) {
    try {
      const res = await cmsFetch(`${base}/api/cms/blogs/${slug}/`);
      if (res.ok) {
        const d = (await res.json()) as CmsBlogPostDetail;
        const body =
          d.body_paragraphs?.filter(Boolean).length > 0
            ? d.body_paragraphs
            : [d.description];
        return {
          ...normalizeBlogCard(d),
          body_paragraphs: body,
          published_at: d.published_at ?? null,
        };
      }
    } catch {
      /* timeout / network */
    }
  }

  return null;
}
