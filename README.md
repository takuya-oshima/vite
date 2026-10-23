# vite

Web制作の案件で使うために構築した、Viteの開発環境です。
これまで使っていた [gulp](https://github.com/takuya-oshima/gulp) や [webpack](https://github.com/takuya-oshima/webpack) の環境から、より高速なViteへ移行するために作成しました。

## 使用技術

Vite / Sass / EJS / PostCSS / Prettier

## できること

- 複数ページのHTMLを自動で読み込んでビルド（`src` 配下のHTMLを一括で処理）
- EJSでヘッダー・フッターなどを共通化
- Sassのコンパイル
- PostCSSによるベンダープレフィックスの付与、メディアクエリの整理、プロパティの並び替え
- 画像の圧縮とWebPへの変換
- ファイル保存時のブラウザ自動更新
- ビルド時のHTML整形と、CSS・JS・画像・フォントの出力先の整理

## 使い方

```bash
npm install
npm run dev     # 開発サーバーを起動
npm run build   # 本番用にビルド
```
