import { defineConfig } from "vite";
import { resolve } from 'path';
import { ViteEjsPlugin } from "vite-plugin-ejs"; //ejsのプラグイン
import { globSync } from 'glob'; //globのプラグイン
import path from 'node:path'; //上記の実行次にnpmのpathを利用
import { fileURLToPath } from 'node:url'; //上記の実行時にURLをpathに変更させるため
import liveReload from 'vite-plugin-live-reload' //ライブリロード用プラグイン
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'; //画像圧縮用プラグイン
import VitePluginWebpAndPath from 'vite-plugin-webp-and-path'; //jpeとpngをwebpに変換するプラグイン


// JS、SCSSなどの各ファイルの名称、path情報を配列に格納
// HTMLファイルを取得する設定
const htmlFiles = Object.fromEntries(
  globSync('src/**/*.html', { ignore: ['node_modules/**', '**/dist/**'] }).map(file => [
    path.relative(
      'src',
      file.slice(0, file.length - path.extname(file).length)
    ),
    fileURLToPath(new URL(file, import.meta.url))
  ])
);
// SCSSファイルを取得する設定
const scssFiles = Object.fromEntries(
  globSync('src/scss/**/*.scss', { ignore: ['src/scss/**/_*.scss'] }).map(file => [
    path.relative(
      'src',
      file.slice(0, file.length - path.extname(file).length)
    ),
    fileURLToPath(new URL(file, import.meta.url))
  ])
);
// JSファイルを取得する設定
const jsFiles = Object.fromEntries(
  globSync('src/**/*.js', { ignore: ['node_modules/**','**/modules/**','**/dist/**']}).map(file => [
    path.relative(
      'src',
      file.slice(0, file.length - path.extname(file).length)
    ),
    fileURLToPath(new URL(file, import.meta.url))
  ])
);

//上記各ファイル情報の配列をまとめて、Objectにする
const inputObject = {
  ...htmlFiles,
  ...scssFiles,
  ...jsFiles,
};


export default defineConfig(() => {
  return {
    root: './src', //出力先ディレクトリの指定
    base: './', //相対パスにするための設定
    build: {
      outDir: '../dist', //出力先ディレクトリの指定
      emptyOutDir: true, //build時に出力先ディレクトリを空にする
      rollupOptions: { //出力先ファイル名を入力元ファイルを元にする設定をする
        input: inputObject,
        output: {
          entryFileNames: '[name].js', //JSファイルの出力設定
          chunkFileNames: 'js/modules/[name].js',//chunkファイルをmoduleディレクトリに入れる
          assetFileNames: (assetInfo) => {
            //画像ファイルの出力設定
            if (/\.(gif|jpeg|jpg|png|svg|webp|)$/.test(assetInfo.name)) {
              return 'assets/img/[name].[ext]';
            }
            //Webフォントの出力設定
            if (/\.(ttf|otf|eot|woff|woff2|)$/.test(assetInfo.name)) {
              return 'assets/font/[name].[ext]';
            }
            //CSSファイルの出力設定
            if (/\.css$/.test(assetInfo.name)) {
              return 'assets/css/style.css';
            }
            //その他ファイルの出力設定
            return 'assets/[name].[ext]';
          },
        },
      },
      css: {
        devSourcemap: true, // SCSSのソースマップを生成（ビルド時には自動的に無効になる）
      },
    },
    server: {
      port: 3000,
      cors: false,
      watch: {
        usePolling: true
      },
    },
    plugins: [
      ViteEjsPlugin(), //ejsプラグインの設定
      {
        name: 'remove-crossorigin',
        transformIndexHtml(html) {
          return html.replace(/\s+crossorigin=""/g, '');
        }
      },
      ViteImageOptimizer({
        png: {
          // https://sharp.pixelplumbing.com/api-output#png
          quality: 85,
        },
        jpeg: {
          // https://sharp.pixelplumbing.com/api-output#jpeg
          quality: 85,
        },
        jpg: {
          // https://sharp.pixelplumbing.com/api-output#jpeg
          quality: 85,
        },
        webp: {
          // https://sharp.pixelplumbing.com/api-output#webp
          lossless: true,
        },
      }),
      VitePluginWebpAndPath(),
    ],
  };
})
