const { merge } = require("webpack-merge");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const { resolve } = require("path");
const commonConfig = require("./webpack.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(commonConfig, {
  devtool: "source-map",
  entry: "./index.tsx",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: true, url: false } },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: ["postcss-preset-env"]
              }
            }
          },
          { loader: "sass-loader", options: { sourceMap: true } }
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        styles: {
          chunks: "all",
          enforce: true,
          name: "styles",
          test: /\.css$/
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `vendor.${packageName.replace("@", "")}`;
          }
        }
      }
    }
  },
  output: {
    filename: "js/[name].[contenthash].min.js",
    path: resolve(__dirname, "./dist"),
    publicPath: "/"
  },
  plugins: [
    new WebpackPwaManifest({
      background_color: "#898989",
      crossorigin: "use-credentials", //can be null, use-credentials or anonymous
      description: "Elliot J. Reed's website.",
      icons: [
        {
          sizes: [96, 128, 150, 192, 256, 384, 512],
          src: resolve("src/assets/img/icon.png")
        }
      ],
      inject: true,
      ios: true,
      name: "Elliot J. Reed",
      short_name: "EJR",
      theme_color: "#363636"
    }),
    new MiniCssExtractPlugin({
      chunkFilename: "[id].[contenthash].css",
      filename: "[name].[contenthash].css"
    }),
    new CopyPlugin({ patterns: [{ from: "./assets/static", to: "./" }] }),
    new WorkboxPlugin.GenerateSW({
      skipWaiting: true,
      mode: "production"
    })
  ]
});
