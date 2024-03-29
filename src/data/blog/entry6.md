---
title: 「こーげんやさい」の生成エンジンをAstroに変更しました！
short: 「こーげんやさい」の生成エンジンをEJSと自作スクリプトによる方法からAstroに変更しました。
---

「こーげんやさい」の生成エンジンを EJS と自作スクリプトによる方法から[Astro](https://astro.build/)に変更しました。

## Astro を選んだ理由

これまで使用してきた EJS と自作スクリプトによる方法はまあまあ悪くない挙動を示していました。しかし 7 月の CVE 警告メールを受けて対応した際にビルドが失敗し、メンテナンス性をきちんと考慮に入れる必要があることに気づきました。

そのため、PHP の親戚みたいな記法のテンプレートエンジンはやめて、JSX（や、その親戚の言語）を使用して書けるビルドツールとして、Astro と Next.js による静的出力（[Deploying: Static Exports | Next.js](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)）を比較しました。

最終的に、[新鮮こーげんやさい](./entry1.html) でも述べた「たとえば curl とかで HTML を取ってきても HTML のままでそこそこ読める」の要件を満たせる Astro を採用しました。

## Astro への切り替えの際に課した制約

以下の制約を課して切り替えました。

- URI としての理想を実現するため、出力 HTML ファイルと画像ファイルの URL の変更禁止
- コミットログを使用して初投稿・最終更新の管理を行っているため `src/data/blog/*.md` の位置の変更禁止
- 「こーげんやさい」用 Markdown 文法の継続使用

Markdown のパースは EJS 時代から [remark](https://remark.js.org/) を使用していましたが、Astro でも remark が採用されていることから、いったん単純に移植してあります。

## こーげんやさい 2023 デザインへの切り替えに向けて

デザインの観点からすると、こーげんやさい 2022 はまだまだ全然です。また CSS でできることもだいぶ増えています。

最新技術や Astro だからこそ手軽にできるようになったことを組み合わせて新しいこーげんやさい・高原のなデザインに切替えようと考えています。10 月には提供開始することを目指しています。
