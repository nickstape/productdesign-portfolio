import type { ReactNode } from "react";

/**
 * Figma "Feature notes" (3091:1739): stacked below 834 (3303:770); 834–1193 2-up, each card
 * as tall as its own content; ≥ 1194 3 equal cards in a row.
 */
export function StatRow({ children }: { children: ReactNode }) {
  return (
    <ul className="grid grid-cols-1 gap-1 tablet:grid-cols-2 tablet:items-start tablet:gap-3 desktop:grid-cols-3 desktop:items-stretch desktop:gap-6">
      {children}
    </ul>
  );
}

export function Stat({ value, children }: { value: ReactNode; children: ReactNode }) {
  return (
    <li className="flex flex-col gap-0.5 rounded-card border border-line bg-surface p-[14px] tablet:gap-[6px] tablet:p-[18px]">
      <p className="font-display text-stat text-accent tablet:font-sans tablet:font-semibold tablet:tracking-[-0.02em]">
        {value}
      </p>
      <div className="font-sans text-meta text-muted tablet:text-small">{children}</div>
    </li>
  );
}
