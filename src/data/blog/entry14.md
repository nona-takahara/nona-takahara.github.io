---
title: 【修正済】ブログの投稿日情報を吹き飛ばしました
originalTitle: ブログの投稿日情報を吹き飛ばしました
short: "ディレクトリのリネームをしたらファイルのコミット日時のログを吹き飛ばしてしまいました"
---

ディレクトリのリネームをしたらファイルのコミット日時のログを吹き飛ばしてしまいました。テストしてからやればよかったのに……

混乱のもとになるので、いったんは投稿日時情報を消しておきます。（追記：修正できたため、投稿日時情報が復活しました）

もし復旧できたら、この記事に何かしら情報が継ぎ足されているはずです。

## 対応記録 その1

```
git log --follow <TARGET>
```

でリネーム前のコミットが追跡できました（見た記事: [gitでrename&modifyしたファイルのログを追跡できるようにしたい場合 #Git - Qiita](https://qiita.com/yukimura1227/items/fbb076db61a2e43a32e3)）。

しかし、現状のこーげんやさいはGitHub APIを介して取得しており、またGitコマンドの使用も試したけど失敗しているのが実情です。

## 対応記録 その2

Actionsの`actions/checkout`で`fetch-depth`を`0`に指定すると、ちゃんと全コミット履歴を拾ってくるそうです（見た記事: [GitHubActionsでリポジトリ内の全てのコミット履歴を取得できるようにする | okaryo.log](https://blog.okaryo.io/20221004-allow-githut-actions-to-retrieve-all-commit-history)）。

ビルドにかかる時間は正直あまり気にしていないので、これでうまくいくか検証するのはアリでしょう。

もう夜遅いので明日以降で見てみます。

## 対応記録 その3

以上の方針で修正しました。修正にあたってはgit logをNode.jsから上手に扱うために<https://github.com/domharrington/node-gitlog>を利用しました。