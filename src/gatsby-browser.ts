import { camelCase } from "camel-case";
import { defaultOptions, GatsbyPluginFixFoucOptions } from "./";

import type { BrowserPluginArgs } from "gatsby";

export const onInitialClientRender = (
  _: BrowserPluginArgs,
  pluginOptions: GatsbyPluginFixFoucOptions
): void => {
  const attributeName =
    pluginOptions.attributeName ?? defaultOptions.attributeName;

  delete window.document.body.dataset?.[camelCase(attributeName)];
};
