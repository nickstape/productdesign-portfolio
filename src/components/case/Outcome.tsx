import type { ReactNode } from "react";

/**
 * Figma "Outcome stats" (3074:641): large numbers, no cards, caption under each.
 * Stacked below 834, 2-up 834–1193 (3408:1375), 3-up ≥ 1194.
 */
export function Outcome({ children }: { children: ReactNode }) {
  return (
    <ul className="grid grid-cols-1 gap-3 tablet:mt-[14px] tablet:grid-cols-2 tablet:gap-4 desktop:grid-cols-3">
      {children}
    </ul>
  );
}

type Props = {
  value: ReactNode;
  /** Accent green for numbers (default); false for words, e.g. "Shipped". */
  accent?: boolean;
  children: ReactNode;
};

export function OutcomeStat({ value, accent = true, children }: Props) {
  return (
    <li className="flex flex-col gap-1">
      <p className={`font-display text-outcome ${accent ? "text-accent" : "text-text"}`}>{value}</p>
      <div className="max-w-[270px] font-sans text-small text-muted">{children}</div>
    </li>
  );
}
