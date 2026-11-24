"use client";

import type { MouseEvent } from "react";
import type { TocItem } from "@/lib/case-studies";
import { footerFadeClass, useFooterInView } from "../useFooterInView";
import { goToSection, useActiveSection } from "./useActiveSection";

/**
 * Desktop (≥ 1194px) table of contents, in place of the site sidebar: Figma "On this page"
 * (3074:737), fixed at x 24, y 140, below the site logo. Fades out while the footer wordmark is in view.
 * Sections 15px, explorations 14px indented 16px.
 * The section in view is accent green. Items come from getToc(), so they always exist.
 */
export function CaseToc({ items: all }: { items: TocItem[] }) {
  // ≥ 1194 only, so <Mobile>-only sections never show here.
  const items = all
    .filter((i) => i.only !== "mobile")
    .map((i) => ({ ...i, children: i.children.filter((c) => c.only !== "mobile") }));
  const flat = items.flatMap((i) => [i, ...i.children]);
  const [active, setActive] = useActiveSection(flat.map((i) => i.id));
  const footerInView = useFooterInView();

  const onClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActive(id);
    goToSection(id);
  };

  const link = (item: TocItem, sub: boolean) => {
    const current = active === item.id;
    return (
      <a
        href={`#${item.id}`}
        onClick={(e) => onClick(e, item.id)}
        aria-current={current ? "location" : undefined}
        // Colour eases over 150ms. Touch (iPad landscape): the 44px hit area would overlap the
        // next item, so it is capped at the 32px row pitch.
        className={`relative block touch-target [--hit:32px] font-sans transition-colors duration-150 ease-out ${sub ? "pl-2 text-toc-sub" : "text-toc"} ${
          current ? "font-semibold text-accent" : "text-muted hover:text-text"
        }`}
      >
        {item.label}
      </a>
    );
  };

  // Fixed at x 24, y 140 for the whole page: it never scrolls, so it can't be pushed up under the
  // logo (y 32–66). When the footer wordmark comes into view it fades out (200ms, and inert so
  // its links can't be tabbed to while invisible) instead, and fades back in on the way up.
  return (
    <nav
      aria-label="On this page"
      inert={footerInView}
      className={`fixed top-[140px] left-3 z-10 hidden max-h-[calc(100dvh-180px)] w-[176px] overflow-y-auto desktop:block ${footerFadeClass(footerInView)}`}
    >
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li key={item.id}>
            {link(item, false)}
            {item.children.length > 0 && (
              <ul className="mt-1 flex flex-col gap-1">
                {item.children.map((c) => (
                  <li key={c.id}>{link(c, true)}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
