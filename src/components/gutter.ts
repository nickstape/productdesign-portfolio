/**
 * Horizontal padding for site chrome (footer). Anchored to the viewport at every width:
 * mobile 16 · tablet 48 · desktop: x=145, 40px right edge (Figma keeps ".say hello" at x=144
 * even at 1920).
 */
export const gutter = "px-2 tablet:px-6 desktop:pr-5 desktop:pl-[var(--content-left)]";

/**
 * Horizontal padding for page content (main), from --page-left / --page-right in globals.css:
 * the chrome gutter below 1440, then the 1440 layout centred. Full-bleed elements pull out by
 * the same vars (-ml-(--page-left) -mr-(--page-right)).
 */
export const pageGutter = "pl-(--page-left) pr-(--page-right)";
