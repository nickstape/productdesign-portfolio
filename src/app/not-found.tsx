import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { ConsentBar } from "@/components/ConsentBar";
import { FooterRow } from "@/components/Footer";
import { NotFoundStyles } from "@/components/not-found/NotFoundStyles";
import { OneScreenLayout } from "@/components/OneScreenLayout";
import { Polaroid } from "@/components/not-found/Polaroid";
import { StickyNote } from "@/components/not-found/StickyNote";
import { images, type Img } from "@/content/images";

/** No `robots` here: Next injects <meta name="robots" content="noindex"> on every 404 itself,
 *  and setting it too prints the tag twice. */
export const metadata: Metadata = {
  title: { absolute: "Page not found — Mary Fisher" },
};

/*
 * 404 — Figma "404" (3451:1109, 1440 × 820), "404 — 1194" (3434:1133), "404 — 834" (3434:1168)
 * and "404 — 390 v2" (3464:1201). Root not-found: unmatched URLs get a real 404 status.
 *
 * Layout: a content area, then the consent line (while it's open), then the footer row, all in
 * the flow. ≥ 834px the page is exactly one viewport tall with no scroll (<OneScreenLayout>)
 * and the content area takes what's left; below 834 the page scrolls as normal.
 *
 * Every element in the content area is absolutely placed from the frames. Each sets its position
 * per breakpoint through CSS variables: --m-* (< 834, px from the 390 frame, main-relative so
 * minus the 60px header), --t-* (834–1193, % of the 834 frame across, px down × --ts) and --d-*
 * (≥ 1194). Desktop values interpolate linearly from the 1194 frame to the 1440 frame and hold
 * above it.
 * Short screens: the content area is a size container, and the layout shrinks to fit its height
 * (100cqh). Tablet: --ts scales the tops and the headline (the frame's content is 1080px tall with its margins).
 * Desktop: the whole 820px frame scales by --ds, centred in the content area.
 * Polaroid positions are their Figma card centres, so the card sits centred in its 150 × 196 box.
 */

const D0 = 1194;
const D1 = 1440;

/** Desktop: `a` at 1194px wide, `b` at 1440px, linear in between, held outside. */
function lerp(a: number, b: number): string {
  if (a === b) return `${a}px`;
  const slope = ((b - a) / (D1 - D0)).toFixed(5);
  return `clamp(${Math.min(a, b)}px, calc(${a}px + ${slope} * (100vw - ${D0}px)), ${Math.max(a, b)}px)`;
}

/** Tablet: x on the 834 frame as a share of the width. */
const tx = (x: number) => `${((x / 834) * 100).toFixed(3)}%`;
/** Mobile: x on the 390 frame as a share of the width. */
const mx = (x: number) => `${((x / 390) * 100).toFixed(3)}%`;

type Place = { m?: [string, number]; t: [string, number]; d: [string, string] };

function vars({ m, t, d }: Place, extra: Record<string, string> = {}): CSSProperties {
  return {
    ...(m && { "--m-l": m[0], "--m-t": `${m[1]}px` }),
    "--t-l": t[0],
    "--t-t": `calc(${t[1]}px * var(--ts))`,
    "--d-l": d[0],
    "--d-t": d[1],
    ...extra,
  } as CSSProperties;
}

const PLACED =
  "absolute left-(--m-l) top-(--m-t) tablet:left-(--t-l) tablet:top-(--t-t) desktop:left-(--d-l) desktop:top-(--d-t)";

type Shot = { img: Img; caption: string; tilt: number; place: Place };

/** Order is the entrance order. "me" and "ran" are hidden below 834px. */
const shots: Shot[] = [
  {
    img: images.gallery01,
    caption: "me, searching for this page",
    tilt: 8,
    place: { t: [tx(34.7), 97.7], d: [lerp(82.7, 333.7), lerp(15.7, 57.7)] },
  },
  {
    img: images.gallery05,
    caption: "graduated. still can’t find this URL",
    tilt: -6,
    place: { m: [mx(223.1), 95.3], t: [tx(629.1), 91.3], d: [lerp(919.1, 1250.1), lerp(61.3, 81.3)] },
  },
  {
    img: images.gallery04,
    caption: "us when the page finally loads",
    tilt: -5,
    place: { m: [mx(56.7), 62.6], t: [tx(87.7), 792.6], d: [lerp(157.7, 306.7), lerp(522.6, 389.6)] },
  },
  {
    img: images.gallery09,
    caption: "ran 10k. this page ran further",
    tilt: 6,
    place: { t: [tx(590.1), 775.7], d: [lerp(890.1, 992.1), lerp(505.7, 330.7)] },
  },
];

const STAGGER_MS = 60;

