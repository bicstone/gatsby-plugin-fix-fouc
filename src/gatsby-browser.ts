import { defaultOptions, toCamelCase } from "./";
import type { GatsbyPluginFixFoucOptions } from "./";

import type { BrowserPluginArgs } from "gatsby";

export const onInitialClientRender = (
  _: BrowserPluginArgs,
  pluginOptions: GatsbyPluginFixFoucOptions,
): void => {
  const attributeName =
    pluginOptions.attributeName ?? defaultOptions.attributeName;

  try {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete -- delete dataset
    delete window.document.body.dataset[toCamelCase(attributeName)];
  } catch (e) {}
};
