import type { Metadata } from "next";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Mary Fisher — Senior Product Designer",
    template: "%s — Mary Fisher",
  },
  description:
    "Senior product designer for payments. I design the moments where money moves and people need to trust it.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="min-h-dvh bg-bg text-body text-text">{children}</body>
    </html>
  );
}
