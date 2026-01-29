import type { PrismTheme } from "prism-react-renderer";

export const customDarkTheme: PrismTheme = {
  plain: {
    color: "#d1d5db", // gray-300
    backgroundColor: "#1f2937", // gray-800
  },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "#6b7280" } },
    { types: ["punctuation"], style: { color: "#9ca3af" } },
    { types: ["property", "tag", "boolean", "number", "constant", "symbol"], style: { color: "#93c5fd" } },
    { types: ["selector", "attr-name", "string", "char", "builtin"], style: { color: "#86efac" } },
    { types: ["operator", "entity", "url"], style: { color: "#fcd34d" } },
    { types: ["atrule", "attr-value", "keyword"], style: { color: "#c4b5fd" } },
    { types: ["function", "class-name"], style: { color: "#fca5a5" } },
    { types: ["regex", "important", "variable"], style: { color: "#fdba74" } },
  ],
};
