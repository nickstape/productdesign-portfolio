import type { Metadata } from "next";
import Script from "next/script";
import { INTRO_LOADER } from "@/components/home-intro";
import { PageShell } from "@/components/PageShell";
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

/** Chatbase embed snippet, verbatim. The id and domain identify the agent; don't edit. */
const CHATBASE_LOADER = String.raw`(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="ILacgDAfmKxigyY1Tqq3o";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();`;

/**
 * Reading preferences (text size, high contrast) from localStorage onto <html>, before first
 * paint. Keys and values match <ReadingPreferences>. See
 * node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md ("Themes").
 */
const PREFERENCES_LOADER = `(function(){try{var d=document.documentElement,s=localStorage.getItem("mf-text-size"),c=localStorage.getItem("mf-contrast");if(s==="112"||s==="125")d.setAttribute("data-text-size",s);if(c==="high")d.setAttribute("data-contrast","high")}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the preferences script may add data-* attributes before hydration.
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: PREFERENCES_LOADER }} />
        {/* Home intro: hides Home before first paint when <HomeIntro> is going to play. */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_LOADER }} />
      </head>
      <body className="min-h-dvh bg-bg text-body text-text">
        <PageShell>{children}</PageShell>
        {/* Chatbase chat bubble (AskMary), site-wide. The only Chatbase embed on the site. */}
        <Script
          id="chatbase-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: CHATBASE_LOADER }}
        />
      </body>
    </html>
  );
}
