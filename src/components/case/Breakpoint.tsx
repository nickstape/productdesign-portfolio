import type { ReactNode } from "react";

/*
 * Different copy per breakpoint in MDX. CSS only (no JS), so nothing jumps after load; the
 * hidden version is display: none, so screen readers skip it too. `display: contents` keeps the
 * children in the parent's own flex gap, as if the wrapper weren't there.
 * A <Section> or <Exploration> inside one is listed in the TOC / chip strip at that size only
 * (getToc in src/lib/case-studies.ts).
 */

type Props = {
  children: ReactNode;
  /** "span" inside a heading, paragraph or caption (e.g. a Section title with two versions). */
  as?: "div" | "span";
};

/** Shown at ≥ 834px only. */
export function Desktop({ children, as: Tag = "div" }: Props) {
  return <Tag className="hidden tablet:contents">{children}</Tag>;
}

/** Shown below 834px only. */
export function Mobile({ children, as: Tag = "div" }: Props) {
  return <Tag className="contents tablet:hidden">{children}</Tag>;
}
