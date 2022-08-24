import type { BrowserPluginArgs } from "gatsby";
import { defaultOptions, GatsbyPluginFixFoucOptions } from "./";

export const onInitialClientRender = (
  _: BrowserPluginArgs,
  pluginOptions: GatsbyPluginFixFoucOptions
): void => {
  const attributeName =
    pluginOptions.attributeName ?? defaultOptions.attributeName;

  delete window.document.body.dataset?.[attributeName];
};
