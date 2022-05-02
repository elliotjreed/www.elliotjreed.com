const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
        include: resolve(__dirname, "./src"),
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.client.json"
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: ["tailwindcss", "autoprefixer"]
              }
            }
          }
        ]
      }
    ]
  },
  performance: {
    hints: "warning"
  },
  plugins: [
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
    symlinks: false,
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
