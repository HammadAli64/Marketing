"use client";

import { CursorGlowTrack } from "@/components/CursorGlowTrack";
import type { CmsTestimonial } from "@/lib/cms";

function Stars({ count }: { count: number }) {
  const n = Math.min(5, Math.max(0, Math.round(count)));
  return (
    <div
      className="flex gap-0.5 text-base leading-none"
      role="img"
      aria-label={`${n} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={
            i < n ? "text-brand" : "text-slate-200 dark:text-slate-700"
          }
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: CmsTestimonial }) {
  return (
    <article className="relative w-[min(100vw-2rem,20rem)] shrink-0 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm backdrop-blur-sm dark:border-helix-border dark:bg-helix-elevated/95 sm:w-[20rem] sm:p-6">
      <Stars count={t.stars} />
      <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
        &ldquo;{t.quote}&rdquo;
      </p>
      <footer className="mt-5 border-t border-slate-100 pt-4 dark:border-white/10">
        <p className="font-display text-base font-semibold text-helix-heading dark:text-white">
          {t.client_name}
        </p>
        {t.role_title ? (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {t.role_title}
          </p>
        ) : null}
      </footer>
    </article>
  );
}

function MarqueeRow({ items }: { items: CmsTestimonial[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="group/marquee relative overflow-hidden py-2">
      <div className="flex w-max gap-4 animate-marquee motion-reduce:animate-none group-hover/marquee:[animation-play-state:paused]">
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

type TestimonialsSectionProps = {
  items: CmsTestimonial[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

export function TestimonialsSection({
  items,
  eyebrow = "Testimonials",
  title = "Don’t Take Our Word For It",
  subtitle = "Real clients. Real outcomes — one row, infinite scroll. Hover to pause.",
}: TestimonialsSectionProps) {
  if (items.length === 0) return null;

  return (
    <CursorGlowTrack
      id="testimonials"
      className="border-t border-slate-200 bg-slate-50/80 py-16 dark:border-helix-border dark:bg-helix-surface/80 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-helix-heading dark:text-white sm:text-5xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
          {subtitle}
        </p>
      </div>

      <div className="mt-10">
        <MarqueeRow items={items} />
      </div>
    </CursorGlowTrack>
  );
}
