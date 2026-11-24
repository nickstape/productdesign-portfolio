"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import {
  closeConsent,
  consentServerSnapshot,
  consentSnapshot,
  setConsent,
  storedChoice,
  subscribeConsent,
  type Choice,
} from "@/lib/analytics";

/** Same look for both: neither choice is the default or the "nice" one. 44px tap height. */
const BUTTON =
  "flex h-[44px] items-center font-mono text-meta text-text underline underline-offset-2 transition-colors hover:text-accent";

/**
 * Analytics consent line, shown until the reader accepts or declines (stored in localStorage,
 * never shown again). "Cookie settings" in the footer reopens it.
 *
 * No fill, border or shadow: one line of text and two text buttons, in the normal layout flow
 * directly above the footer row (the caller places it and sets its padding, left-aligned with
 * ".say hello"). It stays on the left, clear of the Chatbase bubble at the bottom right. Once
 * answered it unmounts and the space closes.
 *
 * Not a dialog: the page stays usable. Reopened from the footer it takes focus, Esc closes it
 * again and focus goes back to "Cookie settings". The 404 renders its own copy (the shell
 * footer is hidden there); only the visible one reacts.
 */
export function ConsentBar({ className = "" }: { className?: string }) {
  const state = useSyncExternalStore(subscribeConsent, consentSnapshot, consentServerSnapshot);
  const ref = useRef<HTMLElement>(null);
  /** "Cookie settings", when the bar was reopened from it. */
  const opener = useRef<HTMLElement | null>(null);
  const open = state === "open";

  // Reopened from "Cookie settings" (a choice exists): focus the bar; Esc closes it.
  useEffect(() => {
    const el = ref.current;
    // Skip a copy inside a hidden subtree (display: none has no client rects).
    if (!open || !el || el.getClientRects().length === 0 || storedChoice() === null) return;
    opener.current = document.activeElement as HTMLElement | null;
    el.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      closeConsent();
      opener.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  const choose = (choice: Choice) => {
    const returnTo = storedChoice() === null ? null : opener.current;
    setConsent(choice);
    returnTo?.focus();
  };

  return (
    <section
      ref={ref}
      data-consent
      aria-label="Cookie consent"
      tabIndex={-1}
      className={`flex flex-wrap items-center gap-x-3 outline-none ${className}`}
    >
      <p className="font-mono text-meta text-muted">This site uses analytics cookies to see which work people read.</p>
      <div className="flex gap-3">
        <button type="button" onClick={() => choose("granted")} className={BUTTON}>
          Accept
        </button>
        <button type="button" onClick={() => choose("denied")} className={BUTTON}>
          Decline
        </button>
      </div>
    </section>
  );
}
