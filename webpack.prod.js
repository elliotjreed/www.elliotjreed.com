const { resolve } = require("path");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WebpackModuleNomodulePlugin = require("webpack-module-nomodule-plugin");
const purgecss = require("@fullhuman/postcss-purgecss");

plugins = [
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
];

module.exports = {
  modern: {
    devtool: "source-map",
    mode: "production",
    output: {
      path: resolve(__dirname, "./dist/static"),
      chunkFilename: "[name].[contenthash].modern.js",
      filename: "[name].[contenthash].modern.js",
      publicPath: "/"
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({ terserOptions: { ecma: 2020, module: true } })],
      splitChunks: {
        chunks: "async",
        minSize: 20000,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
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
            reuseExistingChunk: true,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `vendor.${packageName.replace("@", "")}`;
            }
          }
        }
      }
    },
    plugins: [new WebpackModuleNomodulePlugin("modern"), ...plugins],
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
                  plugins: [
                    "tailwindcss",
                    "autoprefixer",
                    "cssnano",
                    purgecss({
                      content: ["./src/**/*.{ts,tsx,js,html,jsx}"],
                      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || []
                    })
                  ]
                }
              }
            }
          ]
        }
      ]
    }
  },
  legacy: {
    devtool: "source-map",
    mode: "production",
    output: {
      path: resolve(__dirname, "./dist/static"),
      chunkFilename: "[name].[contenthash].legacy.js",
      filename: "[name].[contenthash].legacy.js",
      publicPath: "/"
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({ terserOptions: { ecma: 2015, safari10: true } })]
    },
    plugins: [new WebpackModuleNomodulePlugin("legacy")]
  }
};
