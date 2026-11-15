import { Highlight, Prism, type Token } from "prism-react-renderer";
import { type FC, type ReactElement, useEffect, useState } from "react";
import { codeTheme } from "./prismTheme";

export type SupportedLanguage = "text" | "php" | "bash" | "json" | "markdown" | "javascript" | "typescript" | "sql";

export interface CodeSnippetInterface {
  code: string;
  title: string;
  language?: SupportedLanguage;
}

// Load languages once on the client side
let languagesLoaded = false;

export const CodeSnippet: FC<CodeSnippetInterface> = ({
  code,
  title,
  language = "text",
}: CodeSnippetInterface): ReactElement => {
  const [copied, setCopied] = useState(false);
  const [_languagesReady, setLanguagesReady] = useState(languagesLoaded);

  useEffect(() => {
    if (!languagesLoaded && typeof window !== "undefined") {
      globalThis.Prism = Prism;

      // Load languages in order, respecting dependencies
      const loadLanguages = async () => {
        await import("prismjs/components/prism-markup");
        await import("prismjs/components/prism-clike");
        await import("prismjs/components/prism-markup-templating");
        await import("prismjs/components/prism-bash");
        await import("prismjs/components/prism-php");
        await import("prismjs/components/prism-markdown");
        languagesLoaded = true;
        setLanguagesReady(true);
      };

      loadLanguages();
    }
  }, []);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);

      setTimeout((): void => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <figure className="ejr-code not-prose mb-6">
      <figcaption className="ejr-code-head">
        <span>{title}</span>
        <button type="button" onClick={handleCopy} className="ejr-code-copy">
          {copied ? "Copied" : "Copy"}
        </button>
      </figcaption>

      <Highlight theme={codeTheme} code={code} language={language}>
        {({ tokens, getLineProps, getTokenProps }): ReactElement => (
          <pre>
            <code>
              {tokens.map((line, i) => (
                <div key={`line-${i}`} {...getLineProps({ line })}>
                  {line.map((token: Token, key: number): ReactElement => (
                    <span key={`token-${key}`} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </figure>
  );
};
