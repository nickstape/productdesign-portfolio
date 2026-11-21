"use client";

import { animate } from "motion/react";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { INTRO_DESKTOP, INTRO_FLAG, INTRO_MIN_WIDTH, REDUCED_MOTION } from "./home-intro";

/** A tag's centre as % of the viewport (left, top) and its rotation in degrees (+ = clockwise). */
type Pose = [left: number, top: number, rotate: number];
type Poses = Record<string, [gather: Pose, swirl: Pose, release: Pose]>;

/** Figma "Home 1440 — Intro 1/2/3" (used from 1194px; 1194 and 1920 are within 1–2%). */
const DESKTOP_POSES: Poses = {
  Payments: [[50.3, 51.8, 34], [43.5, 61.4, 20], [40.3, 29.0, 42]],
  B2B: [[50.0, 51.5, 17], [38.2, 46.5, 12], [66.7, 36.3, 34]],
  "Design Systems": [[48.6, 48.6, 0], [48.7, 35.3, 4], [68.2, 64.2, 26]],
  "0 → 1 products": [[48.8, 44.3, -17], [60.8, 41.9, -4], [43.2, 73.7, 18]],
  Branding: [[50.2, 40.3, -34], [58.0, 55.2, -12], [26.8, 50.0, 10]],
};

/** 834–1193px (tablet portrait). */
const TABLET_POSES: Poses = {
  Payments: [[50.5, 51.2, 34], [43.0, 57.3, 20], [39.0, 36.6, 42]],
  B2B: [[50.0, 51.7, 17], [37.9, 47.7, 12], [65.8, 41.2, 34]],
  "Design Systems": [[47.7, 49.5, 0], [48.6, 40.5, 4], [67.6, 59.1, 26]],
  "0 → 1 products": [[48.0, 45.6, -17], [60.9, 44.6, -4], [42.7, 65.2, 18]],
  Branding: [[50.3, 42.7, -34], [58.1, 53.1, -12], [26.7, 49.9, 10]],
};

/**
 * Timeline, 1.5s: hold GATHER to 200ms · ease-in to SWIRL at 600 · linear to RELEASE at 950 ·
 * ease-out to FINAL at 1500 (the rest of Home fades in and the counter out in that last stretch).
 * Keyframes are [gather, gather-hold, swirl, release, final]; times ≈ [0, .13, .4, .63, 1].
 */
const DURATION = 1.5;
const TIMES = [0, 0.2, 0.6, 0.95, 1.5].map((t) => t / DURATION);
const EASE = ["linear", [0.42, 0, 1, 1], "linear", [0, 0, 0.58, 1]] as const;

/** Counter percentage at each keyframe. */
const PERCENT = [0, 0, 48, 100, 100];
/** --intro-fade at each keyframe: the rest of Home's opacity (the counter's is 1 − this). */
const FADE = [0, 0, 0, 0, 1];

/**
 * Value at timeline position `p` (0–4: keyframe index plus the eased progress into the next
 * segment, as Motion gives it). Every value moves along the same eased clock.
 */
function at(values: number[], p: number): number {
  const i = Math.min(Math.floor(p), values.length - 2);
  return values[i] + (values[i + 1] - values[i]) * (p - i);
}

type Controls = ReturnType<typeof animate>;

/** Pending clean-up after unmount; cancelled when React remounts straight away (Strict Mode). */
let leaving: ReturnType<typeof setTimeout> | undefined;

/**
 * One-time Home intro, ≥ 834px, first load of "/" in a browser session, motion allowed. The
 * inline script in layout.tsx decides before first paint and sets <html data-intro="pending">,
 * which (globals.css, "Home intro") hides everything but the counter. This component then
 * moves the five existing tags from GATHER through SWIRL and RELEASE to where they sit on Home
 * (measured, so the intro always ends exactly on the real layout), fades the rest of Home in
 * and sets the sessionStorage flag. Only transform and opacity change: Home's content is in
 * the HTML and laid out from the start, so nothing shifts when it ends.
 * Any click, tap, key press or resize skips straight to the end.
 *
 * Wraps the Home stage (which holds <ProjectTags>) so the fixed counter sits outside the
 * [data-enter] column and leaves its stagger alone.
 */
