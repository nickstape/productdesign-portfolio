"use client";

import type { ReactNode } from "react";

/**
 * One screen (≥ 834px): Home and the 404 ONLY. The page is exactly one viewport tall with no
 * scrolling. The shell is 100dvh and clips; main is a flex column whose page root takes what's
 * left between the top bar (834–1193) and the footer, and centres its contents vertically.
 * Below 834px the pages scroll as normal. Every other page uses normal document flow.
 *
 * Why a component and not globals.css: Next keeps visited pages mounted but hidden (React
 * <Activity>, cacheComponents), so a global rule keyed on Home's markup keeps matching on the
 * next page (e.g. /work/ndd cut off at one screen, with Home's wordmark on top). This stylesheet
 * is on only while its page is visible: the ref callback's cleanup disables it when Activity
 * hides the page. Same pattern as <CasePageStyles>; see
 * node_modules/next/dist/docs/01-app/02-guides/preserving-ui-state.md ("Global styles").
 *
 * Footer, bottom up (Figma Home 1440 × 820: cut edge ≈ 725, footer text ≈ 773): 32px padding,
 * the 24px footer row, 40px up to the wordmark's cut edge (with the consent line open: 8px, the
 * 44px line, 8px). The wordmark is always fit to the width. Its band's top 0.3955em is empty
 * leading, pulled up under main so main ends at the top of the letters.
 *
 * Home's content block sits at least 114px from the top of the page (the 90px logo row + 24) and
 * 40px above the letters. Spare height goes 2/3 above the block and 1/3 below it (Figma
 * 1440 × 820 → 1440 × 1024). If it doesn't fit (Home, src/app/page.tsx), all its gaps
 * scale down together first (to 0.6×, --gs), then the portrait shrinks (124 → 93 tall, --pf),
 * then the intro line hides under 680px tall, and only then does the wordmark's cut edge rise:
 * its visible height drops from 63% of the line box (0.9765em) towards 48% (0.744em). Its width
 * never changes and the letters never move.
 * --os-a-max / --os-a1 / --os-a2: heights of the space left for the block (inside those
 * minimums) where the gaps start to scale, where they reach 0.6× and where the portrait
 * reaches its minimum: the block's height at each point.
 * --os-pt: the content area's top padding (114px from the top of the page).
 * --os-min: main's smallest height (--os-pt + --os-a2 + 40); below it the cut edge rises.
 */
const ONE_SCREEN_CSS = `
@media (min-width: 52.125rem) {
  :root {
    --os-header: 60px;
    /* Block: kicker 18.2 + H1 30 + intro 23.8 + reading 54, gaps 10 + 24 + 24 + 46, portrait 124. */
    --os-a-max: 354px;
    --os-a1: 312.4px;
    --os-a2: 281.4px;
    /* The tablet top bar is 60px; the content area adds 54 to reach 114. */
    --os-pt: 54px;
    --os-min: calc(var(--os-pt) + var(--os-a2) + 40px);
  }

  div:has(> #main) {
    height: 100dvh;
    min-height: 0;
    overflow: hidden;
  }

  #main {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  #main ~ footer {
    --os-below: 96px;
    --wordmark-mt: -0.3955em;
    --wordmark-h: clamp(
      0.744em,
      calc(100dvh - var(--os-header) - var(--os-below) - var(--os-min) + 0.3955em),
      0.9765em
    );
    margin-top: 0;
    padding-bottom: 32px;
  }

  #main ~ footer:has([data-consent]) {
    --os-below: 116px;
  }

  #main ~ footer [data-consent] {
    margin-top: 8px;
  }

  #main ~ footer [data-analytics-location] {
    height: calc(24px * var(--text-scale));
    margin-top: 40px;
  }

  #main ~ footer [data-consent] + [data-analytics-location] {
    margin-top: 8px;
  }
}

/* Under 680px tall the intro line and its 24px gap are gone. */
@media (min-width: 52.125rem) and (height < 680px) {
  :root {
    --os-a-max: 306.2px;
    --os-a1: 274.2px;
    --os-a2: 243.2px;
  }
}

@media (min-width: 74.625rem) {
  :root {
    --os-header: 0px;
    --os-pt: 114px;
  }
}
`;

/** Home (< 834px): Figma "Mobile — Home" puts the footer 56px under the reading row. */
const HOME_MOBILE_CSS = `
@media (width < 52.125rem) {
  #main ~ footer {
    margin-top: 56px;
  }
}
`;

export function OneScreenLayout({
  home = false,
  className,
  children,
}: {
  /** Home only: the < 834px footer spacing. */
  home?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div data-home={home || undefined} data-one-screen className={className}>
      <style
        ref={(style) => {
          if (style) style.media = "";
          return () => {
            if (style) style.media = "not all";
          };
        }}
      >
        {home ? ONE_SCREEN_CSS + HOME_MOBILE_CSS : ONE_SCREEN_CSS}
      </style>
      {children}
    </div>
  );
}
