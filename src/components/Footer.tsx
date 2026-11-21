import { contact } from "@/content/site";
import { Label } from "./Label";
import { gutter } from "./gutter";

/**
 * "Mary Fisher" width ÷ font-size for Fraunces 400 (SOFT 0, WONK 1, opsz 144), measured in
 * Chrome (advance and ink widths agree). font-size = container width ÷ this, so the
 * word spans the container edge to edge: ≈ 302px at 1440.
 * Re-measure if the font, weight, axes or text change.
 */
const WORDMARK_RATIO = 4.575;

/** Line box height (matches legacy) and the visible share of it; the rest is cut by a hard edge. */
const WORDMARK_LEADING = 1.55;
const WORDMARK_CLIP = 0.63;

/**
 * Optional, set by a page on the footer (the home page does, so it fits one viewport):
 * --wordmark-pull: share of the font size the band moves up into the content above it. The top
 *   ≈ 0.40em of the band is empty (line leading above the ascenders), so up to that the glyphs
 *   stay clear; Figma's Home frames overlap it the same way.
 * --wordmark-max-height: cap on the band's height below that pulled-up part. The font then
 *   shrinks to keep within it. Unset, the fallback is never reached and the word spans the width.
 */
const WORDMARK_FONT_SIZE = `min(calc(100cqw / ${WORDMARK_RATIO}), calc(var(--wordmark-max-height, 100000px) / (${
  WORDMARK_LEADING * WORDMARK_CLIP
} - var(--wordmark-pull, 0))))`;

export function Footer() {
  return (
    <footer aria-label="Mary Fisher" className="mt-12 pb-4">
      {/* Container query: 100cqw = container width, so no JS measuring or resize jump.
          The word scales with the viewport, not the content column, at every width (even ≥ 1440,
          where the content is centred): < 834 it spans the full viewport (390 in Figma
          "Mobile / Footer"); from 834 it sits 1.9vw in from each edge (Figma: 16 at 834,
          23 at 1194, 26 at 1440, 37 at 1920). */}
      <div className="@container tablet:px-[1.9vw]">
        <div
          aria-hidden="true"
          className="pointer-events-none overflow-hidden font-wordmark font-normal whitespace-nowrap text-text select-none"
          style={{
            fontSize: WORDMARK_FONT_SIZE,
            marginTop: "calc(-1em * var(--wordmark-pull, 0))",
            lineHeight: WORDMARK_LEADING,
            height: `${WORDMARK_LEADING * WORDMARK_CLIP}em`,
            // opsz pinned to the display cut: auto optical sizing widens the letters
            // at small sizes, which would break the fixed width ratio on mobile.
            fontVariationSettings: '"SOFT" 0, "WONK" 1, "opsz" 144',
          }}
        >
          Mary Fisher
        </div>
      </div>

      {/* Right padding keeps the text clear of the Chatbase bubble (55px, 16px from the
          viewport edge): text ends ≥ 87px from the edge at every width. */}
      <div className={gutter}>
        <FooterRow className="mt-3 flex flex-col gap-2 pr-9 tablet:flex-row tablet:items-baseline tablet:justify-between tablet:pr-5 desktop:pr-6" />
      </div>
    </footer>
  );
}

/**
 * The footer's bottom row: ".say hello" and the contact links. The caller sets the layout.
 * `compact`: below 834px only LinkedIn and Email (the 404 page).
 */
export function FooterRow({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={className}>
      <Label>say hello</Label>
      <ul className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-sans text-ui">
        <li>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a href={`mailto:${contact.email}`} className="text-text transition-colors hover:text-accent">
            Email
          </a>
        </li>
        <li className={`text-muted ${compact ? "hidden tablet:list-item" : ""}`}>
          All rights reserved<span className="tablet:hidden">,</span> ©2026
        </li>
      </ul>
    </div>
  );
}
