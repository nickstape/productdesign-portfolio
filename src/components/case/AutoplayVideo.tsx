"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Plays the muted, looping <video> rendered by <ContentImage> while it's on screen, and pauses
 * it off screen. With reduced motion it stays on its first frame.
 */
export function AutoplayVideo({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = ref.current?.querySelector("video");
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let visible = false;
    const sync = () => {
      if (visible && !motion.matches) video.play().catch(() => {});
      else video.pause();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(video);
    motion.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", sync);
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
