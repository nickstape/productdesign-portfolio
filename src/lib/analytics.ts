import { sendGAEvent } from "@next/third-parties/google";

/**
 * Google Analytics 4 + Consent Mode v2 (client side). GA itself is loaded by <GoogleAnalytics>
 * in src/app/layout.tsx, production only; the consent defaults are set by CONSENT_DEFAULTS in
 * <head>, before GA. Where GA isn't loaded (dev, previews) there is no dataLayer and nothing
 * here sends anything.
 */

export const GA_ID = "G-9581D3JPYJ";

/** localStorage key for the reader's choice. Same key as CONSENT_DEFAULTS. */
export const CONSENT_KEY = "mf-consent";

/**
 * Runs in <head> before GA: everything denied by default (UK), then analytics granted again
 * straight away for a reader who accepted on an earlier visit.
 */
export const CONSENT_DEFAULTS = `(function(){window.dataLayer=window.dataLayer||[];function g(){dataLayer.push(arguments)}g("consent","default",{analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});try{if(localStorage.getItem("${CONSENT_KEY}")==="granted")g("consent","update",{analytics_storage:"granted"})}catch(e){}})()`;

/** Set up by CONSENT_DEFAULTS, so only where GA loads. (window.dataLayer is typed by @next/third-parties.) */
const enabled = () => typeof window !== "undefined" && Array.isArray(window.dataLayer);

/** Custom events, by name, with their parameters. */
export type AnalyticsEvent =
  | { name: "home_tag_click"; params: { tag: string } }
  | { name: "case_study_open"; params: { case_study: "ndd" | "tns" } }
  | { name: "cv_download" }
  | { name: "email_click"; params: { location: "footer" | "404" | "ask" } }
  | { name: "linkedin_click" }
  | { name: "askmary_open" };

export function track(e: AnalyticsEvent) {
  if (!enabled()) return;
  sendGAEvent("event", e.name, "params" in e ? e.params : {});
}

/* ---- Consent store: the reader's choice, and whether the bar is open ---- */

export type Choice = "granted" | "denied";

let reopened = false;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((fn) => fn());

export function subscribeConsent(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function storedChoice(): Choice | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/** "open" | "closed" on the client, "server" during SSR (the bar renders nothing). */
export const consentSnapshot = () => (reopened || storedChoice() === null ? "open" : "closed");
export const consentServerSnapshot = () => "server";

/** "Cookie settings" in the footer. */
export function reopenConsent() {
  reopened = true;
  emit();
}

export function closeConsent() {
  reopened = false;
  emit();
}

export function setConsent(choice: Choice) {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // Storage blocked: the choice still applies to this page view.
  }
  if (enabled()) sendGAEvent("consent", "update", { analytics_storage: choice });
  if (choice === "denied") clearAnalyticsCookies();
  reopened = false;
  emit();
}

/** Declining after accepting: remove the _ga cookies already set (any domain level). */
function clearAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((n) => n === "_ga" || n.startsWith("_ga_"));
  const parts = location.hostname.split(".");
  const domains = parts.map((_, i) => parts.slice(i).join(".")).filter((d) => d.includes("."));
  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    for (const d of domains) document.cookie = `${name}=; Max-Age=0; path=/; domain=.${d}`;
  }
}
