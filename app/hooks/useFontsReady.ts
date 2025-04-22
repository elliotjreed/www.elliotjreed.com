import { useEffect, useState } from "react";

export const useFontsReady = (): boolean => {
  const [ready, setReady] = useState(false);

  useEffect((): void => {
    if (document.fonts) {
      document.fonts.ready.then((): void => setReady(true));
    } else {
      setReady(true);
    }
  }, []);

  return ready;
};
