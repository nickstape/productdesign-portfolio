import type { ReactNode } from "react";
import { Desktop, Mobile } from "./Breakpoint";
import { HomeLink } from "./HomeLink";
import { MetaRow } from "./MetaRow";
import { Todo } from "./Todo";

type Props = {
  kicker: string;
  title: string;
  intro: string;
  /** { "phrase in the intro": "https://source" }: each phrase becomes an accent source link. */
  introLinks?: Record<string, string>;
  role: string;
  /** Missing → a visible TODO. */
  timeline?: string;
  platform: string;
  /** Platform text below 834, if it differs. */
  platformMobile?: string;
  outcome: string;
  /** Outcome value in accent green (default). */
  outcomeAccent?: boolean;
};

/**
 * Figma "Intro" + "Summary card" (3074:585, 3074:590); mobile "Title" (3303:663).
 * Desktop starts at y 162 (below the 90px header band). Then the <MetaRow>.
 */
export function CaseHeader({
  kicker,
  title,
  intro,
  introLinks = {},
  role,
  timeline,
  platform,
  platformMobile,
  outcome,
  outcomeAccent = true,
}: Props) {
  return (
    <header className="flex flex-col pt-[22px] tablet:pt-9 desktop:pt-20">
      {/* Mobile only: the 834 frame (3408:1169) has no back link; the top bar covers it. */}
      <HomeLink className="mb-[14px]" />
      <p className="font-mono text-meta text-muted tablet:text-label">{kicker}</p>
      <h1 className="mt-[14px] max-w-[900px] font-display text-case-title font-normal tracking-[-0.01em] text-text desktop:mt-3">
        {title}
      </h1>
      <p className="mt-[14px] max-w-[1053px] font-sans text-case-intro text-text/75 desktop:mt-3">
        {linkify(intro, introLinks)}
      </p>

      <div className="mt-[14px] desktop:mt-6">
        <MetaRow
          role={role}
          timeline={timeline ?? <Todo>timeline</Todo>}
          platform={
            platformMobile ? (
              <>
                <Desktop as="span">{platform}</Desktop>
                <Mobile as="span">{platformMobile}</Mobile>
              </>
            ) : (
              platform
            )
          }
          outcome={outcome}
          outcomeAccent={outcomeAccent}
        />
      </div>
    </header>
  );
}

/** Wraps the first occurrence of each phrase in an external source link (accent, new tab). */
function linkify(text: string, links: Record<string, string>): ReactNode[] {
  let parts: ReactNode[] = [text];
  for (const [phrase, href] of Object.entries(links)) {
    parts = parts.flatMap<ReactNode>((part) => {
      if (typeof part !== "string") return [part];
      const i = part.indexOf(phrase);
      if (i < 0) return [part];
      return [
        part.slice(0, i),
        <a
          key={phrase}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline underline-offset-4 hover:no-underline"
        >
          {phrase}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>,
        part.slice(i + phrase.length),
      ];
    });
  }
  return parts;
}
