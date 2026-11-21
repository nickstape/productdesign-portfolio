import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Case study image password (one shared password, set CASE_STUDY_PASSWORD in .env.local and in
 * Vercel). Entering it stores an httpOnly cookie for 30 days. The cookie holds an HMAC of the
 * password, not the password, so changing the password locks everyone out again.
 */
export const ACCESS_COOKIE = "case-study-access";
export const ACCESS_MAX_AGE = 60 * 60 * 24 * 30;

function password(): string | null {
  return process.env.CASE_STUDY_PASSWORD || null;
}

export function accessToken(pw: string): string {
  return createHmac("sha256", pw).update("case-study-access:v1").digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

/** True when the password is set and matches. */
export function checkPassword(attempt: string): boolean {
  const pw = password();
  return !!pw && safeEqual(accessToken(attempt), accessToken(pw));
}

export function isPasswordConfigured(): boolean {
  return password() !== null;
}

/** Reads the request cookie, so call it inside <Suspense> (Cache Components). */
export async function hasCaseAccess(): Promise<boolean> {
  // Read the cookie first, always: it marks the gate as request-time, so the build can't
  // prerender a locked image into static HTML (the password env var may be unset at build).
  const value = (await cookies()).get(ACCESS_COOKIE)?.value;
  const pw = password();
  return !!pw && !!value && safeEqual(value, accessToken(pw));
}
