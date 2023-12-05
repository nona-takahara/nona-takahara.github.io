---
title: 関数入門（Stormworks の Lua 向け）
short: （Stormworks 第2 Advent Calendar 2023 第6日目）Lua の 関数についての理解を深め、応用することを目的とした入門記事です。
highlight: true
---

> **Callout:** この記事は [Stormworks 第 2 Advent Calendar 2023](https://adventar.org/calendars/9267) 第 6 日目の記事です。

この記事は、Lua の function（関数）についての理解を深め、応用することを目的とした記事です。対象読者のレベルは `if-else`、`for`、`while` 程度の制御構文を自分で書ける程度を想定しています。

なお、この記事は Stormworks の Lua に特化した内容です。独特な制約や、特別な API について断りなく進めますので、一般の入門記事として読まれる場合はご注意ください。

## 関数に触れてみる

まずはモニタで自動車のメーターパネルを作ることで関数の概要をつかみます。

トヨタが公開している[メーターパネルの画像](https://global.toyota/jp/download/30670619/)を参考にしています。

### 用語の定義

以下のプログラムは、度数法から弧度法への変換関数です。用語の説明を兼ねていますが、最後まで使います。

```lua
-- deg to rad; toと2が似てるので2が使われることがよくある
deg2rad = function(a)
    return math.pi * a / 180
end

-- 実行例
deg2rad(45) -- > 0.785... (= π/4)
```

Lua では**関数**を `function(...)`～`end` の形で表します。ここでの `a` を<strong><ruby>仮引数<rt>かりひきすう</rt></ruby></strong>と呼びます。仮引数はローカル変数として振舞います。

関数は `return` によって結果（**戻り値**）を返すことができます。戻り値をなしにして `return` とだけ書くこともできます。`return` を省略することもできます。Lua では、省略した場合の戻り値はなしとなります。

**ローカル変数**は、それの宣言と同じかより深いブロックの中でのみアクセス可能な変数です。Lua では`local` というキーワードを用いて宣言します。

ブロックの定義はやや面倒なので割愛しますが、おおむね `function`～`end`・`then`～`end`・`else`～`end`・`do`～`end` の中は一つのブロックとして扱われると覚えておいてください。

関数を呼び出すには、Lua では代入した変数名に`()`を付けます。仮引数を受け取ることができる関数には、例のようにして<strong><ruby>引数<rt>ひきすう</rt></ruby></strong>を渡すことができます。渡された引数は仮引数として定義された変数にコピーされ、関数の内部のブロックが実行されます。

なお、以下の 2 種類のコードは全く同じ意味です。<u>この後のコードは B タイプで示します</u>。

Lua では B タイプを A タイプの[シンタックス シュガー（糖衣構文）](https://ja.wikipedia.org/wiki/%E7%B3%96%E8%A1%A3%E6%A7%8B%E6%96%87)として[扱っています](http://milkpot.sakura.ne.jp/lua/lua53_manual_ja.html#3.4.11)。

```lua
-- Aタイプ
deg2rad = function(a)
    return math.pi * a / 180
end

-- Bタイプ
function deg2rad(a)
    return math.pi * a / 180
end
```

### パラメータだけが違う繰り返しを繰り返し書かない

今回モデルにしたメーターパネルには針が 4 本あります。ご存じの通り、針を描くためには `math.sin` と `math.cos` が必要ですから、4096 文字に押し込まねばならない我々には厳しい制約です。

針は、開始値とその角度・終了値とその角度・根本の位置・長さ・今の指針の位置がわかれば描画できます。それは 4 本とも同じです。共通部分をうまく切り出すことができれば `function` の出番となります。具体的にやってみると、以下のようなプログラムになるでしょうか。

```lua
-- 文字数削減のため、変数名を以下のように省略する。角度は度数法で渡す。
-- sv: 開始値, sa: 開始角度, ev: 終了値, ea: 終了角度
-- cx: 針の根本X座標, cy: 針の根本Y座標, ll: 針の長さ
-- vv: 現在値
function draw_needle(sv, sa, ev, ea, cx, cy, ll, vv)
    local nv = (vv - sv)/(ev - sv) -- 開始値 0・終了値 1 に正規化
    local na = deg2rad(nv * (ea - sa) + sa) -- 針の角度 [rad]
    --                 ↑ 先ほどの deg2rad を使っている
    screen.drawLine(cx, cy, cx + ll * math.cos(na), cy - ll * math.sin(na))
end
```

多くのプログラマは、数学的な関数でもある `deg2rad` も、厳密にはサブルーチン（"副処理"みたいな訳が適当でしょうか）と呼ぶべき `draw_needle` も関数と呼びます（分けて呼ぶ言語もあります）。プログラミングにおける関数は、引数を受け取ることができて戻り値を返すことができる処理のかたまり と理解しましょう。

ここまで来たら [Stormworks-PixelTracer](https://doma-itachi.github.io/Stormworks-PixelTracer/) とかを使って生成したパネル画像と組み合わせ合成すればよいでしょう。詳細な方法はこの記事の範囲外となるので、各々でいい感じにやりましょう。

これで我々は `draw_needle` に 7 つのパラメータと 1 つの変数による現在値を与えてつくる呼び出し行 を 4 つ書くだけでいい感じの針を得られることとなりました。

```lua
-- Stormworks 向け トヨタ提供画像風メーターパネル
-- 具体的な値・単位・範囲は例であり、各々最適な値に書き換えること。
function deg2rad(a)
    return math.pi * a / 180
end

function draw_needle(sv, sa, ev, ea, cx, cy, ll, vv)
    local nv = (vv - sv)/(ev - sv)
    local na = deg2rad(nv * (ea - sa) + sa)
    screen.drawLine(cx, cy, cx + ll * math.cos(na), cy - ll * math.sin(na))
end

revolution = 0
velocity = 0
temperature = 0
fuel = 0

function onTick()
    revolution = input.getNumber(1) -- 0-5
    velocity = input.getNumber(2) -- 0-160
    temperature = input.getNumber(3) -- 60-120
    fuel = input.getNumber(4) -- 0-1
end

function onDraw()
    -- 背景の描画処理は省略
    screen.setColor(255, 120, 0)
    draw_needle(0, 210, 5, 60, 12, 16, 8, revolution)
    draw_needle(0, 188, 160, -8, 32, 16, 12, velocity)
    draw_needle(60, 135, 120, 45, 52, 15, 8, temperature)
    draw_needle(0, -45, 1, 45, 54, 17, 8, fuel)
end
```

> **Note:** さらに学びたい方は、秋雨零時さんの「ストワで始める Lua」シリーズの第四回（[ゆっくり版](https://www.nicovideo.jp/watch/sm42080651)・[ボイロ版](https://www.nicovideo.jp/watch/sm42080687)）にて関数が取り上げられていますので、合わせてご覧になると良いでしょう。シリーズを通して見ることでさらに理解が深まると思います。

## テーブルと関数

> **Callout:** ここからの内容は、Stormworks のように`setmetatable`が使用できない環境向けの内容です。使える環境であれば「[お気楽 Lua プログラミング超入門 - Lua でオブジェクト指向](http://www.nct9.ne.jp/m_hiroi/light/lua05.html)」がよい記事ですので、おすすめします。

Lua にはテーブルという、データをひとまとめに扱う方法があります。プログラミングをする際に、このようなデータのかたまりに対して特定の処理を紐づけたいことがよくあります。この欲求に対するアプローチは次の 2 種類がよく知られており、よく使われています。

- 特定の形式を持ったテーブルを引数にもつ関数を用意する
- テーブル自体に処理関数を紐づける

Lua という言語自体には後者を省メモリで扱える仕組みが入っていますが、Stormworks では封じられています。そのため というほどではないのですが、前者を使うことがほとんどです。（前者すら使わず、これまでに説明した内容で済ませるケースの方が多いかもしれません。）

やはり具体例を示しながら概要を掴むのが良いと思いますので、先ほどの計器に滑らかな動作が要求されることになったという体で、プログラムを改造していきます。

### テーブルの形を定める

滑らかに動かす方法はいろいろありますが、今回は単純にするために、1 Tick に動ける最大角度を 1 度 に制限することにしましょう。

そのためには、計器における最小値と角度・最大値と角度・今の表示角度と、今の実際の値を持たせておくと便利でしょう。以下のような要素を持つことにします。

```lua
-- 定義
needle_table = {
    min_value, -- number
    min_angle, -- number [deg]
    max_value, -- number
    max_angle, -- number [deg]
    display_angle, -- number [deg]
    real_value -- number
}
```

続いて、1 Tick ごとに呼び出して表示角度を変えるための関数を作ります。都合がいいので、`real_value` を更新するのと同時に針の位置を決めてしまいましょう。

```lua
-- クランプを見やすくするための関数
function clamp(v, min, max)
    return math.min(math.max(v, min), max)
end

-- 文字数削減のため、変数名を以下のように省略する
-- n: needle_table, nr: 新しいreal_value
function update_needle(n, nr)
    local nv = (nr - n.min_value)/(n.max_value - n.min_value)
    local na = nv * (n.max_angle - n.min_angle) + n.min_angle

    n.real_value = nr
    n.display_angle = clamp(na, n.display_angle - 1, n.display_angle + 1)
end
```

ここで `update_needle` は `n` を返していないにもかかわらず、`n` として渡されたテーブルが更新されるという非常に奇妙な現象が発生します。<u>いまからこれを説明しますが</u>、逆に混乱を招くことがあるので、[難しいと思ったら次の見出しまで飛ばしてください](#残りの部分をテーブル仕様に改造する)。

---

Lua では、関数を呼び出す際に渡された引数を仮引数に新しくコピーします（この挙動を**値渡し**と言います）。値渡しの場合は仮引数を変更しても、呼び出し元の引数には何の影響も与えません。

それなのになぜテーブルが変更されているのかというと、テーブル変数に実際に入っている値は**参照**だからです。参照はだいたい"データの格納先アドレスを示す値"だと思ってください。

テーブルを引数に指定して関数を呼び出すと、テーブルの参照を仮引数にコピーします。参照は、テーブルデータの格納先アドレスを示す値ですので、`n.` の形で操作する限りは呼び出し元と仮引数とで全く同じデータを扱うことになります。これが、関数は `n` を返していないのにテーブルが更新されるカラクリでした。

なぜ変数にテーブルそのものが入っていないかというと、テーブルはとても大きくなることがあり、関数呼び出しのたびにコピーしていては実行コストが膨大なものとなってしまうからという説明を聞いたことがあります。

また、関数の中で `n` 自体に新しく値を代入しても呼び出し元には影響を及ぼしません。呼び出し元が引数として与えたテーブルを更新したくない場合は、新しくテーブルを作って、そこに様々な要素をコピーすることで実現します。

### 残りの部分をテーブル仕様に改造する

最後に `draw_needle` もテーブル仕様に改造しましょう。せっかくなので、テーブル一個渡せばすべての処理が済むように、テーブルの形も少し変えることにします。

```lua
-- 新バージョンの定義
needle_table = {
    min_value,
    min_angle,
    max_value,
    max_angle,
    center_x, -- number
    center_y, -- number
    length, -- number
    display_angle,
    real_value
}
```

```lua
-- 文字数削減のため、変数名を以下のように省略する
-- n: needle_table
function draw_needle(n)
    screen.drawLine(
        n.center_x,
        n.center_y,
        n.center_x + n.length * math.cos(deg2rad(n.display_angle)),
        n.center_y - n.length * math.sin(deg2rad(n.display_angle))
    )
end
```

各針の情報設定を冒頭部に集約した方が見通しがいいのでそのように変更して、最終的なコードを掲載します。

```lua
-- Stormworks 向け トヨタ提供画像風メーターパネル
-- 具体的な値・単位・範囲は例であり、各々最適な値に書き換えること。
revolution = {
    min_value = 0,
    min_angle = 210,
    max_value = 5,
    max_angle = 60,
    center_x = 12,
    center_y = 16,
    length = 8,
    display_angle = 0,
    real_value = 0
}

velocity = {
    min_value = 0,
    min_angle = 188,
    max_value = 160,
    max_angle = -8,
    center_x = 32,
    center_y = 16,
    length = 12,
    display_angle = 0,
    real_value = 0
}

temperature = {
    min_value = 60,
    min_angle = 135,
    max_value = 120,
    max_angle = 45,
    center_x = 52,
    center_y = 15,
    length = 8,
    display_angle = 0,
    real_value = 0
}

fuel = {
    min_value = 0,
    min_angle = -45,
    max_value = 1,
    max_angle = 45,
    center_x = 54,
    center_y = 17,
    length = 8,
    display_angle = 0,
    real_value = 0
}

function clamp(v, min, max)
    return math.min(math.max(v, min), max)
end

function update_needle(n, nr)
    local nv = (nr - n.min_value)/(n.max_value - n.min_value)
    local na = nv * (n.max_angle - n.min_angle) + n.min_angle

    n.real_value = nr
    n.display_angle = clamp(na, n.display_angle - 1, n.display_angle + 1)
end

function deg2rad(a)
    return math.pi * a / 180
end

function draw_needle(n)
    screen.drawLine(
        n.center_x,
        n.center_y,
        n.center_x + n.length * math.cos(deg2rad(n.display_angle)),
        n.center_y - n.length * math.sin(deg2rad(n.display_angle))
    )
end

function onTick()
    update_needle(revolution, input.getNumber(1)) -- 0-5
    update_needle(velocity, input.getNumber(2)) -- 0-160
    update_needle(temperature, input.getNumber(3)) -- 60-120
    update_needle(fuel, input.getNumber(4)) -- 0-1
end

function onDraw()
    -- 背景の描画処理は省略
    screen.setColor(255, 120, 0)
    draw_needle(revolution)
    draw_needle(velocity)
    draw_needle(temperature)
    draw_needle(fuel)
end
```

コード自体はかなり長くなり、文字数も増えましたが、意味はつかみやすくなったのではないでしょうか。

Stormworks のビークル Lua のような異様な文字数制限がかかった環境では意味がないことが多いですが、より大規模なプログラミングをするとき、データの塊に対して特定の処理を割り当てる書き方が役に立ってくるはずです。

以上で、関数入門の記事本編は終わりです。ありがとうございました。

> **Note:** さらに学びたい方は、秋雨零時さんの「ストワで始める Lua」シリーズの第五回（[ゆっくり版](https://www.nicovideo.jp/watch/sm42115011)・[ボイロ版](https://www.nicovideo.jp/watch/sm42115018)）にて本稿の後半部分に相当する内容が取り上げられていますので、合わせてご覧になると良いでしょう。シリーズを通して見ることでさらに理解が深まると思います。

## おまけ：アノテーション

<!-- TODO: 17日目が公開されたら記事にリンク張る更新をする -->

第 17 日目を担当される予定の、難でも欲ね さんの記事で使用する（らしい）[Stormworks Lua with LifeBoatAPI](https://marketplace.visualstudio.com/items?itemName=NameousChangey.lifeboatapi) を導入するすると、ついでに Visual Studio Code にさまざまな拡張機能が導入されます。その機能の一つに、**アノテーション**機能があります。

アノテーションを適切に使うと、関数やテーブルの要素名に対してエディタの入力補完機能が使えるようになり、またプログラムの編集中にデータ型の誤りに気づけるようになるなど、メリットが多いので推奨しています。

該当の拡張機能の導入方法および操作方法については、[Stormworks ビークル Lua 入門 第０章　環境構築](https://qiita.com/yukimaru73/items/ea49d9032e3cfa2e529a) をご覧ください。非常に独特の操作形態を持つツールなので、事前情報がないと苦しいです。

アノテーションの詳細については [Annotations — EmmyLua for IntelliJ IDEA 1.0 documentation](https://emmylua.github.io/annotation.html) や [VCI における、アノテーションの書き方(VSCode:EmmyLua)](https://qiita.com/feath/items/411b85c9d38b228461b9) を参考にしてください。

本稿では紹介のみとさせていただきます。
