import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ApiRequest } from "../interfaces/ApiRequest";
import { ApiResponse } from "../interfaces/ApiResponse";

export const useFetch = <T>({
  url,
  method = "GET",
  contentType = "application/json",
  body,
  cacheResponse = false,
  cacheName = "ejr"
}: ApiRequest): [T | null, string[]] => {
  const [response, setResponse] = useState<T | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [updatedFromNetwork, setUpdatedFromNetwork] = useState<boolean>(false);
  const [fetchedFromCache, setFetchedFromCache] = useState<boolean>(false);

  const controller = new AbortController();

  const navigate = useNavigate();

  useEffect((): (() => void) => (): void => controller.abort(), []);

  useEffect((): void => {
    (method === "GET" || method === "DELETE" || body !== null) && fetchData();
  }, [url, body]);

  const fetchData = async (): Promise<void> => {
    if (cacheResponse === false || !("caches" in self)) {
      return updateFromNetwork();
    }

    try {
      const cache: Cache = await caches.open(cacheName);

      cache
        .match(url)
        .then((response: Response | undefined): Promise<ApiResponse<T>> => {
          return new Promise((resolve, reject): void => {
            if (response) {
              resolve(response.clone().json());
            } else {
              reject();
            }
          });
        })
        .then((data: ApiResponse<T>): void => {
          setFetchedFromCache(true);
          setErrors(data.errors);
          setResponse(data.data);

          if (updatedFromNetwork) {
            if (typeof data?.redirectUrl === "string") {
              return navigate(data.redirectUrl, { state: data.errors });
            }
          } else {
            updateFromNetwork();
          }
        })
        .catch((error: Error): void => {
          console.warn("Error fetching data from cache", url, error);

          updateFromNetwork();
        });
    } catch (error: unknown) {
      return await updateFromNetwork();
    }
  };

  const updateFromNetwork = async (): Promise<void> => {
    try {
      const headers = {
        Accept: "application/json, application/ld+json"
      };

      if (!(body instanceof FormData)) {
        headers["Content-Type"] = contentType;
      }

      const getResponse: Response = await fetch(url, {
        method: method,
        credentials: "same-origin",
        cache: cacheResponse ? "default" : "no-cache",
        headers: headers,
        signal: controller.signal,
        body: body
      });

      const networkResponse: ApiResponse<T> = await new Promise((resolve, reject): void => {
        const clonedResponse: Response = getResponse.clone();

        if (clonedResponse.ok) {
          if ("caches" in self) {
            caches
              .open(cacheName)
              .then((cache: Cache): Promise<void> => cache.put(url, clonedResponse.clone()))
              .catch((error: Error): void => {
                console.warn("Error caching response", url, error);
              });
          }

          resolve(clonedResponse.clone().json());
        } else {
          reject();
        }
      });

      if (typeof networkResponse?.redirectUrl === "string") {
        return navigate(networkResponse.redirectUrl, { state: networkResponse.errors });
      }

      setUpdatedFromNetwork(true);

      setResponse(networkResponse.data);
      setErrors(networkResponse.errors);
    } catch (error: unknown) {
      if (!fetchedFromCache) {
        setErrors(["Oh no! Something has gone a bit wrong when trying to talk to my API... please try again!"]);
      }

      console.error("Error fetching from API", url, error);

      return controller.abort();
    }
  };

  return [response, errors];
};
