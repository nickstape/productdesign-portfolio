import type { ReactNode } from "react";
import { SectionLabel } from "../SectionLabel";

type Props = {
  id: string;
  /** Lowercase, no dot: "tldr" renders ".tldr". */
  label: string;
  title?: ReactNode;
  /** Table of contents text (read from the MDX source); defaults to the label. */
  nav?: string;
  /** The larger .tldr headline (Figma 47px). */
  lead?: boolean;
  children?: ReactNode;
};

/**
 * Mono label, optional Space Grotesk 30 headline (`lead`: 47px), 48px above. A TOC target:
 * tabIndex -1 so the TOC can move focus here after scrolling. The headline is the h2;
 * without one, the label is.
 */
export function Section({ id, label, title, lead = false, children }: Props) {
  return (
    <section
      id={id}
      tabIndex={-1}
      className="mt-6 scroll-mt-[var(--case-scroll-offset)] focus:outline-none"
    >
      <SectionLabel as={title ? "p" : "h2"}>{label}</SectionLabel>
      {title && (
        <h2
          className={`mt-[14px] font-display font-normal text-text ${
            lead ? "text-case-lead tracking-[-0.01em]" : "text-case-headline"
          }`}
        >
          {title}
        </h2>
      )}
      {children && (
        <div className={`flex flex-col gap-2 ${title ? "mt-2 tablet:mt-[22px]" : "mt-[14px]"}`}>{children}</div>
      )}
    </section>
  );
}
