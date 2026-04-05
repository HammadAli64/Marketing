import { Reveal } from "@/components/Reveal";

const ITEMS = [
  {
    title: "Revenue-First Obsession",
    body: "Every decision is tied to your bottom line: more leads, more sales, more profit. Period.",
  },
  {
    title: "US Strategy + Global Firepower",
    body: "We speak your language, understand your market, and deliver premium results at a fraction of traditional US agency costs.",
  },
  {
    title: "End-to-End Domination",
    body: "One elite partner for websites, SEO, apps, automation, and instant talent — no more juggling multiple vendors.",
  },
  {
    title: "Radical Transparency",
    body: "Real-time dashboards, weekly updates, and zero surprises. You stay in control at every step.",
  },
  {
    title: "Proven Long-Term Wins",
    body: "98% retention because we don’t just deliver once — we become your permanent growth engine.",
  },
] as const;

export function WhyChooseSection() {
  return (
    <section
      id="why-us"
      className="relative overflow-hidden border-t border-slate-200 py-20 dark:border-helix-border sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-100/90 via-white to-slate-50 dark:from-helix-bg dark:via-helix-surface dark:to-helix-bg"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_100%_0%,rgba(0,232,255,0.09),transparent),radial-gradient(ellipse_50%_45%_at_0%_100%,rgba(197,179,88,0.08),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-helix-goldMuted">
            Why Helix Prime
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-helix-heading dark:text-white sm:text-4xl md:text-5xl">
            Why Top US Companies Choose Helix Prime
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
            Five reasons revenue leaders replace scattered vendors with one partner built for the US
            market.
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {ITEMS.map((item, i) => {
            const isHighlight = i === ITEMS.length - 1;
            const altTint =
              i % 2 === 0
                ? "border-sky-300/90 bg-gradient-to-br from-sky-200 to-cyan-100 hover:border-sky-400 dark:border-sky-800/80 dark:from-[#0f3a52] dark:to-[#0d2838] dark:hover:border-brand/40"
                : "border-indigo-200/95 bg-gradient-to-br from-indigo-100 to-sky-100 hover:border-indigo-300 dark:border-indigo-900/70 dark:from-[#1a1f3d] dark:to-[#152238] dark:hover:border-brand/40";
            return (
              <Reveal key={item.title} delay={0.05 * i}>
                <li
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 shadow-sm transition duration-300 hover:shadow-lg sm:p-7 ${
                    isHighlight
                      ? "border-cyan-400/50 bg-gradient-to-br from-cyan-200 via-sky-100 to-teal-100 ring-1 ring-brand/25 dark:border-brand/40 dark:from-[#063a4a] dark:via-[#0c2138] dark:to-[#0a1f2e] md:col-span-2 md:flex-row md:items-center md:gap-10 md:p-8 lg:gap-14"
                      : altTint
                  }`}
                >
                  <div
                    className={`mb-5 flex shrink-0 items-center gap-4 ${isHighlight ? "md:mb-0" : ""}`}
                  >
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-xl font-display text-lg font-bold tabular-nums ${
                        isHighlight
                          ? "bg-gradient-to-br from-brand to-cyan-600 text-helix-bg shadow-md shadow-brand/25"
                          : "border-2 border-white/90 bg-white text-helix-heading shadow-md dark:border-white/20 dark:bg-helix-bg dark:text-brand"
                      }`}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {isHighlight ? (
                      <div className="hidden h-px w-12 bg-gradient-to-r from-brand/50 to-transparent md:block" />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`font-display font-bold tracking-tight text-helix-deepNavy dark:text-white ${
                        isHighlight ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`mt-3 font-medium leading-relaxed text-slate-700 dark:text-slate-300 ${
                        isHighlight ? "text-base sm:text-lg" : "text-sm sm:text-base"
                      }`}
                    >
                      {item.body}
                    </p>
                  </div>
                  {isHighlight ? (
                    <div
                      className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand/10 blur-2xl dark:bg-brand/15"
                      aria-hidden
                    />
                  ) : null}
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
