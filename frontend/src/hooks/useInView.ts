"use client";

import { useEffect, useState, type RefObject } from "react";

type Options = {
  once?: boolean;
  /** 0–1: fraction of the element that must be visible (default 0.2). Use 0 for any intersection. */
  amount?: number;
  rootMargin?: string;
};

/** Multiple ratios so mobile Safari / Chrome fire callbacks reliably (single float threshold is flaky). */
function buildThresholds(thr: number): number[] {
  if (thr <= 0) return [0, 0.01, 1];
  if (thr >= 1) return [1];
  const raw = [0, thr * 0.5, thr, Math.min(1, thr + 0.01), 1];
  return [...new Set(raw)].sort((a, b) => a - b);
}

/**
 * IntersectionObserver helper. Uses a threshold *array* — required for consistent mobile behavior.
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
    const threshold = buildThresholds(thr);

    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        if (e.isIntersecting) {
          if (thr <= 0 || e.intersectionRatio >= thr) {
            setInView(true);
            if (once) obs.disconnect();
          }
        } else if (!once) {
          setInView(false);
        }
      },
      { root: null, rootMargin, threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, once, amount, rootMargin]);

  return inView;
}
