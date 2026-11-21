"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import type { TocItem } from "@/lib/case-studies";
import { goToSection, useActiveSection } from "./useActiveSection";

/**
 * Desktop (≥ 1194px) table of contents, in place of the site sidebar: fixed at x 38, top 140,
 * with a small "←" home link above. Sections 15px, explorations 14px indented 16px.
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
        className={`block font-sans transition-colors ${sub ? "pl-2 text-toc-sub" : "text-toc"} ${
          current ? "font-semibold text-accent" : "text-muted hover:text-text"
        }`}
      >
        {item.label}
      </a>
    );
  };

  return (
    <>
      <Link
        href="/"
        aria-label="Back to home"
        className="fixed top-[32px] left-[38px] z-20 hidden font-sans text-ui text-muted transition-colors hover:text-text desktop:block"
      >
        <span aria-hidden="true">←</span>
      </Link>
      <nav
        aria-label="On this page"
        className="fixed top-[140px] left-[38px] z-20 hidden max-h-[calc(100dvh-180px)] w-[160px] overflow-y-auto desktop:block"
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
    </>
  );
}
