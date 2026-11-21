import type { ReactNode } from "react";

/** Figma "Feature notes" (3091:1739): 3 stat cards ≥ 834, stacked below (3303:770). */
export function StatRow({ children }: { children: ReactNode }) {
  return <ul className="grid grid-cols-1 gap-1 tablet:grid-cols-3 tablet:gap-3 desktop:gap-6">{children}</ul>;
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
