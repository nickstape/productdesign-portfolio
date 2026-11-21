"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import type { TocItem } from "@/lib/case-studies";
import { goToSection, useActiveSection } from "./useActiveSection";

/**
 * Below 1194px: Figma "Jump to (scrolls horizontally)" (3303:680). A strip of chips for the
 * top-level sections, sticky under the 60px MobileHeader. The active chip is scrolled into view.
 */
export function JumpTo({ items }: { items: TocItem[] }) {
  const ids = items.map((i) => i.id);
  const [active, setActive] = useActiveSection(ids);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const chip = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !chip) return;
    const left = chip.offsetLeft - 16;
    const right = chip.offsetLeft + chip.offsetWidth + 16 - list.clientWidth;
    if (list.scrollLeft > left) list.scrollTo({ left });
    else if (list.scrollLeft < right) list.scrollTo({ left: right });
  }, [active]);

  const onClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActive(id);
    goToSection(id);
  };

  return (
    <nav aria-label="Jump to section" className="sticky top-[60px] z-20 -mx-2 mt-3 bg-bg tablet:-mx-4 desktop:hidden">
      <ul
        ref={listRef}
        className="flex gap-1 overflow-x-auto px-2 py-[10px] [scrollbar-width:none] tablet:px-4 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => {
          const current = active === item.id;
          return (
            <li key={item.id} data-id={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                onClick={(e) => onClick(e, item.id)}
                aria-current={current ? "location" : undefined}
                className={`block rounded-full bg-surface px-[12px] py-1 font-mono text-meta whitespace-nowrap transition-colors ${
                  current ? "text-accent" : "text-muted hover:text-text"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
