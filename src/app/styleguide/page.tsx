import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { SectionLabel } from "@/components/SectionLabel";
import { contrastRatio } from "@/lib/contrast";
import { LiveSize } from "./LiveSize";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const BG = "#0a0a0a";
const SURFACE = "#141414";

const colours = [
  { name: "bg", hex: BG, use: "Page background", swatch: "bg-bg" },
  { name: "surface", hex: SURFACE, use: "Cards, meta rows", swatch: "bg-surface" },
  { name: "text", hex: "#f5f5f5", use: "Primary text", swatch: "bg-text" },
  { name: "muted", hex: "#a3a3a3", use: "Secondary text (≥ 4.5:1 on bg)", swatch: "bg-muted" },
  { name: "line", hex: "#262626", use: "1px dividers, card borders", swatch: "bg-line" },
  { name: "accent", hex: "#42f57e", use: "Active nav, links, key numbers, small squares", swatch: "bg-accent" },
  { name: "annotate", hex: "#ff6b6b", use: "Case studies only: before/after annotation labels", swatch: "bg-annotate" },
] as const;

const fonts = [
  { name: "Instrument Sans", token: "font-sans", role: "Body and UI text", cls: "font-sans" },
  { name: "Space Grotesk", token: "font-display", role: "Case study headlines", cls: "font-display" },
  { name: "JetBrains Mono", token: "font-mono", role: "Section labels, metadata, years, captions", cls: "font-mono" },
  { name: "Fraunces", token: "font-wordmark", role: "Only the “Mary Fisher” wordmark", cls: "font-wordmark" },
] as const;

const typeScale = [
  { token: "text-h1", spec: "32–40 / 30 · lh 1.15", cls: "font-display text-h1", sample: "Designing the console behind Nigeria’s direct debit scheme" },
  { token: "text-headline", spec: "28 / 24 · lh 1.15", cls: "font-display text-headline", sample: "Back-office tooling for mandates" },
  { token: "text-case-title", spec: "32 / 28 · lh 1.15 · case study H1", cls: "font-display text-case-title", sample: "Designing the console behind Nigeria’s national direct debit scheme" },
  { token: "text-case-lead", spec: "47 / 26 · lh 1.1 · .tldr headline", cls: "font-display text-case-lead", sample: "NDD is where Nigeria’s recurring payments get permission." },
  { token: "text-case-headline", spec: "30 / 24 · lh 1.2 · section headlines, HMW", cls: "font-display text-case-headline", sample: "One system, carried through every job the product does." },
  { token: "text-case-intro", spec: "19 / 16 · lh 1.55 · case study intro", cls: "font-sans text-case-intro text-muted", sample: "I redesigned the end-to-end experience of NIBSS Direct Debit (NDD)." },
  { token: "text-case-body", spec: "17 / 16 · lh 1.65 · case study body", cls: "font-sans text-case-body", sample: "A payment authorisation passes through several hands before money moves." },
  { token: "text-card-title", spec: "22 / 15 · lh 1.3 · audience cards", cls: "font-sans text-card-title font-semibold", sample: "Raise the mandates" },
  { token: "text-next-title", spec: "26 / 21 · lh 1.25 · next case study", cls: "font-display text-next-title", sample: "Giving operators control of Direct Debit" },
  { token: "text-quote", spec: "31 / 21 · lh 1.25 · quotes", cls: "font-display text-quote", sample: "“Every time I see this login screen, I wonder if we should be using something else.”" },
  { token: "text-stat", spec: "29 / 22 · lh 1.15 · stat cards", cls: "font-sans font-semibold text-stat text-accent", sample: "32% → 12%" },
  { token: "text-outcome", spec: "48 / 32 · lh 1.2 · outcome numbers", cls: "font-display text-outcome text-accent", sample: "~26.55M" },
  { token: "text-intro", spec: "20 / 18 · lh 1.4", cls: "font-sans text-intro", sample: "Senior product designer for payments. I design the moments where money moves and people need to trust it." },
  { token: "text-body", spec: "18 / 16 · lh 1.4", cls: "font-sans text-body", sample: "Back-office tooling for users, mandates and failed collections, used daily by operations teams across 23+ integrated banks." },
  { token: "text-ui", spec: "16 fixed · sidebar, header name, footer links", cls: "font-sans text-ui", sample: "Work  About" },
  { token: "text-nav", spec: "14 mono fixed · top bar links", cls: "font-mono text-nav text-muted", sample: "Work  About  CV ↗" },
  { token: "text-toc", spec: "15 fixed · case study contents", cls: "font-sans text-toc text-muted", sample: "Design Explorations" },
  { token: "text-toc-sub", spec: "14 fixed · contents sub-items", cls: "font-sans text-toc-sub text-muted", sample: "exploration 1" },
  { token: "text-small", spec: "15 fixed · case study captions, CTA", cls: "font-sans text-small text-muted", sample: "of users now sign in with SSO" },
  { token: "text-label", spec: "13 mono", cls: "font-mono text-label text-muted", sample: ".selected work" },
  { token: "text-meta", spec: "12 mono", cls: "font-mono text-meta text-muted", sample: "02 · Bank / fintech · Lead product designer · 2023" },
] as const;

