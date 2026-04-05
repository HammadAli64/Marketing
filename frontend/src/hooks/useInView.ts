"use client";

import { useEffect, useState, type RefObject } from "react";

type Options = {
  once?: boolean;
  /** 0–1: fraction of the element that must be visible (default 0.2). Use 0 for any intersection. */
  amount?: number;
  rootMargin?: string;
};

/**
 * IntersectionObserver helper. Uses a single threshold (no brittle ratio edge cases).
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
    const threshold = thr <= 0 ? 0 : thr;

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
