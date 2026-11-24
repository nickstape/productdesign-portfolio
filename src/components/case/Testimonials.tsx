import type { ReactNode } from "react";

/** 1–2 <Testimonial>s: side by side in equal columns ≥ 834 (one fills the row), stacked below. */
export function Testimonials({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 tablet:mt-6 tablet:auto-cols-fr tablet:grid-flow-col tablet:gap-5">{children}</div>
  );
}

type Props = {
  /** The quote, without quote marks: curly quotes are added (straight or curly ones at the ends are dropped). */
  quote: string;
  /** Attribution, e.g. "Operations lead, partner bank". */
  by: ReactNode;
  /** Hide this one below 834. */
  desktopOnly?: boolean;
};

/** Space Grotesk 31 / 20 quote in #F5F5F2, mono 13 accent attribution. */
export function Testimonial({ quote, by, desktopOnly = false }: Props) {
  const text = quote.trim().replace(/^["“”]+|["“”]+$/g, "");
  return (
    <figure className={`${desktopOnly ? "hidden tablet:flex" : "flex"} flex-col gap-2`}>
      <blockquote className="font-display text-testimonial text-ink">
        <p>“{text}”</p>
      </blockquote>
      <figcaption className="font-mono text-label text-accent">{by}</figcaption>
    </figure>
  );
}
