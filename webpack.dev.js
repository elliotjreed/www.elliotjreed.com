const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
  devServer: {
    compress: false,
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 8081,
    client: {
      progress: true,
      overlay: false
    }
  },
  devtool: "eval-source-map",
  mode: "development"
});
