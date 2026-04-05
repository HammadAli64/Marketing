import type { Metadata } from "next";
import Link from "next/link";
import { CmsImage } from "@/components/CmsImage";
import { Reveal } from "@/components/Reveal";
import { COMPANY } from "@/lib/constants";
import { fetchAbout } from "@/lib/cms";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About Us",
  description: `${COMPANY}—US-market strategy, elite engineering, and growth systems built for revenue and retention.`,
};

const TRUST_PILLARS = [
  {
    title: "Radical transparency",
    body: "Milestones, acceptance criteria, and dashboards you can actually use—no black-box delivery.",
  },
  {
    title: "Security-minded defaults",
    body: "HTTPS, validation, least privilege, and sane data handling from day one—not bolted on later.",
  },
  {
    title: "Performance & SEO baked in",
    body: "Core Web Vitals, structure, and technical SEO treated as product requirements, not afterthoughts.",
  },
  {
    title: "Async-first collaboration",
    body: "Concise written updates and Looms when they save cycles—respectful of US time zones and calendars.",
  },
] as const;

const HIGHLIGHTS = [
  { label: "Focus", value: "US market" },
  { label: "Model", value: "Strategy + build" },
  { label: "Retention", value: "Partnership" },
] as const;

export default async function AboutPage() {
  const about = await fetchAbout();
  const hasHeroImg = Boolean(about.hero_background_image);

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[min(85vh,720px)] overflow-hidden border-b border-slate-200 dark:border-helix-border">
        {about.hero_background_image ? (
          <>
            <div className="absolute inset-0">
              <CmsImage
                src={about.hero_background_image}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-[#0A1128]"
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_70%_20%,rgba(0,232,255,0.15),transparent),radial-gradient(ellipse_50%_50%_at_10%_80%,rgba(212,175,55,0.1),transparent)]"
              aria-hidden
            />
          </>
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#0A1128] via-[#0f1629] to-[#06080f]"
            aria-hidden
          />
        )}
        <div
          className="pointer-events-none absolute inset-0 bg-grid-fade-dark opacity-30 dark:opacity-40"
          aria-hidden
        />

        <div className="relative mx-auto flex min-h-[min(85vh,720px)] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
          <Reveal>
            <div className="max-w-3xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand backdrop-blur-sm">
                About {COMPANY.replace(" Solutions", "")}
              </span>
              <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.25rem] lg:leading-[1.06]">
                {about.hero_title.trim() || "About us"}
              </h1>
              {about.hero_subtitle ? (
                <p
                  className={`mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl ${
                    hasHeroImg ? "text-slate-200" : "text-slate-300"
                  }`}
                >
                  {about.hero_subtitle}
                </p>
              ) : null}
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-helix-bg shadow-lg shadow-black/20 transition hover:bg-slate-100"
              >
                Book a Strategy Session
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-brand/40 hover:bg-white/10"
              >
                Explore services
              </Link>
            </div>

            <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-white/15 pt-10 sm:max-w-xl">
              {HIGHLIGHTS.map((h) => (
                <div key={h.label}>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {h.label}
                  </dt>
                  <dd className="mt-1 font-display text-lg font-semibold text-white sm:text-xl">
                    {h.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Story + mission */}
      <section className="relative border-b border-slate-200 bg-white py-16 dark:border-helix-border dark:bg-helix-bg sm:py-24">
        <div
          className="pointer-events-none absolute right-0 top-0 h-96 w-96 translate-x-1/3 -translate-y-1/4 rounded-full bg-brand/5 blur-3xl dark:bg-brand/10"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16 lg:items-start">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
                  Our story
                </p>
                {about.intro ? (
                  <div className="mt-5 space-y-5 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                    {about.intro.split("\n\n").map((para, i) => (
                      <p key={i} className="whitespace-pre-line">
                        {para.trim()}
                      </p>
                    ))}
                  </div>
                ) : null}
              </Reveal>
            </div>

            <aside className="lg:col-span-5">
              <Reveal delay={0.05}>
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-900/5 dark:border-helix-border dark:from-helix-elevated dark:to-helix-surface dark:shadow-black/40 dark:ring-white/5">
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand/20 blur-2xl dark:bg-brand/25"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-helix-gold/10 blur-3xl"
                    aria-hidden
                  />
                  <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-helix-gold">
                    {about.mission_title}
                  </p>
                  {about.mission_body ? (
                    <p className="relative mt-4 whitespace-pre-line text-base leading-relaxed text-slate-700 dark:text-slate-300">
                      {about.mission_body}
                    </p>
                  ) : null}
                  <div className="relative mt-8 flex items-center gap-3 border-t border-slate-200 pt-6 dark:border-white/10">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-lg font-bold text-brand">
                      ✓
                    </span>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Outcomes over output—every engagement ties to metrics you care about.
                    </p>
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      {/* Trust pillars */}
      <section className="border-b border-slate-200 bg-slate-50 py-16 dark:border-helix-border dark:bg-[#0a0f1c] sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
                How we work
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-helix-heading dark:text-white sm:text-4xl">
                How we earn trust
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                Principles we refuse to compromise on—so you always know what you&apos;re buying
                and what &quot;done&quot; means.
              </p>
            </div>
          </Reveal>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2">
            {TRUST_PILLARS.map((item, i) => (
              <Reveal key={item.title} delay={0.04 * i}>
                <li className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:border-brand/30 hover:shadow-md dark:border-helix-border dark:bg-helix-elevated dark:hover:border-brand/35 sm:p-8">
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-brand/[0.04] to-transparent opacity-0 transition group-hover:opacity-100 dark:from-brand/[0.08]"
                    aria-hidden
                  />
                  <div className="relative flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-sm font-bold text-brand ring-1 ring-brand/20 dark:bg-brand/15">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-helix-heading dark:text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery */}
      {about.images.length > 0 ? (
        <section className="border-b border-slate-200 bg-white py-16 dark:border-helix-border dark:bg-helix-bg sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
                Gallery
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-helix-heading dark:text-white sm:text-4xl">
                Inside our practice
              </h2>
              <p className="mt-3 max-w-xl text-sm text-slate-500 dark:text-slate-400">
                Images are managed in Admin → About → gallery. Swap anytime without redeploying
                code.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {about.images.map((img, i) => (
                <Reveal key={`${img.image}-${i}`} delay={0.05 * i}>
                  <figure className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-md transition hover:border-brand/30 dark:border-helix-border dark:bg-helix-elevated dark:hover:border-brand/40">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      {img.image ? (
                        <CmsImage
                          src={img.image}
                          alt={img.caption || "About"}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width:1024px) 100vw, 33vw"
                        />
                      ) : null}
                    </div>
                    {img.caption ? (
                      <figcaption className="border-t border-slate-100 px-4 py-3 text-xs text-slate-600 dark:border-white/10 dark:text-slate-400">
                        {img.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1128] via-[#0d1528] to-[#06080f] py-16 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(0,232,255,0.12),transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Ready for your unfair advantage?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-400">
              Tell us what you&apos;re building, who it serves, and what winning looks like in
              numbers—we&apos;ll come back with a clear plan and next steps.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-sm font-bold uppercase tracking-wide text-helix-bg shadow-[0_0_40px_rgba(0,232,255,0.2)] transition hover:bg-slate-100"
              >
                Book a Strategy Session
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur transition hover:border-brand/40 hover:bg-white/10"
              >
                View portfolio
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
