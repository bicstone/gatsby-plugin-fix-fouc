import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  plugins: [
    {
      resolve: "gatsby-plugin-fix-fouc",
      options: {
        minWidth: 600,
      },
    },
  ],
};

export default config;
