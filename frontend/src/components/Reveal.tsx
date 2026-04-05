import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Kept for API compatibility; scroll animations removed so content is always visible (SSR-safe). */
  delay?: number;
  y?: number;
  animateOnMount?: boolean;
};

/**
 * Wrapper only — no opacity:0 on first paint (Framer whileInView/initial was leaving the home page
 * blank when hydration was delayed or the intersection observer never fired).
 */
export function Reveal({
  children,
  className,
}: RevealProps) {
  return <div className={className}>{children}</div>;
}
