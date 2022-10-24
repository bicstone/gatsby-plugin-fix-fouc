/**
 * @jest-environment jsdom
 */

import { defaultOptions } from ".";
import { onRenderBody } from "./gatsby-ssr";

const renderBodyArgs = {
  loadPageDataSync: jest.fn(),
  pathname: "",
  setHeadComponents: jest.fn(),
  setHtmlAttributes: jest.fn(),
  setBodyAttributes: jest.fn(),
  setPreBodyComponents: jest.fn(),
  setPostBodyComponents: jest.fn(),
  setBodyProps: jest.fn(),
};

describe(`onRenderBody`, () => {
  describe(`TODO`, () => {
    test(`set head components`, () => {
      // const attributeName = defaultOptions.attributeName;

      onRenderBody(renderBodyArgs, {});

      expect(renderBodyArgs.setHeadComponents).toHaveBeenCalledTimes(1);
      expect(renderBodyArgs.setHeadComponents).toMatchSnapshot();
    });

    test(`set head components (use attributeName option)`, () => {
      const attributeName = "is-loading";

      onRenderBody(renderBodyArgs, { attributeName });

      expect(renderBodyArgs.setBodyAttributes).toHaveBeenCalledTimes(1);
      expect(renderBodyArgs.setBodyAttributes).toMatchSnapshot();
    });
  });

  describe(`setBodyAttributes`, () => {
    test(`sets body attributes`, () => {
      const attributeName = defaultOptions.attributeName;

      onRenderBody(renderBodyArgs, {});

      expect(renderBodyArgs.setBodyAttributes).toHaveBeenCalledTimes(1);
      expect(renderBodyArgs.setBodyAttributes).toHaveBeenCalledWith({
        [`data-${attributeName}`]: "true",
      });
    });

    test(`sets body attributes (use attributeName option)`, () => {
      const attributeName = "is-loading";

      onRenderBody(renderBodyArgs, { attributeName });

      expect(renderBodyArgs.setBodyAttributes).toHaveBeenCalledTimes(1);
      expect(renderBodyArgs.setBodyAttributes).toHaveBeenCalledWith({
        [`data-${attributeName}`]: "true",
      });
    });
  });
});
