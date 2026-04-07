import { Reveal } from "@/components/Reveal";

const ITEMS = [
  {
    title: "Revenue-First Obsession",
    body: "Every decision maps to leads, conversion, and margin—not vanity metrics. When trade-offs appear, we default to what moves revenue.",
  },
  {
    title: "US Strategy + Global Firepower",
    body: "US-market tone, compliance awareness, and buyer psychology—with senior teams built for speed. Premium outcomes without a coast-to-coast agency roster.",
  },
  {
    title: "End-to-End Domination",
    body: "One partner for web, SEO, product, automation, and staff augmentation. Faster launches, fewer handoffs, one thread from strategy to ship.",
  },
  {
    title: "Radical Transparency",
    body: "Dashboards, checkpoints, and clear scope—no black boxes. You see progress and risks in plain language while we carry the execution load.",
  },
] as const;

const CARD_THEMES = [
  {
    bar: "border-l-violet-500",
    surface:
      "from-violet-50/90 via-white to-indigo-50/80 dark:from-violet-950/50 dark:via-slate-900/90 dark:to-indigo-950/40",
    num: "text-violet-600 dark:text-violet-300",
    glow: "from-violet-400 to-indigo-500",
  },
  {
    bar: "border-l-emerald-500",
    surface:
      "from-emerald-50/90 via-white to-teal-50/75 dark:from-emerald-950/45 dark:via-slate-900/90 dark:to-teal-950/35",
    num: "text-emerald-600 dark:text-emerald-400",
    glow: "from-emerald-400 to-teal-400",
  },
  {
    bar: "border-l-amber-500",
    surface:
      "from-amber-50/90 via-white to-orange-50/75 dark:from-amber-950/40 dark:via-slate-900/90 dark:to-orange-950/32",
    num: "text-amber-600 dark:text-amber-400",
    glow: "from-amber-400 to-orange-400",
  },
  {
    bar: "border-l-rose-500",
    surface:
      "from-rose-50/90 via-white to-fuchsia-50/75 dark:from-rose-950/45 dark:via-slate-900/90 dark:to-fuchsia-950/35",
    num: "text-rose-600 dark:text-rose-300",
    glow: "from-rose-400 to-fuchsia-400",
  },
] as const;

export function WhyChooseSection() {
  return (
    <section
      id="why-us"
      className="relative overflow-hidden border-t border-slate-200/90 py-16 dark:border-helix-border sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,#f0f4fb_0%,#e8edf6_35%,#f5f2ef_100%)] dark:bg-[linear-gradient(160deg,#070b14_0%,#0c1524_45%,#0a111c_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(99,102,241,0.12),transparent),radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(6,182,212,0.1),transparent)] dark:bg-[radial-gradient(ellipse_75%_50%_at_50%_5%,rgba(99,102,241,0.1),transparent),radial-gradient(ellipse_65%_45%_at_50%_95%,rgba(34,211,238,0.08),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22] dark:opacity-[0.12] [background-image:radial-gradient(circle_at_center,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:1.25rem_1.25rem] dark:[background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.035)_1px,transparent_1px)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-brand/30 bg-brand/[0.07] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.28em] text-brand dark:border-brand/40 dark:bg-brand/10 dark:text-[#5ff4ff] sm:text-xs">
            Why Helix Prime
          </span>
          <div
            className="mx-auto mt-4 h-1 w-14 rounded-full bg-gradient-to-r from-brand via-cyan-400 to-teal-500 shadow-[0_0_16px_rgba(0,232,255,0.3)]"
            aria-hidden
          />
          <h2 className="mt-5 font-display text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl md:text-[2.25rem] md:leading-[1.1]">
            <span className="block text-helix-heading dark:text-white">
              Why Top US Companies
            </span>
            <span className="mt-1 block bg-gradient-to-r from-[#00c8e8] via-[#00e8ff] to-[#2ee4a8] bg-clip-text text-transparent dark:from-[#4ddbff] dark:via-brand dark:to-[#5ae8b8]">
              Choose Helix Prime
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
            Four reasons revenue leaders replace scattered vendors with one partner built for the US
            market—strategy, delivery, and transparency in one lane.
          </p>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 md:gap-4">
          {ITEMS.map((item, i) => {
            const theme = CARD_THEMES[i]!;
            return (
              <Reveal key={item.title} delay={0.04 * i}>
                <li
                  className={`group relative flex overflow-hidden rounded-xl border border-slate-200/90 bg-gradient-to-br shadow-sm ring-1 ring-white/50 transition duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:ring-white/[0.04] dark:hover:border-white/12 ${theme.bar} border-l-[4px] ${theme.surface}`}
                >
                  <div
                    className={`pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br opacity-15 blur-xl transition group-hover:opacity-25 ${theme.glow}`}
                    aria-hidden
                  />
                  <div className="relative flex gap-3 p-4 sm:gap-3.5 sm:p-5">
                    <span
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/80 bg-white/80 font-mono text-[11px] font-bold tabular-nums shadow-sm dark:border-white/10 dark:bg-black/30 ${theme.num}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-base font-bold leading-snug text-helix-deepNavy dark:text-white sm:text-[1.05rem]">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-snug text-slate-600 dark:text-slate-400">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
