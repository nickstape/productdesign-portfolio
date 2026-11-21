"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Wraps a sample and prints the font-size / line-height the browser actually renders. */
export function LiveSize({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState("…");

  useEffect(() => {
    const el = ref.current?.firstElementChild;
    if (!el) return;
    const measure = () => {
      const cs = getComputedStyle(el);
      const fs = parseFloat(cs.fontSize);
      const lh = parseFloat(cs.lineHeight);
      setSize(`${round(fs)}px / ${round(lh / fs)}`);
    };
    const frame = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <div ref={ref}>{children}</div>
      <p className="font-mono text-meta text-accent">rendered {size}</p>
    </div>
  );
}

const round = (n: number) => Math.round(n * 100) / 100;
