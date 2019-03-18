const merge = require("webpack-merge");
const { resolve } = require("path");
const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
  mode: "production",
  entry: "./index.tsx",
  output: {
    filename: "js/[hash].min.js",
    path: resolve(__dirname, "./dist"),
    publicPath: "/"
  },
  devtool: "source-map",
  plugins: []
});
