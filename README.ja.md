# Gatsby Plugin Fix FOUC

Gatsby Plugin Fix FOUC は、生成された CSS が読み込まれてから Gatsby のレンダリングが行われるまでの間にスタイルが変化してちらつく問題 (FOUC - flash of unstyled content) を解決するプラグインです。

Gatsby v3 - v5 をサポートしています。

<details>

<summary>ビフォーアフターの画面収録 (注意: gifアニメを使用しています)</summary>

| ビフォー                                                                                | アフター                                                                                                                                  |
| --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| ![崩れたスタイルが一瞬表示されている画面](/docs/readme-images/without-plugin-movie.gif) | ![Gatsby のレンダリングが行われるまでページを隠すことで、崩れたスタイルが表示されていない画面](/docs/readme-images/with-plugin-movie.gif) |

</details>

## 仕組み

`<body>` 要素に data 属性を追加し、クライアント側で Gatsby のレンダリングが行われるまでページを非表示にすることで、ちらつきが表示されないようにします。

このアプローチは、[Google](https://developers.google.com/optimize/) でも採用されています。再レンダリングが不要で、パフォーマンスやアクセシビリティに影響を与えません。

## トレードオフ

Lighthouse のスコア (First Contentful Paint, Largest Contentful Paint) が低下します。 結果として、SEO に影響を与える可能性があります。 (ただし、Cumulative Layout Shift のスコアは改善します)。

`minWidth` を設定することで、画面を隠さない幅を指定することができます。

## インストール

```bash
yarn add gatsby-plugin-fix-fouc

# or

npm install gatsby-plugin-fix-fouc
```

## 使用方法

```js
// gatsby-config.js

module.exports = {
  plugins: [`gatsby-plugin-fix-fouc`],
};
```

## 高度な使用方法

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

## 設定

| Property        | Type   | Default                             | Description                                                                                                                |
| --------------- | ------ | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `attributeName` | string | `gatsby-plugin-fix-fouc-is-loading` | 追加される data-attribute 名                                                                                               |
| `minWidth`      | number | `0`                                 | ページを非表示にする最小幅 (px)。設定しない場合は、幅に関係なく非表示になります。                                          |
| `timeout`       | number | `4000`                              | 最初のレンダリングが完了しなかった場合でも、フォールバックとしてページを表示するまでのタイマー時間（ミリ秒）を指定します。 |

## ライセンス

MIT License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fbicstone%2Fgatsby-plugin-fix-fouc.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fbicstone%2Fgatsby-plugin-fix-fouc?ref=badge_large)
