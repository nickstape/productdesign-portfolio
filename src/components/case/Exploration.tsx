import type { ReactNode } from "react";
import { explorationId } from "@/lib/case-studies";
import { SectionLabel } from "../SectionLabel";

/** [label, text]. A null label hides it (Figma hides some, e.g. the answer under "problem"). */
type Row = [label: string | null, content: ReactNode];

type Props = {
  n: number;
  title: string;
  /** Text between the label and the title (Figma exploration 01). */
  intro?: ReactNode;
  /**
   * Mini table under the title. The first row is muted; later rows are the answer
   * (accent label, text colour), e.g. [["problem", …], [null, …]] or [["considered", …], ["chose", …]].
   */
  rows?: Row[];
  /** Right-hand column at ≥ 834 (Figma explorations 03 and 04, 834 and up), usually a <Figure>. */
  aside?: ReactNode;
  children?: ReactNode;
};

/**
 * Figma "Decision block": ".exploration 0n", optional intro, Space Grotesk 28 title, the rows,
 * then children (text, images, stats). Nested under its <Section> in the table of contents.
 */
export function Exploration({ n, title, intro, rows = [], aside, children }: Props) {
  const main = (
    <div className="flex min-w-0 flex-col">
      <SectionLabel>{`exploration ${String(n).padStart(2, "0")}`}</SectionLabel>
      {intro && <div className="mt-[14px] font-sans text-case-body text-text/80">{intro}</div>}
      <h3 className={`font-display text-headline font-normal text-text ${intro ? "mt-6" : "mt-2"}`}>{title}</h3>
      {rows.length > 0 && (
        <dl className="mt-2 flex flex-col gap-[10px]">
          {rows.map(([label, content], i) => (
            <div
              key={i}
              className="flex flex-col gap-0.5 tablet:flex-row tablet:items-baseline tablet:gap-[12px]"
            >
              {label ? (
                <dt className={`w-[88px] shrink-0 font-mono text-meta ${i > 0 ? "text-accent" : "text-muted"}`}>
                  {label}
                </dt>
              ) : (
                <dt className="sr-only">{i > 0 ? "solution" : "problem"}</dt>
              )}
              <dd className={`font-sans text-ui ${i > 0 ? "text-text" : "text-text/75"}`}>{content}</dd>
            </div>
          ))}
        </dl>
      )}
      {children && <div className="mt-2 flex flex-col gap-5">{children}</div>}
    </div>
  );

  return (
    <section
      id={explorationId(n)}
      tabIndex={-1}
      className={`mt-6 scroll-mt-[var(--case-scroll-offset)] focus:outline-none ${
        aside ? "flex flex-col gap-3 tablet:grid tablet:grid-cols-2 tablet:items-start tablet:gap-5" : ""
      }`}
    >
      {main}
      {aside && <div className="min-w-0">{aside}</div>}
    </section>
  );
}
