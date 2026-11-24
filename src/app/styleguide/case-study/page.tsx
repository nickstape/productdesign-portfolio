import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  BackToSections,
  BeforeAfter,
  Constraints,
  Desktop,
  Exploration,
  Figure,
  HomeLink,
  Media,
  MetaRow,
  Mobile,
  Testimonial,
  Testimonials,
} from "@/components/case";
import { JumpTo } from "@/components/case/JumpTo";
import { SIZES_FULL } from "@/components/case/Media";
import { SectionLabel } from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Case study components",
  robots: { index: false, follow: false },
};

/** Test page for the reusable case study components. Check it at 1440 and 390. */
const demos = [
  { id: "meta-row", label: "MetaRow" },
  { id: "media", label: "Media" },
  { id: "constraints", label: "Constraints" },
  { id: "testimonials", label: "Testimonials" },
  { id: "breakpoints", label: "Desktop / Mobile" },
  { id: "exploration", label: "Exploration" },
  { id: "links", label: "Mobile links" },
];

export default function CaseStudyComponentsPage() {
  return (
    // data-case: the case study colour scope (labels #9A9A96), as on /work/[slug].
    <div data-case className="flex flex-col py-8">
      <header className="flex flex-col gap-2">
        <HomeLink />
        <SectionLabel>styleguide / case study</SectionLabel>
        <h1 className="font-display text-h1">Case study components</h1>
        <p className="max-w-[640px] text-intro text-muted">
          The reusable blocks NDD and TNS are built from. Media uses existing NDD keys; a file that
          isn’t in /public yet shows its placeholder. Text in [brackets] is sample copy.
        </p>
      </header>

      <JumpTo items={demos.map((d) => ({ ...d, children: [] }))} />

      <Demo id="meta-row" name="<MetaRow>" note="≥ 834: 4 equal cells. Below: stacked, 96px label column.">
        <MetaRow role="[Lead product designer]" timeline="[2023 – 2024]" platform="Desktop web" outcome="[23+ integrations]" />
      </Demo>

      <Demo id="media" name="<Media>" note="Image (nddProblem) with caption, then video (nddHero: autoplays, pauses off screen).">
        <Media img="nddProblem" w={1152} h={576} fit="cover" sizes={SIZES_FULL} caption="Image: next/image in the frame" />
        <Media img="nddHero" w={1152} h={576} fit="cover" sizes={SIZES_FULL} caption="Video: autoplay, muted, loop, poster under reduced motion" />
        <Figure img="nddExp02Sidebar" w={471} h={564} maxWidth={471} caption="<Figure>: Media with a max width" />
      </Demo>

      <Demo id="constraints" name="<Constraints>" note="2 columns ≥ 834, 1 below.">
        <Constraints>
          <ul>
            <li>Every action needs an audit trail and, for money-moving steps, a second approver.</li>
            <li>Users range from NIBSS super-admins to bank branch staff with little training.</li>
            <li>
              <strong>Limited engineering time</strong>, so work had to be released in stages, each one useful on its own.
            </li>
            <li>[A fourth constraint, to show the grid filling two rows.]</li>
          </ul>
        </Constraints>
      </Demo>

      <Demo id="testimonials" name="<Testimonials>" note="Side by side ≥ 834, stacked below. The second is desktopOnly, so it’s hidden below 834.">
        <Testimonials>
          <Testimonial
            quote="Every time I see this login screen, I wonder if we should be using something else."
            by="[Attribution]"
          />
          <Testimonial quote="[A second quote, shown at 834 and up only.]" by="[Attribution]" desktopOnly />
        </Testimonials>
        <Testimonials>
          <Testimonial quote="[A single quote fills the row.]" by="[Attribution]" />
        </Testimonials>
      </Demo>

      <Demo id="breakpoints" name="<Desktop> / <Mobile>" note="CSS only. Only one of the two paragraphs below shows.">
        <Desktop>
          <p className="font-sans text-case-body text-white">[Desktop copy: shown at 834px and up.]</p>
        </Desktop>
        <Mobile>
          <p className="font-sans text-case-body text-white">[Mobile copy: shown below 834px.]</p>
        </Mobile>
      </Demo>

      <Demo id="exploration" name="<Exploration>" note="Text left + media right (aside), then full-width <BeforeAfter> (stacked below 834).">
        <Exploration
          n={3}
          title="Dynamic log filtering"
          rows={[
            ["problem", "The existing mandate page showed a chronological list of log entries with no filtering specific for containers."],
            [null, "The admin workspace brings the whole scheme into one place."],
          ]}
          aside={<Figure img="nddExp03Filtering" w={556} h={318} caption="Filtering system for easy search" />}
        />
        <Exploration n={1} title="Single sign-on that fits how banks already work">
          <p className="font-sans text-case-body text-white">[Body copy above the comparison.]</p>
          <BeforeAfter
            before="nddExp01Before"
            after="nddExp01After"
            annotations={[{ x: 6, y: 10, text: "No visual hierarchy" }]}
          />
        </Exploration>
      </Demo>

      <Demo id="links" name="<HomeLink> / <BackToSections>" note="Below 834 only (also at the top of this page). Back to sections scrolls to the chip strip.">
        <p className="font-mono text-meta text-muted tablet:hidden">↓ the link below is live</p>
        <p className="hidden font-mono text-meta text-muted tablet:block">[Hidden at this width: narrow the window below 834px.]</p>
        <BackToSections />
      </Demo>
    </div>
  );
}

function Demo({ id, name, note, children }: { id: string; name: string; note: string; children: ReactNode }) {
  return (
    <section id={id} className="mt-8 flex scroll-mt-[var(--case-scroll-offset)] flex-col gap-3 border-t border-line pt-4">
      <div className="flex flex-col gap-0.5">
        <p className="font-mono text-label text-text">{name}</p>
        <p className="font-mono text-meta text-muted">{note}</p>
      </div>
      {children}
    </section>
  );
}
