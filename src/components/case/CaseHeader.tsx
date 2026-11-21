import Link from "next/link";

type Props = {
  kicker: string;
  title: string;
  intro: string;
  role: string;
  platform: string;
  outcome: string;
  /** Outcome value in accent green (default). */
  outcomeAccent?: boolean;
};

/**
 * Figma "Intro" + "Summary card" (3074:585, 3074:590); mobile "Title" (3303:663).
 * Desktop starts at y 162 (below the 90px header band). ≥ 834 the meta panel is 3 cells split by 1px lines; below it, 3 label/value rows.
 */
export function CaseHeader({ kicker, title, intro, role, platform, outcome, outcomeAccent = true }: Props) {
  const meta = [
    { label: "role", value: role },
    { label: "platform", value: platform },
    { label: "outcome", value: outcome, accent: outcomeAccent },
  ];

  return (
    <header className="flex flex-col pt-[22px] tablet:pt-9 desktop:pt-20">
      {/* Mobile only: the 834 frame (3408:1169) has no back link; the top bar covers it. */}
      <Link
        href="/"
        className="mb-[14px] self-start font-mono text-meta text-muted transition-colors hover:text-text tablet:hidden"
      >
        <span aria-hidden="true">← </span>Home
      </Link>
      <p className="font-mono text-meta text-muted tablet:text-label">{kicker}</p>
      <h1 className="mt-[14px] max-w-[900px] font-display text-case-title font-normal tracking-[-0.01em] text-text desktop:mt-3">
        {title}
      </h1>
      <p className="mt-[14px] max-w-[1053px] font-sans text-case-intro text-text/75 desktop:mt-3">{intro}</p>

      <dl className="mt-[14px] flex flex-col gap-[12px] rounded-card bg-surface p-2 tablet:grid tablet:grid-cols-3 tablet:gap-px tablet:overflow-hidden tablet:border tablet:border-line tablet:bg-line tablet:p-0 desktop:mt-6">
        {meta.map((m) => (
          <div key={m.label} className="flex gap-[12px] tablet:flex-col tablet:gap-1 tablet:bg-surface tablet:p-[20px]">
            <dt className="w-[84px] shrink-0 pt-[3px] font-mono text-meta text-muted tablet:w-auto tablet:pt-0">
              .{m.label}
            </dt>
            <dd className={`font-sans text-ui ${m.accent ? "text-accent" : "text-text"}`}>{m.value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
