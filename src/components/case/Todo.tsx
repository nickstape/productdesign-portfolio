import type { ReactNode } from "react";

/** Visible marker for copy, numbers or sources still to confirm. Remove once resolved. */
export function Todo({ children }: { children?: ReactNode }) {
  return (
    <mark className="[box-decoration-break:clone] rounded-[4px] bg-transparent px-0.5 font-mono text-meta text-annotate outline outline-1 outline-annotate">
      TODO{children ? <>: {children}</> : null}
    </mark>
  );
}
