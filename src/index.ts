import type { IPluginRefOptions } from "gatsby";

/**
 * Name conversion
 * dash-style to camelCase conversion
 * A custom data attribute name is transformed to a key for the DOMStringMap entry by the following:
 *
 * 1. Lowercase all ASCII capital letters (A to Z);
 * 2. Remove the prefix data- (including the dash);
 * 3. For any dash (U+002D) followed by an ASCII lowercase letter a to z, remove the dash and uppercase the letter;
 * 4. Other characters (including other dashes) are left unchanged.
 *
 * https://github.com/mdn/content/blob/aa6e900e44ed7e9c3612b98abdb51cb4ab4d99e1/files/en-us/web/api/htmlelement/dataset/index.md
 * (c) Mozilla Contributors (CC-BY-SA-2.5)
 */

export function toCamelCase(dataAttr: string): string {
  // Remove the 'data-' prefix and convert to lowercase
  const s = dataAttr.replace("data-", "").toLowerCase();

  // Convert any '-x' to 'X'
  return s.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
}

/**
 * @public
 * Gatsby Plugin Fix FOUC Ref Options
 */
export interface GatsbyPluginFixFoucRefOptions
  extends GatsbyPluginFixFoucOptions,
    IPluginRefOptions {}

/**
 * @private
 * Gatsby Plugin Fix FOUC Options
 */
export interface GatsbyPluginFixFoucOptions {
  /**
   * The data-* attribute name to be added.
   * @default "gatsby-plugin-fix-fouc-is-loading"
   */
  attributeName?: string;

  /**
   * The minimum width (px) of hides the page. If not set, hides regardless of width.
   * @default 0
   */
  minWidth?: number;

  /**
   * The time (milliseconds) of the timer should wait before shows the page as a fallback even if the initial render is not done.
   * @default 4000
   */
  timeout?: number;
}

export const defaultOptions: Required<GatsbyPluginFixFoucOptions> = {
  attributeName: "gatsby-plugin-fix-fouc-is-loading",
  minWidth: 0,
  timeout: 4000,
};
