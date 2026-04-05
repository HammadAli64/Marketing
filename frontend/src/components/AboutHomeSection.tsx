import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export function AboutHomeSection() {
  return (
    <section
      id="about"
      className="border-t border-slate-200 bg-slate-50 py-20 dark:border-helix-border dark:bg-helix-surface sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            About us
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 dark:text-white sm:text-5xl">
            We Don’t Do Average. We Deliver Dominance.
          </h2>
        </Reveal>
        <Reveal delay={0.06} className="mt-10 space-y-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          <p>
            Helix Prime Solutions was built for one reason: to give ambitious businesses the
            digital edge they need to outperform everyone else in their market.
          </p>
          <p>
            We combine sharp American-market strategy with elite global execution. While
            other agencies deliver generic work, we obsess over one thing: measurable revenue
            impact.
          </p>
          <p>
            Our team of high-performing strategists, developers, and growth hackers acts as
            your secret weapon. We don’t just complete projects. We engineer unfair
            advantages: faster launches, higher conversions, lower costs, and explosive
            growth.
          </p>
          <p className="font-medium text-slate-800 dark:text-slate-200">
            If you’re done settling for “good enough” and ready to dominate your industry,
            you’ve found the right partner.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-12">
          <div className="rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/10 via-white to-helix-gold/10 p-8 dark:from-brand/15 dark:via-helix-bg dark:to-helix-gold/10 sm:p-10">
            <p className="font-display text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">
              Ready to Get Your Unfair Advantage?
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand px-8 py-4 text-base font-semibold text-helix-bg shadow-lg shadow-brand/35 transition hover:brightness-110"
            >
              Book Your Free Strategy Session
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
