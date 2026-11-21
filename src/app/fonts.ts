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

/** Case study headlines */
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

/** Section labels, metadata, years, captions */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

/** Only for the giant "Mary Fisher" wordmark */
export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
});

export const fontVariables = [
  instrumentSans.variable,
  spaceGrotesk.variable,
  jetbrainsMono.variable,
  fraunces.variable,
].join(" ");
