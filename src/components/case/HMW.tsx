import type { ReactNode } from "react";

/** The problem statement as a large question, then the business case. Figma 3163:648. */
export function HMW({ children, why }: { children: ReactNode; why: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="font-display text-quote text-text">{children}</div>
      <p className="font-sans text-body text-text">
        <strong className="font-semibold">Why it mattered to the business:</strong> {why}
      </p>
    </div>
  );
}
