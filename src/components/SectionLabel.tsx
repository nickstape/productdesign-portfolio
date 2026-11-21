import type { ElementType } from "react";

type Props = {
  /** Lowercase, no leading dot — the dot is added here. e.g. "hello" → ".hello" */
  children: string;
  as?: ElementType;
  className?: string;
};

/** Mono section label: lowercase, starts with a dot. Never uppercased. */
export function SectionLabel({ children, as: Tag = "p", className = "" }: Props) {
  return (
    <Tag className={`font-mono text-label text-muted normal-case ${className}`}>
      .{children}
    </Tag>
  );
}
