@AGENTS.md

# Mary Fisher — product design portfolio

Next.js (App Router, `src/`), TypeScript, Tailwind CSS v4 (CSS-first), MDX, Motion (`motion/react`), next/font. Deployed on Vercel. Node 22 (`.nvmrc`).

Pages are built one Figma screen at a time. Match the design closely: spacing, type sizes and alignment matter more than speed. No UI kits, no component libraries, no placeholder gradients or stock styling.

## Tokens
- All tokens live in `src/app/globals.css` under `@theme`. There is no `tailwind.config` file. Tailwind's stock palette is removed, so only token colours exist.
- Colours (dark only): `bg`, `surface`, `text`, `muted`, `line`, `accent`. Accent is a signal (active nav, links, key numbers, small squares), never a fill.
- Fonts: `font-sans` (Instrument Sans, body/UI), `font-display` (Space Grotesk, case study headlines), `font-mono` (JetBrains Mono, labels/meta/years/captions), `font-wordmark` (Fraunces, only the "Mary Fisher" wordmark).
- Type: `text-body`, `text-intro`, `text-h1`, `text-headline` switch desktop/mobile size at 1024px automatically; `text-label` (13 mono), `text-meta` (12 mono).
- Spacing: `--spacing` is 8px, so `p-1` = 8px, `p-2` = 16px, and so on. Stay on the 8px grid.
- Content column starts at x=145 on 1440 (`var(--content-left)`).
- `/styleguide` renders every token. Check it after any token change.

## Conventions
- Section labels: lowercase mono, starting with a dot (".hello", ".experience", ".tldr"). Use `<SectionLabel>`. Never uppercase them.
- Left-aligned text only. Never justify.
- Images: 8px radius (`rounded-image`), 1px `border-line` on dark.

## Images
- `src/content/images.ts` is the only place image paths live. Files go in `public/assets/{shared,home/tags,about/gallery,work/ndd,work/tns}`.
- When given an "Images for this screen" table, add one entry per row to `images.ts` with key, src, alt, width and height exactly as given, and use them on that screen.
- Render with `<ContentImage img={images.key} />` (next/image with the manifest width/height; CSS controls display size). It falls back to `<ImagePlaceholder>` when the file isn't in `public/` yet. Always tell the user which files are missing.
- Never hard-code an image path, invent alt text, or create, download or generate an image.

## Other
- `legacy/` holds the original static HTML version, for reference only.
