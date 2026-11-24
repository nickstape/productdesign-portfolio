import Link from "next/link";
import { Todo } from "./Todo";

type Props = {
  /** Leave out while the next case study isn't live (src/content/case-status.ts): the panel
   *  keeps its look but is a plain div (aria-disabled, no hover) with "Coming soon". */
  href?: string;
  title: string;
  /** e.g. "Read case study 02" (the arrow is added). */
  cta: string;
};

const PANEL =
  "mt-6 flex flex-col gap-2 rounded-card bg-surface p-[18px] tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-4 tablet:p-4";

/** Figma "Next case study" (3074:655): one surface panel, the whole panel is the link. */
export function NextCase({ href, title, cta }: Props) {
  // A title still marked "TODO: …" in the next case study's frontmatter shows as a visible TODO.
  const todo = title.match(/^TODO:?\s*(.*)$/);
  const heading = (
    <span className="flex flex-col gap-[6px]">
      <span className="font-mono text-meta text-muted">.next</span>
      <span className="font-display text-next-title text-text">{todo ? <Todo>{todo[1]}</Todo> : title}</span>
    </span>
  );

  if (!href) {
    return (
      <div aria-disabled="true" className={`${PANEL} cursor-default`}>
        {heading}
        <span className="flex shrink-0 flex-col gap-0.5 tablet:items-end">
          <span className="font-sans text-small text-text">
            {cta} <span aria-hidden="true">→</span>
          </span>
          <span className="font-mono text-meta text-quiet">Coming soon</span>
        </span>
      </div>
    );
  }

  return (
    <Link href={href} className={`group ${PANEL}`}>
      {heading}
      <span className="shrink-0 font-sans text-small text-text transition-colors group-hover:text-accent">
        {cta} <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
