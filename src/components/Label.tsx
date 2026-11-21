import type { ElementType } from "react";

type Props = {
  /** Lowercase, no leading dot — the dot is added here. "experience" → ".experience" */
  children: string;
  /** Green instead of muted. */
  accent?: boolean;
  as?: ElementType;
  className?: string;
};

/** Dot-prefixed lowercase mono label (JetBrains Mono 13). Never uppercased. */
export function Label({ children, accent = false, as: Tag = "p", className = "" }: Props) {
  return (
    <Tag
      className={`font-mono text-label normal-case ${accent ? "text-accent" : "text-muted"} ${className}`}
    >
      .{children}
    </Tag>
  );
}
