import type { MDXComponents } from "mdx/types";

/** Global MDX element styles. Case-study components get added here as screens are built. */
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