const grid = [1, 2, 3, 4, 6, 8, 12, 16] as const; // × 8px

export default function StyleguidePage() {
  return (
    <div className="flex flex-col gap-12 py-8">
      <header className="flex flex-col gap-2">
        <SectionLabel>styleguide</SectionLabel>
        <h1 className="font-display text-h1">Design tokens</h1>
        <p className="max-w-[640px] text-intro text-muted">
          Every colour, font and type size in the system. Sizes marked “rendered” are read from
          the browser, so resize the window to watch the fluid sizes grow from 390px to 834px.
        </p>
      </header>

      <Section label="colours">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {colours.map((c) => {
            const onBg = contrastRatio(c.hex, BG);
            const onSurface = contrastRatio(c.hex, SURFACE);
            return (
              <div key={c.name} className="flex flex-col overflow-hidden rounded-image border border-line">
                <div className={`h-12 ${c.swatch}`} />
                <div className="flex flex-col gap-1 bg-surface p-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-body">{c.name}</p>
                    <p className="font-mono text-meta text-muted">{c.hex.toUpperCase()}</p>
                  </div>
                  <p className="font-mono text-meta text-muted">
                    --color-{c.name} · {c.swatch} / text-{c.name}
                  </p>
                  <p className="text-body text-muted">{c.use}</p>
                  {c.name !== "bg" && (
                    <p className="font-mono text-meta text-muted">
                      <Ratio value={onBg} /> on bg · <Ratio value={onSurface} /> on surface
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section label="fonts">
        <div className="flex flex-col">
          {fonts.map((f) => (
            <div key={f.name} className="grid grid-cols-1 gap-1 border-t border-line py-3 lg:grid-cols-[280px_1fr] lg:gap-4">
              <div className="flex flex-col gap-0.5">
                <p className="text-body">{f.name}</p>
                <p className="font-mono text-meta text-muted">{f.token}</p>
                <p className="font-mono text-meta text-muted">{f.role}</p>
              </div>
              {f.cls === "font-wordmark" ? (
                <p
                  className="font-wordmark text-[clamp(64px,10vw,144px)] leading-none"
                  style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
                >
                  Mary Fisher
                </p>
              ) : (
                <div className={`flex flex-col gap-1 ${f.cls}`}>
                  <p className="text-headline">Money moves. People need to trust it.</p>
                  <p className="text-body text-muted">
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 ₦ £ % → ·
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section label="type scale">
        <div className="flex flex-col">
          {typeScale.map((t) => (
            <div key={t.token} className="grid grid-cols-1 gap-1 border-t border-line py-3 lg:grid-cols-[280px_1fr] lg:gap-4">
              <div className="flex flex-col gap-0.5">
                <p className="font-mono text-meta text-text">{t.token}</p>
                <p className="font-mono text-meta text-muted">desktop / mobile: {t.spec}</p>
              </div>
              <LiveSize>
                <p className={`max-w-[760px] ${t.cls}`}>{t.sample}</p>
              </LiveSize>
            </div>
          ))}
        </div>
      </Section>

      <Section label="labels">
        <div className="flex flex-wrap gap-4">
          {["hello", "experience", "tldr", "selected work"].map((l) => (
            <SectionLabel key={l}>{l}</SectionLabel>
          ))}
        </div>
        <p className="text-body text-muted">
          Lowercase mono, always starting with a dot. Never uppercase. Left-aligned only, never justified.
        </p>
      </Section>

      <Section label="spacing">
        <div className="flex flex-col gap-1">
          {grid.map((n) => (
            <div key={n} className="flex items-center gap-2">
              <span className="w-8 font-mono text-meta text-muted">{n * 8}px</span>
              <span className="h-1 bg-accent" style={{ width: n * 8 }} />
              <span className="font-mono text-meta text-muted">p-{n} · gap-{n}</span>
            </div>
          ))}
        </div>
        <p className="font-mono text-meta text-muted">
          --spacing: 8px · content column starts at x=145 on 1440 (var(--content-left))
        </p>
      </Section>

      <Section label="images">
        <p className="text-body text-muted">
          8px radius, 1px line border. Placeholders stand in for files not yet in /public.
        </p>
        <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-[2fr_1fr_1fr]">
          <ImagePlaceholder name="example-cover.png" width={536} height={402} />
          <ImagePlaceholder name="example-portrait.png" width={600} height={800} />
          <ImagePlaceholder name="example-tag.png" width={120} height={120} />
        </div>
      </Section>
    </div>
  );
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <SectionLabel as="h2">{label}</SectionLabel>
      {children}
    </section>
  );
}

function Ratio({ value }: { value: number }) {
  const pass = value >= 4.5;
  return (
    <span className={pass ? "text-accent" : "text-muted"}>
      {value.toFixed(2)}:1 {pass ? "AA" : "—"}
    </span>
  );
}
