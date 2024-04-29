import { toCamelCase } from "./";

/**
 * An HTML data-* attribute and its corresponding DOM dataset.property modify their shared name according to where they are read or written:
 *
 * In HTML
 *   The attribute name begins with data-. It can contain only letters, numbers, dashes (-), periods (.), colons (:), and underscores (_). Any ASCII capital letters (A to Z) are converted to lowercase.
 *
 * In JavaScript
 *   The property name of a custom data attribute is the same as the HTML attribute without the data- prefix, and removes single dashes (-) for when to capitalize the property's "camel-cased" name.
 *
 * In addition to the information below, you'll find a how-to guide for using HTML data attributes in our article Using data attributes.
 *
 * https://github.com/mdn/content/blob/aa6e900e44ed7e9c3612b98abdb51cb4ab4d99e1/files/en-us/web/api/htmlelement/dataset/index.md
 * (c) Mozilla Contributors (CC-BY-SA-2.5)
 */

/**
 * Check the following source code for expected values!
 *
 * const el = document.createElement("span");
 * el.setAttribute("data-test", "data");
 * console.log(Object.keys(el.dataset)[0]);
 */

const tests: Array<[string, string]> = [
  ["", ""],
  ["data-test", "test"],
  ["data-test-value", "testValue"],
  ["data-testValue", "testvalue"],
  ["data-test-value-2", "testValue-2"],
  ["data-test_value", "test_value"],
  ["data-test.value", "test.value"],
  ["data-test:value", "test:value"],
  ["data-gatsby-plugin-fix-fouc-is-loading", "gatsbyPluginFixFoucIsLoading"],
];

describe("change case", () => {
  for (const [input, result] of tests) {
    it(input, () => {
      expect(toCamelCase(input)).toEqual(result);
    });
  }
});
