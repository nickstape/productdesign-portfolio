/** The ".experience" list on /about, newest first. Figma "About — 1194" (3407:1760). */
export type Experience = {
  name: string;
  role: string;
  years: string;
  /** Current role: years show in accent green. */
  current?: boolean;
};

export const experience: Experience[] = [
  { name: "sóróyà", role: "Founder and designer", years: "Now · 2026", current: true },
  { name: "LCC Accelerate", role: "Founder member", years: "2026" },
  { name: "NIBSS", role: "Lead product designer · Direct Debit, TNS", years: "2021–2024" },
  { name: "MA Design Management", role: "University of the Arts London", years: "2024–2026" },
];
