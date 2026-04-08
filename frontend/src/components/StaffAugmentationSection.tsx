import { Reveal } from "@/components/Reveal";

const BENEFIT_CARDS = [
  {
    title: "Slash Costs by 60%",
    body: "Blend senior output with rates that respect your runway. We help you redirect budget from idle overhead into shipping—without sacrificing quality or accountability.",
  },
  {
    title: "Scale Instantly",
    body: "Add vetted engineers, designers, or specialists in days—not quarters. Surge for launches, then right-size once the spike cools.",
  },
  {
    title: "Unfair Talent Advantage",
    body: "US-market polish with execution discipline: crisp communication, ownership, and delivery habits shaped for demanding stakeholders and fast feedback loops.",
  },
  {
    title: "Speed That Crushes Competitors",
    body: "Parallel workstreams and fewer hiring bottlenecks mean your roadmap moves while others are still scheduling screens and negotiating offers.",
  },
  {
    title: "Total Control",
    body: "You set priorities and own the product; our people embed like senior ICs on your tools, ceremonies, and reporting—no black-box handoffs.",
  },
] as const;

/** Per-row accent: numbered circle + soft panel tint. */
const ROW_THEMES = [
  {
    circle: "from-indigo-500 to-violet-600 ring-indigo-500/25",
    softBg: "bg-indigo-50/60 dark:bg-indigo-950/25",
  },
  {
    circle: "from-emerald-500 to-teal-600 ring-emerald-500/25",
    softBg: "bg-emerald-50/60 dark:bg-emerald-950/25",
  },
  {
    circle: "from-amber-500 to-orange-500 ring-amber-500/25",
    softBg: "bg-amber-50/60 dark:bg-amber-950/25",
  },
  {
    circle: "from-rose-500 to-pink-600 ring-rose-500/25",
    softBg: "bg-rose-50/60 dark:bg-rose-950/25",
  },
  {
    circle: "from-sky-500 to-blue-600 ring-sky-500/25",
    softBg: "bg-sky-50/60 dark:bg-sky-950/25",
  },
] as const;

export function StaffAugmentationSection() {
  return (
    <section
      id="staff-augmentation"
      className="relative overflow-hidden border-t border-slate-200/90 py-20 dark:border-helix-border sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,#faf8f5_0%,#f0f4f8_45%,#e8f5f0_100%)] dark:bg-[linear-gradient(165deg,#070b14_0%,#0a1420_50%,#071018_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_100%_0%,rgba(251,191,36,0.12),transparent),radial-gradient(ellipse_70%_50%_at_0%_100%,rgba(56,189,248,0.14),transparent)] dark:bg-[radial-gradient(ellipse_80%_55%_at_95%_5%,rgba(251,191,36,0.08),transparent),radial-gradient(ellipse_65%_50%_at_5%_95%,rgba(34,211,238,0.1),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.2] [background-image:linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] [background-size:2.25rem_2.25rem] dark:[background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 lg:items-start">
          {/* Intro — sticky on large screens */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand drop-shadow-sm">
                Staff augmentation
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-helix-deepNavy dark:text-white sm:text-4xl md:text-[2.35rem] md:leading-[1.15]">
                Staff Augmentation: Elite Talent. Zero Drama. Instant Scale.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-700 dark:text-slate-400 sm:text-xl">
                Tired of slow hiring, sky-high salaries, and underperforming teams? Staff
                augmentation from Helix Prime gives you immediate access to battle-tested
                US-market-ready developers, designers, and digital experts who plug into your
                team and deliver from day one.
              </p>
              <p className="mt-4 text-lg font-semibold leading-relaxed text-slate-800 dark:text-slate-200">
                No long onboarding. No bloated overhead. Just pure firepower.
              </p>
            </Reveal>
          </div>

          {/* Outcomes — vertical timeline + rows */}
          <div className="lg:col-span-7">
            <Reveal delay={0.06}>
              <div className="border-b border-slate-200/90 pb-8 dark:border-white/10">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-helix-goldMuted sm:text-sm">
                  Why companies choose us for staff augmentation
                </p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-500">
                  Five concrete outcomes we hear from teams that augment with Helix Prime—laid
                  out as a quick-scan list.
                </p>
              </div>

              <div className="relative mt-8">
                {/* Vertical spine — aligned to gradient circle centers */}
                <div
                  className="pointer-events-none absolute left-[1.375rem] top-7 bottom-7 w-px bg-gradient-to-b from-slate-200 via-slate-200 to-slate-200 dark:from-white/15 dark:via-white/10 dark:to-white/15 sm:left-7 sm:top-8 sm:bottom-8"
                  aria-hidden
                />

                <ol className="relative space-y-0">
                  {BENEFIT_CARDS.map((card, i) => {
                    const theme = ROW_THEMES[i]!;
                    const num = String(i + 1).padStart(2, "0");
                    const isLast = i === BENEFIT_CARDS.length - 1;

                    return (
                      <li
                        key={card.title}
                        className={`relative z-10 flex gap-4 sm:gap-6 ${isLast ? "" : "pb-8 sm:pb-10"}`}
                      >
                        <div className="flex shrink-0 justify-center">
                          <div
                            className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br font-display text-sm font-bold tabular-nums text-white shadow-md ring-4 ring-white dark:ring-slate-950 sm:h-14 sm:w-14 sm:text-base ${theme.circle}`}
                          >
                            {num}
                          </div>
                        </div>

                        <div
                          className={`min-w-0 flex-1 rounded-2xl border border-slate-200/90 p-5 shadow-sm transition hover:border-slate-300/90 dark:border-white/[0.08] dark:hover:border-white/[0.14] sm:p-6 ${theme.softBg}`}
                        >
                          <h3 className="font-display text-lg font-bold leading-snug text-helix-deepNavy dark:text-white sm:text-xl">
                            {card.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-[0.9375rem]">
                            {card.body}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <p className="mt-10 border-t border-slate-200/90 pt-10 text-base font-medium leading-relaxed text-slate-700 dark:text-slate-400 dark:border-white/10">
                Perfect for startups racing to launch and established businesses scaling without
                breaking the bank.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
