const merge = require("webpack-merge");
const WebpackPwaManifest = require('webpack-pwa-manifest')
const { resolve } = require("path");
const commonConfig = require("./webpack.common");
const path = require("path");

module.exports = merge(commonConfig, {
  mode: "production",
  entry: "./index.tsx",
  output: {
    filename: "js/[hash].min.js",
    path: resolve(__dirname, "./dist"),
    publicPath: "/"
  },
  devtool: "source-map",
  plugins: [
    new WebpackPwaManifest({
      name: 'Elliot J. Reed',
      short_name: 'EJR',
      description: '',
      background_color: '#898989',
      crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
      icons: [
        {
          src: path.resolve('src/assets/img/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
        }
      ]
    })
  ]
});
