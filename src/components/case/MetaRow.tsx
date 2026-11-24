import type { ReactNode } from "react";

type Props = {
  role: ReactNode;
  timeline: ReactNode;
  platform: ReactNode;
  outcome: ReactNode;
  /** Outcome value in accent green (default). false: white like the others. */
  outcomeAccent?: boolean;
};

/**
 * Case study summary: .role / .timeline / .platform / .outcome in one surface panel
 * (1px line border, 12px radius). ≥ 834: one row of 4 equal cells, label above value
 * (mono 12, Instrument Sans 16). Below: stacked rows, a 96px label column, value 15.
 */
export function MetaRow({ role, timeline, platform, outcome, outcomeAccent = true }: Props) {
  const cells = [
    { label: "role", value: role },
    { label: "timeline", value: timeline },
    { label: "platform", value: platform },
    { label: "outcome", value: outcome, accent: outcomeAccent },
  ];

  return (
    <dl className="flex flex-col gap-[12px] rounded-panel border border-line bg-surface p-2 tablet:grid tablet:grid-cols-4 tablet:gap-0 tablet:p-0">
      {cells.map((c) => (
        <div key={c.label} className="grid grid-cols-[96px_1fr] items-baseline tablet:flex tablet:flex-col tablet:gap-1 tablet:p-[20px]">
          <dt className="font-mono text-meta text-quiet">.{c.label}</dt>
          <dd className={`font-sans text-small tablet:text-ui ${c.accent ? "text-accent" : "text-white"}`}>{c.value}</dd>
        </div>
      ))}
    </dl>
  );
}
