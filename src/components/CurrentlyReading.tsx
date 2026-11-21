"use client";

import Image from "next/image";
import { useId, useState, type KeyboardEvent } from "react";
import { reading } from "@/content/reading";

/*
 * Figma "Hover / Currently reading" (3372:845) and the mobile row in "Mobile — Home" (3417:1025).
 * Colours below that have no token are the exact values from the spec/Figma.
 */
const CREAM = "bg-[#ede5d6]"; // book shape
const SPINE = "bg-[rgb(13_13_13/0.14)]";
const TRACK = "bg-[#333]";
const MOTION = "transition-[opacity,translate,rotate,visibility] duration-[280ms] ease-out motion-reduce:transition-none";
const NORMAL = "leading-[normal]"; // Figma "auto" line height

/**
 * ≥ 1194px: a strip (button) that opens a floating card above it on hover or keyboard focus.
 * Below that: the mobile row; tapping it (or the green ↓) expands the same card inline.
 * Data in src/content/reading.ts.
 */
export function CurrentlyReading() {
  const { title, author, page, totalPages, why, previously, cover } = reading;
  const [open, setOpen] = useState(false);
  const cardId = useId();
  const progress = `${Math.min(100, Math.max(0, (page / totalPages) * 100))}%`;

  const show = () => setOpen(true);
  const hide = () => setOpen(false);
  const onEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") hide();
  };

  const bar = (width: string) => (
    <span aria-hidden="true" className={`relative block h-[2px] shrink-0 ${width} ${TRACK}`}>
      <span className="absolute inset-y-0 left-0 bg-text" style={{ width: progress }} />
    </span>
  );

  return (
    <div className={`relative w-full desktop:w-auto ${open ? "z-40" : ""}`}>
      {/* Desktop strip */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls={cardId}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        onClick={show}
        onKeyDown={onEsc}
        className="hidden items-center gap-[14px] text-left desktop:flex"
      >
        <span aria-hidden="true" className="relative block h-[46px] w-[36px] shrink-0">
          <span
            className={`absolute top-[6px] left-[-1px] block h-[42px] w-[30px] overflow-hidden rounded-[2px] shadow-[0_4px_8px_rgb(0_0_0/0.5)] ${CREAM} ${MOTION} ${
              open
                ? "rotate-8 motion-safe:translate-x-px motion-safe:-translate-y-[2px] motion-safe:rotate-0"
                : "rotate-8"
            }`}
          >
            <span className={`absolute inset-y-0 left-0 w-[3px] ${SPINE}`} />
          </span>
        </span>
        <span className="flex flex-col gap-[4px]">
          <span className={`font-mono text-[11px] ${NORMAL} text-accent`}>Currently reading</span>
          <span className={`font-sans text-[15px] ${NORMAL} whitespace-nowrap text-text`}>
            {title} — {author}
          </span>
          <span className="flex items-center gap-1">
            {bar("w-[120px]")}
            <span className={`font-mono text-[10px] ${NORMAL} text-muted`}>
              p. {page} / {totalPages}
            </span>
          </span>
        </span>
      </button>

      {/* Mobile row */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls={cardId}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onEsc}
        className="flex w-full items-start gap-[14px] py-1.5 text-left desktop:hidden"
      >
        <span aria-hidden="true" className="relative block h-[40px] w-[28px] shrink-0">
          <span
            className={`absolute top-[5px] left-[-2px] block h-[38px] w-[26px] rotate-8 overflow-hidden rounded-[2px] shadow-[0_4px_8px_rgb(0_0_0/0.5)] ${CREAM}`}
          >
            <span className={`absolute inset-y-0 left-0 w-[3px] ${SPINE}`} />
          </span>
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="font-sans text-[17px] leading-[25px] text-text">
            Reading <span className="text-accent underline">{title}</span> by {author}
          </span>
          <span className="flex items-center gap-1">
            {bar("w-[110px]")}
            <span className="font-mono text-[11px] leading-[15px] text-muted">
              p. {page} / {totalPages}
            </span>
          </span>
        </span>
        <span
          aria-hidden="true"
          className={`flex h-[16px] w-[24px] shrink-0 items-center justify-center font-sans text-[18px] leading-[24px] text-accent ${MOTION} ${
            open ? "-rotate-90" : "rotate-90"
          }`}
        >
          →
        </span>
      </button>

      {/* Card: floats above the strip on desktop; inline below the row on mobile. */}
      <div
        id={cardId}
        className={`mt-1 flex w-full items-center gap-[20px] rounded-[14px] border border-[#333] bg-surface py-[20px] pr-[24px] pl-[20px] text-left shadow-[0_24px_48px_rgb(0_0_0/0.6)] desktop:pointer-events-none desktop:absolute desktop:bottom-[calc(100%+20px)] desktop:left-[-36px] desktop:mt-0 desktop:h-[202px] desktop:w-[346px] ${MOTION} ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible opacity-0 max-desktop:hidden motion-safe:translate-y-[14px]"
        }`}
      >
        <div className="relative h-[160px] w-[110px] shrink-0 overflow-hidden rounded-[2px]">
          <Image
            src={cover.src}
            alt={cover.alt}
            width={cover.width}
            height={cover.height}
            sizes="110px"
            className="size-full object-cover"
          />
          <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-[6px] ${SPINE}`} />
        </div>
        <div className="flex min-w-0 flex-col gap-[10px] desktop:w-[170px] desktop:shrink-0">
          <p
            className="font-wordmark text-[24px] leading-[26px] text-text italic"
            style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
          >
            {title}
          </p>
          <p className={`font-sans text-[13px] ${NORMAL} text-[#b8b8b5]`}>by {author}</p>
          <p className="font-sans text-[13px] leading-[19px] text-text">{why}</p>
          {previously.length > 0 && (
            <p className={`font-mono text-[10px] ${NORMAL} text-muted`}>
              Previously: {previously.join(" · ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
