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
      className="border-t border-slate-200 bg-slate-50 py-20 dark:border-helix-border dark:bg-helix-surface sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Why Helix Prime
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 dark:text-white sm:text-5xl">
            Why Top US Companies Choose Helix Prime
          </h2>
        </Reveal>
        <ul className="mt-14 space-y-6">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={0.04 * i}>
              <li className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-helix-border dark:bg-helix-bg sm:p-8">
                <h3 className="font-display text-xl font-semibold text-brand sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-300 sm:text-lg">
                  {item.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
