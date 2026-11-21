"use client";

import { useEffect, useState } from "react";

/** Sticky chrome above sections, from the --case-scroll-offset token (globals.css). */
function scrollOffset() {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--case-scroll-offset");
  return parseFloat(v) || 0;
}

/**
 * The id of the section in view: the last one whose top has passed the sticky chrome (plus a
 * little slack). An IntersectionObserver on every section triggers the check, so it runs only
 * when a section crosses the viewport, not on every scroll frame.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);
  const key = ids.join(",");

  useEffect(() => {
    const list = key ? key.split(",") : [];
    const update = () => {
      const line = scrollOffset() + 80;
      let current: string | null = list[0] ?? null;
      for (const id of list) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // At the very bottom the last sections can't reach the line; count the last one as in view.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && list.length) current = list[list.length - 1];
      setActive(current);
    };
    // The observer reports every target once on observe(), which sets the initial state.
    const observer = new IntersectionObserver(update, {
      threshold: [0, 1],
      rootMargin: "0px 0px -40% 0px",
    });
    list.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [key]);

  return [active, setActive] as const;
}

/** Smooth-scroll to a section (instant with reduced motion), update the hash, move focus. */
export function goToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
  el.focus({ preventScroll: true });
}
