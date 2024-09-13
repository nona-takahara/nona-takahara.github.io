---
title: "【Stormworks v1.9.19】 property の終わりにカンマをつけろ"
short: （Stormworks 第2 Advent Calendar 2023 第18日目）アドオンのpropertyでハマった罠の話をします。
highlight: true
---

> **Callout:** この記事は [Stormworks 第 2 Advent Calendar 2023](https://adventar.org/calendars/9267) 第 18 日目の記事です。

動画にするアドオンの話をする予定でしたが、もうちょっと的を絞って、動画にするアドオンでハマった罠の話をします。

昨日（12 月 17 日）ハマってとりあえず解決したばかりのことですので、細かいことは未検証です。後で更新します。

## default value を効かせるにはケツカンマ

Stormworks の Add-on Lua に property という機能がいつからか追加されています。

開発側では次のようにして利用することを想定しているようです。これをトップレベルに置いてよい理由は wikiwiki に解説がありました。
この書き方の場合、ケツカンマ（trailing comma）を入れないと default value がうまく効かないようです。

<!-- wikiwiki の解説要約: g_savedata は セーブデータ読み込み時に、トップレベル実行後にセーブされた内容で上書きされるそう。 -->

なんで？

```lua
-- 注：最後のカンマは省略できない
g_savedata = {
    slider_value = property.slider("slider label", min, max, increment, default_value_number),
    checkbox_checked = property.checkbox("checkbox_label", default_value_boolean),
}
```

## property は文字列として検出しているっぽい挙動

今作ってるアドオンは、全コードの合計文字数が 12 万文字を超えており、上限の 131072 文字にかなり近づいているため、
VSCode の Stormworks Extension の機能を使っておよそ半分の文字数に圧縮しています。

しかし、圧縮してしまうと property の機能が使えなくなってしまいました。
この理由は Stormworks が property を（実際に Lua を実行するのではなく）文字列パターンで検出しているからと推測されます。

圧縮の際に消えることを回避するため、[長い形式の文字列リテラル](http://milkpot.sakura.ne.jp/lua/lua53_manual_ja.html#3.1)を使って
Stormworks を騙します。

```lua
-- Stormworksを騙す。関数の後にコンマを入れないと認識してくれないようである。
fake_property = [[
g_savedata = {
	slider_value = property.slider("slider label", min, max, increment, default_value_number),
    checkbox_checked = property.checkbox("checkbox_label", default_value_boolean),
}
]]

-- この書き方が圧縮後も大丈夫かどうかは実は未検証……
g_savedata = {
    slider_value = property.slider("slider label", min, max, increment, default_value_number),
    checkbox_checked = property.checkbox("checkbox_label", default_value_boolean),
}
```

## 未検証の内容

default value が本当にケツカンマトリガなのかは確かめる必要があります。

g_savedata の間接参照を行っても大丈夫かどうかは未検証です。wikiwiki に書いてあった解説を読む限り、トップレベル実行後に参照先が変わる可能性があります。

近日中にリリースするアドオンがこれに耐えられるか不安なため、念のため丁寧に検証するつもりなので、その時の知見で記事を更新する予定です。
