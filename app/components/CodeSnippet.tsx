import { type FC, type ReactElement, useState } from "react";

export interface CodeSnippetInterface {
  code: string;
  title: string;
}

export const CodeSnippet: FC<CodeSnippetInterface> = ({ code, title }: CodeSnippetInterface): ReactElement => {
  const [copied, setCopied] = useState(false);

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
    <div className="snippet">
      <div className="mb-6 rounded-lg  bg-gray-800 shadow-md overflow-hidden">
        <div className="px-4 py-2 bg-gray-700 text-gray-200 font-medium flex justify-between items-center">
          <span>{title}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="text-xs px-2 py-1 rounded bg-gray-600 hover:bg-gray-500 transition-colors text-white flex items-center space-x-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>Copy button icon</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2"
              />
            </svg>
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>
        </div>

        <pre className="p-4 mt-0 mb-0 text-gray-300 bg-gray-800 overflow-x-auto font-mono text-sm">
          <code className="bg-gray-800">{code}</code>
        </pre>
      </div>
    </div>
  );
};
