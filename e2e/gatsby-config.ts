import type { GatsbyConfig } from "gatsby";
import path from "path";

const config: GatsbyConfig = {
  plugins: [
    {
      resolve: path.resolve(__dirname, "../"),
    },
  ],
};

export default config;
