/**
 * Which case studies are live. Until a slug is listed here nothing links to it: the Home
 * Payments tag, the mobile Home selected-work row, the 404 note, the case study ".next" panel
 * and the sitemap all render it as not clickable (no link, aria-disabled) or leave it out.
 * The page itself still builds. To launch TNS, add "tns".
 */
const LIVE_CASES: readonly string[] = ["ndd"];

/** "/work/<slug>" when that case study is live, otherwise undefined (render it not clickable). */
export function caseHref(slug: string): string | undefined {
  return LIVE_CASES.includes(slug) ? `/work/${slug}` : undefined;
}

export function isCaseLive(slug: string): boolean {
  return LIVE_CASES.includes(slug);
}
