---
title: Storm Kamishibai
id: storm-kamishibai
short: Stormworks用のモニタ描画Luaプログラムジェネレータ
order: 2
category:
    - Stormworks
    - Web
latest:
    dateiso: 2022-09-10
    version: v0.5.1
links:
    - text: Storm Kamishibai (Webアプリ利用の際はこちらから)
      url: https://nona-takahara.github.io/storm-kamishibai/
    - text: GitHub リポジトリ
      url: https://github.com/nona-takahara/storm-kamishibai
---
Stormworksで、大量の画像コマから1つ選んで画像を表示するような、モニタ用Luaコードを自動生成するツールです。
**コマ数や色数が少ない場合や、Luaコードを自分で書きたい方は他のツールの利用が便利です**
（Luaコードを自分で書ける方には 土間いたち さんによる [Stormworks-PixelTracer](https://doma-itachi.github.io/Stormworks-PixelTracer/) を、単純に画像を変換するだけの場合には Mr Lennyn 氏による [Image Lua Converter](https://mrlennyn.github.io/imagetolua/imagetolua.html) を推奨しています）。

1枚のPNGまたはGIF画像に複数コマを含めておいて、変換を実施すると大量のLuaコードが生成されるので、Luaブロックにコピペの上でうまく繋げます。

生成されたコードは、Luaブロックに入力されたCompositeの数値チャンネルの値をもとに、画像を1枚表示してくれます。


