import type { ReactNode } from "react";

/** Figma "Rationale" (3163:648): the problem as a Space Grotesk 30 question, then the business case. */
export function HMW({ children, why }: { children: ReactNode; why: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="font-display text-case-headline text-text">{children}</div>
      <p className="font-sans text-case-body text-text">
        <strong className="font-semibold">Why it mattered to the business:</strong> {why}
      </p>
    </div>
  );
}
