const { merge } = require("webpack-merge");
const { resolve } = require("path");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const commonConfig = require("./webpack.common");
const purgecss = require("@fullhuman/postcss-purgecss");
const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require("zlib");

module.exports = merge(commonConfig, {
  devtool: "source-map",
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
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ terserOptions: { ecma: 2020 } })], // change to 2015
    splitChunks: {
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
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `vendor.${packageName.replace("@", "")}`;
          }
        }
      }
    }
  },
  output: {
    filename: "[name].[contenthash].min.js",
    path: resolve(__dirname, "./dist/static"),
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
          src: resolve("src/assets/img/icon-transparent.png"),
          purpose: "any"
        },
        {
          sizes: [120, 152, 167, 180, 1024],
          src: resolve("src/assets/img/icon.png"),
          ios: true
        },
        {
          src: resolve("src/assets/img/icon-maskable.png"),
          sizes: [72, 96, 128, 144, 192, 196, 256, 384, 512, 1024],
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
    new CompressionPlugin({
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11
        }
      },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false
    }),
    new WorkboxPlugin.GenerateSW({
      skipWaiting: true,
      mode: "production"
    })
  ]
});
