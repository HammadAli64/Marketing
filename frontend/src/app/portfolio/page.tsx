import type { Metadata } from "next";
import Link from "next/link";
import { CmsImage } from "@/components/CmsImage";
import { Reveal } from "@/components/Reveal";
import { fetchProjectsList } from "@/lib/cms";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected projects from Helix Prime Solutions—web, mobile, and automation engagements.",
};

export default async function PortfolioPage() {
  const projects = await fetchProjectsList();

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 sm:py-24">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Portfolio
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold text-helix-heading dark:text-white sm:text-5xl">
          Work that reflects how we think
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Add and publish projects in{" "}
          <span className="text-slate-800 dark:text-slate-300">Admin → Projects</span>
          —each card links to a full case page.
        </p>
      </Reveal>

      {projects.length > 0 ? (
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={0.06 * i}>
              <Link
                href={`/portfolio/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-brand/40 dark:border-helix-border dark:bg-helix-surface/60 dark:hover:border-brand/45"
              >
                <div className="relative aspect-[16/9] bg-slate-100 dark:bg-helix-elevated">
                  {p.cover_image ? (
                    <CmsImage
                      src={p.cover_image}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width:768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand/20 via-slate-100 to-cyan-700/10 text-xs text-slate-500 dark:via-helix-elevated">
                      Upload cover in admin
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                    {p.category}
                  </p>
                  <h2 className="mt-2 font-display text-xl font-bold text-helix-heading group-hover:text-brand dark:text-white dark:group-hover:text-brand">
                    {p.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {p.excerpt}
                  </p>
                  <span className="mt-6 text-sm font-semibold text-brand">
                    View case study →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="mt-14 text-slate-600 dark:text-slate-400">
          No portfolio projects in the CMS yet. Add them in Django admin.
        </p>
      )}

      <Reveal className="mt-16" delay={0.1}>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-helix-border dark:bg-helix-elevated">
          <p className="font-display text-xl font-semibold text-helix-heading dark:text-white">
            Want something similar?
          </p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Share your constraints and goals—we will map a realistic path.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-brand to-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:brightness-110"
          >
            Book a Call
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
