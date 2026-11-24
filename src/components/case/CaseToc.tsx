"use client";

import type { MouseEvent } from "react";
import type { TocItem } from "@/lib/case-studies";
import { goToSection, useActiveSection } from "./useActiveSection";

/**
 * Desktop (≥ 1194px) table of contents, in place of the site sidebar: Figma "On this page"
 * (3074:737), sticky at x 24, first item at y 155, stopping at the end of the case content. The site logo stays above it.
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

  // Column: from y 155 to the end of the case content ([data-case] is `relative` and starts at
  // the top of the page), at x 24 of the viewport (the case content starts at
  // max(--case-left, (100vw − 1152) / 2)). The nav sticks at 155 inside it, so it scrolls away
  // with the last of the content and never reaches the footer. z-10: under the fixed site logo
  // (z-20) as it scrolls away past it.
  return (
    <div className="absolute top-[155px] bottom-0 left-[calc(24px-max(var(--case-left),(100vw-1152px)/2))] z-10 hidden w-[176px] desktop:block">
    <nav
      aria-label="On this page"
      className="sticky top-[155px] max-h-[calc(100dvh-195px)] overflow-y-auto"
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
    </div>
  );
}
