"use client";

import { usePathname } from "next/navigation";
import { primaryNav } from "@/content/site";
import { NavLinks } from "./NavLinks";
import { footerFadeClass, useFooterInView } from "./useFooterInView";

/**
 * Desktop (≥ 1194px) nav: fixed at x=38, vertically centred, 24px gaps.
 * On About it fades out while the footer wordmark is in view, like the case study TOC. Not on
 * Home or the 404: they are one screen with the wordmark always visible.
 */
export function Sidebar() {
  const hidden = useFooterInView(usePathname() === "/about");
  return (
    <nav
      aria-label="Primary"
      data-site-nav
      inert={hidden}
      className={`fixed top-1/2 left-[38px] z-20 hidden -translate-y-1/2 desktop:block ${footerFadeClass(hidden)}`}
    >
      <ul className="flex flex-col gap-3">
        <NavLinks items={primaryNav} linkClassName="font-sans text-ui" />
      </ul>
    </nav>
  );
}
