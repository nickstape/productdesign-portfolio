import type { MDXComponents } from "mdx/types";
import {
  AudienceCard,
  AudienceCards,
  BeforeAfter,
  Bullets,
  CaseHeader,
  Exploration,
  Figure,
  Hero,
  HMW,
  NextCase,
  Outcome,
  OutcomeStat,
  Popup,
  ProcessSteps,
  QuoteBlock,
  Section,
  Stakes,
  Stat,
  StatRow,
  Step,
  Todo,
} from "@/components/case";

/**
 * Global MDX element styles, plus the case study template components (src/components/case).
 * Listed one by one (not `...import * as`) so every tag MDX can use is explicit here.
 */
const components: MDXComponents = {
  AudienceCard,
  AudienceCards,
  BeforeAfter,
  Bullets,
  CaseHeader,
  Exploration,
  Figure,
  Hero,
  HMW,
  NextCase,
  Outcome,
  OutcomeStat,
  Popup,
  ProcessSteps,
  QuoteBlock,
  Section,
  Stakes,
  Stat,
  StatRow,
  Step,
  Todo,
  p: (props) => <p className="font-sans text-case-body text-text/80" {...props} />,
  strong: (props) => <strong className="font-semibold" {...props} />,
  a: (props) => <a className="text-accent underline underline-offset-4 hover:no-underline" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
