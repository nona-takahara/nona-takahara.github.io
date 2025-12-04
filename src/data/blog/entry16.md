---
title: "【Stormwokrs】storm-lua-minifyで作る玄人向けAdd-on Lua開発環境"
short: （Stormworks Advent Calendar 2025 第4日目）大規模Add-on Lua開発向けの開発環境（拙作）を紹介します
---

> **Callout:** この記事は [Stormworks Advent Calendar 2025](https://adventar.org/calendars/11638) 第 4 日目の記事です。

[無免ライター氏による「VSCode導入方法」](https://note.com/mumenry/n/n5376ae45b7e0)はStormworksのLuaをVSCodeで扱う標準的な方法ですが、別の方法だってあります！

それが拙作ツール **[storm-lua-minify](https://github.com/nona-takahara/storm-lua-minify)** を使う方法です。Stormworks Lua with LifeBoatAPI Extension（以下VSCode Stormworks Extension）とは異なる特徴を持つため、ユースケースにピッタリな人も、全然そうでない人もいると思います。是非ピッタリな方を使ってください！

## storm-lua-minifyの特徴

VSCode Stormworks Extensionと、storm-lua-minifyを比較した場合の大きな特徴は以下の3つです：

- [Source Map](https://firefox-source-docs.mozilla.org/devtools-user/debugger/how_to/use_a_source_map/index.html)出力対応
- CLIユーザーにとって（比較的）素直なインターフェース
- 純粋なLuaに近い`require` `dofile`解決

現時点でのminify能力はVSCode Stormworks Extensionに圧倒的に劣り、不要コードの削除もできないので、コード圧縮ツールを使いたいというニーズには全く合致しません。それでもstorm-lua-minifyが圧倒的に役立つシーンがあります。

大規模なAdd-on Luaの開発では、プログラムのモジュール化、Stormworks外でのテスト、Stormworks上でのデバッグ、ファイルの自動生成といった作業が必要になることがあります。storm-lua-minifyではそのような大規模開発では非常に強力です。

### Source Map出力

StormworksのLuaのデバッグは非常にしんどいです。しかも、minifyをするともはやプログラムが追跡不可能になります。

storm-lua-minifyでは、少しでも追跡性を高めるため、Source Mapを出力します。これによって、エラー行からオリジナルソースの場所を追跡しやすくなります。本稿の後半で推奨拡張機能も紹介します。

### 素直なCLI

storm-lua-minifyは、Node.js製という怪しさはあるものの、比較的素直なコマンドラインインターフェース（CLI）を持ちます。そのため、エディタはVisual Studio Codeに限定されません。

また、コマンドプロンプトやシェルから直接呼び出す、Pythonなどの別のプログラム言語から呼び出す、Makeなどのソフトを併用するなどの利用が非常に簡単です。

### `require`の挙動を模倣

モジュール化したプログラムをStormworks外でテストする場合、VSCode Stormworks Extensionの`require`の挙動に悩まされることになります。

VSCode Stormworks Extensionは、`require`を（C言語とかのプリプロセッサマクロのように）その場で展開しますが、オリジナルのLuaの`require`は、そのファイルを一つの関数のように実行します（[参考資料(Qiita)](https://qiita.com/mod_poppo/items/ef3d8a6fe03f7f426426)）。これらの両方で正確に動作するように書くことは難しいです。

storm-lua-minifyの**モジュールモード**では、`require`を特殊な方法で展開し、Stormworks上では関数のように実行します。このため、オリジナルのLuaに近い挙動になり、テストが簡単になります。代わりに、`dofile`はその場で展開します。これもオリジナルのLuaに近い挙動を示します。

## 投げやりな環境構築

### やっぱりVisual Studio Codeが便利

Visual Stuido Codeでの利用が便利なので、一応それで紹介します。Visual Studio Codeのセットアップは[無免ライター氏による「VSCode導入方法」](https://note.com/mumenry/n/n5376ae45b7e0)に譲ります。なにより、storm-lua-minifyが有利な場面は限られるので、普通にVSCode Stormworks Extensionは準備しておいた方が良いです（あと、Lua DebugによるIntellisenseの拡張がとにかく便利なんだ）。

### 複雑怪奇なNode.js（説明になってないです）

storm-lua-minifyはNode.jsで動作するのでそれの導入が必要です。しかし、どの導入法をこの記事に書くのが適しているかイマイチよくわかりません。パッと思いついた方法をいくつか並べるので、適宜選んでください（上の方が管理上推奨度高いけど、下の方が簡単で推奨度高い）。`npm`とか`pnpm`とかよくわかんないけど、それも準備してください。

- [Voltaでインストール（Zennにある解説記事なのだ）](https://zenn.dev/sasori_256/articles/880e06b3b94b38)
- [nvm-windowsでインストール（Zennにある解説記事）](https://zenn.dev/keison8864/articles/nvm-windows-nodejs-install)
- [Node.jsの公式版をインストール（Zennにある解説記事）](https://zenn.dev/kuuki/articles/windows-nodejs-install)


Node.jsとnpmだかpnpmだかを準備したら、以下のコマンドで、一応storm-lua-minifyを（グローバルに）インストールできます。が、**条件によって適切な方法が変わる**し、このあたり乱立しすぎてわからないし、なんかうまくやってください。

```
npm i --global storm-lua-minify
```

そうしたら、

```
npx storm-lua-minify (入力ファイル名)
# または #
npx storm-lua-minify -m (入力ファイル名)
```

で使うことができます（`-m`を指定するとモジュールモードになります）。

## 便利な使い方

ここまでの内容が複雑すぎてわかんねーや！って方は多分、VSCode Stormworks Extensionの方が便利です。というわけで2日目の記事に行きましょう～

大規模開発では、Source Mapで行数変換を行うことと、ツールチェインが必要になります。わたしが使っている拡張やツールチェインを紹介します。

### 併用するべきVSCode拡張機能

出力されたSource Mapを読むには、[Source Map Visualization
(by Colder)](https://marketplace.visualstudio.com/items?itemName=colder.source-map-visualization)が便利です。~~というか、他のビューアだとうまく開けなかった（storm-lua-minifyの設計ミスだと思います）。~~

詳しい使い方は解説しませんが、`script.min.lua`をSource Map Visualization拡張で開くことで、元のソースコードを追跡できます。

また、Lua Debugは必須に近いです。Emmy Luaというドキュメンテーションコメントに対応しています。

### ツールチェインの自作

`npm init`などで、パッケージ管理ツールを使用可能にして、`storm-lua-minify`と`dotenv`を（ローカルに）インストールした上で、以下のようなスクリプトを組むと便利です。利用の際には同じフォルダに`.env`というファイルを作成し、`PROJECT_DIR=(Add-onのフォルダへのフルパス)`という1行を書いておきましょう。

我々の N-TRACS for Stormworks プロジェクトでもこれの魔改造版を使用しています。

```js
// index.jsとして保存
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
require('dotenv').config();

process.chdir(__dirname);

// storm-lua-minfyを実行
console.log(execSync("npx storm-lua-minify -m script.lua").toString());

// 出力結果を適切にコピー
if (!fs.existsSync("dist")) {
    fs.mkdirSync("dist");
}
fs.copyFileSync("script.lua.map", "dist/script.lua.map");
fs.copyFileSync("script.min.lua", "dist/script.min.lua");

// Add-onのscript.luaにコピー
if (process.env.PROJECT_DIR) {
    fs.copyFileSync("script.min.lua", path.join(process.env.PROJECT_DIR, "script.lua"));
    console.log("Copied! " + (new Date().toLocaleTimeString()));

}

// 仮生成物を削除
fs.rmSync("script.lua.map");
fs.rmSync("script.min.lua");
```

## まとめ

- 大規模Add-on Luaの開発などの場面において、storm-lua-minifyを使うと便利な場面がある
- オリジナルのLuaのモジュールを模倣する機能や、Source Mapによって、デバッグ効率を追求できる
- 素直なCLIを持つので、使い慣れたプログラム言語やツールチェインの中に入れて使いやすい

他にも色々なちょっといい機能が載っています。Stormworksで大規模なAdd-on Lua開発をする事態に追い込まれたら、是非使ってみてください！

（滑り込みセーフ……）
