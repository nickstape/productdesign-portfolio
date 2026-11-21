import type { ReactNode } from "react";

/** Wraps a markdown list (constraints, lessons). Arrows below 834, dots above (Figma). */
export function Bullets({ children }: { children: ReactNode }) {
  return (
    <div className="font-sans text-case-body text-text/80 [&_li]:relative [&_li]:pl-[20px] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-muted [&_li]:before:content-['→'] tablet:[&_li]:before:content-['•'] [&_strong]:font-semibold [&_strong]:text-text [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1 tablet:[&_ul]:gap-0">
      {children}
    </div>
  );
}
