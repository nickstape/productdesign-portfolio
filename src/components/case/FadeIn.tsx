"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades its content in (opacity only, 400ms) the first time it scrolls into view. The hidden
 * state and the transition live in globals.css ([data-fade]), gated on scripting and on
 * prefers-reduced-motion: no-preference, so without JS or with reduced motion it simply shows.
 */
export function FadeIn({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-fade data-shown={shown || undefined} className={className}>
      {children}
    </div>
  );
}
