import { contact } from "@/content/site";
import { Label } from "./Label";
import { gutter } from "./gutter";

/**
 * "Mary Fisher" width ÷ font-size for Fraunces 400 (SOFT 0, WONK 1, opsz 144), measured in
 * Chrome (advance and ink widths agree). font-size = content width ÷ this, so the
 * word spans the content column edge to edge: ≈ 274px at 1440.
 * Re-measure if the font, weight, axes or text change.
 */
const WORDMARK_RATIO = 4.575;

/** Line box height (matches legacy) and the visible share of it; the rest is cut by a hard edge. */
const WORDMARK_LEADING = 1.55;
const WORDMARK_CLIP = 0.63;

/**
 * Optional height cap: a page can set --wordmark-max-height on the footer (the home page does,
 * so it fits one viewport). The font then shrinks to keep the visible band within it.
 * Unset, the fallback is never reached and the word spans the column.
 */
const WORDMARK_FONT_SIZE = `min(calc(100cqw / ${WORDMARK_RATIO}), calc(var(--wordmark-max-height, 100000px) / ${
  WORDMARK_LEADING * WORDMARK_CLIP
}))`;

export function Footer() {
  return (
    <footer aria-label="Mary Fisher" className={`mt-12 pb-4 ${gutter}`}>
      {/* Container query: 100cqw = content width, so no JS measuring or resize jump. */}
      <div className="@container">
        <div
          aria-hidden="true"
          className="overflow-hidden font-wordmark font-normal whitespace-nowrap text-text select-none"
          style={{
            fontSize: WORDMARK_FONT_SIZE,
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
      <div className="mt-3 flex flex-col gap-2 pr-9 tablet:flex-row tablet:items-baseline tablet:justify-between tablet:pr-7 desktop:pr-6">
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
          <li className="text-muted">All rights reserved ©2026</li>
        </ul>
      </div>
    </footer>
  );
}
