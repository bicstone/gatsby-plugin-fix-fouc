/**
 * @jest-environment jsdom
 */

import type { BrowserPluginArgs } from "gatsby";
import { onInitialClientRender } from "./gatsby-browser";

const browserPluginArgs: BrowserPluginArgs = {
  getResourceURLsForPathname: () => {
    return "";
  },
};

describe(`onInitialClientRender`, () => {
  test(`should remove data attribute`, () => {
    // "gatsby-plugin-fix-fouc-is-loading"
    const datasetKeyName = "gatsbyPluginFixFoucIsLoading";

    window.document.body.dataset[datasetKeyName] = "true";

    expect(window.document.body.dataset[datasetKeyName]).toStrictEqual("true");

    onInitialClientRender(browserPluginArgs, {});

    expect(window.document.body.dataset[datasetKeyName]).toBeUndefined();
  });

  test(`should remove data attribute (use attributeName Option)`, () => {
    const attributeName = "is-loading";
    const datasetKeyName = "isLoading";

    window.document.body.dataset[datasetKeyName] = "true";

    expect(window.document.body.dataset[datasetKeyName]).toStrictEqual("true");

    onInitialClientRender(browserPluginArgs, { attributeName });

    expect(window.document.body.dataset[datasetKeyName]).toBeUndefined();
  });

  test(`should not crashing if body dataset does not exist`, () => {
    // "gatsby-plugin-fix-fouc-is-loading"
    const datasetKeyName = "gatsbyPluginFixFoucIsLoading";

    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete -- delete dataset
    delete window.document.body.dataset[datasetKeyName];

    expect(window.document.body.dataset[datasetKeyName]).toBeUndefined();

    onInitialClientRender(browserPluginArgs, {});

    expect(window.document.body.dataset[datasetKeyName]).toBeUndefined();
  });
});
