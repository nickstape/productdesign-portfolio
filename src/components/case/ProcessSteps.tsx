import type { ReactNode } from "react";

/** Figma "Approach steps" (3074:832): a row of cards ≥ 834; a numbered list below (3303:723). */
export function ProcessSteps({ children }: { children: ReactNode }) {
  return (
    <ol className="flex flex-col tablet:grid tablet:auto-cols-fr tablet:grid-flow-col tablet:gap-[10px] tablet:pt-[18px] tablet:pb-1">
      {children}
    </ol>
  );
}

type StepProps = {
  n: number;
  title: string;
  /** Small pill under the text, e.g. "C-suite approval". */
  pill?: string;
  /** Faint accent fill and border (the last step, Figma "Step 06"). */
  highlight?: boolean;
  children: ReactNode;
};

export function Step({ n, title, pill, highlight = false, children }: StepProps) {
  return (
    <li
      className={`flex gap-[14px] py-1.5 tablet:flex-col tablet:gap-[6px] tablet:rounded-card tablet:p-2 ${
        highlight ? "tablet:border-2 tablet:border-accent/10 tablet:bg-accent/5" : "tablet:border tablet:border-line"
      }`}
    >
      <span className={`shrink-0 font-mono text-label ${highlight ? "text-accent tablet:text-accent/40" : "text-muted"}`}>
        {String(n).padStart(2, "0")}
      </span>
      <div className="flex flex-col gap-[2px] tablet:gap-[6px]">
        <p className="font-sans text-ui font-semibold text-text tablet:text-case-body tablet:leading-[1.3]">{title}</p>
        <div className="font-sans text-nav leading-[1.45] text-muted">{children}</div>
        {pill && (
          <span className="mt-0.5 self-start rounded-full bg-text px-1 py-[3px] font-sans text-meta font-semibold text-bg">
            {pill}
          </span>
        )}
      </div>
    </li>
  );
}
