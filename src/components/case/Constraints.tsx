import type { ReactNode } from "react";

/**
 * Wraps a markdown list of constraints. Each item gets a green mono "→" (JetBrains Mono 13,
 * hidden from screen readers) and Instrument Sans 16 white text. 2 columns ≥ 834, 1 below.
 */
export function Constraints({ children }: { children: ReactNode }) {
  return (
    <div className="font-sans text-ui text-white [&_li]:pl-3 [&_li]:before:-ml-3 [&_li]:before:inline-block [&_li]:before:w-3 [&_li]:before:font-mono [&_li]:before:text-label [&_li]:before:text-accent [&_li]:before:content-['→'_/_''] [&_strong]:font-semibold [&_ul]:grid [&_ul]:grid-cols-1 [&_ul]:gap-2 tablet:[&_ul]:grid-cols-2 tablet:[&_ul]:gap-x-5">
      {children}
    </div>
  );
}
