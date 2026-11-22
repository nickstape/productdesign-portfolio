/**
 * Home intro (preloader): shared by the inline <head> script in layout.tsx and <HomeIntro>.
 * Kept out of HomeIntro.tsx because a "use client" module's exports reach a server component
 * as client references, not as strings.
 */

/** sessionStorage key: set once the intro has played (or been skipped) in this browser session. */
export const INTRO_FLAG = "introSeen";

/** Same widths as --breakpoint-tablet / --breakpoint-desktop in globals.css. */
export const INTRO_MIN_WIDTH = "(min-width: 52.125rem)"; // 834px
export const INTRO_DESKTOP = "(min-width: 74.625rem)"; // 1194px
export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/** If the page's JS hasn't taken over by then, show Home as it is rather than a blank page. */
const STALL_MS = 4000;

/**
 * Runs before first paint on every hard load. On "/" at ≥ 834px, with motion allowed and the
 * flag unset, it marks <html data-intro="pending">, which hides Home (globals.css, "Home
 * intro") until <HomeIntro> hydrates and starts. Client-side navigations never run it.
 */
export const INTRO_LOADER = `(function(){try{var d=document.documentElement;if(location.pathname==="/"&&matchMedia(${JSON.stringify(
  INTRO_MIN_WIDTH,
)}).matches&&!matchMedia(${JSON.stringify(REDUCED_MOTION)}).matches&&!sessionStorage.getItem(${JSON.stringify(
  INTRO_FLAG,
)})){d.setAttribute("data-intro","pending");setTimeout(function(){if(d.getAttribute("data-intro")==="pending")d.removeAttribute("data-intro")},${STALL_MS})}}catch(e){}})()`;
