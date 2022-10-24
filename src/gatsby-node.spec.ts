import { testPluginOptionsSchema } from "gatsby-plugin-utils";
import { pluginOptionsSchema } from "./gatsby-node";

describe(`pluginOptionsSchema`, () => {
  test.each([
    undefined,
    {},
    {
      attributeName: "1",
      minWidth: 1,
      timeout: 1,
    },
  ])(
    `should validate the schema when valid options (%s) is provided`,
    async () => {
      const { isValid, errors, warnings } = await testPluginOptionsSchema(
        pluginOptionsSchema,
        {}
      );

      expect(isValid).toStrictEqual(true);
      expect(errors.length).toStrictEqual(0);
      expect(warnings.length).toStrictEqual(0);
    }
  );

  test(`should provide meaningful errors when invalid options is provided`, async () => {
    const { isValid, errors, warnings } = await testPluginOptionsSchema(
      pluginOptionsSchema,
      {
        attributeName: 1,
        minWidth: "a",
        timeout: "a",
      }
    );

    expect(isValid).toStrictEqual(false);
    expect(errors).toStrictEqual([
      '"attributeName" must be a string',
      '"minWidth" must be a number',
      '"timeout" must be a number',
    ]);
    expect(warnings.length).toStrictEqual(0);
  });
});
