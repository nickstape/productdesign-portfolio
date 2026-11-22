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
import { gutter } from "./gutter";

/** Same look for both: neither choice is the default or the "nice" one. */
const BUTTON =
  "relative touch-target flex h-5 items-center justify-center rounded-image border border-line px-2 font-mono text-meta text-text transition-colors hover:border-accent hover:text-accent";

/**
 * Analytics consent bar, fixed to the bottom of the screen until the reader accepts or declines
 * (stored in localStorage, never shown again). "Cookie settings" in the footer reopens it.
 *
 * While it's open, --consent-h on <html> reserves its height under the page (globals.css), so
 * nothing ends up trapped behind it. On the 404 below 834px it sits under the page instead, so
 * it never covers the sticky note (see <NotFoundStyles>). The right padding matches the footer row's, keeping the buttons clear of
 * the Chatbase bubble (55px, 16px from the edge); the chat window itself stacks above the bar.
 *
 * Not a dialog: the page stays usable. It sits right after the skip link, so keyboard and screen
 * reader users meet it early. Reopened from the footer it takes focus, Esc closes it again and
 * focus goes back to "Cookie settings".
 */
export function ConsentBar() {
  const state = useSyncExternalStore(subscribeConsent, consentSnapshot, consentServerSnapshot);
  const ref = useRef<HTMLElement>(null);
  /** "Cookie settings", when the bar was reopened from it. */
  const opener = useRef<HTMLElement | null>(null);
  const open = state === "open";

  // Reserve the bar's height under the page while it's open.
  useEffect(() => {
    const el = ref.current;
    const root = document.documentElement;
    if (!open || !el) return;
    const ro = new ResizeObserver(() => root.style.setProperty("--consent-h", `${el.offsetHeight}px`));
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.removeProperty("--consent-h");
    };
  }, [open]);

  // Reopened from "Cookie settings" (a choice exists): focus the bar; Esc closes it.
  useEffect(() => {
    if (!open || storedChoice() === null) return;
    opener.current = document.activeElement as HTMLElement | null;
    ref.current?.focus();
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
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#333] bg-surface outline-none"
    >
      <div className={`${gutter} py-2`}>
        <div className="flex flex-col gap-2 pr-9 tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-4 tablet:pr-5 desktop:pr-6">
          <p className="font-mono text-meta text-text">
            This site uses analytics cookies to see which work people read.
          </p>
          <div className="grid shrink-0 grid-cols-2 gap-1 tablet:w-[224px]">
            <button type="button" onClick={() => choose("granted")} className={BUTTON}>
              Accept
            </button>
            <button type="button" onClick={() => choose("denied")} className={BUTTON}>
              Decline
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
