import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import { unified } from "unified";

/** Case study content lives in src/content/work/<slug>.mdx. */
const DIR = path.join(process.cwd(), "src/content/work");

export type CaseFrontmatter = {
  title: string;
  slug: string;
  /** Mono kicker above the title, e.g. ".case study 01 · fintech · B2B platform" */
  kicker: string;
  /** Plain text (also the meta description). Phrases named in `introLinks` become links. */
  intro: string;
  /** { "phrase in the intro": "https://source" }: each phrase renders as an accent source link. */
  introLinks?: Record<string, string>;
  role: string;
  /** Shows a visible TODO in the meta row until it's set. */
  timeline?: string;
  platform: string;
  /** Platform text below 834, if it differs. */
  platformMobile?: string;
  outcome: string;
  /** Key in src/content/images.ts, e.g. "nddHero". Shows a placeholder until the entry and file exist. */
  hero: string;
  order: number;
  /** Slug of the next case study. */
  next: string;
};

export type TocItem = {
  id: string;
  label: string;
  children: TocItem[];
  /** Inside <Desktop> (≥ 834 only) or <Mobile> (< 834 only) in the MDX. */
  only?: "desktop" | "mobile";
};

const REQUIRED: (keyof CaseFrontmatter)[] = [
  "title", "slug", "kicker", "intro", "role", "platform", "outcome", "hero", "order", "next",
];

export function listSlugs(): string[] {
  return readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export async function getCase(slug: string) {
  const mod = (await import(`@/content/work/${slug}.mdx`)) as {
    default: ComponentType;
    frontmatter?: Record<string, unknown>;
  };
  return { Content: mod.default, frontmatter: checkFrontmatter(slug, mod.frontmatter) };
}

function checkFrontmatter(slug: string, fm: Record<string, unknown> | undefined): CaseFrontmatter {
  const missing = REQUIRED.filter((k) => fm?.[k] === undefined || fm?.[k] === "");
  if (missing.length) {
    throw new Error(`src/content/work/${slug}.mdx: frontmatter is missing ${missing.join(", ")}`);
  }
  // Frontmatter values may be written as `images.nddHeroVideo`; the manifest key is the last part.
  const hero = String(fm!.hero).replace(/^images\./, "");
  return { ...(fm as CaseFrontmatter), hero, slug };
}

/** "exploration 01" anchors: <Exploration n={1}> → id "exploration-01". */
export function explorationId(n: number) {
  return `exploration-${String(n).padStart(2, "0")}`;
}

type JsxNode = {
  type: string;
  name?: string | null;
  attributes?: { type: string; name?: string; value?: unknown }[];
  children?: JsxNode[];
};

function attr(node: JsxNode, name: string): string | undefined {
  const a = node.attributes?.find((x) => x.type === "mdxJsxAttribute" && x.name === name);
  if (!a) return undefined;
  if (typeof a.value === "string") return a.value;
  // {1} → expression value
  const v = (a.value as { value?: string } | null)?.value;
  return v === undefined ? undefined : String(v).replace(/^["']|["']$/g, "");
}

/**
 * Table of contents, read from the MDX source: every <Section> (TOC text = `nav` prop, else
 * `label`) and every <Exploration> nested inside it. Built from the same nodes that render, so it
 * can't list a section that doesn't exist. Throws on a missing or duplicate id. One inside a
 * <Desktop> or <Mobile> wrapper is marked `only`, so the TOC and chip strip show it at that size only.
 */
export function getToc(slug: string): TocItem[] {
  const source = readFileSync(path.join(DIR, `${slug}.mdx`), "utf8");
  const tree = unified().use(remarkParse).use(remarkMdx).use(remarkFrontmatter).parse(source) as JsxNode;
  const items: TocItem[] = [];
  const seen = new Set<string>();

  const add = (item: TocItem) => {
    if (seen.has(item.id)) throw new Error(`${slug}.mdx: duplicate section id "${item.id}"`);
    seen.add(item.id);
  };

  const walk = (node: JsxNode, parent: TocItem | null, only?: TocItem["only"]) => {
    let current = parent;
    if (node.type === "mdxJsxFlowElement" && (node.name === "Desktop" || node.name === "Mobile")) {
      only = node.name === "Desktop" ? "desktop" : "mobile";
    } else if (node.type === "mdxJsxFlowElement" && node.name === "Section") {
      const id = attr(node, "id");
      const label = attr(node, "nav") ?? attr(node, "label");
      if (!id || !label) throw new Error(`${slug}.mdx: <Section> needs an id and a label`);
      current = { id, label, children: [], ...(only ? { only } : {}) };
      add(current);
      items.push(current);
    } else if (node.type === "mdxJsxFlowElement" && node.name === "Exploration") {
      const n = Number(attr(node, "n"));
      if (!n) throw new Error(`${slug}.mdx: <Exploration> needs n={…}`);
      const item: TocItem = { id: explorationId(n), label: `exploration ${n}`, children: [], ...(only ? { only } : {}) };
      add(item);
      if (parent) parent.children.push(item);
      else items.push(item);
      return;
    }
    node.children?.forEach((c) => walk(c, current, only));
  };

  walk(tree, null);
  return items;
}
