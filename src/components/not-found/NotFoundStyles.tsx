"use client";

/**
 * 404-only global style: the shell footer (giant wordmark + row) is hidden; the page renders
 * its own footer row. Same Activity-safe pattern as <CasePageStyles>: the stylesheet switches
 * off when Next keeps this page mounted but hidden after navigating away.
 * See node_modules/next/dist/docs/01-app/02-guides/preserving-ui-state.md ("Global styles").
 *
 * Below 834px the consent bar leaves the screen and sits under the page instead (last in the
 * shell's flex column, no reserved padding): on short phones (667px tall) a fixed bar would
 * cover the sticky note, and there is no room for one under it.
 */
export function NotFoundStyles() {
  return (
    <style
      ref={(style) => {
        if (style) style.media = "";
        return () => {
          if (style) style.media = "not all";
        };
      }}
    >
      {`#main ~ footer { display: none; }
@media (width < 52.125rem) {
  [data-consent] { position: static; order: 1; }
  body { padding-bottom: 0; }
}`}
    </style>
  );
}
