"use client";

import Link from "next/link";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { TABLET_FRAMES, TAG_DISSOLVE, type HomeTag } from "@/content/home-tags";

/** px: `a` at viewport width w0, `b` at w1, linear in between (100% = the field = viewport width). */
function lerpPx(a: number, b: number, w0: number, w1: number): string {
  if (a === b) return `${a}px`;
  const slope = ((b - a) / (w1 - w0)).toFixed(5);
  return `calc(${a}px + ${slope} * (100% - ${w0}px))`;
}

/**
 * %: `a` at viewport width w0, `b` at w1, linear in between. tan(atan2(x, y)) = x / y turns the
 * length ratio into a plain number (CSS can't divide a length by a length directly).
 */
function lerpPct(a: number, b: number, w0: number, w1: number): string {
  if (a === b) return `${a}%`;
  const t = `clamp(0, tan(atan2(100vw - ${w0}px, ${w1 - w0}px)), 1)`;
  return `calc(${a}% + ${(b - a).toFixed(2)}% * ${t})`;
}

/**
 * --l-tablet / --t-tablet (834–1193, from one Figma frame to the next) and --l-desk / --t-desk
 * (≥ 1194), picked by the breakpoint classes on the <li>. Tops are % of the field, which covers
 * the Home content area.
 */
function placement({ tablet: p, desktop }: HomeTag): CSSProperties {
  const [w0, w1] = TABLET_FRAMES;
  return {
    "--l-tablet": lerpPx(p[0][0], p[1][0], w0, w1),
    "--t-tablet": lerpPct(p[0][1], p[1][1], w0, w1),
    "--l-desk": `${desktop.left}%`,
    "--t-desk": `${desktop.top}%`,
  } as CSSProperties;
}

/** Parallax: tags drift up to this many px against the pointer; alternate tags sit "deeper". */
const DRIFT = [3, 2] as const;
/** Desktop, mouse, motion allowed. */
const PARALLAX_QUERY =
  "(min-width: 74.625rem) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/**
 * Sets --drift-x / --drift-y (−1…1, the pointer's position from the viewport centre) on the
 * field, once per frame at most. Each tag turns them into a 2–3px translate, eased by CSS.
 */
function useParallax(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia(PARALLAX_QUERY);
    let frame = 0;
    let x = 0;
    let y = 0;
    const write = () => {
      frame = 0;
      el.style.setProperty("--drift-x", x.toFixed(3));
      el.style.setProperty("--drift-y", y.toFixed(3));
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = (e.clientX / window.innerWidth) * 2 - 1;
      y = (e.clientY / window.innerHeight) * 2 - 1;
      queue();
    };
    const recentre = () => {
      x = 0;
      y = 0;
      queue();
    };
    const sync = () => {
      if (mq.matches) {
        window.addEventListener("pointermove", onMove, { passive: true });
      } else {
        window.removeEventListener("pointermove", onMove);
        recentre();
      }
    };
    sync();
    mq.addEventListener("change", sync);
    document.documentElement.addEventListener("pointerleave", recentre);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      mq.removeEventListener("change", sync);
      document.documentElement.removeEventListener("pointerleave", recentre);
    };
  }, [ref]);
}

type Props = {
  tags: HomeTag[];
  /** One rendered <ContentImage> per tag, same order. Built on the server (ContentImage reads the file system). */
  previews: ReactNode[];
};

/**
 * Home page project tags, ≥ 834px (below that the home page is <MobileHome>, without tags):
 * positioned around the centre column with a hover/focus preview card, one open at a time.
 * Esc closes the open card however it was opened (WCAG 1.4.13). On desktop with a mouse the
 * tags drift 2–3px with the pointer.
 * The field is absolute over the whole content area (above the wordmark); open cards may hang
 * over the wordmark and stay on top of it.
 */
export function ProjectTags({ tags, previews }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const field = useRef<HTMLUListElement>(null);
  useParallax(field);

  // A card opened by hover has no focused control to take the key, so listen on the document.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    // data-home-tags / data-tag: hooks for <HomeIntro> and its styles in globals.css.
    <ul ref={field} aria-label="Projects" data-home-tags className="pointer-events-none absolute inset-0">

      {tags.map((tag, i) => (
        <Tag
          key={tag.label}
          tag={tag}
          depth={DRIFT[i % DRIFT.length]}
          preview={previews[i]}
          open={open === i}
          onOpen={() => setOpen(i)}
          onClose={() => setOpen((cur) => (cur === i ? null : cur))}
        />
      ))}
    </ul>
  );
}

