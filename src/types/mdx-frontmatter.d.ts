declare module "*.mdx" {
  /** YAML frontmatter, exported by remark-mdx-frontmatter (next.config.ts). */
  export const frontmatter: Record<string, unknown> | undefined;
}
