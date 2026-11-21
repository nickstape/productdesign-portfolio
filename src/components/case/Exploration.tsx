import type { ReactNode } from "react";
import { explorationId } from "@/lib/case-studies";
import { SectionLabel } from "../SectionLabel";

type Props = {
  n: number;
  title: string;
  problem?: ReactNode;
  solution?: ReactNode;
  children?: ReactNode;
};

/**
 * Figma "Decision block": ".exploration 0n", title, a two-row problem / solution table, then
 * children (images, stats). Nested under its <Section> in the table of contents.
 */
export function Exploration({ n, title, problem, solution, children }: Props) {
  const rows = [
    { label: "problem", value: problem, accent: false },
    { label: "solution", value: solution, accent: true },
  ].filter((r) => r.value);

  return (
    <section
      id={explorationId(n)}
      tabIndex={-1}
      className="mt-3 flex scroll-mt-[var(--case-scroll-offset)] flex-col focus:outline-none tablet:mt-6"
    >
      <SectionLabel>{`exploration ${String(n).padStart(2, "0")}`}</SectionLabel>
      <h3 className="mt-[14px] font-display text-headline font-normal text-text">{title}</h3>
      {rows.length > 0 && (
        <dl className="mt-2 flex flex-col gap-[10px]">
          {rows.map((r) => (
            <div key={r.label} className="flex flex-col gap-0.5 tablet:flex-row tablet:items-baseline tablet:gap-[12px]">
              <dt className={`w-[88px] shrink-0 font-mono text-meta ${r.accent ? "text-accent" : "text-muted"}`}>
                {r.label}
              </dt>
              <dd className={`font-sans text-ui ${r.accent ? "text-text" : "text-muted"}`}>{r.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {children && <div className="mt-3 flex flex-col gap-3">{children}</div>}
    </section>
  );
}
