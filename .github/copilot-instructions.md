# Project rules — Mary Fisher product design portfolio

Pages are built one Figma screen at a time. Match the design closely: spacing, type sizes and alignment matter more than speed.

## Stack
- Next.js 16, App Router, code in `src/`. TypeScript throughout.
- This Next version has breaking changes, so check `node_modules/next/dist/docs/` before using an API.
- Tailwind CSS v4, CSS-first. All tokens live in `src/app/globals.css` under `@theme`. There is no `tailwind.config` file; don't add one.
- MDX via `@next/mdx`. Case study content goes in `src/content/work/*.mdx`.
- Fonts via `next/font/google` in `src/app/fonts.ts`, with `display: "swap"`.
- Motion (`motion/react`) for small interactions only. Deployed on Vercel. Node 22.
- No UI kits, no component libraries, no placeholder gradients or stock styling.

## Colour tokens (dark only, no light mode)
Tailwind's stock palette is removed. Use only these, e.g. `bg-surface`, `text-muted`, `border-line`:
- `bg` #0A0A0A: page
- `surface` #141414: cards, meta rows
- `text` #F5F5F5: primary text
- `muted` #A3A3A3: secondary text (must stay ≥ 4.5:1 on bg)
- `line` #262626: 1px dividers and card borders
- `accent` #42F57E: active nav, links, key numbers, small squares. Use sparingly; it's a signal, never a fill.

## Font tokens
- `font-sans`: Instrument Sans, for body and UI text
- `font-display`: Space Grotesk, for case study headlines
- `font-mono`: JetBrains Mono, for section labels, metadata, years and captions
- `font-wordmark`: Fraunces, only for the giant "Mary Fisher" wordmark

## Type scale (desktop / mobile; switches at 1024px automatically)
- `text-body` 18/16 and `text-intro` 20/18, line-height 1.4
- `text-h1` 32–40/30 and `text-headline` 28/24, line-height 1.15
- `text-label` 13 mono, `text-meta` 12 mono
- Don't hard-code font sizes or colours that a token covers. `/styleguide` renders every token.

## Conventions
- Section labels are lowercase mono and start with a dot: ".hello", ".experience", ".tldr". Use `<SectionLabel>`. Never uppercase them.
- Left-aligned text only. Never justify.
- 8px spacing grid: `--spacing` is 8px, so `p-1` = 8px, `p-2` = 16px and so on.
- Content column starts at x=145 on a 1440 frame, right of the sidebar: `var(--content-left)`.
- Images get an 8px radius (`rounded-image`) and a 1px `border-line` on dark.

## Images
- `src/content/images.ts` is the only place image paths live (`type Img = { src, alt, width, height }`).
- Files go in `public/assets/{shared,home/tags,about/gallery,work/ndd,work/tns}`.
- For an "Images for this screen" table, add one entry per row to `images.ts`. Copy key, src, alt, width and height exactly as given, and use them on that screen.
- Render with `<ContentImage img={images.key} />`. It uses `next/image` with the manifest width/height, and CSS controls the display size.
- If a file isn't in the folder yet, `ContentImage` falls back to `<ImagePlaceholder>`. Tell the user which files are missing. The real image swaps in once the file appears.
- Never hard-code an image path, invent alt text, or create, download or generate an image.
