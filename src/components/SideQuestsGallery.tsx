"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

type Props = {
  /** Captions, same order as `slides`. */
  captions: string[];
  /** One rendered <ContentImage> per item. Built on the server (ContentImage reads the file system). */
  slides: ReactNode[];
  /** Desktop display heights in px, same order. */
  heights: number[];
  /** Intrinsic width / height of each photo, same order: reserves its width before it loads. */
  ratios: number[];
};

/** Fade width at each edge (desktop), shown only when there's more content that way. */
const FADE_LEFT = "110px";
const FADE_RIGHT = "160px";
/** Pointer travel before a mouse press counts as a drag. */
const DRAG_THRESHOLD = 4;

/**
 * ".side quests gallery" on /about.
 * ≥ 834px — Figma "About — 1194" (3407:1788): a filmstrip from the content column to the right
 *   edge of the viewport. Mixed heights on one baseline, no snap. Trackpad, shift+wheel (native),
 *   mouse drag and arrow keys. Edge fades only where more content is hidden.
 * < 834px — Figma "Mobile — About" (24 Nov): one 295 × 371 slide per view, mandatory snap,
 *   the next slide peeking in, "01 / 10" counter. "Swipe →" sits in the page's heading row.
 */
export function SideQuestsGallery({ captions, slides, heights, ratios }: Props) {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [edges, setEdges] = useState({ left: false, right: false });
  const drag = useRef<{ id: number; x: number; scroll: number; moved: boolean } | null>(null);
  const [dragging, setDragging] = useState(false);

  /** Scroll position of each item's start, allowing for the scroller's scroll-padding. */
  const targets = useCallback(() => {
    const el = scroller.current;
    if (!el) return [];
    const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
    const track = el.firstElementChild;
    if (!track) return [];
    return Array.from(track.children, (item) => (item as HTMLElement).offsetLeft - pad);
  }, []);

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const x = el.scrollLeft;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ left: x > 1, right: x < max - 1 });

    const t = targets();
    // At the far end the last items can't reach their start, so the last one wins there.
    let nearest = x >= max - 1 ? t.length - 1 : 0;
    if (x < max - 1) {
      t.forEach((pos, i) => {
        if (Math.abs(pos - x) < Math.abs(t[nearest] - x)) nearest = i;
      });
    }
    setActive(nearest);
  }, [targets]);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    update();
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    // Shift + vertical wheel → horizontal. macOS already sends these as deltaX (left alone here);
    // other platforms and some mice don't. Lets the page scroll once the strip hits an end.
    const onWheel = (e: WheelEvent) => {
      if (!e.shiftKey || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = el.scrollWidth - el.clientWidth;
      if ((e.deltaY < 0 && el.scrollLeft <= 0) || (e.deltaY > 0 && el.scrollLeft >= max - 1)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: false });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", onWheel);
      ro.disconnect();
    };
  }, [update]);

  const scrollToX = (left: number) => {
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scroller.current?.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const el = scroller.current;
    if (!el) return;
    const x = el.scrollLeft;
    const t = targets();
    let next: number | undefined;
    if (e.key === "ArrowRight") next = t.find((pos) => pos > x + 2);
    else if (e.key === "ArrowLeft") next = [...t].reverse().find((pos) => pos < x - 2);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = el.scrollWidth;
    else return;
    e.preventDefault();
    if (next !== undefined) scrollToX(Math.max(0, next));
  };

  // Mouse drag only: touch and pen already scroll natively (and snap on mobile).
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !scroller.current) return;
    drag.current = { id: e.pointerId, x: e.clientX, scroll: scroller.current.scrollLeft, moved: false };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = scroller.current;
    if (!d || !el || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) < DRAG_THRESHOLD) return;
    if (!d.moved) {
      d.moved = true;
      el.setPointerCapture(e.pointerId);
      setDragging(true);
    }
    el.scrollLeft = d.scroll - dx;
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    if (scroller.current?.hasPointerCapture(e.pointerId)) scroller.current.releasePointerCapture(e.pointerId);
    drag.current = null;
    setDragging(false);
  };

  const fades = {
    "--fade-l": edges.left ? FADE_LEFT : "0px",
    "--fade-r": edges.right ? FADE_RIGHT : "0px",
  } as CSSProperties;

  const count = String(slides.length).padStart(2, "0");

  return (
    <div>
      {/* Bleeds out of main: full width below 834; to the viewport's right edge above
          (including the empty band beside the centred layout ≥ 1440, as in "About — 1920"). */}
      <div
        ref={scroller}
        role="region"
        aria-label="Side quests gallery"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDragStart={(e) => e.preventDefault()}
        style={fades}
        className={`relative -mx-2.5 snap-x snap-mandatory scroll-px-2.5 overflow-x-auto overscroll-x-contain [scrollbar-width:none] focus-visible:outline-offset-[-2px] tablet:-mr-(--page-right) tablet:ml-0 tablet:snap-none tablet:scroll-px-0 tablet:[mask-image:linear-gradient(to_right,transparent,black_var(--fade-l),black_calc(100%-var(--fade-r)),transparent)] [&::-webkit-scrollbar]:hidden ${
          dragging ? "cursor-grabbing select-none" : "tablet:cursor-grab"
        }`}
      >
        <ul className="flex w-max items-end gap-1.5 px-2.5 tablet:gap-[18px] tablet:pr-(--page-right) tablet:pl-0">
          {slides.map((slide, i) => (
            <li
              key={captions[i]}
              style={{ "--h": `${heights[i]}px`, "--ar": ratios[i] } as CSSProperties}
              className={`flex shrink-0 snap-start flex-col gap-1 transition-opacity duration-[280ms] ease-out motion-reduce:transition-none tablet:opacity-100 ${
                i === active ? "" : "opacity-40"
              }`}
            >
              <p className="font-sans text-nav whitespace-nowrap text-text tablet:text-label">
                <span aria-hidden="true">• </span>
                {captions[i]}
              </p>
              {/* Explicit size on the image (or its placeholder), cropped to fill:
                  mobile 295 × 371 (narrower on very small screens, so the next one still peeks);
                  ≥ 834 the display height × the manifest's width/height ratio. */}
              <div className="[--sw:min(295px,calc(100vw-80px))] [&>*]:h-[calc(var(--sw)*371/295)] [&>*]:w-[var(--sw)] [&>*]:object-cover [&_img]:pointer-events-none tablet:[&>*]:h-[var(--h)] tablet:[&>*]:w-[calc(var(--h)*var(--ar))]">
                {slide}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-2 font-mono text-label text-muted tablet:hidden">
        <span className="sr-only">Image </span>
        {String(active + 1).padStart(2, "0")} / {count}
      </p>
      <p aria-hidden="true" className="mt-3 hidden font-mono text-[calc(11px*var(--text-scale))] text-muted tablet:block">
        Drag or scroll →
      </p>
    </div>
  );
}