export function HomeIntro({ children }: { children: ReactNode }) {
  const counter = useRef<HTMLParagraphElement>(null);
  const percent = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    clearTimeout(leaving);
    const html = document.documentElement;
    if (!html.dataset.intro) return;
    // Off Home, nothing may stay hidden: clear the attribute once this has really unmounted.
    const leave = () => {
      leaving = setTimeout(() => {
        delete html.dataset.intro;
      });
    };
    if (html.dataset.intro === "done") return leave;

    const main = document.getElementById("main");
    const tags = Array.from(
      counter.current?.closest("[data-home]")?.querySelectorAll<HTMLElement>("[data-home-tags] > li") ?? [],
    );
    // Not const: stop() may run (early exit below) before the animation exists.
    let controls: Controls | undefined = undefined;
    let stopped = false;
    let done = false;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const onResize = () => {
      if (window.innerWidth !== width || window.innerHeight !== height) finish();
    };

    /** Stop and undo the inline styles, leaving <html data-intro> as it is. */
    const stop = () => {
      stopped = true;
      controls?.stop();
      tags.forEach((el) => (el.style.transform = ""));
      html.style.removeProperty("--intro-fade");
      window.removeEventListener("pointerdown", finish, true);
      window.removeEventListener("keydown", finish, true);
      window.removeEventListener("resize", onResize);
    };

    /** The end state: Home as it always is, tags interactive, flag set. Safe to call twice. */
    function finish() {
      if (done) return;
      done = true;
      stop();
      html.dataset.intro = "done";
      main?.removeAttribute("aria-busy");
      try {
        sessionStorage.setItem(INTRO_FLAG, "1");
      } catch {}
    }

    const cleanup = () => {
      stop();
      leaving = setTimeout(() => {
        finish();
        delete html.dataset.intro;
      });
    };

    if (!matchMedia(INTRO_MIN_WIDTH).matches || matchMedia(REDUCED_MOTION).matches || tags.length === 0) {
      finish();
      return leave;
    }

    // Measure each tag's final centre before anything moves, then offset it to the keyframes.
    const poses = matchMedia(INTRO_DESKTOP).matches ? DESKTOP_POSES : TABLET_POSES;
    const vw = html.clientWidth;
    const vh = html.clientHeight;
    const moves = tags.flatMap((el) => {
      const pose = poses[el.dataset.tag ?? ""];
      if (!pose) return [];
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const [gather, swirl, release] = pose.map(([left, top, rotate]) => ({
        x: (left / 100) * vw - cx,
        y: (top / 100) * vh - cy,
        rotate,
      }));
      const steps = [gather, gather, swirl, release, { x: 0, y: 0, rotate: 0 }];
      return [{ el, x: steps.map((s) => s.x), y: steps.map((s) => s.y), rotate: steps.map((s) => s.rotate) }];
    });

    // Draws position `p` (see at()). Transforms and one opacity variable only.
    const draw = (p: number) => {
      for (const m of moves) {
        m.el.style.transform = `translate(${at(m.x, p)}px, ${at(m.y, p)}px) rotate(${at(m.rotate, p)}deg)`;
      }
      if (percent.current) percent.current.textContent = `${String(Math.round(at(PERCENT, p))).padStart(2, "0")}%`;
      html.style.setProperty("--intro-fade", String(at(FADE, p)));
    };

    // GATHER before the next paint (Motion's first frame comes after it).
    draw(0);
    // One clock for everything: keyframes are the five poses' indices, with the spec's times and
    // per-segment easing, so the eased position between two keyframes drives every value.
    controls = animate(0, [0, 1, 2, 3, 4], {
      duration: DURATION,
      times: TIMES,
      ease: [...EASE],
      onUpdate: draw,
    });
    controls.finished.then(() => {
      if (!stopped) finish();
    });

    html.dataset.intro = "play";
    main?.setAttribute("aria-busy", "true");
    window.addEventListener("pointerdown", finish, true);
    window.addEventListener("keydown", finish, true);
    window.addEventListener("resize", onResize);

    return cleanup;
  }, []);

  return (
    <>
      {children}
      {/* Decorative; shown only while <html data-intro> is pending or playing (globals.css). */}
      <p
        ref={counter}
        aria-hidden="true"
        data-intro-counter
        className="pointer-events-none fixed top-[91%] left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 font-mono text-label whitespace-pre text-muted tabular-nums"
      >
        {".loading side quests  "}
        <span ref={percent}>00%</span>
      </p>
    </>
  );
}
