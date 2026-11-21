import type { ReactNode } from "react";

/** Figma "Organisations" (3074:794): 3 equal cards ≥ 834, 36px below the text; rows split by lines below (3303:699). */
export function AudienceCards({ children }: { children: ReactNode }) {
  return <ul className="flex flex-col tablet:mt-[20px] tablet:grid tablet:grid-cols-3 tablet:gap-[12px]">{children}</ul>;
}

type CardProps = {
  group: string;
  title: string;
  /** Roles, in mono accent at the foot of the card. */
  roles: string;
  children?: ReactNode;
};

export function AudienceCard({ group, title, roles, children }: CardProps) {
  return (
    <li className="flex flex-col gap-[3px] border-t border-line py-1.5 tablet:gap-1 tablet:rounded-card tablet:border tablet:border-accent/10 tablet:bg-bg tablet:p-3">
      <p className="font-mono text-meta text-muted tablet:tracking-[0.1em] tablet:uppercase">{group}</p>
      <p className="font-sans text-card-title font-semibold text-text tablet:mt-0.5">{title}</p>
      {children && <div className="hidden font-sans text-ui leading-[1.55] text-muted tablet:block">{children}</div>}
      <p className="font-mono text-meta text-accent tablet:mt-1 tablet:text-nav">{roles}</p>
    </li>
  );
}
