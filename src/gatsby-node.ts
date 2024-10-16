import type { GatsbyNode } from "gatsby";
import type { GatsbyPluginFixFoucOptions } from "./";
import type { Schema } from "gatsby-plugin-utils";

export const pluginOptionsSchema: Required<GatsbyNode>["pluginOptionsSchema"] =
  ({ Joi }) => {
    const schema: Record<keyof GatsbyPluginFixFoucOptions, Schema> = {
      attributeName: Joi.string(),
      minWidth: Joi.number(),
      timeout: Joi.number(),
    };
    return Joi.object(schema);
  };
