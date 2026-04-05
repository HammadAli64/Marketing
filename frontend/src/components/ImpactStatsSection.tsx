"use client";

import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useEffect, useRef, useState } from "react";

const STATS = [
  {
    kind: "int" as const,
    target: 450,
    suffix: "%",
    label: "Average ROI on SEO campaigns",
  },
  {
    kind: "int" as const,
    target: 60,
    suffix: "+",
    label: "High-impact projects delivered in the last 24 months",
  },
  {
    kind: "float" as const,
    target: 3.2,
    decimals: 1,
    suffix: "x",
    label: "Faster time-to-market via staff augmentation",
  },
  {
    kind: "int" as const,
    target: 98,
    suffix: "%",
    label: "Client retention — because results speak louder than promises",
  },
] as const;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(
  target: number,
  durationMs: number,
  active: boolean,
  startDelayMs: number,
  reduceMotion: boolean,
  decimals: number
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    if (reduceMotion) {
      setValue(target);
      return;
    }

    let raf = 0;
    let delayTimer: ReturnType<typeof setTimeout>;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const t = Math.min(elapsed / durationMs, 1);
        const eased = easeOutCubic(t);
        const raw = eased * target;
        const rounded =
          decimals > 0
            ? Math.round(raw * Math.pow(10, decimals)) / Math.pow(10, decimals)
            : Math.round(raw);
        setValue(rounded);
        if (t < 1) {
          raf = requestAnimationFrame(tick);
        }
      };
      raf = requestAnimationFrame(tick);
    };

    delayTimer = setTimeout(run, startDelayMs);
    return () => {
      clearTimeout(delayTimer);
      cancelAnimationFrame(raf);
    };
  }, [active, target, durationMs, startDelayMs, reduceMotion, decimals]);

  return value;
}

function AnimatedFigure({
  stat,
  active,
  index,
  reduceMotion,
}: {
  stat: (typeof STATS)[number];
  active: boolean;
  index: number;
  reduceMotion: boolean;
}) {
  const decimals = stat.kind === "float" ? stat.decimals : 0;
  const n = useCountUp(stat.target, 2200, active, index * 140, reduceMotion, decimals);
  const display =
    stat.kind === "float" ? n.toFixed(stat.decimals) : String(Math.round(n));
  const suffix =
    stat.kind === "float" && stat.suffix === "x"
      ? "X"
      : stat.suffix;

  return (
    <span className="font-display text-3xl font-bold tabular-nums tracking-tight text-brand sm:text-4xl">
      {display}
      {suffix}
    </span>
  );
}

export function ImpactStatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
    rootMargin: "-8% 0px",
  });
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="border-y border-slate-200 bg-gradient-to-b from-[#070b14] via-[#0A1128] to-[#070b14] py-16 dark:border-white/10 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-brand">
                Our impact
              </span>
              <h2 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
                Numbers That Actually Matter
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-400">
                We don’t do average. Every project is engineered for explosive ROI. Businesses
                partner with us because we deliver the unfair advantage they need to crush
                competitors and scale faster than ever.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-lg shadow-black/20"
              >
                <div className="absolute right-5 top-5 flex gap-1" aria-hidden>
                  {[0, 1, 2].map((dot) => (
                    <span key={dot} className="h-1.5 w-1.5 rounded-full bg-brand" />
                  ))}
                </div>
                <p className="tabular-nums">
                  <AnimatedFigure
                    stat={s}
                    active={inView}
                    index={i}
                    reduceMotion={reduceMotion}
                  />
                </p>
                <p className="mt-3 text-base leading-snug text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
