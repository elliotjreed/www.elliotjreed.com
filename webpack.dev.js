const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 8081
  },
  devtool: "eval-source-map",
  mode: "development"
});
