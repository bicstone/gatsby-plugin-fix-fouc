# Gatsby Plugin Fix FOUC

[![Build](https://github.com/bicstone/gatsby-plugin-fix-fouc/actions/workflows/ci.yml/badge.svg)](https://github.com/bicstone/gatsby-plugin-fix-fouc/actions/workflows/ci.yml)
[![Linter](https://github.com/bicstone/gatsby-plugin-fix-fouc/actions/workflows/linter.yml/badge.svg)](https://github.com/bicstone/gatsby-plugin-fix-fouc/actions/workflows/linter.yml)
[![Publish (latest)](https://github.com/bicstone/gatsby-plugin-fix-fouc/actions/workflows/publish-latest.yml/badge.svg)](https://github.com/bicstone/gatsby-plugin-fix-fouc/actions/workflows/publish-latest.yml)
[![Publish (next)](https://github.com/bicstone/gatsby-plugin-fix-fouc/actions/workflows/publish-next.yml/badge.svg)](https://github.com/bicstone/gatsby-plugin-fix-fouc/actions/workflows/publish-next.yml)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fbicstone%2Fgatsby-plugin-fix-fouc.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fbicstone%2Fgatsby-plugin-fix-fouc?ref=badge_shield)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=bicstone_gatsby-plugin-fix-fouc&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=bicstone_gatsby-plugin-fix-fouc)
[![DeepSource](https://deepsource.io/gh/bicstone/gatsby-plugin-fix-fouc.svg/?label=active+issues&token=o00wTEndphJPK3wZIrU6C0OZ)](https://deepsource.io/gh/bicstone/gatsby-plugin-fix-fouc/?ref=repository-badge)
[![codecov](https://codecov.io/gh/bicstone/gatsby-plugin-fix-fouc/branch/main/graph/badge.svg?token=ACW4cNAmjT)](https://codecov.io/gh/bicstone/gatsby-plugin-fix-fouc)
[![npm](https://img.shields.io/npm/dm/gatsby-plugin-fix-fouc.svg?&logo=npm)](https://www.npmjs.com/package/gatsby-plugin-fix-fouc)

Gatsby Plugin Fix FOUC is a plugin that solves flash of unstyled content.

⚠ Not adequately tested. Please use this plugin at your own risk. We welcome your feedback.

## How Does It Work

Adds a data attribute to the `<body>` element that hides the page until the initial render of Gatsby App is done on the client, so that the awful flicker is not shown to you.  
This approach is also used by [Google](https://developers.google.com/optimize/). Does not re-rendering and has no impact on performance and accessibility.

## Trade-Off

Lighthouse scores will decrease. (First Contentful Paint, Largest Contentful Paint) as a result, it may affect SEO. (but, Cumulative Layout Shift scores improve.)  
You can specify the width that does not hide the screen by setting `minWidth`.

## Install

```bash
yarn add gatsby-plugin-fix-fouc

# or

npm install gatsby-plugin-fix-fouc
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
import type { GatsbyPluginFixFoucRefOptions } from "gatsby-plugin-fix-fouc";

const config: GatsbyConfig = {
  plugins: [
    {
      resolve: `gatsby-plugin-fix-fouc`,
      options: {
        attributeName: "is-loading",
        minWidth: breakpoints.values.sm,
        timeout: 3000,
      } as GatsbyPluginFixFoucRefOptions,
    },
  ],
};

export default config;
```

## Options

| Property        | Type   | Default                             | Description                                                                                                                  |
| --------------- | ------ | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `attributeName` | string | `gatsby-plugin-fix-fouc-is-loading` | The data-\* attribute name to be added.                                                                                      |
| `minWidth`      | number | `0`                                 | The minimum width (px) of hides the page. If not set, hides regardless of width.                                             |
| `timeout`       | number | `2000`                              | The time (milliseconds) of the timer should wait before shows the page as a fallback even if the initial render is not done. |

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://bicstone.me/"><img src="https://avatars.githubusercontent.com/u/47806818?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Oishi Takanori</b></sub></a><br /><a href="#ideas-bicstone" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/bicstone/gatsby-plugin-fix-fouc/commits?author=bicstone" title="Code">💻</a> <a href="#maintenance-bicstone" title="Maintenance">🚧</a> <a href="#question-bicstone" title="Answering Questions">💬</a> <a href="https://github.com/bicstone/gatsby-plugin-fix-fouc/commits?author=bicstone" title="Documentation">📖</a> <a href="https://github.com/bicstone/gatsby-plugin-fix-fouc/pulls?q=is%3Apr+reviewed-by%3Abicstone" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## LICENCE

MIT License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fbicstone%2Fgatsby-plugin-fix-fouc.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fbicstone%2Fgatsby-plugin-fix-fouc?ref=badge_large)
