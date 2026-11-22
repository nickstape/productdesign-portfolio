"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

const CASE_STUDY = /^\/work\/(ndd|tns)\/?$/;
const EMAIL_LOCATIONS = ["footer", "404", "ask"] as const;

/**
 * Custom GA4 events from one click listener on the document, so links stay plain and new ones
 * are counted without extra code. Page views are not sent here: GA4 enhanced measurement counts
 * client-side route changes ("page changes based on browser history events").
 *
 * - home_tag_click: any home tag ([data-tag], including the "coming soon" ones)
 * - case_study_open: any link to /work/ndd or /work/tns from another page
 * - cv_download: /cv.pdf
 * - email_click: mailto: links, located by the nearest [data-analytics-location]
 * - linkedin_click: linkedin.com links
 * - askmary_open: the Chatbase bubble opening the chat (Open AskMary on /ask tracks itself)
 */
export function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Primary clicks, and middle clicks on links (open in new tab).
      if (e.type === "auxclick" && e.button !== 1) return;
      const target = e.target instanceof Element ? e.target : null;
      if (!target) return;

      if (e.type === "click") {
        const tag = target.closest("[data-home-tags] [data-tag]")?.getAttribute("data-tag");
        if (tag) track({ name: "home_tag_click", params: { tag } });

        if (target.closest("#chatbase-bubble-button") && !chatOpen()) track({ name: "askmary_open" });
      }

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const url = new URL(link.href, location.href);

      if (url.protocol === "mailto:") {
        const where = link.closest("[data-analytics-location]")?.getAttribute("data-analytics-location");
        const known = EMAIL_LOCATIONS.find((l) => l === where);
        if (known) track({ name: "email_click", params: { location: known } });
        return;
      }
      if (url.hostname === "linkedin.com" || url.hostname.endsWith(".linkedin.com")) {
        track({ name: "linkedin_click" });
        return;
      }
      if (url.origin !== location.origin) return;
      if (url.pathname === "/cv.pdf") {
        track({ name: "cv_download" });
        return;
      }
      const slug = url.pathname.match(CASE_STUDY)?.[1];
      // Not in-page links (the case study's own table of contents).
      if ((slug === "ndd" || slug === "tns") && url.pathname !== location.pathname) {
        track({ name: "case_study_open", params: { case_study: slug } });
      }
    };

    // Capture phase: runs before Chatbase toggles its window and can't be stopped by handlers below.
    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("auxclick", onClick, { capture: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("auxclick", onClick, { capture: true });
    };
  }, []);

  return null;
}

/** The Chatbase chat window is showing (so a bubble click closes it). */
function chatOpen(): boolean {
  const win = document.getElementById("chatbase-bubble-window");
  if (!win) return false;
  const style = getComputedStyle(win);
  return style.display !== "none" && style.visibility !== "hidden";
}
