/**
 * @jest-environment jsdom
 */

import type { BrowserPluginArgs } from "gatsby";
import { onInitialClientRender } from "./gatsby-browser";

const browserPluginArgs: BrowserPluginArgs = {
  getResourceURLsForPathname: () => {},
};

describe(`onInitialClientRender`, () => {
  test(`should remove data attribute`, () => {
    // const attributeName = "gatsby-plugin-fix-fouc-is-loading";
    const camelCaseAttributeName = "gatsbyPluginFixFoucIsLoading";

    window.document.body.dataset[camelCaseAttributeName] = "true";

    expect(window.document.body.dataset[camelCaseAttributeName]).toStrictEqual(
      "true",
    );

    onInitialClientRender(browserPluginArgs, {});

    expect(
      window.document.body.dataset[camelCaseAttributeName],
    ).toBeUndefined();
  });

  test(`should remove data attribute (use attributeName Option)`, () => {
    const attributeName = "is-loading";
    const camelCaseAttributeName = "isLoading";

    window.document.body.dataset[camelCaseAttributeName] = "true";

    expect(window.document.body.dataset[camelCaseAttributeName]).toStrictEqual(
      "true",
    );

    onInitialClientRender(browserPluginArgs, { attributeName });

    expect(
      window.document.body.dataset[camelCaseAttributeName],
    ).toBeUndefined();
  });

  test(`should not crashing if body dataset does not exist`, () => {
    // const attributeName = "gatsby-plugin-fix-fouc-is-loading";
    const camelCaseAttributeName = "gatsbyPluginFixFoucIsLoading";

    delete window.document.body.dataset?.[camelCaseAttributeName];

    expect(
      window.document.body.dataset[camelCaseAttributeName],
    ).toBeUndefined();

    onInitialClientRender(browserPluginArgs, {});

    expect(
      window.document.body.dataset[camelCaseAttributeName],
    ).toBeUndefined();
  });
});
