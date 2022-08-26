import type { IPluginRefOptions } from "gatsby";

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
   * @default 2000
   */
  timeout?: number;
}

export const defaultOptions: Required<GatsbyPluginFixFoucOptions> = {
  attributeName: "gatsby-plugin-fix-fouc-is-loading",
  minWidth: 0,
  timeout: 2000,
};
