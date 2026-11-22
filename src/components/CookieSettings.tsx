"use client";

import { reopenConsent } from "@/lib/analytics";

/** "Cookie settings" in the footer row: reopens <ConsentBar>. Styled like "Reading preferences". */
export function CookieSettings() {
  return (
    <button
      type="button"
      onClick={reopenConsent}
      className="relative touch-target font-sans text-ui text-text transition-colors hover:text-accent"
    >
      Cookie settings
    </button>
  );
}
