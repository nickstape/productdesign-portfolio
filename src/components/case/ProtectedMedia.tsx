import { Suspense, type ReactNode } from "react";
import { hasCaseAccess } from "@/lib/case-access";
import { UnlockForm } from "./UnlockForm";

/**
 * Password-protected image. Locked: the image sits under a 90% overlay (barely visible) with the
 * password form on top. Unlocked (case study access cookie, src/lib/case-access.ts): the image
 * at full opacity. Only this part waits on the cookie, so the rest of the page stays prerendered.
 * Note the file itself is still sent to the browser; this hides it, it doesn't secure it.
 */
export function ProtectedMedia({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<Locked form={false}>{children}</Locked>}>
      <Gate>{children}</Gate>
    </Suspense>
  );
}

async function Gate({ children }: { children: ReactNode }) {
  return (await hasCaseAccess()) ? <>{children}</> : <Locked form>{children}</Locked>;
}

function Locked({ children, form }: { children: ReactNode; form: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-image">
      <div aria-hidden="true" className="pointer-events-none select-none">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-bg/90 p-2">{form && <UnlockForm />}</div>
    </div>
  );
}
