import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export function FinalCtaSection() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden border-t border-slate-200 py-20 dark:border-helix-border sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950 via-[#0A1128] to-slate-950"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(0,242,255,0.12),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-bold text-white sm:text-5xl">
            Your Move. Your Advantage.
          </h2>
          <div className="mx-auto mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-slate-300">
            <p>
              Your competitors aren’t waiting. While they’re stuck with slow agencies and
              mediocre results, you can have the premium digital infrastructure and elite
              talent that turns your business into an unstoppable force.
            </p>
            <p className="font-medium text-white">
              Stop leaving money on the table. Stop settling for average.
              <br />
              It’s time to dominate.
            </p>
          </div>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-bold text-helix-bg shadow-[0_0_40px_rgba(0,242,255,0.25)] transition hover:bg-slate-100"
          >
            Claim Your FREE Growth Strategy Session Before Spots Fill Up
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
