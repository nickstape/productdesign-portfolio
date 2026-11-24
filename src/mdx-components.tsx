import type { MDXComponents } from "mdx/types";
import {
  AudienceCard,
  AudienceCards,
  BackToSections,
  BeforeAfter,
  Bullets,
  CaseHeader,
  Constraints,
  Desktop,
  Exploration,
  Figure,
  Hero,
  HMW,
  HomeLink,
  Media,
  MetaRow,
  Mobile,
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
  Testimonial,
  Testimonials,
  Todo,
} from "@/components/case";

/**
 * Global MDX element styles, plus the case study template components (src/components/case).
 * Listed one by one (not `...import * as`) so every tag MDX can use is explicit here.
 */
const components: MDXComponents = {
  AudienceCard,
  AudienceCards,
  BackToSections,
  BeforeAfter,
  Bullets,
  CaseHeader,
  Constraints,
  Desktop,
  Exploration,
  Figure,
  Hero,
  HMW,
  HomeLink,
  Media,
  MetaRow,
  Mobile,
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
  Testimonial,
  Testimonials,
  Todo,
  p: (props) => <p className="font-sans text-case-body text-white" {...props} />,
  strong: (props) => <strong className="font-semibold" {...props} />,
  a: ({ href = "", children, ...props }) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className="text-accent underline underline-offset-4 hover:no-underline"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
