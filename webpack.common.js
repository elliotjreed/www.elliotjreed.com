const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const plugins = [
  new WebpackManifestPlugin({}),
  new HtmlWebpackPlugin({
    filename: "./index.html",
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeScriptTypeAttributes: false
    },
    chunks: "all",
    template: "./index.html",
    inject: "body"
  })
];

const cssRule = {
  test: /\.(sa|sc|c)ss$/,
  use: [
    { loader: "css-loader", options: { sourceMap: true, url: false } },
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
};

const modernBrowserModule = {
  rules: [
    {
      exclude: /node_modules/,
      test: /\.tsx?$/,
      loader: "ts-loader",
      options: {
        configFile: "tsconfig.modern_browser.json"
      }
    },
    cssRule
  ]
};

const legacyBrowserModule = {
  rules: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: "default",
                useBuiltIns: "usage",
                modules: false,
                corejs: 3
              }
            ]
          ]
        }
      }
    },
    {
      exclude: /node_modules/,
      test: /\.tsx?$/,
      loader: "ts-loader",
      options: {
        configFile: "tsconfig.legacy_browser.json"
      }
    },
    cssRule
  ]
};

module.exports = (env) => {
  return {
    modern: {
      name: "modern",
      context: resolve(__dirname, "./src"),
      entry: "./index.tsx",
      target: ["web", "es6"],
      performance: {
        hints: "warning"
      },
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
      },
      module: modernBrowserModule,
      plugins: plugins
    },
    legacy: {
      name: "legacy",
      context: resolve(__dirname, "./src"),
      entry: ["./index.tsx"],
      target: ["web", "es5"],
      performance: {
        hints: "warning"
      },
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
      },
      module: legacyBrowserModule,
      plugins: plugins
    }
  };
};
