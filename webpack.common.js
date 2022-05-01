const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const plugins = [
  new WebpackManifestPlugin({}),
  new HtmlWebpackPlugin({
    filename: "./index.html",
    minify: {
      collapseWhitespace: false,
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
      test: /\.js|jsx|ts|tsx$/,
      include: [
        resolve("./src"),
        resolve("./node_modules")
        // resolve("./node_modules/react"),
        // resolve("./node_modules/react-dom"),
        // resolve("./node_modules/react-router"),
        // resolve("./node_modules/react-router-dom")
      ],
      exclude: resolve("./src/index.html"),
      use: {
        loader: "babel-loader",
        options: {
          sourceType: "unambiguous",
          presets: [
            [
              "@babel/preset-env",
              {
                targets: ["ie >= 11"],
                useBuiltIns: "usage",
                modules: false,
                corejs: 3
              }
            ],
            "@babel/preset-react",
            "@babel/preset-typescript"
          ]
        }
      }
    },
    {
      test: /\.js$/,
      use: ["source-map-loader"],
      enforce: "pre"
    }
  ]
};

module.exports = (env) => {
  return {
    modern: {
      name: "modern",
      context: resolve(__dirname, "./src"),
      entry: ["./index.tsx"],
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
      entry: "./index.tsx",
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
