const merge = require("webpack-merge");
const webpack = require("webpack");
const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
  devServer: {
    historyApiFallback: true,
    hot: true,
    publicPath: "/"
  },
  devtool: "inline-source-map",
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:8081",
    "webpack/hot/only-dev-server",
    "./index.tsx"
  ],
  mode: "development",
  node: {
    dns: "mock",
    fs: "empty",
    net: "mock"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
});
