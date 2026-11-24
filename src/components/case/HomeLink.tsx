import Link from "next/link";

/** Mobile only (< 834): "← Home" above the case study kicker. 834 and up, the top bar covers it. */
export function HomeLink({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`relative touch-target self-start font-mono text-meta text-subtle transition-colors hover:text-text tablet:hidden ${className}`}
    >
      <span aria-hidden="true">← </span>Home
    </Link>
  );
}
