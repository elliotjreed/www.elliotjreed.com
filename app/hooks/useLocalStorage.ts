import { type Dispatch, type SetStateAction, useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): readonly [[T, Dispatch<SetStateAction<T>>][0], (value: ((val: T) => T) | T) => void] => {
  const [storedValue, setStoredValue] = useState<T>((): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);

      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error: unknown) {
      console.warn(error, key, initialValue);

      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)): void => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error: unknown) {
      console.warn(error, key, value);
    }
  };

  return [storedValue, setValue] as const;
};
