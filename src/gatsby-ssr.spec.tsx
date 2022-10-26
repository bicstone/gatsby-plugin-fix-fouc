/**
 * @jest-environment jsdom
 */

import { defaultOptions } from ".";
import { onRenderBody } from "./gatsby-ssr";
import { camelCase } from "camel-case";
import { RenderBodyArgs } from "gatsby";

const renderBodyArgs: RenderBodyArgs = {
  loadPageDataSync: jest.fn(),
  pathname: "",
  setHeadComponents: jest.fn(),
  setHtmlAttributes: jest.fn(),
  setBodyAttributes: jest.fn((attributes) => {
    Object.entries(attributes).forEach(([k, v]) => {
      window.document.body.setAttribute(k, v);
    });
  }),
  setPreBodyComponents: jest.fn(),
  setPostBodyComponents: jest.fn(),
  setBodyProps: jest.fn(),
};

describe(`onRenderBody`, () => {
  // describe(`setHeadComponents`, () => {
  //   test(`set head components`, () => {
  //     const attributeName = defaultOptions.attributeName;
  //     const minWidth = defaultOptions.minWidth;
  //     const timeout = defaultOptions.timeout;

  //     onRenderBody(renderBodyArgs, {});

  //     expect(renderBodyArgs.setHeadComponents).toHaveBeenCalledTimes(1);
  //   });

  //   test(`set head components (use attributeName option)`, () => {
  //     const attributeName = "is-loading";
  //     const minWidth = 1000;
  //     const timeout = 10000;

  //     onRenderBody(renderBodyArgs, { attributeName });

  //     expect(renderBodyArgs.setBodyAttributes).toHaveBeenCalledTimes(1);
  //   });
  // });

  describe(`setHeadComponents (loading-screen-fail-safe)`, () => {
    test(`set head components`, () => {
      const attributeName = defaultOptions.attributeName;
      // const timeout = defaultOptions.timeout;

      window.document.body.dataset[camelCase(attributeName)] = "true";
      onRenderBody(renderBodyArgs, {});

      expect(renderBodyArgs.setHeadComponents).toHaveBeenCalledTimes(1);
    });

    test(`set head components (use attributeName option)`, () => {
      const attributeName = "is-loading";
      const timeout = 10000;

      window.document.body.dataset[camelCase(attributeName)] = "true";
      onRenderBody(renderBodyArgs, { attributeName, timeout });

      expect(renderBodyArgs.setBodyAttributes).toHaveBeenCalledTimes(1);
    });
  });

  describe(`setBodyAttributes`, () => {
    test(`sets body attributes`, () => {
      const attributeName = defaultOptions.attributeName;

      onRenderBody(renderBodyArgs, {});

      expect(renderBodyArgs.setBodyAttributes).toHaveBeenCalledWith({
        [`data-${attributeName}`]: "true",
      });
      expect(
        window.document.body.dataset[camelCase(attributeName)]
      ).toStrictEqual("true");
    });

    test(`sets body attributes (use attributeName option)`, () => {
      const attributeName = "is-loading";

      onRenderBody(renderBodyArgs, { attributeName });

      expect(renderBodyArgs.setBodyAttributes).toHaveBeenCalledWith({
        [`data-${attributeName}`]: "true",
      });
      expect(
        window.document.body.dataset[camelCase(attributeName)]
      ).toStrictEqual("true");
    });
  });
});
