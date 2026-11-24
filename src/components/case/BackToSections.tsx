"use client";

import type { MouseEvent } from "react";
import { SECTIONS_ANCHOR } from "./JumpTo";

/**
 * Mobile only (< 834): "↑ Back to sections" after the reflection. Scrolls back to the chip strip
 * (<JumpTo>), smoothly unless reduced motion, and moves focus to the current chip.
 * Without JS it's a plain link to the strip's anchor.
 */
export function BackToSections() {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const anchor = document.getElementById(SECTIONS_ANCHOR);
    if (!anchor) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    anchor.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    const nav = anchor.nextElementSibling;
    const chip = nav?.querySelector<HTMLElement>('[aria-current="location"]') ?? nav?.querySelector<HTMLElement>("a");
    chip?.focus({ preventScroll: true });
  };

  return (
    <a
      href={`#${SECTIONS_ANCHOR}`}
      onClick={onClick}
      className="relative touch-target mt-6 block w-fit font-mono text-meta text-accent hover:underline hover:underline-offset-4 tablet:hidden"
    >
      <span aria-hidden="true">↑ </span>Back to sections
    </a>
  );
}
