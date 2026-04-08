import Link from "next/link";
import { Reveal } from "@/components/Reveal";

type Props = {
  intro?: string;
};

export function AboutHomeSection({ intro }: Props) {
  const paras = intro
    ?.split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (!paras?.length) return null;

  return (
    <section
      id="about"
      className="border-t border-slate-200 bg-slate-50 py-20 dark:border-helix-border dark:bg-helix-surface sm:py-28"
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            About us
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-helix-heading dark:text-white sm:text-5xl">
            Who we are
          </h2>
        </Reveal>
        <Reveal delay={0.06} className="mt-10 space-y-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          {paras.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>

        <Reveal delay={0.12} className="mt-12">
          <div className="rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/10 via-white to-helix-gold/10 p-8 dark:from-brand/15 dark:via-helix-bg dark:to-helix-gold/10 sm:p-10">
            <p className="font-display text-xl font-semibold text-helix-heading dark:text-white sm:text-2xl">
              Ready to talk?
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand px-8 py-4 text-base font-semibold text-helix-bg shadow-lg shadow-brand/35 transition hover:brightness-110"
            >
              Contact us
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
