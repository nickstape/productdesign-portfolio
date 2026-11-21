import type { ReactNode } from "react";

/** One line: bold lead-in, then muted text. */
export function Stakes({ lead, children }: { lead: string; children: ReactNode }) {
  return (
    <p className="font-sans text-ui text-muted">
      <strong className="font-semibold text-text">{lead}</strong> {children}
    </p>
  );
}
