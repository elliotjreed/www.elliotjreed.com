const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
  name: "server",
  context: path.resolve(__dirname, "./src/server"),
  entry: {
    server: "./server.ts"
  },
  target: "node",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  resolve: {
    extensions: [".ts", ".tsx"]
  },
  externals: [nodeExternals()],
  node: {
    __dirname: false
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.server.json"
        }
      }
    ]
  }
};
