"use client";

import type { MouseEvent } from "react";
import type { TocItem } from "@/lib/case-studies";
import { goToSection, useActiveSection } from "./useActiveSection";

/**
 * Desktop (≥ 1194px) table of contents, in place of the site sidebar: Figma "On this page"
 * (3074:737), fixed at x 24, first item at y 155. The site logo stays above it.
 * Sections 15px, explorations 14px indented 16px.
 * The section in view is accent green. Items come from getToc(), so they always exist.
 */
export function CaseToc({ items }: { items: TocItem[] }) {
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

  return (
    <nav
      aria-label="On this page"
      className="fixed top-[155px] left-[24px] z-20 hidden max-h-[calc(100dvh-195px)] w-[176px] overflow-y-auto desktop:block"
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
