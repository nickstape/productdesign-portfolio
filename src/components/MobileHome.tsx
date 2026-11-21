import Link from "next/link";
import { highlights2026, selectedWork, type SelectedWork } from "@/content/home-mobile";
import { CurrentlyReading } from "./CurrentlyReading";
import { Label } from "./Label";
import { SectionLabel } from "./SectionLabel";

/** Matches the mobile CurrentlyReading row (Figma 17/25), which these rows sit above. */
const ROW_TEXT = "font-sans text-[17px] leading-[25px]";

/**
 * Home below 834px — Figma "Mobile — Home" (3294:633). A plain text page: no tags, no cards,
 * no dividers. main's 16px gutter + 4px here = the 20px side padding in Figma.
 */
export function MobileHome() {
  return (
    <div className="px-0.5 pt-4 tablet:hidden">
      {/* Hero */}
      <SectionLabel>hello, i’m a designer based in London</SectionLabel>
      <h1 className="mt-2 font-sans text-[32px] leading-[1.15] font-normal text-text">
        I design products people can trust.
      </h1>
      <p className="mt-2 text-intro text-muted">
        I turn complex, high-stakes systems into products that feel simple.
      </p>

      <section className="mt-5">
        <Label as="h2">2026 highlights</Label>
        <ul className="mt-2 flex flex-col gap-[20px]">
          {highlights2026.map((item) => (
            <li key={item} className="flex items-baseline gap-1.5 text-intro text-text">
              <span aria-hidden="true" className="shrink-0 font-mono text-label text-accent">
                →
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-5">
        <Label as="h2">selected work</Label>
        <ol className="mt-1.5">
          {selectedWork.map((work, i) => (
            <WorkRow key={work.link.label} work={work} n={i + 1} />
          ))}
        </ol>
      </section>

      <section className="mt-5">
        <Label as="h2">currently reading</Label>
        <div className="mt-2">
          <CurrentlyReading />
        </div>
      </section>
    </div>
  );
}

/**
 * One selected-work row. The inline link's ::after covers the whole row (stretched link),
 * so the row is one tap target without nesting links. Rows are well over 44px tall.
 */
function WorkRow({ work, n }: { work: SelectedWork; n: number }) {
  const { link } = work;
  const linkClass =
    "text-accent underline after:absolute after:inset-0 after:content-['']";

  let name;
  if (!link.href) {
    name = <span className="text-accent underline">{link.label}</span>;
  } else if (link.external) {
    name = (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {link.label}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  } else {
    name = (
      <Link href={link.href} className={linkClass}>
        {link.label}
      </Link>
    );
  }

  return (
    <li className="relative flex min-h-11 items-baseline gap-[14px] py-1.5">
      <span aria-hidden="true" className="shrink-0 font-mono text-meta text-muted">
        {String(n).padStart(2, "0")}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className={`${ROW_TEXT} text-text`}>
          {work.before}
          {name}
          {work.after}
        </p>
        <p className="font-mono text-meta text-muted">{work.meta}</p>
      </div>
      <span aria-hidden="true" className="shrink-0 font-sans text-[18px] leading-[25px] text-accent">
        →
      </span>
    </li>
  );
}
