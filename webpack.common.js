const { resolve } = require("path");
const { CheckerPlugin } = require("awesome-typescript-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: resolve(__dirname, "./src"),
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: ["babel-loader", "source-map-loader"]
      },
      {
        exclude: /\.test.tsx?$/,
        test: /\.tsx?$/,
        use: ["babel-loader", "awesome-typescript-loader"]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        loaders: [
          "file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]",
          "image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false"
        ],
        test: /\.(jpe?g|png|gif|svg)$/i
      }
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    new CheckerPlugin(),
    new HtmlWebpackPlugin({
      filename: "./index.html",
      minify: {
        "collapseWhitespace": true,
        "removeComments": true,
        "removeScriptTypeAttributes": true
      },
      template: "./index.html",
      title: "Elliot J. Reed"
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  }
};
