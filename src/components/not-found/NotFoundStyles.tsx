"use client";

/**
 * 404-only global style: the shell footer (giant wordmark + row) is hidden; the page renders
 * its own footer row. Same Activity-safe pattern as <CasePageStyles>: the stylesheet switches
 * off when Next keeps this page mounted but hidden after navigating away.
 * See node_modules/next/dist/docs/01-app/02-guides/preserving-ui-state.md ("Global styles").
 * The 404 renders its own consent line above its footer row.
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
      {`#main ~ footer { display: none; }`}
    </style>
  );
}
