import { FC, ReactElement, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFont } from "@fortawesome/fontawesome-free-solid/faFont";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { useLocalStorage } from "../hooks/useLocalStorage";

const standardFont =
  "InterVariable,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji";

export const FontSwitch: FC = (): ReactElement => {
  const [font, setFont] = useLocalStorage<typeof standardFont | "OpenDyslexic">("font", standardFont);

  useEffect((): void => {
    typeof document !== "undefined" && (document.body.style.fontFamily = font);
  }, [font]);

  return (
    <button
      aria-label="Toggle dyslexia-friendly font"
      title={(font === "OpenDyslexic" ? "Disable" : "Enable") + " dyslexia-friendly font"}
      type="button"
      className="ml-1 mr-1 h-8 w-8 rounded p-1 sm:ml-4"
      onClick={(): void => setFont(font === "OpenDyslexic" ? standardFont : "OpenDyslexic")}
    >
      <span className="icon">
        <FontAwesomeIcon className="fa-lg" icon={faFont as IconProp} />
      </span>
    </button>
  );
};
