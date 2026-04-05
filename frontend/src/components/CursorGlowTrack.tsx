"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function CursorGlowTrack({ children, className = "", id }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const [on, setOn] = useState(false);
  const [pos, setPos] = useState({ x: -80, y: 80 });

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div
      ref={ref}
      id={id}
      className={`relative ${className}`}
      onMouseMove={move}
      onMouseEnter={() => {
        if (!reduce) setOn(true);
      }}
      onMouseLeave={() => {
        setOn(false);
        setPos({ x: -80, y: 80 });
      }}
    >
      {!reduce ? (
        <div
          className="pointer-events-none absolute z-0 h-[4.5rem] w-[4.5rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.35)_0%,rgba(0,242,255,0.08)_55%,transparent_72%)] blur-md transition-opacity duration-200 dark:bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.42)_0%,rgba(212,175,55,0.12)_55%,transparent_72%)]"
          aria-hidden
          style={{
            left: pos.x,
            top: pos.y,
            transform: "translate(-50%, -50%)",
            opacity: on ? 1 : 0,
          }}
        />
      ) : null}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
