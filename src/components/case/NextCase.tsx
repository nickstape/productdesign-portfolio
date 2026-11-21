import Link from "next/link";

type Props = {
  href: string;
  title: string;
  /** e.g. "Read case study 02" (the arrow is added). */
  cta: string;
};

/** Figma "Next case study" (3074:655): one surface panel, the whole panel is the link. */
export function NextCase({ href, title, cta }: Props) {
  return (
    <Link
      href={href}
      className="group mt-6 flex flex-col gap-2 rounded-card bg-surface p-[18px] tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-4 tablet:p-4"
    >
      <span className="flex flex-col gap-[6px]">
        <span className="font-mono text-meta text-muted">.next</span>
        <span className="font-display text-next-title text-text">{title}</span>
      </span>
      <span className="shrink-0 font-sans text-small text-text transition-colors group-hover:text-accent">
        {cta} <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
