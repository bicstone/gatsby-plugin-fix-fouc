import React from "react";

import camelCase from "camelcase";
import { defaultOptions, GatsbyPluginFixFoucOptions } from "./";

import type { RenderBodyArgs } from "gatsby";

const generateHtml = (
  str: string
): React.DOMAttributes<Element>["dangerouslySetInnerHTML"] => {
  return {
    __html: str.trim().replace("/\n/g", ""),
  };
};

export const onRenderBody = (
  { setHeadComponents, setBodyAttributes }: RenderBodyArgs,
  pluginOptions: GatsbyPluginFixFoucOptions
): void => {
  const attributeName =
    pluginOptions.attributeName ?? defaultOptions.attributeName;
  const minWidth = pluginOptions.minWidth ?? defaultOptions.minWidth;
  const timeout = pluginOptions.timeout ?? defaultOptions.timeout;

  setHeadComponents([
    <style
      key="loading-screen-style"
      dangerouslySetInnerHTML={generateHtml(`
        body[data-${attributeName}]{opacity:1}
        @media(min-width:${minWidth}px){body[data-${attributeName}]{opacity:0}}
      `)}
    />,

    <noscript
      key="loading-screen-noscript-style"
      dangerouslySetInnerHTML={generateHtml(`
      <style>
        body[data-${attributeName}]{opacity:1!important}
      </style>
      `)}
    />,
    <script
      key="loading-screen-fail-safe"
      dangerouslySetInnerHTML={generateHtml(`
        setTimeout(function(){
          delete document.body.dataset?.["${camelCase(attributeName)}"]
        },${timeout})
      `)}
    />,
  ]);

  setBodyAttributes({
    [`data-${attributeName}`]: "true",
  });
};
