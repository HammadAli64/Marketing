import { COMPANY, PORTFOLIO_ITEMS, SERVICES } from "@/lib/constants";
import { navFallbackProjects, navFallbackServices } from "@/lib/navFallbacks";
import {
  PLACEHOLDER_ABOUT_HERO,
  PLACEHOLDER_HERO,
  PLACEHOLDER_SHOWCASE,
  unsplashForSeed,
} from "@/lib/placeholders";

export function getServerApiBase(): string {
  return (
    process.env.CMS_API_URL?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
    "http://127.0.0.1:8000"
  );
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

export type CmsPillar = { title: string; body: string };
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

export type HomeBundle = {
  hero: CmsHero;
  pillars: CmsPillar[];
  showcases: CmsShowcase[];
  stats: CmsStat[];
  services: CmsService[];
  testimonials: CmsTestimonial[];
};

type HomePayloadRaw = {
  hero: CmsHero | null;
  pillars: CmsPillar[];
  showcases: CmsShowcase[];
  stats: CmsStat[];
  services: CmsService[];
  testimonials?: CmsTestimonial[];
};

const defaultHero = (): CmsHero => ({
  eyebrow: "USA-market software partner",
  headline: "Engineering products that earn trust with US buyers.",
  subheadline: `${COMPANY} builds high-performance websites, apps, and growth systems—with the polish, communication, and reliability international clients expect.`,
  background_image: PLACEHOLDER_HERO,
  cta_primary_label: "Book a Call",
  cta_primary_link: "/contact",
  cta_secondary_label: "Explore services",
  cta_secondary_link: "/services",
});

const defaultPillars = (): CmsPillar[] => [
  { title: "Delivery", body: "Senior-led squads, no bait-and-switch." },
  { title: "Communication", body: "Timezone-aware, async-first, crystal clear." },
  { title: "Outcomes", body: "SEO, speed, and conversion baked in—not bolted on." },
];

function defaultTestimonials(): CmsTestimonial[] {
  return [
    {
      id: -1,
      client_name: "Sarah Mitchell",
      role_title: "Founder & CEO, Elevate Dynamics (SaaS Startup, Austin, TX)",
      quote:
        "Helix Prime didn’t just redesign our site — they built a lead-generating beast. Leads up 280% in four months. These guys are ruthless about results.",
      stars: 5,
    },
    {
      id: -2,
      client_name: "Michael Chen",
      role_title: "CTO, Vertex Innovations (FinTech, New York, NY)",
      quote:
        "We needed senior developers yesterday. Helix Prime delivered elite talent that integrated instantly. Scaled our product team 3x without the usual hiring headaches. Game changer.",
      stars: 5,
    },
    {
      id: -3,
      client_name: "Jessica Ramirez",
      role_title: "Operations Director, Pacific Coast Retail (E-commerce, California)",
      quote:
        "Their automation cut 20+ hours per week from our ops and boosted accuracy to near-perfect. Professional, aggressive, and 100% invested in our success. Best decision we made this year.",
      stars: 5,
    },
  ];
}

function servicesFromConstants(): CmsService[] {
  return navFallbackServices();
}

function normalizeServices(list: CmsService[]): CmsService[] {
  return list.map((s) => ({
    ...s,
    cover_image: s.cover_image || unsplashForSeed(s.slug),
  }));
}

function mergeHome(data: Partial<HomePayloadRaw> | null): HomeBundle {
  const heroBase = data?.hero && data.hero.headline ? data.hero : defaultHero();
  const hero: CmsHero = {
    ...heroBase,
    background_image: heroBase.background_image || PLACEHOLDER_HERO,
  };
  const pillars =
    data?.pillars && data.pillars.length > 0 ? data.pillars : defaultPillars();
  const servicesRaw =
    data?.services && data.services.length > 0
      ? data.services
      : servicesFromConstants();
  const services = normalizeServices(servicesRaw);
  const showcases = (data?.showcases ?? []).map((s, i) => ({
    ...s,
    image: s.image || PLACEHOLDER_SHOWCASE(i),
  }));
  const rawT = data?.testimonials;
  const testimonialsRaw =
    rawT === undefined || rawT === null
      ? defaultTestimonials()
      : rawT.length > 0
        ? rawT
        : [];
  const testimonials = testimonialsRaw.map((t) => ({
    ...t,
    stars: Math.min(5, Math.max(1, Math.round(Number(t.stars) || 5))),
  }));
  return {
    hero,
    pillars,
    showcases,
    stats: data?.stats ?? [],
    services,
    testimonials,
  };
}

export async function fetchHomeBundle(): Promise<HomeBundle> {
  try {
    const res = await fetch(`${getServerApiBase()}/api/cms/home/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(String(res.status));
    const raw = (await res.json()) as HomePayloadRaw;
    return mergeHome(raw);
  } catch {
    return mergeHome(null);
  }
}

export async function fetchServicesList(): Promise<CmsService[]> {
  try {
    const res = await fetch(`${getServerApiBase()}/api/cms/services/`, {
      next: { revalidate: 60 },
    });
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
  /** Avoid hitting detail URLs that will 404 when CMS has no row for this slug. */
  let skipCmsDetail = false;
  try {
    const slugsRes = await fetch(`${base}/api/cms/services/slugs/`, {
      next: { revalidate: 60 },
    });
    if (slugsRes.ok) {
      const j = (await slugsRes.json()) as { slugs: string[] };
      const slugs = j.slugs ?? [];
      if (slugs.length === 0 || !slugs.includes(slug)) {
        skipCmsDetail = true;
      }
    }
  } catch {
    /* unknown — still try CMS detail */
  }

  if (!skipCmsDetail) {
    try {
      const res = await fetch(`${base}/api/cms/services/${slug}/`, {
        next: { revalidate: 60 },
      });
      if (res.ok) {
        const d = (await res.json()) as CmsServiceDetail;
        const cover = d.cover_image || unsplashForSeed(d.slug);
        return {
          ...d,
          cover_image: cover,
          hero_image: d.hero_image || cover || unsplashForSeed(`${d.slug}-hero`),
        };
      }
    } catch {
      /* fallback below */
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
    const res = await fetch(`${getServerApiBase()}/api/cms/services/slugs/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(String(res.status));
    const j = (await res.json()) as { slugs: string[] };
    if (j.slugs?.length) return j.slugs;
  } catch {
    /* fallback */
  }
  return SERVICES.map((s) => s.slug);
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function fallbackProjects(): CmsProjectCard[] {
  return navFallbackProjects();
}

export { navFallbackProjects, navFallbackServices };

export async function fetchProjectsList(): Promise<CmsProjectCard[]> {
  try {
    const res = await fetch(`${getServerApiBase()}/api/cms/projects/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(String(res.status));
    const j = (await res.json()) as { projects: CmsProjectCard[] };
    if (j.projects?.length) {
      return j.projects.map((p) => ({
        ...p,
        cover_image: p.cover_image || unsplashForSeed(p.slug),
      }));
    }
    return fallbackProjects();
  } catch {
    return fallbackProjects();
  }
}

const FALLBACK_PROJECT_BODIES: Record<string, string[]> = {
  [slugify("FinSight Analytics")]: [
    "Executive dashboard for a US fintech team with role-based access, audit-friendly activity, and sub-second loads on core views.",
    "We partnered on information architecture, API design, and a component system that keeps new screens consistent as the product grows.",
  ],
  [slugify("Northline Health Portal")]: [
    "Patient-facing scheduling with HIPAA-minded architecture, clear consent flows, and operational reporting for clinic staff.",
    "The build emphasized accessibility, resilient integrations, and measurable reliability for peak-hour traffic.",
  ],
  [slugify("Pulse Retail")]: [
    "iOS and Android storefront with loyalty, push promos, and an offline-friendly catalog for in-aisle selling.",
    "Shipping included analytics hooks so marketing could iterate on campaigns without engineering bottlenecks.",
  ],
  [slugify("Atlas Ops")]: [
    "Sales-to-delivery pipeline automation that reduced manual handoffs and tightened SLA visibility across teams.",
    "We mapped the workflow, implemented integrations, and added monitoring so failures are caught before customers feel them.",
  ],
  [slugify("Nexus Commerce Platform")]: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Multi-region catalog, cart, and checkout with experiment hooks for merchandising.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium. Headless storefront consuming GraphQL APIs and edge-cached PDPs.",
  ],
  [slugify("Meridian Intelligence Suite")]: [
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Snowflake-style warehouse with dbt models and nightly quality checks.",
    "At vero eos et accusamus et iusto odio dignissimos ducimus. Embedded Metabase-style dashboards with row-level security by region.",
  ],
  [slugify("Beacon Field Services")]: [
    "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus. Offline SQLite sync for crews with conflict resolution on reconnect.",
    "Itaque earum rerum hic tenetur a sapiente delectus. Dispatch board with drag-drop assignments and SMS nudges for SLA risk.",
  ],
  [slugify("Catalyst Membership Hub")]: [
    "Similique sunt in culpa qui officia deserunt mollitia animi. Stripe Billing tiers, coupon campaigns, and dunning emails out of the box.",
    "Et harum quidem rerum facilis est et expedita distinctio. Forum moderation queue, reputation scores, and API for third-party integrations.",
  ],
  [slugify("Vantage CX Automation")]: [
    "Nam libero tempore cum soluta nobis est eligendi optio cumque nihil. Zendesk-to-Salesforce bi-directional sync with idempotent webhooks.",
    "Omnis voluptas assumenda est omnis dolor repellendus. LLM-assisted tagging with human override and weekly accuracy reports.",
  ],
  [slugify("Horizon Event Network")]: [
    "Excepteur sint occaecat cupidatat non proident sunt in culpa. Agenda builder with speaker conflict detection and calendar ICS export.",
    "Sed quia non numquam eius modi tempora incidunt. Sponsor self-serve booth maps and lead scan exports post-event.",
  ],
  [slugify("Silverline Document AI")]: [
    "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet. Batch OCR with confidence thresholds routing low scores to reviewers.",
    "Quis autem vel eum iure reprehenderit qui in ea voluptate. Immutable storage, checksum verification, and 7-year retention policies.",
  ],
};

export async function fetchProjectDetail(
  slug: string
): Promise<CmsProjectDetail | null> {
  const base = getServerApiBase();
  let skipCmsDetail = false;
  try {
    const slugsRes = await fetch(`${base}/api/cms/projects/slugs/`, {
      next: { revalidate: 60 },
    });
    if (slugsRes.ok) {
      const j = (await slugsRes.json()) as { slugs: string[] };
      const slugs = j.slugs ?? [];
      if (slugs.length === 0 || !slugs.includes(slug)) {
        skipCmsDetail = true;
      }
    }
  } catch {
    /* unknown — still try CMS detail */
  }

  if (!skipCmsDetail) {
    try {
      const res = await fetch(`${base}/api/cms/projects/${slug}/`, {
        next: { revalidate: 60 },
      });
      if (res.ok) {
        const d = (await res.json()) as CmsProjectDetail;
        const cover = d.cover_image || unsplashForSeed(d.slug);
        return {
          ...d,
          cover_image: cover,
          hero_image: d.hero_image || cover || unsplashForSeed(`${d.slug}-hero`),
        };
      }
    } catch {
      /* fallback below */
    }
  }

  const fp = fallbackProjects().find((p) => p.slug === slug);
  if (!fp) return null;
  const body_paragraphs = FALLBACK_PROJECT_BODIES[slug] || [fp.excerpt];
  return {
    ...fp,
    body_paragraphs,
    hero_image: null,
    gallery: [],
  };
}

export async function fetchProjectSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${getServerApiBase()}/api/cms/projects/slugs/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(String(res.status));
    const j = (await res.json()) as { slugs: string[] };
    if (j.slugs?.length) return j.slugs;
  } catch {
    /* use fallback */
  }
  return fallbackProjects().map((p) => p.slug);
}

const defaultAbout = (): CmsAbout => ({
  hero_title: "We Don’t Do Average. We Deliver Dominance.",
  hero_subtitle: `${COMPANY} combines sharp US-market strategy with elite execution—websites, SEO, apps, automation, and staff augmentation engineered for revenue, not vanity metrics.`,
  hero_background_image: PLACEHOLDER_ABOUT_HERO,
  intro: `${COMPANY} exists for ambitious teams who are done settling for “good enough.” We partner with founders, growth leaders, and operators who need a partner that speaks plainly, ships fast, and ties every sprint to pipeline and profit—not slide decks and excuses.`,
  mission_title: "Our mission",
  mission_body:
    "Give every client an unfair digital advantage: faster launches, higher conversions, lower operational drag, and measurable growth. Enterprise-grade delivery with the urgency of a startup that’s hungry to win.",
  images: [],
});

export async function fetchAbout(): Promise<CmsAbout> {
  try {
    const res = await fetch(`${getServerApiBase()}/api/cms/about/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(String(res.status));
    const j = (await res.json()) as { about: CmsAbout | null };
    if (j.about?.hero_title) {
      return {
        ...j.about,
        hero_background_image:
          j.about.hero_background_image || PLACEHOLDER_ABOUT_HERO,
      };
    }
    return defaultAbout();
  } catch {
    return defaultAbout();
  }
}

function defaultBlogPosts(): CmsBlogPostCard[] {
  return [
    {
      title:
        "The 2026 SEO Domination Playbook: How US Businesses Are Stealing Market Share Right Now",
      slug: "2026-seo-domination-playbook",
      description:
        "Latest algorithm hacks, conversion-focused tactics, and traffic strategies that actually work.",
      bullets: [
        "Core updates decoded into execution steps",
        "Content clusters that compound rankings",
        "Technical SEO checks your competitors skip",
      ],
      cover_image: null,
    },
    {
      title:
        "Staff Augmentation vs. Hiring vs. Outsourcing: The Brutally Honest Breakdown for 2026",
      slug: "staff-augmentation-vs-hiring-2026",
      description:
        "Which model wins for speed, cost, and control — and how top startups are using it to crush scaling challenges.",
      bullets: [
        "When to augment vs hire FTE",
        "How to de-risk remote pods",
        "Pricing and governance reality",
      ],
      cover_image: null,
    },
    {
      title: "Launch a Profitable App in Record Time Without Wasting Six Figures",
      slug: "launch-profitable-app-record-time",
      description:
        "The exact framework we use to turn ideas into revenue-generating apps that users love and investors fund.",
      bullets: [
        "MVP scope that still converts",
        "Analytics you need on day one",
        "Avoiding rebuild traps",
      ],
      cover_image: null,
    },
  ];
}

function normalizeBlogCard(p: CmsBlogPostCard): CmsBlogPostCard {
  return {
    ...p,
    cover_image: p.cover_image || unsplashForSeed(p.slug),
    bullets: Array.isArray(p.bullets) ? p.bullets : [],
  };
}

export async function fetchBlogsList(query?: string): Promise<CmsBlogPostCard[]> {
  const base = getServerApiBase();
  const url = new URL(`${base}/api/cms/blogs/`);
  const q = query?.trim();
  if (q) url.searchParams.set("q", q);
  try {
    const res = await fetch(url.toString(), { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(String(res.status));
    const j = (await res.json()) as { posts: CmsBlogPostCard[] };
    if (j.posts?.length) return j.posts.map(normalizeBlogCard);
  } catch {
    /* fallback */
  }
  const fb = defaultBlogPosts();
  if (!q) return fb.map(normalizeBlogCard);
  const lower = q.toLowerCase();
  return fb
    .filter((p) => p.title.toLowerCase().includes(lower))
    .map(normalizeBlogCard);
}

export async function fetchBlogSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${getServerApiBase()}/api/cms/blogs/slugs/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(String(res.status));
    const j = (await res.json()) as { slugs: string[] };
    if (j.slugs?.length) return j.slugs;
  } catch {
    /* fallback */
  }
  return defaultBlogPosts().map((p) => p.slug);
}

export async function fetchBlogDetail(
  slug: string
): Promise<CmsBlogPostDetail | null> {
  const base = getServerApiBase();
  let skipCms = false;
  try {
    const slugsRes = await fetch(`${base}/api/cms/blogs/slugs/`, {
      next: { revalidate: 60 },
    });
    if (slugsRes.ok) {
      const j = (await slugsRes.json()) as { slugs: string[] };
      const slugs = j.slugs ?? [];
      if (slugs.length > 0 && !slugs.includes(slug)) {
        skipCms = true;
      }
    }
  } catch {
    /* still try detail */
  }

  if (!skipCms) {
    try {
      const res = await fetch(`${base}/api/cms/blogs/${slug}/`, {
        next: { revalidate: 60 },
      });
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
      /* fallback */
    }
  }

  const fb = defaultBlogPosts().find((p) => p.slug === slug);
  if (!fb) return null;
  return {
    ...normalizeBlogCard(fb),
    body_paragraphs: [fb.description],
    published_at: null,
  };
}
