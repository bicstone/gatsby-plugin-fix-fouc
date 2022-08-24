import type { GatsbyNode } from "gatsby";
import { GatsbyPluginFixFoucOptions } from "./";

export const pluginOptionsSchema: GatsbyNode["pluginOptionsSchema"] = ({
  Joi,
}) => {
  const schema: Record<keyof GatsbyPluginFixFoucOptions, any> = {
    attributeName: Joi.string(),
    minWidth: Joi.number(),
    timeout: Joi.number(),
  };
  return Joi.object(schema);
};
