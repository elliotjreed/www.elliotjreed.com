import { FC, ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/fontawesome-free-solid/faEye";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export const FontSwitch: FC = (): ReactElement => {
  return (
    <button
      aria-label="Toggle dyslexia-friendly font"
      title="Toggle dyslexia-friendly font"
      type="button"
      className="ml-1 mr-1 h-8 w-8 rounded p-1 sm:ml-4"
      onClick={(): void => {
        typeof document !== "undefined" &&
          (document.body.style.fontFamily === "OpenDyslexic"
            ? (document.body.style.fontFamily =
                "InterVariable,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji")
            : (document.body.style.fontFamily = "OpenDyslexic"));
      }}
    >
      <span className="icon" title="Toggle dyslexia-friendly font">
        <FontAwesomeIcon className="fas fa-lg" icon={faEye as IconProp} />
      </span>
    </button>
  );
};
