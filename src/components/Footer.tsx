import { contact } from "@/content/site";
import { ConsentBar } from "./ConsentBar";
import { CookieSettings } from "./CookieSettings";
import { Label } from "./Label";
import { ReadingPreferences } from "./ReadingPreferences";

/**
 * "Mary Fisher" in Fraunces 400 (SOFT 0, WONK 1, opsz 144), measured in Chrome from the rendered
 * pixels, in em: the ink is 4.5105em wide and starts 0.0555em in from the text box (the M's
 * left side bearing). font-size = container width ÷ INK_RATIO, pulled left by the bearing, so the
 * letters span the container exactly: ≈ 307px at 1440. Size is always fit to the width (never
 * capped by height). Re-measure if the font, weight, axes or text change.
 */
const INK_RATIO = 4.5105;
const INK_LEFT = 0.0555;

/** Line box height (matches legacy) and the visible share of it; the rest is cut by a hard edge. */
const WORDMARK_LEADING = 1.55;
const WORDMARK_CLIP = 0.63;

/**
 * Optional, set on the footer by one-screen pages (globals.css):
 * --wordmark-h: visible height of the band (default 63% of the line box). Lower only moves the
 *   cut edge up; the letters stay where they are.
 * --wordmark-mt: margin above the band. The band's top 0.3955em is empty leading above the
 *   letters, which one-screen pages pull up under the content.
 */
const WORDMARK_FONT_SIZE = `calc(100cqw / ${INK_RATIO})`;

export function Footer() {
  return (
    <footer aria-label="Mary Fisher" className="mt-12 pb-4">
      {/* Container query: 100cqw = container width, so no JS measuring or resize jump.
          The word scales with the viewport, not the content column, at every width (even ≥ 1440,
          where the content is centred): the letters run from 1.806vw to 2.014vw from the right
          edge (Figma 1440: 26 and 29), the same proportion at every width.
          Not shown < 834 (Figma "Mobile — Home", 24 Nov). */}
      <div className="@container hidden tablet:block tablet:pr-[2.014vw] tablet:pl-[1.806vw]">
        <div
          aria-hidden="true"
          data-footer-wordmark
          className="pointer-events-none overflow-hidden font-wordmark font-normal whitespace-nowrap text-text select-none"
          style={{
            fontSize: WORDMARK_FONT_SIZE,
            marginTop: "var(--wordmark-mt, 0px)",
            marginLeft: `-${INK_LEFT}em`,
            lineHeight: WORDMARK_LEADING,
            height: `var(--wordmark-h, ${WORDMARK_LEADING * WORDMARK_CLIP}em)`,
            // opsz pinned to the display cut: auto optical sizing widens the letters
            // at small sizes, which would break the fixed width ratio on mobile.
            fontVariationSettings: '"SOFT" 0, "WONK" 1, "opsz" 144',
          }}
        >
          {/* Rises once from the clip edge on page load (inline-block so it can translate). */}
          <span className="inline-block motion-safe:animate-wordmark-rise">Mary Fisher</span>
        </div>
      </div>

      {/* Right padding keeps the text clear of the Chatbase bubble (55 × 55, 16px from the
          viewport edge): < 834 text ends 80px from the edge (16 + 64, just wide enough for
          LinkedIn, Email and ©2026 in one row); ≥ 834 the row's right edge is the bubble's width
          + 16px clear of the bubble (16 + 55 + 16 = 87px from the viewport edge). */}
      <div className="px-2 tablet:pr-[87px] tablet:pl-6 desktop:pl-(--content-left)">
        {/* Cookie consent: in the flow directly above the row, left-aligned with ".say hello". */}
        <ConsentBar className="mt-2 pr-8 tablet:mt-1 tablet:pr-0" />
        <FooterRow className="flex flex-col gap-2 pr-8 tablet:mt-3 tablet:flex-row tablet:items-baseline tablet:justify-between tablet:pr-0" />
      </div>
    </footer>
  );
}

/**
 * The footer's bottom row (Figma): ".say hello" left; LinkedIn, Email and "All rights reserved
 * ©2026" right (Instrument Sans 15 from 834px). Reading preferences and Cookie settings are
 * quieter (mono 12) on a small second line under the copyright, out of the row's flow at ≥ 834px
 * so they never move the main links. The caller sets the row layout.
 * ".say hello" and the copyright are #9A9A96 (quiet) at every width.
 * Below 834px: LinkedIn, Email and ©2026 in one 14px row; the two settings wrap onto the line
 * under it.
 * `compact`: below 834px only LinkedIn and Email (the 404 page).
 * `location`: where its email_click events come from (see <AnalyticsEvents>).
 */
export function FooterRow({
  className = "",
  compact = false,
  location = "footer",
}: {
  className?: string;
  compact?: boolean;
  location?: "footer" | "404";
}) {
  return (
    <div className={className} data-analytics-location={location}>
      <Label className="shrink-0 whitespace-nowrap text-quiet!">say hello</Label>
      <ul className="relative flex flex-wrap items-baseline gap-x-2 gap-y-1 font-sans text-nav tablet:gap-x-3 tablet:text-small">
        <li>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="relative touch-target text-text transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a href={`mailto:${contact.email}`} className="relative touch-target text-text transition-colors hover:text-accent">
            Email
          </a>
        </li>
        <li className={`text-quiet ${compact ? "hidden tablet:list-item" : ""}`}>All rights reserved ©2026</li>
        {/* Second line, right-aligned under the copyright. */}
        <li
          className={`gap-x-2 max-tablet:order-1 max-tablet:basis-full tablet:absolute tablet:top-full tablet:right-0 tablet:mt-0.5 ${
            compact ? "hidden tablet:flex" : "flex"
          }`}
        >
          <ReadingPreferences />
          <CookieSettings />
        </li>
      </ul>
    </div>
  );
}
