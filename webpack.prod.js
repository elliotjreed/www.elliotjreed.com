const merge = require("webpack-merge");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const { resolve, join } = require("path");
const glob = require("glob");
const commonConfig = require("./webpack.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

const PATHS = {
  src: join(__dirname, "src")
};

module.exports = merge(commonConfig, {
  mode: "production",
  entry: "./index.tsx",
  output: {
    filename: "js/[hash].min.js",
    path: resolve(__dirname, "./dist"),
    publicPath: "/"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new WebpackPwaManifest({
      name: "Elliot J. Reed",
      short_name: "EJR",
      description: "",
      background_color: "#898989",
      crossorigin: "use-credentials", //can be null, use-credentials or anonymous
      icons: [
        {
          src: resolve("src/assets/img/icon.png"),
          sizes: [96, 128, 150, 192, 256, 384, 512]
        }
      ]
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
      whitelist: ["pre", "code"]
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true
    })
  ]
});
