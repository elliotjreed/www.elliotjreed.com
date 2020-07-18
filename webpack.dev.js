const { merge } = require("webpack-merge");
const webpack = require("webpack");
const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
  devServer: {
    historyApiFallback: true,
    publicPath: "/"
  },
  devtool: "inline-source-map",
  entry: ["webpack-dev-server/client?http://localhost:8081", "./index.tsx"],
  mode: "development",
  node: {
    dns: "mock",
    fs: "empty",
    net: "mock"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
