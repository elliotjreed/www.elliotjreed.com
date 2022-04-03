const { resolve } = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  name: "server",
  context: resolve(__dirname, "./src/server"),
  entry: {
    server: "./server.ts"
  },
  target: "node",
  mode: "production",
  output: {
    path: resolve(__dirname, "dist"),
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
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"]
      }
    ]
  }
};
