---
title: 新鮮こーげんやさい
katex: true
short: 久々の大規模改修のついでに、なぜかブログ機能を得てしまいましたので、初回の記事のついでに、こーげんやさい2022のデザインについて簡単に紹介します。
---
久々の大規模改修のついでに、なぜかブログ機能を得てしまいましたので、初回の記事のついでに、こーげんやさい2022のデザインについて簡単に紹介します。

### こーげんやさい2022のデザイン
こーげんやさい2022のUIは、リッチな見た目をできるだけ排除することを選びました。Webブラウザが標準で提供するUIをそのまま活かすという、Normalize.cssの方針を同じように自分にも適用したというところがあります。

なお、ダークモードに部分的に対応してあります。

他の方針として、たとえばcurlとかでHTMLを取ってきてもHTMLのままでそこそこ読めるように気をつけました。同時に適切なHTML5タグを使用して、機械からも多少はデータを拾いやすくするようにしています。

### のな式Markdown
全体的にMarkdownで書ける部分を増やしてあります。少しファイルを編集してコミットすると、GitHub Actionsの方でいい感じに回って、デプロイされるはずです。

登場時点の仕様として、CommonMark準拠文法、GitHub Flavoerd Markdownのうち取り消し線・表、$\KaTeX$を利用した$\LaTeX$文法数式のレンダリング、MDNのMarkdownを参考にしたプチコン用公開キー表示文法が導入されています。

遠くないうちに、`__`を使用した下線構文（DiscordのMarkdown風）を導入する予定です。

### Gitで管理されるブログ
高原は、後から更新可能な文章を結構な頻度で更新してしまいます。よくないことです。

今回はGitHub APIを活用して、ブログに関しては初回投稿と最終更新を拾うようにしています。今後のアップデートで、GitHubのWebサイトでのdiffのページにすぐ飛べるように改良するつもりです。

### まとめ：新しい「こーげんやさい」について
かなり手間をかけて準備してきましたが、様々な展開を作りやすい状態を作ることができました。今後とも、高原のなとこーげんやさいをよろしくお願いします。
