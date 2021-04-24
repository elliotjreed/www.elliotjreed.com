module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["plugin:react/recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module"
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off"
  }
};
