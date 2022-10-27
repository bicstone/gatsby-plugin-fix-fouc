/* eslint-disable no-eval */
/**
 * @jest-environment jsdom
 */

import { defaultOptions } from ".";
import { onRenderBody } from "./gatsby-ssr";
import { camelCase } from "camel-case";
import { RenderBodyArgs } from "gatsby";
import { render } from "@testing-library/react";
import React from "react";

jest.useFakeTimers();

const getRenderBodyArgs = (
  renderBodyArgs?: Partial<RenderBodyArgs>
): RenderBodyArgs => ({
  loadPageDataSync: jest.fn(),
  pathname: "",
  setHeadComponents: jest.fn(),
  setHtmlAttributes: jest.fn(),
  setBodyAttributes: jest.fn(),
  setPreBodyComponents: jest.fn(),
  setPostBodyComponents: jest.fn(),
  setBodyProps: jest.fn(),
  ...renderBodyArgs,
});

describe.each([
  {
    options: {},
    attributeName: defaultOptions.attributeName,
    timeout: defaultOptions.timeout,
  },
  {
    options: { attributeName: "is-loading", timeout: 9999 },
    attributeName: "is-loading",
    timeout: 9999,
  },
])(`onRenderBody (%#)`, ({ options, attributeName, timeout }) => {
  beforeEach(() => {
    window.document.body.innerHTML = "";
    Array.from(window.document.body.attributes).forEach((attr) =>
      window.document.body.removeAttribute(attr.name)
    );
  });

  describe(`setHeadComponents`, () => {
    const renderBodyArgs = getRenderBodyArgs({
      setHeadComponents: jest.fn((elements) => {
        render(React.createElement(React.Fragment, {}, elements));
      }),
    });

    describe(`loading-screen-style`, () => {
      test.todo(`loading-screen-style`);
    });

    describe(`loading-screen-noscript-style`, () => {
      test.todo(`loading-screen-noscript-style`);
    });

    describe(`loading-screen-fail-safe`, () => {
      test(`should remove data-attribute after timeout`, () => {
        window.document.body.dataset[camelCase(attributeName)] = "true";

        onRenderBody(renderBodyArgs, options);

        expect(renderBodyArgs.setHeadComponents).toHaveBeenCalledTimes(1);

        const script = window.document.body.firstChild?.childNodes?.[2];
        if (typeof script?.textContent === "string") {
          eval(script.textContent);
        }

        expect(
          window.document.body.dataset[camelCase(attributeName)]
        ).toStrictEqual("true");

        jest.advanceTimersByTime(timeout);

        expect(
          window.document.body.dataset[camelCase(attributeName)]
        ).toBeUndefined();
      });
    });
  });

  describe(`setBodyAttributes`, () => {
    const renderBodyArgs = getRenderBodyArgs({
      setBodyAttributes: jest.fn((attributes) => {
        Object.entries(attributes).forEach(([k, v]) => {
          window.document.body.setAttribute(k, v);
        });
      }),
    });

    test(`should set body data-attribute`, () => {
      onRenderBody(renderBodyArgs, options);

      expect(renderBodyArgs.setBodyAttributes).toHaveBeenCalledTimes(1);
      expect(
        window.document.body.dataset[camelCase(attributeName)]
      ).toStrictEqual("true");
    });
  });
});
