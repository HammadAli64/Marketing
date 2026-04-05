import Link from "next/link";
import { AboutHomeSection } from "@/components/AboutHomeSection";
import { BlogPreviewSection } from "@/components/BlogPreviewSection";
import { CmsImage } from "@/components/CmsImage";
import { ContactForm } from "@/components/ContactForm";
import { FinalCtaSection } from "@/components/FinalCtaSection";
import { ImpactStatsSection } from "@/components/ImpactStatsSection";
import { Reveal } from "@/components/Reveal";
import { StaffAugmentationSection } from "@/components/StaffAugmentationSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import { COMPANY, CONTACT_EMAIL, SERVICES } from "@/lib/constants";
import { fetchBlogsList, fetchHomeBundle, fetchProjectsList } from "@/lib/cms";
import { PLACEHOLDER_HERO } from "@/lib/placeholders";

export const revalidate = 60;

export default async function HomePage() {
  const [home, projects, blogPosts] = await Promise.all([
    fetchHomeBundle(),
    fetchProjectsList(),
    fetchBlogsList(),
  ]);
  const { services, testimonials, hero } = home;
  const featured = projects.slice(0, 3);
  const cmsHero = hero.background_image?.trim() || PLACEHOLDER_HERO;
  const envHero = process.env.NEXT_PUBLIC_HERO_BACKGROUND?.trim();
  /** Uploaded CMS image wins; if CMS is still the default, `NEXT_PUBLIC_HERO_BACKGROUND` can replace it */
  const heroBackground =
    envHero && cmsHero === PLACEHOLDER_HERO ? envHero : cmsHero;

  const order = new Map<string, number>(SERVICES.map((s, i) => [s.slug, i]));
  const orderedServices = [...services].sort(
    (a, b) => (order.get(a.slug) ?? 99) - (order.get(b.slug) ?? 99)
  );

  return (
    <>
      <section
        id="top"
        className="relative flex min-h-[90vh] items-center overflow-hidden bg-helix-bg"
      >
        <div className="absolute inset-0">
          <CmsImage
            src={heroBackground}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(0,232,255,0.12),transparent),radial-gradient(ellipse_50%_40%_at_10%_80%,rgba(212,175,55,0.08),transparent)]"
            aria-hidden
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-grid-fade-dark opacity-[0.2] dark:opacity-[0.25]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-20 pt-24 sm:px-6 sm:pb-28 sm:pt-28">
          <div className="max-w-4xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              Helix Prime Solutions
            </p>
            <p className="mt-2 max-w-xl text-xs font-medium uppercase tracking-[0.18em] text-slate-200 sm:text-sm">
              US-market strategy · Web & apps · SEO · Automation · Staff augmentation
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.06] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Dominate Your Market. Explode Your Revenue.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl sm:leading-snug">
              Helix Prime Solutions builds conversion-obsessed websites, crushes SEO rankings,
              launches profit-driving apps, and deploys elite remote talent that turns ambitious
              US businesses into unstoppable growth machines.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
              We partner with founders and revenue leaders who are done with vanity metrics and
              slow agencies. Every engagement is scoped around pipeline, speed, and measurable
              ROI—so your next quarter looks nothing like the last. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit; sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua—your narrative, our execution.
            </p>
            <ul className="mt-8 flex max-w-2xl flex-col gap-2 text-sm text-slate-300 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                Senior-led squads, no bait-and-switch
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-helix-gold" aria-hidden />
                Clear reporting—you always know what shipped
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                Timezone-friendly collaboration with US buyers in mind
              </li>
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-4 text-base font-bold uppercase tracking-wide text-helix-bg shadow-[0_0_32px_rgba(255,255,255,0.2)] transition hover:bg-slate-100"
              >
                Book a Strategy Session Now
              </Link>
              <Link
                href="#portfolio"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur transition hover:border-brand/50 hover:bg-white/10"
              >
                See Real Results
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ImpactStatsSection />

      <section id="services" className="border-t border-slate-200 py-20 dark:border-helix-border sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              Services
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 dark:text-white sm:text-5xl">
              Digital Weapons Built to Win
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xl">
              One partner for the channels that actually move revenue: acquisition, conversion,
              product velocity, and operations. Pick a lane below or combine them—we map the
              shortest path from where you are today to where your P&amp;L needs to be.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
              Not sure where to start? That&apos;s normal. Most teams come to us with a messy
              stack and competing priorities. We help you sequence the work so quick wins fund
              the bigger bets. Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur—placeholder copy you can replace anytime.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {orderedServices.map((s, i) => (
              <Reveal key={s.slug} delay={0.05 * i}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-brand/35 hover:shadow-md dark:border-helix-border dark:bg-helix-bg dark:hover:border-brand/40 dark:hover:shadow-brand/10"
                >
                  <div className="relative aspect-[16/10] bg-slate-100 dark:bg-helix-elevated">
                    {s.cover_image ? (
                      <CmsImage
                        src={s.cover_image}
                        alt=""
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width:768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand/20 via-slate-100 to-helix-gold/15 text-2xl font-bold text-brand dark:via-helix-elevated">
                        {s.title.slice(0, 1)}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-base font-semibold text-brand">{s.title}</span>
                    <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                      {s.summary}
                    </p>
                    <span className="mt-4 text-sm font-semibold text-slate-900 opacity-0 transition group-hover:opacity-100 dark:text-white">
                      View service →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <StaffAugmentationSection />

      {featured.length > 0 ? (
        <section
          id="portfolio"
          className="border-t border-slate-200 bg-slate-50 py-20 dark:border-helix-border dark:bg-helix-surface sm:py-28"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white sm:text-5xl">
                  Proof. Not Promises.
                </h2>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xl">
                  See how we helped US startups and scaling companies explode their revenue,
                  crush their competition, and dominate their space. Real clients. Real
                  results. (Ready to be next?)
                </p>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
                  Below is a rotating sample of outcomes—platform rebuilds, mobile launches,
                  automation wins, and analytics rollouts. Each card links to a longer write-up
                  you can use as a template for your own case study pages. Nemo enim ipsam
                  voluptatem quia voluptas sit aspernatur aut odit aut fugit (dummy Latin for
                  spacing).
                </p>
              </div>
              <Link
                href="/portfolio"
                className="text-base font-semibold text-brand hover:text-brand-hover"
              >
                View full portfolio →
              </Link>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {featured.map((p, i) => (
                <Reveal key={p.slug} delay={0.06 * i}>
                  <Link
                    href={`/portfolio/${p.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-brand/40 dark:border-helix-border dark:bg-helix-bg dark:hover:border-brand/45"
                  >
                    <div className="relative aspect-[16/10] bg-slate-100 dark:bg-helix-elevated">
                      {p.cover_image ? (
                        <CmsImage
                          src={p.cover_image}
                          alt=""
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width:768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand/20 via-slate-100 to-helix-gold/15 text-xs text-slate-500 dark:via-helix-elevated">
                          Cover image (admin)
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <p className="text-sm font-semibold uppercase tracking-wider text-brand">
                        {p.category}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-semibold text-slate-900 group-hover:text-brand dark:text-white dark:group-hover:text-brand">
                        {p.title}
                      </h3>
                      <p className="mt-3 line-clamp-2 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                        {p.excerpt}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <TestimonialsSection items={testimonials} />

      <WhyChooseSection />

      <BlogPreviewSection posts={blogPosts} />

      <AboutHomeSection />

      <FinalCtaSection />

      <section
        id="contact"
        className="border-t border-slate-200 bg-slate-50 py-16 dark:border-helix-border dark:bg-helix-surface sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              Contact
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 dark:text-white sm:text-5xl">
              Let’s Make Your Competition Nervous
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xl">
              Ready to explode your revenue, dominate search, launch a killer app, or
              instantly scale your team with elite talent? Our US-focused team is standing
              by. First strategy call is 100% free — no pitch, just a clear plan to get you
              results faster.
            </p>
            <a
              href="#contact-form"
              className="mt-8 inline-flex text-base font-semibold text-brand hover:text-brand-hover"
            >
              Start Dominating Today →
            </a>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
              Prefer async? Drop a note with your site, rough timeline, and what “winning”
              looks like in numbers—we&apos;ll reply with a blunt assessment and a suggested
              roadmap. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum (sample filler text for layout).
            </p>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal delay={0.06} className="space-y-8">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-helix-border dark:bg-helix-elevated sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Email
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="mt-3 block break-all text-xl font-medium text-brand hover:text-brand-hover"
                >
                  {CONTACT_EMAIL}
                </a>
                <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  We typically respond within one business day for qualified inquiries. For
                  urgent staff-augmentation requests, mention your stack and start date in the
                  subject line so we can route you faster.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-helix-border dark:bg-helix-elevated sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  What happens next
                </p>
                <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  <li>We acknowledge your message and ask any blocking questions.</li>
                  <li>You get a short call or Loom with a concrete plan—no generic deck.</li>
                  <li>We agree on scope, cadence, and success metrics before any heavy lift.</li>
                </ol>
              </div>
              <p className="text-base leading-relaxed text-slate-500 dark:text-slate-500">
                {COMPANY} — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu
                nunc nec ligula interdum efficitur vel ut mi. Replace this line with your real
                address or compliance note when you go live.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div
                id="contact-form"
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md dark:border-helix-border dark:bg-helix-elevated sm:p-10"
              >
                <h3 className="font-display text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
                  Send a message
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
                  Tell us what you&apos;re building — we&apos;ll respond with next steps.
                </p>
                <div className="mt-8">
                  <ContactForm serviceOptions={orderedServices} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
