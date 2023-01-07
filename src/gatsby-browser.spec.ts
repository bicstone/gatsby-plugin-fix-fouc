/**
 * @jest-environment jsdom
 */

import { camelCase } from "camel-case";
import { BrowserPluginArgs } from "gatsby";
import { defaultOptions } from ".";
import { onInitialClientRender } from "./gatsby-browser";

const browserPluginArgs: BrowserPluginArgs = {
  getResourceURLsForPathname: () => {},
};

describe(`onInitialClientRender`, () => {
  test(`should remove data attribute`, () => {
    const attributeName = defaultOptions.attributeName;

    window.document.body.dataset[camelCase(attributeName)] = "true";

    expect(
      window.document.body.dataset[camelCase(attributeName)]
    ).toStrictEqual("true");

    onInitialClientRender(browserPluginArgs, {});

    expect(
      window.document.body.dataset[camelCase(attributeName)]
    ).toBeUndefined();
  });

  test(`should remove data attribute (use attributeName Option)`, () => {
    const attributeName = "is-loading";

    window.document.body.dataset[camelCase(attributeName)] = "true";

    expect(
      window.document.body.dataset[camelCase(attributeName)]
    ).toStrictEqual("true");

    onInitialClientRender(browserPluginArgs, { attributeName });

    expect(
      window.document.body.dataset[camelCase(attributeName)]
    ).toBeUndefined();
  });

  test(`should not crashing if body dataset does not exist`, () => {
    const attributeName = defaultOptions.attributeName;

    delete window.document.body.dataset?.[camelCase(attributeName)];

    expect(
      window.document.body.dataset[camelCase(attributeName)]
    ).toBeUndefined();

    onInitialClientRender(browserPluginArgs, {});

    expect(
      window.document.body.dataset[camelCase(attributeName)]
    ).toBeUndefined();
  });
});
