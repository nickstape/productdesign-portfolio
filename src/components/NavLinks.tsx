"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { isCurrent, type NavItem } from "@/content/site";

type Props = {
  items: NavItem[];
  linkClassName: string;
};

/**
 * Nav list with the current route in accent green.
 * usePathname sits in a Suspense boundary so a future dynamic route can't block
 * prerendering of the shell; the fallback is the same list with nothing active.
 */
export function NavLinks(props: Props) {
  return (
    <Suspense fallback={<List {...props} pathname={null} />}>
      <ActiveList {...props} />
    </Suspense>
  );
}

function ActiveList(props: Props) {
  return <List {...props} pathname={usePathname()} />;
}

function List({ items, linkClassName, pathname }: Props & { pathname: string | null }) {
  return (
    <>
      {items.map((item) => {
        const current = isCurrent(item, pathname);
        const cls = `${linkClassName} transition-colors ${
          current ? "text-accent" : "text-muted hover:text-text"
        }`;
        return (
          <li key={item.label} className={item.className}>
            {item.external ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>
                {item.label}
                <span aria-hidden="true"> ↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <Link href={item.href} aria-current={current ? "page" : undefined} className={cls}>
                {item.label}
              </Link>
            )}
          </li>
        );
      })}
    </>
  );
}
