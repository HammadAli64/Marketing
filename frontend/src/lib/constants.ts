export const COMPANY = "Helix Prime Solutions";

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@helixprimesolutions.com";

type SocialId = "linkedin" | "x" | "facebook" | "github";

/** Set env to `""` to hide a network. Replace URLs with your real profiles. */
export const SOCIAL_LINKS: { id: SocialId; label: string; href: string }[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href:
      process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN?.trim() ??
      "https://www.linkedin.com/company/helix-prime-solutions",
  },
  {
    id: "x",
    label: "X",
    href: process.env.NEXT_PUBLIC_SOCIAL_X?.trim() ?? "https://x.com/helixprimesolutions",
  },
  {
    id: "facebook",
    label: "Facebook",
    href:
      process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK?.trim() ??
      "https://www.facebook.com/helixprimesolutions",
  },
  {
    id: "github",
    label: "GitHub",
    href:
      process.env.NEXT_PUBLIC_SOCIAL_GITHUB?.trim() ??
      "https://github.com/helix-prime-solutions",
  },
].filter((l): l is { id: SocialId; label: string; href: string } => l.href.length > 0);

export const SERVICES = [
  {
    slug: "web",
    title: "Website Development",
    summary:
      "We don’t build pretty websites. We engineer high-converting, lead-generating machines that work 24/7 to flood your pipeline with qualified prospects while your competitors sleep.",
    bullets: [
      "Next.js & modern stacks",
      "Performance & Core Web Vitals",
      "CMS-ready architecture",
    ],
  },
  {
    slug: "seo",
    title: "SEO (Search Engine Optimization)",
    summary:
      "Stop hoping for traffic. We own search results for our clients. Our aggressive, data-driven SEO strategies skyrocket qualified organic traffic and turn Google into your most powerful sales channel.",
    bullets: [
      "Site audits & fixes",
      "Schema & metadata",
      "Measurement you can trust",
    ],
  },
  {
    slug: "app",
    title: "App Development",
    summary:
      "From idea to revenue in record time. We build addictive, scalable mobile and web apps that solve real problems, delight users, and print money for your business.",
    bullets: [
      "Mobile-first UX",
      "Secure APIs & integrations",
      "Ongoing iteration support",
    ],
  },
  {
    slug: "social",
    title: "Social Media Management",
    summary:
      "We don’t post pretty pictures. We build authority, ignite engagement, and drive direct sales across every platform so you dominate your niche while others chase likes.",
    bullets: [
      "Editorial calendars",
      "Creative direction",
      "Reporting & optimization",
    ],
  },
  {
    slug: "automation",
    title: "Automation Solutions",
    summary:
      "Cut waste. Multiply output. Our intelligent automations eliminate repetitive tasks, slash costs, and free your team to focus on revenue-generating work that actually moves the needle.",
    bullets: [
      "Process mapping",
      "Zapier / custom bridges",
      "Monitoring & reliability",
    ],
  },
  {
    slug: "branding",
    title: "Brand Identity & Creative Systems",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio praesent libero sed cursus ante dapibus diam. Sed nisi nulla quis sem at nibh elementum imperdiet.",
    bullets: [
      "Design systems & component libraries",
      "Campaign creative & motion",
      "Voice, tone, and brand guidelines",
    ],
  },
  {
    slug: "data",
    title: "Data & Business Intelligence",
    summary:
      "Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. Aenean fermentum risus id tortor. Donec odio tempus molestie, porttitor ut, commodo ut, egestas vitae, pede.",
    bullets: [
      "Warehousing, ETL, and pipelines",
      "Executive dashboards & KPIs",
      "Forecasting and attribution models",
    ],
  },
  {
    slug: "devops",
    title: "Cloud Infrastructure & DevOps",
    summary:
      "Fusce suscipit varius mi. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla quis sem at nibh fringilla imperdiet.",
    bullets: [
      "CI/CD and release automation",
      "Observability, SLOs, and on-call",
      "Hardening, backups, and DR drills",
    ],
  },
  {
    slug: "support",
    title: "Managed Support & Retainers",
    summary:
      "Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.",
    bullets: [
      "SLA-based ticketing",
      "Quarterly roadmap reviews",
      "Security patches and upgrades",
    ],
  },
] as const;

export const PORTFOLIO_ITEMS = [
  {
    title: "FinSight Analytics",
    category: "Web platform",
    description:
      "Executive dashboard for a US fintech team—role-based access and sub-second loads.",
  },
  {
    title: "Northline Health Portal",
    category: "Web + API",
    description:
      "Patient-facing scheduling with HIPAA-minded architecture and audit trails.",
  },
  {
    title: "Pulse Retail",
    category: "Mobile app",
    description:
      "iOS/Android storefront with loyalty, push promos, and offline catalog.",
  },
  {
    title: "Atlas Ops",
    category: "Automation",
    description:
      "Sales-to-delivery pipeline automation reducing manual handoffs by 60%.",
  },
  {
    title: "Nexus Commerce Platform",
    category: "E-commerce",
    description:
      "Lorem ipsum dolor sit amet—multi-store checkout, promos engine, and headless storefront APIs for a national retailer pilot.",
  },
  {
    title: "Meridian Intelligence Suite",
    category: "Data & analytics",
    description:
      "Consectetur adipiscing elit—unified warehouse, self-serve BI, and scheduled exports for operations and finance stakeholders.",
  },
  {
    title: "Beacon Field Services",
    category: "Mobile + web",
    description:
      "Sed do eiusmod tempor—technician scheduling, offline-first mobile forms, and GPS-verified job completion for a utilities vendor.",
  },
  {
    title: "Catalyst Membership Hub",
    category: "SaaS portal",
    description:
      "Ut labore et dolore—tiered subscriptions, community forums, and Stripe Connect payouts for a creator economy startup.",
  },
  {
    title: "Vantage CX Automation",
    category: "Automation",
    description:
      "Magna aliqua ut enim—ticket routing, sentiment tagging, and CRM sync reducing average handle time in a 200-seat contact center.",
  },
  {
    title: "Horizon Event Network",
    category: "Web platform",
    description:
      "Quis nostrud exercitation—multi-track agendas, sponsor portals, and livestream embeds for hybrid conferences up to 50k attendees.",
  },
  {
    title: "Silverline Document AI",
    category: "Web + API",
    description:
      "Duis aute irure—OCR pipeline, human-in-the-loop review, and audit logs for mortgage document intake at regional banks.",
  },
] as const;
