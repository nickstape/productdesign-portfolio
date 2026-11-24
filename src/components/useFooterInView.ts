"use client";

import { useEffect, useState } from "react";

/**
 * True while the footer's "Mary Fisher" wordmark ([data-footer-wordmark], <Footer>) is on screen.
 * Fixed side navs (the case study TOC, the About sidebar) fade out then, so they never sit over
 * the wordmark. The wordmark is display: none below 834, so this stays false there.
 * `enabled` false: always false, and nothing is observed.
 */
export function useFooterInView(enabled = true) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const wordmark = document.querySelector("[data-footer-wordmark]");
    if (!wordmark) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(wordmark);
    return () => io.disconnect();
  }, [enabled]);

  return enabled && inView;
}

/** Classes for a fixed nav that fades out (200ms) while the wordmark is in view. */
export function footerFadeClass(hidden: boolean) {
  return `transition-opacity duration-200 ease-out ${hidden ? "pointer-events-none opacity-0" : "opacity-100"}`;
}
