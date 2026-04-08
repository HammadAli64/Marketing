import type { Metadata } from "next";
import Link from "next/link";
import { CmsImage } from "@/components/CmsImage";
import { Reveal } from "@/components/Reveal";
import { fetchServicesList } from "@/lib/cms";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website development, app development, SEO, social media management, and automation solutions by Helix Prime Solutions.",
};

export default async function ServicesPage() {
  const services = await fetchServicesList();

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 sm:py-24">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Services
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-helix-heading dark:text-white sm:text-5xl">
          Full-stack delivery for modern digital businesses
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Each card links to a dedicated page with scope, deliverables, and how we measure success
          together.
        </p>
      </Reveal>

      {services.length > 0 ? (
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={0.05 * i}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-brand/40 dark:border-helix-border dark:bg-helix-surface/60 dark:hover:border-brand/45"
              >
                <div className="relative aspect-[16/10] bg-slate-100 dark:bg-helix-elevated">
                  {s.cover_image ? (
                    <CmsImage
                      src={s.cover_image}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    />
                  ) : s.icon_image ? (
                    <div className="flex h-full items-center justify-center p-10">
                      <CmsImage
                        src={s.icon_image}
                        alt=""
                        width={96}
                        height={96}
                        className="object-contain opacity-90"
                      />
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand/20 via-slate-100 to-cyan-700/10 text-3xl font-bold text-brand dark:via-helix-elevated">
                      {s.title.slice(0, 1)}
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-lg font-bold text-helix-heading group-hover:text-brand dark:text-white dark:group-hover:text-brand">
                    {s.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {s.summary}
                  </p>
                  <span className="mt-4 text-sm font-semibold text-brand">View details →</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="mt-14 text-slate-600 dark:text-slate-400">
          New service offerings will appear here as they are published.
        </p>
      )}

      <Reveal className="mt-16" delay={0.08}>
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-brand/25 bg-brand-soft p-8 dark:border-brand/30 dark:bg-brand/10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl font-semibold text-helix-heading dark:text-white">
              Not sure where to start?
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              We will recommend a lean first phase—often a roadmap workshop or MVP slice.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-hover"
          >
            Get a Quote
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
