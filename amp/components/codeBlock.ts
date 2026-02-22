import Prism from "prismjs";

// Load required language grammars in dependency order
import "prismjs/components/prism-markup.js";
import "prismjs/components/prism-clike.js";
import "prismjs/components/prism-markup-templating.js";
import "prismjs/components/prism-bash.js";
import "prismjs/components/prism-sql.js";
import "prismjs/components/prism-php.js";
import "prismjs/components/prism-javascript.js";
import "prismjs/components/prism-typescript.js";
import "prismjs/components/prism-json.js";
import "prismjs/components/prism-markdown.js";

export type SupportedLanguage = "text" | "bash" | "sql" | "php" | "javascript" | "typescript" | "json" | "markdown";

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function highlightCode(code: string, language?: SupportedLanguage): string {
  if (!language || language === "text" || !Prism.languages[language]) {
    return escapeHtml(code);
  }
  try {
    return Prism.highlight(code, Prism.languages[language], language);
  } catch {
    return escapeHtml(code);
  }
}

export function codeBlock(code: string, title: string, language?: SupportedLanguage): string {
  const highlighted = highlightCode(code, language);
  const titleHtml = title ? `<div class="code-title">${escapeHtml(title)}</div>` : "";
  return `<div class="code-block">${titleHtml}<pre class="code-pre"><code>${highlighted}</code></pre></div>`;
}
