const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    require("autoprefixer"),
    purgecss({
      content: ["./src/**/*.tsx"],
      safelist: ["pre", "code", "html", "body", "section"]
    })
  ]
};
