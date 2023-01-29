import * as React from "react";

import { camelCase } from "camel-case";
import { defaultOptions } from ".";
import type { GatsbyPluginFixFoucOptions } from ".";

import type { RenderBodyArgs } from "gatsby";

export const onRenderBody = (
  { setHeadComponents, setBodyAttributes }: RenderBodyArgs,
  pluginOptions: GatsbyPluginFixFoucOptions
): void => {
  const attributeName =
    pluginOptions.attributeName ?? defaultOptions.attributeName;
  const minWidth = pluginOptions.minWidth ?? defaultOptions.minWidth;
  const timeout = pluginOptions.timeout ?? defaultOptions.timeout;

  setHeadComponents([
    React.createElement("style", {
      key: "loading-screen-style",
      dangerouslySetInnerHTML: {
        __html:
          `body[data-${attributeName}]{opacity:1}` +
          `@media(min-width:${minWidth}px){body[data-${attributeName}]{opacity:0}}`,
      },
    }),

    React.createElement("noscript", {
      key: "loading-screen-noscript-style",
      dangerouslySetInnerHTML: {
        __html:
          `<style>` +
          `body[data-${attributeName}]{opacity:1!important}` +
          `</style>`,
      },
    }),

    React.createElement("script", {
      key: "loading-screen-fail-safe",
      dangerouslySetInnerHTML: {
        __html:
          `(function(){` +
          `setTimeout(function(){` +
          `try{` +
          `if(` +
          `document.body.dataset["${camelCase(attributeName)}"]!==undefined` +
          `){` +
          `delete document.body.dataset["${camelCase(attributeName)}"]` +
          `}` +
          `}catch(e){}` +
          `},${timeout})` +
          `})();`,
      },
    }),
  ]);

  setBodyAttributes({
    [`data-${attributeName}`]: "true",
  });
};
