"use server";

import { refresh } from "next/cache";
import { cookies } from "next/headers";
import { ACCESS_COOKIE, ACCESS_MAX_AGE, accessToken, checkPassword, isPasswordConfigured } from "@/lib/case-access";

export type UnlockState = { error: string | null };

/** Checks the case study password; on success stores the access cookie and re-renders the page. */
export async function unlockCaseStudy(_prev: UnlockState, formData: FormData): Promise<UnlockState> {
  if (!isPasswordConfigured()) return { error: "Password protection isn’t set up yet." };
  const attempt = String(formData.get("password") ?? "");
  if (!checkPassword(attempt)) return { error: "That password isn’t right." };

  (await cookies()).set(ACCESS_COOKIE, accessToken(attempt), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/work",
    maxAge: ACCESS_MAX_AGE,
  });
  refresh();
  return { error: null };
}
