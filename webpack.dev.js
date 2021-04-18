const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const path = require("path");

module.exports = merge(commonConfig, {
  devServer: {
    contentBase: path.join(__dirname, "src"),
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 8081,
    publicPath: "/",
    watchContentBase: false
  },
  devtool: "eval-source-map",
  mode: "development"
});
