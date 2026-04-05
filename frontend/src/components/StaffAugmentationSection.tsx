import { Reveal } from "@/components/Reveal";

const BULLETS = [
  "Slash Costs by 60%",
  "Scale Instantly",
  "Unfair Talent Advantage",
  "Speed That Crushes Competitors",
  "Total Control",
] as const;

export function StaffAugmentationSection() {
  return (
    <section
      id="staff-augmentation"
      className="relative overflow-hidden border-t border-sky-200/80 py-20 dark:border-helix-border sm:py-28"
    >
      {/* Base wash — clearly tinted in light mode */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-200/90 via-sky-100 to-cyan-100/70 dark:from-helix-bg dark:via-[#0c1528] dark:to-helix-bg"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_0%_20%,rgba(125,211,252,0.55),transparent),radial-gradient(ellipse_70%_60%_at_100%_80%,rgba(253,230,138,0.35),transparent)] opacity-90 dark:opacity-100 dark:bg-[radial-gradient(ellipse_70%_55%_at_15%_30%,rgba(0,232,255,0.14),transparent),radial-gradient(ellipse_55%_50%_at_90%_70%,rgba(197,179,88,0.12),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.35)_50%,transparent_100%)] dark:bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.15),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand drop-shadow-sm">
            Staff augmentation
          </p>
          <h2 className="mt-4 max-w-4xl font-display text-3xl font-bold leading-tight text-helix-deepNavy dark:text-white sm:text-4xl md:text-5xl">
            Staff Augmentation: Elite Talent. Zero Drama. Instant Scale.
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-700 dark:text-slate-400 sm:text-xl">
            Tired of slow hiring, sky-high salaries, and underperforming teams? Staff
            augmentation from Helix Prime gives you immediate access to battle-tested
            US-market-ready developers, designers, and digital experts who plug into your
            team and deliver from day one.
          </p>
          <p className="mt-4 max-w-3xl text-lg font-semibold leading-relaxed text-slate-800 dark:text-slate-200">
            No long onboarding. No bloated overhead. Just pure firepower.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-14">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-helix-goldMuted sm:text-left sm:text-sm">
            Why companies choose us for staff augmentation
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-5">
            {BULLETS.map((item, i) => {
              const a = i % 2 === 0;
              return (
                <li
                  key={item}
                  className={
                    a
                      ? "flex min-h-[4.75rem] items-center gap-4 rounded-2xl border border-sky-400/50 bg-gradient-to-br from-sky-300/90 to-cyan-200/80 px-5 py-4 shadow-md shadow-sky-900/10 ring-1 ring-white/40 transition duration-200 hover:border-sky-500 hover:shadow-lg dark:border-sky-700/50 dark:from-[#164a63] dark:to-[#0f3548] dark:shadow-black/30 dark:ring-white/5 dark:hover:border-brand/40"
                      : "flex min-h-[4.75rem] items-center gap-4 rounded-2xl border border-teal-300/50 bg-gradient-to-br from-teal-200/85 to-sky-200/75 px-5 py-4 shadow-md shadow-teal-900/10 ring-1 ring-white/40 transition duration-200 hover:border-teal-400 hover:shadow-lg dark:border-teal-900/40 dark:from-[#134e52] dark:to-[#123d4a] dark:shadow-black/30 dark:ring-white/5 dark:hover:border-brand/40"
                  }
                >
                  <span
                    className="flex h-3 w-3 shrink-0 rounded-full bg-[#00f0ff] shadow-[0_0_14px_rgba(0,240,255,0.75)] ring-2 ring-white/70 dark:bg-brand dark:shadow-[0_0_14px_rgba(0,232,255,0.55)] dark:ring-brand/40"
                    aria-hidden
                  />
                  <span className="text-base font-bold leading-snug text-helix-deepNavy dark:text-white sm:text-lg">
                    {item}
                  </span>
                </li>
              );
            })}
          </ul>

          <p className="mx-auto mt-12 max-w-2xl text-center text-base font-medium leading-relaxed text-slate-700 dark:text-slate-400 sm:text-left">
            Perfect for startups racing to launch and established businesses scaling without
            breaking the bank.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
