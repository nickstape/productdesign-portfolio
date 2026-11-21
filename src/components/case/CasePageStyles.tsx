"use client";

/**
 * Case-page-only global style: ≥ 1194px the table of contents replaces the site sidebar.
 * Next keeps visited pages mounted but hidden (React <Activity>), so a global rule must switch
 * off when this page is hidden, or the sidebar would stay hidden on the next page too.
 * The ref callback's cleanup runs when Activity hides the page; it disables the stylesheet.
 * See node_modules/next/dist/docs/01-app/02-guides/preserving-ui-state.md ("Global styles").
 */
export function CasePageStyles() {
  return (
    <style
      ref={(style) => {
        if (style) style.media = "";
        return () => {
          if (style) style.media = "not all";
        };
      }}
    >
      {`@media (min-width: 74.625rem) { nav[data-site-nav] { display: none; } }`}
    </style>
  );
}
