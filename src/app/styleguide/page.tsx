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
  { token: "text-intro", spec: "20 / 18 · lh 1.4", cls: "font-sans text-intro", sample: "Senior product designer for payments. I design the moments where money moves and people need to trust it." },
  { token: "text-body", spec: "18 / 16 · lh 1.4", cls: "font-sans text-body", sample: "Back-office tooling for users, mandates and failed collections, used daily by operations teams across 23+ integrated banks." },
  { token: "text-label", spec: "13 mono", cls: "font-mono text-label text-muted", sample: ".selected work" },
  { token: "text-meta", spec: "12 mono", cls: "font-mono text-meta text-muted", sample: "02 · Bank / fintech · Lead product designer · 2023" },
] as const;

const grid = [1, 2, 3, 4, 6, 8, 12, 16] as const; // × 8px

export default function StyleguidePage() {
  return (
    <main className="flex flex-col gap-12 px-2 py-8 lg:pr-8 lg:pl-[var(--content-left)]">
      <header className="flex flex-col gap-2">
        <SectionLabel>styleguide</SectionLabel>
        <h1 className="font-display text-h1">Design tokens</h1>
        <p className="max-w-[640px] text-intro text-muted">
          Every colour, font and type size in the system. Sizes marked “rendered” are read from
          the browser, so resize the window to see the mobile values below 1024px.
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
    </main>
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
