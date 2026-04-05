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
      className="relative overflow-hidden border-t border-slate-200 py-20 dark:border-helix-border sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_40%,rgba(0,242,255,0.08),transparent),radial-gradient(ellipse_60%_40%_at_90%_60%,rgba(212,175,55,0.06),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Staff augmentation
          </p>
          <h2 className="mt-4 max-w-4xl font-display text-3xl font-bold leading-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
            Staff Augmentation: Elite Talent. Zero Drama. Instant Scale.
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xl">
            Tired of slow hiring, sky-high salaries, and underperforming teams? Staff
            augmentation from Helix Prime gives you immediate access to battle-tested
            US-market-ready developers, designers, and digital experts who plug into your
            team and deliver from day one.
          </p>
          <p className="mt-4 max-w-3xl text-lg font-medium leading-relaxed text-slate-800 dark:text-slate-200">
            No long onboarding. No bloated overhead. Just pure firepower.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-helix-gold">
            Why companies choose us for Staff Augmentation
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BULLETS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-helix-border dark:bg-helix-elevated/80"
              >
                <span
                  className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-brand shadow-[0_0_12px_rgba(0,242,255,0.6)]"
                  aria-hidden
                />
                <span className="text-base font-semibold text-slate-900 dark:text-white">
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Perfect for startups racing to launch and established businesses scaling without
            breaking the bank.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
