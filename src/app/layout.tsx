import type { Metadata } from "next";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AnalyticsEvents } from "@/components/AnalyticsEvents";
import { INTRO_LOADER } from "@/components/home-intro";
import { PageShell } from "@/components/PageShell";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  IS_PREVIEW,
  SITE_URL,
  sharedOpenGraph,
  sharedTwitter,
} from "@/lib/seo";
import { CONSENT_DEFAULTS, GA_ID } from "@/lib/analytics";
import { fontVariables } from "./fonts";
import "./globals.css";

/** Site-wide defaults. Pages add their own canonical and Open Graph / Twitter text through
 *  pageMetadata() in src/lib/seo.ts; the 404 inherits these as they are. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s — Mary Fisher",
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: { ...sharedOpenGraph, title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
  twitter: { ...sharedTwitter, title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
  // Preview deployments stay out of search results.
  ...(IS_PREVIEW && { robots: { index: false, follow: false } }),
};

/** Chatbase embed snippet, verbatim. The id and domain identify the agent; don't edit. */
const CHATBASE_LOADER = String.raw`(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="ILacgDAfmKxigyY1Tqq3o";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();`;

/**
 * Reading preferences (text size, high contrast) from localStorage onto <html>, before first
 * paint. Keys and values match <ReadingPreferences>. See
 * node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md ("Themes").
 */
const PREFERENCES_LOADER = `(function(){try{var d=document.documentElement,s=localStorage.getItem("mf-text-size"),c=localStorage.getItem("mf-contrast");if(s==="112"||s==="125")d.setAttribute("data-text-size",s);if(c==="high")d.setAttribute("data-contrast","high")}catch(e){}})()`;

/** Google Analytics: production builds only, never dev or Vercel preview deployments. */
const ANALYTICS = process.env.NODE_ENV === "production" && !IS_PREVIEW;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the preferences script may add data-* attributes before hydration.
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: PREFERENCES_LOADER }} />
        {/* Home intro: hides Home before first paint when <HomeIntro> is going to play. */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_LOADER }} />
        {/* Consent Mode v2 defaults (all denied), before GA loads. See src/lib/analytics.ts. */}
        {ANALYTICS && <script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULTS }} />}
      </head>
      {/* suppressHydrationWarning: browser extensions (e.g. Grammarly) add data-* attributes to <body>. */}
      <body className="min-h-dvh bg-bg text-body text-text" suppressHydrationWarning>
        <PageShell>{children}</PageShell>
        {/* Chatbase chat bubble (AskMary), site-wide. The only Chatbase embed on the site. */}
        <Script
          id="chatbase-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: CHATBASE_LOADER }}
        />
        <AnalyticsEvents />
      </body>
      {ANALYTICS && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
