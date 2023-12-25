---
title: Stormworks の .xml ファイルの罠
short: （Stormworks 第2 Advent Calendar 2023 第11日目）Stormworks 関連の XML ファイルの罠の話です
highlight: true
---

> **Callout:** この記事は [Stormworks 第 2 Advent Calendar 2023](https://adventar.org/calendars/9267) 第 11 日目の記事です。

投稿が大変遅くなりました。11 日目の記事となります。Stormworks 関連の XML ファイルの罠の話です。

## XML の属性に使える名前

XML の属性名の先頭にハイフン、ピリオド、数字を含めることはできません。

XML の勧告文書において、`Name` は次のように定義されています。

> \[Definition: A Name is an Nmtoken with a restricted set of initial characters.\]
> Disallowed initial characters for Names include digits, diacritics, the full stop and the hyphen.

もっと明快な定義として、後に BNF 記法による定義があります。
開始タグに記述する属性名は、式40 、式 41 より、`Name`を用いることが分かります。

式 5 で定義される`Name`は、式 4 で定義される`NameStartChar`を 1 文字と
式 4a で定義される`NameChar`を 0 回以上繰り返すものと
定義されています。

そして式 4a を見ると`NameChar`は`NameStartChar`に
ハイフン、ピリオド、数字、その他いくらかの文字を加えて定義されていることがわかります。

すなわち、属性名の先頭にはハイフン、ピリオド、数字、その他いくらかの文字を使えないということです。

## Stormworks の XML の罠

さて、ここで Stormworks で扱う XML ファイルの適当な開始タグを見てみましょう。

```xml
<!-- Add-on の playlist.xml の例 -->
<spawn_transform 30="452.567108" 31="6.659514" 32="232.245178"/>...</spawn_transform>
```

おやおや、先に述べたルールに反して、属性名が`30`とか`31`とか`32`とかじゃないですか。

でも、こういった類の規格違反は（あまり容認したくないとはいえ）よくある話です。しかし、XML では厄介な問題が生じます。
なぜならば **XML パーサはここで処理を中断して、少なくとも例外を返さねばならない**ためです。

> Validating and non-validating processors alike MUST report violations of this specification's well-formedness constraints in the content of the document entity and any other parsed entities that they read.

まともに作られたパーサはここでエラーを返して止まってしまいます。わたしは線路を引きたいだけなのに！　でもどうすることもできないのです。

## 脱出口: ずるいパーサを使う

ずるいパーサを使うことでこの問題を回避できることがあります。大抵そういうのは高速さを売りにしたパーサです。

C 言語や C++ であれば [RapidXML](https://github.com/Fe-Bell/RapidXML)、JavaScript では [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser) が
例外を返さないので、ずるいパースができます。どちらも簡単なライブラリです。

いずれにしても……　こんな脱出口を使わねばならないのは、全部 Stormworks のせいです。（おわり）

## 参考文献
- W3C, [Extensible Markup Language (XML) 1.0 (Fifth Edition)](https://www.w3.org/TR/2008/REC-xml-20081126/), 2008-11-26, 2023-12-25 閲覧
- W3C, Hiroaki Hasegawa, [Extensible Markup Language (XML) 1.0 (第五版)](http://w4ard.eplusx.net/translation/W3C/REC-xml-20081126/#dt-validating), 2008-12-06, 2023-12-25 閲覧
