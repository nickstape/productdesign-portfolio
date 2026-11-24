"use client";

import { reopenConsent } from "@/lib/analytics";

/** "Cookie settings" under the footer row: reopens <ConsentBar>. Styled like "Reading preferences"
 *  (JetBrains Mono 12 in #9A9A96 (Figma has no token for it): a quiet secondary control.) */
export function CookieSettings() {
  return (
    <button
      type="button"
      onClick={reopenConsent}
      className="relative touch-target font-mono text-meta text-[#9a9a96] transition-colors hover:text-accent"
    >
      Cookie settings
    </button>
  );
}
