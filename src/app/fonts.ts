import {
  Fraunces,
  Instrument_Sans,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";

/** Body and UI text */
export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
});

/** Case study headlines. Not preloaded: fonts.ts is loaded by the root layout, so a preload
 *  would fetch it on every page, and only case studies use it. */
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-space-grotesk",
});

/** Section labels, metadata, years, captions */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

/**
 * The giant "Mary Fisher" wordmark; italic for the book title in the home "Currently reading" card.
 * Not preloaded: its two files (≈ 265KB) are the heaviest on the page and neither is needed for
 * the first screen (the wordmark sits at the bottom, the card opens on hover). Preloading them
 * held back the body text on mobile.
 */
export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
});

export const fontVariables = [
  instrumentSans.variable,
  spaceGrotesk.variable,
  jetbrainsMono.variable,
  fraunces.variable,
].join(" ");
