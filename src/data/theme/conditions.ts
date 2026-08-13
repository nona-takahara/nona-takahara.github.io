// 配色は OS 設定への追従のみを行う（JS のテーマトグルは持たない）。
//
// 注意: セマンティックトークンの CSS 変数生成では、Panda が `light` の
// 親セレクタを抽出して `:where(:root, .light)` にまとめるため詳細度は 0 になり、
// `dark` の @media と同詳細度になってソース順で決まる。トークンは全て
// `_light` を先に書いているのでダークが後勝ちする。
//
// 一方、**コンポーネントのスタイルで `_light` と `_dark` を同じ要素に併用しては
// いけない**。スタイル出力では `:where()` に包まれず `:root .cls`(0,2,0) が
// `@media { .cls }`(0,1,0) に常に勝ってしまい、ダークが効かなくなる。
// 配色の出し分けはセマンティックトークン側で行うこと。
export const conditions = {
  extend: {
    dark: '@media (prefers-color-scheme: dark)',
    light: ':root &, .light &',
    invalid: '&:is(:user-invalid, [data-invalid], [aria-invalid=true])',
    hover: '&:not(:disabled):hover',
    active: '&:not(:disabled):active',
    checked:
      '&:is(:checked, [data-checked], [data-state=checked], [aria-checked=true], [data-state=indeterminate])',
    on: '&:is([data-state=on])',
    pinned: '&:is([data-pinned])',
  },
} as const
