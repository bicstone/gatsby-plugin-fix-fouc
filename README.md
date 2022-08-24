# Gatsby Plugin Fix FOUC

[![CI](https://github.com/bicstone/gatsby-plugin-fix-fouc/actions/workflows/ci.yml/badge.svg)](https://github.com/bicstone/gatsby-plugin-fix-fouc/actions/workflows/ci.yml)
[![coverage](https://github.com/bicstone/gatsby-plugin-fix-fouc/actions/workflows/coverage.yml/badge.svg)](https://github.com/bicstone/gatsby-plugin-fix-fouc/actions/workflows/coverage.yml)
[![njsscan sarif](https://github.com/bicstone/gatsby-plugin-fix-fouc/actions/workflows/njsscan-analysis.yml/badge.svg)](https://github.com/bicstone/gatsby-plugin-fix-fouc/actions/workflows/njsscan-analysis.yml)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fbicstone%2Fgatsby-plugin-fix-fouc.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fbicstone%2Fgatsby-plugin-fix-fouc?ref=badge_shield)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=bicstone_gatsby-plugin-fix-fouc&metric=alert_status)](https://sonarcloud.io/dashboard?id=bicstone_gatsby-plugin-fix-fouc)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/bicstone/gatsby-plugin-fix-fouc.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/bicstone/gatsby-plugin-fix-fouc/alerts/)
[![DeepSource](https://deepsource.io/gh/bicstone/gatsby-plugin-fix-fouc.svg/?label=active+issues&token=iPw2LS4cY5EQQH_JiN72YOr2)](https://deepsource.io/gh/bicstone/gatsby-plugin-fix-fouc/?ref=repository-badge)
[![codecov](https://codecov.io/gh/bicstone/gatsby-plugin-fix-fouc/branch/master/graph/badge.svg?token=QRLLFDZD15)](https://codecov.io/gh/bicstone/gatsby-plugin-fix-fouc)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

Gatsby Plugin Fix FOUC is a plugin that solves flash of unstyled content.

## How Does It Work

Adds a data attribute to the `<body>` element that hides the page until the initial render of Gatsby App is done on the client, so that the awful flicker is not shown to you.  
This approach is also used by [Google](https://developers.google.com/optimize/). Does not re-rendering and has no impact on performance and accessibility.

## Trade-Off

Lighthouse scores will decrease. (First Contentful Paint, Largest Contentful Paint) as a result, it may affect SEO. (but, Cumulative Layout Shift scores improve.)  
You can specify the width that does not hide the screen by setting `breakpoint`.

## Install

```bash
yarn add @gatsby-plugin-fix-fouc

# or

npm install @gatsby-plugin-fix-fouc
```

## Usage

```js
// gatsby-config.js

module.exports = {
  plugins: [`gatsby-plugin-fix-fouc`],
};
```

## Advanced

```ts
// gatsby-config.ts

import { breakpoints } from "./src/themes";

import type { GatsbyConfig } from "gatsby";
import type { GatsbyPluginFixFoucOptions } from "gatsby-plugin-fix-fouc";

const config: GatsbyConfig = {
  plugins: [
    {
      resolve: `gatsby-plugin-fix-fouc`,
      options: {
        attributeName: "is-loading",
        breakpoint: breakpoints.values.sm,
        timeout: 3000,
      } as GatsbyPluginFixFoucOptions,
    },
  ],
};

export default config;
```

### Options

| Property        | Type   | Default                             | Description                                                                                                                  |
| --------------- | ------ | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `attributeName` | string | `gatsby-plugin-fix-fouc-is-loading` | The data-\* attribute name to be added.                                                                                      |
| `minWidth`      | number | `0`                                 | The minimum width (px) of hides the page. If not set, hides regardless of width.                                             |
| `timeout`       | number | `2000`                              | The time (milliseconds) of the timer should wait before shows the page as a fallback even if the initial render is not done. |

### LICENCE

MIT License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fbicstone%2Fgatsby-plugin-fix-fouc.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fbicstone%2Fgatsby-plugin-fix-fouc?ref=badge_large)
