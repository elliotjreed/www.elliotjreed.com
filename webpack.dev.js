module.exports = {
  module: {
    rules: [
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
};
