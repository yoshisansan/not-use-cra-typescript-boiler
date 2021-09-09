import * as path from 'path'
import HtmlWebPackPlugin from 'html-webpack-plugin';
// import TsconfigPathsPlugin from 'tsconfig-paths';
import { Configuration as WebpackConfiguration } from "webpack"
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server"

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  // mode: "production", 圧縮効率の高い本番用
  mode: "development",
  entry: "./src/app.tsx",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: path.resolve(__dirname, 'tsconfig.json'),
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      "components*": path.resolve(__dirname, "src/components*"),
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
      publicPath: '/',
      serveIndex: true,  // ディレクトリの一覧を表示する
      watch: true,  // ファイル変更時に再ビルド
    },
    compress: true,  // デフォルトで圧縮される
    open: true,  // ブラウザを自動で開く
    hot: true, // ホットリロード
  },
  output: {
    filename: "bundle.js",
    path: `${__dirname}/dist`,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
}

export default config;