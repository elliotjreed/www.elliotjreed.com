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
      background_color: "#444444",
      crossorigin: "use-credentials",
      description:
        "Elliot J. Reed is a Technical Lead in the software development industry, based in Nottingham, United Kingdom.",
      icons: [
        {
          sizes: [72, 96, 128, 144, 192, 256, 384, 512],
          src: resolve("src/assets/img/icon.png")
        },
        {
          sizes: [120, 180, 167, 152, 1024],
          src: resolve("src/assets/img/icon.png"),
          ios: true
        },
        {
          size: 1024,
          src: resolve("src/assets/img/icon.png"),
          ios: true
        },
        {
          src: resolve("src/assets/img/icon-maskable.png"),
          size: "1024x1024",
          purpose: "maskable"
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
