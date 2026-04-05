"use client";

import { useEffect, useState, type RefObject } from "react";

type Options = {
  once?: boolean;
  /** 0–1: fire when this fraction of the element is visible (default 0.2). */
  amount?: number;
  rootMargin?: string;
};

/**
 * Lightweight IntersectionObserver helper (replaces framer-motion useInView for stats/sections).
 */
export function useInView(
  ref: RefObject<Element | null>,
  { once = false, amount = 0.2, rootMargin = "0px" }: Options = {}
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const thr = Math.min(1, Math.max(0, amount));
    const thresholds =
      thr <= 0
        ? [0]
        : thr >= 1
          ? [1]
          : [0, thr - 0.001, thr, Math.min(1, thr + 0.001), 1];

    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        const hit =
          thr <= 0
            ? e.isIntersecting
            : e.isIntersecting && e.intersectionRatio >= thr - 0.001;
        if (hit) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { root: null, rootMargin, threshold: thresholds }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, once, amount, rootMargin]);

  return inView;
}
