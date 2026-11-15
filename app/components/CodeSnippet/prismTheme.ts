import type { PrismTheme } from "prism-react-renderer";

export const codeTheme: PrismTheme = {
  plain: {
    color: "var(--code-ink)",
    backgroundColor: "var(--code-bg)",
  },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "var(--code-comment)", fontStyle: "italic" } },
    { types: ["atrule", "attr-value", "keyword"], style: { color: "var(--code-keyword)" } },
    { types: ["selector", "attr-name", "string", "char", "builtin"], style: { color: "var(--code-string)" } },
    {
      types: ["property", "tag", "boolean", "number", "constant", "symbol"],
      style: { color: "var(--code-number)" },
    },
    { types: ["function", "class-name"], style: { color: "var(--code-function)" } },
  ],
};
