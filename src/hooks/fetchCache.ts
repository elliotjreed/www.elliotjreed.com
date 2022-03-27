import { useEffect, useState } from "react";

export const fetchCache = <T>(url: string, abortController: AbortController, cacheName = "ejr"): T | null => {
  const [response, setResponse] = useState<T | null>(null);
  const [updatedFromNetwork, setUpdatedFromNetwork] = useState<boolean>(false);

  useEffect((): void => void fetchData(), []);

  const fetchData = async (): Promise<void> => {
    if (!("caches" in self)) {
      return updateFromNetwork();
    }

    try {
      const cache: Cache = await caches.open(cacheName);

      cache
        .match(url)
        .then((response: Response | undefined): Promise<T> => {
          return new Promise((resolve, reject): void => {
            if (response) {
              const contentType = response.headers.get("content-type");
              if (contentType === "application/json") {
                resolve(response.clone().json());
              } else {
                resolve(response.clone().text() as unknown as T);
              }
            } else {
              reject();
            }
          });
        })
        .then((data: T): void => {
          setResponse(data);

          !updatedFromNetwork && updateFromNetwork();
        })
        .catch((): Promise<void> => updateFromNetwork());
    } catch (error: unknown) {
      return await updateFromNetwork();
    }
  };

  const updateFromNetwork = async (): Promise<void> => {
    try {
      const getResponse = await fetch(url, { signal: abortController.signal });

      const networkResponse: T = await new Promise((resolve, reject): void => {
        const clonedResponse: Response = getResponse.clone();

        if (clonedResponse.ok) {
          if ("caches" in self) {
            caches
              .open(cacheName)
              .then((cache: Cache): Promise<void> => cache.put(url, clonedResponse.clone()))
              .catch((): void => {}); // eslint-disable-line @typescript-eslint/no-empty-function
          }

          const contentType = clonedResponse.headers.get("content-type");
          if (contentType === "application/json") {
            resolve(clonedResponse.clone().json());
          } else {
            resolve(clonedResponse.clone().text() as unknown as T);
          }
        } else {
          reject();
        }
      });

      setResponse(networkResponse);
      setUpdatedFromNetwork(true);
    } catch (error: unknown) {
      return abortController.abort();
    }
  };

  return response;
};