export default function NotFound() {
  return (
    <OneScreenLayout className="-mr-(--page-right) -ml-(--page-left) flex min-h-[max(calc(100svh-60px),680px)] flex-col overflow-x-clip tablet:min-h-0 tablet:flex-1">
      <NotFoundStyles />

      {/* Content area. A size container ≥ 834px, so the layout can fit its height. */}
      <div
        className="relative min-h-[580px] flex-1 tablet:min-h-0 tablet:[container-type:size]"
        style={
          {
            /* Tablet height scale, and the headline size (it also places the sticky note). */
            "--ts": "min(1, tan(atan2(100cqh, 1080px)))",
            "--h1-t": "calc(clamp(104px, 12.47vw, 120px) * var(--ts))",
            /* Desktop: the 820px frame's scale. */
            "--ds": "min(1, tan(atan2(100cqh, 820px)))",
          } as CSSProperties
        }
      >
      {/* Canvas: the full stage below 1194; ≥ 1194 a 1194–1440 wide, 820 tall frame, centred
          both ways and scaled down to fit short screens. */}
      <div className="absolute inset-0 desktop:right-auto desktop:bottom-auto desktop:top-1/2 desktop:left-1/2 desktop:h-[820px] desktop:w-[clamp(1194px,100vw,1440px)] desktop:[transform:translate(-50%,-50%)_scale(var(--ds))]">
        <p
          className={`${PLACED} font-mono text-meta text-muted tablet:-translate-x-1/2 tablet:text-label`}
          style={vars({ m: ["20px", 258], t: ["50%", 285], d: [lerp(597, 720), lerp(177, 188)] })}
        >
          .404
        </p>

        <h1
          className={`${PLACED} w-(--m-w) font-wordmark text-[54px] [font-variation-settings:'SOFT'_0,'WONK'_1] leading-none font-normal tracking-[-0.03em] text-text tablet:w-(--t-w) tablet:-translate-x-1/2 tablet:text-center tablet:text-(length:--h1-t) tablet:leading-[0.95] desktop:w-(--d-w) desktop:text-(length:--d-fs)`}
          style={vars(
            { m: ["20px", 282], t: ["50%", 326], d: [lerp(597, 743), lerp(218, 202)] },
            {
              "--m-w": "min(330px, 100% - 40px)",
              "--t-w": "min(84vw, 930px)",
              "--d-w": lerp(930, 1120),
              "--d-fs": lerp(124, 150),
            },
          )}
        >
          {/* Line breaks: mobile wraps on its own (This page is / on a side / quest.);
              tablet "This page is on a / side quest."; desktop "This page is on a side / quest." */}
          This page is on a <br className="hidden tablet:inline desktop:hidden" />
          side <br className="hidden desktop:inline" />
          quest.
        </h1>

        {shots.map((s, i) => (
          <Polaroid
            key={s.img.src}
            photo={s.img}
            caption={s.caption}
            tilt={s.tilt}
            className={`${PLACED} ${s.place.m ? "" : "hidden tablet:block"} motion-safe:animate-drop-in`}
            style={{ ...vars(s.place), animationDelay: `${i * STAGGER_MS}ms` }}
          />
        ))}

        <StickyNote
          links={[
            { label: "← Back home", href: "/" },
            { label: "Read NIBSS Direct Debit →", href: "/work/ndd" },
            { label: "Read TNS →", href: "/work/tns", tabletUp: true },
          ]}
          className={`${PLACED} [--note-tilt:-11.58deg] tablet:[--note-tilt:3deg] motion-safe:animate-drop-in`}
          style={{
            ...vars({
              m: [`calc(${mx(205.1)} - 108.5px)`, 428.4],
              t: [`calc(${tx(412.8)} - 115px)`, 0],
              d: [lerp(484.9, 673.9), lerp(455.9, 464.9)],
            }),
            /* Tablet: 36px under the two-line headline, as in the 834 frame. */
            "--t-t": "calc((326px + 38px) * var(--ts) + 1.9 * var(--h1-t))",
            animationDelay: `${shots.length * STAGGER_MS}ms`,
          } as CSSProperties}
        />
      </div>
      </div>

      {/* Consent line and footer row (the shell footer is hidden on this page), in the flow
          under the content area. Right insets keep the links clear of the Chatbase bubble
          (55px, 16px from the edge), as in the shell footer. */}
      <ConsentBar className="pr-9 pl-[20px] tablet:pr-[88px] tablet:pl-6 desktop:pr-[144px] desktop:pl-(--content-left)" />
      <FooterRow
        compact
        location="404"
        className="flex items-baseline justify-between gap-x-3 pt-1 pr-9 pb-[36px] pl-[20px] tablet:pr-[88px] tablet:pb-5 tablet:pl-6 desktop:pr-[144px] desktop:pl-(--content-left)"
      />
    </OneScreenLayout>
  );
}
