const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const prodConfig = require("./webpack.prod");
const devconfig = require("./webpack.dev");

module.exports = (env) => {
  if (env.production || argv.mode === "production") {
    return [merge(commonConfig(env).modern, prodConfig.modern), merge(commonConfig(env).legacy, prodConfig.legacy)];
  }
  return merge(commonConfig(env).modern, devconfig);
};