type TagProps = {
  tag: HomeTag;
  /** Parallax drift in px at the viewport edge. */
  depth: number;
  preview: ReactNode;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

/** The card's left edge, from the tag's left edge (Figma). */
const CARD_X = 6;
const CARD_W = 280;
/** Half the extra width the 3° turn adds to the 280 × 236 card. */
const CARD_TURN = 6;

/**
 * Default: outlined chip with a green corner square. Open (hover or focus): green chip, dark
 * label, light square; the preview card rises 14px into place under it.
 */
function Tag({ tag, depth, preview, open, onOpen, onClose }: TagProps) {
  const captionId = useId();
  const item = useRef<HTMLLIElement>(null);
  const duration = { transitionDuration: `${tag.durationMs}ms` };

  // Where the card would run past the right edge of the field (narrower screens), pull it left
  // just enough. Offsets ignore transforms, so the intro and the parallax don't disturb this.
  useEffect(() => {
    const li = item.current;
    const field = li?.offsetParent as HTMLElement | null;
    if (!li || !field) return;
    const fit = () => {
      const over = li.offsetLeft + CARD_X + CARD_W + CARD_TURN - field.clientWidth;
      li.style.setProperty("--card-nudge", `${Math.min(0, -over)}px`);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(field);
    return () => ro.disconnect();
  }, []);

  const controlProps = {
    onFocus: onOpen,
    onBlur: onClose,
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    "aria-describedby": captionId,
    className: "relative block touch-target",
  };

  const chip = (
    <span
      style={duration}
      className={`relative block border px-[13px] py-[7px] font-sans text-nav whitespace-nowrap transition-colors ease-out ${
        open ? "border-accent bg-accent text-bg" : "border-text bg-bg text-text"
      }`}
    >
      <span
        aria-hidden="true"
        style={duration}
        className={`absolute -top-[5px] -left-[5px] size-[9px] transition-colors ease-out ${open ? "bg-text" : "bg-accent"}`}
      />
      {tag.label}
    </span>
  );

  const card = (
    <Preview
      preview={preview}
      caption={tag.caption}
      captionAccent={tag.captionAccent}
      captionId={captionId}
      arrow={Boolean(tag.href)}
      open={open}
      durationMs={tag.durationMs}
    />
  );

  return (
    <li
      ref={item}
      data-tag={tag.label}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      className={`pointer-events-auto absolute [translate:calc(var(--drift-x,0)*var(--depth))_calc(var(--drift-y,0)*var(--depth))] transition-[translate] duration-[600ms] ease-out left-(--l-tablet) top-(--t-tablet) desktop:left-(--l-desk) desktop:top-(--t-desk) ${
        open ? "z-20" : "z-10"
      }`}
      style={{ ...placement(tag), "--depth": `${-depth}px` } as CSSProperties}
    >
      {tag.href ? (
        <Link href={tag.href} transitionTypes={[TAG_DISSOLVE]} {...controlProps}>
          {chip}
          {card}
        </Link>
      ) : (
        <>
          <button
            type="button"
            aria-disabled="true"
            onClick={(e) => e.preventDefault()}
            {...controlProps}
            className="relative block cursor-default touch-target"
          >
            {chip}
          </button>
          {card}
        </>
      )}
    </li>
  );
}

type PreviewProps = {
  preview: ReactNode;
  caption: string;
  captionAccent?: string;
  captionId: string;
  arrow: boolean;
  open: boolean;
  durationMs: number;
};

/**
 * 280 × 236 card under the tag, 6px in from its left edge, turned 3° clockwise. The 18px top
 * padding is a hover bridge so the card stays open while the pointer moves onto it. Hidden from
 * assistive tech: the caption reaches screen readers through the control's aria-describedby.
 * Media sits in a fixed 264 × 180 mat, so an image or a muted looping video fits without
 * layout changes (a video plays only while the card is open).
 */
function Preview({ preview, caption, captionAccent, captionId, arrow, open, durationMs }: PreviewProps) {
  const ref = useRef<HTMLDivElement>(null);

  // A video preview plays only while its card is open, and not at all with reduced motion.
  useEffect(() => {
    const video = ref.current?.querySelector("video");
    if (!video) return;
    if (open && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [open]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`absolute top-full left-[calc(6px+var(--card-nudge,0px))] z-30 w-[280px] pt-[18px] ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div
        style={{ transitionDuration: `${durationMs}ms` }}
        className={`flex h-[236px] rotate-3 flex-col rounded-[10px] border border-text bg-surface p-1 shadow-[0_20px_40px_rgb(0_0_0/0.6)] transition-[opacity,translate,visibility] ease-out motion-reduce:transition-none ${
          open ? "visible translate-y-0 opacity-100" : "invisible translate-y-[14px] opacity-0"
        }`}
      >
        <div className="h-[180px] w-[264px] shrink-0 overflow-hidden rounded-[6px] bg-[#e8edeb]">{preview}</div>
        {/* One line, 12px in from the card's edge: a caption longer than the card truncates (the
            full text still reaches screen readers via aria-describedby). */}
        <div className="flex flex-1 items-center justify-between gap-1 px-0.5 font-mono text-[11px] leading-[1.4] whitespace-nowrap">
          <span id={captionId} className="min-w-0 truncate text-muted">
            {caption}
            {captionAccent && <span className="text-accent">{captionAccent}</span>}
          </span>
          {arrow && <span className="shrink-0 text-text">→</span>}
        </div>
      </div>
    </div>
  );
}
