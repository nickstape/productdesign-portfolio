import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { MobileHeader } from "./MobileHeader";
import { Sidebar } from "./Sidebar";
import { SiteLogo } from "./SiteLogo";
import { pageGutter } from "./gutter";

/**
 * Site chrome for every page (applied once in the root layout).
 * Pages render their content only; they must not add their own <main>.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only z-50 rounded-image bg-surface px-2 py-1 font-sans text-ui text-text focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      {/* Banner landmark ≥ 1194px. Both children are position: fixed, so this box is empty and
          takes no space. Below 1194 <MobileHeader> is the banner. */}
      <header className="hidden desktop:block">
        <SiteLogo />
        <Sidebar />
      </header>
      <MobileHeader />
      <main id="main" tabIndex={-1} className={`flex-1 focus:outline-none ${pageGutter}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
