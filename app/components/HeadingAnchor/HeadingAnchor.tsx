import { type KeyboardEvent, type ReactElement, type ReactNode, useState } from "react";

interface HeadingAnchorProps {
  id: string;
  level?: 2 | 3 | 4;
  children: ReactNode;
}

export const HeadingAnchor = ({ id, level = 2, children }: HeadingAnchorProps): ReactElement => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async (): Promise<void> => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout((): void => setCopied(false), 2000);
  };

  const linkButton: ReactElement = (
    <button
      type="button"
      onClick={handleCopyLink}
      onKeyDown={(event: KeyboardEvent<HTMLButtonElement>): void => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleCopyLink();
        }
      }}
      className="ml-2 inline-flex items-center opacity-20 group-hover:opacity-100 focus:opacity-100 transition-opacity cursor-pointer"
      aria-label={`Copy link to ${children}`}
      title="Copy link to section"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        aria-hidden="true"
      >
        <title>Link icon</title>
        <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
        <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
      </svg>
      {copied && <span className="ml-1 text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">Copied!</span>}
    </button>
  );

  if (level === 3) {
    return (
      <h3 id={id} className="group relative">
        {children}
        {linkButton}
      </h3>
    );
  }

  if (level === 4) {
    return (
      <h4 id={id} className="group relative">
        {children}
        {linkButton}
      </h4>
    );
  }

  return (
    <h2 id={id} className="group relative">
      {children}
      {linkButton}
    </h2>
  );
};
