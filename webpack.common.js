const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const path = require("path");

module.exports = {
  name: "client",
  context: resolve(__dirname, "./src"),
  entry: {
    client: "./index.tsx"
  },
  target: "browserslist",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.json"
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  performance: {
    hints: "warning"
  },
  plugins: [
    new WebpackManifestPlugin(),
    new HtmlWebpackPlugin({
      filename: "./index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeScriptTypeAttributes: true
      },
      template: "./index.html",
      title: "Elliot J. Reed"
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      url: false,
      util: false
    }
  }
};
