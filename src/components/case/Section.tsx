import type { ReactNode } from "react";
import { SectionLabel } from "../SectionLabel";

type Props = {
  id: string;
  /** Lowercase, no dot: "tldr" renders ".tldr". */
  label: string;
  title?: ReactNode;
  /** Table of contents text (read from the MDX source); defaults to the label. */
  nav?: string;
  children?: ReactNode;
};

/**
 * Mono label, optional Space Grotesk 28 headline, 64px above. A TOC target: tabIndex -1 so the
 * TOC can move focus here after scrolling. The headline is the h2; without one, the label is.
 */
export function Section({ id, label, title, children }: Props) {
  return (
    <section
      id={id}
      tabIndex={-1}
      className="mt-8 scroll-mt-[var(--case-scroll-offset)] focus:outline-none"
    >
      <SectionLabel as={title ? "p" : "h2"}>{label}</SectionLabel>
      {title && (
        <h2 className="mt-[14px] font-display text-headline font-normal text-text">{title}</h2>
      )}
      {children && <div className="mt-3 flex flex-col gap-3">{children}</div>}
    </section>
  );
}
