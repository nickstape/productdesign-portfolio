"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FocusEvent, type PointerEvent, type ReactNode } from "react";
import type { SelectedWork } from "@/content/home-mobile";

type Props = {
  work: SelectedWork;
  n: number;
  /** The rendered peek media (<ContentImage frame={false}>), built on the server. */
  peek: ReactNode;
};

/** Matches the mobile CurrentlyReading row (Figma 17/25). */
const ROW_TEXT = "font-sans text-[17px] leading-[25px]";

/**
 * Figma "Mobile / Project row — …" (Default / Pressed). One selected-work row on the mobile home.
 * The inline link's ::after covers the whole row (stretched link), so the row is one tap target
 * without nesting links.
 *
 * Peek shows on hover (hover-capable devices only), keyboard focus, or while pressed.
 */
export function WorkRow({ work, n, peek }: Props) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pressed, setPressed] = useState(false);
  const shown = hovered || focused || pressed;

  const onPointerEnter = (e: PointerEvent) => {
    if (e.pointerType === "mouse" && window.matchMedia("(hover: hover)").matches) setHovered(true);
  };
  const onPointerLeave = () => {
    setHovered(false);
    setPressed(false);
  };
  // Keyboard focus only: a tap can also focus the link, which would leave the peek stuck open.
  const onFocus = (e: FocusEvent) => setFocused(e.target.matches(":focus-visible"));

  const { link } = work;
  const linkClass = "text-accent underline after:absolute after:inset-0 after:content-['']";

  let name: ReactNode;
  if (!link.href) {
    name = (
      <span aria-disabled="true" className="cursor-default text-accent underline">
        {link.label}
      </span>
    );
  } else if (link.external) {
    name = (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {link.label}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  } else {
    name = (
      <Link href={link.href} className={linkClass}>
        {link.label}
      </Link>
    );
  }

  return (
    <li
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      // Held from touch/press down until the tap completes; a scroll gesture cancels it.
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      onFocus={onFocus}
      onBlur={() => setFocused(false)}
      className="relative flex min-h-11 items-baseline gap-[14px] py-1.5"
    >
      <span aria-hidden="true" className="shrink-0 font-mono text-meta text-muted">
        {String(n).padStart(2, "0")}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className={`${ROW_TEXT} text-text`}>
          {work.before}
          {name}
          {work.after}
        </p>
        <p className="font-mono text-[11px] leading-[15px] text-muted">{work.meta}</p>
      </div>
      <span aria-hidden="true" className="shrink-0 font-sans text-[18px] leading-[25px] text-accent">
        →
      </span>
      <Peek shown={shown} pressed={pressed}>
        {peek}
      </Peek>
    </li>
  );
}

/**
 * 92 × 65 card floating over the row's top-right corner (Figma: x 254 in a 350 row, y −51).
 * Absolutely positioned, so it never moves the layout. Reduced motion: fade only.
 *
 * Media sits in a fixed 84 × 57 mat, so an image or a video fits without layout changes.
 * - Image: a next/image still.
 * - Video WITHOUT a poster (today's tag previews): a still of its first frame, never played.
 * - Video WITH a poster (a real peek video, later: give the manifest entry src + poster):
 *   plays only while the peek is visible; reduced motion keeps the poster.
 */
function Peek({ shown, pressed, children }: { shown: boolean; pressed: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  // Stills: nudge a poster-less video onto its first frame (Safari leaves it blank otherwise).
  useEffect(() => {
    const video = ref.current?.querySelector("video");
    if (!video || video.poster) return;
    const showFirstFrame = () => {
      if (video.currentTime === 0) video.currentTime = 0.001;
    };
    if (video.readyState >= 1) showFirstFrame();
    else video.addEventListener("loadedmetadata", showFirstFrame, { once: true });
    return () => video.removeEventListener("loadedmetadata", showFirstFrame);
  }, []);

  // Videos with a poster play only while the peek is visible.
  useEffect(() => {
    const video = ref.current?.querySelector("video");
    if (!video?.poster) return;
    if (shown && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [shown]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute top-[-51px] right-0.5 z-10 h-[65px] w-[92px] rounded-[8px] border border-[#333] bg-surface p-[3px] shadow-[0_10px_20px_rgb(0_0_0/0.55)] transition-[opacity,translate,rotate] ease-out motion-reduce:transition-opacity ${
        pressed ? "duration-[220ms]" : "duration-200"
      } ${shown ? "opacity-100 motion-safe:-translate-y-3 motion-safe:rotate-4" : "opacity-0"}`}
    >
      <div className="h-[57px] w-[84px] overflow-hidden rounded-[5px] bg-[#e8edeb]">{children}</div>
    </div>
  );
}
